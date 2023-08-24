import {useContext, useState} from 'react'

import {
    Container,
    ContentForm,
    HeaderForm,
    Buttons,
    Delete,
    Register,
    Updated,
    CloseModal,
    ExistingClient
} from './styles'

import {useForm} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { dateFormatter, phoneFormatter } from '../../utils/Formatted'
import { GrClose } from 'react-icons/gr'

import { defaultTheme } from '../../styles/themes'
import { FaUsers } from "react-icons/fa";

import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
import { Load } from '../../components/Load'
import { 
    collection, 
    getFirestore, 
    addDoc, 
    doc, 
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

const newClientFormSchema = z.object({
    name: z.string(),
    city: z.string(),
    address: z.string(),
    contact: z.string(),
})

type NewClientFormInputs = z.infer<typeof newClientFormSchema>

export interface ExistingClientData {
    clientId: string;
    name: string;
    city: string;
    address: string;
    contact: number;
    date?: number;
}

type NewClientModalProps = {
    existingClientData?: ExistingClientData;
    closeModal: () => void;
    loadClients: () => void;
}

export function NewClientModal( {existingClientData, closeModal, loadClients} : NewClientModalProps ){
    const { user } = useContext(AuthContext)
    const [loadClient, setLoadClient] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {isSubmitted},
        reset
    } = useForm<NewClientFormInputs>({
        resolver: zodResolver(newClientFormSchema)
    })

    async function handleCreateOrUpdateClient( data : NewClientFormInputs ){
        const { name, city, address, contact } = data
        setLoadClient(true)

        try {
            const firestore = getFirestore()

            // ATUALIZAR CLIENTE
            if(existingClientData?.clientId){
                try {
                    const firestore = getFirestore()
                    const updatedClientData = {
                        name,
                        city,
                        address,
                        contact
                    }

                    // id do cliente que será atualizado
                    const clientDocRef = doc(firestore, 'clients', existingClientData.clientId)
                    // atualizar o cliente acima que peguei o id, e passando as novas info(updatedClientData)
                    await updateDoc(clientDocRef, updatedClientData)

                    toast.success('Cliente atualizado com sucesso!')
                    closeModal()
                    loadClients() //Minha função que carrega a lista de clientes
                    setLoadClient(false)

                } catch (error) {
                    toast.error('Não foi possível atualizar seu cliente!')
                    setLoadClient(false)
                } 
            } 
            // CRIAR NOVO CLIENTE
            else {
                const newClient = {
                    name,
                    city,
                    address,
                    contact,
                    date: Date.now(),
                }
                const clientData = {
                    ...newClient,
                    userId: user?.id //ID do user logado
                }

                const clientsCollectionRef = collection(firestore, 'clients')
                await addDoc(clientsCollectionRef, clientData)
                toast.success('Cliente adicionado!')
            }

            reset()
            closeModal()
            loadClients() // minha função vinda de Customers(que carrega os clientes)
            setLoadClient(false)

        } catch (error) {
            toast.error('Não foi possível adicionar seu cliente!')
            setLoadClient(false)
        }
    }

    async function handleDeleteClient(id : string){
        setLoadClient(true)

        try {
            const firestore = getFirestore()
            const clientDocRef = doc(firestore, 'clients', id)

            await deleteDoc(clientDocRef)

            toast.success('Cliente excluido com sucesso!')
            closeModal()
            loadClients()
            setLoadClient(true)

        } catch (error) {
            toast.error('Não foi possível excluir o cliente.')
        }
    }

    
    return (
        <Container>
            <ContentForm>

                {existingClientData && (
                    <ExistingClient>
                        <h3>Informações do Cliente</h3>
                        <p> <span>Nome:</span>{existingClientData.name}</p>
                        <p> <span>Cidade:</span>{existingClientData.city}</p>
                        <p> <span>Endereço:</span>{existingClientData.address}</p>
                        <p> <span>Contato:</span>{phoneFormatter(String(existingClientData.contact))}</p>
                        <p> <span>Cadastrado em:</span>{ dateFormatter.format(existingClientData.date)} </p>
                        
                    </ExistingClient>
                )}


                <HeaderForm>
                    <FaUsers size={24} color={defaultTheme['orange-dark']} />
                    <h2> {existingClientData ? 'Atualizar Cliente' : 'Novo Cliente'} </h2>
                </HeaderForm>
                
                <form onSubmit={handleSubmit(handleCreateOrUpdateClient)} >

                    <input 
                        type="text" 
                        placeholder='Nome' 
                        required 
                        defaultValue={existingClientData?.name || ''}
                        {...register('name')}
                    />
                    <input 
                        type="text" 
                        placeholder='Cidade' 
                        required 
                        defaultValue={existingClientData?.city || ''}
                        {...register('city')}
                    />
                    <input 
                        type="text" 
                        placeholder='Endereço' 
                        required 
                        defaultValue={existingClientData?.address || ''}
                        {...register('address')}
                    />
                    <input 
                        type="text" 
                        placeholder='Contato' 
                        required 
                        defaultValue={existingClientData?.contact || ''}
                        {...register('contact')} //{ valueAsNumber: true } ser número faz assim

                        onInput={(event) => {
                            const inputElement = event.target as HTMLInputElement;
                            inputElement.value = phoneFormatter(inputElement.value)
                        }}
                    />

                    {!existingClientData ? (
                        <Register 
                            type='submit'
                            disabled={isSubmitted}
                        >   
                            {loadClient ? <Load/> : 'cadastrar' }
                        </Register>

                    ) : (
                        <Buttons>
                            <Updated 
                                type='submit'
                                disabled={isSubmitted}
                            >
                                {loadClient ? <Load/> : 'atualizar' }
                            </Updated>

                            {existingClientData && (
                                <Delete type="button" onClick={() => handleDeleteClient(existingClientData.clientId)}>
                                    {loadClient ? <Load/> : 'deletar' }
                                </Delete>
                            )}
                            
                        </Buttons>
                    ) }

                    <CloseModal onClick={closeModal} >
                        <GrClose size={20} />
                    </CloseModal>
                </form>
            </ContentForm>
        </Container>
    )
}
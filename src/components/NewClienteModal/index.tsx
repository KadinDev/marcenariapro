
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

import { generateUniqueID } from '../../utils/GenerateUniqueID'
import { defaultTheme } from '../../styles/themes'
import { FaUsers } from "react-icons/fa";

const newClientFormSchema = z.object({
    name: z.string(),
    city: z.string(),
    address: z.string(),
    contact: z.string(),
})

type NewClientFormInputs = z.infer<typeof newClientFormSchema>

export interface ExistingClientData {
    id: string;
    name: string;
    city: string;
    address: string;
    contact: number;
    date?: number;
}

type NewClientModalProps = {
    existingClientData?: ExistingClientData;
    closeModal: () => void;
}

export function NewClientModal( {existingClientData, closeModal} : NewClientModalProps ){

    const {
        register,
        handleSubmit,
        formState: {isSubmitted},
        reset
    } = useForm<NewClientFormInputs>({
        resolver: zodResolver(newClientFormSchema)
    })

    // criar ou editar cliente
    async function handleCreateOrUpdateClient(data: NewClientFormInputs){
        //const {address, city, contact, name} = data
        if (existingClientData?.id){
            console.log(`${data.name} do ID ${existingClientData.id} ATUALIZADO`)
            console.log(data)
        } else {
            const newClient = {
                id: generateUniqueID(),
                name: data.name,
                city: data.city,
                address: data.address,
                contact: data.contact,
                date: Date.now()
            }
            console.log(newClient)
        }
        
        reset()
        closeModal()
    }

    async function handleDeleteClient(client : string){
        console.log('cliente deletado', client)
    }

    return (
        <Container>
            <ContentForm>

                {existingClientData && (
                    <ExistingClient>
                        <h3>Informações do Cliente</h3>
                        <p> <span>Nome:</span> {existingClientData.name}</p>
                        <p> <span>Cidade:</span> {existingClientData.city}</p>
                        <p> <span>Endereço:</span> {existingClientData.address}</p>
                        <p> <span>Contato:</span> { phoneFormatter(String(existingClientData.contact))}</p>
                        <p> <span>Cadastrado em:</span> { dateFormatter.format(existingClientData.date)} </p>
                        
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
                            cadastrar
                        </Register>

                    ) : (
                        <Buttons>
                            <Updated 
                                type='submit'
                                disabled={isSubmitted}
                            >
                                atualizar
                            </Updated>

                            {existingClientData && (
                                <Delete type="button" onClick={() => handleDeleteClient(existingClientData.id)}>
                                    Deletar
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
import { useState, useContext } from 'react'
import {
    Container,
    ContentForm,
    HeaderForm,
    TransactionType,
    TransactionTypeButton,
    CloseModal
} from './styles'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { AiOutlineClose } from 'react-icons/ai'
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaPiggyBank } from 'react-icons/fa'
import { defaultTheme } from '../../styles/themes'

import { moneyFormatter } from '../../utils/Formatted'

import { Load } from '../../components/Load'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import {
    collection,
    getFirestore,
    addDoc
} from 'firebase/firestore'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.string(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

type NewTransactionModalProps = {
    closeModal: () => void;
    loadTransactions: () => void;
}

export function NewTransactionModal({closeModal, loadTransactions} : NewTransactionModalProps){
    const {user} = useContext(AuthContext)
    const [buttonSelect, setButtonSelect] = useState('income')
    const [load, setLoad] = useState(false)

    
    const {
        register,
        handleSubmit,
        formState: { isSubmitted }, 
        reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        setLoad(true)

        try {
            const firestore = getFirestore()
            const transactionsColectionRef = collection(firestore, 'transactions')
            
            const newTransaction = {
                description: data.description,
                price: data.price.replace(/\D/g, ''),
                type: buttonSelect,
                date: Date.now(),
                userId: user?.id
            }
            await addDoc(transactionsColectionRef, newTransaction)
            
            toast.success('Transação cadastrada!')
            setLoad(false)
            closeModal()
            loadTransactions() // minha função em Bank que carrega as transações
            reset()
        } 
        catch (error) {
            toast.error('Não foi possível cadastrar essa transação!')
            setLoad(false)
        }
    }


    return (
        <Container>
            <ContentForm>
                <HeaderForm>
                    <FaPiggyBank size={24} color={defaultTheme['green-bank']} />
                    <h2> Nova Transação </h2>
                </HeaderForm>
                
                <form onSubmit={handleSubmit(handleCreateNewTransaction)} >
                   
                    <input 
                        type="text" 
                        placeholder='Descrição' 
                        required 
                        {...register('description')}
                    />
                    <input 
                        type="text" 
                        placeholder='Preço' 
                        required 
                        {...register('price')}

                        onInput={(e) => {
                            const inputElement = e.target as HTMLInputElement;
                            inputElement.value = moneyFormatter(inputElement.value)
                        }}
                    />
                    {/* 
                    <input 
                        type="text" 
                        placeholder='Categoria' 
                        required 
                        {...register('category')}
                    />
                    */}
                   
                   <TransactionType>
                        <TransactionTypeButton
                            type='button'
                            variant='income'
                            isActive={buttonSelect === 'income'}
                            disabled={isSubmitted}
                            onClick={() => setButtonSelect('income')}
                        >
                            
                            <FaArrowAltCircleUp size={24} />
                            entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton
                            type='button'
                            variant='outcome'
                            isActive={buttonSelect === 'outcome'}
                            disabled={isSubmitted}
                            onClick={() => setButtonSelect('outcome')}
                        >
                            
                            <FaArrowAltCircleDown size={24} />
                            saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button
                        type='submit'
                        disabled={isSubmitted}
                    >
                        { load ? <Load/> : 'cadastrar' }
                    </button>    
                </form>
                 
                <CloseModal onClick={closeModal} >
                    <AiOutlineClose size={20} color={defaultTheme.sidebar} />
                </CloseModal>
            </ContentForm>
        </Container>
    )
}
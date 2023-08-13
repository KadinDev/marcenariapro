import { useState } from 'react'
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
import { generateUniqueID } from '../../utils/GenerateUniqueID'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.string(),
    //category: z.string(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

type NewTransactionModalProps = {
    closeModal: () => void;
}

export function NewTransactionModal({closeModal} : NewTransactionModalProps){
    const [buttonSelect, setButtonSelect] = useState('income')

    const {
        register,
        handleSubmit,
        //formState: { isSubmitted }, 
        //reset
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        if(!buttonSelect) return alert('Selecione uma Entrada ou Saída')

        const newTransaction = {
            id: generateUniqueID(),
            description: data.description,
            price: data.price.replace(/\D/g, ''),
            //category: data.category,
            type: buttonSelect,
            date: new Date(),
        }
        console.log(newTransaction)

        //reset() 
    }

    /*
    async function handleDeleteTransaction(client : string){
        console.log('cliente deletado', client)
    }
    */

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
                            onClick={() => setButtonSelect('income')}
                        >
                            <FaArrowAltCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton
                            type='button'
                            variant='outcome'
                            isActive={buttonSelect === 'outcome'}
                            onClick={() => setButtonSelect('outcome')}
                        >
                            <FaArrowAltCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button
                        type='submit'
                    >
                        Cadastrar
                    </button>    
                </form>
                 
                <CloseModal onClick={closeModal} >
                    <AiOutlineClose size={20} color={defaultTheme.sidebar} />
                </CloseModal>
            </ContentForm>
        </Container>
    )
}
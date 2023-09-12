import {useContext, useState} from 'react'

import {
    Container,
    ContentForm,
    HeaderForm,
    Register,
    CloseModal,
} from './styles'

import {useForm} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { GrClose } from 'react-icons/gr'
import { GiNotebook } from "react-icons/gi";

import { defaultTheme } from '../../styles/themes'

import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
import { Load } from '../../components/Load'

import { 
    collection, 
    getFirestore, 
    addDoc
} from 'firebase/firestore'

const newNoteFormSchema = z.object({
    body: z.string(),
})

type NewNoteFormInputs = z.infer<typeof newNoteFormSchema>

export interface NotesProps {
    id: string;
    body: string
}

type NewNoteModalProps = {
    closeModal: () => void;
    loadNotes: () => void;
}

export function NewNoteModal( {closeModal, loadNotes} : NewNoteModalProps ){
    const { user } = useContext(AuthContext)
    const [loadNote, setLoadNote] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {isSubmitted},
        reset
    } = useForm<NewNoteFormInputs>({
        resolver: zodResolver(newNoteFormSchema)
    })

    async function handleCreateNewNote( data : NewNoteFormInputs ){
        const { body } = data
        setLoadNote(true)

        try {
            const firestore = getFirestore()

            const newNote = {
                body,
                date: Date.now(),
            }

            const noteData = {
                ...newNote,
                userId: user?.id //ID do user logado
            }

            const notesCollectionRef = collection(firestore, 'notes')
            await addDoc(notesCollectionRef, noteData)
            toast.success('Lembrete salvo!')

            reset()
            closeModal()
            loadNotes() // minha função vinda de Customers(que carrega os clientes)
            setLoadNote(false)

        } catch (error) {
            toast.error('Não foi possível adicionar seu cliente!')
            setLoadNote(false)
        }
    }

    return (
        <Container>
            <ContentForm>

                <HeaderForm>
                    <GiNotebook size={24} color={defaultTheme['orange-dark']} />
                    <h2> nova nota </h2>
                </HeaderForm>
                
                <form onSubmit={handleSubmit(handleCreateNewNote)} >
                    
                    <textarea 
                        placeholder='Descrição' 
                        required 
                        maxLength={100}
                        {...register('body')}
                    />
                    <p> limite de 100 caracteres </p>
                    
                    <Register 
                        type='submit'
                        disabled={isSubmitted}
                    >   
                        {loadNote ? <Load/> : 'salvar' }
                    </Register>

                        

                    <CloseModal onClick={closeModal} >
                        <GrClose size={20} />
                    </CloseModal>
                </form>
            </ContentForm>
        </Container>
    )
}
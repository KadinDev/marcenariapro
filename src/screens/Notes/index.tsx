import { useEffect, useState, useContext } from 'react'

import {
    Container,
    Header,
    TitleHeader,
    CardNote,
    ContentCardsNote
} from './styles'

import {GiNotebook, GiTrashCan} from 'react-icons/gi'
import {defaultTheme} from '../../styles/themes'

import { formatNumber } from '../../utils/Formatted'
import { NewNoteModal, NotesProps } from '../../components/NewNoteModal'
import { ModalComponent } from '../../components/Modal'
import { Load } from '../../components/Load'

import { AuthContext } from '../../contexts/auth'
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
    doc,
    deleteDoc
} from 'firebase/firestore'

import Modal from 'react-modal'
import { toast } from 'react-toastify'
Modal.setAppElement('#root')


export function Notes() {
    const { user } = useContext(AuthContext)
    
    const titlePage = 'Marcenaria | ';
    const [loading, setLoading] = useState(true)
    const [deleteLoad, setDeleteLoad] = useState(false)
 
    const [notes, setNotes] = useState<NotesProps[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        document.title = `${titlePage} Lembretes`
    },[]);
    

    // Carregamento de clientes
    async function loadNotes(){
        setLoading(true)

        const firestore = getFirestore()
        const userNotesCollectionRef = collection(firestore, 'notes')
        const querySnapshot = await getDocs(query(userNotesCollectionRef, where('userId', '==', user?.id )))
        
        const loadNotes: NotesProps[] = []
        querySnapshot.forEach((doc) => {
            loadNotes.push({ id: doc.id, ...doc.data() } as NotesProps )
        })

        setNotes(loadNotes)
        setLoading(false)
    }

    useEffect(() => {
        loadNotes()
    },[])

    function openModal(){
        setIsModalOpen(true)
    }
    
    function closeModal(){
        setIsModalOpen(false)
    }


    async function handleDeleteNote(id : string){
        setDeleteLoad(true)

        try {
            const firestore = getFirestore()
            const noteDocRef = doc(firestore, 'notes', id)

            await deleteDoc(noteDocRef)

            toast.success('Lembrete excluido!')
            closeModal()
            loadNotes()
            setDeleteLoad(false)

        } catch (error) {
            toast.error('Não foi possível excluir o lembrete.')
            setDeleteLoad(false)
        }
    }

    return (
        <Container>
            
            <ModalComponent
                isOpen={isModalOpen}
                onClose={closeModal}
            >   
                <NewNoteModal 
                    closeModal={closeModal}
                    loadNotes={loadNotes}
                />
            </ModalComponent>

            <Header>
                <TitleHeader>Lembretes</TitleHeader>

                <button onClick={openModal}>
                    <GiNotebook 
                        size={20}
                        color={defaultTheme['orange-dark']}
                    />
                </button>

            </Header>

            <p> {formatNumber(notes.length)} notas </p>

            <ContentCardsNote>
                { loading ? (
                    <div style={{textAlign: 'center', fontSize: 30}} >
                        <Load/>
                    </div>
                ) : (

                    <>
                        { notes.map(note => {
                            return (
                                <>
                                { deleteLoad ? (
                                    <Load />
                                ) : (

                                    <CardNote key={note.id}>
                                        <p> {note.body} </p>

                                        <button onClick={() => handleDeleteNote(note.id)} >
                                            <GiTrashCan size={20} />
                                        </button>
                                    </CardNote>
                                ) }
                                </>
                            )
                        })}
                    </>
                ) }
            </ContentCardsNote>

            
        </Container>
    )
}

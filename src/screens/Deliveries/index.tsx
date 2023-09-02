import {useState, useEffect, useContext} from 'react'

import {
  Container,
  Header,
  TitleHeader,
  MarkedDate,
  CalendarContainer,
  StyledCalendar,
  ContainerForm,
  Form,
  Info
} from './styles'

import { BsTrash } from 'react-icons/bs'
import 'react-calendar/dist/Calendar.css'

import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
import { Load } from '../../components/Load'
import {
  getFirestore,
  collection,
  query,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  where
} from 'firebase/firestore'

interface Reminder {
    date: Date;
    title: string;
    cliente?: string;
    address: string;
  }

export function Deliveries(){
  const { user } = useContext(AuthContext)
  const titlePage = 'Marcenaria | '
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDates, setSelectedDates] = useState<Reminder[]>([])
  const [deliveryExistsForSelectedDate, setDeliveryExistsForSelectedDate] = useState(false)
  const [title, setTitle] = useState('')
  const [cliente, setCliente] = useState('')
  const [address, setAddress] = useState('')
  const [loadSaveDelivery, setLoadSaveDelivery] = useState(false)

  useEffect(() => {
    document.title = `${titlePage} Entregas`
  },[])

  useEffect(() => {
    loadDeliveries()
  },[])
  
  function handleDateClick(date: Date){
    setSelectedDate(date)

    //vefiricar se já tem entrega salva na data clicada
    const deliveryExists = selectedDates.some(
      (reminder) => reminder.date.toDateString() === date.toDateString()
    )
    setDeliveryExistsForSelectedDate(deliveryExists)
  }

  async function loadDeliveries(){
    const firestore = getFirestore()
    const userDeliveriesCollectionRef = collection(firestore, 'delivery')
    const querySnapshot = await getDocs(query(userDeliveriesCollectionRef, where('userId', '==', user?.id)))

    const loadDeliveries: Reminder[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // esse é um outro modo de fazer
      const reminder: Reminder = {
        date: data.date.toDate(), //Convert Firestore Timestamp To Date
        title: data.title,
        cliente: data.cliente,
        address: data.address,
      }
      loadDeliveries.push(reminder)
    })

    setSelectedDates(loadDeliveries)
  }

  async function handleSave(){
    if(!selectedDate || !title || !cliente || !address){
      toast.error('Selecione uma data e preencha os campos!')
      return
    }
    setLoadSaveDelivery(true)
    try {
      const firestore = getFirestore()

      if(selectedDate){
        const newReminder: Reminder = {
          date: selectedDate,
          title: title,
          cliente: cliente,
          address: address,
        }
        const reminderData = {
          ...newReminder,
          userId: user?.id
        }

        const deliveryCollectionRef = collection(firestore, 'delivery')
        await addDoc(deliveryCollectionRef, reminderData)
        toast.success('Entrega adicionada!')
        loadDeliveries() // executa a função de carregar entregas toda vez que salva uma nova entrega
        setLoadSaveDelivery(false)
        setDeliveryExistsForSelectedDate(true) // bota desabilita na data cadastrada
      }      
      setTitle('')
      setCliente('')
      setAddress('')
    } catch (error) {
      toast.error('Não foi possível salvar a entrega!')
      setLoadSaveDelivery(false)
    }
    
  }
  
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleClienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCliente(event.target.value)
  }
  
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const selectedDateFormatted = selectedDate
    ? selectedDate.toLocaleDateString()
    : ''

  const selectedInfo = selectedDates.find(
    (reminder) => reminder.date.toDateString() === selectedDate?.toDateString()
  )

  const markedContent = ({ date, view }: any) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const isSelected = selectedDates.some(
        (reminder) => reminder.date.toDateString() === dateString
      )
      return isSelected ? <MarkedDate /> : null
    }
    return null
  }
  

  async function handleDeleteDate(dateToDelete: Date){
    if(!dateToDelete){
      return
    }

    try {
      const firestore = getFirestore()
      const userDeliveriesCollectionRef = collection(firestore, 'delivery')

      // Encontre o documento correspondente à data selecionada e ao userId
      const querySnapshot = await getDocs(query(userDeliveriesCollectionRef, where('userId', '==', user?.id)))

      querySnapshot.forEach(async (docDate) => {
        const data = docDate.data();
        if (data.date.toDate().toDateString() === dateToDelete.toDateString()) {
          const docRef = doc(userDeliveriesCollectionRef, docDate.id)
          await deleteDoc(docRef)
        }
      })

      toast.success('Entrega cancelada!')
      loadDeliveries()
      setSelectedDate(null)
      setDeliveryExistsForSelectedDate(false)
      
      } catch (error) {
        toast.error('Não foi possível excluir a entrega!')
    }
  }

  return (
    <Container>
      
      <Header>
          <TitleHeader>Entregas</TitleHeader>
          {/* 
          <button>
              <BsFillTruckFrontFill 
                  size={20}
                  color={defaultTheme['orange-dark']}
              />
          </button>
          */}
      </Header>

      <CalendarContainer>
        
        <StyledCalendar
          value={selectedDate}
          onClickDay={handleDateClick}
          calendarType='US'
          showNavigation={true}
          showNeighboringMonth={false}
          tileClassName={({ date }) =>
          selectedDates.find(
            (reminder) => reminder.date.toDateString() === date.toDateString()
          )
            ? 'selected'
            : ''
          }
          tileContent={markedContent}
        />

        <ContainerForm>
          <Form>
            <h3>Próxima entrega: 
              {selectedDateFormatted && <span>{selectedDateFormatted}</span>} 
            </h3>
            
            <form>
              <input 
                type="text" 
                value={title}
                onChange={handleTitleChange}
                placeholder='Nome Projeto'
              />
              <input 
                type="text" 
                value={cliente}
                onChange={handleClienteChange}
                placeholder='Nome Cliente'
              />
              <input 
                type="text" 
                value={address}
                onChange={handleAddressChange}
                placeholder='Endereço'
              />

              <button 
                type="button" 
                onClick={handleSave}
                disabled={deliveryExistsForSelectedDate}
              >
                { loadSaveDelivery ? <Load/> : 'cadastrar' }
              </button>
            </form>
          </Form>

          {selectedInfo && (
            <Info>
              <div>
                <h3>Entrega </h3>
                <button onClick={() => handleDeleteDate(selectedInfo.date)}>
                  <BsTrash size={20} color='#ff4f4f' />
                </button>
              </div>
              <p> <span>Projeto: </span> {selectedInfo.title}</p>
              <p> <span>Cliente:</span> {selectedInfo.cliente}</p>
              <p> <span>Endereço:</span> {selectedInfo.address}</p>
            </Info>
          )}
        </ContainerForm>

      </CalendarContainer>

    </Container>
  )
}

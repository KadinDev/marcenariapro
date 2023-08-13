import {useState, useEffect} from 'react'

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

interface Reminder {
    date: Date;
    title: string;
    cliente?: string;
    address: string;
  }

export function Deliveries(){

  const titlePage = 'Marcenaria | '
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDates, setSelectedDates] = useState<Reminder[]>([])
  const [title, setTitle] = useState('')
  const [cliente, setCliente] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    document.title = `${titlePage} Entregas`
  },[])
  
  function handleDateClick(date: Date){
    setSelectedDate(date)
  }

  function handleSave(){
    if(!selectedDate){
      alert('Selecione uma data para entrega!')
      return
    } else if (!title){
      alert('Coloque um nome!')
      return
    } else if (!cliente){
      alert('Entrega para qual cliente?')
      return
    } else if(!address){
      alert('Escreva o endereço para entrega!')
      return
    }

    // Lógica para salvar as informações na data selecionada
    if (selectedDate) {
      // Salvar as informações na data marcada
      const newReminder: Reminder = {
        date: selectedDate,
        title: title,
        cliente: cliente,
        address: address,
      }
      setSelectedDates([...selectedDates, newReminder])
      setTitle('')
      setCliente('')
      setAddress('') 
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

  function handleDeleteDate(){
    if(!selectedDate) {
      return
    }

    const newSelectedDates = selectedDates.filter(
      (reminder) => reminder.date.toDateString() !== selectedDate.toDateString()
    )

    setSelectedDates(newSelectedDates)
    setSelectedDate(null)
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
                required
              />
              <input 
                type="text" 
                value={cliente}
                onChange={handleClienteChange}
                placeholder='Nome Cliente'
                required
              />
              <input 
                type="text" 
                value={address}
                onChange={handleAddressChange}
                placeholder='Endereço'
                required
              />

              <button type="button" onClick={handleSave}>
                cadastrar
              </button>
            </form>
          </Form>

          {selectedInfo && (
            <Info>
              <div>
                <h3>Entrega </h3>
                <button onClick={handleDeleteDate}>
                  <BsTrash size={20} color='#ff4f4f' />
                </button>
              </div>
              <p> Projeto: {selectedInfo.title}</p>
              <p> Cliente: {selectedInfo.cliente}</p>
              <p> Endereço: {selectedInfo.address}</p>
            </Info>
          )}
        </ContainerForm>

      </CalendarContainer>

    </Container>
  )
}

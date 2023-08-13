import {useEffect, useState} from 'react'

import {
    Container,
    Header,
    TitleHeader,
    TransactionsTable,
    PriceHightlight,
    NavigationMonth,
    Total,
    TotalTransactions,
    Separator
} from './styles'

import { 
    FaMoneyBillAlt, 
    FaArrowCircleLeft, 
    FaArrowCircleRight,
    FaArrowCircleUp,
    FaArrowCircleDown 
} from 'react-icons/fa';
import { defaultTheme } from '../../styles/themes';

import { NewTransactionModal } from '../../components/NewTransactionModal'
import { ModalComponent } from '../../components/Modal'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import { transactions } from '../../utils/testes'
import { dateFormatter, moneyFormatter } from '../../utils/Formatted'

//import { SearchForm } from '../../components/SearchForm'

export function Bank(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const titlePage = 'Marcenaria | '

    useEffect(() => {
        document.title = `${titlePage} Finanças`
    },[])

    useEffect(() => {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.description.toLowerCase().includes(searchText.toLowerCase())
        )
    
        // Calcular o primeiro dia e o último dia do mês atual
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const firstDay = new Date(year, currentMonth, 1)
        const lastDay = new Date(year, currentMonth + 1, 0, 23, 59, 59)
    
        // Filtrar transações pelo intervalo de datas
        const filteredByMonth = filteredTransactions.filter(
            (transaction) => {
              const transactionDate = new Date(transaction.date)
              return transactionDate >= firstDay && transactionDate <= lastDay
            }
        );
    
        // Ordenar transações por data
        filteredByMonth.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
        setFilteredTransactions(filteredByMonth)
    }, [searchText, currentMonth])

    useEffect(() => {
        let income = 0
        let expenses = 0

        filteredTransactions.forEach(transaction => {
            if (transaction.type === 'income' ){
                income += transaction.price
            } else if (transaction.type === 'outcome'){
                expenses += transaction.price
            }
        })

        setTotalIncome(income)
        setTotalExpenses(expenses)

    },[filteredTransactions])
    
    function openModal(){
        setIsModalOpen(true)
    }
    
    function closeModal(){
        setIsModalOpen(false)
    }

    function handleNextMonth() {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    }
    
    function handlePreviousMonth() {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    }

    const getMonthRangeText = () => {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const startDate = new Date(year, currentMonth, 1)
        //const endDate = new Date(year, currentMonth + 1, 0)
        
        const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
        const monthName = monthFormatter.format(startDate)

        //return `Transações do dia 1 ao ${endDate.getDate()} de ${monthName}`
        return monthName
    }


    return (
        <Container>
            <Header>
                <TitleHeader>Finanças</TitleHeader>
                
                <NavigationMonth>
                    <button onClick={handlePreviousMonth}>
                        <FaArrowCircleLeft size={24} color={defaultTheme['title']} />
                    </button>
                    
                    <span>{getMonthRangeText()}</span>

                    <button onClick={handleNextMonth}>
                        <FaArrowCircleRight size={24} color={defaultTheme['title']} />
                    </button>
                </NavigationMonth>

                <button onClick={openModal} >
                    <FaMoneyBillAlt 
                        size={20}
                        color={defaultTheme['green-bank']}
                    />
                </button>
            </Header>
            
            {/* 
            <SearchForm
                placeholder='Encontrar uma Transação'
                value={searchText}
                onChange={e => setSearchText(e)}
            />
            */}

            <Total>
                <div>
                    <TotalTransactions variant='income'> 
                        {moneyFormatter(String(totalIncome))} 
                    </TotalTransactions>
                    <span>
                        <FaArrowCircleUp size={24} color={defaultTheme['green-bank']} />
                    </span>
                </div>
                <Separator/>
                <div>
                    <span>
                        <FaArrowCircleDown size={24} color={defaultTheme.red} />
                    </span>
                    <TotalTransactions variant='outcome'> 
                        {moneyFormatter(String(totalExpenses))} 
                    </TotalTransactions>
                </div>
            </Total>

            {/* 
            <Form>
                <form action="#">
                    <input 
                        type="text" 
                        placeholder='Pesquisar Transação'
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </form>
            </Form>
            */}


            <TransactionsTable>
                <tbody>
                    {filteredTransactions.map(transaction => {
                        return (
                            <tr key={transaction.id} >
                                
                                <td > {transaction.description} </td>

                                <td> 
                                    {transaction.type === 'income' || transaction.type === 'outcome' ? (
                                        <PriceHightlight variant={transaction.type} >
                                            {transaction.type === 'outcome' && '- '}
                                            {moneyFormatter(String(transaction.price)) }
                                        </PriceHightlight>
                                    ) : (
                                        // Renderizar algum conteúdo alternativo ou exibir um erro adequado
                                        <span>Invalid type</span>
                                    )}
                                </td>


                                {/* <td> {transaction.category} </td> */}
                                <td> {dateFormatter.format(new Date(transaction.date))} </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </TransactionsTable>


            <ModalComponent
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <NewTransactionModal closeModal={closeModal} />
            </ModalComponent>

        </Container>
    )
}

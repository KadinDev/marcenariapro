import {useEffect, useState, useContext} from 'react'

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
    FaArrowCircleDown,
    FaTrash
} from 'react-icons/fa';
import { defaultTheme } from '../../styles/themes';

import { NewTransactionModal } from '../../components/NewTransactionModal'
import { ModalComponent } from '../../components/Modal'
import Modal from 'react-modal'
Modal.setAppElement('#root')

import { dateFormatter, moneyFormatter } from '../../utils/Formatted'

import { Load } from '../../components/Load'
import {toast} from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
    doc,
    deleteDoc,
} from 'firebase/firestore'

type TransactionsProps = {
    id: string;
    description: string;
    type: string;
    price: string;
    date: string;
}

export function Bank(){
    const {user} = useContext(AuthContext)
    const [load, setLoad] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [totalIncome, setTotalIncome] = useState(0) // Entradas
    const [totalExpenses, setTotalExpenses] = useState(0) // Saídas

    const titlePage = 'Marcenaria | '

    useEffect(() => {
        document.title = `${titlePage} Finanças`
        loadTransactions()
    },[])

    
    // Carregar transações por Data
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

    }, [searchText, currentMonth, transactions])


    // Calculo de entradas e saídas
    useEffect(() => {
        let income = 0
        let expenses = 0

        filteredTransactions.forEach(transaction => {
            if (transaction.type === 'income' ){
                income += parseFloat(transaction.price)
            } else if (transaction.type === 'outcome'){
                expenses += parseFloat(transaction.price)
            }
        })

        setTotalIncome(income)
        setTotalExpenses(expenses)

    },[filteredTransactions])
    

    async function loadTransactions(){
        setLoad(true)
        const firestore = getFirestore()
        const transactionCollectionRef = collection(firestore, 'transactions')
        const querySnapshot = await getDocs(query(transactionCollectionRef, where('userId', '==', user?.id)))

        const loadingTransactionsUser: TransactionsProps[] = []
        querySnapshot.forEach((doc) => {
            loadingTransactionsUser.push({ id: doc.id, ...doc.data() } as TransactionsProps )
        })

        setTransactions(loadingTransactionsUser)
        setLoad(false)
    }

    
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

    async function handleDeleteTransaction(id: string){

        try {
            const firestore = getFirestore()
            const transactionsDocRef = doc(firestore, 'transactions', id)
            
            await deleteDoc(transactionsDocRef)
            setFilteredTransactions(transacoesAnteriores =>
                transacoesAnteriores.filter(transacao => transacao.id !== id)
            )
            
            toast.success('Transação excluída com sucesso!')
            
        } catch (error) {
            toast.success('Não foi possível excluir a transação.')
        }
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

           { load ? (
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <Load />
                </div>
           ) : (
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
                                    
                                    <td>
                                        <button 
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                
                </TransactionsTable>
           )}
            


            <ModalComponent
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <NewTransactionModal 
                    closeModal={closeModal} 
                    loadTransactions={loadTransactions}
                />
            </ModalComponent>

        </Container>
    )
}

import { useEffect, useState, useContext } from 'react'

import {
    Container,
    Header,
    TitleHeader,
    TableContainer,
} from './styles'

import {BsPersonFillAdd, BsInfo, BsArrowLeft, BsArrowRight, BsFillPeopleFill} from 'react-icons/bs'
import {defaultTheme} from '../../styles/themes'

import { phoneFormatter } from '../../utils/Formatted'
import { NewClientModal, ExistingClientData } from '../../components/NewClienteModal'
import { ModalComponent } from '../../components/Modal'
import { SearchForm } from '../../components/SearchForm'
import { Load } from '../../components/Load'

import { AuthContext } from '../../contexts/auth'
import {
    collection,
    query,
    where,
    getDocs,
    getFirestore
} from 'firebase/firestore'

import Modal from 'react-modal'
Modal.setAppElement('#root')

interface AddressProps {
    address: string;
    maxLength: number;
}

export function Customers(){
    const { user } = useContext(AuthContext)
    
    const linkContact = 'https://wa.me/55'
    const titlePage = 'Marcenaria | ';
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(true)
 
    const [clients, setClients] = useState<ExistingClientData[]>([])
    const [filteredClientes, setFilteredClientes] = useState(clients)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<ExistingClientData | null>(null)

    const [currentPage, setCurrentPage] = useState(1)
    const clientsPerPage = 5

    useEffect(() => {
        document.title = `${titlePage} Clientes`
    },[]);
    

    // Carregamento de clientes
    async function loadClients(){
        setLoading(true)

        const firestore = getFirestore()
        const userClientsCollectionRef = collection(firestore, 'clients')
        const querySnapshot = await getDocs(query(userClientsCollectionRef, where('userId', '==', user?.id )))
        
        const loadClients: ExistingClientData[] = []
        querySnapshot.forEach((doc) => {
            loadClients.push({ clientId: doc.id, ...doc.data() } as ExistingClientData )
        })

        setClients(loadClients)
        setLoading(false)
    }
    useEffect(() => {
        loadClients()
    },[])
    
    
    // carregamento pelo filtro e carregamento de clientes acima
    // passado para a const: clients
    useEffect(() => {
        const filteredClientes = clients.filter(cliente =>
            cliente.name.toLowerCase().includes(searchText.toLowerCase())
        )
        // ordem alfabética
        filteredClientes.sort( (a, b) => a.name.localeCompare(b.name) )

        setFilteredClientes(filteredClientes)
        
        // Atualize também a página atual se a filtragem afetar a exibição
        setCurrentPage(1) // Volte para a página 1 após cada filtragem
    }, [searchText, clients])


    // Renderiza apenas os clientes da página atual
    const indexOfLastClient = currentPage * clientsPerPage
    const indexOfFirstClient = indexOfLastClient - clientsPerPage
    const currentClients = filteredClientes.slice(indexOfFirstClient, indexOfLastClient)

    function AddressLimiteClient({ address, maxLength } : AddressProps){
        const truncatedAddress = address.length > maxLength ? `${address.slice(0, maxLength)}...` : address;
        return <td>{truncatedAddress}</td>;
    }

    function openModal(){
        setIsModalOpen(true)
        setSelectedClient(null)
    }
    
    function closeModal(){
        setIsModalOpen(false)
        setSelectedClient(null)
    }

    function openModalWithClient(client : ExistingClientData){
        if(client.clientId){
            setSelectedClient(client)
        } else {
            setSelectedClient(null)
        }
        setIsModalOpen(true)
    }

    return (
        <Container>
            
            <ModalComponent
                isOpen={isModalOpen}
                onClose={closeModal}
            >   
                <NewClientModal 
                    existingClientData={selectedClient || undefined } 
                    closeModal={closeModal}
                    loadClients={loadClients}
                />
            </ModalComponent>

            <Header>
                <TitleHeader>Clientes</TitleHeader>

                <button onClick={openModal}>
                    <BsPersonFillAdd 
                        size={20}
                        color={defaultTheme['orange-dark']}
                    />
                </button>

            </Header>

            <SearchForm
                onChange={(e => setSearchText(e))}
                placeholder='Encontrar Cliente'
                value={searchText}
            />

            { loading ? (
                <div style={{textAlign: 'center', fontSize: 30}} >
                    <Load/>
                </div>
            ) : (
                <TableContainer>
                    <p> {filteredClientes.length} clientes </p>

                    <table>
                        <thead>
                            <tr>
                                <th> Nome </th>
                                <th> Endereço </th>
                                <th> Contato </th>
                                <th> </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {currentClients.map(client => {
                                return (
                                    <tr key={client.clientId}>

                                        <td> {client.name} </td>

                                        <AddressLimiteClient 
                                            address={client.address} 
                                            maxLength={37}
                                        />

                                        {/* <td> {client.address} </td> */}

                                        <td>
                                            <a href={`${linkContact}${String(client.contact).replace(/[()\s-]/g, '')}`} target='_blank'>
                                                {phoneFormatter(String(client.contact))}
                                            </a>
                                        </td>
                                    
                                        {/* 
                                        <td>
                                            { dateFormatter.format(new Date(client.date)) }
                                        </td>
                                        */}
                                        
                                        <td>
                                            <button onClick={() => 
                                                openModalWithClient({...client, contact: client.contact})} >
                                                <BsInfo
                                                    size={25}
                                                    color={defaultTheme['orange-dark']}
                                                />
                                            </button>

                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                    <div className="pagination-buttons">
                        <div className="buttons">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <BsArrowLeft size={20}/>
                            </button>
                            <BsFillPeopleFill size={20} />
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentClients.length < clientsPerPage}
                            >
                                <BsArrowRight size={20}/>
                            </button>
                        </div>
                    </div>


                </TableContainer>
            ) }

            
        </Container>
    )
}

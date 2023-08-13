import { useEffect, useState } from 'react'

import {
    Container,
    Header,
    TitleHeader,
    TableContainer,
} from './styles'

import {BsPersonFillAdd, BsInfo} from 'react-icons/bs'
import {defaultTheme} from '../../styles/themes'

import {clientes} from '../../utils/testes'
import { phoneFormatter } from '../../utils/Formatted'
import { NewClientModal, ExistingClientData } from '../../components/NewClienteModal'
import { ModalComponent } from '../../components/Modal'
import { SearchForm } from '../../components/SearchForm'

import Modal from 'react-modal'
Modal.setAppElement('#root')


interface AddressProps {
    address: string;
    maxLength: number;
}


export function Customers(){
    const linkContact = 'https://wa.me/55'
    const titlePage = 'Marcenaria | ';

    const [searchText, setSearchText] = useState('')
    const [filteredClientes, setFilteredClientes] = useState(clientes)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<ExistingClientData | null>(null)

    useEffect(() => {
        document.title = `${titlePage} Clientes`
    },[]);
    
    useEffect(() => {
        const filteredClientes = clientes.filter(cliente =>
            cliente.name.toLowerCase().includes(searchText.toLowerCase())
        )
        // ordem alfabética
        filteredClientes.sort( (a, b) => a.name.localeCompare(b.name) )

        setFilteredClientes(filteredClientes)
    },[searchText])


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
        if(client.id){
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
                            {filteredClientes.map(client => {
                                return (
                                    <tr key={Number(client.id)}>

                                        <td> {client.name} </td>

                                        <AddressLimiteClient 
                                            address={client.address} 
                                            maxLength={37}
                                        />

                                        {/* <td> {client.address} </td> */}

                                        <td>
                                            <a href={`${linkContact}${client.contact}`} target='_blank'> 
                                                {phoneFormatter(client.contact)} 
                                            </a>
                                        </td>
                                    
                                        {/* 
                                        <td>
                                            { dateFormatter.format(new Date(client.date)) }
                                        </td>
                                        */}
                                        
                                        <td>
                                            <button onClick={() => 
                                                openModalWithClient({...client, contact: parseInt(client.contact)})} >
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
            </TableContainer>

            
        </Container>
    )
}

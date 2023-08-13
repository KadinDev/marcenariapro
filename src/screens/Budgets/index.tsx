import React, {useEffect, useState, FormEvent} from 'react'

import {
    Container,
    Header,
    TitleHeader,
    Form,
    InfoClient,
    TextArea,
    HeaderTextArea,
    Prices,
    TotalValueItems,
    ItemPrice,
    Item,
    Separator,
    Desconto
} from './styles'

import { defaultTheme } from '../../styles/themes'
import { FaTag, FaInfo, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'

import { InputForm } from '../../components/InputForm'
import { ModalComponent } from '../../components/Modal'
import { Relatorio } from '../../components/Relatorio'
import { Descricao } from '../../components/Descricao'
import { Contrato } from '../../components/Contrato'
import { PdfBudgets } from '../../components/PdfBudgets'
import { phoneFormatter, moneyFormatter } from '../../utils/Formatted'
import { NewBudgetsProps } from '../../components/PdfBudgets'
import { Receipts } from '../../components/Receipts'

export function Budgets(){
    const titlePage = 'Marcenaria | '

    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [report, setReport] = useState('')
    const [description, setDescription] = useState('')
    const [contract, setContract] = useState('')

    const [items, setItems] = useState( [{ name: '', price: 0, quantity: 1 }] )
    const [totalValueItems, setTotalValueItems] = useState('')
    const [discount, setDiscount] = useState('')

    const [openModal, setOpenmodal] = useState(false)
    const [selectedContentModal, setSelectedContentModal] = useState('')
    const [modalPdf, setModalPdf] = useState(false)

    const [newBudgets, setNewBudgets] = useState<NewBudgetsProps>( {} as NewBudgetsProps )

    const [createReceipts, setCreateReceipts] = useState(false)

    useEffect(() => {
        document.title = `${titlePage} Orçamentos`
    },[]);
    
    // sempr que eu add ou remover algum item ele vai recalcular o valor
    useEffect(() => {
        calculateTotalValue();
        setTotalValueItems(calculateTotalValue)
    }, [items]);

    function toogleModal(value : string){
        setOpenmodal(true)
        setSelectedContentModal(value)
    }
    
    function addItem() {
        setItems([...items, { name: '', quantity: 1, price: 0 }])
    }
    
    function removeItem(index : number) {
        setItems(items.filter((_, i) => i !== index))
    }

    function handleItemNameChange(
        e: React.ChangeEvent<HTMLInputElement>, 
        index: number
    ) {
        const { value } = e.target
        const updatedItems = [...items]
        updatedItems[index].name = value
        setItems(updatedItems)
    }

    function handleItemQuantityChange(
        e: React.ChangeEvent<HTMLInputElement>, 
        index: number
        ) {
        const { value } = e.target
        const updatedItems = [...items]
        updatedItems[index].quantity = parseInt(value)
        setItems(updatedItems)
    }

    function handleItemPriceChange(
            e: React.ChangeEvent<HTMLInputElement>, 
            index: number
        ) {
        
        const { value } = e.target;
        const unformattedValue = value.replace(/[R$\s.,]/g, ''); // Remove a formatação do valor
        const parsedValue = parseFloat(unformattedValue); // Converte para número
        const updatedItems = [...items];
        updatedItems[index].price = isNaN(parsedValue) ? 0 : parsedValue;
        setItems(updatedItems);
    }

    // Calcular valor total de cada item
    function calculateItemTotal(index : number){
        const item = items[index]
        if(item) {
            const {price, quantity} = item
            const total = price * quantity
            return moneyFormatter(total.toString())
        }
        return 'R$ 0.00'
    }

    // Calcular valor total de todos os items
    function calculateTotalValue(){
        let total = 0
        items.forEach((item) => {
            total += item.price * item.quantity
        })
        return moneyFormatter(total.toString())
    }
    
    // Calcular valor total com desconto para o clente
    function calculateTotalWithDiscount() {
        const totalValue: number = parseFloat(calculateTotalValue().replace(/[R$\s.,]/g, '')) || 0
        const discountValue: number = parseFloat(discount.replace(/[R$\s.,]/g, '')) || 0
        const discountTotal: number = totalValue - discountValue
        
        return moneyFormatter(discountTotal.toString())
    }

    function handleCreateBudgets(event: FormEvent){
        event.preventDefault()

        const totalWithDiscount = calculateTotalWithDiscount()

        const newBudgets = {
            title,
            name,
            address,
            tel,
            email,
            report,
            description,
            contract,
            items: items.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity // Calcula o valor total do item
            })),
            totalValueItems,
            discount,
            totalWithDiscount
        }

        setNewBudgets(newBudgets as NewBudgetsProps)
        console.log(newBudgets)
        setModalPdf(true)
    }

    function handleCloseModal(){
        setModalPdf(!modalPdf)
    }

    return (
        <Container>
            <Header>
                <TitleHeader>
                    { createReceipts ? 'Criar Recibo' : 'Orçamentos' }
                </TitleHeader>
                <button
                    onClick={() => setCreateReceipts(!createReceipts)}
                >   
                { createReceipts ? (
                    <FaArrowLeft 
                        size={20}
                        color={defaultTheme['green-bank']}
                    />
                ) : (
                    <FaTag 
                        size={20}
                        color={defaultTheme['green-bank']}
                    />
                )}
                </button>
            </Header>

            { createReceipts ? (
                <Receipts/>
            ) : (

                <Form>
                    <form onSubmit={handleCreateBudgets} >
                        <InputForm 
                            type='text'
                            required
                            placeholder='Título do orçamento' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        
                        <InfoClient>
                            <div>
                                <InputForm 
                                    type='text'
                                    required
                                    placeholder='Nome do cliente' 

                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <InputForm
                                    type='text'
                                    required
                                    placeholder='Celular do cliente' 
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}

                                    onInput={(event) => {
                                        const inputElement = event.target as HTMLInputElement;
                                        inputElement.value = phoneFormatter(inputElement.value)
                                    }}
                                />
                            </div>
                            <div>
                                <InputForm
                                    type='text'
                                    required
                                    placeholder='Endereço do cliente'

                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <InputForm
                                    type='email'
                                    placeholder='Email do cliente - (Opcional)'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                        </InfoClient>
                        
                        <Separator />

                        <TextArea>
                            <HeaderTextArea>
                                <h2>Relatório Inicial</h2>
                                <a onClick={() => toogleModal('relatorio')} >
                                    <FaInfo size={14} />
                                </a>
                            </HeaderTextArea>
                            <textarea required value={report} onChange={(e) => setReport(e.target.value)} ></textarea>
                        </TextArea>

                        <TextArea>
                            <HeaderTextArea>
                                <h2>Descrição das Atividades</h2>
                                <a onClick={() => toogleModal('descricao')} >
                                    <FaInfo size={14} />
                                </a>
                            </HeaderTextArea>
                            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </TextArea>

                        <Separator />

                        <Prices>
                            { items.map( (item, index) => (
                                <ItemPrice key={index} >
                                    <Item>
                                        <InputForm
                                            type='text'
                                            required
                                            placeholder='Nome do item'
                                            
                                            value={item.name}
                                            onChange={(e) => handleItemNameChange(e, index)}
                                        />

                                        <div>
                                            <span>Qtde.</span>
                                            <InputForm
                                            style={{ width: '4.50rem', marginLeft: '2px' }}
                                            type='number'
                                            required
                                            placeholder='0'

                                            value={item.quantity.toString()}
                                            onChange={(e) => handleItemQuantityChange(e, index)}
                                            />
                                        </div>

                                        <div style={{position: 'relative'}}>

                                            <span style={{position: 'absolute', top: -20, left: 0, 
                                                color: defaultTheme.red, fontSize: '14px' }}>valor da unidade
                                            </span>
                                            
                                            <InputForm
                                                style={{ width: '7.5rem', marginLeft: '20px', marginRight: '20px' }}
                                                type='text'
                                                required
                                                placeholder='Preço da unidade'

                                                value={isNaN(item.price) ? '' : moneyFormatter(item.price.toString())} // Valor formatado como string se for um número válido
                                                onChange={(e) => handleItemPriceChange(e, index)}

                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const unformattedValue = inputElement.value.replace(/[R$\s.,]/g, ''); // Remove a formatação do valor
                                                    const parsedValue = parseFloat(unformattedValue); // Converte para número
                                                    
                                                    if (!isNaN(parsedValue)) {
                                                        const formattedValue = moneyFormatter(parsedValue.toString()); // Formata o novo valor
                                                        inputElement.value = formattedValue; // Atualiza o valor formatado no input
                                                    }
                                                }}
                                            />
                                        </div>

                                        <a onClick={addItem}>
                                            <IoIosAddCircle size={25} color={defaultTheme['green-bank']} />
                                        </a>

                                        {index > 0 && (
                                            <a style={{marginLeft: 10}} onClick={() => removeItem(index)}>
                                                <FaTrash size={20} color={defaultTheme.red}  />
                                            </a>
                                        )}
                                                        
                                    </Item>

                                    <p> Total Item: <span>{calculateItemTotal(index)}</span> </p>
                                    <Separator />
                                    
                                </ItemPrice>
                            )) }

                        </Prices>
                        
                        <TotalValueItems>
                            <span> {calculateTotalValue()} </span>
                        </TotalValueItems>

                        <Separator />

                        <Desconto>
                            <p>Desconto</p>
                            <InputForm
                                type='text'
                                placeholder='Desconto para o cliente?'
                                
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                
                                onInput={(e) => {
                                    const inputElement = e.target as HTMLInputElement
                                    inputElement.value = moneyFormatter(inputElement.value)
                                    setDiscount(calculateTotalWithDiscount())}
                                } 

                            />
                            <p>Total com desconto:</p>
                            
                            { discount === '' || discount === 'R$ ,' ? (
                                <span> R$ 0 </span>
                            ) : (
                                <span>  {calculateTotalWithDiscount()} </span>
                            ) }

                        </Desconto>

                        <TextArea>
                            <HeaderTextArea>
                                <h2>Condições de Contrato</h2>
                                <a onClick={() => toogleModal('contrato')} >
                                    <FaInfo size={14} />
                                </a>
                            </HeaderTextArea>
                            <textarea required value={contract} onChange={(e) => setContract(e.target.value)} ></textarea>
                        </TextArea>


                        <button type='submit' >Gerar orçamento</button>

                    </form>
                </Form>
            ) }
                
                
            
            <ModalComponent 
                isOpen={openModal} 
                onClose={() => setOpenmodal(false)}
            >   
                { selectedContentModal === 'relatorio' && 
                    <Relatorio closeModal={ () => setOpenmodal(false)} />
                }
                { selectedContentModal === 'descricao' && 
                    <Descricao closeModal={ () => setOpenmodal(false)} />
                }
                { selectedContentModal === 'contrato' && 
                    <Contrato closeModal={ () => setOpenmodal(false)} />
                }
            </ModalComponent>
            
            <ModalComponent
                isOpen={modalPdf}
                onClose={() => setModalPdf(false)}
            >
                <PdfBudgets 
                    newBudgets={newBudgets} 
                    closeModal={handleCloseModal}
                />
            </ModalComponent>

        </Container>
    )
}

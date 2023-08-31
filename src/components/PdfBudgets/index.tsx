import { useEffect, useState, useContext } from 'react'

import {
    Container,
    Close,
    BackgroundPdf,
    ContentPdf,
    Border,
    Header,
    InfoBudget,
    Report,
    Description,
    Prices,
    ContentItems,
    NameItem,
    InfoItem,
    InfoTotalItems,
    Contract,
} from './styles'

import { GrClose } from 'react-icons/gr'
import { dateFormatter, moneyFormatter } from '../../utils/Formatted'
import {AuthContext} from '../../contexts/auth'

import { Pdf } from './Pdf'

export interface NewBudgetsProps  {
    title?: string;
    name?: string;
    address?: string;
    tel?: string;
    email?: string;
    report?: string;
    description?: string;
    contract?: string;
    totalValueItems?: string;
    discount?: string;
    totalWithDiscount?: string;
    items: [{
        name?: string;
        price?: number;
        quantity?: number;
        total?: number;
    }]
}

type BudgetsProps = {
    newBudgets: NewBudgetsProps 
    closeModal: () => void;
}

export function PdfBudgets( {newBudgets, closeModal} : BudgetsProps ){
    const { user } = useContext(AuthContext)
    const [formattedReportContent, setFormattedReportContent] = useState('')
    const [formattedDescriptionContent, setFormattedDescriptionContent] = useState('')
    const [formattedContractContent, setFormattedContractContent] = useState('')

    useEffect(() => {
        const delay = 200
    
        const timer = setTimeout(() => {
          const reportContent = newBudgets.report as string
          const descriptionContent = newBudgets.description as string // Conteúdo da descrição vindo do backend
          const contractContent = newBudgets.contract as string // Conteúdo do contrato vindo do backend
          
          const formattedReportContent = reportContent.replace(/\n/g, '<br>')
          const formattedDescriptionContent = descriptionContent.replace(/\n/g, '<br>') // Substitui todas as ocorrências de '\n' por '<br>'
          const formattedContractContent = contractContent.replace(/\n/g, '<br>') // Substitui todas as ocorrências de '\n' por '<br>'
    
          setFormattedReportContent(formattedReportContent)
          setFormattedDescriptionContent(formattedDescriptionContent)
          setFormattedContractContent(formattedContractContent)
        }, delay)
    
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <Container/>
            <BackgroundPdf>
                <ContentPdf>
                    <Close onClick={closeModal}>
                        <GrClose size={24} />
                    </Close>
                    <Border>
                    
                        <Header>
                            <h1> {newBudgets.title} </h1>
                            <span> Criado em {dateFormatter.format(Date.now())} </span>
                            {/*
                            <img src={user?.avatarUrl} alt="Foto de perfil Marcenaria" />
                            */} 
                        </Header>

                        <InfoBudget>
                            <div>
                                <span>DE</span>
                                <strong> {user?.name} </strong>
                                <p> {user?.address} </p>
                                <p> {user?.contact} </p>
                                <p> {user?.cnpjOrcpf} </p>
                            </div>
                            <div>
                                <span>para</span>
                                <strong> {newBudgets.name} </strong>
                                <p> {newBudgets.address} </p>
                                <p> {newBudgets.tel} </p>
                                <p> {newBudgets.email} </p>
                            </div>
                        </InfoBudget>

                        <Report>
                            <h1> Relatório Inicial </h1>
                            <p dangerouslySetInnerHTML={{ __html: formattedReportContent }}></p>
                        </Report>

                        <Description>
                            <h1> Descrição das Atividades </h1>
                            <p dangerouslySetInnerHTML={{ __html: formattedDescriptionContent }}></p>
                        </Description>

                        <Prices>
                            <h1> Preços </h1>
                            <section>
                                { newBudgets.items.map((item, index) => (
                                    <ContentItems key={index} >
                                        <NameItem>
                                            <span>Item</span>
                                            <p> { item.name } </p>
                                        </NameItem>
                                        <InfoItem>
                                            <div>
                                                <span>Tipo</span>
                                                <p> Unidade </p>
                                            </div>
                                            <div>
                                                <span>Qtde..</span>
                                                <p> {item.quantity} </p>
                                            </div>
                                            <div>
                                                <span>Unit.</span>
                                                {item.price ? <p>{moneyFormatter(item.price.toString())}</p> : null}

                                            </div>
                                            <div>
                                                <span>Subtotal</span>
                                                {item.total ? <p>{moneyFormatter(item.total.toString())}</p> : null}
                                            </div>
                                        </InfoItem>
                                    </ContentItems>
                                )) }
                            </section>
                            <InfoTotalItems>
                                <div> <span>Subtotal: {newBudgets.totalValueItems} </span> </div>
                                
                                { newBudgets.discount === 'R$ ,' ? (
                                    <div> <span></span></div>
                                ) : (
                                    <div> <span>Desconto: {newBudgets.discount} </span> </div>
                                ) }
                                
                                <div> <strong><span>Total: {newBudgets.totalWithDiscount} </span></strong> </div>
                            </InfoTotalItems>
                        </Prices>

                        <Contract>
                            <h1> Condições de Contrato </h1>
                            <p dangerouslySetInnerHTML={{ __html: formattedContractContent }}></p>
                        </Contract>
                        
                        {/* Botão para download do PDF */}
                        <Pdf filePdf={newBudgets} />
                
                    </Border>
                </ContentPdf>
            </BackgroundPdf>
    </>
    )
}
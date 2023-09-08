import {useEffect, useContext} from 'react'

import {
    Container,
    Header,
    TitleHeader,
    ContainerWrapper,
    TitleWrapper,
    Wrapper
} from './styles'

import { AiOutlineUsergroupAdd, AiOutlineCar, AiOutlineWallet } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import { AvatarUser } from '../../components/AvatarUser'
import { AuthContext } from '../../contexts/auth'
import { Load } from '../../components/Load'
import { CardDashboard } from '../../components/CardDashboard'
import { EbookMarcenariaPro } from '../../components/EbookMarcenariaPro'
import { moneyFormatter } from '../../utils/Formatted'
import { defaultTheme } from '../../styles/themes'

import { useTotalDeliveries } from '../../hooks/QuantityOfDeliveries'
import { useTotalCustomers } from '../../hooks/QuantityOfCustomers'
import { useTotalIncome, useTotalOutcome } from '../../hooks/UseTotalTransactions'
import { formatNumber } from '../../utils/Formatted'

import logo from '../../assets/logo.png'

export function Dashboard(){
    const titlePage = 'Marcenaria | ';
    const {user} = useContext(AuthContext)

    const totalDeliveries = useTotalDeliveries(user)
    const totalCustomers = useTotalCustomers(user)
    const totalIncome = useTotalIncome(user)
    const totalOutcome = useTotalOutcome(user)

    useEffect(() => {
        document.title = `${titlePage} Dashboard`
    },[]);

    return (
        <Container>
            <Header>
                <TitleHeader> {user?.name} <span> <MdVerified size={20} /> </span> </TitleHeader>
                <AvatarUser avatar={user?.avatarUrl ? user.avatarUrl : logo} />
            </Header>


            <ContainerWrapper>
                <TitleWrapper>resumo</TitleWrapper>

                <Wrapper>
                    <CardDashboard
                        stylesType='green'
                        title='Entradas'
                        icon={AiOutlineWallet}
                        subTitle='todo o período'
                    >
                        <span style={{fontWeight: 'bold', color: defaultTheme['green-bank']}}> 
                            { totalIncome === 0 ? <Load/> : moneyFormatter(totalIncome.toString()) }
                        </span>
                    </CardDashboard>
                    
                    <CardDashboard
                        stylesType='red'
                        title='saídas'
                        icon={AiOutlineWallet}
                        subTitle='todo o período'
                    >
                        
                        <span style={{fontWeight: 'bold', color: defaultTheme['red']}}> 
                            { totalOutcome === 0 ? <Load/> : moneyFormatter(totalOutcome.toString()) }
                        </span>
                    </CardDashboard>
                    
                    <CardDashboard
                        stylesType='orange'
                        title='clientes'
                        icon={AiOutlineUsergroupAdd}
                        subTitle='todos os clientes'
                    >
                       
                        <span style={{fontWeight: 'bold', color: defaultTheme['orange-dark']}}> 
                            {totalCustomers === 0 ? <Load/> : formatNumber(totalCustomers) }
                        </span>
                    </CardDashboard>
                    
                    <CardDashboard
                        stylesType='black'
                        title='entregas'
                        icon={AiOutlineCar}
                        subTitle='todo o período'
                    >   
                        <span style={{fontWeight: 'bold', color: defaultTheme.title}} > 
                            {totalDeliveries === 0 ? <Load/> : formatNumber(totalDeliveries) }
                        </span>
                    </CardDashboard>
                    
                </Wrapper>
            </ContainerWrapper>

            <EbookMarcenariaPro/>

            
        </Container>

    )
}
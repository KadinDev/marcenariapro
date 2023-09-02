import {useEffect, useContext} from 'react'

import {
    Container,
    Header,
    TitleHeader,
    Wrapper
} from './styles'

import { AiOutlineUsergroupAdd, AiOutlineCar, AiOutlineWallet } from 'react-icons/ai'
import { AvatarUser } from '../../components/AvatarUser';
import { AuthContext } from '../../contexts/auth'
import { Load } from '../../components/Load'
import { CardDashboard } from '../../components/CardDashboard'
import { moneyFormatter } from '../../utils/Formatted'

export function Dashboard(){
    const titlePage = 'Marcenaria | ';
    const {user} = useContext(AuthContext)

    useEffect(() => {
        document.title = `${titlePage} Dashboard`
    },[]);

    return (
        <Container>
            <Header>
                <TitleHeader> {user?.name} </TitleHeader>
                <AvatarUser avatar={user?.avatarUrl} />
            </Header>


            <Wrapper>
                <CardDashboard
                    borderType='green'
                    title='Entradas'
                    icon={AiOutlineWallet}
                    subTitle='todo o período'
                    total={moneyFormatter(`150000`)}
                />
                <CardDashboard
                    borderType='red'
                    title='saídas'
                    icon={AiOutlineWallet}
                    subTitle='todo o período'
                    total={moneyFormatter(`210254`)}
                />
                <CardDashboard
                    borderType='orange'
                    title='clientes'
                    icon={AiOutlineUsergroupAdd}
                    subTitle='todos os clientes'
                    total={'210'}
                />
                <CardDashboard
                    borderType='black'
                    title='entregas'
                    icon={AiOutlineCar}
                    subTitle='todo o período'
                    total={`150`}
                />
                
            </Wrapper>

        </Container>

    )
}
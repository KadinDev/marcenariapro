import {useEffect, useContext} from 'react'

import {
    Container,
    Header,
    TitleHeader,
} from './styles'

import { AvatarUser } from '../../components/AvatarUser';
import { AuthContext } from '../../contexts/auth'
import { Load } from '../../components/Load'

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


            <div>
                <section>  </section>
            </div>

        </Container>

    )
}
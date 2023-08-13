import {useEffect, useContext} from 'react'

import {
    Container,
    Header,
    TitleHeader,
} from './styles'

import { AvatarUser } from '../../components/AvatarUser';
import { AuthContext } from '../../contexts/auth'

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
                <AvatarUser />
            </Header>


            <div>
                <section>  </section>
            </div>

        </Container>

    )
}
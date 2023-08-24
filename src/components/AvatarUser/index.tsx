
import {
    Container,
    ImageAvatar
} from './styles'

type AvatarProps = {
    avatar?: string
}
export function AvatarUser( { avatar } : AvatarProps ){
    return (
        <Container>
            <ImageAvatar
                src={avatar}
            />
        </Container>
    )
}
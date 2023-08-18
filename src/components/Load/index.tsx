import {
    LoadButton
} from './styles'

import { AiOutlineLoading } from 'react-icons/ai'

export function Load(){
    return (
        <LoadButton>
            <AiOutlineLoading size={20} />
        </LoadButton>
    )
}
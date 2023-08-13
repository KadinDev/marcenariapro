import {
    Container
} from './styles'

import { IoMdCloseCircle } from 'react-icons/io'

type Props = {
    closeModal: () => void 
}

export function Relatorio( {closeModal} : Props ){
    return (
        <>
        
        <div
            style={{ position: 'fixed', height: '100vh', left: 0, width: '50%', bottom: 0,
            background: 'rgba(0,0,0,0.3)' }}
        />

        <Container>

            <button onClick={closeModal} 
                style={{ position: 'absolute', height: '2.5rem', right: 10, top: 10, width: '2.5rem',
                background: 'transparent', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center' }}
            > 
                <IoMdCloseCircle size={30} color={'black'} />
            </button>

            <span style={{color: 'red', fontWeight: 'bolder'}} >* Este é um modelo *</span> <br/><br/>
            
            <p style={{ color: '#000', textAlign: 'justify', lineHeight: '1.5rem' }} >
                Através deste orçamento, a Marcenaria [<strong>Nome Da Marcenaria</strong>] tem o prazer de apresentar
                nossos serviços de alta qualidade para atender às suas necessidades de mobiliário 
                personalizado. <br/><br/>
                Combinando design criativo, habilidades artesanais e materiais de 
                primeira qualidade, estamos comprometidos em entregar móveis planejados excepcionais 
                para tornar seus espaços únicos e funcionais.

            </p>

        </Container>
        </>
    )
}
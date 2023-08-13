import { IoMdCloseCircle } from "react-icons/io"
import { Container } from "./styles"

type Props = {
    closeModal: () => void 
}

export function Descricao({closeModal} : Props){
    return (
        <>
        <div
        style={{ position: 'fixed', height: '100vh', left: 0, width: '50%', bottom: 0,
        background: 'rgba(0,0,0,0.3)' }}
        />
        <Container
        
        >
            <p style={{color: 'red', fontWeight: 'bolder'}} >* Este é um modelo *</p><br/><br/>

            <button onClick={closeModal} 
                style={{ position: 'absolute', height: '2.5rem', right: 10, top: 10, width: '2.5rem',
                background: 'transparent', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center' }}
            > 
                <IoMdCloseCircle size={30} color={'black'} />
            </button>


            <p style={{fontWeight: 'bold'}} >Móvel 1: Armário Embutido  </p> <br/>
            <p> <strong> Projeto: </strong> Desenvolvimento de um armário embutido sob medida para otimizar o espaço disponível.</p>
            <p> <strong> Materiais:</strong> Utilização de madeira maciça de alta qualidade e ferragens duráveis.</p>
            <p> <strong>Design:</strong> Personalização do design de acordo com suas preferências e necessidades de armazenamento.</p>
            <p> <strong>Fabricação:</strong> Produção artesanal do armário, garantindo qualidade e durabilidade.</p>
            <p> <strong>Instalação:</strong> Equipe especializada realizará a instalação precisa e eficiente do armário em seu espaço.</p> <br/><br/>

            <p style={{fontWeight: 'bold'}}>Móvel 2: Estante Modular  </p> 
            <p> <strong>Projeto:</strong> Criação de uma estante modular versátil para exibir seus objetos de valor e livros.</p>
            <p> <strong>Materiais:</strong> Seleção cuidadosa de materiais de alta qualidade, como madeira laminada e acabamentos duráveis.</p>
            <p> <strong>Personalização:</strong> Adaptação do design para atender às suas preferências de estilo e funcionalidade.</p>
            <p> <strong>Fabricação:</strong> Produção precisa da estante modular, garantindo qualidade e resistência.</p>
            <p><strong> Montagem:</strong> Nossa equipe de montagem realizará a montagem adequada da estante em seu ambiente.</p>

        </Container>
        </>
    )
}

import {
    Container
} from './styles'


export function Receipts(){

    function handleAddRecibo(){
        alert('Abrir modal')
    }
    
    return (
        <Container>
            <div>
                <h1>Recibos</h1>
                <button onClick={handleAddRecibo}>
                    <span>Criar Recibo</span>
                </button>
            </div>
        </Container>
    )
}
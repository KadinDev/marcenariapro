
import { 
    Container
} from './styles'

export function Catalog(){

    function handleAddItem(){
        alert('Adicionar item')
    }

    return (
        <Container>
            <div>
                <h1>Catálogo - Materiais</h1>
                <button onClick={handleAddItem}>
                    <span>Adicionar Item</span>
                </button>
            </div>
        </Container>
    )
}
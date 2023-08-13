import { IoMdCloseCircle } from "react-icons/io"
import { Container } from "./styles"

type Props = {
    closeModal: () => void 
}

export function Contrato({closeModal} : Props){
    return (
        <>
        <div
        style={{ position: 'fixed', height: '100vh', left: 0, width: '50%', bottom: 0,
        background: 'rgba(0,0,0,0.3)' }}
        />

        <Container>
            <p style={{color: 'red', fontWeight: 'bolder'}} >* Este é um modelo *</p><br/><br/>

            <button onClick={closeModal} 
                style={{ position: 'absolute', height: '2.5rem', right: 10, top: 10, width: '2.5rem',
                background: 'transparent', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center' }}
            > 
                <IoMdCloseCircle size={30} color={'black'} />
            </button>

            <p> <strong>1. Pagamento:</strong> O pagamento será dividido em duas etapas. 50% do valor total será pago no início do projeto como sinal, e os 50% restantes serão pagos após a conclusão e instalação dos móveis.</p><br/>
            <p> <strong> 2. Prazo de Entrega:</strong> O prazo estimado para conclusão dos móveis é de 4 semanas a partir da confirmação do pedido e pagamento do sinal.</p><br/>
            <p> <strong>3. Alterações:</strong> Qualquer alteração no projeto inicial acordado pode afetar o prazo de entrega e o custo final. Será necessário um acordo escrito para realizar alterações no projeto.</p><br/>
            <p> <strong>4. Garantia:</strong> Oferecemos garantia de 1 ano para defeitos de fabricação nos móveis.</p><br/>
            <p> <strong>5. Responsabilidades do Cliente:</strong> O Cliente é responsável por fornecer medidas precisas do espaço onde os móveis serão instalados e aprovar o design final antes do início da fabricação.</p><br/>
            <p> <strong>6. Condições de Cancelamento:</strong> Em caso de cancelamento do contrato pelo Cliente, serão aplicadas as seguintes condições: [insira as condições específicas de cancelamento, como prazo de aviso prévio e possíveis penalidades].</p><br/>
            <p> <strong>7. Propriedade Intelectual:</strong> Todos os direitos de propriedade intelectual relacionados aos designs personalizados e desenhos técnicos permanecem com a marcenaria, a menos que acordado de outra forma por escrito.</p><br/>
            <p> <strong>8. Prazo de Validade do Orçamento:</strong> Este orçamento tem validade de [insira o período de validade, como 30 dias] a partir da data de emissão.</p><br/>
            <p> <strong>9. Manutenção e Cuidados:</strong> O Cliente é responsável por seguir as instruções de manutenção e cuidados fornecidas pela marcenaria para preservar a qualidade e a aparência dos móveis.</p><br/>
            <p> <strong>10. Limitação de Responsabilidade:</strong> A marcenaria não será responsável por danos causados por uso indevido, negligência ou modificação dos móveis após a entrega e instalação.</p><br/>
            <p> <strong>11. Lei Aplicável e Jurisdição:</strong> Este contrato será regido pelas leis do [insira a lei aplicável] e qualquer disputa será submetida à jurisdição exclusiva dos tribunais da cidade de [insira a cidade ou região].</p><br/>

        </Container>
        </>
    )
}
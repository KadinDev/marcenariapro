import { Card } from './styles'
import { IconType } from 'react-icons'

interface CardProps {
    title: string;
    icon: IconType;
    subTitle: string;
    total: string;
    borderType: 'green' | 'red' | 'orange' | 'black';
}

function IconRenderer({ icon }: { icon: IconType }) {
    const Icon = icon; // Converta o ícone em um componente React
    return <Icon />
}

export function CardDashboard({title, icon, subTitle, total, borderType} : CardProps){
    return (
        <Card borderType={borderType} >
            <div>
                <h2> {title} </h2>
                <IconRenderer icon={icon} />
            </div>
            <p> {subTitle} </p>
            <span> {total} </span> 
        </Card>
    )
}
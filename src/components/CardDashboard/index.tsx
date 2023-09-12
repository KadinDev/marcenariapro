import { ReactNode } from 'react'

import { 
    Card,
    Title,
} from './styles'

import { IconType } from 'react-icons'

interface CardProps {
    title: string;
    icon: IconType;
    subTitle: string;
    stylesType: 'green' | 'red' | 'orange' | 'black';
    children?: ReactNode 
}

function IconRenderer({ icon } : { icon: IconType }) {
    const Icon = icon; // Converta o ícone em um componente React
    return <Icon />
}

export function CardDashboard({title, icon, subTitle, stylesType, children} : CardProps){
    return (
        <Card stylesType={stylesType} >
            <IconRenderer icon={icon} />
            <Title stylesType={stylesType} > {title} </Title>
            <p> {subTitle} </p>

            {children}

        </Card>
    )
}
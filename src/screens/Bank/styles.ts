import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 3rem;
    padding-left: 14rem;
    width: 90vw;
    margin: 0 auto;
    background-color: ${({theme}) => theme.body};
    
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
        background-color: ${({theme}) => theme.sidebar};
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        transition: transform 0.2s;
        border: solid 2px ${({theme}) => theme['green-bank']};
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const TitleHeader = styled.h1`
    color: ${({theme}) => theme.text};
    font-size: 1.5rem;
    font-weight: 600;
`;

export const NavigationMonth = styled.div`
    width: 50%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    background-color: ${props => props.theme.sidebar};

    button {
        background-color: transparent;
        border: none;
        border-radius: 0;
        &:hover {
            transform: none;
        }
    }

    span {
        color: ${props => props.theme['title']};
        font-weight: bold;
        text-transform: uppercase;
        background-color: ${props => props.theme.sidebar};
        padding: 2px 20px;
        border-radius: 4px;
    }
`

export const Total = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 40px;
    margin-left: 50%;
    transform: translateX(-50%);

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 5px;
        }
    }

`

export const TotalTransactions = styled.p<PriceHightlightProps>`
    color: ${props => props.variant === 'income' ? props.theme['green-bank'] : props.theme['red'] };
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2rem;
    background-color: ${props => props.theme.sidebar};
    padding: 2px 5px;
    border-radius: 4px;
`

export const Separator = styled.div`
    width: 2px;
    height: 1rem;
    background-color: ${props => props.theme.placeholder};
`

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate; // para conseguir usar o border-spacing
    border-spacing: 0 0.5rem; // coloca espaçamento entre cada linha da tabela
    margin-bottom: 100px;


    td {
        padding: 1.25rem 2rem;
        
        background: ${props => props.theme['sidebar']};
        color: ${props => props.theme.text};
        font-weight: bold;

        &:first-child { // para o primeiro td de cada linha
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            text-align: left;
        }

        &:nth-child(2){
            text-align: center;
            width: 12rem;
            border-right: solid 1px ${props => props.theme.placeholder};
        }

        &:last-child { // para o último td de cada linha
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            text-align: center;
            width: 12rem;
        }
    }
`

interface PriceHightlightProps {
    variant: 'income' | 'outcome'
}

export const PriceHightlight = styled.span<PriceHightlightProps>`
    color: ${props => props.variant === 'income' ? props.theme['green-bank'] : props.theme['red'] };
    padding-bottom: 2px;
    font-size: 1rem;
`
import styled from 'styled-components'
import Calendar from 'react-calendar'

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
        border: solid 2px ${({theme}) => theme['orange-dark']};
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

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 1rem;
`;

export const StyledCalendar = styled(Calendar)`
    background-color: ${props => props.theme.sidebar};
    padding: 1rem;
    border-radius: 5px;
    border: solid 2px ${props => props.theme['text']};

    /* Estilos para o nome do mês */
    .react-calendar__navigation__label {
        font-size: 0.875rem;
        text-transform: capitalize;
        font-weight: bold;
        color: ${props => props.theme['title']};
    }

    /* Estilos para os botões de navegação do mês */
    .react-calendar__navigation button {
        background: ${props => props.theme['body']};
        color: ${props => props.theme['title']};
    }

    // os dias
    .react-calendar__tile {
        color: ${props => props.theme.title};
        font-size: 1rem;
        position: relative;
        width: 2.5rem;
        height: 2.5rem;

        &:hover {
            background-color: ${props => props.theme.placeholder};
        }

    }

    /* Estilos para os nomes dos dias */
    .react-calendar__month-view__weekdays__weekday {
        font-weight: bolder;
        color: ${props => props.theme['orange-dark']};
    }
`

export const MarkedDate = styled.div`
    position: absolute;
    border: solid 2px ${props => props.theme.title};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.4;
    border-radius: 10%;
`;

export const ContainerForm = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: ${props => props.theme.sidebar};
    border: solid 2px ${props => props.theme.text};
    height: 22.8rem;
    border-radius: 4px;
    padding: 1rem;
    margin-left: 10px;

`

export const Form = styled.div`
    width: 100%;
    border-bottom: solid 1px ${props => props.theme.title};
    padding-bottom: 10px;
    
    h3 {
        height: 2rem;
        color: ${props => props.theme.title};

        span {
            background-color: ${props => props.theme.orange};
            padding: 0 5px;
            border-radius: 4px;
            color: ${props => props.theme.title};
            margin-left: 5px;
        }
    }
    
    form {
        display: flex;
        flex-direction: column;
        
        input {
            border: none;
            height: 2rem;
            border: solid 1px ${props => props.theme.placeholder};
            margin-bottom: 10px;
            border-radius: 5px;
            padding-left: 10px;
            color: ${props => props.theme['text']};
            font-weight: bold;

            &:focus {
                border: solid 2px ${props => props.theme['orange-dark']};
                border-radius: 5px;
            }

            &::placeholder {
                font-weight: normal;
            }
        }

        button {
            height: 2rem;
            background-color: ${props => props.theme['text']};
            border-radius: 5px;
            color: ${props => props.theme['sidebar']};
            text-transform: uppercase;
            opacity: 0.9;

            &:hover {
                opacity: 1;
            }
        }
    }
`

export const Info = styled.div`
    flex: 1;
    margin-top: 5px;
    width: 100%;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h3 {
            height: 2rem;
            color: ${props => props.theme.title};
        }
        button {
            background-color: transparent;
            transition: transform ease-in-out 0.2s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    p {
        color: ${props => props.theme.text};
        font-size: 1rem;
        font-weight: bold;
    }
`
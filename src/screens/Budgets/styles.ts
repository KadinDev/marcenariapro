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

export const Form = styled.div`
    background-color: ${props => props.theme.sidebar};
    width: 100%;
    padding: 15px;
    margin: 40px 0;
    border-radius: 5px;
    

    form {
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
            height: 2.5rem;
            padding: 2px 10px;
            border: none;
            color: ${props => props.theme.text};
            font-weight: 600;
            background-color: ${props => props.theme.body};
            border-radius: 5px;
            margin-bottom: 10px;

            &:focus {
                border: solid 2px ${props => props.theme.text};
                background-color: ${props => props.theme.sidebar};
            }

            &::placeholder {
                color: ${props => props.theme.placeholder};
                font-weight: 400;
            }
        }

        textarea {
            min-width: 100%;
            max-width: 100%;
            min-height: 10rem;
            border: none;
            padding: 5px 10px;
            color: ${props => props.theme.text};
            background-color: ${props => props.theme.body};
            border-radius: 5px;
            font-weight: 600;

            &:focus {
                border: solid 2px ${props => props.theme.text};
                background-color: ${props => props.theme.sidebar};
            }
        }

        button[type='submit'] {
            height: 2.5rem;
            border-radius: 4px;
            background-color: ${props => props.theme['red']};
            color: ${props => props.theme['sidebar']};
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1px;
            filter: brightness(100%);
            transition: filter 0.2s;
            margin-top: 20px;

            &:hover {
                filter: brightness(90%);
            }
        }
    }
`;

export const InfoClient = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        flex-direction: column;
        width: 49%;

        input {
            width: 100%;
        }
    }
`;

export const TextArea = styled.div`
`;

export const HeaderTextArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;

    h2 {
        font-size: 1.2rem;
        color: ${props => props.theme.title};
    }

    a {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-left: 10px;
        color: ${props => props.theme['red']};
        border: solid 2px ${props => props.theme['background']};
        background-color: ${props => props.theme['sidebar']};
    }
`;

export const Prices = styled.section`
`;

export const TotalValueItems = styled.div`
    border: solid 2px ${props => props.theme.background};
    width: 170px;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    span {
        color: ${props => props.theme.red};
        font-size: 1.2rem;
        font-weight: bold;
    }
`

export const ItemPrice = styled.div`
    margin-bottom: 20px;

    p {
        color: ${props => props.theme.title};
        font-weight: bold;

        span {
            color: ${props => props.theme['green-bank']};
            font-size: 1.2rem;
        }
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 2.5rem;
    margin-top: 25px;
    margin-bottom: 5px;

    span {
        font-weight: bold;
        color: ${props => props.theme.title};
        margin-left: 20px;
    }

    a {
        filter: brightness(80%);
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            filter: brightness(100%);
            border: solid 1px ${props => props.theme.placeholder};
            border-radius: 50%;
        }
    }
`;

export const Separator = styled.div`
    margin: 10px 0;
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.background};
`;

export const Desconto = styled.div`
    margin-bottom: 20px;
    p {
        font-weight: bold;
    }

    p:nth-child(3) {
        margin-bottom: 7px;
    }

    span {
        color: ${props => props.theme.red};
        font-size: 1.2rem;
        font-weight: bold;
        border: solid 2px ${props => props.theme.background};
        padding: 5px 15px;
        border-radius: 4px;
    }
`;
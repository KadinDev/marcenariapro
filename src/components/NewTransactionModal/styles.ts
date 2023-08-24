import styled from "styled-components"


export const Container = styled.div`
    flex: 1;
    position: fixed;
    z-index: 80;
    top: 0;
    right: 0;
    bottom: 0;
    left: 14rem;
    background-color: ${({theme}) => theme.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ContentForm = styled.div`
    width: 25.25rem;
    min-height: 25rem;
    background-color: ${({theme}) => theme.sidebar};
    border-radius: 5px;
    border: solid 3px ${({theme}) => theme.text};
    padding: 10px;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        input {
            width: 100%;
            height: 2.5rem;
            padding: 0px 10px;
            border: none;
            margin-bottom: 7px;
            background-color: ${({theme}) => theme.body};
            border-radius: 5px;
            
            color: ${({theme}) => theme.text};
            font-weight: 600;

            &::placeholder {
                color: ${({theme}) => theme.placeholder};
                font-weight: 400;
            }

            &:focus {
                border: solid 2px ${({theme}) => theme['green-bank']};
                background-color: ${({theme}) => theme.sidebar};
            }
        }

        button[type='submit'] {
            background-color: ${props => props.theme.text};
            margin-top: 10px;
            width: 100%;
            height: 2.5rem;
            border-radius: 5px;
            text-transform: uppercase;
            color: ${props => props.theme.sidebar};
            filter: brightness(80%);
            transition: filter 0.2s;

            &:hover {
                filter: brightness(100%);
            }

            &:disabled {
                cursor: not-allowed;
            }

            svg {
                color: ${props => props.theme.sidebar}
            }
        }

    }

`

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color: ${({theme}) => theme["green-bank"]};
        margin-bottom: 10px;
    }

`;


export const CloseModal = styled.button`
    position: absolute;
    background: red;
    top: 0;
    right: 0;
    padding: 1rem;
    background-color: ${({theme}) => theme["green-bank"]};
    border-bottom-left-radius: 80%;

    filter: brightness(90%);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(100%);
    }

`

export const TransactionType = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
`


interface TransactionTypeButtonProps {
    isActive: boolean;
    variant: 'income' | 'outcome';
}

export const TransactionTypeButton = styled.button<TransactionTypeButtonProps>`
    background: ${props => (props.variant === 'income' ? props.theme["green-bank"] : props.theme.red) };
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 2.5rem;
    border-radius: 4px;
    cursor: pointer;
    border: 0;
    color: ${props => props.theme.sidebar};
    filter: brightness(50%);
    text-transform: capitalize;

    svg {
        color: ${props => props.theme.sidebar };
    }

    &:hover {
        transition: filter 0.2s;

        filter: brightness(100%);
    }

    filter: brightness(
        ${(props) => props.isActive ? '100%' : '50%' }
    );

`;
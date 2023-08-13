import styled from "styled-components"

export const Form = styled.div`
    background-color: ${props => props.theme.sidebar};
    width: 100%;
    padding: 15px;
    margin: 40px 0;
    border-radius: 5px;
    padding-bottom: 80px;

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

export const Separator = styled.div`
    margin: 10px 0;
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.background};
`;

export const InputsAmount = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
            color: ${props => props.theme.placeholder};
        }

        input {
            margin-top: 5px;
        }
    }

`

export const MethodPayment = styled.div`
    margin-top: 10px;
    
    h2 {
        font-size: 1.2rem;
        color: ${props => props.theme.title};
    }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: -15px;
        
        input[type="radio"]{
            margin-right: 10px;
        }

        label {
            color: ${props => props.theme.text};
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 0.975rem;
        }
    }
`

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
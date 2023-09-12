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
        width: 90%;

        textarea {
            max-width: 100%;
            min-width: 100%;
            max-height: 10rem;
            min-height: 10rem;
            padding: 10px;
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
                border: solid 2px ${({theme}) => theme['orange-dark']};
                background-color: ${({theme}) => theme.sidebar};
            }
        }

        p {
            font-size: 0.800rem;
            color: ${({theme}) => theme["placeholder"]};
            margin-top: -10px;
            text-align: right;
        }
    }

`

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color: ${({theme}) => theme["orange-dark"]};
        margin-bottom: 10px;
    }

`;

export const Register = styled.button`
    background-color: ${({theme}) => theme.orange};
    height: 2.5rem;
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    border-radius: 5px;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({theme}) => theme.title};
    filter: brightness(90%);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(100%);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

`

export const CloseModal = styled.button`
    position: absolute;
    background: red;
    top: 0;
    right: 0;
    padding: 1rem;
    background-color: ${({theme}) => theme.orange};
    border-bottom-left-radius: 80%;

    filter: brightness(90%);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(100%);
    }

`

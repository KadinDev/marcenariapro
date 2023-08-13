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
                border: solid 2px ${({theme}) => theme['orange-dark']};
                background-color: ${({theme}) => theme.sidebar};
            }
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

export const Buttons = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    align-items: center;
`;

export const Updated = styled.button`
    background-color: ${({theme}) => theme.orange};
    height: 2.5rem;
    width: 100%;
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
`

export const Delete = styled.button`
    background-color: ${({theme}) => theme.red};
    height: 2.5rem;
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({theme}) => theme.sidebar};
    filter: brightness(90%);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(100%);
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

export const ExistingClient = styled.div`
    background-color: ${({theme}) => theme.body};
    width: 100%;
    text-align: left;
    padding: 5px;
    border: solid 2px ${({theme}) => theme.red};
    margin-bottom: 5px;

    h3 {
        text-align: center;
        margin-bottom: 4px;
        color: ${({theme}) => theme.red};
    }

    p span {
        color: ${({theme}) => theme.title};
        font-weight: 600;
        margin-right: 5px;
    }

    p {
        font-weight: 400;
        color: ${({theme}) => theme.title};
    }
`;
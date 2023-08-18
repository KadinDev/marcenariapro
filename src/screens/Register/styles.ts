import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    background-color: ${({theme}) => theme.body};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

export const AreaItems = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const ContentLogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;

    img {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        box-shadow: 0 0 20px ${props => props.theme.placeholder};
        margin-bottom: 10px;
    }

    h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        font-size: 1rem;
        color: ${props => props.theme.title};
        text-transform: uppercase;

        svg {
            margin-right: 5px;
        }
    }
`;

export const ContentForm = styled.div`
    flex: 1;
    background-color: ${props => props.theme.sidebar};
    position: relative;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px ${props => props.theme.placeholder};
    
    h2 {
        margin-bottom: 10px;
    }

    
`;

export const FormRegister = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;

    input {
        height: 2.5rem;
        margin-bottom: 10px;
        border-radius: 4px;
        border: none;
        background-color: ${props => props.theme.body};
        padding-left: 5px;
        width: 100%;
        font-size: 1rem;
        color: ${props => props.theme.text};
        font-weight: 600;

        &:focus {
            background-color: ${props => props.theme.sidebar};
            border: solid 2px ${props => props.theme.text};
        }

        &::placeholder {
            font-weight: normal;
        } 
    }

    div {
        position: relative;
        height: 2.5rem;
        display: flex;
        margin-bottom: 10px;

        svg {
            position: absolute;
            right: 10px;
            bottom: 50%;
            transform: translateY(50%);
            height: 100%;
            color: ${props => props.theme.text}
        }
    }

    button {
        height: 2.5rem;
        border-radius: 4px;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1px;
        filter: brightness(100%);
        transition: filter 0.2s;

        &:hover {
            filter: brightness(90%);
        }
    }
`;

interface ButtonLoginProps {
    load: boolean
}
export const ButtonRegister = styled.button<ButtonLoginProps>`
    margin-top: 20px;
    background-color: ${props => props.theme.orange};
    color: ${props => props.theme.sidebar};
    text-shadow: 0 1px 5px ${props => props.theme.title};

    cursor: ${ props => props.load ? 'not-allowed' : 'pointer' };
`;

export const StyledLinkButton = styled(Link)`
    font-size: 0.875rem;
    margin: 10px auto;
    cursor: pointer;
    color: ${props => props.theme.title};
    font-weight: bold;
    opacity: 0.7;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 1;
    }
`;



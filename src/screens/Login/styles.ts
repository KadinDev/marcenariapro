import { Link } from 'react-router-dom';
import styled from 'styled-components'

interface ButtonLoginProps {
    load: boolean
}

export const Container = styled.div`
    background-color: ${({theme}) => theme.body};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: relative;

    .video-modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${props => props.theme.background};
        display: flex;
        align-items: center;
        justify-content: center;
    } 

    .video-modal-content {
        position: relative;
        width: 45rem;
        height: 29.68rem;

        iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 10px;
        }

        button {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background-color: ${props => props.theme.title};
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid 2px ${props => props.theme.sidebar};

            svg {
                color: ${props => props.theme.sidebar};
            }
        }
    }
`

export const RecoverPassword = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3.5rem;
    background-color: ${props => props.theme.title};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px ${props => props.theme.text};

    div {
        background-color: ${props => props.theme.sidebar};
        height: 2.5rem;
        padding: 10px;
        min-width: 30%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;

        button {
            background-color: transparent;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: bold;
            
        }

        input {
            width: 80%;
            border-radius: 4px;
            height: 2rem;
            border: none;
            background-color: ${props => props.theme.body};
            padding-left: 5px;
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
    }
`

export const AreaItems = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

export const ContentLogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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

    p {
        font-size: 0.875rem;
        color: ${props => props.theme.text};
        font-weight: 600;
    }

    p:nth-child(5){
        color: ${props => props.theme.text};
        font-size: 0.75rem;
        margin-top: 2px;
    }

    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 0.800rem;
        cursor: pointer;
        font-weight: bold;
        color: ${props => props.theme.red};
        border-bottom: solid 1px ${props => props.theme.red};
        opacity: 1;
        transition: opacity 0.2s;
        margin-top: 10px;

        &:hover {
            opacity: 0.8;
        }

        svg {
            margin-left: 5px;
        }
    }

    div {
        margin-top: 5px;
        width: 20%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        a {
            transition: transform 0.2s;
            background-color: ${props => props.theme.title};
            margin: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 0.300rem;
            border-radius: 50%;

            &:hover {
                transform: scale(1.2);
            }
        }
        a:first-child {
            color: ${props => props.theme.red};
            //box-shadow: 0.5px 0.5px 2px ${props => props.theme.red};
        }
        a:last-child {
            color: ${props => props.theme['sidebar']};
            //box-shadow: 0.5px 0.5px 2px ${props => props.theme['title']};
        }
    }
`;

export const ContentForm = styled.div`
    background-color: ${props => props.theme.sidebar};
    position: relative;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px ${props => props.theme.placeholder};

    span {
        width: 130px;
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
    }
`;

export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 21.8rem;

    input {
        height: 2.5rem;
        margin-bottom: 15px;
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

        svg {
            position: absolute;
            right: 10px;
            bottom: 50%;
            transform: translateY(50%);
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

export const ButtonLogin = styled.button<ButtonLoginProps>`
    margin-top: 20px;
    background-color: ${props => props.theme.orange};
    color: ${props => props.theme.sidebar};
    text-shadow: 0 1px 5px ${props => props.theme.title};

    cursor: ${ props => props.load ? 'not-allowed' : 'pointer' };
`;

export const StyledLinkButton = styled(Link)`
    border-radius: 4px;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 40px;
    background-color: ${props => props.theme.title};
    color: ${props => props.theme.sidebar};

`;


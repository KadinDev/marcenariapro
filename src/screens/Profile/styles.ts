import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 3rem;
    padding-left: 14rem;
    width: 90vw;
    margin: 0 auto;

    section {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        background-color: ${props => props.theme.sidebar};
        padding: 10px;
        border-radius: 5px;
        gap: 10px;

        form {
            width: 90%;

            label {
                color: ${props => props.theme.title};
                font-size: 0.875rem;
                margin-bottom: 4px;
                font-weight: 600;
            }

            input {
                height: 2rem;
                padding-left: 5px;
                border: none;
                border-radius: 2px;
                background-color: ${props => props.theme.body};
                color: ${props => props.theme.text};
                font-size: 0.875rem;
                font-weight: 600;

                &::placeholder {
                    color: ${props => props.theme.placeholder};
                    font-weight: normal;
                    font-size: 0.875rem;
                }

                &:focus {
                    border: solid 1px ${props => props.theme.title};
                    background-color: ${props => props.theme.sidebar};
                }
            }

            
            button[type='submit'] {
                height: 2.5rem;
                width: 100%;
                border-radius: 4px;
                background-color: ${props => props.theme['text']};
                color: ${props => props.theme['sidebar']};
                text-transform: uppercase;

                filter: brightness(100%);
                transition: filter 0.2s;
                margin: 20px 0;

                &:hover {
                    filter: brightness(90%);
                }
            }
        }

    }
`

export const TitleHeader = styled.h2`
    color: ${({theme}) => theme.text};
    font-weight: 600;

    border-bottom: solid 1px ${props => props.theme.placeholder};
    padding-bottom: 5px;
    font-size: 1.5rem;
`;

export const Upload = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;

    img {
        width: 15.6rem;
        height: 9.3rem;
        margin-bottom: 5px;
    }

    button {
        position: relative;
        height: 2.5rem;
        width: 15.6rem;
        padding: 0 1.25rem;
        border-radius: 4px;
        background-color: ${props => props.theme.text};
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 0.875rem;
        color: ${props => props.theme.sidebar};

        transition: filter 0.2s;
        filter: brightness(100%);

        &:hover {
            filter: brightness(90%);
        }
    }

    input[type="file"] {
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        cursor: pointer;
        opacity: 0;
    }
`

export const ContentInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    
    div {
        display: flex;
        flex-direction: column;
        width: 90%;

        margin-bottom: 10px;
    }
`;

export const ContentInput2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;

    textarea {
        border: none;
        border-radius: 5px;
        background-color: ${props => props.theme.body};
        padding: 5px;

        min-height: 5rem;
        max-height: 5rem;
        resize: none;

        color: ${props => props.theme.text};
        font-size: 0.875rem;
        font-weight: 600;

        &:focus {
            border: solid 1px ${props => props.theme.title};
            background-color: ${props => props.theme.sidebar};
        }

        &::placeholder {
            color: ${props => props.theme.placeholder};
            font-weight: normal;
            font-size: 0.875rem;
        }
        
    }

    span {
        color: ${props => props.theme.placeholder};
        font-size: 0.875rem;
    }
    
`

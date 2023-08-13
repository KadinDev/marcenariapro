import styled from 'styled-components'


export const Form = styled.div`
    background-color: ${({theme}) => theme.sidebar};
    margin-top: 2rem;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 1rem;

    form {
        width: 100%;
        height: 2.5rem;

        input {
            width: 100%;
            height: 2.5rem;
            padding: 0px 10px;
            border: none;
            margin-right: 4px;
            background-color: ${({theme}) => theme.body};
            border-radius: 5px;
            
            color: ${({theme}) => theme.text};
            font-weight: 600;

            &::placeholder {
                color: ${({theme}) => theme.placeholder};
                font-weight: 400;
            }

            &:focus {
                border: solid 2px ${({theme}) => theme['title']};
                background-color: ${({theme}) => theme.sidebar};
            }
        }
       
    }
   
`

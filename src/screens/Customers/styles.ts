import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 3rem;
    padding-left: 14rem;
    width: 90%;
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
                border: solid 2px ${({theme}) => theme['orange-dark']};
                background-color: ${({theme}) => theme.sidebar};
            }
        }
       
    }
   
`

export const TableContainer = styled.div`
    background-color: ${({theme}) => theme.sidebar};
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 100px;
    position: relative;

    p {
        position: absolute;
        right: 20px;
        top: 10px;
        font-weight: 600;
        color: ${({theme}) => theme.placeholder};
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 2px 10px;
        border-radius: 10px;
    }

    table {
        border-spacing: 0;
        width: 100%;
        margin-top: 10px;

        thead, tr, th {
            text-align: left;
        }

        th, td {
            padding: 15px 10px;
            border-bottom: solid 2px #d9d9d9;
        }

        tbody tr:last-child td {
            border-bottom: none;
        }
       
        th {
            color: ${({theme}) => theme['orange-dark']};
        }

        td {
            font-size: 0.875rem;
            font-weight: 600;
            color: ${({theme}) => theme.title};            
        }


        tr {
            position: relative;
        }

        tbody td button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
        }

        
        tbody tr td:first-child {
            display: grid;
            grid-template-columns: 150px 1fr;
        }

        tbody tr td:last-child {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            height: 2rem;
            position: absolute;
            border: none;
            display: flex;
        }
        
        tbody tr td span {
            border: solid 2px ${({theme}) => theme.placeholder}; 
            font-size: 0.875rem;
            padding: 5px;
            border-radius: 5px;
            opacity: 0.8;

            &:hover {
                opacity: 1;
                border-color: ${({theme}) => theme['orange-dark']};
            }
            
            a {
                color: ${({theme}) => theme.text};
            }
        }

        tbody tr td:nth-child(3) a {
            border: solid 2px ${({theme}) => theme.green}; 
            font-size: 0.875rem;
            padding: 5px;
            border-radius: 5px;
            color: ${({theme}) => theme.title};
            background-color: ${({theme}) => theme.sidebar};


            &:hover {
                border: solid 2px ${({theme}) => theme['orange-dark']}; 
            }
            
        }

    }

    .pagination-buttons {
        height: 2.5rem;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .buttons {
        width: 12.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        button {
            background-color: transparent;

            &:disabled {
                svg {
                    color: ${props => props.theme.placeholder};
                    cursor: not-allowed;
                }
            }

            svg {
                color: ${props => props.theme.title};
            }
        }
    }
`;


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

export const ContentCardsNote = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 100px;
`;

export const CardNote = styled.div`
    padding: 10px;
    margin-bottom: 20px;
    height: 8rem;
    width: 13rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${props => props.theme.sidebar};
    border-radius: 2px;
    box-shadow: 0 0 2px ${props => props.theme.title};

    p {
        color: ${props => props.theme.title};
        font-size: 1rem;
        text-align: justify;

    }

    button {
        position: absolute;
        top: -20px;
        right: -2px;
        background-color: ${props => props.theme.sidebar};
        border: solid 2px ${props => props.theme.red};
        width: 2rem;
        height: 2rem;
        border-radius: 50%;

        svg {
            color: ${props => props.theme.red};
            transition: transform 0.1s;

            &:hover {
                transform: scale(1.2);
            }
        }
    }
`;
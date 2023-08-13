import styled from 'styled-components';


export const Container = styled.div`
  position: fixed;
  left: 0;
  width: 15rem;
  top: 0;
  bottom: 0;
  z-index: 100;

  background-color: ${({theme}) => theme.background};
`;

export const BackgroundPdf = styled.div`
    background-color: ${props => props.theme.background};
    position: absolute;
    top: 0;
    width: 100%;
    padding-left: 16rem;
`

export const ContentPdf = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.sidebar};
    padding: 10px;
    padding-bottom: 20rem;
`

export const Close = styled.span`
    cursor: pointer;
    position: absolute;
    top: 2rem;
    left: -4rem;
    z-index: 1000;
    background-color: ${props => props.theme.sidebar};
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: solid 2px ${props => props.theme.text};
    &:hover {
        filter: brightness(90%);
    }
`

export const Border = styled.div`
    background-color: ${props => props.theme.sidebar};
    border: solid 2px ${props => props.theme.placeholder};
    padding: 20px;
`

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f5f5f5;
    padding-top: 20px;
    height: 12.5rem;
    

    h1 {
        font-size: 2rem;
        text-align: justify;
    }
    span {
        color: ${props => props.theme.placeholder};
        font-weight: bold;
        margin: 5px 0;
        margin-bottom: 10px;
    }
    img {
        width: 15.5rem;
        border: solid 4px ${props => props.theme.sidebar};
        box-shadow: 0 0 4px #111;
    }
`
export const InfoBudget = styled.section`
    margin-top: 12rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        span {
            color: ${props => props.theme.placeholder};
            text-transform: uppercase;
        }
        strong {
            margin-bottom: 10px;
        }
        p {
            color: ${props => props.theme.title};
        }
    }
`
export const Report = styled.div`
    margin-top: 40px;

    h1 {
        font-size: 2rem;
    }

    p {
        color: ${props => props.theme.title};
        text-align: justify;
        margin-top: 20px;
    }
`
export const Description = styled.div`
    margin-top: 40px;

    h1 {
        font-size: 2rem;
    }

    p {
        color: ${props => props.theme.title};
        text-align: justify;
        margin-top: 20px;
    }
`
export const Prices = styled.section`
    margin-top: 40px;
    
    h1 {
        font-size: 2rem;
    }

    section {
        background-color: #f5f5f5;
        border-radius: 4px;
        padding: 10px;

    }

    p {
        color: ${props => props.theme.title};
    }
`

export const ContentItems = styled.div`
    margin-bottom: 10px;
    width: 100%;
    min-height: 150px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: solid 1px ${props => props.theme.placeholder};
`

export const NameItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: solid 1px ${props => props.theme.placeholder};

    span {
        font-weight: bold;
        color: ${props => props.theme.red};
        border-bottom: solid 1px ${props => props.theme.placeholder};
        width: 100%;
        padding-left: 10px;
    }

    p {
        padding-left: 10px;
        margin-top: 5px;
        color: ${props => props.theme.text};
        font-weight: bold;
    }
`
export const InfoItem = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    div {
        padding: 5px;

        span {
            font-weight: bold;
            color: ${props => props.theme.red};
        }

        p {
            font-weight: bold;
            color: ${props => props.theme.text};;
        }
    }

    div:nth-child(1) {
        border-right: solid 1px ${props => props.theme.placeholder};
        border-bottom: solid 1px ${props => props.theme.placeholder};
    }

    div:nth-child(2) {
        border-bottom: solid 1px ${props => props.theme.placeholder};
    }

    div:nth-child(3) {
        border-right: solid 1px ${props => props.theme.placeholder};
    }

`

export const InfoTotalItems = styled.div`
    border-bottom: solid 1px ${props => props.theme.placeholder};
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`
export const Contract = styled.div`
    margin-top: 40px;
    margin-bottom: 60px;

    h1 {
        font-size: 2rem;
    }

    p {
        color: ${props => props.theme.title};
        margin-top: 20px;
    }
`

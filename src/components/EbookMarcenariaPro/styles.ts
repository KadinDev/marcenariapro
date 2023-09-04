import styled from "styled-components"

export const View = styled.div`
    width: 38rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Container = styled.div`
    margin-top: 1rem;
    background-color: ${props => props.theme.sidebar};
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 2px ${props => props.theme.title};
    width: 18rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    strong {
        color: ${props => props.theme.title};
        font-size: 1rem;
        text-transform: capitalize;
    }
    
    p {
        color: ${props => props.theme.text};
        font-size: 0.875rem;
        font-weight: bold;
        margin-bottom: 2px;
    }

    img {
        width: 100px;
        height: 150px;
        object-fit: cover;
    }

    a {
        line-height: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #f7ff00;
        background: -webkit-linear-gradient(to right, #f7ff00, #db36a4);
        background: linear-gradient(to right, #f7ff00, #db36a4);
        height: 2rem;
        padding: 0 10px;
        margin: 2px 0;
        border-radius: 5px;
        color: ${props => props.theme.title};
        font-weight: bold;
        opacity: 0.9;
        transition: opacity 0.2s;

        &:hover {
            opacity: 1;
        }

        span {
            font-size: 0.875rem;
            margin-right: 5px;
            text-transform: capitalize;
        }
    }

`

export const Feature = styled.div`
    position: absolute;
    background: #f7ff00;
    background: -webkit-linear-gradient(to right, #f7ff00, #db36a4);
    background: linear-gradient(to right, #f7ff00, #db36a4);
    width: 50px;
    top: 0;
    left: 0;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 10px;
    text-align: center;
    padding: 2px;

    svg {
        color: ${props => props.theme.title};
    }
`
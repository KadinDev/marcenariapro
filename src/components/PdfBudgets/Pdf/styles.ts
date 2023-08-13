import styled from "styled-components"


export const ButtonPdf = styled.div`
    width: 100%;
    position: relative;
`

export const DownloadPdf = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
  
    background-color: ${props => props.theme.text};
    height: 2.5rem;
    width: 10rem;
    border-radius: 4px;
    filter: brightness(90%);
    color: ${props => props.theme.sidebar};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    text-transform: uppercase;

    &:hover {
        filter: brightness(100%);
    }
`

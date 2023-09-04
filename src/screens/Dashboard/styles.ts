import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 3rem;
    padding-left: 14rem;
    width: 90vw;
    margin: 0 auto;
    background-color: ${({theme}) => theme.body};
    padding-bottom: 4rem;
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TitleHeader = styled.h1`
    color: ${({theme}) => theme.text};
    font-size: 1.5rem;
    font-weight: 600;
`;

export const ContainerWrapper = styled.div`
    margin-top: 2rem;

`;

export const TitleWrapper = styled.h1`
    color: ${({theme}) => theme.placeholder};
    font-size: 1rem;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 5px;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    height: 10rem;

    overflow-x: auto; // ativar scroll
    white-space: nowrap; // ativar scroll
`;
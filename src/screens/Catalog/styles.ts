import styled from 'styled-components'

export const Container = styled.div`
    padding-top: 3rem;
    padding-left: 14rem;
    width: 90vw;
    margin: 0 auto;
    background-color: ${({theme}) => theme.body};
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TitleHeader = styled.h1`
    color: ${({theme}) => theme.text};
    font-size: 2rem;
    font-weight: 600;
`;
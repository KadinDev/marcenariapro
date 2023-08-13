import styled from 'styled-components';
import { Link } from 'react-router-dom'

/*
type IsOpenSedebarProps = {
  isOpen: boolean
}
*/

export const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 15rem;
  overflow-y: auto; // rolagem vertical
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  z-index: 100;

  //transition: transform 0.3s ease-in-out;


  /* Estiliza a barra de rolagem */
  ::-webkit-scrollbar {
    //display: none;
    //visibility: hidden;
    //background-color: transparent;
    width: 0.2rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({theme}) => theme.body};
  }

  ::-webkit-scrollbar-thumb {
    background-color:${({theme}) => theme.text};
    border-radius: 3px;
  }

  background-color: ${({theme}) => theme.sidebar};
  box-shadow: 0 0 2px ${({theme}) => theme.text};
`;

export const SidebarButton = styled.button`

  position: absolute;
  right: 0;
  top: 5%;
`;


export const ContainerLink = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 60px;

  img {
    width: 8rem;
    height: 8rem;
  }

  h2 {
    color: ${({theme}) => theme.placeholder};
    text-align: left;
    margin-top: -20px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-size: 1.2rem;
    padding-left: 10px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    div {
      padding: 2px 0px;
      margin-bottom: 5px;
      border-radius: 5px;

      &:hover {
        background-color: ${({theme}) => theme.body};
      }

      &.active {
        background-color: ${({theme}) => theme.body};
      }
    }
  }

  li {
    padding: 5px 0;
    font-size: 1rem;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({theme}) => theme.placeholder};
  font-weight: bold;
  letter-spacing: 1px;
  text-align: left;

  display: grid;
  grid-template-columns: 2.5rem 1fr;
  padding: 0 10px;

  &.active {
    color: ${({theme}) => theme.title}
  }
`

export const LogOut = styled.div`
  background-color: ${({theme}) => theme.placeholder};
  width: 80%;
  height: 1.875rem;
  display: grid;
  grid-template-columns: 3rem 1fr;
  border-radius: 5px;
  margin-bottom: 20px;
  
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.body};
    border-radius: 5px 0 0 5px;
  }

  svg {
    color: ${({theme}) => theme.title};
  }
  
  button {
    background: transparent;
    text-transform: uppercase;
    font-weight: 400;
    background-color: ${({theme}) => theme.text};
    border-radius: 0 5px 5px 0;
    color: ${({theme}) => theme.sidebar};
    padding: 5px 0;
    
    opacity: 0.8;
    transition: opacity 0.2s;
   
    &:hover {
      opacity: 1;
    }
  }
`;
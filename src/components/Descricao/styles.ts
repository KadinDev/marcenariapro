import styled from 'styled-components';

export const Container = styled.nav`
  position: fixed;
  overflow-y: auto; // rolagem vertical
  height: 100vh;
  right: 0;
  width: 50%;
  bottom: 0;
  background: ${props => props.theme.sidebar};
  padding: 20px;

  //transition: transform 0.3s ease-in-out;
  animation: slide 0.3s ease-in-out;

  @keyframes slide {
    0% {
      width: 5%;
    }
    100% {
      width: 50%;
    }
  }

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

  
`;
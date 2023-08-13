import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  :focus {
      outline: none;
      border: none;
  }

  body {
      background-color: ${({theme}) => theme.body};
      color: ${({theme}) => theme.text};
      -webkit-font-smoothing: antialiased;
  }

  body,
input,
textarea,
button {
    font: 400 1rem 'Open Sans', 'sans-serif'
}

a {
    cursor: pointer;
    text-decoration: none;
}

button {
    cursor: pointer;
}

a, button {
    border: none;
}

@media (max-width: 720px) {
    html {
        font-size: 87.5%
    }
}

@media (max-width: 1080px){
    html {
        font-size: 93.75%;
    }
}
`;

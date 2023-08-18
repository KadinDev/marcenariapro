import styled, {keyframes} from "styled-components"

const spinAnimation  = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const LoadButton = styled.span`
    svg {
        animation: ${spinAnimation} 1s linear infinite;
        color: ${props => props.theme.title};
    }
`;
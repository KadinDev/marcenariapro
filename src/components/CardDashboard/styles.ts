import styled from 'styled-components'

type CardBorderProps = {
    borderType: 'green' | 'red' | 'orange' | 'black'
}

export const Card = styled.div<CardBorderProps>`
    height: 100%;
    width: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: dashed 2px;
    border-radius: 15px;

    border-color: ${(props) => 
        props.borderType === 'green' &&  props.theme['green-bank'] ||
        props.borderType === 'red' &&  props.theme['red'] ||
        props.borderType === 'orange' &&  props.theme['orange-dark'] ||
        props.borderType === 'black' &&  props.theme['title']
    };

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        h2 {
            color: ${props => props.theme.title};
            font-weight: normal;
            font-size: 1.4rem;
            text-transform: capitalize;
        }

        svg {
            color: ${props => props.theme.text};
            margin-left: 4px;
        }

        
    }
    p {
        margin-bottom: 20px;
        color: ${props => props.theme.placeholder};
        font-size: 0.875rem;
    }
    span {
        font-weight: bold;

    }
`
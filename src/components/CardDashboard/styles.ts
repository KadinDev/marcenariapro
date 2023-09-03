import styled from 'styled-components'

type StylePropsCard = {
    stylesType: 'green' | 'red' | 'orange' | 'black'
}

export const Card = styled.div<StylePropsCard>`
    position: relative;
    height: 100%;
    width: 12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: ${props => props.theme.sidebar};
    border: solid 2px;
    border-color: ${(props) => 
        props.stylesType === 'green' &&  props.theme['green-bank'] ||
        props.stylesType === 'red' &&  props.theme['red'] ||
        props.stylesType === 'orange' &&  props.theme['orange-dark'] ||
        props.stylesType === 'black' &&  props.theme['title']
    };
    
    svg {
        color: ${props => props.theme.text};
        margin-left: 4px;
    }

    p {
        margin-bottom: 20px;
        color: ${props => props.theme.placeholder};
        font-size: 0.875rem;
    }
`
export const Title = styled.h2<StylePropsCard>`
    color: ${(props) => 
        props.stylesType === 'green' &&  props.theme['green-bank'] ||
        props.stylesType === 'red' &&  props.theme['red'] ||
        props.stylesType === 'orange' &&  props.theme['orange-dark'] ||
        props.stylesType === 'black' &&  props.theme['title']
    };

    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
`

export const Total = styled.span<StylePropsCard>`
    font-weight: bold;
    color: ${(props) => 
        props.stylesType === 'green' &&  props.theme['green-bank'] ||
        props.stylesType === 'red' &&  props.theme['red'] ||
        props.stylesType === 'orange' &&  props.theme['orange-dark'] ||
        props.stylesType === 'black' &&  props.theme['title']
    };
`
import {
    View,
    Container,
    Feature
} from './styles'

import ebook from './filesEbook/marcenariapro.pdf'
import capaEbook from './filesEbook/capabook.png'
import faceads from './filesEbook/ads.jpg'

import { SlPresent, SlArrowDownCircle, SlArrowRightCircle } from 'react-icons/sl'

export function EbookMarcenariaPro(){

    return (
        <View>
            <Container>
                <Feature>
                    <SlPresent size={18}/>
                </Feature>
                
                <strong> Baixe gratuitamente </strong>

                <p> sua marcenaria vendendo 5x mais. </p>
                <img src={capaEbook} alt="Imagem do Ebook" />
                <a href={ebook} download>
                    <span>Download</span>
                    <SlArrowDownCircle size={18} />
                </a>
            </Container>

            <Container>
                <Feature>
                    <SlPresent size={18}/>
                </Feature>
                
                <strong> Facebook ADS </strong>

                <p> para marcenarias, curso gratuito. </p>
                <img style={{width: '100%'}} src={faceads} alt="Imagem FaceAds" />
                <a href='#' style={{cursor:'not-allowed'}} >
                    <span>Em breve</span>
                    <SlArrowRightCircle size={18} />
                </a>
            </Container>
    </View>
    )
}
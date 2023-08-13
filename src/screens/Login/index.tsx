import {useEffect, useState, useContext, FormEvent} from 'react'

import {
    Container,
    RecoverPassword,
    AreaItems,
    ContentLogo,
    ContentForm,
    FormLogin,
    ButtonLogin,
    StyledLinkButton
} from './styles'

import logo from '../../assets/logoblack.png'
import { InputForm } from '../../components/InputForm'

import { 
    AiOutlineEye, 
    AiOutlineEyeInvisible, 
    AiFillYoutube,
    AiOutlineClose,
    AiOutlineSend
} from 'react-icons/ai'

import { MdVerified } from 'react-icons/md'
import { AuthContext } from '../../contexts/auth'

export function Login(){
    
    const { signIn, isLogging } = useContext(AuthContext)

    const titlePage = 'Marcenaria Pro';

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [recoverPassword, setRecoverPassword] = useState('')
    
    const [viewPassword, setViewPassword] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

    useEffect(() => {
        document.title = `${titlePage} | Login`
    },[]);

    function handleViewPassword(){
        setViewPassword(!viewPassword)
    }

    function handleCloseModalRecoverPassword(){
        setIsPasswordModalOpen(false)
        setRecoverPassword('')
    }

    function handleLogin(e : FormEvent){
        e.preventDefault()
        signIn(email, password)
    }

    return (
        <Container>
            
            { isPasswordModalOpen && 
                <RecoverPassword>
                    <div>
                        <span onClick={handleCloseModalRecoverPassword}>
                            <AiOutlineClose size={20} />
                        </span>
                        <InputForm
                            type='email'
                            placeholder='Email'
                            required
                            value={recoverPassword}
                            onChange={(e) => setRecoverPassword(e.target.value)}
                        />
                        <span onClick={() => alert('Recuperar Senha')} >
                            <AiOutlineSend size={20} />
                        </span>
                    </div>
                </RecoverPassword>
            }

            <AreaItems >
            
                <ContentLogo>
                    <img src={logo} alt="Imagem da logo" />
                    <h1>
                        <MdVerified size={20} />
                        Marcenaria Pro  
                    </h1>
                    <p> Elevando sua Marcenaria a um Patamar Superior </p>
                    <span onClick={() => setIsVideoModalOpen(true)} >
                        Veja por dentro do Marcenaria Pro
                        <AiFillYoutube size={20} />
                    </span>
                    <p>Aprovado por mais de 250 marcenarias</p>
                </ContentLogo>

                <ContentForm>
                    <FormLogin onSubmit={handleLogin} >
                        <InputForm
                            type='email'
                            placeholder='Email'
                            //required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <InputForm
                                type={viewPassword ? 'text' : 'password'}
                                placeholder='Senha'
                                //required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            { password.length > 0 &&
                                <button type='button' onClick={handleViewPassword} >
                                    { viewPassword ? (
                                        <AiOutlineEye size={20} />
                                    ) : (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) }
                                </button>
                            }
                        </div>
                        <ButtonLogin 
                            type='submit' 
                            load={isLogging} 
                            disabled={isLogging}    
                        > 
                            {isLogging ? 'Entrando' : 'Entrar'}
                        </ButtonLogin>
                        
                        <span onClick={() => setIsPasswordModalOpen(true) }>
                            Esqueceu a senha?
                        </span>
                        
                        <StyledLinkButton 
                            to="/register"
                            load={isLogging} 
                        >
                            criar conta
                        </StyledLinkButton>
                    </FormLogin>

                </ContentForm>
                    
            </AreaItems>


            {isVideoModalOpen && (
                <div className="video-modal">
                    <div className="video-modal-content">
                        <iframe
                            src="https://www.youtube.com/embed/-JHamN9oCKg"
                            title="Marcenaria Pro"
                            allowFullScreen
                        ></iframe>
                        <button onClick={() => setIsVideoModalOpen(false)}>
                            <AiOutlineClose size={20} />
                        </button>
                    </div>
                </div>
            )}

        </Container>

    )
}
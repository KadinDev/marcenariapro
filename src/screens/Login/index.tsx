import {useEffect, useState, useContext, FormEvent} from 'react'

import {
    Container,
    RecoverPassword,
    AreaItems,
    ContentLogo,
    ContentForm,
    FormLogin,
    ButtonLogin,
    StyledLinkButtonRegister
} from './styles'

import logo from '../../assets/logoblack.png'
import { InputForm } from '../../components/InputForm'

import { 
    AiOutlineEye, 
    AiOutlineEyeInvisible, 
    AiFillYoutube,
    AiOutlineClose,
    AiOutlineSend,
    AiOutlineInstagram,
    AiFillWindows
} from 'react-icons/ai'

import { MdVerified } from 'react-icons/md'
import { Load } from '../../components/Load'
import { AuthContext } from '../../contexts/auth'

export function Login(){
    const { 
        signIn, 
        isLogging,
        isLoggingRecoverPass, 
        forgotPassword 
    } = useContext(AuthContext)

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

    function handleRecoverPassword(){
        forgotPassword(recoverPassword)
    }

    function handleLogin(e : FormEvent){
        e.preventDefault()
        signIn(email, password)
    }

    return (
        <Container>
            
            { isPasswordModalOpen && 
                <RecoverPassword >
                    <div>
                        <span onClick={handleCloseModalRecoverPassword}>
                            <AiOutlineClose size={20} />
                        </span>
                        <InputForm
                            type='email'
                            placeholder='Email'
                            value={recoverPassword}
                            onChange={(e) => setRecoverPassword(e.target.value)}
                        />
                        <button 
                            onClick={handleRecoverPassword}
                            disabled={isLoggingRecoverPass}
                        >
                            {isLoggingRecoverPass ? (
                                <Load/>
                            ) : (
                                <AiOutlineSend size={20} />
                            )}
                        </button>
                    </div>
                </RecoverPassword>
            }

            <AreaItems >
            
                <ContentLogo>
                    <img src={logo} alt="Imagem da logo" />
                    <h1>
                        <AiFillWindows size={20}/>
                        <MdVerified size={20} />
                        Marcenaria Pro  
                    </h1>
                    <p> Elevando sua Marcenaria a um Patamar Superior </p>
                    <span onClick={() => setIsVideoModalOpen(true)} >
                        Veja por dentro do Marcenaria Pro
                        <AiFillYoutube size={20} />
                    </span>

                    {/* depois pegar no db o numero de marcenarias cadastradas,
                    e usar a formatação de numeros */}
                    <p>Aprovado por mais de 340 marcenarias</p>

                    <div>
                        <a href="https://www.instagram.com/marcenariapro2023/" target='_blank'>
                            <AiOutlineInstagram size={18} />
                        </a>
                        {/* 
                        <a href="https://wa.me/5588996960239" target='_blank'>
                            <AiOutlineWhatsApp size={18} />
                        </a>
                        */}
                        
                    </div>
                </ContentLogo>

                <ContentForm>
                    <FormLogin onSubmit={handleLogin} >
                        <InputForm
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <InputForm
                                type={viewPassword ? 'text' : 'password'}
                                placeholder='Senha'
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
                            {isLogging ? (
                                <Load/>
                            ) : (
                                <p>entrar</p>
                            )}
                        </ButtonLogin>
                        
                        <span onClick={() => setIsPasswordModalOpen(true) }>
                            Esqueceu a senha?
                        </span>
                        {/* 
                        <StyledLinkButton 
                            to="/register"
                        >
                            criar conta
                        </StyledLinkButton>
                        */}
                        <StyledLinkButtonRegister
                            href="https://api.whatsapp.com/send?phone=5588993723747&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20cadastro%20no%20Marcenaria%20Pro." target='_blank'
                        >
                            criar conta
                        </StyledLinkButtonRegister>
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
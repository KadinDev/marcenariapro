import {useEffect, useState, useContext, FormEvent} from 'react'

import {
    Container,
    AreaItems,
    ContentLogo,
    ContentForm,
    FormRegister,
    ButtonRegister,
    StyledLinkButton,
} from './styles'

import logo from '../../assets/logoblack.png'
import { InputForm } from '../../components/InputForm'
import { Load } from '../../components/Load'
import { toast } from 'react-toastify'

import { 
    AiOutlineEye, 
    AiOutlineEyeInvisible,
    AiOutlineLoading,
    AiFillWindows
} from 'react-icons/ai'

import { MdVerified } from 'react-icons/md'
import { AuthContext } from '../../contexts/auth'

export function Register(){
    const titlePage = 'Marcenaria Pro'

    const { signUp, isLogging } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmsetPassword] = useState('')

    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setConfirmViewPassword] = useState(false)

    useEffect(() => {
        document.title = `${titlePage} | Cadastro`
    },[]);

    function handleViewPassword(){
        setViewPassword(!viewPassword)
    }
    function handleViewPasswordConfirm(){
        setConfirmViewPassword(!viewConfirmPassword)
    }

    function handleRegister(e: FormEvent){
        e.preventDefault()
        if(!name || !email || !password){
            toast.error('Preencha todos os campos!')
            return
        }
        if(email !== confirmEmail){
            toast.error('Confira se os emails estão iguais!')
            return
        }
        if(password !== confirmPassword){
            toast.error('Senhas diferentes!')
            return
        }
        if(password.length < 6){
            toast.error('Senha no mínimo com 6 caracteres!')
            return
        }
        signUp(name, email, password)
    }

    return (
        <Container>
            <AreaItems >
                <ContentLogo>
                    <img src={logo} alt="Imagem da logo" />
                    <h1>
                        <AiFillWindows size={20}/>
                        <MdVerified size={20} />
                        Marcenaria Pro  
                    </h1>
                </ContentLogo>

                <ContentForm>
                    <h2>Criar conta</h2>
                    <FormRegister onSubmit={handleRegister}>
                        <InputForm
                            type='text'
                            placeholder='Nome Marceneiro (ou marcenaria)'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputForm
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputForm
                            type='email'
                            placeholder='Confirme o email'
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
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
                        <div>
                            <InputForm
                                type={viewConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirme a senha'
                                value={confirmPassword}
                                onChange={(e) => setConfirmsetPassword(e.target.value)}
                            />
                            { confirmPassword.length > 0 &&
                                <button type='button' onClick={handleViewPasswordConfirm} >
                                    { viewConfirmPassword ? (
                                        <AiOutlineEye size={20} />
                                    ) : (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) }
                                </button>
                            }
                        </div>
                        <ButtonRegister
                            type='submit'
                            load={isLogging} 
                            disabled={isLogging}
                            onClick={handleRegister}
                        > 
                            {isLogging ? (
                                <Load/>
                            ) : (
                                <p>cadastrar</p>
                            )}
                        </ButtonRegister>
                        
                        {/* 
                        <StyledLinkButton to="/">
                            Já tem uma conta? faça login
                        </StyledLinkButton>
                        */}
                        
                    </FormRegister>
    
                </ContentForm>

            </AreaItems>

        </Container>

    )
}
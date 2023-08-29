import { useState, useContext, useEffect, FormEvent } from 'react'

import {
    Container,
    TitleHeader,
    Upload,
    ContentInput,
    ContentInput2
} from './styles'

import { BsCamera } from 'react-icons/bs'
import { InputForm } from '../../components/InputForm'
import { Load } from '../../components/Load'
import { phoneFormatter, cnpjOrcpf } from '../../utils/Formatted'
import { toast } from 'react-toastify'

import { AuthContext, User } from '../../contexts/auth'
import {
    getFirestore,
    doc,
    setDoc,
} from 'firebase/firestore'

import logo from '../../assets/logoblack.png'

export function Profile(){
    const { user, setUser } = useContext(AuthContext)

    const [load, setLoad] = useState(false)
    const [aboutLength, setAboutLength] = useState(user?.about || '')
    
    const [address, setAddress] = useState(user?.address || '')
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '')
    const [cnpjOrcpfUser, setCnpjOrCpfUser] = useState(user?.cnpjOrcpf || '')
    const [contact, setContact] = useState(user?.contact || '')
    const [facebook, setFacebook] = useState(user?.facebook || '')
    const [instagram, setInstagram] = useState(user?.instagram || '')
    const [name, setName] = useState(user?.name || '')
    const [site, setSite] = useState(user?.site || '')

    async function updateUserProfile(e: FormEvent){
        e.preventDefault()
        setLoad(true)

        const updatedUser = {
            ...user,
            about: aboutLength,
            address,
            avatarUrl,
            cnpjOrcpf: cnpjOrcpfUser,
            contact,
            facebook,
            instagram,
            name,
            site
        }

        try {
            const firestore = getFirestore();

            if (user?.id) {
                const userDocRef = doc(firestore, 'users', user.id)
                await setDoc(userDocRef, updatedUser)
            
                setUser(updatedUser as User)
            
                toast.success('Perfil atualizado com sucesso!')
                setLoad(false)
            } else {
                toast.error('Erro ao atualizar perfil: ID do usuário não disponível.')
                setLoad(false)
            }

        } catch (error) {
            toast.error('Erro ao atualizar perfil"');
            setLoad(false)
        }

    }

    return (
        <Container>
            <TitleHeader> minha empresa </TitleHeader>

            <section>
                <Upload>
                    { user?.avatarUrl ? (
                        <img src={user?.avatarUrl} alt="Imagem da Marcenaria" />
                    ) : (
                        <img src={logo} alt="Imagem da Marcenaria" />
                    ) }
                    <button>
                        <BsCamera size={20} />
                        Carregar logo da empresa
                        <input type="file" />
                    </button>
                </Upload>


                    <form onSubmit={updateUserProfile}>
                        <ContentInput>
                            <div>
                                <label>Nome da empresa (*)</label>
                                <InputForm 
                                    type="text"
                                    placeholder='Nome'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Seu email</label>
                                <p style={{fontWeight: 'bold'}}> {user?.email} </p>
                            </div>
                        </ContentInput>

                        <ContentInput>
                            <div>
                                <label>Telefone (*)</label>
                                <input 
                                    type="text"
                                    placeholder='Telefone da empresa'
                                    required
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}

                                    onInput={(event) => {
                                        const inputElement = event.target as HTMLInputElement
                                        inputElement.value = phoneFormatter(inputElement.value)
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label> CNPJ/CPF (*) </label>
                                <input 
                                    type="text"
                                    placeholder='Cnpj ou Cpf'
                                    required
                                    value={cnpjOrcpfUser}
                                    onChange={(e) => setCnpjOrCpfUser(e.target.value)}

                                    onInput={(e) => {
                                        const inputElement = e.target as HTMLInputElement
                                        inputElement.value = cnpjOrcpf(inputElement.value)
                                    }}
                                />
                            </div>
                        </ContentInput>

                        <ContentInput2>
                            <label>Endereço (*)</label>
                            <input 
                                type="text"
                                placeholder='Endereço da empresa'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </ContentInput2>

                        <ContentInput2>
                            <label>Site (Opcional) </label>
                            <input 
                                type="text"
                                placeholder='Link do site da empresa aqui'
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                            />
                        </ContentInput2>

                        <ContentInput>
                            <div>
                                <label>Instagram (Opcional)</label>
                                <input 
                                    type="text"
                                    placeholder='Nome no Instagram'
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                />
                            </div>
                            <div>
                                <label> Facebook (Opcional) </label>
                                <input 
                                    type="text"
                                    placeholder='Nome no Facebook'
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                />
                            </div>
                        </ContentInput>

                        <ContentInput2>
                            <label> Sobre minha empresa (Opcional) </label>
                            <textarea
                                placeholder='Breve descrição'
                                maxLength={100}

                                value={aboutLength}
                                onChange={(e) => setAboutLength(e.target.value)}
                            > </textarea>
                            <span>
                                Limite de {aboutLength.length < 1 ? '100' : `${100 - aboutLength.length}` } caracteres
                            </span>
                        </ContentInput2>


                        <button type='submit' disabled={load} >
                            { !load ? 'atualizar' : <Load/> }
                        </button>
                    </form>


            </section>

        </Container>
    )
}
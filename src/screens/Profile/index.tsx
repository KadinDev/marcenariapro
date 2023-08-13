import { useState } from 'react'

import {
    Container,
    TitleHeader,
    Upload,
    ContentInput,
    ContentInput2
} from './styles'

import { BsCamera } from 'react-icons/bs'
import { InputForm } from '../../components/InputForm'
import { phoneFormatter, cnpjOrcpf } from '../../utils/Formatted'

export function Profile(){

    const [description, setDescription] = useState('')

    return (
        <Container>
            <TitleHeader>Minha Empresa</TitleHeader>
            
            <section>
                <Upload>
                    <img src="https://lh3.googleusercontent.com/p/AF1QipPPqrAdcUlx1mCQgqJTABNNEUNRP2SFgUFRy-dy=s680-w680-h510" alt="Imagem da Marcenaria" />
                    <button>
                        <BsCamera size={20} />
                        Carregar logo da empresa
                        <input type="file" />
                    </button>
                </Upload>

                <form action="#">
                    <ContentInput>
                        <div>
                            <label>Nome da empresa (*)</label>
                            <InputForm 
                                type="text"
                                placeholder='Nome'
                                required
                            />
                        </div>
                        <div>
                            <label>Email da empresa (Opcional)</label>
                            <InputForm 
                                type="email"
                                placeholder='empresa@empresa.com'
                            />
                        </div>
                    </ContentInput>

                    <ContentInput>
                        <div>
                            <label>Telefone (*)</label>
                            <input 
                                type="text"
                                placeholder='Telefone da empresa'
                                required

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
                        />
                    </ContentInput2>

                    <ContentInput2>
                        <label>Site (Opcional) </label>
                        <input 
                            type="text"
                            placeholder='Link do site da empresa aqui'
                        />
                    </ContentInput2>

                    <ContentInput>
                        <div>
                            <label>Instagram (Opcional)</label>
                            <input 
                                type="text"
                                placeholder='Nome no Instagram'
                            />
                        </div>
                        <div>
                            <label> Facebook (Opcional) </label>
                            <input 
                                type="text"
                                placeholder='Nome no Facebook'
                            />
                        </div>
                    </ContentInput>

                    <ContentInput2>
                        <label> Sobre minha empresa (Opcional) </label>
                        <textarea
                            placeholder='Breve descrição'
                            maxLength={100}

                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        > </textarea>
                        <span>
                            Limite de {description.length < 1 ? '100' : `${100 - description.length}` } caracteres
                        </span>
                    </ContentInput2>


                    <button type='submit'>Salvar</button>
                </form>

            </section>

        </Container>
    )
}
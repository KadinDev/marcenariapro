import { useState } from 'react'

import {
    Form,
    Separator,
    InputsAmount,
    MethodPayment,
    InfoClient
} from './styles'

import { InputForm } from '../../components/InputForm'
import { moneyFormatter, phoneFormatter } from '../../utils/Formatted'

import { Pdf } from './Pdf'

export function Receipts(){
    const [title, setTitle] = useState('')
    const [valorPago, setValorPago] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)
    const [methodPay, setMethodPay] = useState('')
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')


    function handleSelectMethodPayment(e : React.ChangeEvent<HTMLInputElement>){
        setMethodPay(e.target.value)
    }

    function handleValorPago(
        e: React.ChangeEvent<HTMLInputElement>
    ){
        const {value} = e.target
        const unformattedValue = value.replace(/[R$\s.,]/g, '')
        const parsedValue = parseFloat(unformattedValue)
        setValorPago(parsedValue)
    }

    function handleValorTotal(
        e: React.ChangeEvent<HTMLInputElement>
    ){
        const {value} = e.target
        const unformattedValue = value.replace(/[R$\s.,]/g, '')
        const parsedValue = parseFloat(unformattedValue)
        setValorTotal(parsedValue)
    }


    return (
        <Form>
            <form>
                <input 
                    type="text"
                    required
                    placeholder='Título do Recibo'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <Separator/>

                <InputsAmount>
                    <div>
                        <span> Valor pago </span>
                        <InputForm 
                            type="text" 
                            required
                            
                            value={isNaN(valorPago) ? '' : moneyFormatter(valorPago.toString())} // Valor formatado como string se for um número válido
                            onChange={(e) => handleValorPago(e)}

                            onInput={(e) => {
                                const inputElement = e.target as HTMLInputElement;
                                const unformattedValue = inputElement.value.replace(/[R$\s.,]/g, ''); // Remove a formatação do valor
                                const parsedValue = parseFloat(unformattedValue); // Converte para número
                                
                                if (!isNaN(parsedValue)) {
                                    const formattedValue = moneyFormatter(parsedValue.toString()); // Formata o novo valor
                                    inputElement.value = formattedValue; // Atualiza o valor formatado no input
                                }
                            }}

                        />
                    </div>
                    <div>
                        <span>Valor total</span>
                        <InputForm 
                            type="text"
                            required
                            placeholder='Valor Total'
                            
                            value={isNaN(valorTotal) ? '' : moneyFormatter(valorTotal.toString())} // Valor formatado como string se for um número válido
                            onChange={(e) => handleValorTotal(e)}

                            onInput={(e) => {
                                const inputElement = e.target as HTMLInputElement;
                                const unformattedValue = inputElement.value.replace(/[R$\s.,]/g, ''); // Remove a formatação do valor
                                const parsedValue = parseFloat(unformattedValue); // Converte para número
                                
                                if (!isNaN(parsedValue)) {
                                    const formattedValue = moneyFormatter(parsedValue.toString()); // Formata o novo valor
                                    inputElement.value = formattedValue; // Atualiza o valor formatado no input
                                }
                            }}
                        />
                    </div>
                    <div>
                        <span>Data</span>
                        <input 
                            type="date" 
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </InputsAmount>

                <MethodPayment>
                    <h2>Métodos de pagamento</h2>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Cartão de crédito"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Cartão de crédito"}
                        />
                        <label>Cartão de crédito</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Cartão de débito"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Cartão de débito"}
                        />
                        <label>Cartão de débito</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Cheque"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Cheque"}
                        />
                        <label>Cheque</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Transferência bancária"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Transferência bancária"}
                        />
                        <label>Transferência bancária</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Dinheiro"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Dinheiro"}
                        />
                        <label>Dinheiro</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="methodPayment"
                            value="Pix"
                            onChange={handleSelectMethodPayment}
                            checked={methodPay === "Pix"}
                        />
                        <label>Pix</label>
                    </div>
                </MethodPayment>

                <Separator/>
                
                <InfoClient>
                    <div>
                        <InputForm 
                            type='text'
                            required
                            placeholder='Nome do cliente' 

                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputForm
                            type='text'
                            required
                            placeholder='Celular do cliente' 
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}

                            onInput={(event) => {
                                const inputElement = event.target as HTMLInputElement;
                                inputElement.value = phoneFormatter(inputElement.value)
                            }}
                        />
                    </div>
                    <div>
                        <InputForm
                            type='text'
                            required
                            placeholder='Endereço do cliente'

                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <InputForm
                            type='email'
                            placeholder='Email do cliente - (Opcional)'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                </InfoClient>

                <Separator/>

            </form>
            
            { Object.keys(
                title && valorPago && valorTotal && methodPay
                && date && name && address && tel
            ).length > 0 && (

                <Pdf
                    title={title}
                    valorPago={valorPago}
                    valorTotal={valorTotal}
                    methodPay={methodPay}
                    date={date}
                    name={name}
                    address={address}
                    tel={tel}
                    email={email}
                />

            ) }
        
        </Form>
    )
}
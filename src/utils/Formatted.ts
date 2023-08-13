export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})


export const phoneFormatter = (phoneNumber : string) => {
    // Remove todos os caracteres não numéricos
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    
    // Limitar o número de caracteres para (XX)XXXXX-XXXX
    const limitedNumber = cleanedNumber.slice(0, 11);

    // Formate o número de telefone no estilo (XX)XXXXX-XXXX
    const formattedNumber = `(${limitedNumber.slice(0, 2)}) ${limitedNumber.slice(2, 7)}-${limitedNumber.slice(7)}`;
  
    return formattedNumber;
};
  
export const cnpjOrcpf = (documentNumber: string) => {
    // Remove todos os caracteres não numéricos
    const cleanedNumber = documentNumber.replace(/\D/g, '');
    
    // Verifica se é um CPF (até 11 dígitos) ou CNPJ (mais de 11 dígitos)
    const isCpf = cleanedNumber.length <= 11;

    // Limita o número de caracteres para CPF (XXX.XXX.XXX-XX) ou CNPJ (XX.XXX.XXX/XXXX-XX)
    const limitedNumber = isCpf ? cleanedNumber.slice(0, 11) : cleanedNumber.slice(0, 14);

    // Formata o número de acordo com CPF ou CNPJ
    let formattedNumber;
    if (isCpf) {
        formattedNumber = `${limitedNumber.slice(0, 3)}.${limitedNumber.slice(3, 6)}.${limitedNumber.slice(6, 9)}-${limitedNumber.slice(9)}`;
    } else {
        formattedNumber = `${limitedNumber.slice(0, 2)}.${limitedNumber.slice(2, 5)}.${limitedNumber.slice(5, 8)}/${limitedNumber.slice(8, 12)}-${limitedNumber.slice(12)}`;
    }
  
    return formattedNumber;
};


export const moneyFormatter = (amount: string) => {
    // Converte o valor para string e remove caracteres não numéricos
    const cleanedAmount = String(amount).replace(/\D/g, '');
  
    // Obtém os valores separados em reais e centavos
    const reais = cleanedAmount.slice(0, cleanedAmount.length - 2);
    const centavos = cleanedAmount.slice(-2);
  
    // Formata os reais adicionando ponto como separador de milhar
    const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Retorna o valor formatado no estilo R$ X.XXX,XX
    return `R$ ${formattedReais},${centavos}`;
};
  

export function generateUniqueID(){
    // numero aleatório de 16 dígitos
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 16))

    // obter data atual
    const currentDate = new Date().getTime()

    // número aleatório + data atual = ID Único
    const uniqueID = `${randomNumber}${currentDate}`

    return uniqueID
}

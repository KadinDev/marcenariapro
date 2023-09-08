import {
    useState,
    createContext,
    useEffect,
    ReactNode
} from 'react'

import { toast } from 'react-toastify'
import { auth } from '../services/firebaseConnection'
import { 
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth'

import { 
    getDoc, 
    doc, 
    getFirestore, 
    setDoc 
} from 'firebase/firestore'

type AuthContextData = {
    signIn: ( email: string, password: string ) => Promise<void>;
    signUp: ( name: string, email: string, password: string ) => Promise<void>;
    signOutUser: () => Promise<void>;
    forgotPassword: (email : string) => Promise<void>;
    isLogging: boolean;
    isLoggingRecoverPass: boolean;
    user: User | null;

    // React.Dispatch = representa uma função que pode ser usada para despachar ações para atualizar o estado
    setUser: React.Dispatch<React.SetStateAction< User | null >>;
}

export type User = {
    id: string;
    avatarUrl?: string;
    name: string;
    email?: string;
    contact: string;
    cnpjOrcpf: string;
    address: string;
    site?: string;
    instagram?: string;
    facebook?: string;
    about?: string;
    vip: boolean;
}

type AuthProviderProps = {
    children: ReactNode
}

const MARCENARIA_COLLECTION = "@marcenaria:users"

export const AuthContext = createContext( {} as AuthContextData )

export function AuthProvider( {children} : AuthProviderProps ){
    
    const [isLogging, setIsLogging] = useState(false)
    const [isLoggingRecoverPass, setIsLoggingRecoverPass] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        loadUserStorageData()
    }, [])

    // carregando dados do user do async storage
    function loadUserStorageData(){
        setIsLogging(true)

        const storageUser = localStorage.getItem(MARCENARIA_COLLECTION)
        
        if(storageUser){
            const userData = JSON.parse(storageUser) as User
            setUser(userData)
        }

        setIsLogging(false)
    }
   
    async function signIn(email: string, password: string){
        if(!email || !password){
            toast.error('Preencha todos os campos!')
            return
        }
        setIsLogging(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Inicialize o Firestore
            const firestore = getFirestore()

            // Acessando os dados do usuário no Firestore
            const userDocRef = doc(firestore, 'users', user.uid)
            const userDocSnapshot = await getDoc(userDocRef)

            if(userDocSnapshot.exists()){
                const userData = userDocSnapshot.data() as User

                //verificar se o usuario é Vip
                if(userData.vip === true){
                    setUser(userData)
                    localStorage.setItem(MARCENARIA_COLLECTION, JSON.stringify(userData))
                    toast.success(`Bem vindo ${userData.name}`)
                }
                else {
                    toast.error('Assinatura expirada, revise seu pagamento.')
                }

            }
            setIsLogging(false)
            
        } catch (error) {
            toast.error('Email e(ou) senha estão incorretos!')
            setIsLogging(false)
        }
    }

    async function signOutUser(){
        signOut(auth)
        localStorage.removeItem(MARCENARIA_COLLECTION)
        setUser(null)
    }
    
    async function signUp(
        name: string, email: string, password: string
    ){
        setIsLogging(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Inicialize o Firestore
            const firestore = getFirestore()

            // Adicionando os dados do novo usuário ao Firestore
            const userDocRef = doc(firestore, 'users', user.uid)
            const userData = {
                id: user.uid,
                name: name,
                email: email,
                avatarUrl: '',
                contact: '',
                cnpjOrcpf: '',
                address: '',
                site: '',
                instagram: '',
                facebook: '',
                about: '',
                createdUser: new Date(),
                vip: true
            }
            // passe o novo usuario para o documento 'users'
            await setDoc(userDocRef, userData)

            setUser(userData)
            localStorage.setItem(MARCENARIA_COLLECTION, JSON.stringify(userData))
            toast.success(`Cadastro realizado com sucesso para ${name}`)
            setIsLogging(false)

        } catch (error) {
            toast.error('Email já cadastrado, tente outro!')
            setIsLogging(false)
        }
    }

    async function forgotPassword(email: string){
        if(!email){
            toast.error('Informe um email.')
            return
        }
        setIsLoggingRecoverPass(true)
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success('Um email de redefinição de senha foi enviado, aguarde alguns instantes.')
            setIsLoggingRecoverPass(false)
        } catch (error) {
            toast.error('Ocorreu um erro ao enviar o email de redefinição de senha. Verifique o endereço de email informado.')
            setIsLoggingRecoverPass(false)
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                user,
                isLogging,
                isLoggingRecoverPass,
                signIn,
                signOutUser,
                signUp,
                forgotPassword,
                setUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}
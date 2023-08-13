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

import { getDoc, doc, getFirestore } from 'firebase/firestore'

type AuthContextData = {
    signIn: ( email: string, password: string ) => Promise<void>;
    //signUp: ( name: string, email: string, password: string ) => Promise<void>;
    signOutUser: () => Promise<void>;
    //forgotPassword: (email : string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
}

type User = {
    id: string;
    name: string;
}

type AuthProviderProps = {
    children: ReactNode
}

const MARCENARIA_COLLECTION = "@marcenaria:users"

export const AuthContext = createContext( {} as AuthContextData )

export function AuthProvider( {children} : AuthProviderProps ){
    
    const [isLogging, setIsLogging] = useState(false)
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
                setUser(userData)
                localStorage.setItem(MARCENARIA_COLLECTION, JSON.stringify(userData))
                toast.success(`Bem vindo ${userData.name}`)
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
    

    
    return (
        <AuthContext.Provider
            value={{
                user,
                isLogging,
                signIn,
                signOutUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}
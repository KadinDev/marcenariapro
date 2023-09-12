import {useEffect, useState} from 'react'
import { getFirestore, collection, query, where, onSnapshot, Unsubscribe } from 'firebase/firestore'

import {User} from '../contexts/auth'

export function useTotalOutcome( user: User | null ){
    const [totalOuctome, setTotalOutcome] = useState(0)
    

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined

        if(user){
            const firestore = getFirestore()
            const transactionsCollectionRef = collection(firestore, 'transactions')
            const outcomeQuery = query(transactionsCollectionRef, 
                where('userId', '==', user.id),
                where('type', '==', 'outcome')
            )

            unsubscribe = onSnapshot(outcomeQuery, (snapshot) => {
                let total = 0
                snapshot.docs.forEach((doc) => {
                    const data = doc.data()
                    const price = parseFloat(data.price)
                    total += price
                })
                setTotalOutcome(total)
            } )
        }
        /*
        return () => {
            // Limpar o listener quando o componente for desmontado
            if (unsubscribe) {
                unsubscribe()
            }
        }
        */
    },[user])

    return totalOuctome
}

export function useTotalIncome(user: User | null){
    const [totalIncome, setTotalIncome] = useState(0)

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined

        if(user){
            const firestore = getFirestore()
            const transactionsCollectionRef = collection(firestore, 'transactions')
            const incomeQuery = query(transactionsCollectionRef,
                where('userId', '==', user.id),
                where('type', '==', 'income')
            )

            unsubscribe = onSnapshot(incomeQuery, (snapshot) => {
                let total = 0
                snapshot.docs.forEach((doc) => {
                    const data = doc.data()
                    const price = parseFloat(data.price)
                    total += price
                })
                setTotalIncome(total)
            })
        }
        return () => {
            if (unsubscribe) {
              unsubscribe() // Chame a função de cancelamento quando o componente for desmontado
            }
        }
    },[user])

    return totalIncome
}
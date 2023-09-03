import { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { User } from '../contexts/auth'

export function useTotalCustomers(user : User | null) {
  const [totalCustomers, setTotalCustomers] = useState(0)

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined

    if (user) {
      const firestore = getFirestore()
      const userDeliveriesCollectionRef = collection(firestore, 'clients')
      const userQuery = query(userDeliveriesCollectionRef, where('userId', '==', user.id))

      unsubscribe = onSnapshot(userQuery, (snapshot) => {
        setTotalCustomers(snapshot.docs.length); // Define o tamanho do array de documentos como o total de entregas
      })
    }
    /*
    return () => {
      // Limpar o listener quando o componente for desmontado
      if (unsubscribe) {
        unsubscribe()
      }
    };
    */
  }, [user])

  return totalCustomers
}


import { useEffect, useState } from 'react'
import { getFirestore, collection, query, where, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { User } from '../contexts/auth'

export function useTotalDeliveries(user : User | null) {
  const [totalDeliveries, setTotalDeliveries] = useState(0)

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined

    if (user) {
      const firestore = getFirestore()
      const userDeliveriesCollectionRef = collection(firestore, 'delivery')
      const userQuery = query(userDeliveriesCollectionRef, where('userId', '==', user.id))

      unsubscribe = onSnapshot(userQuery, (snapshot) => {
        setTotalDeliveries(snapshot.docs.length); // Define o tamanho do array de documentos como o total de entregas
      })
    }
    return () => {
      if (unsubscribe) {
        unsubscribe(); // Chame a função de cancelamento quando o componente for desmontado
      }
    };
  }, [user])

  return totalDeliveries
}


import {
    Route,
    Routes,
    Navigate
} from 'react-router-dom'

import { Sidebar } from '../components/Sidebar'

import { Dashboard } from '../screens/Dashboard'
import { Bank } from '../screens/Bank'
import { NewBudget } from '../screens/NewBudget'
import { Budgets } from '../screens/Budgets'
import { Receipts } from '../screens/Receipts'
import { Catalog } from '../screens/Catalog'
import { Customers } from '../screens/Customers'
import { Deliveries } from '../screens/Deliveries'
import { Profile } from '../screens/Profile'

export function UserRoutes(){
    return (
        <>
        <Sidebar/>
        <Routes>
            <Route path='/' element={ <Dashboard/> } />
            <Route path='/criarorcamento' element={ <NewBudget/> } />
            <Route path='/orcamentos' element={ <Budgets/> } />
            <Route path='/recibos' element={ <Receipts/> } />
            <Route path='/catalogo' element={ <Catalog/> } />
            <Route path='/clientes' element={ <Customers/> } />
            <Route path='/entregas' element={ <Deliveries/> } />
            <Route path='/bank' element={ <Bank/> } />
            <Route path='/perfilmarcenaria' element={ <Profile/> } />

            <Route path='/login' element={<Navigate to='/' />}  />
            {/* <Route path='/register' element={<Navigate to='/' />}  /> */}
        </Routes>
        </>
    )
}
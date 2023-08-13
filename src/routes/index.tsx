import { useContext } from 'react'

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global";

import {
    BrowserRouter as Router,
    Route,
    Routes as Switch,
    Navigate
} from 'react-router-dom'

import { defaultTheme } from '../styles/themes'


import { Login } from '../screens/Login'
import { Register } from '../screens/Register'

import { AuthContext } from '../contexts/auth'
import { UserRoutes } from './userRoutes'

export function Routes(){
    const { user } = useContext(AuthContext)

    return (
        <Router>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles />
                    { user ? 
                        <UserRoutes/>
                        :
                        <Switch>
                            <Route path="/" element={ <Login /> } />
                            <Route path="/register" element={ <Register/> } />

                            <Route path='/*' element={<Navigate to='/' />}  />
                        </Switch>
                    }
                    
            </ThemeProvider>
        </Router>
    )
}
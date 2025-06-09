import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import UsersComponent from '../components/users/UsersComponent'
import HomeComponent from '../components/home/HomeComponent'
import LoginComponent from '../components/login/LoginComponent'
import RegisterComponent from '../components/register/RegisterComponent'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/context/UserContext'


const AppRouter = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user, loadingAccount, setLoadingAccount, fetchUserAccount} = useContext(UserContext)
    const path = location.pathname
    const callAccount = async () => {
        return await fetchUserAccount()
    }
        useEffect(() => {
            if (!loadingAccount) {
                if (!user?.isAuthenticated) {
                    if ( path !== '/login' && path !== '/register') {
                        setLoadingAccount(false)
                        return navigate('/login')
                    }
                } 
            }
            if(loadingAccount === false) {
                if(user?.isAuthenticated) {
                    if (path === '/login' && path === '/register') {
                        // callAccount()
                        return navigate('/users')
                    }
                }
            }
        }, [user, navigate, path, loadingAccount])
        return(
            <>
                <Routes path='/' element={ <HomeComponent/>} >
                    <Route path='/' element={ <HomeComponent/>} exact></Route>
                    <Route path='/login' element={ <LoginComponent/>} exact></Route>
                    <Route path='/register' element={ <RegisterComponent/>} exact></Route>
                    <Route path='/users' element={ <UsersComponent/>} exact></Route>
    
                    <Route path='*' element={<div>404 not found</div>}></Route>
                </Routes>
            </>
        )


}

export default AppRouter
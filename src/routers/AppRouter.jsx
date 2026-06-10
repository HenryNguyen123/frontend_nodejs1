import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import UsersComponent from '../components/users/UsersComponent'
import HomeComponent from '../components/home/HomeComponent'
import LoginComponent from '../components/login/LoginComponent'
import RegisterComponent from '../components/register/RegisterComponent'
import { useContext, useEffect } from 'react'
import { UserContext } from '../components/context/UserContext'
import AccountComponent from '../components/account/AccountComponent'
import RolesComponent from '../components/roles/RolesComponent'


const AppRouter = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user, loadingAccount, setLoadingAccount} = useContext(UserContext)
    const path = location.pathname
    const jwtSession = sessionStorage.getItem('JWT')
    const jwtLocal = localStorage.getItem('JWT')

    useEffect(() => {
        if (!loadingAccount) {
            if (!user?.isAuthenticated) {
                if ( path !== '/login' && path !== '/register' && path !== '/') {
                    console.log('checllllll 111111')
                    
                    setLoadingAccount(false)
                    return navigate('/login')
                }
            } 
        }
        if ((path === '/login' || path === '/register') && (jwtLocal || jwtSession)) {
            navigate('/')
            window.location.reload()
            // window.location.href = '/'
        }

        //check time live localStorage 
        const nowDate = new Date().getTime();

        // Kiểm tra token localStorage có hết hạn không
        const tokenDataStr = localStorage.getItem('setTimeToken');
        if (tokenDataStr) {
            try {
                const tokenData = JSON.parse(tokenDataStr);
                if (nowDate > tokenData.expiry) {
                    localStorage.removeItem('JWT');
                    localStorage.removeItem('setTimeToken');
                }
            } catch (err) {
                console.error('Lỗi parse setTimeToken:', err);
                localStorage.removeItem('JWT');
                localStorage.removeItem('setTimeToken');
            }
        }
    }, [user, navigate, path, loadingAccount, jwtSession, jwtLocal])
        return(
            <>
                <Routes path='/' element={ <HomeComponent/>} >
                    <Route path='/' element={ <HomeComponent/>} ></Route>
                    <Route path='/login' element={ <LoginComponent/>} ></Route>
                    <Route path='/register' element={ <RegisterComponent/>} ></Route>
                    <Route path='/users' element={ <UsersComponent/>} ></Route>
                    <Route path='/account' element={ <AccountComponent/>} ></Route>
                    <Route path='/roles' element={ <RolesComponent/>} ></Route>
    
                    <Route path='*' element={<div>404 not found</div>}></Route>
                </Routes>
            </>
        )


}

export default AppRouter
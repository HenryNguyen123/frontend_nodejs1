import { Route, Routes } from 'react-router-dom'

import UsersComponent from '../components/users/UsersComponent'
import HomeComponent from '../components/home/HomeComponent'
import LoginComponent from '../components/login/LoginComponent'
import RegisterComponent from '../components/register/RegisterComponent'


const AppRouter = () => {

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
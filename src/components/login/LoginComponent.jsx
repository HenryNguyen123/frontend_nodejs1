
import { useNavigate } from 'react-router-dom'
import './login.scss'
import { useState } from 'react'
 import { ToastContainer, toast } from 'react-toastify';
import {loginUser} from '../../services/userService'

const LoginComponent = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const objCheckInputLogin = {
        isValidUserName: true,
        isvalidPassword: true
    }

    const [objCheck, setObjCheck] = useState(objCheckInputLogin)

    const isValidLogin = () => {
        setObjCheck(objCheckInputLogin)
        if (!userName) {
            toast.error('Please enter your username or phone number')
            setObjCheck({...objCheckInputLogin, isValidUserName: false})
            return
        }
        if (!password) {
            toast.error('Please enter your password')
            setObjCheck({...objCheckInputLogin, isvalidPassword: false})
            return
        }
        if(password.length < 6) {
            toast.error('Password must be at least 6 characters long.')
            setObjCheck({...objCheckInputLogin, isvalidPassword: false})
            return
        }
    }

    const handleLogin = async() => {
        isValidLogin()
        let res = await loginUser(userName, password)
        let serverData =  res.data
        //success
        if (res && serverData && +res.data.EC === 0){
            // Save data to sessionStorage
            let dataUser = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem("account", JSON.stringify(dataUser));

            toast.success(serverData.EM)
            navigate('/users')
            window.location.reload()
            return
        }
        //fail
        if (res && serverData && +res.data.EC !== 0) {
            toast.error(serverData.EM)
            return
        }
            console.log('res >>>> ', res)
    }

    const handlePressEnter = (e)=> {
        if (e.keyCode === 13 && e.code ==="Enter") {
            handleLogin()
        }
    }
    const handleClickRegister = () => {
        navigate('/register')
    }

    // check login 
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate('/')
    } else {
    //   navigate('/login')
    }

    return(
        <>
            <div className="login-container">
                <div className="container">
                    <div className="row">
                        <div className="content-left col-7 d-none d-sm-block">
                            <div className="brand">
                                reactjs nodejs
                            </div>
                            <div className="detail">
                                learn everything
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat provident labore libero a voluptate excepturi fugit suscipit veritatis nobis quam. Veniam laborum praesentium odio eius similique quia harum ex doloribus?</p>
                            </div>
                        </div>
                        <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 border border-2 px-3 py-3 rounded-3 ">
                            {/* <form action=""> */}
                                <div className="brand d-sm-none text-center">
                                    reactjs nodejs
                                </div>

                                <input type="text" name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} className={objCheck.isValidUserName ? "form-control" : "form-control is-invalid"} placeholder='username or your phone' />

                                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handlePressEnter} className={objCheck.isvalidPassword ? "form-control" : "form-control is-invalid"} placeholder='password...'/>

                                <button className="btn btn-primary" type='submidt' onClick={handleLogin}>submit</button>

                                <span className="text-center"><a href="">forget password?</a></span>

                                <hr />

                                <button className="btn btn-primary" onClick={handleClickRegister}>Create new account</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent
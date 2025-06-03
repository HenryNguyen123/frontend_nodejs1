import { useNavigate } from 'react-router-dom'
import './register.scss'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../../services/userService'

const RegisterComponent = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const defaultCheckValid = {
        isValidEmail: true,
        isValidUserName: true,
        isValidName: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultCheckValid)

    const navigate = useNavigate()
    const handleOnclickLogin = () => {
        navigate('/login')
    }

    const isValidInput = () => {
        setObjCheckInput(defaultCheckValid)

        if (!userName) {
            toast.error('userName is required!')
            setObjCheckInput({...defaultCheckValid, isValidUserName : false})
            return false;
        }

        //check email
        if (!email) {
            toast.error('Email is required!')
            setObjCheckInput({...defaultCheckValid, isValidEmail : false})

            return
        }
        let re = /\S+@\S+\.\S+/;
        if(!re.test(email)) {
            toast.error('Please! enter a valid email address.')
            setObjCheckInput({...defaultCheckValid, isValidEmail : false})
            return
        }

        if (!password) {
            toast.error('password is required!')
            setObjCheckInput({...defaultCheckValid, isValidPassword : false})
            return
        }
        if (password != confirmPassword) {
            toast.error('your password is not the same!')
            setObjCheckInput({...defaultCheckValid, isValidConfirmPassword : false})
            return
        }
        if (!phone) {
            toast.error('password is required!')
            setObjCheckInput({...defaultCheckValid, isValidPhone : false})
            return
        }

        return true;
    }

    useEffect(()=> {

    }, [])

    const handleRegister = async() => {
        let check = isValidInput()

        // let userData = {
        //     email: email,
        //     userName: userName,
        //     phone: phone,
        //     password: password
        // }

        if (check) {
            let res = await registerUser(email, name, userName, password, phone)
            if (+res.EC == 0) {
                toast.success(res.EM)
                return navigate('/login')
            } else {
                toast.error(res.EM)
            }
        }
    }

    //check login 
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate('/')
    } else {
    //   navigate('/login')
    }

    return (
        <>
            <div className="register-container">
                <div className="container">
                    <div className="row">
                        <div className="content-left col-7 d-none d-sm-block">
                            <div className="brand">
                                register
                            </div>
                            <div className="detail">
                                learn everything
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat provident labore libero a voluptate excepturi fugit suscipit veritatis nobis quam. Veniam laborum praesentium odio eius similique quia harum ex doloribus?</p>
                            </div>
                        </div>
                        <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 border border-2 px-3 py-3 rounded-3 ">
                            {/* <form action=""> */}
                                <div className="brand d-sm-none text-center">
                                    register
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">UserName</label>
                                    <input type="text" name='userName' className={objCheckInput.isValidUserName ? "form-control": "form-control is-invalid"} placeholder='username...' value={userName} onChange={(e)=> setUserName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="text" name='email'  className={objCheckInput.isValidEmail ? "form-control": "form-control is-invalid"} placeholder='email...'value={email} onChange={(e)=> setEmail(e.target.value)}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name='password' className={objCheckInput.isValidPassword ? "form-control": "form-control is-invalid"} placeholder='Password...' value={password} onChange={(e)=> setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="password" name='confirm-password' className={objCheckInput.isValidConfirmPassword ? "form-control": "form-control is-invalid"} placeholder='Confirm Password...' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Name</label>
                                    <input type="text" name='name' className={objCheckInput.isValidName ? "form-control": "form-control is-invalid"} placeholder='name...'value={name} onChange={(e)=> setName(e.target.value)}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Phone</label>
                                    <input type="text" name='phone' className={objCheckInput.isValidPhone ? "form-control": "form-control is-invalid"} placeholder='phone...'value={phone} onChange={(e)=> setPhone(e.target.value)}  />
                                </div>
                                <button className="btn btn-primary" onClick={handleRegister}>submit</button>

                                <hr />

                                <button className="btn btn-primary" onClick={handleOnclickLogin}>Already have an account! Login Now.</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent;
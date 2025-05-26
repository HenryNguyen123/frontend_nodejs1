
import {  useNavigate } from 'react-router-dom'
import './App.scss'
import NavComponent from './components/navigation/NavComponent'
import ToastifyComponent from './components/toastify/ToastifyComponent'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import AppRouter from './routers/AppRouter'

function App() {
  const navigate =  useNavigate()
  const [account, setAccount] = useState({})
  
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <>
      <div className="app-header">
        {
          account && !_.isEmpty(account) && account.isAuthenticated    // check điều kiện theo lodash
          && <NavComponent/>
        }
      </div>
      
      <div className="app-container">
        <AppRouter></AppRouter>
      </div>

      <ToastifyComponent/>
    </>
  )
}

export default App


import './App.scss'
import NavComponent from './components/navigation/NavComponent'
import ToastifyComponent from './components/toastify/ToastifyComponent'
import _ from 'lodash'
import AppRouter from './routers/AppRouter'
import { Audio } from 'react-loader-spinner'
import { useContext } from 'react'
import { UserContext } from './components/context/UserContext'

function App() {

  const {loadingAccount} = useContext(UserContext)
  if (loadingAccount) {
    return (
      <>
        <div className='loading-container'>
            <div className='loading-user'>
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
              />
              <div>loading data.....</div>
            </div>
          </div>
      </>
    )
  }
  return (
    <>
        <>
          <div className="app-header">
            {/* {
              account && !_.isEmpty(account) && account.isAuthenticated    // check điều kiện theo lodash
              && <NavComponent/>
            } */}
            <NavComponent/>
          </div>
          
          <div className="app-container">
            <AppRouter></AppRouter>
          </div>
        </>

      <ToastifyComponent/>
    </>
  )
}

export default App

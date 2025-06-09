import { createContext, useState, useEffect } from "react"
import {getUserAccount} from '../../services/userService'

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loadingAccount, setLoadingAccount] = useState(true)

    //handle login 
    const loginContext = (userData) => {
        setUser({
            isLoading: true,
            isAuthenticated: true,
            token: userData.token,
            account: userData.account
        })
    }
    //handle out 
    const logoutContext = () => {
        sessionStorage.setItem('account', JSON.stringify(''))
        setUser({
                    isLoading: false,
                    isAuthenticated:false,
                    token:"",
                    account:{}
                });
    }

    const fetchUserAccount = async()=> {
        try {
            // if (!user?.isAuthenticated) {
            //     return setLoadingAccount(false)
            // }
            let data = await getUserAccount()
            if(data && +data.EC === 0) {
                let groupWithRole = data.DT.data
                let email = data.DT.email
                let userName = data.DT.userName
                let dataUser = {
                    isAuthenticated: true,
                    token: data.DT.acces_token,
                    account: {groupWithRole, email, userName}
                }
                console.log('data >>' , data)
                // update user login success
                loginContext(dataUser)
            }
        } catch (error) {
            console.log('Error fetching user account:', error)
        } finally {
            setLoadingAccount(false)
        }
    }
    useEffect(() => {
        let pathRouter = window.location.pathname
        try {
            if ( pathRouter !== '/login' && pathRouter !== '/register'  ) {
                fetchUserAccount()
            } else {
                setLoadingAccount(false)
            }
        } catch (error) {
            console.log('check account >>> ', error)
        }
    }, []);

    return(
        < UserContext.Provider value={{user, loadingAccount, setLoadingAccount, setUser, loginContext, logoutContext, fetchUserAccount}} >{children}</UserContext.Provider>
    )
}

export default UserProvider
import { createContext, useState } from "react"


export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({name:'', auth:true});

    //handle login 
    const login = (name) => {
        setUser({
            name: name,
            auth: true
        })
    }
    //handle out 
    const logout = () => {
        setUser({
            name: '',
            auth: false
        })
    }

    return(
        < UserContext.Provider value={{user, setUser, login, logout}} >{children}</UserContext.Provider>
    )
}

export default UserProvider
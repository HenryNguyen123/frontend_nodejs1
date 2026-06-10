import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


const AccountComponent = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    if (user && user.isAuthenticated) {
        return(
            <>
                <div className="account-container">
                    <div className="container">
                        <h1>UserName: {user.account.userName}</h1>

                    </div>
                </div>
            </>
        )
    }
    return navigate('/')
}

export default AccountComponent
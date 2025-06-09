import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./nav.scss"
import _ from "lodash"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavComponent =  () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user,setUser,logoutContext} = useContext(UserContext)

    const handleLogout = () => {
        logoutContext()
        setUser(null)
        navigate('/login')
    }

    if(user && user.isAuthenticated == true || location.pathname == '/' ) {
        return (
            <>
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink onClick={handleLogout} to='/logout'>Logout</NavLink>
                    <NavLink onClick={handleLogout} to='/account'>{user?.account.userName}</NavLink>
                    {/* {
                        account && !_.isEmpty(account) && account.isThenticated
                        && <NavLink to="/login">Login</NavLink>
                    } */}
                    
                </div>
            </>
        )    
    }
    return <></>
}

export default NavComponent;
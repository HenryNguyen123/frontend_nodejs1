import { Link, NavLink } from "react-router-dom";
import "./nav.scss"
import { useEffect, useState } from "react";
import _ from "lodash"

const NavComponent =  () => {
    const [account, setAccount] = useState({})
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session))
        }
    }, [])
    return (
        <>
            <div className="topnav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/news">News</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    account && !_.isEmpty(account) && account.isThenticated
                    && <NavLink to="/login">Login</NavLink>
                }
                
            </div>
        </>
    )
}

export default NavComponent;
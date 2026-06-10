import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./nav.scss"
import _ from "lodash"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
                    {/* <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink onClick={handleLogout} to='/logout'>Logout</NavLink>
                    <NavLink onClick={handleLogout} to='/account'>{user?.account.userName}</NavLink> */}
                    {/* {
                        account && !_.isEmpty(account) && account.isThenticated
                        && <NavLink to="/login">Login</NavLink>
                    } */}
                    
                     <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    src="/logo.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                <span className="brand-name">React-Bootstrap</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                                <NavLink className="nav-link" to="/users">Users</NavLink>
                                <NavLink className="nav-link" to="/roles">Roles</NavLink>
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </Nav>
                            <Nav>
                                <Nav.Link className="nav-link" href="/account">{user && user.isAuthenticated ? user.account.userName : 'Welcome!'}</Nav.Link>
                                {
                                    user && user.isAuthenticated ? (
                                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    )
                                    :
                                    (
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    )
                                }
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                        </Navbar>
                </div>
            </>
        )    
    }
    return <></>
}

export default NavComponent;
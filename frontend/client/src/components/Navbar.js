import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from 'features/user';
import LoginPage from 'containers/Login';
import React from 'react';


const Navbar = () => {

    const dispatch = useDispatch();
    
    const { isAuthenticated } = useSelector(state => state.user);
  
    const authLinks = (
        <li className="nav-item">
        <NavLink className="nav-link" to='#!' onClick={() => dispatch(logout())}>Logout</NavLink>
        </li>
    )

    const guestLinks = (
        <>    
            <li className="nav-item">
            <NavLink className="nav-link" to='/login'>Login</NavLink>


            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to='/register'>Register</NavLink>
            </li>

        </>)

    return (    
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">Blog</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link" to='/'>Home</NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
            </ul>
       </div>
    </div>
    </nav>
    );
};

export default Navbar;
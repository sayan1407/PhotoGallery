import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './Redux/userAuthSlice';

function Header() {
  
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.userAuthStore)
  console.log(loggedInUser)
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(setLoggedInUser({
       id : "",
      email : ""
    }))
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" >
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01" >
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
           <NavLink className='nav-link text-white' to='/'>Home
            <span className="visually-hidden">(current)</span>
          </NavLink>
        </li>
        
        
      </ul>
      {loggedInUser.id != "" ? (<ul className='nav justify-content-end'>
        <li className='nav-item text-white'>
              Welcome {loggedInUser.email}
        </li>
        <li className='nav-item'>
            <button
                        className="btn  btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
        </li>
       </ul>   
      ) : (<ul className='nav justify-content-end'>
        <li className='nav-item'>
            <NavLink className='nav-link text-white' to='/register'>
                 Register
           </NavLink>

        </li>
        <li className='nav-item'>
            <NavLink className='nav-link text-white' to='/login'>
                 Login
           </NavLink>

        </li>
        </ul>   
      )}
      
    </div>
  </div>
</nav>
  )
}

export default Header
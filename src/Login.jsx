import React, { useEffect, useState } from 'react'
import { useLoginUserMutation } from './Api/AuthApi';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './Redux/userAuthSlice';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router';

function Login() {
    const[userName,setUserName] = useState("");
    const[password,setPassword] = useState("")
    const[isValid,setIsValid] = useState(false)
    const navigate = useNavigate()
    const[login,{ isSuccess, data, error }] = useLoginUserMutation()
    //const loogedInUser = useSelector((store) => store.userAuthStore)
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(userName)
      console.log(password)
      const result = await login({
        userName: userName,
        password: password,
      });
      console.log(result)
      if(result.data)
      {
        const token = result.data.result.token
        localStorage.setItem("token",token)
        const user = jwtDecode(token)
        await dispatch(setLoggedInUser({
          id : user.id,
          email : user.email
        }))
        navigate("/")
      }
      if(result.error)
      {
         const errorMsg = result.error.data.errorMessages.join(",");
         alert(errorMsg)
      }
    };
    useEffect(() => {
      if(userName && password)
        setIsValid(true)
      else
       setIsValid(false)
    },[userName,password])

  return (
    <div className="container text-center">
    <form method="post" onSubmit={(e) => handleSubmit(e)} >
      <h1 className="mt-5">Login</h1>
      <div className="mt-5">
        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <Link className='nav-link' to='/register'>
                 Dont have an account? Register here
              </Link>
        </div>
      </div>

      <div className="mt-2">
        <button
          type="submit"
          className="btn btn-success"
          style={{ width: "200px" }}
          disabled = {!isValid}
        >
          Login
        </button>
      </div>
    </form>
  </div>
  )
}

export default Login
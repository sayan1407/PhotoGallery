import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "./Api/AuthApi";
import { useNavigate } from "react-router";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Link } from 'react-router';

function Register() {
  const[error,setError] = useState("")
  const[password,setPassword] = useState("")
  const[reenterPassword,setReenterPassword] = useState("")
  const[name,setName] = useState("")
  const[isValid,setIsValid] = useState(false)
  const [register] = useRegisterUserMutation();
  const navigate = useNavigate()
  useEffect(() => {
    if(password !== reenterPassword)
      setError("Re-enter password not matched")
    else
      setError("")
  },[reenterPassword,password])
  useEffect(() => {
    if(error == "" && name)
      setIsValid(true)
    else
      setIsValid(false)
    console.log(isValid)
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register({
      userName : name,
      password : password
     })
     console.log(result)
     if(result.data)
     {
       if(result.data.isSuccess)
       {
         toast.success("Registration successfull. Please login")

         navigate("/login")
       }
     }
     if(result.error)
      {
         const errorMsg = result.error.data.errorMessages.join(",");
         alert(errorMsg)
      }
  }

  return (
    <div className="container text-center">
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="userName"
             onChange={(e) => setName(e.target.value)}
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
            <input
              type="password"
              className="form-control"
              placeholder="Re-Enter Password"
              name="reEnterPassword"
              
              onChange={(e) => setReenterPassword(e.target.value)}
              required
            />
            <span className="text-danger">{error}</span>
          </div>
           <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
              <Link className='nav-link' to='/login'>
                Already have an account?Login here!!
              </Link>
           </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={!isValid}>
            Register
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default Register;

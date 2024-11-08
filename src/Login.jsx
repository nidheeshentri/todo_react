import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  }, [])
  const handleFormSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3000/user/login", data)
    .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        alert("Login successfull")
        navigate("/")
    })
    .catch((err) => {
        alert("Invalid credentials")
    })
  }

  const changeHandler = (event, field) => {
    let tempData = {...data}
    tempData[field] = event.target.value
    setData(tempData)
  }

  return (
    <>
    <h1>Login Form</h1>
    <form onSubmit = {handleFormSubmit}>
        <input type="email" name="email" id="" placeholder='email' onChange = {(event)=> changeHandler(event, "email")} />
        <input type = "password" placeholder='password' name= "password" onChange = {(event)=> changeHandler(event, "password")} />
        <input type="submit" value="Login" />
    </form>
    </>
  )
}

export default Login
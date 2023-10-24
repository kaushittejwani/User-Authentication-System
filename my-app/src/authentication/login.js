import React from 'react'
import {useState} from 'react'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function registerUser(event){
    event.preventDefault();
    const response=await fetch("http://localhost:2000/login",{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            email,password
        })
      })

      const data=await response.json()
      console.log(data)

      setEmail("");
      setPassword("");
    }
  return (

   
    <div>
      <form onSubmit={registerUser}>
        <h1>Login Form</h1>

        <label>Email</label>&nbsp;
        <input type="text" value={email}    onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'></input><br></br><br></br>

        <label>Password</label>&nbsp;
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'></input><br></br><br></br>
        <button type="submit">login</button>

        
      </form>
    </div>
  )
}

export default Login

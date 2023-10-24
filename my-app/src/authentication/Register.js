import React from 'react'
import {useState} from 'react'

const Register = () => {
const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [gender,setGender]=useState("");
  const [age,setAge]=useState("");

  async function registerUser(event){
    event.preventDefault();
    const response=await fetch("http://localhost:2000/register",{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            name,email,phone,age,gender,password
        })
      })

      const data=await response.json()
      console.log(data)
      alert("Registrerd successfully")

      setPhone("");
      setName("");
      setAge("");
      setEmail("");
      setGender("");
      setPassword("");
    }
  return (

   
    <div>
      <form onSubmit={registerUser}>
        <h1>Registeration Form</h1>
        <label>Name</label>&nbsp;
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your email'></input><br></br><br></br>

        <label>Email</label>&nbsp;
        <input type="text" value={email}    onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your name'></input><br></br><br></br>

        <label>Phone</label>&nbsp;
        <input type="text"value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your phone no'></input><br></br><br></br>

        <label>Age</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} placeholder='Enter your age'></input><br></br><br></br>

        <label>Gender</label>&nbsp;
        <input type="text"value={gender} onChange={(e)=>setGender(e.target.value)} placeholder='Enter your gender'></input><br></br><br></br>

        <label>Password</label>&nbsp;
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'></input><br></br><br></br>
        <button type="submit">Register</button>

        
      </form>
    </div>
  )
}

export default Register

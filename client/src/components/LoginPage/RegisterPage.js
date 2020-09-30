import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';


export default () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async () => {

    const response = await axios.post('/api/user', {
      name,
      email,
      password
    });
    //   console.log(response.response.data.errorMessage)
    //   setError(response.response.data.errorMessage)
    setName('');
    setEmail('');
    setPassword('');
    if(response.data.errorMessage){
        setError(response.data.errorMessage)
    } else {
        window.location = '/api/login';
    }
    
  }
  return(
    <div>
        <lable>Full Name:
      <input value={name} onChange={({ target: { value } }) => setName(value)} />
      </lable>
      <label>Email: 
      <input value={email} onChange={({ target: { value } }) => setEmail(value)} />
      </label>
      <label>Password: 
      <input value={password} onChange={({ target: { value } }) => setPassword(value)} />
      </label>
      <button onClick={onSubmit}>Sign In</button>
      {error ? <div>*{error}</div> : null}
    </div>
  )
}
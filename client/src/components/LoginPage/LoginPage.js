import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import  UserContext  from "../UserContext";
import network from '../../services/network';
import { Mix } from '../../services/AnalyticsManager';



export default () => {
  const { email, setEmail } = useContext(UserContext)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    Mix.track('App launched');
  }, [])
  const onSubmit = async () => {
    const response = await network.post('/api/login', {
      email,
      password
    });
    if (response.data && response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      window.location = '/';
    } else {
      console.log(response.response.data.errorMessage)
      setError(response.response.data.errorMessage)
      setEmail('');
      setPassword('');
    }
  }
  return(
    <div>
      <label>Email: 
      <input value={email} onChange={({ target: { value } }) => setEmail(value)} />
      </label>
      <label>Password: 
      <input value={password} onChange={({ target: { value } }) => setPassword(value)} />
      </label>
      <button onClick={onSubmit}>Login</button>
      <div> Not signed in yet? click <Link  to="/api/register">here</Link> to sign up.</div>
      {error ? <div>*{error}</div> : null}
    </div>
  )
}
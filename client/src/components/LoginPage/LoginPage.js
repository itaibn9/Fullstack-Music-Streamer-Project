import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import  { UserContext }  from "../../services/UserContext";
import network from '../../services/network';
import { Mix } from '../../services/AnalyticsManager';





function LoginPage() {
  console.log(UserContext);
  const {userName, setUsername} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    Mix.track('App launched');
  }, [])
  const onSubmit = async () => {
    const response = await network.post('/api/user/login', {
      email,
      password
    });
    console.log(response.data);
    if (response.data && response.data.success && response.data.accessToken) {
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      setUsername(response.data.name);
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
      <input value={password} placeholder="Password" type="password" onChange={({ target: { value } }) => setPassword(value)} />
      </label>
      <button onClick={onSubmit}>Login</button>
      <div> Not signed in yet? click <Link  to="/api/register">here</Link> to sign up.</div>
      {error ? <div>*{error}</div> : null}
    </div>
  )
}
export default LoginPage;
import React,{ useState, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import logo from './gitaure.png';
import './navbar.css';
import person from './person.png';
import { logout } from '../../services/index';
import UserContext from '../UserContext';
require('dotenv').config();

const notSafePassword = process.env.REACT_APP_ADMINPASSWORD;
function NavBar() {
  const [admin, setAdmin] = useState(false);
  const { userEmail } = useContext(UserContext);

  console.log(userEmail);
  const logoutFunc = async () => {
    logout();
    window.location = '/';
    
  }

  const adminValidation = () => {
   const password =  prompt('please enter the password: ');
    if(password === notSafePassword){
      setAdmin(true);
    }else{
      alert("Wrong Password")
    }
  }
  return (
    
    <nav className="navbar"> 
    <div className="navbar__container">
          <Link className="navbar__links" to="/">
              <img className="navbar__logo" src={logo} alt="music-logo"></img>
              <p>Fullstack Music Project</p>
              </Link>
                <div className="navbar__line" />
                </div>
                <div className="navbar__container">{admin ? 
                <Link className="navbar__links" to="/api/add">Add</Link> :
                <button className="navbar__links" onClick={()=> adminValidation()}>Add</button> 
                }
              <Link className="navbar__links" to="/api/search">Search</Link>
                  
                </div>
                <div className="navbar__container">
                <div className="navbar__line" />
                <button onClick={() => logoutFunc()}>Logout</button>
                <Link  className="navbar__links navbar__links--end" to="/api/profile">
                <img className="navbar__logo" src={person} alt="person-logo"></img>
              <pre>{JSON.stringify(userEmail, null, 2)}</pre>
                    </Link>
                    </div>
        </nav>
  );
}

export default NavBar;
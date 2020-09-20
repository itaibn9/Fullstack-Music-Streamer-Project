import React from 'react';
import { Link } from "react-router-dom";
import logo from './gitaure.png';
import './navbar.css';
import person from './person.png';
function NavBar() {
  return (
    <nav className="navbar"> 
    <div className="navbar__container">
          <Link className="navbar__links" to="/">
              <img className="navbar__logo" src={logo} alt="music-logo"></img>
              <p>Fullstack Music Project</p>
              </Link>
                <div className="navbar__line" />
                </div>
                <div className="navbar__container">
              <Link className="navbar__links" to="/search">Search</Link>      
                <Link  className="navbar__links" to="/add">Add</Link>
                </div>
                <div className="navbar__container">
                <div className="navbar__line" />
                <Link  className="navbar__links navbar__links--end" to="/profile">
                <img className="navbar__logo" src={person} alt="person-logo"></img>
                <p>Hello Itay</p>
                    </Link>
                    </div>
        </nav>
  );
}

export default NavBar;
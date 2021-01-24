import React,{ useState } from 'react';
import { Link } from "react-router-dom";
import './NavbarAddPage.css';
function NavbarAddPage() {
  const [admin, setAdmin] = useState(false);
  return (
    <nav className="navbarAddPage"> 
    <div className="navbarAddPage__container">
        <h1 className="navbarAddPage__links">Add: </h1>
        </div>
        <div className="navbarAddPage__container">
        <Link className="navbarAddPage__links" to="/api/add/song">Song</Link>
        </div>
        <div className="navbarAddPage__container">
        <Link className="navbarAddPage__links" to="/api/add/album">Album</Link>
        </div>
        <div className="navbarAddPage__container">
        <Link className="navbarAddPage__links" to="/api/add/artist">Artist</Link>
        </div>
        <div className="navbarAddPage__container">
        <Link className="navbarAddPage__links" to="/api/add/playlist">Playlist</Link>
        </div>
        </nav>
  );
}

export default NavbarAddPage;
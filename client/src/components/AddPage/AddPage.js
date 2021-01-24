import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NavbarAddPage from './NavbarAddPage/NavbarAddPage';
import './AddPage.css';
import AddSongPage from './AddSongPage/AddSongPage';
import AddAlbumPage from './AddAlbumPage/AddAlbumPage';
import AddArtistPage from './AddArtistPage/AddArtistPage';
import AddPlaylistPage from './AddPlaylistPage/AddPlaylistPage';
import NavBar from '../NavBar/NavBar';

function AddPage() {
  return (
    <div className="main">
        <div className="addPageNavBarStyling">
            <div className="mainNavbar">
        <NavBar />
        </div>
        <div className="secondaryNavBar">
        <NavbarAddPage />
        </div>
        </div>
    <Switch>
        <Route path="/api/add/song" render={() => <AddSongPage />}></Route>
        <Route path="/api/add/album"><AddAlbumPage /></Route>
        <Route path="/api/add/artist"><AddArtistPage /></Route>
        <Route path="/api/add/playlist"><AddPlaylistPage /></Route>  
    </Switch>
    </div>
  );
}

export default AddPage;
import React from 'react';
import './App.css';
import SongPage from './components/SongPage/SongPage';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SearchPage from './components/SearchPage/SearchPage';
import NavBar from './components/NavBar/NavBar';
import Page404 from './components/page404/Page404';
import HomePage from './components/HomePage/HomePage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import ArtistPage from './components/ArtistPage/ArtistPage';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
function App() {
  return (
    <Router >
      <NavBar />   
    <Switch>
    <Route exact={true} path="/" render={() => <HomePage />}></Route>
        <Route path="/song/:id" render={() => <SongPage />}></Route>
        <Route path="/album/:id"><AlbumPage /></Route>
        <Route path="/artist/:id"><ArtistPage /></Route>
        <Route path="/playlist/:id"><PlaylistPage /></Route> 
        <Route path="/search"><SearchPage /></Route>
        <Route render={Page404} /> 
      </Switch>
    </Router>
  );
}

export default App;

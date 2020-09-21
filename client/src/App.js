import React from 'react';
import './App.css';
import SongPage from './components/SongPage/SongPage';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SearchPage from './components/SearchPage/SearchPage';
import NavBar from './components/NavBar/NavBar';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
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
        <Route path='/404' component={NotFoundPage} />
        <Redirect from='*' to='/404' /> 
      </Switch>
    </Router>
  );
}

export default App;

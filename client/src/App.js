import React,{ useState, useMemo, useEffect } from 'react';
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
import AddPage from './components/AddPage/AddPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/RegisterPage';
import { isLogin } from './services/index';
import  UserContext  from "./services/UserContext";

// export const UserContext = React.createContext();

function App() {
  const [username ,setUsername] = useState('Guest');
  useEffect(() => {console.log(username);}, [])
  return (
    <UserContext.Provider value={{
      name: username,
      setUsername: setUsername,
    }}>
    <Router >
      {isLogin() && 
      <NavBar username={username}/> 
      }
      {isLogin() ? 
    <Switch>
    <Route exact={true} path="/" render={() => <HomePage />}></Route>
        <Route path="/api/song/:id" render={() => <SongPage />}></Route>
        <Route path="/api/album/:id"><AlbumPage /></Route>
        <Route path="/api/artist/:id"><ArtistPage /></Route>
        <Route path="/api/playlist/:id"><PlaylistPage /></Route> 
        <Route path="/api/search"><SearchPage /></Route>
        <Route path="/api/add"><AddPage /></Route>
        <Route path='/404' component={NotFoundPage} />
        {/* <Redirect from='*' to='/404' />  */}
      </Switch>
      : 
      <Switch>
      <Route exact path="/api/login">
      <LoginPage />
      </Route>
      <Route path="/api/register"><RegisterPage /></Route>
      <Redirect from='*' to='/api/login' />
      </Switch>
    }
    </Router>
    </UserContext.Provider>
  );
}

export default App;

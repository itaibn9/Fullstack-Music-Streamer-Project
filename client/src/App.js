import React,{ useContext, useEffect } from 'react';
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
import { Logged } from './services/UserContext';
import  { UserContext }  from "./services/UserContext";
import Cookies from 'js-cookie';
import network from './services/network';


// export const UserContext = React.createContext();

function App() {
  const context = useContext(UserContext);
  console.log(context);
  
  const isLoggedIn = async () => {
    if (Cookies.get('accessToken')) {
      try {
        const { data } = await network.get('/api/user/validateToken');
        const id = Cookies.get('id');
        const dataCookie = {
          id,
          email: Cookies.get('email'),
          accessToken: Cookies.get('accessToken'),
          name: Cookies.get('name'),
        };
        context.logUserIn({ ...dataCookie, ...data, success: true });
        // setLoading(false);
      } catch (e) {
        context.logUserIn({ success: false });
        // setLoading(false);
      }
    } else {
      context.logUserIn({ success: false });
      // setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <Logged.Provider value={context.success}>
    <Router >
      {context.success && 
      <NavBar /> 
      }
      {context.success ? 
    <Switch>
    <Route exact={true} path="/" render={() => <HomePage />}></Route>
        <Route path="/api/song/:id" render={() => <SongPage />}></Route>
        <Route path="/api/album/:id"><AlbumPage /></Route>
        <Route path="/api/artist/:id"><ArtistPage /></Route>
        <Route path="/api/playlist/:id"><PlaylistPage /></Route> 
        <Route path="/api/search"><SearchPage /></Route>
        <Route path="/api/add"><AddPage /></Route>
        <Route path='/404' component={NotFoundPage} />
        {/* <Redirect from='*' to='/' />  */}
      </Switch>
      : 
      <Switch>
      <Route exact path="/api/login">
      <LoginPage />
      </Route>
      <Route path="/api/register"><RegisterPage /></Route>
      {/* <Redirect from='*' to='/api/login' /> */}
      </Switch>
    }
    </Router>
    </Logged.Provider>
  );
}

export default App;

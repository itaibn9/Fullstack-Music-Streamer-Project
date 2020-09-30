import React, { useState, useEffect } from 'react';
import './AlbumPage.css';
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';
import axios from 'axios';
import { useLocation  } from "react-router-dom";
import network from '../../services/network';

function AlbumPage() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [listOfSongs, setListOfSongs] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            console.log(location);
            const { data } = await network.get(`/api/album/${location[3]}/list-of-songs`);
            console.log(data);
            setListOfSongs(data);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [location]);

    return (
        <div className="albumPage">
            <TitleBlock />
            <div className="list_of_songs">
            { listOfSongs[0]===undefined ?   <h1>No songs in the album</h1> :
            listOfSongs.map((song) => <SongRow key={`${song.Artist.name}+${song.id}`} name={song.name} length={song.length} artist={song.Artist.name}
             songID={song.id} type={location[2]} typeID={location[3]} />)  }
        </div>
        </div>
    )
}

export default AlbumPage;

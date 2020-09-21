import React, { useState, useEffect } from 'react';
import './PlaylistPage.css';
import { useLocation  } from "react-router-dom";
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';
import axios from 'axios';

function PlaylistPage() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [listOfSongs, setListOfSongs] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get(`/playlist/${location[2]}/list-of-songs`);
            console.log(data);
            setListOfSongs(data[0]);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [location]);
    return (
        <div className="playlistPage">
        <TitleBlock />
        <div className="list_of_songs">
            { listOfSongs[0]===undefined ?   <h1>No songs in the playlist</h1> :
            listOfSongs.map((song) => <SongRow name={song.name} length={song.length} artist={song.artist_name} songID={song.song_id} type={location[1]} typeID={location[2]} />)  }
        </div>
    </div>
    )
}

export default PlaylistPage;

import React, { useState, useEffect } from 'react';
import './AlbumPage.css';
import TitleBlock from '../shared_components/TitleBlock/TitleBlock';
import SongRow from '../shared_components/songRow/SongRow';
import axios from 'axios';
import { useLocation  } from "react-router-dom";

function AlbumPage() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [listOfSongs, setListOfSongs] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get(`/album/${location[2]}/list-of-songs`);
            console.log(data);
            setListOfSongs(data[0]);
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
            listOfSongs.map((song) => <SongRow name={song.name} length={song.length} artist={song.artist_name} songID={song.song_id} />)  }
        </div>
        </div>
    )
}

export default AlbumPage;

import React, {useState, useEffect} from 'react';
import Youtube from 'react-youtube';
import { useParams } from "react-router-dom";
import './SongPage.css';
import left_Logo from './left_logo.png';
import shuffle_Logo from './shuffle_logo.png';
import right_Logo from './right_logo.png';
import SongRow from '../shared_components/songRow/SongRow';
import axios from 'axios';


const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };


function SongPage() {
  const onReady = (event) => {
    event.target.pauseVideo();
  }
  let { id } = useParams();
  const [song, setSong] = useState([]);

useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`/song/${id}`);
      console.log(data);
      setSong(data[0]);
    } catch (error) {
      console.log(error);
    }
  })();
}, );


    return (
      <div className="songPage">
        <div className="songPage__song">
        <Youtube videoId={song.youtube_link} opts={opts} onReady={onReady} />
        <div className="songPage__Info">
            <div className="songPage__label">
         <span>Artist Name:</span>
        <span>{song.artist_name}</span>
         </div>
         <div className="songPage__label">
         <span>Likes:</span>
        <span>{song.likes}</span>
         </div>
         <div className="songPage__label">
         <span>uploaded At:</span>
        <span>{song.upload_at}</span>
         </div>
         <div className="songPage__label">
         <span>lyric:</span>
        <span>{song.lyric}</span>
         </div>
          </div>
        </div>
        <div className="songPage__rightBlock">
          <div className="songPage__control">
              <button><img className="control__logo" src={left_Logo} alt="previous_song" /></button>
              <button><img className="control__logo" src={shuffle_Logo} alt="previous_song" /></button>
              <button><img className="control__logo" src={right_Logo} alt="previous_song" /></button>
          </div>
         <SongRow />
        </div>
      </div>
    );
  }
  
  export default SongPage;
  
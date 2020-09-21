import React, {useState, useEffect} from 'react';
import Youtube from 'react-youtube';
import { useParams, useLocation } from "react-router-dom";
import './SongPage.css';
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
  const [location, setLocation] = useState(useLocation());
  const [song, setSong] = useState([]);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const onReady = (event) => {
    event.target.pauseVideo();
  }
  const { id } = useParams();


useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`/song/${id}`);
      if(location.search!==""){
         const  type = location.search.split('?')[1].split('=');
           const  moreSongs  =  await axios.get(`/${type[0]}/${type[1]}/list-of-songs`);
            console.log(moreSongs.data);
            setRelatedSongs(moreSongs.data[0])
      }
      setSong(data[0]);
    } catch (error) {
      console.log(error);
    }
  })();
}, [refreshPage]);

const refresh = () => {
  refreshPage ? setRefreshPage(false) : setRefreshPage(true);
};


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
        { relatedSongs[0]===undefined ?   <h1>No songs related to this song</h1> :
            relatedSongs.map((song) =>
            <SongRow key={song.name} name={song.name} length={song.length} artist={song.artist_name}
             songID={song.song_id} type={location.search.split('?')[1].split('=')[0]} typeID={location.search.split('?')[1].split('=')[1]} refresh={refresh} />)  }
        </div>
      </div>
    );
  }
  
  export default SongPage;
  
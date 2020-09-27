import React, {useState, useEffect} from 'react';
import Youtube from 'react-youtube';
import { useParams, useLocation } from "react-router-dom";
import './SongPage.css';
import SongRow from '../shared_components/songRow/SongRow';
import axios from 'axios';
import like_logo from '../shared_components/songRow/like_logo.png';


const opts = {
    height: '390',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };


function SongPage() {
  const [location, setLocation] = useState(useLocation());
  const [song, setSong] = useState([]);
  const [uploadedDate, setUploadedDate] = useState();
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [artistName, setArtistName] = useState()
  const onReady = (event) => {
    event.target.pauseVideo();
  }
  const { id } = useParams();

useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`/api/song/${id}`);
      if(location.search!==""){
         const  type = location.search.split('?')[1].split('=');
           const  moreSongs  =  await axios.get(`/api/${type[0]}/${type[1]}/list-of-songs`);
            setRelatedSongs(moreSongs.data)
      }
      const fullDate = new Date(data[0].createdAt).getFullYear() +
      "-" +  new Date(data[0].createdAt).getMonth() + "-" +
      new Date(data[0].createdAt).getDay();
      setUploadedDate(fullDate)
      setArtistName(data[0].Artist.name);
      setSong(data[0]);
    } catch (error) {
      console.log(error);
    }
  })();
}, [refreshPage]);

const onLike = async() => {
try {
  await axios.post(`/api/song_likes`, {
    "user_id": 1,
    "song_id": parseInt(location.pathname.split("/")[3])
  })
} catch (error) {
  console.log(error)
}
}

const refresh = () => {
  refreshPage ? setRefreshPage(false) : setRefreshPage(true);
};

    return (
      <div className="songPage">
        <div className="songPage__song">
        <Youtube videoId={song.youtubeLink} opts={opts} onReady={onReady} />
        <div className="songPage__Info">
        <div className="songPage__label">
         <span>Song Name:</span>
        <span>{song.song_name}</span>
         </div>
            <div className="songPage__label">
         <span>Artist Name:</span>
        <span>{artistName}</span>
         </div>
         <div className="songPage__label">
         <span>Likes:</span>
        <span>{song.likes}</span>
         </div>
         <div className="songPage__label">
         <span>uploaded At:</span>
        <span>{uploadedDate}</span>
         </div>
         <div className="songPage__label">
         <button className="lyricButton" onClick={()=> alert(song.lyric)}>
           <span>Lyrics</span>
           </button>
         </div>
         <div className="songPage__label">
            <button onClick={onLike}><img className="control__logo" src={like_logo} alt="like" /></button>
            </div>
          </div>
        </div>
        <div className="songPage__rightBlock">
          <h2 className="relatedSongHeader">Related Songs</h2>
        { relatedSongs[0]===undefined ? <h1 className="relatedSongHeader">No songs related to this song</h1> :
            relatedSongs.map((song) =>
            <SongRow key={song.name} name={song.name} length={song.length} artist={song.Artist.artist_name}
             songID={song.id} type={location.search.split('?')[1].split('=')[0]}
              typeID={location.search.split('?')[1].split('=')[1]} refresh={refresh} />)  }
        </div>
      </div>
    );
  }
  
  export default SongPage;
  
import React, {useState, useEffect} from 'react';
import Youtube from 'react-youtube';
import { useParams, useLocation } from "react-router-dom";
import './SongPage.css';
import SongRow from '../shared_components/songRow/SongRow';
import like_logo from '../shared_components/songRow/like_logo.png';
import disLike_logo from '../shared_components/TitleBlock/dislike.png';
import network from '../../services/network';
import { Mix } from '../../services/AnalyticsManager';

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
  const [sumlikes, setSumLikes] = useState();
  const [likeButton, setLikeButton] = useState(like_logo);
  useEffect(() => {
    Mix.track('Play Song');
  }, [])
  const onReady = (event) => {
    event.target.pauseVideo();
  }
  const { id } = useParams();

useEffect(() => {
  (async () => {
    try {
      console.log(location.pathname.split("/"));
      const { data } = await network.get(`/api/song/${id}`);
      const  didlike = await network.get(`/api/${location.pathname.split("/")[2]}_likes/1/${location.pathname.split("/")[3]}`);
            if(didlike.data.length > 0 && likeButton === like_logo){
              setLikeButton(disLike_logo);
            }; 
      if(location.search!==""){
         const  type = location.search.split('?')[1].split('=');
           const  moreSongs  =  await network.get(`/api/${type[0]}/${type[1]}/list-of-songs`);
            setRelatedSongs(moreSongs.data)
      }
      const countlikes = await network.get(`/api/song/${id}/count-likes`);
      console.log(countlikes);
      setSumLikes(countlikes.data[0].countLikes);
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
  if(likeButton === like_logo){
    try {
      await network.post(`/api/song_likes`, {
        "user_id": 1,
        "song_id": parseInt(location.pathname.split("/")[3])
      })
      Mix.track('Like Song');
      setLikeButton(disLike_logo);
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      await network.delete(`/api/song_likes/1/${location.pathname.split("/")[3]}`)
      setLikeButton(like_logo);
    } catch (error) {
      console.log(error);
    }
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
        <span>{sumlikes}</span>
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
            <button onClick={onLike}><img className="control__logo" src={likeButton} alt="like" /></button>
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
  
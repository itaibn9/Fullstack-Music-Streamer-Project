import React, { useState, useEffect } from 'react';
import './TitleBlock.css';
import like_logo from '../songRow/like_logo.png';
import disLike_logo from './dislike.png';
import { useLocation  } from "react-router-dom";
import network from '../../../services/network';
import { Mix } from '../../../services/AnalyticsManager';


function TitleBlock() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [titleData, setTitleData] = useState([]);
    const [artistName, setArtistName] = useState();
    const [createdYear, setCreatedYear] = useState();
    const [sumLike, setSumLikes] = useState();
    const [likeButton, setLikeButton] = useState(like_logo);
    const onLike = async () => {
      if(likeButton === like_logo){
        try {
          switch(location[2]) {
            case "artist":
              await network.post(`/api/artist_likes`, {
                  "user_id": 1,
                  "artist_id": parseInt(location[3])
                })
                Mix.track('Like Artist');
                setLikeButton(disLike_logo);
              break;
            case "playlist":
              await network.post(`/api/playlist_likes`, {
                "user_id": 1,
                "playlist_id": parseInt(location[3])
              })
              Mix.track('Like Playlist');
              setLikeButton(disLike_logo);
              break;
            case "album":
              await network.post(`/api/album_likes`, {
                "user_id": 1,
                "album_id": parseInt(location[3])
              })
              Mix.track('Like Album');
              setLikeButton(disLike_logo);
              break;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          switch(location[2]) {
            case "artist":
              await network.delete(`/api/artist_likes/1/${location[3]}`)
              setLikeButton(like_logo);
              break;
            case "playlist":
              await network.delete(`/api/playlist_likes/1/${location[3]}`)
              setLikeButton(like_logo);
              break;
            case "album":
              await network.delete(`/api/album_likes/1/${location[3]}`)
              setLikeButton(like_logo);
              break;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    useEffect(() => {
        (async () => {
          try {
            const { data } = await network.get(`/api/${location[2]}/${location[3]}`);
            setTitleData(data[0]);
            setCreatedYear(new Date(data[0].created_at).getFullYear())
            const countLikes = await network.get(`/api/${location[2]}/${location[3]}/count-likes`)
            setSumLikes(countLikes.data[0].countLikes);
            const  didlike = await network.get(`/api/${location[2]}_likes/1/${location[3]}`);
            if(didlike.data.length > 0 && likeButton === like_logo){
              setLikeButton(disLike_logo);
            }; 
            if(location[2]==='album'){
              setArtistName(data[0].Artist.name)
            };
          } catch (error) {
            console.log(error);
          }
        })();
      }, [location, likeButton]);
    return (
        <div className="titleBlock">
            <img className="cover_img" src={titleData.cover_img} alt="wallpaper" />
            <div className="title_info">
                <div> {location[2]} Name: {titleData.name}</div>
                <div>{location[2]==="album" ? "Artist Name: " + artistName : titleData.created_at ? "Created At: " + createdYear : null}</div>
                <div> Likes: {sumLike}</div>
            </div>
            <div className="control_links">
            <button onClick={onLike}><img className="control__logo" src={likeButton} alt="like" /></button>
            </div>
        </div>
    )
}

export default React.memo(TitleBlock);

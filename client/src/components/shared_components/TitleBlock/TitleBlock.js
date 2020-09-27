import React, { useState, useEffect } from 'react';
import './TitleBlock.css';
import like_logo from '../songRow/like_logo.png';
import { useLocation  } from "react-router-dom";
import axios from 'axios';




function TitleBlock() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [titleData, setTitleData] = useState([]);
    const [artistName, setArtistName] = useState();
    const [createdYear, setCreatedYear] = useState();

    const onLike = async () => {
      try {
        switch(location[2]) {
          case "artist":
            await axios.post(`/api/artist_likes`, {
                "user_id": 1,
                "artist_id": parseInt(location[3])
              })
            break;
          case "playlist":
            await axios.post(`/api/playlist_likes`, {
              "user_id": 1,
              "playlist_id": parseInt(location[3])
            })
            break;
          case "album":
            await axios.post(`/api/album_likes`, {
              "user_id": 1,
              "album_id": parseInt(location[3])
            })
            break;
          case "song":
            await axios.post(`/api/song_likes`, {
              "user_id": 1,
              "song_id": parseInt(location[3])
            })
          break;
        }
      } catch (error) {
        console.log(error);
      }
      
      // const typeOfIdable = `${location[2]}_id`;
      // const body = {
      //   "user_id": 1,
      //   typeOfIdable: parseInt(location[3])
      // };
      // const tableLike = JSON.stringify(typeOfIdable);
      // const LikeTo_id =  parseInt(location[3]);
      // console.log(tableLike);
      // console.log(LikeTo_id );
      // await axios.post(`/api/${location[2]}_likes`, {
      //   "user_id": 1,
      //   tableLike: LikeTo_id
      // })
    }

    useEffect(() => {
        (async () => {
          try {
            console.log(location)
            const { data } = await axios.get(`/api/${location[2]}/${location[3]}`);
            console.log(data);
            if(location[2]==='album'){setArtistName(data[0].Artist.name)}
            setCreatedYear(new Date(data[0].created_at).getFullYear())
            setTitleData(data[0]);
          } catch (error) {
            console.log(error);
          }
        })();
      }, [location]);
    return (
        <div className="titleBlock">
            <img className="cover_img" src={titleData.cover_img} alt="wallpaper" />
            <div className="title_info">
                <div> {location[2]} Name: {titleData.name}</div>
                <div>{location[2]==="album" ? "Artist Name: " + artistName : titleData.created_at ? "Created At: " + createdYear : null}</div>
            </div>
            <div className="control_links">
            <button onClick={onLike}><img className="control__logo" src={like_logo} alt="like" /></button>
            </div>
        </div>
    )
}

export default TitleBlock;

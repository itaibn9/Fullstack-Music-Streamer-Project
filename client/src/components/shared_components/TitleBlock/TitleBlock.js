import React, { useState, useEffect } from 'react';
import './TitleBlock.css';
// import like_logo from '../songRow/like_logo.png';
import { useLocation  } from "react-router-dom";
import axios from 'axios';




function TitleBlock() {
    const [location, setLocation] = useState(useLocation().pathname.split('/'));
    const [titleData, setTitleData] = useState([]);
    const [artistName, setArtistName] = useState();
    const [createdYear, setCreatedYear] = useState();
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
            {/* <div className="control_links">
            <Link to={`/song/${location[2]}`}>
                <button>Play</button>
            </Link>
            <button><img className="control__logo" src={like_logo} alt="like" /></button>
            </div> */}
        </div>
    )
}

export default TitleBlock;

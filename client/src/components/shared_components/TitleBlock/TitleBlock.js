import React, { useState, useEffect } from 'react';
import './TitleBlock.css';
import like_logo from '../songRow/like_logo.png';
import { Link, useRouteMatch, useLocation, useHistory, useParams  } from "react-router-dom";
import axios from 'axios';




function TitleBlock() {
    let location = useLocation();
    location = location.pathname.split('/');
    const [titleData, setTitleData] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get(`/${location[1]}/${location[2]}`);
            console.log(data);
            setTitleData(data[0][0]);
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);
      console.log(titleData);
    return (
        <div className="titleBlock">
            <img className="cover_img" src={titleData.cover_img} />
            <div className="title_info">
                <div> {location[1]} Name: {titleData.name}</div>
                <div>{titleData.created_at ? "Created At: " + titleData.created_at :  titleData.artist_name ? "Artist Name: " +  titleData.artist_name : null}</div>
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

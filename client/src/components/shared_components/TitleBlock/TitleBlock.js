import React from 'react';
import './TitleBlock.css';
import albumImg from './album_img.png';
import like_logo from '../songRow/like_logo.png';
import { Link, useRouteMatch } from "react-router-dom";

const albumDetials = {
    id: '1',
    name:'Dark side of the moon',
    youtubeLink: '944y9HlLmqw',
    artist_name: 'eminem',
    songs:'13',
    uploaded_at:"2002-05-17",
    length: "1 Hour ,15 minutes"
};



function TitleBlock() {
    let match = useRouteMatch();
    return (
        <div className="titleBlock">
            <img className="album_img" src={albumImg} alt="album image" />
            <div className="album_info">
                <p>{albumDetials.name} - {albumDetials.uploaded_at}
                <br></br>
                {albumDetials.songs} - {albumDetials.length}
                </p>
            </div>
            <div className="control_links">
            <Link to={`/song/${albumDetials.youtubeLink}?${match.url}=${albumDetials.id}`}>
                <button>Play</button>
            </Link>
            <button><img className="control__logo" src={like_logo} alt="like" /></button>
            </div>
        </div>
    )
}

export default TitleBlock;

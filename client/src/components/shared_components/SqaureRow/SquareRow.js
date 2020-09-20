import React, { Component ,useState } from 'react'
import albumImg from '../TitleBlock/album_img.png';
import Carousel from 'react-elastic-carousel';

function SquareRow() {

    return (
        <Carousel  itemsToScroll={4} itemsToShow={4}>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            <div><img className="album_img" src={albumImg} alt="album image" /></div>
            </Carousel>
    )
}

export default SquareRow;

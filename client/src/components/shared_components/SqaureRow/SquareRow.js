import React, { Component ,useState, useEffect } from 'react'
import albumImg from '../TitleBlock/album_img.png';
import Carousel from 'react-elastic-carousel';
import { Link } from "react-router-dom";
import axios from 'axios';

function SquareRow({table, page}) {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get(`/top/${table}`);
            console.log(data);
            setDetails(data);
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);

    return (
        <Carousel  itemsToScroll={4} itemsToShow={4}>
            {details.map((item) => <Link className="topLink" to={`/${page}/${item.id}`}><img className="square_img" src={item.cover_img} alt={`${table}`} /></Link> )}
            </Carousel>
    )
}

export default SquareRow;

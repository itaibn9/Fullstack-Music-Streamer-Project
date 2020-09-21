import React, { useState, useEffect } from 'react'
import Carousel from 'react-elastic-carousel';
import { Link ,useLocation } from "react-router-dom";
import axios from 'axios';
import './SquareRow.css';

function SquareRow({table, page}) {
  const [location, setLocation] = useState(useLocation().pathname.split('/'));
  const [details, setDetails] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            if(location[1]==='artist'){
              const { data } = await axios.get(`/${location[1]}/${location[2]}/list-of-albums`);
              console.log(data);
              setDetails(data[0])
            } else {
              const { data } = await axios.get(`/top/${table}`);
              console.log(data);
              setDetails(data);
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, []);

    return (
      <div className="SquareRow">
        <Carousel  itemsToScroll={4} itemsToShow={4}>
            {details.map((item) => <Link key={item.id} className="topLink" to={`/${page}/${item.id}`}><img className="square_img" src={item.cover_img} alt={`${table}`} /></Link> )}
            </Carousel>
            </div>
    )
}

export default SquareRow;

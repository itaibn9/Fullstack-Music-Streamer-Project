import React, { useState, useEffect } from 'react'
import Carousel from 'react-elastic-carousel';
import { Link ,useLocation } from "react-router-dom";
import axios from 'axios';
import './SquareRow.css';

function SquareRow({table, page, searchBy}) {
  const [location, setLocation] = useState(useLocation().pathname.split('/'));
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  if(searchBy!==undefined&&searchBy!==""&&searchBy!==searchQuery) setSearchQuery(searchBy);

    useEffect(() => {
        (async () => {
          try {
            if(location[1]==='artist'){
              const { data } = await axios.get(`/${location[1]}/${location[2]}/list-of-albums`);
              console.log(data);
              setDetails(data[0])
            } else if(searchQuery!==undefined&&searchBy!==""){
              console.log("fafdfadfafdsf");
              const { data } = await axios.get(`/search/${table}/${searchQuery}`);
              setDetails(data);
            } else {
              console.log(searchBy);
              const { data } = await axios.get(`/top/${table}`);
              console.log(data);
              setDetails(data);
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, [searchQuery]);

    return (
      <div className="SquareRow">
        <Carousel  itemsToScroll={4} itemsToShow={4}>
            {details.map((item) => <Link key={item.name+"-"+item.id} className="topLink" to={`/${page}/${item.id}`}>
              <img className="square_img" src={item.cover_img} alt={`${table}`} />
              <p>{item.name}</p></Link>)}
            </Carousel>
            </div>
    )
}

export default SquareRow;

import React, { useState, useEffect } from 'react'
import Carousel from 'react-elastic-carousel';
import { Link ,useLocation } from "react-router-dom";
import './SquareRow.css';
import network from '../../../services/network';

function SquareRow({table, page, searchBy}) {
  const [location, setLocation] = useState(useLocation().pathname.split('/'));
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [letterCounter, setLetterCounter] = useState(0);
  if(searchBy!==undefined&&searchBy!==""&&searchBy!==searchQuery){
    setSearchQuery(searchBy);
  } else if(letterCounter!==0&&searchBy===searchQuery) {
    setSearchQuery();
    setLetterCounter(0);
  }

    useEffect(() => {
        (async () => {
          try {
            console.log(location[3]);
            if(location[2]==='artist'){
              const {data} = await network.get(`/api/${table}/${location[3]}/list-of-albums`);
              console.log(data[0]);
              setDetails(data)
            } else if(searchQuery!==undefined&&searchBy!==""){
              console.log(`------------------------------${table}---------------------------${searchQuery}-----`)
              const { data } = await network.get(`/api/${table}/search/${searchQuery}`);
              console.log(data);
              setDetails(data);
              setLetterCounter(1)
            } else {
              const { data } = await network.get(`/api/${table}/top/`);
              setDetails(data);
              console.log(`${table}`, data);
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }, [searchQuery]);

    return (
      <div className="SquareRow">
        <Carousel  itemsToScroll={4} itemsToShow={4}>
            {details.map((item) => <Link key={item.name+"-"+item.id} className="topLink" to={`/api/${page}/${item.id}`}>
              <img className="square_img" src={item.cover_img} alt={`${table}`} />
    {location[2]==='artist'? <p>{item.Artist.name}</p> : <p>{item.name}</p>}</Link>)}
            </Carousel>
            </div>
    )
}

export default React.memo(SquareRow);

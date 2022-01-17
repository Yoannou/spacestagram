import React, { useEffect, useState } from 'react'
import { APIKEY, EPICDATES } from '../../constants.js'
import * as dates from '../../epic-all-dates.json';
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

function PostsEarth({hidden}) {

  let earthData = [];
  let earthDataHolder = [];
  const [currentDate, setCurrentDate] = useState(10);
  const [earthDataLength, setEarthDataLength] = useState(0);
  const [earthDisplayedData, setEarthDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);

  function pullDates() {
    fetch("../../epic-all-dates.json")
    .then ((res) => res.json())
    .then ((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function parseJ() {
    console.log(JSON.parse(dates));
  }

  // Refresh the page to render more images:
  useEffect(() => {
    console.log(dates);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://api.nasa.gov/EPIC/api/natural/date/" + EPICDATES[currentDate].date + "?api_key=" + APIKEY, { signal: signal })
    .then((res) => res.json())
    .then((res) => {
      getEarthData(res, res.length);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("successfully aborted");
      } else {
        console.log(err);
      }
      });
    return () => {
      controller.abort();
    }
  },
  [currentDate]);

  // Pass retreived Earth data to the earthData array:
  async function getEarthData(incomingData, dataLength) {
    setEarthDataLength(dataLength);
    if(dataLength < 1){
      console.log("No data");
    }
    else {
      earthData = [...earthData, ...incomingData];
      if(imagesRendered > dataLength){
        setImagesRendered(dataLength);
      }
      else {
        displayEarthData();
      }
    }
  }

  // Load a subset of Earth data to display on screen using the earthDisplayedData array:
  async function displayEarthData() {
    earthDataHolder = [];
    for (let i=0; i<earthData.length; i++) {
      earthDataHolder.push(earthData[i]);
    }
    setEarthDisplayedData(earthDataHolder);
  }

  // Load in images from the next available earth date:
  async function loadMore() {
    setCurrentDate(currentDate + 1);
    console.log(EPICDATES[currentDate].date)
  }

  return (
    <div className={"posts-container " + hidden}>
      {earthDisplayedData.map((data, i) => (
        //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
        <Post planet="earth" image={"https:api.nasa.gov/EPIC/archive/natural/" + (data.identifier).substring(0,4) + "/"
        + (data.identifier).substring(4,6) + "/" + (data.identifier).substring(6,8) + "/png/" + data.image
        + ".png?api_key=" + APIKEY} heading={data.caption} date={data.date} description="" key={data.identifier}/>
      ))}
      { (imagesRendered < earthDataLength) && <LoadingZone action={loadMore} /> }
    </div>
  )
}

export default PostsEarth

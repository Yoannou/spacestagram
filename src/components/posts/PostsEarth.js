import React, { useEffect, useState } from 'react'
import { APIKEY, EPICDATES } from '../../constants.js'
import * as dates from '../../epic-all-dates.json';
import EarthInput from '../user-input/EarthInput.js'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

function PostsEarth({hidden}) {

  let earthData = [];
  let earthDataHolder = [];
  const [currentDate, setCurrentDate] = useState(EPICDATES.length-3);
  const [earthDataLength, setEarthDataLength] = useState(0);
  const [earthDisplayedData, setEarthDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);


  // Pull data for the current requested date whenever it changes:
  useEffect(() => {
    console.log(currentDate);
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

  // Display retreived earth data on screen for the selected date:
  function getEarthData(incomingData, dataLength) {
    setEarthDisplayedData(incomingData);
  }

  // This algorithm for searching a date definitely needs to be cleaned up, but it works:
  function searchDate(year, month){
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    const result = EPICDATES.filter((data)=> {
      return data.date.slice(0, 7) == (year + "-" + month);
    })
    console.log(result);
    if(result.length > 0) {
      const comparison = (result[result.length-1].date);
      for (let i = 0; i < EPICDATES.length; i++) {
        if (EPICDATES[i].date == comparison) {
          setCurrentDate(i);
        }
      }
    }
    else {
      console.log("NO DATES");
    }
  }

  // Load in images from the next available earth date:
  async function loadMore() {
    window.scroll(0, 0);
    if (currentDate > 0) {
      setCurrentDate(currentDate - 1);
    }
  }

  return (
    <div className={"posts-container " + hidden}>
      <EarthInput onSubmit={searchDate}/>
      {earthDisplayedData.map((data, i) => (
        <Post planet="earth" image={"https://api.nasa.gov/EPIC/archive/natural/" + (data.identifier).substring(0,4) + "/"
        + (data.identifier).substring(4,6) + "/" + (data.identifier).substring(6,8) + "/png/" + data.image
        + ".png?api_key=" + APIKEY} heading={""} date={data.date} description="" key={data.identifier}/>
      ))}
      { currentDate == "nil" && 
      <div className="no-images">No images exist for this date.</div>}
      <LoadingZone action={loadMore} />
    </div>
  )
}

export default PostsEarth
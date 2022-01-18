import React, { useEffect, useState } from 'react'
import { APIKEY, EPICDATES } from '../../constants.js'
import EarthInput from '../user-input/EarthInput.js'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

function PostsEarth({hidden}) {

  const [currentDate, setCurrentDate] = useState(EPICDATES.length-3);
  const [earthDisplayedData, setEarthDisplayedData] = useState([]);


  // Pull data for the current requested date whenever it changes:
  useEffect(() => {
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

  // Display retreived Earth data on screen for the selected date:
  function getEarthData(incomingData, dataLength) {
    setEarthDisplayedData(incomingData);
  }

  // This algorithm for searching a date definitely needs to be cleaned up, but it works.
  // Makes two passes through the EPICDATES object:
  function searchDate(year, month){
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    const result = EPICDATES.filter((data)=> {
      return data.date.slice(0, 7) === (year + "-" + month);
    })
    if(result.length > 0) {
      const comparison = (result[result.length-1].date);
      for (let i = 0; i < EPICDATES.length; i++) {
        if (EPICDATES[i].date === comparison) {
          setCurrentDate(i);
        }
      }
    }
    else {
      console.log("No images on date of query for: " + year + "-" + month);
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
      { currentDate === "nil" && 
      <div className="no-images">No images exist for this date.</div>}
      <LoadingZone action={loadMore} />
    </div>
  )
}

export default PostsEarth
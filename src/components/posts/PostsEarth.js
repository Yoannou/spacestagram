import React, { useEffect, useState } from 'react'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

function PostsEarth({hidden}) {


  const APIKey = "Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG";
  let earthData = [];
  let earthDataHolder = [];
  const [dateList, setDateList] = useState([]);
  const [currentDate, setCurrentDate] = useState("2022-01-15");
  const [earthDataLength, setEarthDataLength] = useState(0);
  const [earthDisplayedData, setEarthDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);


  // Pull in a list of all dates for which images exist on this API:
  useEffect(()=>{
    fetch("https://epic.gsfc.nasa.gov/api/natural/all?api_key=" + APIKey)
    .then((res) => res.json())
    .then((res) => {
      setDateList(res);
    })
    .catch((err) => {
      console.log("Error: " + err);
    })
  }, 
  []);

  // Refresh the page to render more images:
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://api.nasa.gov/EPIC/api/natural/date/2022-01-15?api_key=" + APIKey, { signal: signal })
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
  [dateList]);

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
    for (let i=0; i<imagesRendered; i++) {
      earthDataHolder.push(earthData[i]);
    }
    setEarthDisplayedData(earthDataHolder);
  }

  // Load 6 more images to page:
  async function loadMore() {
    console.log(dateList[0].date)
    setImagesRendered(imagesRendered => imagesRendered + 6);
  }

  return (
    <div className={"posts-container " + hidden}>
      {earthDisplayedData.map((data, i) => (
        //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
        <Post planet="earth" image={"https:api.nasa.gov/EPIC/archive/natural/" + (data.identifier).substring(0,4) + "/"
        + (data.identifier).substring(4,6) + "/" + (data.identifier).substring(6,8) + "/png/" + data.image
        + ".png?api_key=" + APIKey} heading={data.caption} date={data.date} description="" key={data.identifier}/>
      ))}
      { (imagesRendered < earthDataLength) && <LoadingZone action={loadMore} /> }
    </div>
  )
}

export default PostsEarth

import React, { useEffect, useState } from 'react'
import MarsInput from '../user-input/MarsInput.js'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

function PostsMars({hidden}) {

  // getMarsData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG");
  const APIKey = "Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG";
  const [sol, setSol] = useState(3356);
  const [rover, setRover] = useState("curiosity");
  let marsData = [];
  let marsDataHolder = [];
  const [marsDataLength, setMarsDataLength] = useState(0);
  const [marsDisplayedData, setMarsDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);

  // Whenever the sol incremenets or the imagesRendered increases, we pull fresh data for current sol:
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&api_key=" + APIKey, { signal: signal })
    .then((res) => res.json())
    .then((res) => {
      getMarsData(res, res.photos.length);
    })
    .catch((err)=>{
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
  [sol, rover, imagesRendered]);

  // Pass retreived Mars data to our marsData array:
  async function getMarsData(incomingData, dataLength) {
    setMarsDataLength(dataLength);
    if(incomingData.photos.length < 1){
      setSol();
    }
    else {
      marsData = [...marsData, ...incomingData.photos];
      if (imagesRendered > dataLength) {
        setImagesRendered(dataLength);
      }
      else {
        displayMarsData();
      }
    }
  }

  // Load a subset of Mars data to display on screen using the marsDisplayedData array:
  async function displayMarsData() {
    marsDataHolder = [];
    for (let i=0; i<imagesRendered; i++) {
      marsDataHolder.push(marsData[i]);
    }
    setMarsDisplayedData(marsDataHolder);
  }

  // Load 6 more images to page:
  function loadMore() {
    setImagesRendered(imagesRendered => imagesRendered + 6);
  }

  function roverChange(roverName) {
    setRover(roverName);
  }


  return (
    <div className={"posts-container " + hidden}>
      <MarsInput sol={sol} maxSol={3356} onRoverChange={roverChange} onSolChange={0}/>
      {marsDisplayedData.map((data, i) => (
        <Post planet={"mars"} image={data.img_src} heading={data.rover.name + " Rover: " + data.camera.full_name} date={data.earth_date} description="" key={data.id}/>
      ))}
      { (imagesRendered < marsDataLength) && <LoadingZone action={loadMore}/> }
    </div>
  )
}

export default PostsMars

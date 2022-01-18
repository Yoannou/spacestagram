import React, { useEffect, useState } from 'react'
import { APIKEY } from '../../constants.js'
import MarsInput from '../user-input/MarsInput.js'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'
import './PostsMars.css'

function PostsMars({hidden}) {

  const [rover, setRover] = useState("spirit");
  const [sol, setSol] = useState(1);
  let marsData = [];
  let marsDataHolder = [];
  const [marsDataLength, setMarsDataLength] = useState(0);
  const [marsDisplayedData, setMarsDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);
  

  // Whenever the rover or sol changes, or we want to render more images, we pull fresh data:
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&api_key=" + APIKEY, { signal: signal })
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
      setSol(sol);
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

  // Fired on user input when selecting a different rover
  function roverChange(roverName) {
    setRover(roverName);
  }

  // Fired on user input when selecting a different sol
  function solChange(newSol) {
    setSol(newSol);
  }

  return (
    <div className={"posts-container " + hidden}>
      <MarsInput sol={sol} onRoverChange={roverChange} onSolChange={solChange}/>
      <div className="photo-summary">{"Getting images from the " + rover.charAt(0).toUpperCase() + rover.slice(1) + " rover on sol " + sol + ":"}</div>
      { marsDataLength > 0 && 
      marsDisplayedData.map((data, i) => (
        <Post planet={"mars"} image={data.img_src} heading={data.rover.name + " Rover: " + data.camera.full_name} date={data.earth_date} description="" id={data.id} key={data.id}/>
      ))}
      { marsDataLength <= 0 && 
      <div className="no-images">No images exist for selected rover on this sol.</div>}
      { imagesRendered < marsDataLength && <LoadingZone action={loadMore}/> }
    </div>
  )
}

export default PostsMars

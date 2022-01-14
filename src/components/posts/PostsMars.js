import React, { useEffect, useState } from 'react'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

/*
The function below is where an array containing all posts will be generated from the API.
*/

function PostsMars({hidden}) {

  //    getMarsData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG");

  const APIKey = "Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG";
  const [sol, setSol] = useState(3349);
  let marsData = [];
  let marsDataHolder = [];
  const [marsDisplayedData, setMarsDisplayedData] = useState([]);
  // let imagesRendered = 6;
  const [imagesRendered, setImagesRendered] = useState(6);

  // Whenever the sol increments, we pull data from the new sol:
  useEffect(() => {
    getMarsData();
  },
  [sol])

  async function nextSol() {
      await setSol((sol => sol-1));
      console.log(sol);
  }

  // Retrieve raw Mars data from the NASA API
  async function fetchMarsData() {
    try {
      const res = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&api_key=" + APIKey);
      const data = await res.json();
      const results = data.photos;
      return data;
    }
    catch(err) {
      console.log("ERROR retrieving Mars data from NASA server: " + err);
    }
  }

  // Pass retreived Mars data to our marsData array:
  async function getMarsData() {
    const incomingData = await fetchMarsData();
    if(incomingData.photos.length < 1){
      setSol();
    }
    else {
      marsData = [...marsData, ...incomingData.photos];
      displayMarsData();
    }
  }

  // Load a subset of Mars data to display on screen using the marsDisplayedData array:
  async function displayMarsData() {
    console.log(marsData.length);
    marsDataHolder = [];
    for (let i=0; i<imagesRendered; i++) {
      console.log(marsData[i]);
      marsDataHolder.push(marsData[i]);
    }
    setMarsDisplayedData(marsDataHolder);
  }

  // Clear all images from the screen:
  async function clearMarsData() {
    const update = await setImagesRendered(0);
    setMarsDisplayedData([]);
  }

  // Load 6 more images to page:
  async function loadMore() {
    const update = await setImagesRendered(imagesRendered => imagesRendered + 6);
    console.log(imagesRendered)
    getMarsData();
  }


  return (
    <div className={"posts-container " + hidden}>
      {marsDisplayedData.map((data, i) => (
        <Post planet={"mars"} image={data.img_src} heading={data.rover.name + " Rover: " + data.camera.full_name} date={data.earth_date} description="" key={data.id}/>
      ))}
      <LoadingZone action={loadMore}/>
    </div>
  )
}



export default PostsMars

  /* OLD ( NO SOL )
  // Fetch data when this component first renders
  useEffect(()=>{
    getMarsData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=");
  },
  // Empty dependency array so that this only runs on first render:
  []);

  async function getMarsData(query) {
    const incomingData = await fetchMarsData(query);
    setMarsData([...marsData, ...incomingData.photos]);
  }

  async function fetchMarsData(source) {
    try {
      const res = await fetch(source + APIKey);
      const data = await res.json();
      const results = data.photos;
      return data;
    }
    catch(err) {
      console.log("ERROR retrieving Mars data from NASA server: " + err);
    }
  }
  */

  // ON-SCROLL
  /* Check if we are near bottom
  /* If so: if new page has content, add,
  /* If it does not, look for next page, add
  /* Try putting bottom-margin on both the POSTS div and the CONTAINER, this may effect where we snap to
  */

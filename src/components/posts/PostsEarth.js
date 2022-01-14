import React, { useEffect, useState } from 'react'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

/*
The function below is where an array containing all posts will be generated from the API.
Each element in the array will be an object representing a post.
Loop through the array in the JSX and create a post object for each element.
Use MAP to generate a post from each object in the result
*/

function PostsEarth({hidden}) {

  const APIKey = "Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG";
  let earthData = [];
  let earthDataHolder = [];
  const [earthDisplayedData, setEarthDisplayedData] = useState([]);
  const [imagesRendered, setImagesRendered] = useState(6);

  // Initial data pull:
  useEffect(() => {
    getEarthData();
  },
  [])

  // Display new data whenever imagesRendered is updated:
  useEffect (()=> {
    displayEarthData();
  },
  [imagesRendered])

  // Retrieve raw Earth data from the NASA API
  async function fetchEarthData() {
    try {
      const res = await fetch("https://api.nasa.gov/EPIC/api/natural?api_key=" + APIKey);
      const data = await res.json();
      const results = data;
      return data;
    }
    catch(err) {
      console.log("ERROR retrieving EPIC data from NASA server: " + err);
    }
  }

  // Pass retreived Earth data to the earthData array:
  async function getEarthData() {

    const incomingData = await fetchEarthData();
    if(incomingData.length < 1){
      console.log("No data");
    }
    else {
      earthData = [...earthData, ...incomingData];
      console.log("earth: " + earthData.length + "incoming: " + incomingData.length);
      if(imagesRendered > earthData.length){
        setImagesRendered(earthData.length);
        //setImagesRendered(earthData.length, displayEarthData);
        //console.log("images modified: " + imagesRendered);
      }
      else {
        setImagesRendered(imagesRendered);
        //displayEarthData();
      }
      //setEarthData([...earthData, ...incomingData]);
    }
  }

  // Load a subset of Earth data to display on screen using the earthDisplayedData array:
  async function displayEarthData() {
    console.log("images third time: " + imagesRendered);
    console.log("earth data at display func: " + earthData.length);
    earthDataHolder = [];
    /*
    if (imagesRendered > earthData.length) {
      await setImagesRendered(earthData.length);
    }
    */
    for (let i=0; i<imagesRendered; i++) {
      earthDataHolder.push(earthData[i]);
    }
    setEarthDisplayedData(earthDataHolder);
  }

  // Clear all images from the screen:
  async function clearEarthData() {
    const update = await setImagesRendered(0);
    setEarthDisplayedData([]);
  }

  // Load 6 more images to page:
  async function loadMore() {
    const update = await setImagesRendered(imagesRendered => imagesRendered + 6);
    console.log("earth data length: " + earthData.length);
    console.log("images rendered :" + imagesRendered);
    getEarthData();
  }

  //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/
  //epic_1b_20190530011359.png?api_key=DEMO_KEY

  return (
    <div className={"posts-container " + hidden}>
      {earthDisplayedData.map((data, i) => (
        //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
        <Post planet="earth" image={"https:api.nasa.gov/EPIC/archive/natural/" + (data.identifier).substring(0,4) + "/"
        + (data.identifier).substring(4,6) + "/" + (data.identifier).substring(6,8) + "/png/" + data.image
        + ".png?api_key=" + APIKey} heading={data.caption} date={data.date} description="" key={data.identifier}/>
      ))}
      <LoadingZone action={loadMore} />
    </div>
  )
}

export default PostsEarth

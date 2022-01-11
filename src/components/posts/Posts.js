import React, { useEffect, useState } from 'react'
import Post from './Post.js'
import LoadingZone from './LoadingZone.js'

/*
The function below is where an array containing all posts will be generated from the API.
Each element in the array will be an object representing a post.
Loop through the array in the JSX and create a post object for each element.
Use MAP to generate a post from each object in the result
*/

function Posts() {

  //    getMarsData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1&api_key=Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG");

  const APIKey = "Q4TKMfEiMEj4MV0YxDAFddfCZEUvi0ofPqf6G9QG";
  const [sol, setSol] = useState(3349);
  const [marsData, setMarsData] = useState([]);

  // Whenever the sol increments, we pull data from the new sol:
  useEffect(() => {

    getMarsData();
  },
  [sol])

  async function nextSol() {
      await setSol((sol => sol-1));
      console.log(sol);
  }

  // 
  async function getMarsData() {
    // Pass Mars data to our array. Might include this in initial Fetch function below
    const incomingData = await fetchMarsData();
    if(incomingData.photos.length < 1){
      setSol();
    }
    else {
      setMarsData([...marsData, ...incomingData.photos]);
    }
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

  return (
    <div className="posts-container">
      {marsData.map((data, i) => ( 
        <Post planet={"mars"} image={data.img_src} heading={data.rover.name + " Rover: " + data.camera.full_name} date={data.earth_date} description="" key={data.id}/>
      ))}
      <LoadingZone action={nextSol}/>
    </div>
  )
}

export default Posts

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
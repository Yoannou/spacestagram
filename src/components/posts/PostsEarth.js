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
  const [earthData, setEarthData] = useState([]);

  // Whenever the sol increments, we pull data from the new sol:
  useEffect(() => {

    getEarthData();
  },
  [])

  //
  async function getEarthData() {
    // Pass Earth data to our array. Might include this in initial Fetch function below
    const incomingData = await fetchEarthData();
    if(incomingData.length < 1){
      console.log("LESS");
    }
    else {
      setEarthData([...earthData, ...incomingData]);
    }
  }

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

  //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/
  //epic_1b_20190530011359.png?api_key=DEMO_KEY

  return (
    <div className={"posts-container " + hidden}>
      {earthData.map((data, i) => (
        //https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
        <Post planet="earth" image={"https:api.nasa.gov/EPIC/archive/natural/" + (data.identifier).substring(0,4) + "/"
        + (data.identifier).substring(4,6) + "/" + (data.identifier).substring(6,8) + "/png/" + data.image
        + ".png?api_key=" + APIKey} heading={data.caption} date={data.date} description="" key={data.identifier}/>
      ))}
      <LoadingZone />
    </div>
  )
}

export default PostsEarth

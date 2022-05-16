import logo from './logo.svg';
import React, { useState, useEffect, Pagination, PaginationItem } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Dropdown, DropdownButton, Button } from "react-bootstrap";
import './App.css';
import mars from "./spaceMars2.jpg"

function App() {

  const server = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
  const apiKey = 'v64EeXSUbWqkaadVq4Bh1aGwfLBBKNRW2aXiDb9a';

  const[sol, setSol] = useState();
  const[images, setImages] = useState([""]);
  const[data, setData] = useState(false);
  const[rover, setRover] = useState("Curiosity");
  const[roverData, setRoverData] = useState("Curiosity");
  const[slicedRows, setSlicedRows] = useState(images);
  const pageSize = 10;
  const[totalCount, setTotalCount] = useState(images.length)
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const go = (() => {
    fetch(server + `${rover}/photos?api_key=${apiKey}&sol=${sol}`)
    .then(response => 
      response.json()
    )
    .then(pics => {
      console.log(pics)
      setImages(pics.photos)
      setData(true)

    }).then(error =>
      console.log(error)  
    )

    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`)
    .then(response => 
      response.json()
    )
    .then(stuff => {
      setRoverData(stuff.photo_manifest)

    }).then(error =>
      console.log(error)  
    )
  });

  const handleSelect=(e)=>{
    setRover(e)
  }
  

  return (
    <div className="App" style={{color:"white", width:"auto", margin:"auto",
    backgroundImage: "linear-gradient(to bottom, #0D2645, #000000)", minWidth:"500px"}}>
      <div class="page-header" 
      style={{position:"relative", 
      backgroundImage: `url(${mars})`, backgroundSize:"cover", overflow:"hidden", 
      maxWidth:"2500px", height:"200px", top:"50%"}}>

      <h1 style={{position:"relative",
        top:"25%",}}>MARS PHOTOGRAPH SEARCHER</h1>
        
      <div style={{
        margin:"auto",
        position:"relative",
        top:"50%",
        textAlign:"center",
      }}>
        <span>
          <DropdownButton
          alignCenter
          title= {rover}
          onSelect={handleSelect}
          style={{display:"inline-block", paddingRight: "20px"}}
            >
                <Dropdown.Item eventKey="Curiosity">Curiosity</Dropdown.Item>
                <Dropdown.Item eventKey="Opportunity">Opportunity</Dropdown.Item>
                <Dropdown.Item eventKey="Spirit">Spirit</Dropdown.Item>
                <Dropdown.Item eventKey="Perseverance">Perseverance</Dropdown.Item>
          </DropdownButton>
        </span>
        <span>
          <input placeholder="Enter a day you want"
            onChange={event => setSol(event.target.value)}
            style={{
              width:"20vw"
            }}
          />
          <span style={{display:"inline-block", paddingLeft: "20px"}}>
            <Button onClick={go}>nyooooom</Button>
          </span>
        </span>
      </div>
      </div>
      <div>{
        data ? (
          <div style={{margin:"auto",  width:"75%"}}>
            <h2 style={{textAlign:"left", paddingBottom:"1%", borderBottom:"solid"}}>
              <span>{roverData.name} </span>
              
            </h2>
            <h6 style={{textAlign:"left", paddingLeft:"5%"}}>
            <span style={{fontSize:"15px"}}> photos taken: {roverData.total_photos} </span>
              <span style={{fontSize:"15px"}}> | sols: {roverData.max_sol}</span>
            </h6>
            <h6 style={{textAlign:"left", paddingLeft:"5%"}}>
              <span style={{fontSize:"15px"}}>Launched on: {roverData.launch_date} </span>
              <span style={{fontSize:"15px"}}> | Landed on: {roverData.landing_date}</span>
            </h6>
            <h6 style={{textAlign:"left", paddingLeft:"5%"}}>
              <span style={{fontSize:"15px"}}>Projected mission end date: {roverData.max_date} </span>
            </h6>
          </div>
        ):(
          <div style={{
            backgroundColor:'black', color:'white',
            height:'500px'
          }}>no rover data</div>
        )
        }
      </div>
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", color:"black"}}>
      {
        data ? (
          
          images.slice(0,25).map((picture) => (

            <Card 
            style={{
              display:"flex", flexDirection:"row", flexWrap:"wrap", 
              width:"300px", height:"325px",
              backgroundColor:"black", color:"white",
              }}>
            <p style={{paddingTop:"-10px"}}>
              <span style={{fontSize:"15px", fontStyle:"bold", textAlign:"left"}}>Taken on: </span>
              <span style={{fontSize:"10px", textAlign:"left"}}>{picture.earth_date}</span>
            </p>
              <Card.Img src={picture.img_src} style={{width:"200px", height:"200px", margin:"auto"}}/>

            <Card.Body>
            <p>
              <h6 style={{fontSize:"15px", fontStyle:"bolder", textAlign:"left"}}>Camera </h6>
              <p style={{fontSize:"15px", textAlign:"left", paddingLeft:"20px"}}>{picture.camera.full_name}</p>
            </p>
            </Card.Body>
            </Card>
          ))
          ) : (
            <div style={{
              backgroundColor:'black',
              color:'black'
            }}> No data to display </div>
          )
          

      }
        </div>


    </div>
  );
}

export default App;

/*
<Pagination
  count={10}
  renderItem={(item) => (
    <PaginationItem
      {...item}
    />
  )}
/>

<span style={{order: "2", width:"200px", height:"500px", textAlign:"center"}}>
            <img src={picture.img_src} style={{width:"200px", height:"200px", padding:"5px"}}/>
            <ul style={{fontSize:"10px", textAlign:"left"}}>
                <li>rover: {picture.rover.name}</li>
                <li>camera: {picture.camera.full_name}</li>
                <li>earth-date: {picture.earth_date}</li>
              </ul>
          </span> 
          
          
          <Col>
          <Card style={{width:"250px", height:"300px"}}>
              <Card.Img src={picture.img_src} style={{width:"200px", height:"200px"}}/>
              <Card.Body>
              <ul style={{fontSize:"10px", textAlign:"left"}}>
                  <li>rover: {picture.rover.name}</li>
                  <li>camera: {picture.camera.full_name}</li>
                  <li>earth-date: {picture.earth_date}</li>
                </ul>
              </Card.Body>
          </Card>

          images.slice(0,25).map((picture) => (

              <Card style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"300px", height:"410px"}}>

                <Card.Img src={picture.img_src} style={{width:"200px", height:"150px", paddingTop:"15px", margin:"auto"}}/>

              <Card.Body>
              <p>
                  <h6 style={{fontSize:"20px", fontStyle:"bold", textAlign:"left"}}>Rover </h6>
                  <p style={{fontSize:"18px", textAlign:"left", paddingLeft:"20px"}}>{picture.rover.name}</p>
                </p>
              <p>
                <h6 style={{fontSize:"20px", fontStyle:"bolder", textAlign:"left"}}>Camera </h6>
                <p style={{fontSize:"18px", textAlign:"left", paddingLeft:"20px"}}>{picture.camera.full_name}</p>
              </p>
              <p>
                <h6 style={{fontSize:"20px", fontStyle:"bold", textAlign:"left"}}>earth date: </h6>
                <p style={{fontSize:"18px", textAlign:"left", paddingLeft:"20px"}}>{picture.earth_date}</p>
              </p>
              </Card.Body>
              </Card>

            ))
      </Col>*/

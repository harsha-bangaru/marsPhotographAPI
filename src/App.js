import logo from "./logo.svg";
import React, { useState, useEffect, Pagination, PaginationItem } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Dropdown, DropdownButton, Button } from "react-bootstrap";
import "./App.css";
import mars from "./spaceMars2.jpg";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Collapsible from 'react-collapsible';
import PictureCard from "./PictureCard";
import RoverCard from "./RoverCard";

function App() {
  const server = `https://api.nasa.gov/mars-photos/api/v1/rovers/`;
  const apiKey = process.env.REACT_APP_MARS_API_KEY;

  const [sol, setSol] = useState();
  const [images, setImages] = useState([""]);
  const [data, setData] = useState(false);
  const [rover, setRover] = useState("Curiosity");
  const [roverData, setRoverData] = useState("Curiosity");
  const [slicedRows, setSlicedRows] = useState(images);
  const [startDate, setStartDate] = useState(new Date(2009,9,1));
  const [endDate, setEndDate] = useState(new Date(2022,10,15));
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(images.length);
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const [value, onChange] = useState(new Date());

  const go = () => {
    fetch(server + `${rover}/photos?api_key=${apiKey}&earth_date=${sol}`)
      .then((response) => response.json())
      .then((pics) => {
        setImages(pics.photos);
        setData(true);
      })
      .then((error) => console.log(error));

    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((stuff) => {
        setRoverData(stuff.photo_manifest);
        setStartDate(stuff.photo_manifest.landing_date)
        setEndDate(stuff.photo_manifest.max_date)
      })
      .then((error) => {console.log(error)
      setData(false)});
  };

  const handleSelect = (e) => {
    setRover(e);
  };

  return (
    <div
      className="App"
      style={{color: "white",backgroundImage: "linear-gradient(to bottom, #0D2645, #000000)",
      margin: "auto",
      minWidth: "500px",}}
    >
      <div
        class="page-header"
        style={{ position: "relative", 
        backgroundImage: `url(${mars})`, backgroundSize: "cover",
        maxWidth: "2500px",top: "50%",height:"200px" }}
      >
        <h1 style={{ paddingTop:"25px"}}>
          MARS PHOTOGRAPH SEARCHER
        </h1>

        <div style={{paddingTop:"75px" }}
        >
          <span>
            <DropdownButton
              alignCenter
              title={rover}
              onSelect={handleSelect}
              style={{ display: "inline-block", paddingRight: "20px" }}
            >
              <Dropdown.Item eventKey="Curiosity">Curiosity</Dropdown.Item>
              <Dropdown.Item eventKey="Opportunity">Opportunity</Dropdown.Item>
              <Dropdown.Item eventKey="Spirit">Spirit</Dropdown.Item>
              <Dropdown.Item eventKey="Perseverance">
                Perseverance
              </Dropdown.Item>
            </DropdownButton>
          </span>
          <span>
          <input placeholder="Enter a day: 'yyyy-mm-dd'"
            onChange={event => setSol(event.target.value)}
            style={{
              width:"20vw"
            }}
          />
          </span>
          <span style={{display:"inline-block"}}>
          </span>
            <span style={{ display: "inline-block", paddingLeft: "20px" }}>
              <Button onClick={go}>nyooooom</Button>
            </span>
        </div>
      </div>
      <div>
        {data ? (
          <RoverCard roverData={roverData}/>
        ) : (
          <div style={{backgroundColor: "black", color: "white"}}>
            no rover data
          </div>
        )}
      </div>
      {/* individual image data */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          color: "black"
        }}
      >
        {data ? (
          images.slice(0, 25).map((picture) => (
            <PictureCard picture={picture}/>
          ))
        ) : (
          <div style={{backgroundColor: "black", color: "black"}}>
            {" "}No data to display on this {sol}{" "}
          </div>
        )}
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

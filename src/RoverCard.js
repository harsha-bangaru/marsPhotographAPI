function RoverCard(props) {
    const roverData = props.roverData;

    return (
        <div style={{ margin: "auto", width: "75%" }}>
            {/*rover information */}
            <h2 style={{textAlign: "left",paddingBottom: "1%",borderBottom: "solid"}}>
              <span>{roverData.name} </span>
            </h2>
            <h6 style={{ textAlign: "left", paddingLeft: "5%" }}>
              <span style={{ fontSize: "15px" }}>
                {" "} photos taken: {roverData.total_photos}{" "}
              </span>
              <span style={{ fontSize: "15px" }}>
                {" "} | sols: {roverData.max_sol}
              </span>
            </h6>
            <h6 style={{ textAlign: "left", paddingLeft: "5%" }}>
              <span style={{ fontSize: "15px" }}>
                Launched on: {roverData.launch_date}{" "}
              </span>
              <span style={{ fontSize: "15px" }}>
                {" "} | Landed on: {roverData.landing_date}
              </span>
            </h6>
            <h6 style={{ textAlign: "left", paddingLeft: "5%" }}>
              <span style={{ fontSize: "15px" }}>
                Projected mission end date: {roverData.max_date}{" "}
              </span>
            </h6>
          </div>
    )
}

export default RoverCard;
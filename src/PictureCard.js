import { Card, Dropdown, DropdownButton, Button } from "react-bootstrap";


function PictureCard(props) {
    const picture = props.picture;

    return (
        <Card
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "300px",
                height: "325px",
                backgroundColor: "rgba(0,0,0,0)",
                color: "white",
                borderBottom:"solid",
                borderWidth:".5px",
              }}
            >
              <p style={{ paddingTop: "-10px" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontStyle: "bold",
                    textAlign: "left",
                  }}
                >
                  Taken on:{" "}
                </span>
                <span style={{ fontSize: "10px", textAlign: "left" }}>
                  {picture.earth_date}
                </span>
              </p>
              <Card.Img
                src={picture.img_src}
                style={{ width: "200px", height: "200px", margin: "auto" }}
              />

              <Card.Body>
                <p>
                  <h6
                    style={{
                      fontSize: "15px",
                      fontStyle: "bolder",
                      textAlign: "left",
                    }}
                  >
                    Camera{" "}
                  </h6>
                  <p
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      paddingLeft: "20px",
                    }}
                  >
                    {picture.camera.full_name}
                  </p>
                </p>
              </Card.Body>
            </Card>
    )
}

export default PictureCard;
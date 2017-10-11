import React, { Component } from "react";
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaThumbsUp, FaThumbsDown, FaThumbsODown, FaHeart, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
// import Globe from 'react-icons/lib/fa/globe';

// const style = {}
const JCAB = "d-flex justify-content-between align-items-center";

class App extends Component {
  render() {
    return (
      <div className="container">

        {/*
 <div className="container-fluid ">
    <div className="row ">
        <div className="col-sm-6 col-2 bg-info text-white py-2 d-flex align-items-center justify-content-center" id="left">
            <h5 className="">I'm Fixed</h5>
        </div>
        <div className="col-sm-6 invisible col-2"> </div>
        <div className="col offset-2 offset-sm-6 py-2">
            <h4>I Scroll</h4>
            <p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics,
                raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation.
                Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>

            <p>Ethical Kickstarter PBR asymmetrical lo-fi. oreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb
                readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies,
                forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>

            <p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics,
                raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation.
                Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>

        </div>
    </div>
   </div> */}

        <h3 className="my-3">
          <FaNewspaperO className="mr-2" />Readable
        </h3>
        <div className="callout callout-info">Je suis par ici!</div>
        <Row>
          <Col xs="3">
            <Button outline color="primary" className={JCAB}>
              <FaGlobe size="18" />&nbsp;View all
            </Button>
            <div>
              <br />
            </div>
            <ListGroup className="">
              <ListGroupItem action className="justify-content-between">
                React <div>23</div>
              </ListGroupItem>
              <ListGroupItem action className="justify-content-between">
                Redux <div>7</div>
              </ListGroupItem>
              <ListGroupItem action className="justify-content-between">
                Udacity <div>12</div>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col>
            <Button outline  color="primary" className={JCAB}>
              <FaCalendar />&nbsp;recent
            </Button>
            <div>
              <br />
            </div>
            <ListGroup>

            <ListGroupItem action className="justify-content-between py-1 mb-2">

                <div>
                  <div>{`Udacity is the best place to learn React `}</div>
                  <small>
                    by <strong className="text-info">thingtwo </strong>on Tue 24
                    oct 2017
                  </small>
                </div>

                <div className="justify-content-between">
                  <span><FaPlus size="20"/></span>
                  <Button size="sm" className="mx-3 p-1" color="secondary">01</Button>
                  <span><FaThumbsODown size="20"/></span>
                </div>

              </ListGroupItem>

              <ListGroupItem action className="justify-content-between py-1 mb-2">

                <div>
                  <div>{`Udacity is the best place to learn React `}</div>
                  <small>
                    by <strong className="text-info">thingtwo </strong>on Tue 24
                    oct 2017
                  </small>
                </div>

                <div className="justify-content-between">
                  {/* <span><FaPlus size="20"/></span> */}
                  <Button size="sm" className="mx-3 p-1" color="primary">14</Button>
                  <span><FaThumbsODown size="20"/></span>
                </div>

              </ListGroupItem>

              <ListGroupItem action className="justify-content-between py-1 mb-2">

                <div>
                  <div>{`Udacity is the best place to learn React `}</div>
                  <small>
                    by <strong className="text-info">thingtwo </strong>on Tue 24
                    oct 2017
                  </small>
                </div>

                <div className="justify-content-between">
                  <span><FaPlus size="20"/></span>
                  <Button size="sm" className="mx-3 p-1" color="secondary">22</Button>
                  <span><FaThumbsODown size="20"/></span>
                </div>

              </ListGroupItem>
              <ListGroupItem action className="justify-content-between py-1 mb-2">

                <div>
                  <div>{`Udacity is the best place to learn React `}</div>
                  <small>
                    by <strong className="text-info">thingtwo </strong>on Tue 24
                    oct 2017
                  </small>
                </div>

                <div className="justify-content-between ">
                  <Button size="sm" className="mx-3 p-1" color="primary" outline>10</Button>
                  <span><FaPlus size="20"/></span>
                  {/* <span><FaThumbsODown size="20"/></span> */}
                </div>

              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
import { Route, Link } from "react-router-dom";
import Menu from "./components/Menu";

const JCAB = "d-flex justify-content-between align-items-center";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Row>

          <Route path="/" component={Menu}/>

          <Col className="offset-3">
            <div>
              <h3  className="my-3 invisible">
              <FaNewspaperO className="mr-2" />Readable
              </h3>
              <Button outline  color="primary" className={JCAB}>
                <FaCalendar />&nbsp;recent
              </Button>
              <div><br /></div>
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

                <div className="d-flex justify-content-between align-items-center">
                  <Button size="lg" className="mx-3 p-1" color="secondary">01</Button>
                  <span className="d-flex align-items-center flex-column">
                    <FaPlus className="mb-1" size="12"/>
                    <FaMinus className="mt-1"size="12"/>
                  </span>
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

                <div className="d-flex justify-content-between align-items-center">
                  <span className="d-flex align-items-center flex-column">
                    <small className="text-muted">+ 1</small>
                    <small className="text-muted">scored</small>
                  </span>
                  <Button size="lg" className="mx-3 p-1" color="primary">14</Button>
                  <span className="d-flex align-items-center flex-column">
                    <FaRotateLeft className="mb-1" size="12"/>
                    <FaMinus className="mt-1"size="12"/>
                  </span>
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

                <div className="d-flex justify-content-between align-items-center">
                  <span className="d-flex align-items-center flex-column">
                    <small className="text-muted">scored</small>
                    <small className="text-muted">- 1</small>
                  </span>
                  <Button outline size="lg" className="mx-3 p-1" color="primary">07</Button>
                  <span className="d-flex align-items-center flex-column">
                    <FaPlus className="mb-1"size="12"/>
                    <FaRotateLeft className="mt-1" size="12"/>
                  </span>
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

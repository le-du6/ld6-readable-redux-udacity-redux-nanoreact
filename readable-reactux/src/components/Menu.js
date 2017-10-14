import React, { Component } from 'react';
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { Route, Link } from "react-router-dom";

const JCAB = "d-flex justify-content-between align-items-center";

class Menu extends Component {
  state = {  }

  render() {
    console.log('====================================');
    console.log(this.props.location);
    console.log('====================================');
    return (
      <div id="left">
        <h3 className="my-3">
          <FaNewspaperO className="mr-2" />Readable
        </h3>

        <Col>
          <Button onClick={() => this.props.history.push("/")}  outline color="primary" className={JCAB}>
            <FaGlobe size="18" />&nbsp;View all
          </Button>
          <div><br /></div>

          <ListGroup className="">
            <ListGroupItem active={this.props.location.pathname==="/react"} tag={Link} to="/react" action className="justify-content-between">
              React<span className="ml-5">23</span>
            </ListGroupItem>
            <ListGroupItem action className="justify-content-between">
              Redux<span className="ml-5">7</span>
            </ListGroupItem>
            <ListGroupItem action className="justify-content-between">
              Udacity<span className="ml-5">12</span>
            </ListGroupItem>
          </ListGroup>

        </Col>
      </div>
    );
  }
}

export default Menu;


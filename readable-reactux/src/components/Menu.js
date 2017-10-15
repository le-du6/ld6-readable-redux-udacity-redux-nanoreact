import React, { Component } from 'react';
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { Route, Link } from "react-router-dom";
import { getCategories } from "../utils/ReadAPI";
const JCAB = "d-flex justify-content-between align-items-center";

const itemMenu = ({ name, path }, location) => (
  <ListGroupItem
    action
    key={name}
    tag={Link}
    to={`/${path}`}
    active={location.pathname===`/${path}`}
    className="justify-content-between">
      {name[0].toUpperCase() + name.slice(1)}<span className="ml-5">{name.length}</span>
  </ListGroupItem>)


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      categories: []
    }
  }
  componentDidMount () {
    getCategories().then((categories)=>
      this.setState({ categories: [...categories] })
    )
  }

  render() {
    console.log('====================================');
    console.log(this.props.location);
    console.log(this.state.categories);
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
            {this.state.categories.map((item)=>itemMenu(item, this.props.location))}
          </ListGroup>

        </Col>
      </div>
    );
  }
}

export default Menu;


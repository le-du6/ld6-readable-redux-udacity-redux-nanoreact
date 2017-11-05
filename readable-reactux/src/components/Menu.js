import React, { Component } from 'react';
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { MdMessage } from "react-icons/lib/md"
import { Route, Link } from "react-router-dom";
import { getCategories } from "../utils/ReadAPI";

import { connect } from 'react-redux'
import { fetchAllCategories, fetchAllPosts } from '../actions/actions'

const JCAB = "d-flex justify-content-between align-items-center"

const itemMenu = ({ name, path }, location) => (
  <ListGroupItem
    action
    key={name}
    tag={Link}
    to={`/${path}`}
    active={location.pathname===`/${path}`}
    className="justify-content-between">
      {name[0].toUpperCase() + name.slice(1)}<span className="ml-5 d-flex align-items-top">{name.length}&nbsp;<MdMessage/></span>
  </ListGroupItem>)


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount () {
    this.props.fetchAllCategories();
    this.props.fetchAllPosts();
  }

  render() {
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
            {this.props.toutesLesCat.map((item)=>itemMenu(item, this.props.location))}
          </ListGroup>

        </Col>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllCategories: (categories) => dispatch(fetchAllCategories(categories)),
    fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
  }
}

const mapStateToProps = (state, props) => ({
  toutesLesCat: state.allCategories
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


import React, { Component } from 'react';
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { MdMessage } from "react-icons/lib/md"
import { Route, Link } from "react-router-dom";
import { getCategories } from "../utils/ReadAPI";

import { connect } from 'react-redux'
import { pipo, fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts } from '../actions/actions'

const JCAB = "d-flex justify-content-between align-items-center"

const itemMenu = ({ name, path, count }, location) => (
  <ListGroupItem
    action
    key={name}
    tag={Link}
    to={`/${path}`}
    active={location.pathname===`/${path}`}
    className="justify-content-between">
      {name[0].toUpperCase() + name.slice(1)}<span className="ml-5 d-flex align-items-top">{count}&nbsp;<MdMessage/></span>
  </ListGroupItem>)


class FullPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount () {
    // this.props.fetchAllCategories();
    // this.props.fetchAllPosts();
    // this.props.fetchAllCategoriesWPosts();
  }

  render() {
    return (
    <ListGroup>
      <ListGroupItem action className="justify-content-between py-1 mb-2">
        <div>
          <div>{`Udacity is the best place to learn React `}</div>
          <small>
            by
            <strong className="text-info">thingtwo </strong>on Tue 24 oct 2017
          </small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button size="lg" className="mx-3 p-1" color="secondary">01</Button>
          <span className="d-flex align-items-center flex-column">
            <FaPlus className="mb-1" size="12" />
            <FaMinus className="mt-1" size="12" />
          </span>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pipo: () => dispatch(pipo()),
    fetchAllCategories: (categories) => dispatch(fetchAllCategories(categories)),
    fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
    fetchAllCategoriesWPosts: (categoriesWP) => dispatch(fetchAllCategoriesWPosts(categoriesWP)),
  }
}

const mapStateToProps = (state, props) => ({
  toutesLesCat: state.allCategoriesWP
})

export default connect(mapStateToProps, mapDispatchToProps)(FullPosts);


{/* <ListGroup>
  <ListGroupItem action className="justify-content-between py-1 mb-2">
    <div>
      <div>{`Udacity is the best place to learn React `}</div>
      <small>
        by
        <strong className="text-info">thingtwo </strong>on Tue 24 oct 2017
      </small>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <Button size="lg" className="mx-3 p-1" color="secondary">01</Button>
      <span className="d-flex align-items-center flex-column">
        <FaPlus className="mb-1" size="12" />
        <FaMinus className="mt-1" size="12" />
      </span>
    </div>
  </ListGroupItem>
  <ListGroupItem action className="justify-content-between py-1 mb-2">
    <div>
      <div>{`Udacity is the best place to learn React `}</div>
      <small>
        by
        <strong className="text-info">thingtwo </strong>on Tue 24 oct 2017
      </small>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <span className="d-flex align-items-center flex-column">
        <small className="text-muted">+ 1</small>
        <small className="text-muted">scored</small>
      </span>
      <Button size="lg" className="mx-3 p-1" color="primary">14</Button>
      <span className="d-flex align-items-center flex-column">
        <FaRotateLeft className="mb-1" size="12" />
        <FaMinus className="mt-1" size="12" />
      </span>
    </div>
  </ListGroupItem>
  <ListGroupItem action className="justify-content-between py-1 mb-2">
    <div>
      <div>{`Udacity is the best place to learn React `}</div>
      <small>
        by
        <strong className="text-info">thingtwo </strong>on Tue 24 oct 2017
      </small>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <span className="d-flex align-items-center flex-column">
        <small className="text-muted">scored</small>
        <small className="text-muted">- 1</small>
      </span>
      <Button outline size="lg" className="mx-3 p-1" color="primary">07</Button>
      <span className="d-flex align-items-center flex-column">
        <FaPlus className="mb-1" size="12" />
        <FaRotateLeft className="mt-1" size="12" />
      </span>
    </div>
  </ListGroupItem>
</ListGroup> */}

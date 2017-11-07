import React, { Component } from 'react';
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
// import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { FaPlus, FaMinus, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";

import { MdMessage } from "react-icons/lib/md"
import { Route, Link } from "react-router-dom";
import { getCategories } from "../utils/ReadAPI";

import { connect } from 'react-redux'
import { pipo, fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts } from '../actions/actions'

const JCAB = "d-flex justify-content-between align-items-center"

class ListPostsGroup extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
    }
  }
  componentDidMount () {
    // this.props.fetchAllCategories();
    this.props.fetchAllPosts();
    // this.props.fetchAllCategoriesWPosts();
  }

  render() {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const _Capitalize = (string) => string[0].toUpperCase() + string.slice(1)

    return (
    <ListGroup>
      {this.props.allPosts.filter(p=>p.category===this.props.match.params.cat).map( ({timestamp, title, author, category, voteScore}, index) =>
      <ListGroupItem key={index} action className="justify-content-between py-1 mb-2">
        <div>
          <div>{title}</div>
          <span>
            <small className="text-muted"> by <strong className="text-info">{author} </strong>on <span className="text-white">{new Date(timestamp).toLocaleDateString('en-US', options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button size="lg" className="mx-3 p-1" color="secondary">{voteScore}</Button>
          <span className="d-flex align-items-center flex-column">
            <FaPlus className="mb-1" size="12" />
            <FaMinus className="mt-1" size="12" />
          </span>
        </div>
      </ListGroupItem>
      )}
    </ListGroup>
  );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // pipo: () => dispatch(pipo()),
    // fetchAllCategories: (categories) => dispatch(fetchAllCategories(categories)),
    fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
    // fetchAllCategoriesWPosts: (categoriesWP) => dispatch(fetchAllCategoriesWPosts(categoriesWP)),
  }
}

const mapStateToProps = (state, props) => ({
  allPosts: state.allPosts
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPostsGroup);


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

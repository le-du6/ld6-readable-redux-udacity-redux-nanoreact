import React, { Component } from 'react';
import { Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { MdMessage } from "react-icons/lib/md"
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts } from '../actions/actions'

const JCAB = "d-flex justify-content-between align-items-center"

const itemMenu = ({ name, path, nbPost }, location) => (
  <ListGroupItem
    action
    key={name}
    tag={Link}
    to={`/${path}`}
    active={(location.pathname.split('/')[1] === `${path}`)}
    className="justify-content-between">
      {name[0].toUpperCase() + name.slice(1)}<span className="ml-5 d-flex align-items-top">{nbPost}&nbsp;<MdMessage/></span>
  </ListGroupItem>)

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount () {
    this.props.fetchAllCategoriesWPosts();
  }

  render() {
    return (
      <div id="left">
        <h3 className="my-3">
          <FaNewspaperO className="mr-2" />Readable
        </h3>
        <Col>
          <div className="mb-2">
          <Button
            onClick={() => this.props.history.push("/")}  outline color="primary" className={JCAB}>
            <FaGlobe size="18" />&nbsp;All Posts&nbsp;&nbsp;&nbsp;&nbsp;{this.props.toutesLesCat.reduce((acc,cat)=>acc+cat.nbPost,0)}&nbsp;<MdMessage/>
          </Button>
          </div>
          <ListGroup>
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
    fetchAllCategoriesWPosts: (categoriesWP) => dispatch(fetchAllCategoriesWPosts(categoriesWP)),

  }
}

const mapStateToProps = (state, props) => ({
  toutesLesCat: state.allCategoriesWP
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
// import { FaNewspaperO, FaGlobe } from "react-icons/lib/fa";
import { FaPlus, FaMinus, FaTrashO, FaEdit, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
import { MdMessage, MdRateReview , MdQuestionAnswer} from "react-icons/lib/md"

import { Route, Link } from "react-router-dom";
import { getCategories } from "../utils/ReadAPI";

import { connect } from 'react-redux'
import { pipo, fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts, fetchCurrentPost, fetchComments } from '../actions/actions'
import TopButtons from "./TopButtons"

const JCAB = "d-flex justify-content-between align-items-center"

class OnePost extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
    }
  }
  componentWillMount () {
    console.log(new Date().toLocaleString())
    this.props.fetchCurrentPost(this.props.match.params.post_id);
    this.props.fetchComments(this.props.match.params.post_id);
  }

  render() {
    const _options = { year: 'numeric', month: 'long', day: 'numeric'}
    const _Capitalize = (string) => string[0].toUpperCase() + string.slice(1)
    console.log( 'Onepost: ', this.props.currentPost)

    const currentPost = this.props.currentPost || {};
    const comments = this.props.comments || [];

    const {id = 0, timestamp = 0, title = "Mon Cul", body = "Ton Gros Cul", author = "Boby", category = "react", voteScore = 1} = currentPost;
    const nbComment = comments.length || 0 ;

    return (
    <div>
      <ListGroup>
        <ListGroupItem onClick={() => this.props.history.push(`/${category}/${id}`)}
          className="justify-content-between py-1 mb-2">
            <div>{title}</div>
          <div className="text-success ml-auto mr-5">
            {(nbComment !== 0) ? <span>{nbComment} <MdQuestionAnswer/></span> : ''}
          </div>
          <div style={{width: '150px'}} className="d-flex justify-content-end">
            <div className="d-flex justify-content-between align-items-center mr-5">
            <span className="d-flex align-items-center flex-column">
              <small className="text-muted">+ 1</small>
              <small className="text-muted">scored</small>
            </span>
              <Button style={{width: '40px'}} size="lg" className="mx-2 p-1" color="secondary">{voteScore}</Button>
              <span className="d-flex align-items-center flex-column">
                <FaPlus className="mb-1" size="12" />
                <FaMinus className="mt-1" size="12" />
              </span>
            </div>
          </div>
          <div>
            <ButtonGroup>
              <Button outline size="sm" color="primary" > <FaEdit/></Button>
              <Button outline size="sm" color="primary" > <FaTrashO/></Button>
            </ButtonGroup>
          </div>
          <div>
            <hr />
            <p>{body}</p>
            <span>
              <small className="text-muted"> by <strong className="text-info">{author} </strong>on <span className="text-white">{new Date(timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
            </span>
          </div>
        </ListGroupItem>
      </ListGroup>
      <TopButtons/>
      <ListGroup className="offset-2">
        {comments.map((comment, index) =>
          <ListGroupItem
            key={index}
            className="justify-content-between py-1 mb-2">
            <div>
              <div>{comment.body}</div>
              <span>
                <small className="text-muted"> by <strong className="text-info">{comment.author} </strong>on <span className="text-white">{new Date(comment.timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
              </span>
            </div>
            <div className="text-success ml-auto mr-5">
              {index + 1}
            </div>
            <div style={{width: '150px'}} className="d-flex justify-content-end">
              <div className="d-flex justify-content-between align-items-center mr-5">
              <span className="d-flex align-items-center flex-column">
                <small className="text-muted">+ 1</small>
                <small className="text-muted">scored</small>
              </span>
                <Button style={{width: '40px'}} size="lg" className="mx-2 p-1" color="secondary">{comment.voteScore}</Button>
                <span className="d-flex align-items-center flex-column">
                  <FaPlus className="mb-1" size="12" />
                  <FaMinus className="mt-1" size="12" />
                </span>
              </div>
            </div>
            <div>
              <ButtonGroup>
                <Button outline size="sm" color="primary" > <FaEdit/></Button>
                <Button outline size="sm" color="primary" > <FaTrashO/></Button>
              </ButtonGroup>
            </div>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentPost: (post) => dispatch(fetchCurrentPost(post)),
    fetchComments: (comments) => dispatch(fetchComments(comments)),
  }
}

const mapStateToProps = (state, props) => ({
  currentPost: state.currentPost,
  comments: state.comments
})

export default connect(mapStateToProps, mapDispatchToProps)(OnePost);


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

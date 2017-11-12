import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux'

import { Row, Col, ButtonGroup, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
import { MdMessage, MdRateReview , MdQuestionAnswer} from "react-icons/lib/md"

import TopButtonsPost from "./TopButtonsPost"
import { ShowDetailPost } from './ShowDetailPost';
import ShowDetailComment from './ShowDetailComment';
import shortid from 'shortid'

import {
  ac_postComment,
  fetchAllCategories,
  fetchAllCategoriesWPosts,
  fetchAllPosts,
  fetchCurrentPost,
  fetchComments } from '../actions/actions'

const schema = {
  type: "object",
  required: ["body", "author", "date"],
  properties: {
    body: {
      title: "Your comment here ",
      type: "string",
    },
    author: {
      title: "Your Name ",
      type: "string",
    },
    date: {
      title: "Date",
      "type": "string",
      "format": "date",
    },
  }
};

const uiSchema = {
  body: {
    'ui:widget': "textarea",
  },
};

const JCAB = "d-flex justify-content-between align-items-center"

class OnePost extends Component {
  constructor(props) {
    super(props);
    console.log("from OnePost: ",props)
    this.state = {
      isOpenForm: -1,
      newComment: {
        timestamp: 0,
        author: "",
        body: "",
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        id: shortid.generate(),
        parentId: this.props.match.params.post_id,
      }
    }
    this.onChangeForm = this.onChangeForm.bind(this);
    this._postComment = this._postComment.bind(this);
    this._changeIsOpenForm = this._changeIsOpenForm.bind(this);
  }
  componentWillMount () {
    this.props.fetchCurrentPost(this.props.match.params.post_id);
    this.props.fetchComments(this.props.match.params.post_id);
  }
  onChangeForm(x) {
    console.log('onChangeForm(x)', x.formData);
    this.setState({
      newComment: x.formData
    });
  }
  _postComment(){
    this.setState({
        newComment: Object.assign({}, this.state.newComment, { timestamp: Date.parse(this.state.newComment.date)})
      }, () => {
          console.log(JSON.stringify(this.state.newComment))
          this.props.ac_postComment(this.state.newComment)
          this.props.fetchComments(this.props.match.params.post_id);
    })
  }

  _changeIsOpenForm(index) {
    (this.state.isOpenForm === -1 || this.state.isOpenForm !== index)
    ? this.setState({isOpenForm: index}, console.log(this.state.isOpenForm))
    : this.setState({isOpenForm: -1}, console.log(this.state.isOpenForm))
  }

  render() {
    const postId = this.props.match.params.post_id
    const currentPost = this.props.currentPost
    // const category = ((currentPost===undefined) || currentPost.error) ? "" : currentPost.category
    const category = this.props.match.params.category
    const comments = this.props.comments || []
    const nbComment = comments.length || 0

    return (
    <div>
      {((currentPost===undefined) || currentPost.error)
        ? <div>This post doesn't exist</div>
        : <ShowDetailPost {...this.props} nbComment={nbComment}/>}
      <TopButtonsPost />
      <ListGroup className="offset-2">
        {comments.sort((a,b)=>b.timestamp - a.timestamp).map((comment, index) => {
          let isOpen = this.state.isOpenForm;
          const changeIsOpenForm = this._changeIsOpenForm;
        return <ShowDetailComment key={index} { ...{postId, comment, index, category, isOpen, changeIsOpenForm} } />})
        }
      </ListGroup>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentPost: (post) => dispatch(fetchCurrentPost(post)),
    fetchComments: (comments) => dispatch(fetchComments(comments)),
    ac_postComment: (comment) => dispatch(ac_postComment(comment)),
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

import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import TopButtonsOnePost from "./TopButtonsOnePost"


import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, ButtonGroup, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
import { MdMessage, MdRateReview , MdQuestionAnswer} from "react-icons/lib/md"
import AddCommentForm from "react-jsonschema-form";
import TopButtonsPost from "./TopButtonsPost"
import { ShowDetailPost } from './ShowDetailPost';
import ShowDetailComment from './ShowDetailComment';
import shortid from 'shortid'
import {
  ac_votePost,
  ac_voteComment,
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
    "ui:autofocus": true,
  },
};

const JCAB = "d-flex justify-content-between align-items-center"

class OnePost extends Component {
  constructor(props) {
    super(props);
    // console.log("from OnePost: ",props)
    this.state = {
      isOpenForm: -1,
      isModal: false,
      newComment: {
        timestamp: 0,
        author: "",
        body: "",
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        id: shortid.generate(),
        parentId: this.props.match.params.post_id,
      }
    }
    this._postComment = this._postComment.bind(this)
    this._changeIsOpenForm = this._changeIsOpenForm.bind(this)
    this._toggle = this._toggle.bind(this)
    this._onUpdateComment = this._onUpdateComment.bind(this);
  }
  _toggle() {
    this.setState({
      isModal: !this.state.isModal
    }, () => {})
  }
  _onUpdateComment(x) {
    this.setState({
      newComment: Object.assign({}, x.formData, {timestamp: Date.parse(x.formData.date)} )
    }, () => console.log(this.state.newComment));
  }
  componentWillMount () {
    this.props.fetchCurrentPost(this.props.match.params.post_id)
    this.props.fetchComments(this.props.match.params.post_id)
  }
  _postComment(){
    this.setState({
        newComment: Object.assign({}, this.state.newComment, { timestamp: Date.parse(this.state.newComment.date)})
      }, () => {
          console.log(JSON.stringify(this.state.newComment))
          this.props.ac_postComment(this.props.match.params.post_id, this.state.newComment)
          this.setState({newComment: {
            timestamp: 0,
            author: "",
            body: "",
            date: new Date().toLocaleDateString().split('/').reverse().join('-'),
            id: shortid.generate(),
            parentId: this.props.match.params.post_id,
          }}, () => this.setState({isModal: false}))
    })
  }
  _changeIsOpenForm(index) {
    (this.state.isOpenForm === -1 || this.state.isOpenForm !== index)
    ? this.setState({isOpenForm: index})
    : this.setState({isOpenForm: -1})
  }
  render() {
    const postId = this.props.match.params.post_id
    const currentPost = this.props.currentPost
    const category = this.props.match.params.category
    const comments = this.props.comments || []
    const nbComment = comments.length || 0
    const history = this.props.history
    const ac_voteComment = this.props.ac_voteComment
    const ac_votePost = this.props.ac_votePost

    return (
    <div>
      <TopButtonsOnePost { ...{history} }/>
      {((currentPost===undefined) || currentPost.error)
        ? <div>This post doesn't exist</div>
        : <ShowDetailPost ac_votePost={ac_votePost} {...this.props} nbComment={nbComment}/>}
      <TopButtonsPost loadModal={this._toggle}/>
      <Modal isOpen={this.state.isModal} toggle={this._toggle} className="">
          <ModalHeader toggle={this._toggle}>Write a new Comment</ModalHeader>
          <ModalBody>
          <AddCommentForm
          className=""
          schema={schema}
          formData={this.state.newComment}
          uiSchema={uiSchema}
          onChange={this._onUpdateComment}
          onSubmit={this._postComment}
          onError={() => console.log("errors")}
          autocomplete="off">
            <div className="d-flex justify-content-end">
              <Button
                onSubmit={this._postComment}
                color="primary"
                type="submit">Add</Button>
              <Button
                onClick={this._toggle}
                type="button">Cancel</Button>
            </div>
          </AddCommentForm>
          </ModalBody>
      </Modal>
      <ListGroup className="offset-2">
        {comments
          .sort(sortBy('-timestamp', 'body'))
          .map((comment, index) => {
            let isOpen = this.state.isOpenForm;
            const changeIsOpenForm = this._changeIsOpenForm;
            return <ShowDetailComment
            key={index} { ...{ac_voteComment, postId, comment, index, category, isOpen, changeIsOpenForm}} />
          })
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
    ac_postComment: (idPost, comment) => dispatch(ac_postComment(idPost, comment)),
    ac_voteComment: (idPost, commentId, vote) => dispatch(ac_voteComment(idPost, commentId, vote)),
    ac_votePost: (idPost, vote) => dispatch(ac_votePost(idPost, vote)),
  }
}
const mapStateToProps = (state, props) => ({
  currentPost: state.currentPost,
  comments: state.comments,
  // allPosts: state.allPosts,
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

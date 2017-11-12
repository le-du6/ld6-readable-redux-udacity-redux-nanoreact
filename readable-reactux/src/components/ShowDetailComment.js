import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Collapse, ButtonGroup, Button, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit } from "react-icons/lib/fa";
import AddCommentForm from "react-jsonschema-form";
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

const _options = { year: 'numeric', month: 'long', day: 'numeric'}
const _Capitalize = (string = "v") => string[0].toUpperCase() + string.slice(1)

class ShowDetailComment extends Component {
constructor(props) {
  super(props);
  // console.log(props)
  this.state = {
    isOpenForm: false,
    newComment: {
      timestamp: 0,
      author: "",
      body: "",
      date: new Date().toLocaleDateString().split('/').reverse().join('-'),
      id: shortid.generate(),
      parentId: this.props.postId,
    }
  }
  // this.onChangeForm = this.onChangeForm.bind(this);
  // this._postComment = this._postComment.bind(this);
}
componentWillMount () {
  // this.props.fetchCurrentPost(this.props.match.params.post_id);
  // this.props.fetchComments(this.props.match.params.post_id);
}

render() {
  const { comment, index, category } = this.props
  return (<div>
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
            <Button
              onClick={()=>null}
              outline size="sm" color="primary" > <FaEdit/></Button>
            <Button outline size="sm" color="primary" > <FaTrashO/></Button>
          </ButtonGroup>
        </div>
      </ListGroupItem>
      <Collapse
        isOpen={this.state.isOpenForm}>
        <AddCommentForm
          className="mb-3 offset-3 col-6"
          schema={schema}
          formData={this.state.newComment}
          uiSchema={uiSchema}
          onChange={this.onChangeForm}
          onSubmit={this._postComment}
          onError={() => console.log("errors")}
          autocomplete="off">
            <div className="d-flex justify-content-end">
              <Button type="submit" color="info">Confirm</Button>
                &nbsp;&nbsp;
              <Button type="button" onClick={this.props.onNewUser}>Cancel</Button>
            </div>
      </AddCommentForm>
    </Collapse>
    </div>
    )
}
}

function mapDispatchToProps(dispatch) {
  return {
    // fetchCurrentPost: (post) => dispatch(fetchCurrentPost(post)),
    fetchComments: (comments) => dispatch(fetchComments(comments)),
    // ac_postComment: (comment) => dispatch(ac_postComment(comment)),
  }
}

const mapStateToProps = (state, props) => ({
  // currentPost: state.currentPost,
  comments: state.comments
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetailComment)

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

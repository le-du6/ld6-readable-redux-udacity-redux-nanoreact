import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Collapse, ButtonGroup, Button, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit } from "react-icons/lib/fa";
import AddCommentForm from "react-jsonschema-form";
import {
  ac_updateComment,
  ac_deleteComment } from '../actions/actions'

const schema = {
  type: "object",
  required: ["body", "date"],
  properties: {
    body: {
      title: "Modify your comment here ",
      type: "string",
    },
    date: {
      title: "Modify the date here ",
      "type": "string",
      "format": "date",
    },
  }
};

const uiSchema = {
  body: {
    "ui:autofocus": true,
    'ui:widget': "textarea",
  }
};

const _options = { year: 'numeric', month: 'long', day: 'numeric'}
const _Capitalize = (string = "v") => string[0].toUpperCase() + string.slice(1)

class ShowDetailComment extends Component {
constructor(props) {
  super(props);
  this.state = {
    isDeleteModal: false,
    updateComment: {
      timestamp: this.props.comment.timestamp,
      body: this.props.comment.body,
      date: new Date(this.props.comment.timestamp).toLocaleDateString().split('/').reverse().join('-'),
    }
  }
  this._onUpdateComment = this._onUpdateComment.bind(this)
  this._updateComment = this._updateComment.bind(this)
  this._deleteComment = this._deleteComment.bind(this)
  this._updateStateForUpdate = this._updateStateForUpdate.bind(this)
  this._toggle = this._toggle.bind(this);
}
_toggle() {
  this.setState({
    isDeleteModal: !this.state.isDeleteModal
  }, () => this.props.changeIsOpenForm(-1));
}
_onUpdateComment(x) {
  this.setState({
    updateComment: Object.assign({}, x.formData, {timestamp: Date.parse(x.formData.date)} )
  }, () => console.log(this.state.updateComment));
}
_updateStateForUpdate() {
  this.setState({
    updateComment: {
      timestamp: this.props.comment.timestamp,
      body: this.props.comment.body,
      date: new Date(this.props.comment.timestamp).toLocaleDateString().split('/').reverse().join('-'),
    }})
  this.props.changeIsOpenForm(this.props.index)
}
_updateComment() {
  this.props.ac_updateComment(this.props.comment.id, this.state.updateComment, this.props.postId)
  this.props.changeIsOpenForm(-1)
}
_deleteComment() {
    this.props.ac_deleteComment(this.props.comment.id, this.props.postId)
    this.props.changeIsOpenForm(-1)
    this._toggle()
}
render() {
  const { postId, comment, index, category, isOpen, changeIsOpenForm } = this.props
  return (
  <div>
      <Modal
        isOpen={this.state.isDeleteModal}
        toggle={this._toggle}
        className="">
          <ModalHeader
            toggle={this._toggle}>Confirm to delete this Comment</ModalHeader>
          <ModalBody>
            <div className={`d-flex justify-content-between py-1 mb-2 ${(isOpen === index) ? 'bg-warning' : null}`}>
              <div>
                <div>{comment.body}</div>
                <span>
                  <small className="text-muted"> by <strong className="text-info">{comment.author} </strong>on <span>{new Date(comment.timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
                </span>
              </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
              <Button disabled outline color="primary">This action is NOT reversible.</Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button autofocus color="primary" onClick={this._deleteComment}>Delete</Button>
            <Button color="secondary" onClick={this._toggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
      <ListGroupItem
        className={`justify-content-between py-1 mb-2 ${(isOpen === index) ? 'bg-warning' : null}`}>
        <div>
          <div>{comment.body}</div>
          <span>
            <small className="text-muted"> by <strong className="text-info">{comment.author} </strong>on <span>{new Date(comment.timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
          </span>
        </div>
        <div className="text-info ml-auto mr-5">
          n°{index + 1}
        </div>
        <div style={{width: '150px'}} className="d-flex justify-content-end">
          <div className="d-flex justify-content-between align-items-center mr-5">
          <span className="d-flex align-items-center flex-column">
            {/* <small className="text-muted">+ 1</small>
            <small className="text-muted">scored</small> */}
          </span>
            <Button style={{width: '40px'}} size="lg" className="mx-2 p-1" color="secondary">{comment.voteScore}</Button>
            <span className="d-flex align-items-center flex-column">
              <FaPlus
                onClick={()=>this.props.ac_voteComment(postId, comment.id, {option: 'upVote'})}
                className="mb-1" size="12" />
              <FaMinus
                onClick={()=>this.props.ac_voteComment(postId, comment.id, {option: 'downVote'})}
                className="mt-1" size="12" />
            </span>
          </div>
        </div>
        <div>
          <ButtonGroup>
            <Button
              outline={!(isOpen === index)}
              onClick={()=>this._updateStateForUpdate()}
              size="sm" color="primary" > <FaEdit/></Button>
            <Button
              outline={!(this.state.isDeleteModal)}
              onClick={(e)=>this._toggle()}
              size="sm" color="primary" > <FaTrashO/></Button>
          </ButtonGroup>
        </div>
      </ListGroupItem>
      <Collapse
        isOpen={(isOpen === index)}>
        <AddCommentForm
          className="mb-3 offset-3 col-6"
          schema={schema}
          formData={this.state.updateComment}
          uiSchema={uiSchema}
          onChange={this._onUpdateComment}
          onSubmit={this._updateComment}
          onError={() => console.log("errors")}
          autocomplete="off">
            <div className="d-flex justify-content-end">
              <Button
                onClick={()=>this._updateComment()}
                type="submit" color="warning">Update</Button>
                &nbsp;&nbsp;
              <Button
                onClick={()=>changeIsOpenForm(index)}
                type="button">Cancel</Button>
            </div>
      </AddCommentForm>
    </Collapse>
</div> ) } }

function mapDispatchToProps(dispatch) {
  return {
    ac_updateComment: (idC, comment, idPost) => dispatch(ac_updateComment(idC, comment, idPost)),
    ac_deleteComment: (idC, idPost) => dispatch(ac_deleteComment(idC, idPost)),
  }
}
const mapStateToProps = (state, props) => ({
  comments: state.comments
})
export default connect(mapStateToProps, mapDispatchToProps)(ShowDetailComment)

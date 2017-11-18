import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from "react-router-dom"
import { Modal, ModalHeader, ModalBody, Row, Col, ButtonGroup, Button, Badge, ListGroup, ListGroupItem } from "reactstrap"
import { FaPlus, FaMinus, FaTrashO, FaEdit, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa"
import { MdMessage, MdRateReview , MdQuestionAnswer} from "react-icons/lib/md"
import AddCommentForm from "react-jsonschema-form";
import { getCategories } from "../utils/ReadAPI"
import TopButtons from "./TopButtons"
import shortid from 'shortid'
import sortBy from 'sort-by'

import { ac_postPost, ac_votePost, fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts } from '../actions/actions'

const schema = {
  type: "object",
  required: ["title", "body", "author", "date", "category"],
  properties: {
    title: {
      title: "Your post title here ",
      type: "string",
    },
    body: {
      title: "Your post body here ",
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
    category: {
      title: "Pick a category",
      "type": "string",
    },
  }
};

const uiSchema = {
  title: {
    "ui:autofocus": true,
  },
  body: {
    'ui:widget': "textarea",
  },
};

class FullPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: localStorage['readable-sort'].split(',') || ['-timestamp', '-voteScore'],
      isModal: false,
      newPost: {
        timestamp: 0,
        title: "",
        body: "",
        author: "",
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
        id: shortid.generate(),
        category: this.props.match.params.cat || "none",
      }
    }
    this._toggle = this._toggle.bind(this)
    this._toggleDate = this._toggleDate.bind(this)
    this._toggleVote = this._toggleVote.bind(this)
    this._onUpdatePost = this._onUpdatePost.bind(this)
    this._postPost = this._postPost.bind(this)
  }
  componentWillMount () {
    this.props.fetchAllPosts()
  }
  _toggle() {
    this.setState({
      isModal: !this.state.isModal
    }, () => {})
  }
  _toggleDate() {
    let cS = [...this.state.currentSort];
    (cS[0].includes('voteScore')) ?  cS = cS.reverse() : null;
    (cS[0].includes('-')) ?  cS[0] = cS[0].slice(1) : cS[0] = '-' + cS[0];
    this.setState({currentSort: [...cS] }, () => localStorage['readable-sort'] = [...cS].join(','));
  }
  _toggleVote() {
    let cS = [...this.state.currentSort];
    (cS[0].includes('timestamp')) ?  cS = cS.reverse() : null;
    (cS[0].includes('-')) ?  cS[0] = cS[0].slice(1) : cS[0] = '-' + cS[0];
    this.setState({currentSort: [...cS] }, () => localStorage['readable-sort'] = [...cS].join(','));
  }
  _onUpdatePost(x) {
    this.setState({
      newPost: Object.assign({}, x.formData, {timestamp: Date.parse(x.formData.date)} )
    }, () => console.log(this.state.newPost));
  }
  _postPost(){
    this.setState({
        newPost: Object.assign({}, this.state.newPost, { timestamp: Date.parse(this.state.newPost.date)})
      }, () => {
          console.log(JSON.stringify(this.state.newPost))
          this.props.ac_postPost(this.state.newPost)
          this.setState({newPost: {
            timestamp: 0,
            title: "",
            body: "",
            author: "",
            date: new Date().toLocaleDateString().split('/').reverse().join('-'),
            id: shortid.generate(),
            category: this.props.match.params.cat || "none",
          }}, () => this.setState({isModal: false}))
    })
  }
  render() {
    const {_toggleDate, _toggleVote, _toggle} = this;
    const _options = { year: 'numeric', month: 'long', day: 'numeric'}
    const _Capitalize = (string="true") => string[0].toUpperCase() + string.slice(1)
    const _category = this.props.match.params.cat
    const displayPosts = this.props.allPosts
    .filter(post => (_category) ? (post.category === _category) : true)
    .sort(sortBy(...this.state.currentSort))

    return (
    (displayPosts.length===0) ? <h3>This Category doesn't exist!</h3>
      :
    <div>
    <TopButtons {...{_toggleDate, _toggleVote, _toggle}} cS={this.state.currentSort}/>
    <Modal isOpen={this.state.isModal} toggle={this._toggle} className="">
          <ModalHeader toggle={this._toggle}>Write a new Post</ModalHeader>
          <ModalBody>
          <AddCommentForm
          className=""
          schema={schema}
          formData={this.state.newPost}
          uiSchema={uiSchema}
          onChange={this._onUpdatePost}
          onSubmit={this._postPost}
          onError={() => console.log("errors")}
          autocomplete="off">
            <div className="d-flex justify-content-end">
              <Button
                onSubmit={this._postPost}
                color="primary"
                type="submit">Add</Button>
              <Button
                onClick={this._toggle}
                type="button">Cancel</Button>
            </div>
          </AddCommentForm>
          </ModalBody>
      </Modal>
    <ListGroup>
      {displayPosts
        .map( ({id, timestamp, title, author, category, voteScore, nbComment}, index) =>
      <ListGroupItem onClick={() => this.props.history.push(`/${category}/${id}`)}
        key={index} action className="justify-content-between py-1 mb-2">
        <div>
          <div>{title}</div>
          <span>
            <small className="text-muted"> by <strong className="text-info">{author} </strong>on <span>{new Date(timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
          </span>
        </div>
        <div className="text-info ml-auto mr-5">
          {(nbComment !== 0) ? <span>{nbComment} <MdQuestionAnswer/></span> : ''}
        </div>
        <div style={{width: '150px'}} className="d-flex justify-content-end">
          <div className="d-flex justify-content-between align-items-center mr-5">
          <span className="d-flex align-items-center flex-column"> </span>
            <Button style={{width: '36px'}} size="lg" className="mx-1 p-1" color="secondary">{voteScore}</Button>
            <span className="d-flex align-items-center flex-column">
              <FaPlus
                onClick={(e)=>{e.stopPropagation(); this.props.ac_votePost(id, {option: 'upVote'})}}
                className="mb-1" size="12" />
              <FaMinus
                onClick={(e)=>{e.stopPropagation(); this.props.ac_votePost(id, {option: 'downVote'})}}
                className="mt-1" size="12" />
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
  );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    ac_votePost: (idPost, vote) => dispatch(ac_votePost(idPost, vote)),
    ac_postPost: (post) => dispatch(ac_postPost(post)),
  }
}
const mapStateToProps = (state, props) => ({
  allPosts: state.allPosts
})
export default connect(mapStateToProps, mapDispatchToProps)(FullPosts);

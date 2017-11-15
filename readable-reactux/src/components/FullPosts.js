import React, { Component } from 'react'
import { Row, Col, ButtonGroup, Button, Badge, ListGroup, ListGroupItem } from "reactstrap"
import { FaPlus, FaMinus, FaTrashO, FaEdit, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa"
import { MdMessage, MdRateReview , MdQuestionAnswer} from "react-icons/lib/md"
import { Route, Link } from "react-router-dom"
import { getCategories } from "../utils/ReadAPI"
import TopButtons from "./TopButtons"
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { ac_votePost, fetchAllCategories, fetchAllCategoriesWPosts, fetchAllPosts } from '../actions/actions'

class FullPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSort: localStorage['readable-sort'].split(',') || ['-timestamp', '-voteScore'],
    }
    this._toggleDate = this._toggleDate.bind(this)
    this._toggleVote = this._toggleVote.bind(this);
  }
  componentWillMount () {
    this.props.fetchAllPosts()
  }
  _toggleDate() {
    let cS = [...this.state.currentSort];
    // console.log('date: ', cS[0]);
    (cS[0].includes('voteScore')) ?  cS = cS.reverse() : null;
    (cS[0].includes('-')) ?  cS[0] = cS[0].slice(1) : cS[0] = '-' + cS[0];
    this.setState({currentSort: [...cS] }, () => localStorage['readable-sort'] = [...cS].join(','));
  }
  _toggleVote() {
    let cS = [...this.state.currentSort];
    // console.log('vote: ', cS[0]);
    (cS[0].includes('timestamp')) ?  cS = cS.reverse() : null;
    (cS[0].includes('-')) ?  cS[0] = cS[0].slice(1) : cS[0] = '-' + cS[0];
    this.setState({currentSort: [...cS] }, () => localStorage['readable-sort'] = [...cS].join(','));
  }
  render() {
    const {_toggleDate, _toggleVote} = this;
    const _options = { year: 'numeric', month: 'long', day: 'numeric'}
    const _Capitalize = (string) => string[0].toUpperCase() + string.slice(1)
    const _category = this.props.match.params.cat
    const displayPosts = this.props.allPosts
    .filter(post => (_category) ? (post.category === _category) : true)
    .sort(sortBy(...this.state.currentSort))

    return (
    (displayPosts.length===0) ? <h3>This Category doesn't exist!</h3>
      :
    <div>
    {/* <TopButtons _toggleDate={this._toggleDate} _toggleVote={this._toggleVote} cS={this.state.currentSort}/> */}
    <TopButtons {...{_toggleDate, _toggleVote}} cS={this.state.currentSort}/>
    <ListGroup>
      {displayPosts
        .map( ({id, timestamp, title, author, category, voteScore, nbComment}, index) =>
      <ListGroupItem onClick={() => this.props.history.push(`/${category}/${id}`)}
        key={index} action className="justify-content-between py-1 mb-2">
        <div>
          <div>{title}</div>
          <span>
            <small className="text-muted"> by <strong className="text-info">{author} </strong>on <span className="text-white">{new Date(timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
          </span>
        </div>
        <div className="text-info ml-auto mr-5">
          {(nbComment !== 0) ? <span>{nbComment} <MdQuestionAnswer/></span> : ''}
        </div>
        <div style={{width: '150px'}} className="d-flex justify-content-end">
          <div className="d-flex justify-content-between align-items-center mr-5">
          <span className="d-flex align-items-center flex-column">
        {/* <small className="text-muted">+ 1</small>
        <small className="text-muted">scored</small> */}
      </span>
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

  }
}
const mapStateToProps = (state, props) => ({
  allPosts: state.allPosts
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

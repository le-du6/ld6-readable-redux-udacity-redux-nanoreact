import React, { Component } from 'react';
import { Row, ButtonGroup, Button, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit } from "react-icons/lib/fa";
import { MdQuestionAnswer} from "react-icons/lib/md"
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

const _options = { year: 'numeric', month: 'long', day: 'numeric'}
const _Capitalize = (string="v") => string[0].toUpperCase() + string.slice(1)

let reactRefs = {}

export const ShowDetailPost = ({
  _onDeletePost,
  _onUpdatePost,
  ac_votePost,
  history,
  currentPost: {id, timestamp, title, body, author, category, voteScore},
  nbComment = 0
  }) => (

<div className="d-flex flex-column mb-3">
  <div className="d-flex justify-content-between align-items-center flex-row">
    <div className="d-flex flex-column">
      <div>
        <RIETextArea rows='1' cols="40"
          ref={input => {reactRefs.title = input; console.log(reactRefs.title)}}
          value={title}
          change={x=>_onUpdatePost(x)}
          propName='title'
          element
          validate={x=>{
            console.log('RIE validate: ', x)
            return true
          }
          }
        />
      </div>
      <div className="d-flex flex-row">
          <small className="text-muted"> by
            <strong className="text-info"> {author} </strong> on
            <span> {new Date(timestamp).toLocaleDateString('en-US', _options)} </span> in
            <span className="text-primary"> {_Capitalize(category)} </span>
          </small>
      </div>
    </div>

    <div className="text-info ml-auto mr-5">
      { (nbComment !== 0 && nbComment !== undefined ) ?
      <span>{nbComment}
        <MdQuestionAnswer/>
      </span> : null}
    </div>
    <div style={{width: '150px'}} className="d-flex justify-content-end">
      <div className="d-flex justify-content-between align-items-center mr-5">
        <Button style={{width: '40px'}} size="lg" className="mx-2 p-1" color="secondary">{voteScore}</Button>
        <span className="d-flex align-items-center flex-column">
          <FaPlus onClick={(e)=>{e.stopPropagation(); ac_votePost(id, {option: 'upVote'})}} className="mb-1" size="12" />
            <FaMinus onClick={(e)=>{e.stopPropagation(); ac_votePost(id, {option: 'downVote'})}} className="mt-1" size="12" />
        </span>
      </div>
    </div>
    <div>
      <ButtonGroup>
        <Button
          onClick={(e)=>{reactRefs.title.startEditing() }}
          outline size="sm" color="primary">
          <FaEdit/>
        </Button>
        <Button
          onClick={()=>{_onDeletePost(id)}}
          outline size="sm" color="primary">
          <FaTrashO/>
        </Button>
      </ButtonGroup>
    </div>
  </div>

  <hr style={{ width: "100%", height: "1px", 'backgroundColor':"#DF691A" }}/>

  <RIETextArea rows='4' cols="80"
    ref={input => {reactRefs.body = input; console.log(reactRefs.body)}}
    value={body}
    change={x=>_onUpdatePost(x)}
    propName='body'
    validate={x=>{
      console.log('RIE validate: ', x)
      return true
    }
    }
  />

</div>

)

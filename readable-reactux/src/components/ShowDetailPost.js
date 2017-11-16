import React, { Component } from 'react';
import { ButtonGroup, Button, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit } from "react-icons/lib/fa";
import { MdQuestionAnswer} from "react-icons/lib/md"

const _options = { year: 'numeric', month: 'long', day: 'numeric'}
const _Capitalize = (string="v") => string[0].toUpperCase() + string.slice(1)

export const ShowDetailPost = ({
  ac_votePost,
  history,
  currentPost: {id, timestamp, title, body, author, category, voteScore},
  nbComment
  }) =>
    (<ListGroup>
        <ListGroupItem onClick={() => history.push(`/${category}/${id}`)}
          className="justify-content-between py-1 mb-2">
            <div>{title}</div>
          <div className="text-info ml-auto mr-5">
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
                <FaPlus
                  onClick={(e)=>{e.stopPropagation(); ac_votePost(id, {option: 'upVote'})}}
                  className="mb-1" size="12" />
                <FaMinus
                  onClick={(e)=>{e.stopPropagation(); ac_votePost(id, {option: 'downVote'})}}
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
          <div>
            <hr />
            <p>{body}</p>
            <span>
              <small className="text-muted"> by <strong className="text-info">{author} </strong>on <span className="text-white">{new Date(timestamp).toLocaleDateString('en-US', _options)}</span> in <span className="text-primary">{_Capitalize(category)}</span></small>
            </span>
          </div>
        </ListGroupItem>
      </ListGroup>)

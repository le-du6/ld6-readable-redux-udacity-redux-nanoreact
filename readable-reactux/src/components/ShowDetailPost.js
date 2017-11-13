import React, { Component } from 'react';
import { ButtonGroup, Button, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaTrashO, FaEdit } from "react-icons/lib/fa";
import { MdQuestionAnswer} from "react-icons/lib/md"

const _options = { year: 'numeric', month: 'long', day: 'numeric'}
const _Capitalize = (string="v") => string[0].toUpperCase() + string.slice(1)

export const ShowDetailPost = ({
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
      </ListGroup>)


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

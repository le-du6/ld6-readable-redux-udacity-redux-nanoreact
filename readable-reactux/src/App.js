import React, { Component } from "react";
import { Row, Col, Button, Badge, ListGroup, ListGroupItem } from "reactstrap";
import { FaPlus, FaMinus, FaRotateLeft, FaHeartO, FaNewspaperO, FaGlobe, FaCalendar } from "react-icons/lib/fa";
import { Route, Link } from "react-router-dom"
import Menu from "./components/Menu"
import TopButtons from "./components/TopButtons"
import FullPosts from "./components/FullPosts"
import ListPostsGroup from './components/ListPostsGroup';

const JCAB = "d-flex justify-content-between align-items-center";

// const FullPosts = () => <div>FullPosts</div>

const User = ({ match }) => {
  return <h1>Hello {match.params.cat}!</h1>
}

const Stuff = (stuff) => {
  console.log(Object.entries(stuff));
  return <h4>{Object.entries(stuff).map(x=>x[0]).join(' ')}</h4>
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Route path="/" component={Menu}/>
          {/* <Col className="offset-3"> */}
          <Col>
            <TopButtons/>
            <Route exact path="/" component={FullPosts}/>
            <Route path="/:cat" component={ListPostsGroup}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

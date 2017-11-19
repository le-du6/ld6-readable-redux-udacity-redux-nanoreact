import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Route } from "react-router-dom"
import Menu from "./components/Menu"
import FullPosts from "./components/FullPosts"
import OnePost from "./components/OnePost"

class App extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Route path="/" component={Menu}/>
          <Col>
            <Route exact path="/" component={FullPosts}/>
            <Route exact path="/:cat" component={FullPosts}/>
            <Route exact path="/:category/:post_id" component={OnePost}/>
            <Route exact path="/:category/:post_id/:action" component={OnePost}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

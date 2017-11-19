import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaNewspaperO, FaArrowLeft } from "react-icons/lib/fa";

class TopButtonsOnePost extends Component {
  render() {
    return (
    <div className="mb-2">
      <h3 className="my-3 invisible"><FaNewspaperO className="mr-2" />Invisible</h3>
      <div className="d-flex justify-content-end">
      <ButtonGroup>
        <Button
          onClick={() => this.props.history.goBack()}
          outline color="primary"><FaArrowLeft />&nbsp;Back</Button>
      </ButtonGroup>
      </div>
    </div>
    );
  }
}

export default TopButtonsOnePost;

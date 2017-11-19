import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaPlus } from "react-icons/lib/fa";

class TopButtonsPost extends Component {
  render() {
    return (
      <div className="d-flex justify-content-end mb-2 mt-2">
        <ButtonGroup>
          <Button
            onClick={() => this.props.loadModal()}
            outline color="primary" > <FaPlus/> Add Comment</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default TopButtonsPost;

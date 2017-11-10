import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaNewspaperO, FaCalendar, FaPlus } from "react-icons/lib/fa";

class TopButtonsPost extends Component {
  render() {
    return (
      <div className="d-flex justify-content-end mb-2 mt-2">
        <ButtonGroup>
          <Button outline  color="primary" > <FaPlus/> Add Comment</Button>
          {/* <Button outline  color="primary" > <FaCalendar />&nbsp;2recent </Button>
          <Button outline  color="primary" > <FaCalendar />&nbsp;3recent </Button> */}
        </ButtonGroup>
      </div>
    );
  }
}

export default TopButtonsPost;

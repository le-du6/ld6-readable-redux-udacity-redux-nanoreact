import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaNewspaperO, FaHeart, FaCalendar, FaPlus } from "react-icons/lib/fa";

class TopButtons extends Component {
  render() {
    return (
    <div className="mb-2">
      <h3 className="my-3 invisible"><FaNewspaperO className="mr-2" />Invisible</h3>
      <div className="d-flex justify-content-end">
      <ButtonGroup>
        <Button outline  color="primary" > <FaCalendar style={{transform: "rotate(180deg)" }} />&nbsp;Old Posts</Button>
        <Button outline  color="primary" > <FaHeart style={{transform: "rotate(180deg)"}} />&nbsp;High Score </Button>
        <Button outline  color="primary" > <FaPlus />&nbsp;Add Post </Button>
      </ButtonGroup>
      </div>
    </div>
    );
  }
}

export default TopButtons;

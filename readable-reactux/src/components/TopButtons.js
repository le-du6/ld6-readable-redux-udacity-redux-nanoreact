import React, { Component } from "react";
import { Button } from "reactstrap";
import { FaNewspaperO, FaCalendar } from "react-icons/lib/fa";

const JCAB = "d-flex justify-content-between align-items-center";

class TopButtons extends Component {
  render() {
    return (
    <div>
      <h3  className="my-3 invisible">
      <FaNewspaperO className="mr-2" />Invisible
      </h3>
      <Button outline  color="primary" className={JCAB}>
        <FaCalendar />&nbsp;recent
      </Button>
      <div><br /></div>
    </div>
    );
  }
}

export default TopButtons;

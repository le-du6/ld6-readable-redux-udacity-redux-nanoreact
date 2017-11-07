import React, { Component } from "react";
import { Button } from "reactstrap";
import { FaNewspaperO, FaCalendar } from "react-icons/lib/fa";

let JCAB = ""
// JCAB = "d-flex align-items-end flex-column";
// JCAB = "d-flex ";

class TopButtons extends Component {
  render() {
    return (
    <div className={JCAB}>
      <h3 className="my-3 invisible"><FaNewspaperO className="mr-2" />Invisible</h3>
      <div className="d-flex justify-content-between">
        <Button outline  color="primary m-auto" > <FaCalendar />&nbsp;1recent </Button>
        <Button outline  color="primary" > <FaCalendar />&nbsp;2recent </Button>
        <Button outline  color="primary" > <FaCalendar />&nbsp;3recent </Button>
      </div>
      <br />
    </div>
    );
  }
}

export default TopButtons;

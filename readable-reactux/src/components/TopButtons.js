import React, { Component } from "react"
import { Button, ButtonGroup } from "reactstrap"
import { FaSortAmountAsc, FaSortAmountDesc, FaNewspaperO, FaHeart, FaCalendar, FaPlus } from "react-icons/lib/fa"


class TopButtons extends Component {
  render() {
    return (
    <div className="mb-2">
      <h3 className="my-3 invisible"><FaNewspaperO className="mr-2" />Invisible</h3>
      <div className="d-flex justify-content-start">
      <ButtonGroup>
        <Button
          onClick={()=>this.props._toggleDate()}
          outline color="primary" > <FaSortAmountAsc style={{transform: "rotate(180deg)" }} />&nbsp;Dates</Button>
        <Button
          onClick={()=>this.props._toggleVote()}
          outline color="primary" > <FaSortAmountDesc style={{transform: "rotate(180deg)"}} />&nbsp;Votes </Button>
      </ButtonGroup>
      <div className="ml-auto">
        <Button outline color="primary">
          <FaPlus />&nbsp;Add Post
        </Button>
      </div>
      </div>
    </div>
    );
  }
}

export default TopButtons;

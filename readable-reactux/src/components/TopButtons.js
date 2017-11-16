import React, { Component } from "react"
import { Button, ButtonGroup } from "reactstrap"
import { FaSortAmountAsc, FaSortAmountDesc, FaNewspaperO, FaHeart, FaCalendar, FaPlus } from "react-icons/lib/fa"


class TopButtons extends Component {
  render() {
    const cS = this.props.cS;

    return (
    <div className="mb-2">
      <h3 className="my-3 invisible"><FaNewspaperO className="mr-2" />Invisible</h3>
      <div className="d-flex justify-content-start">
      <ButtonGroup>
        <Button
          onClick={this.props._toggleDate}
          outline={!(cS[0].includes('timestamp'))}
          color="primary">
          <FaSortAmountAsc
            style={(cS[0].includes('timestamp') && cS[0][0] === '-') ? {transform: "rotate(180deg)"} : null}
             />&nbsp;Dates</Button>
        <Button
          onClick={this.props._toggleVote}
          outline={!(cS[0].includes('voteScore'))}
          color="primary">
          <FaSortAmountAsc
            style={(cS[0].includes('voteScore') && cS[0][0] === '-') ? {transform: "rotate(180deg)"} : null}
             />&nbsp;Votes </Button>
      </ButtonGroup>
      <div className="ml-auto">
        <Button
          onClick={this.props._toggle}
          outline color="primary">
          <FaPlus />&nbsp;Add Post
        </Button>
      </div>
      </div>
    </div>
    );
  }
}

export default TopButtons;

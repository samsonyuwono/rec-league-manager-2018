import React, { Component } from "react";
import classnames from "classnames";

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    debugger;
    this.props.deleteFlashMessage(this.props.message.id);
  }
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div
        className={classnames("alert", {
          "alert-success": type === "success",
          "alert-danger": type === "error"
        })}
      >
        <button onClick={this.handleOnClick} className="close">
          <span>&times;</span>
        </button>

        {text}
      </div>
    );
  }
}

export default FlashMessage;

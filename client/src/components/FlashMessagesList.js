import React, { Component } from "react";
import FlashMessage from "./FlashMessage";
import { connect } from "react-redux";

class FlashMessagesList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <FlashMessage key={message.id} message={message} />
    ));
    return <div>{messages}</div>;
  }
}

const mapStateToProps = state => {
  return {
    messages: state.flashMessages
  };
};

export default connect(mapStateToProps)(FlashMessagesList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { increaseLike } from "../../actions/players";
import { bindActionCreators } from "redux";

class PlayerLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: this.props.player,
      likes: this.props.likes
    };
  }

  handleOnLike = event => {
    this.setState({
      likes: this.state.likes + 1
    });
    this.props.increaseLike(this.props.likes, this.props.player);
    debugger;
  };

  render() {
    const likes = this.state.likes;
    return (
      <div>
        <button onClick={event => this.handleOnLike(this.props.likes)}>
          Like
        </button>
        {likes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.players
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increaseLike: increaseLike
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerLike);

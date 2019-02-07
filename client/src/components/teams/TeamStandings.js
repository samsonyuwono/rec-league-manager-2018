import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTeams } from "../../actions/teams";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import court from "../../assets/court.jpg";
import "../../assets/Table.scss";

class TeamStandings extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const currentUserId = this.props.auth.user.userId;
    const teams = this.props.teams;
    const userTeamStandings = teams
      .filter(team => team.author === currentUserId)
      .sort((a, b) => {
        return b.wins - a.wins;
      });

    const nameFormat = (cell, row) => {
      return (
        <Link className="link-style" to={`/teams/${row._id}`}>
          {cell}
        </Link>
      );
    };

    const percentage = (cell, row) => {
      return <div>{(row.wins / (row.wins + row.losses)).toFixed(3)}</div>;
    };

    return (
      <div className="team-standings">
        <img alt="" className="background-image" src={court} />

        <BootstrapTable
          key={this.props.teams._id}
          data={userTeamStandings}
          bordered={true}
          className="tr-style"
        >
          <TableHeaderColumn dataField="id" isKey hidden>
            {" "}
            ID{" "}
          </TableHeaderColumn>

          <TableHeaderColumn dataField="name" dataFormat={nameFormat}>
            Team
          </TableHeaderColumn>

          <TableHeaderColumn dataField="wins">W</TableHeaderColumn>

          <TableHeaderColumn dataField="losses">L</TableHeaderColumn>

          <TableHeaderColumn dataField="%" dataFormat={percentage}>
            %
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getTeams }
)(TeamStandings);

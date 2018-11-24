import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTeams } from "../../actions/teams";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../assets/Table.scss";

class TeamStandings extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const sortedTeamWins = this.props.teams.sort((a, b) => {
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
      <BootstrapTable
        key={this.props.teams._id}
        data={this.props.teams}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { getTeams }
)(TeamStandings);

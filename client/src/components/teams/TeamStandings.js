import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTeams } from '../../actions/teams'
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import '../../assets/Table.css'

class TeamStandings extends Component{

  componentDidMount(){
    this.props.getTeams()
  }

  render(){
      const sortedTeamWins = this.props.teams.sort((a,b) => { return b.wins - a.wins})
    return(
      <BootstrapTable data={this.props.teams} bordered={true} className='tr-style'>
        <TableHeaderColumn dataField='id' isKey hidden> ID </TableHeaderColumn>

        <TableHeaderColumn dataField='name'> Name </TableHeaderColumn>

        <TableHeaderColumn dataField='wins'> Wins </TableHeaderColumn>

        <TableHeaderColumn dataField='losses'> Losses </TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    teams: state.teams
  })
}

export default connect (mapStateToProps, {getTeams})(TeamStandings)

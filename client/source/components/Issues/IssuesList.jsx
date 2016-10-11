import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

//Bootstrap 
import { Grid, Row, Col, Table, Button, Form, FormGroup, FormControl, ControlLabel, Well, Panel } from 'react-bootstrap';

// Placeholder recipe data 
import placeholders from '../../../../placeholders'

// Axios 
var axios = require('axios'); 

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuesList: []
    }
  }

  componentWillMount() {
    var usernameParameter = this.props.params.username; 
    var recipeParameter = this.props.params.recipe; 

    axios.get(`/${usernameParameter}/${recipeParameter}/get-issues`)
    .then((result)=> {
      var issuesList = result.data; 
      console.log('ISSUES: ', issuesList);       
      this.setState({
        issuesList: issuesList
      }); 
    })
    .catch((error) => {
      console.log(error); 
    }); 
  }

  handleClick(event) {
    event.preventDefault(); 
    var index = event.target.id; 
    var issueObject = this.state.issuesList[index]; 
    console.log('ISSUE OBJECT'); 
    console.log(issueObject); 
    this.props.handleViewSingleIssueClick(issueObject); 
  }

  render () {
    return (
      <Grid style={{border: "1px solid rgba(128,128,128, 0.2)", borderRadius: 10}}>
        <Row style={{background: 'rgba(128,128,128, 0.2)', height: 35, borderTopRightRadius: 10, borderTopLeftRadius: 10}}> 
          <h4 style={{fontWeight: 'bold', marginLeft: 10}}> Issues </h4>
        </Row> 
        <Row style={{borderBottom: "1px solid rgba(0,0,0, 0.2)"}}> 
          <Col xs={6} md={6} > 
            <h4>Details about the filter</h4>
          </Col> 
          <Col xs={2} md={2}> 
            <h4>Author</h4> 
          </Col> 
          <Col xs={2} md={2}> 
            <h4>Issue Type</h4> 
          </Col> 
          <Col xs={2} md={2}> 
            <h4>Issue Position</h4> 
          </Col> 
        </Row>
        {this.state.issuesList.map((issue, i) => {
          return (
            <Row key={i} style={{borderBottom: "1px solid rgba(0,0,0, 0.2)"}}> 
              <Col xs={6} md={6} > 
                <h4 onClick={this.handleClick.bind(this)} id={i}>{"issue.title"}</h4>
                <h6> issue #{issue._id.slice(0,6)} created {issue.createdAt.slice(0,10)}</h6> 
              </Col> 
              <Col xs={2} md={2}> 
                <h5>{issue.issueCreator}</h5> 
              </Col> 
              <Col xs={2} md={2}> 
                <h5>{issue.type}</h5> 
              </Col> 
              <Col xs={2} md={2}> 
                <h5>{issue.position}</h5> 
              </Col> 
            </Row>
            )
        })}
      </Grid> 
    )
  }
}

export default IssuesList; 


// <Row height={50}> 
//   <Col xs={6} md={6}> 
//     <h2 id={pullRequest.sendingUser} onClick={handleUserClick.bind(this)}> sent from {pullRequest.sendingUser} </h2> 
//     <h4 id={pullRequest.sendingUser}> pull request submitted at {pullRequest.createdAt} </h4>
//   </Col> 
//   <Col xs={4} md={4} style={{marginTop: 20}}> 
//     <Button 
//       data-username={username}
//       data-recipe={pullRequest.targetVersion}
//       data-branch={'master'}
//       data-version={pullRequest.targetVersion}
//       data-pulluser={pullRequest.sendingUser}
//       data-pullrecipe={pullRequest.targetVersion}
//       data-pullrequest={JSON.stringify(pullRequest)}
//       onClick={handlePullRequestClick.bind(this)}> 
//         Manage Pull Request 
//     </Button> 
//   </Col>
//   <Col xs={2} md={2} style={{marginTop: 20}}> 
//     <h4> status </h4> 
//     <Badge>{pullRequest.status}</Badge>
//   </Col>
// </Row>
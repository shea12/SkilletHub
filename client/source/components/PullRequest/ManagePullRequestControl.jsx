import React, {Component} from 'react';
import { Grid, Row, Col, Table, Button, Panel, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Well, Glyphicon } from 'react-bootstrap';

class PullRequestControl extends React.Component {

  constructor(props) {
    super(props);

  }

  // handleApprovePullRequest(event){
  //   event.preventDefault(); 
  // }

  // handleDenyPullRequest(event){
  //   event.preventDefault(); 
  // }

  // handleEditPullRequest(event){
  //   event.preventDefault(); 

  // }

  _renderPullRequestControl(){
    if (this.props.username) {
      return (
        <div style={{marginTop: 25, float: "right"}}> 
          <ButtonGroup style={{marginRight: 10}}>
            <Button id="edit" type="submit" onClick={this.props.handleClick.bind(this)}>edit recipe</Button>
            <Button id="pull" type="submit" onClick={this.props.handleClick.bind(this)}>create pull request</Button>
          </ButtonGroup>
          <Button id="cook" type="submit" bsStyle="success" onClick={this.props.handleClick.bind(this)}>cook recipe</Button>
        </div> 
      )
    } else {
      return (
        <ButtonGroup style={{marginTop: 25, float: "right"}}>
          <Button id="fork" type="submit" bsStyle="success" onClick={this.props.handleClick.bind(this)}>fork recipe</Button>
        </ButtonGroup>
      )
    }
  }

  render() {
    return (
      <Grid style={{border: "1px solid rgba(128,128,128, 0.2)", borderRadius: 10, marginTop: 15, marginBottom: 15}}>
        <Row> 
          <h3 style={{marginLeft: 10}}> {this.props.username} / {this.props.recipename}</h3>
        </Row>
        <Row> 
          <Col xs={3} md={3}> 
            <h4> Source Branch </h4> 
            <Panel >
              {this.props.sourceBranch}
            </Panel>
          </Col> 
          <Col xs={3} md={3}> 
            <h4> Source Version </h4> 
            <Panel >
              {this.props.sourceVersion}
            </Panel>
          </Col> 
          <Col xs={3} md={3}> 
            <h4> Recipe Branch </h4> 
            <Panel >
              {this.props.pullBranch}
            </Panel>
          </Col> 
          <Col xs={3} md={3}> 
            <h4> Recipe Version </h4> 
            <Panel >
              {this.props.pullVersion}
            </Panel>
          </Col> 
        </Row> 
        <Well> 
          <Row> 
            <Col xs={4} md={4} style={{margin: 'auto'}}> 
              <h4> Approve Pull Request </h4> 
              <h6> This will automatically merge your recipe with the pull request, creating a new version of your recipe </h6>
              <Button id="approve" data-username={this.props.username} data-pullId={this.props.pullId} bsStyle="success" style={{width: "100%"}} onClick={this.props.handlePullRequestResponse.bind(this)}> Approve </Button>
            </Col> 
            <Col xs={4} md={4} style={{margin: 'auto'}}> 
              <h4> Deny Pull Request </h4> 
              <h6> This will cancel the pending pull request and will not change your original recipe </h6> 
              <Button id="deny" data-username={this.props.username} data-pullId={this.props.pullId} bsStyle="danger" style={{width: "100%"}} onClick={this.props.handlePullRequestResponse.bind(this)}> Deny </Button>
            </Col> 
            <Col xs={4} md={4} style={{margin: 'auto'}}> 
              <h4> Edit Pull Request </h4> 
              <h6> This will allow you to edit the pull request and then automatically create a new version of your recipe </h6> 
              <Button id="edit" data-username={this.props.username} data-pullId={this.props.pullId} bsStyle="warning" style={{width: "100%"}} onClick={this.props.handlePullRequestEdit.bind(this)}> Edit </Button>
            </Col> 
          </Row>
        </Well>
      </Grid> 
    )
  }
}
export default PullRequestControl;

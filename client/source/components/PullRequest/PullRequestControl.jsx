import React, {Component} from 'react';
import { Grid, Row, Col, Table, Button, Panel, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Well, Glyphicon } from 'react-bootstrap';

class PullRequestControl extends React.Component {

  constructor(props) {
    super(props);

  }

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
        </Row> 
        <Well> 
          <Row style={{height: 50}}> 
            <Col xs={3} md={3} style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Button type="submit" bsStyle="success" onClick={this.props.createPullRequest.bind(this)}> Create pull request </Button> 
            </Col> 
            <Col xs={9} md={9}>
              <h5> Create a pull request to discuss and collaborate on this recipe </h5>
              <h6> Utilize the power of taste-driven development for recipes! </h6> 
            </Col>
          </Row>
        </Well>
      </Grid> 
    )
  }
}
export default PullRequestControl;

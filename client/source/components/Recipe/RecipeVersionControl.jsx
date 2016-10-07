import React, {Component} from 'react';
import { Grid, Row, Col, Table, Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Well } from 'react-bootstrap';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

class RecipeVersionControl extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      createBranch: ''
    }
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'createBranch') {
      this.setState({createBranch: event.target.value}); 
    }
  }

  _renderCreateBranch(){
    var branch = this.props.selectedBranch; 
    if (branch === 'create branch') {
      return (
        <form onSubmit={this.props.handleCreateBranch.bind(this)}> 
          <FormGroup>
            <ControlLabel>New Branch</ControlLabel>
              <FormControl type="text" id='createBranch' value={this.state.createBranch} onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <Button type='submit' style={{display: 'none'}}>
            submit
          </Button>
        </form> 
      )
    } else {
      return (
        <FormGroup>
          <ControlLabel>Version</ControlLabel>
          <FormControl componentClass="select" id="unit" onChange={this.props.handleVersionSelect.bind(this)} >
            {this.props.branchVersions.map((version, i)=> (
              <option key={'version' + i} value={version._id}>{version._id} : version {i}</option>
            ))}
          </FormControl>
        </FormGroup>
      )
    }
  }

  _renderButtonGroup(){
    if (this.props.loggedInUserProfile) {
      return (
        <ButtonGroup style={{marginTop: 25, align: "right"}}>
          <Button id="edit" type="submit" onClick={this.props.handleClick.bind(this)}>edit recipe</Button>
          <Button id="cook" type="submit" bsStyle="success" onClick={this.props.handleClick.bind(this)}>cook recipe</Button>
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup style={{marginTop: 25, align: "right"}}>
          <Button id="fork" type="submit" bsStyle="success" onClick={this.props.handleClick.bind(this)}>fork recipe</Button>
        </ButtonGroup>
      )
    }
  }

  render() {
    return (
      <Row> 
        <Col xs={3} md={3}> 
        <FormGroup>
          <ControlLabel>Branch</ControlLabel>
          <FormControl componentClass="select" id="unit" onChange={this.props.handleBranchSelect.bind(this)} value={this.props.selectedBranch}>
            <optgroup label='available branches'> 
            {this.props.recipeBranches.map((branch, i)=> (
              <option key={'branch' + i} value={branch.name}>{branch.name}</option>
            ))}
            </optgroup>
            <optgroup label='new branch'>
              <option key={'create branch'} value={'create branch'}> create branch </option> 
            </optgroup>
          </FormControl>
        </FormGroup>
        </Col> 
        <Col xs={3} md={3}>
          {this._renderCreateBranch()}
        </Col>
        <Col xs={3} md={3} xsOffset={3} mdOffset={3}>
          {this._renderButtonGroup()}
        </Col> 
      </Row> 
    )
  }
}
export default RecipeVersionControl;


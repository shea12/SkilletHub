import React from 'react';

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

class EditStepEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      disabled: true, 
      ingredient: null,
      name: null,
      amount: null,
      unit: null, 
      prep: null, 
      optional: null,
      position: null,

    }; 
  }

  componentWillMount(){
    console.log('MOUNTING EDIT STEP ENTRY!'); 
    var lines = Math.ceil(this.props.step.description.length / 100) * 30; 
    console.log(lines); 
    this.setState({
      description: this.props.step.description,
      lines: lines,
      ingredients: this.props.step.ingredients,
      time: this.props.step.time
    }); 
  }

  // componentWillReceiveProps(){
  //   console.log('INDIVIDUAL COMPONENT RECEIVING PROPS!'); 
  //   console.log(this.props.ingredient.name); 
  //   var unitsMenu = units.slice(0);
  //   unitsMenu[0] = this.props.ingredient.unit;  
  //   this.setState({
  //     ingredient: this.props.ingredient,
  //     name: this.props.ingredient.name,
  //     amount: this.props.ingredient.amount,
  //     unit: this.props.ingredient.unit,
  //     unitsMenu: unitsMenu, 
  //     prep: this.props.ingredient.prep,
  //     optional: this.props.ingredient.optional,
  //     position: this.props.ingredient.position
  //   }); 
  // }

  handleClick (event) {
    event.preventDefault(); 
    console.log('Attempting to edit ingredient!'); 
    console.log(this.state); 
    this.setState({
      changed: true, 
      disabled: false
    }); 
  }

  handleDelete (event) {
    event.preventDefault(); 
    console.log('Attempting to delete ingredient!'); 
    console.log(this.state.description); 
    // this.props.handleDeleteIngredient(this.state); 
    // this.setState({
    //  display: 'none'
    // }); 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'description') {
      var lines = Math.ceil(event.target.value.length / 100) * 30; 
      console.log(lines); 
      this.setState({
        description: event.target.value,
        line: lines
      }); 
    }
  }

  render() {
    return (
      <Grid>
        <Row> 
          <Col xs={8} md={8} style={{margin: 5}}>
            <FormGroup>
              <ControlLabel> Step Description </ControlLabel>
              <FormControl componentClass="textarea" type="text" style={{height: this.state.lines}} id="description" value={this.state.description} onChange={this.handleChange.bind(this)} disabled={this.state.disabled} />
            </FormGroup>
          </Col>
          <Button type="submit" style={{marginTop: 30, padding: 10}} onClick={this.handleClick.bind(this)}>
            Edit
          </Button>
          <Button type="submit" style={{marginTop: 30, padding: 10}} onClick={this.handleDelete.bind(this)} disabled={this.state.disabled}>
            Delete
          </Button>
        </Row>
        <Row> 
          <Col xs={4} md={4} style={{margin: 5}}>
            <h4> Ingredients: {this.state.ingredients.join(', ')} </h4>
          </Col>
          <Col xs={4} md={4} style={{margin: 5}}>
            <h4> Time: {this.state.time} minutes </h4>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default EditStepEntry;

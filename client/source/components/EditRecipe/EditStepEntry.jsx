import React from 'react';

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const timesRegEx = [/\d+\s?sec/, /\d+\s?min/, /\d+\s?hr/, /\d+\s?hour/]; 

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
      position: null
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
      parsedIngredients: this.props.step.ingredients, 
      availableIngredients: this.props.availableIngredients, 
      time: this.props.step.time
    }); 
  }

  handleClick (event) {
    event.preventDefault(); 
    this.setState({
      changed: true, 
      disabled: false
    }); 
  }

  handleDelete (event) {
    event.preventDefault(); 
    console.log('Attempting to delete step!'); 
    console.log(this.state.description); 
  }

  timeParse (string) {
    var match = []; 
    timesRegEx.forEach((timeRegEx) => {
      var time = timeRegEx.exec(string); 
      if (time) {
        // console.log(time); 
        match.push(time); 
      } 
    });
    return match; 
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'description') {
      var description = event.target.value; 

      // Set height of the text box based on string length 
      var lines = Math.ceil(description.length / 100) * 30; 
      this.setState({
        changed: true, 
        description: description,
        line: lines
      }); 

      // Parse for ingredients 
      var availableIngredients = this.props.availableIngredients; 
      var parsedIngredients = this.state.parsedIngredients;
      availableIngredients.forEach((ingredient) => {
        var regEx = RegExp(ingredient, 'i');
        var parsedIngredient = regEx.exec(description); 
        if (parsedIngredient && parsedIngredients.indexOf(parsedIngredient[0]) === -1) {
          parsedIngredients.push(parsedIngredient[0])
        }
      });
      this.setState({
        parsedIngredients: parsedIngredients
      }); 

      // Parse for time 
    }
  }


  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'description') {
      var availableIngredients = this.props.availableIngredients; 
      // console.log(availableIngredients); 
      var parsedIngredients = this.state.parsedIngredients; 
      var description = event.target.value; 
      // console.log('Description: ', description); 
      availableIngredients.forEach((ingredient) => {
        var regEx = RegExp(ingredient, 'i');
        var parsedIngredient = regEx.exec(description); 
        // console.log(parsedIngredient); 
        if (parsedIngredient && parsedIngredients.indexOf(parsedIngredient[0]) === -1) {
          console.log('Matched an ingredient: ', parsedIngredient); 
          parsedIngredients.push(parsedIngredient[0])
        }
      });
      this.setState({
        description: event.target.value,
        parsedIngredients: parsedIngredients
      }); 
      var time = this.timeParse(description); 
      // console.log('TIME IS: ', time); 
      var stepTime = this.state.stepTime; 
      if (time && !stepTime) {
        console.log('SETTING TIME: ', time); 
        this.setState({
          stepTime: time[0]
        }); 
      }
    } 
  }

  _renderTime(){
    if (this.props.step.time) {
      return (
        <Col xs={4} md={4} style={{margin: 5}}>
          <h4> Time: {this.state.time} minutes </h4>
        </Col>
      )
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
          {this._renderTime()}
        </Row>
      </Grid>
    )
  }
}

export default EditStepEntry;

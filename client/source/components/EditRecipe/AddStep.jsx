import React from 'react';

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

var units = ['unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 

class AddStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: true,
      name: null,
      amount: null,
      unit: null, 
      prep: null, 
      optional: null,
      position: null,
      validationState: ""   
    }; 
  }

  componentWillMount(){
    this.setState({
      unitsMenu: units
    }); 
  }

  handleClick (event) {
    event.preventDefault(); 
    console.log('Clicking in Add Step!'); 
    // if (this.state.name === null || this.state.amount === null || this.state.unit === null) {
    //   this.setState({
    //     validationState: "error"
    //   }); 
    // } else {
    //   this.setState({
    //     changed: true,
    //     name: "",
    //     amount: "",
    //     unit: "", 
    //     prep: "", 
    //     optional: "",
    //     position: "",
    //     validationState: ""     
    //   }); 
    // }
  }

  handleChange (event) {
    var inputType = event.target.id; 
    if (inputType === 'name') {
      this.setState({name: event.target.value}); 
    } else if (inputType === 'amount') {
      this.setState({amount: event.target.value}); 
    } else if (inputType === 'unit') {
      this.setState({unit: event.target.value}); 
    } else if (inputType === 'prep') {
      this.setState({prep: event.target.value}); 
    } else if (inputType === 'optional') {
      this.setState({optional: event.target.value}); 
    } 
  }

  render() {
    return (
      <Row> 
        <Form inline >
        <Col xs={2} md={2} style={{margin: 5}}>
          <FormGroup controlId="name" validationState={this.state.validationState}>
            <FormControl type="text" placeholder={'add ingredient here'} value={this.state.name} onChange={this.handleChange.bind(this)} required={'true'} />
          </FormGroup>
        </Col>
        <Col xs={2} md={2} style={{margin: 5}}>
          <FormGroup controlId="amount" validationState={this.state.validationState}>
            <FormControl type="number" value={this.state.amount} onChange={this.handleChange.bind(this)} required={'true'} />
          </FormGroup>
        </Col>
        <Col xs={1} md={1} style={{margin: 5}}>
              <FormGroup controlId="unit" validationState={this.state.validationState}>
                <FormControl componentClass="select" onChange={this.handleChange.bind(this)} required={true}>
                  {this.state.unitsMenu.map((unit, i)=> (
                    <option key={'unit' + i} value={unit}>{unit}</option>
                  ))}
                </FormControl>
              </FormGroup>
        </Col>
        <Col xs={2} md={2} style={{margin: 5}}>
          <FormGroup controlId="prep">
            <FormControl type="text" value={this.state.prep} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
        </Col>
        <Col xs={2} md={2} style={{margin: 5}}>
          <FormGroup controlId="optional">
            <FormControl type="text" value={this.state.optional} onChange={this.handleChange.bind(this)}/>
          </FormGroup>
        </Col> 
          <Button type="submit" style={{margin: 5}} onClick={this.handleClick.bind(this)} onSubmit={this.handleClick.bind(this)} >
            Add
          </Button>
        </Form>
      </Row>
    )
  }
}

export default AddStep;
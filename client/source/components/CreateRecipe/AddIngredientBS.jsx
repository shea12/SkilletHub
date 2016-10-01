import React from 'react';

//Bootstrap 
import { Grid, Row, Col, FormGroup, FormControl, Button, Jumbotron, Carousel, Container, ControlLabel } from 'react-bootstrap';

var units = ['select unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 
var volume = ['tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.']; 
var mass = ['g', 'kg', 'oz.', 'lbs']; 
var other = ['whole']; 

class AddIngredient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: true, 
			name: '',
			amount: '', 
			unit: '',
			prep: '', 
			optional: '', 
			type: null,
			position: null
		}; 
	}

	componentWillMount(){
		this.setState({
			position: this.props.number
		}); 
	}

	handleClick (event) {
		event.preventDefault(); 
		var newIngredient = this.state; 
		this.props.handleAddIngredient(newIngredient);
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

	render () {
		return (
			<Grid>
			  <form onSubmit={this.handleClick.bind(this)}>
			<Row className="show-grid">
			  <Col xs={4} md={4}> 
			  		<FormGroup>
			        <ControlLabel> IngredientName </ControlLabel>
			        <FormControl type="text" id="name" onChange={this.handleChange.bind(this)} value={this.state.name} />
			        </FormGroup>
			  </Col>
			  <Col xs={4} md={4}> 
			  		<FormGroup>
			        <ControlLabel> Quantity </ControlLabel>
			        <FormControl type="text" id="amount" onChange={this.handleChange.bind(this)} value={this.state.amount} />
			        </FormGroup>
			  </Col>
			  <Col xs={4} md={4}> 
		          <FormGroup>
		            <ControlLabel>Units</ControlLabel>
		            <FormControl componentClass="select" id="unit" onChange={this.handleChange.bind(this)} >
		              {units.map((unit)=> (
		              	<option value={unit}>{unit}</option>
		              ))}
		            </FormControl>
		          </FormGroup>
			  </Col>
			</Row>
			<Row className="show-grid" style={{padding: 5}}>
			  <Col xs={6} md={6}> 
			  		<FormGroup>
			        <ControlLabel> Preparation </ControlLabel>
			        <FormControl type="text" id="prep" onChange={this.handleChange.bind(this)} value={this.state.prep} />
			        </FormGroup>
			  </Col>
			  <Col xs={6} md={6}> 
			  		<FormGroup>
			        <ControlLabel> Additional Notes </ControlLabel>
			        <FormControl type="text" id="optional" onChange={this.handleChange.bind(this)} value={this.state.optional} />
			        </FormGroup>
			  </Col>
			</Row>
			<Row className="show-grid">
			  <button style={{display: 'none'}} type="submit"onClick={this.handleClick.bind(this)}> Next Step </button> 
			</Row>
			</form>
			</Grid>
		); 	
	}
}

export default AddIngredient;
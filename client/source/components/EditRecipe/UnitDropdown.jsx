import React, { Component } from 'react';

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const units = ['select unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 

class UnitDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			changed: false,
			unit: null, 
			unitsMenu: null
		} 
	}

	componentWillMount() {
		var unitsMenu = units.slice(1);
		unitsMenu[0] = this.props.currentUnit;  
		this.setState({
			unit: this.props.currentUnit, 
			unitsMenu: unitsMenu
		}); 
	}

	render(){
	  	return (
		  	<Col xs={2} md={2}> 
	          <FormGroup controlId="formControlsSelect">
	            <FormControl componentClass="select" id="unit" onChange={this.props.onChange.bind(this)}>
	              <option key={'currentUnit'} value={this.state.unit}>{this.state.unit}</option>
	              <option divider />
	              {this.state.unitsMenu.map((unit, i)=> (
	              	<option key={'unit'+i} value={unit}>{unit}</option>
	              ))}
	            </FormControl>
	          </FormGroup>
		  	</Col>
	  	)
	}
}

export default UnitDropdown; 


		  	// <Col xs={2} md={2}> 
	    //       <FormGroup controlId="formControlsSelect">
	    //         <FormControl componentClass="select" id="unit" onChange={this.props.onChange.bind(this)}>
	    //           {this.state.unitsMenu.map((unit, i)=> (
	    //           	<option key={'unit'+i} value={unit}>{unit}</option>
	    //           ))}
	    //         </FormControl>
	    //       </FormGroup>
		  	// </Col>
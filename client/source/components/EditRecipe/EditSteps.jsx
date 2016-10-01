import React from 'react';
import EditStepEntry from './EditStepEntry'; 
// import AddStep from './AddStep'; 

//Bootstrap 
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Container, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const units = ['select unit', 'tsp.', 'tbsp.', 'fl.oz.', 'cup', 'pt.', 'qt.', 'gal.', 'g', 'kg', 'oz.', 'lbs', 'whole']; 
const headers = [['Ingredient', 2], ['Quantity', 2], ['Unit', 1], ['Preparation', 2], ['Notes', 2]]; 

import meatloafRecipe from '../../../../meatloafRecipe'

class EditStepsMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Grid>
        <Row> 
          {this.props.steps.map((step, i) => (
            <EditStepEntry key={i} step={step} />
          ))}
        </Row>
      </Grid>
    );  
  }
}

export default EditStepsMain;

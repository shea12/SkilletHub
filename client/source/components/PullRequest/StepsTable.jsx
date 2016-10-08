import React, {Component} from 'react';
import { Grid, Row, Col, Table, Glyphicon } from 'react-bootstrap';

class StepsTable extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderDescription(step) {
    if (step.edited) {
      return (
        <p style={{font: 20, marginTop: 5, backgroundColor: 'rgba(255, 240, 179, 0.7)'}}>{step.description}</p>
      )
    } else if (step.added) {
      return (
        <p style={{font: 20, marginTop: 5, backgroundColor: 'rgba(219, 255, 219, 0.7)'}}>{step.description}</p>
      )
    } else {
      return (
        <p style={{font: 20, marginTop: 5}}>{step.description}</p>
      )
    }
  }

  render() {
    return (
          <Row style={{border: "1px solid rgba(128,128,128, 0.2)", borderRadius: 10, margin: 5}}>
            {this.props.steps.map((step) => {
              return (
                <Row key={step.position}> 
                  <Col xs={10} xsOffset={1} md={10} mdOffset={1} style={{borderBottom: "1px solid rgba(0,0,0, 0.2)"}}> 
                    <h4>Step {step.position}</h4>
                  </Col> 
                  <Col xs={10} xsOffset={1} md={10} mdOffset={1}> 
                    {this._renderDescription(step)}
                    <h5> Ingredients: {step.ingredients.join(', ')} </h5>
                  </Col> 
                </Row>
                )
            })}
          </Row> 
    )
  }
}

export default StepsTable; 
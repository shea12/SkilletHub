import React, {Component} from 'react';

//Bootstrap 
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';

export default ({readME}) => {
  return (
		    <Grid style={{border: "1px solid rgba(128,128,128, 0.2)", borderRadius: 10}}>
		    	<Row style={{background: 'rgba(128,128,128, 0.2)', height: 35, borderTopRightRadius: 10, borderTopLeftRadius: 10}}> 
		    		<h4 style={{fontWeight: 'bold', marginLeft: 10}}> README.md </h4>
			    </Row> 
			    {readME.map((step) => {
			      return (
			      	<Row key={step.position}> 
					      <Col xs={10} xsOffset={1} md={10} mdOffset={1} style={{borderBottom: "1px solid rgba(0,0,0, 0.2)"}}> 
					      	<h4>Step {step.position}</h4>
					      </Col> 
					      <Col xs={10} xsOffset={1} md={10} mdOffset={1}> 
					      	<p style={{font: 20, marginTop: 5}}>{step.description}</p>
					      	<h5> Ingredients: {step.ingredients.join(', ')} </h5>
					      </Col> 
				      </Row>
			      	)
			    })}
		    </Grid> 
  ); 
}

// export default ({readME}) => {
//   return (
// 		  <div>
// 		    <ul className="ReadME List" >
// 		    {readME.map((step) => {
// 		      return (
// 		      	<li key={step.position}> 
// 			      <div> 
// 			      	<h5>Step: {step.position}</h5>
// 			      	<p style={{font: 16}}>{step.description}</p>
// 			      	<h6> Ingredients: {step.ingredients.join(', ')} </h6>
// 			      </div> 
// 		      	</li> 
// 		      	)
// 		    })}
// 		    </ul>
// 		  </div>
//   ); 
// }
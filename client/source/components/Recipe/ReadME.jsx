import React, {Component} from 'react';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

export default ({readME}) => {
  return (
		<div className="row">
		  <div>
		    <ul className="ReadME List" >
		    {readME.map((step) => {
		      return (
		      	<li key={step.position}> 
			      <div> 
			      	<h5>Step: {step.position}</h5>
			      	<p style={{font: 16}}>{step.description}</p>
			      	<h6> Ingredients: {step.ingredients.join(', ')} </h6>
			      </div> 
		      	</li> 
		      	)
		    })}
		    </ul>
		  </div>
		</div>
  ); 
}
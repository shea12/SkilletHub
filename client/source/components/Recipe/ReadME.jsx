import React, {Component} from 'react';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 
var count = 1; 

export default ({readME}) => {
  return (
		<div className="row">
		  <div>
		    <ul className="ReadME List" >
		    {readME.map((step) => {
		      return (
		      	<li key={count++}> 
			      <div> 
			      	<p>{step.description}</p>
			      </div> 
		      	</li> 
		      	)
		    })}
		    </ul>
		  </div>
		</div>
  ); 
}
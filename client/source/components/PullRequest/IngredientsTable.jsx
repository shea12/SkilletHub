import React, {Component} from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

// TODO: Confirm ingredient object structure, ensure that key refers to the proper value 
// TODO: Add headers for the 'Ingredient', 'Quantity', 'Unit' and other fields. 

class IngredientsTable extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderIngredientName(ingredient){ 
    console.log('Firing render function!'); 
    if (ingredient.prep) {
      return (
        <p> {`${ingredient.name}, ${ingredient.prep}`} </p>
      )
    } else {
      return (
        <p> {`${ingredient.name}`} </p>
      ) 
    }
  } 

  // _renderIngredientStatus(ingredient) {
  //   if (ingredient.changed) {
  //     return (
  //       <tr style={{background: 'yellow'}}>
  //         <td> {this._renderIngredientName(ingredient)} </td>
  //         <td> {ingredient.amount} </td>
  //         <td> {ingredient.unit} </td>
  //       </tr>
  //     )
  //   } else if (ingredient.added) {
  //     return (
  //       <tr style={{background: 'yellow'}}>
  //         <td> {this._renderIngredientName(ingredient)} </td>
  //         <td> {ingredient.amount} </td>
  //         <td> {ingredient.unit} </td>
  //       </tr>
  //     )
  //   } else if (ingredient.deleted) {
  //     return (
  //       <tr style={{background: 'red'}}>
  //         <td> {this._renderIngredientName(ingredient)} </td>
  //         <td> {ingredient.amount} </td>
  //         <td> {ingredient.unit} </td>
  //       </tr>
  //     )
  //   }
  // }

  _renderIngredientStatus(ingredient) {
    if (ingredient.edited) {
      // return 'rgba(224, 209, 41, 0.5)'; 
      return 'rgba(179, 252, 255, 0.7)'; 
    } else if (ingredient.added) {
      // return 'rgba(97, 210, 55, 0.5)'; 
      return 'rgba(219, 255, 219, 0.7)'; 
    } else if (ingredient.deleted) {
      // return 'rgba(210, 55, 55, 0.5)'; 
      return 'rgba(255, 221, 220, 0.7)'; 
    }
    return 'white'; 
  }


  render() {
    return (
          <Table bordered width={'100%'}> 
            <thead> 
              <tr>
                <th data-field="ingredient">Ingredient</th>
                <th data-field="quantity">Quantity</th>
                <th data-field="unit">Unit</th>
              </tr>
            </thead>
            <tbody> 
              {this.props.ingredientList.map((ingredient, i) => {
                return (
                <tr key={'ingredient' + i} style={{backgroundColor: this._renderIngredientStatus(ingredient)}}>
                  <td> {this._renderIngredientName(ingredient)} </td>
                  <td> {ingredient.amount} </td>
                  <td> {ingredient.unit} </td>
                </tr>
                  )
              })}
            </tbody>
          </Table>
    ); 
  }

}

export default IngredientsTable;

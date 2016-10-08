import React, {Component} from 'react';
import { Grid, Row, Col, Table, Glyphicon } from 'react-bootstrap';

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
       <p style={{display: 'inline-block', marginLeft: 5}}>{`${ingredient.name}, ${ingredient.prep}`}</p>
      )
    } else {
      return (
        <p style={{display: 'inline-block', marginLeft: 5}}>{`${ingredient.name}`}</p>
      ) 
    }
  } 

  _renderIngredientColor(ingredient) {
    if (ingredient.edited) {
      // return 'rgba(224, 209, 41, 0.5)'; 
      // return 'rgba(179, 252, 255, 0.7)'; -> blue
      return 'rgba(255, 240, 179, 0.7)'; 
    } else if (ingredient.added) {
      // return 'rgba(97, 210, 55, 0.5)'; 
      return 'rgba(219, 255, 219, 0.7)'; 
    } else if (ingredient.deleted) {
      // return 'rgba(210, 55, 55, 0.5)'; 
      return 'rgba(255, 221, 220, 0.7)'; 
    }
    return 'white'; 
  }

  _renderIngredientEffect(ingredient) {
    if (ingredient.deleted) {
      return 'line-through'; 
    }
  }

  _renderGlyphicon(ingredient) {
    if (ingredient.edited) {
      return (
        <Glyphicon glyph="refresh" bsSize="large" style={{color: 'rgba(255, 221, 87, 1)', display: 'inline-block'}} />
      )
    } else if (ingredient.added) {
      return (
        <Glyphicon glyph="plus" bsSize="large" style={{color: 'rgba(112, 255, 112, 1)', display: 'inline-block'}} />
      )
    } else if (ingredient.deleted) {
      return (
        <Glyphicon glyph="remove" bsSize="large" style={{color: 'rgba(255, 73, 66, 1)', display: 'inline-block'}} />
      )
    }
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
                <tr key={'ingredient' + i} style={{backgroundColor: this._renderIngredientColor(ingredient)}}>
                  <td> {this._renderGlyphicon(ingredient)} {this._renderIngredientName(ingredient)} </td>
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

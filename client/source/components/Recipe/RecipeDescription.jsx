import React, { Component } from 'react';

export default ({recipeDescription}) => {
  return (
      <div>
        <span className="title">{recipeDescription.name}</span>
        <img style={{maxWidth: '150px', maxHeight: '150px'}} src={recipe.image} alt="http://sharing.kshb.com/sharekgtv/photo/2014/08/15/instant_ramen_noodles_1408131512923_7390899_ver1.0_640_480.jpg"/>
        <div> 
          <span> yield: {recipeDescription.serves} </span>
          <span> active time: {recipeDescription.activeTime} </span>
          <span> total time: {recipeDescription.totalTime} </span>
          <p> {recipeDescription.description} </p> 
        </div>
      </div>
  ); 
}
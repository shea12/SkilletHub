////////
// INGREDIENTS 
////// 

var testIngredient1 = {
    changed: true,
    name: 'beef fillets',                 //name of ingredient
    type: null,                 //type of ingredient (dairy, meat, vegetable, etc)
    position: 1,             //Order of ingredients
    amount: 400,               //OPTIONAL: Amount of ingredient
    unit: 'g',                 //OPTIONAL: Unit of ingredient (cups, tbsp, etc)
    prep: '',                 //OPTIONAL: Preperation of ingredient (chopped, diced)
    substitutes: null,         //Optional: Substitute ingredients for that ingredient
    optional: null             //Whether ingredient is necessary
  }

 
var testIngredient2 = {
    changed: true,
    name: 'wild mushrooms',                 
    type: null,                 
    position: 2,             
    amount: 500,              
    unit: 'g',                 
    prep: 'cleaned',                 
    substitutes: null,         
    optional: null             
  }

var testIngredient3 = {
  changed: true,
  name: 'puff pastry',                 
  type: null,                 
  position: 3,             
  amount: 500,              
  unit: 'g',                 
  prep: null,                 
  substitutes: null,         
  optional: null            
}

var testIngredient4 = {
  changed: true,
  name: 'egg yolks',                 
  type: null,                 
  position: 4,             
  amount: 2,              
  unit: 'whole',                 
  prep: 'beaten with a pinch of salt',                 
  substitutes: null,         
  optional: null             
}

var testIngredient5 = {
  changed: true,
  name: 'shallots',                 
  type: null,                 
  position: 5,             
  amount: 4,              
  unit: 'whole',                 
  prep: 'peeled and sliced',                 
  substitutes: null,         
  optional: null            
}

var testIngredient6 = {
  changed: true,
  name: 'bottle red wine',                 
  type: null,                 
  position: 6,             
  amount: 1,              
  unit: 'whole',                 
  prep: 'not for drinking',                 
  substitutes: null,         
  optional: null             
}

var wellingtonIngredients = [testIngredient1, testIngredient2, testIngredient3, testIngredient4, testIngredient5, testIngredient6];

////////
// STEPS 
////// 

var testStep1 = {
  changed: true, 
  position: 1, 
  description: "Wrap each piece of beef tightly in a triple layer of cling film to set its shape, then chill overnight.",
  time: null,                 //OPTIONAL: Time to complete step
  ingredients: ['beef fillets'] 
}

var testStep2 = {
  changed: true, 
  position: 2, 
  description: "Remove the cling film, then quickly sear the beef fillets in a hot pan with a little olive oil for 30-60 seconds until browned all over and rare in the middle. Remove from the pan and leave to cool.",
  time: 1,                 //OPTIONAL: Time to complete step
  ingredients: ['olive oil', 'beef fillets'] 
}

var testStep3 = {
  changed: true, 
  position: 3, 
  description: "Finely chop the mushrooms and fry in a hot pan with a little olive oil, the thyme leaves and some seasoning. When the mushrooms begin to release their juices, continue to cook over a high heat for about 10 minutes until all the excess moisture has evaporated and you are left with a mushroom paste (known as a duxelle).",
  ingredients: ['wild mushrooms', 'olive oil','thyme leaves'] 
}

var testStep4 = {
  changed: true, 
  position: 4, 
  description: "Cut the pastry in half, place on a lightly floured surface and roll each piece into a rectangle large enough to envelop one of the beef fillets. Chill in the refrigerator.",
  ingredients: ['puff pastry'] 
}

var testStep5 = {
  changed: true, 
  position: 4, 
  description: "Season the beef fillets, then place them on top of the mushroom-covered ham. Using the cling film, roll the Parma ham over the beef, then roll and tie the cling film to get a nice, evenly thick log. Repeat this step with the other beef fillet, then chill for at least 30 minutes.",
  ingredients: ['beef fillets', 'wild mushrooms', 'Parma ham'] 
}

var testStep6 = {
  changed: true, 
  position: 4, 
  description: "Prepare the red wine sauce. Heat the oil in a large pan, then fry the beef trimmings for a few minutes until browned on all sides. Stir in the shallots with the peppercorns, bay and thyme and continue to cook for about 5 minutes, stirring frequently, until the shallots turn golden brown.",
  ingredients: ['bottle red wine', 'beef trimmings', 'shallots', 'peppercorns'] 
}



var wellingtonRecipe = {
  name: {
    changed: true, 
    value: 'Beef Wellington'
  },
  picture: {
    changed: true, 
    value: "https://gordonramsay-2938.kxcdn.com/assets/Recipes/_resampled/CroppedFocusedImage108081050-50-APPROVED-Gordons-Wellington2.jpg"
  },
  description: {                            
      changed: true,
      value: "Beef Wellington is a preparation of filet steak coated with pâté (often pâté de foie gras) and duxelles, which is then wrapped in puff pastry and baked. Some recipes include wrapping the coated meat in a crêpe to retain the moisture and prevent it from making the pastry soggy."
  },
  servings: {
    changed: true, 
    value: 'Serves 4 to 6' 
  },  
  cookTime: {                              
    changed: true,
    value: '2 hours',  //Cook time in minutes                         
  },     
  skillLevel: {                             //Recipe difficulty [easy, medium, hard]
    changed: true,
    value: 'Scrum Master'
  },  
  dependencies: [],
  ingredients: wellingtonIngredients,
  steps: [testStep1, testStep2, testStep3, testStep4, testStep5, testStep6],
  tags: [], 
  issues: []
}; 

module.exports = wellingtonRecipe; 
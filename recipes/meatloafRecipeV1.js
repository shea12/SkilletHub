////////
// INGREDIENTS 
////// 


var testIngredient1 = {
    changed: true,
    name: 'small onion',                 //name of ingredient
    type: null,                 //type of ingredient (dairy, meat, vegetable, etc)
    position: 1,             //Order of ingredients
    amount: 0.75,               //OPTIONAL: Amount of ingredient
    unit: 'cup',                 //OPTIONAL: Unit of ingredient (cups, tbsp, etc)
    prep: 'roughly chopped',                 //OPTIONAL: Preperation of ingredient (chopped, diced)
    substitutes: null,         //Optional: Substitute ingredients for that ingredient
    optional: null             //Whether ingredient is necessary
  }

 
var testIngredient2 = {
    changed: true,
    name: 'unsalted butter',                 
    type: null,                 
    position: 2,             
    amount: 2,              
    unit: '.tbsp',                 
    prep: null,                 
    substitutes: null,         
    optional: null             
  }

var testIngredient3 = {
  changed: true,
  name: 'pork',                 
  type: null,                 
  position: 3,             
  amount: 12,              
  unit: '.oz',                 
  prep: 'freshly ground',                 
  substitutes: null,         
  optional: null            
}

var testIngredient4 = {
  changed: true,
  name: 'beef',                 
  type: null,                 
  position: 4,             
  amount: 1.25,              
  unit: 'lbs',                 
  prep: 'freshly ground',                 
  substitutes: null,         
  optional: null             
}

var testIngredient5 = {
  changed: true,
  name: 'large eggs',                 
  type: null,                 
  position: 5,             
  amount: 2,              
  unit: 'whole',                 
  prep: null,                 
  substitutes: null,         
  optional: null            
}

var testIngredient6 = {
  changed: true,
  name: 'cheddar, provolone, Monterey Jack, or Muenster cheese',                 
  type: null,                 
  position: 6,             
  amount: 4,              
  unit: '.oz',                 
  prep: 'finely grated',                 
  substitutes: null,         
  optional: null             
}

var meatloafIngredients = [testIngredient1, testIngredient2, testIngredient3, testIngredient4, testIngredient5, testIngredient6];

////////
// STEPS 
////// 

var testStep1 = {
  changed: true, 
  position: 1, 
  description: "Combine the chicken stock and buttermilk in a liquid measuring cup and sprinkle the gelatin evenly over the top. Set aside.",
  time: null,                 //OPTIONAL: Time to complete step
  ingredients: ['chicken stock', 'buttermilk'] 
}

var testStep2 = {
  changed: true, 
  position: 2, 
  description: "Heat the butter in a 10-inch nonstick skillet over medium-high heat until foaming. Add the chopped vegetable mixture and cook, stirring and tossing frequently, until it is softened and most of the liquid has evaporated, about 5 minutes; the mixture should start to darken a bit. Stir in the buttermilk mixture, bring to a simmer, and cook until reduced by half, about 10 minutes.",
  time: 10,                 //OPTIONAL: Time to complete step
  ingredients: ['chicken stock', 'buttermilk'] 
}

var testStep3 = {
  changed: true, 
  position: 3, 
  description: "Add the meat mixture to the bowl, along with the eggs, cheese, parsley, 1 tablespoon salt, and 1 teaspoon pepper. With clean hands, mix gently until everything is thoroughly combined and homogeneous; it will be fairly loose.",
  time: 10,                 //OPTIONAL: Time to complete step
  ingredients: ['beef', 'pork', 'large eggs', 'cheese'] 
}

var meatloafRecipe = {
  name: {
    changed: true, 
    value: 'Five-Star Meatloaf'
  },
  picture: {
    changed: true, 
    value: "http://www.seriouseats.com/recipes/assets_c/2015/08/20150813-meatloaf-food-lab-excerpt-kenji-lopez-alt-25-thumb-1500xauto-425894.jpg"
  },
  description: {                            
      changed: true,
      value: "Americans are proud of their meatloaf, and rightfully so. It's one of our national dishes and deserves a place up on the pedestal, rubbing shoulders with the likes of hamburgers, barbecue, and hot dogs. The very best meatloaf should be tender and moist, with a distinctly soft but never mushy texture."
    },
    servings: {
      changed: true, 
      value: 'Serves 4 to 6' 
    },  
    cookTime: {                              
      changed: true,
      value: 120,  //Cook time in minutes                         
    },     
    skillLevel: {                             //Recipe difficulty [easy, medium, hard]
      changed: true,
      value: 'Junior Dev'
    },  
    dependencies: [],
    ingredients: meatloafIngredients,
    steps: [testStep1, testStep2, testStep3],
    tags: [], 
    issues: []
}; 

module.exports = meatloafRecipe; 
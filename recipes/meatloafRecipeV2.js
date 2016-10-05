////////
// INGREDIENTS 
////// 


var testIngredient1 = {
    changed: true,
    name: 'small onion',                 //name of ingredient
    type: null,                 //type of ingredient (dairy, meat, vegetable, etc)
    position: 1,             //Order of ingredients
    amount: 2,               //OPTIONAL: Amount of ingredient
    unit: 'cup',                 //OPTIONAL: Unit of ingredient (cups, tbsp, etc)
    prep: 'roughly chopped',                 //OPTIONAL: Preperation of ingredient (chopped, diced)
    substitutes: null,         //Optional: Substitute ingredients for that ingredient
    optional: null             //Whether ingredient is necessary
  }


var testIngredient2 = {
  changed: true,
  name: 'bacon',                 
  type: null,                 
  position: 6,             
  amount: 4,              
  unit: '.oz',                 
  prep: 'chopped',                 
  substitutes: null,         
  optional: null             
}


var testIngredient3 = {
  changed: false,
  name: 'cheddar, provolone, Monterey Jack, or Muenster cheese',                 
  type: null,                 
  position: null,             
  amount: 4,              
  unit: '.oz',                 
  prep: 'finely grated',                 
  substitutes: null,         
  optional: null             
}

var meatloafIngredients = [testIngredient1, testIngredient2, testIngredient3];

////////
// STEPS 
////// 

var testStep3 = {
  changed: true, 
  position: 3, 
  description: "Cook bacon in skillet over medium-high heat. Cook to taste.", 
  time: 10,                 //OPTIONAL: Time to complete step
  ingredients: ['beef', 'pork', 'large eggs', 'cheese'] 
}

var testStep4 = {
  changed: true, 
  position: 4, 
  description: "Add the meat mixture to the bowl, along with the eggs, cheese, parsley, bacon, 1 tablespoon salt, and 1 teaspoon pepper. With clean hands, mix gently until everything is thoroughly combined and homogeneous; it will be fairly loose.",
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
    steps: [testStep3, testStep4],
    tags: [], 
    issues: []
}; 

module.exports = meatloafRecipe; 
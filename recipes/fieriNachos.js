////////
// INGREDIENTS 
////// 


var testIngredient1 = {
    changed: true,
    name: 'piquante peppers',                 //name of ingredient
    type: null,                 //type of ingredient (dairy, meat, vegetable, etc)
    position: 1,             //Order of ingredients
    amount: 8,               //OPTIONAL: Amount of ingredient
    unit: 'whole',                 //OPTIONAL: Unit of ingredient (cups, tbsp, etc)
    prep: 'seeded and diced',                 //OPTIONAL: Preperation of ingredient (chopped, diced)
    substitutes: null,         //Optional: Substitute ingredients for that ingredient
    optional: null             //Whether ingredient is necessary
  }

 
var testIngredient2 = {
    changed: true,
    name: 'Roma tomatoes',                 
    type: null,                 
    position: 2,             
    amount: 4,              
    unit: 'whole',                 
    prep: 'seeded and diced',                 
    substitutes: null,         
    optional: null             
  }

var testIngredient3 = {
  changed: true,
  name: 'ricotta cheese',                 
  type: null,                 
  position: 3,             
  amount: 0.25,              
  unit: 'cup',                 
  prep: null,                 
  substitutes: null,         
  optional: null            
}

var testIngredient4 = {
  changed: true,
  name: 'mozzarella',                 
  type: null,                 
  position: 4,             
  amount: 8,              
  unit: '.oz',                 
  prep: 'grated',                 
  substitutes: null,         
  optional: null             
}

var testIngredient5 = {
  changed: true,
  name: 'hard salami',                 
  type: null,                 
  position: 5,             
  amount: 2,              
  unit: '.oz',                 
  prep: 'julienned',                 
  substitutes: null,         
  optional: null            
}

var testIngredient6 = {
  changed: true,
  name: 'Italian turkey sausage',                 
  type: null,                 
  position: 6,             
  amount: 0.5,              
  unit: 'lbs',                 
  prep: null,                 
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
  description: "Combine the ricotta cheese and sour cream in a small food processor or blender. Mix well and pour it into a resealable bag.",
  time: null,                 //OPTIONAL: Time to complete step
  ingredients: ['ricotta cheese', 'sour cream'] 
}

var testStep2 = {
  changed: true, 
  position: 2, 
  description: "In a medium-sized saute pan over medium-high heat, add half of the olive oil. Cook both the ground beef and turkey sausage until cooked through, then remove them from the pan to a plate. Add the remaining olive oil to the pan and saute the onion until it turns opaque, about 4 to 5 minutes.", 
  time: 15,                 //OPTIONAL: Time to complete step
  ingredients: ['olive oil', 'Italian turkey sausage'] 
}

var testStep3 = {
  changed: true, 
  position: 3, 
  description: "Preheat the oven to a low broil and position a rack approximately 9 inches below the burner. In a large oven-safe dish, arrange a layer of chips, a layer of meat mixture, (reheat if necessary), and sprinkle everything with some mozzarella.",
  ingredients: ['chips', 'Italian turkey sausage', 'mozzarella'] 
}

var testStep4 = {
  changed: true, 
  position: 4, 
  description: "Remove the nachos from the oven and top with the salami, fresh herbs and salsa. Take the bag holding the ricotta/sour cream mixture, and create an instant pastry tip by cutting a hole in the corner of the bag. Drizzle the sauce over your nachos, sprinkle with the green onions and pepperoncini, if using, and serve immediately.", 
  ingredients: ['salami', 'herbs', 'salsa'] 
}



var meatloafRecipe = {
  // rootVersion: 1,
  // previousVersion: null, 
  // branch: {
  //  changed: false, 
  //  value: null 
  // }, 
  // userID: {
  //  changed: true, 
  //  value: 1
  // }, 
  name: {
    changed: true, 
    value: 'Flavor Town Nachos X-Treme'
  },
  picture: {
    changed: true, 
    value: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2011/12/12/0/GI0802H_guy-talian-nachos_s4x3.jpg.rend.sni12col.landscape.jpeg"
  },
  description: {                            
      changed: true,
      value: "Wow! This is an amazing recipe. It's delicious and just the right amount of spicy. I served it as sort of a TV-watching-sports meal cut into squares for easy scooping up a portion onto individual small plates. I served the salsa and sour cream/ricotta cheese mix on the side. I never had prepared wontons like this before and was nicely surprised at how perfect they worked."
    },
    servings: {
      changed: true, 
      value: 'Serves 4 to 6' 
    },  
    cookTime: {                              
      changed: true,
      value: '45 minutes',  //Cook time in minutes                         
    },     
    skillLevel: {                             //Recipe difficulty [easy, medium, hard]
      changed: true,
      value: 'Junior Dev'
    },  
    dependencies: [],
    ingredients: meatloafIngredients,
    steps: [testStep1, testStep2, testStep3, testStep4],
    tags: [], 
    issues: []
}; 

module.exports = meatloafRecipe; 
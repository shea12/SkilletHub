var placeholderProfile = {
 user: {
   name: 'Gordon Ramsay',
   email: 'gramsay@gmail.com', 
   date: 'September 20, 2015', 
   image: 'http://www.trbimg.com/img-53c59dde/turbine/la-dd-jacques-pepin-gordon-ramsay-20140715 (376KB)',
   other: 'BANANA'
 }, 
 recipes: [
   {
     name: "Filet Mignon", 
     sourceID: "Austin Riedel"
   },
   {
     name: "Foie Gras", 
     sourceID: "Emeril Lagasse"
   },
   {
     name: "FlavorTown Nachos", 
     sourceID: "Guy Fieri"
   }
 ],
 recipeTemplate: {
  name:{
    value: ''
  }, 
  picture: {
    value: ''
  }, 
  servings: {
    value: ''
  }, 
  cookTime: {
    value: '60 minutes'
  },
  skillLevel: {
    value: 'Junior Dev'
  },
  description: {
    value: 'This is your basic recipe description'
  }
 }, 
 followingList: [
  {
    username: 'Gordon_Ramsay', 
<<<<<<< HEAD
    recipes: 3, 
    skillLevel: 98,
    totalForks: 1214,
    bio: "Gordon James Ramsay, OBE is a British chef, restaurateur, and television personality. His restaurants have been awarded 16 Michelin stars in total. However, Gordon is arguably most famous for calling someone an 'idiot sandwich' in the middle of a nationally broadcasted cooking competition. "
=======
    recipes: 2, 
    skillLevel: 98,
    totalForks: 1214
>>>>>>> 816d348b6fde5c3f834d32ad30736d5f2217e491
  }, 
  {
    username: 'Bobby_Flay', 
    recipes: 5, 
    skillLevel: 89,
<<<<<<< HEAD
    totalForks: 1348,
    bio: "Robert William \"Bobby\" Flay is an American celebrity chef, restaurateur, and reality television personality. He is the owner and executive chef of several restaurants: Mesa Grill in Las Vegas and the Bahamas; Bar Americain in New York and at Mohegan Sun, Uncasville, Connecticut Bobby Flay Steak in Atlantic City; Gato in New York, and Bobby's Burger Palace in 19 locations across 11 states." 
  }, 
  {
    username: 'Guy_Fieri', 
    recipes: 5, 
    skillLevel: 27,
    totalForks: 0,
    bio: "Guy Fieri is the well known mayor of Flavor Town, USA. In addition to his municipal duties, Guy is an American restaurateur, author, game show host, and television personality. He co-owns six restaurants in California and is known for his television series on the Food Network."
  }, 
  {
    username: 'austinriedel', 
    recipes: 5, 
    skillLevel: 100,
    totalForks: 329,
    bio: "Eats a lot of chicken."
  }
 ],
 images: {
  Gordon_Ramsay: 'http://www.trbimg.com/img-53c59dde/turbine/la-dd-jacques-pepin-gordon-ramsay-20140715',
  Guy_Fieri: 'http://media.salon.com/2014/08/guy_fieri.jpg',
  Bobby_Flay: 'http://img.foodnetwork.com/FOOD/2012/12/06/FN_BFF-04-Bobby-Flay-restaurant_s4x3_lg.jpg',
  austinriedel: 'http://broscience.co/wp-content/uploads/2016/05/the-mountain-5.jpg'
 },
  bios: {
    Gordon_Ramsay: "Gordon James Ramsay, OBE is a British chef, restaurateur, and television personality. His restaurants have been awarded 16 Michelin stars in total. However, Gordon is arguably most famous for calling someone an 'idiot sandwich' in the middle of a nationally broadcasted cooking competition.",
    Guy_Fieri: "Guy Fieri is the well known mayor of Flavor Town, USA. In addition to his municipal duties, Guy is an American restaurateur, author, game show host, and television personality. He co-owns six restaurants in California and is known for his television series on the Food Network.",
    Bobby_Flay: "Robert William \"Bobby\" Flay is an American celebrity chef, restaurateur, and reality television personality. He is the owner and executive chef of several restaurants: Mesa Grill in Las Vegas and the Bahamas; Bar Americain in New York and at Mohegan Sun, Uncasville, Connecticut Bobby Flay Steak in Atlantic City; Gato in New York, and Bobby's Burger Palace in 19 locations across 11 states." 
  }
=======
    totalForks: 1348
  }, 
  {
    username: 'Guy_Fieri', 
    recipes: 3, 
    skillLevel: 27,
    totalForks: 0
  },
  {
    username: 'testUser1',
    recipes: 1,
    skillLevel: 38,
    totalForks: 1
  }
 ]
>>>>>>> 816d348b6fde5c3f834d32ad30736d5f2217e491
}


module.exports = placeholderProfile;
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
    recipes: 2, 
    skillLevel: 98,
    totalForks: 1214
  }, 
  {
    username: 'Bobby_Flay', 
    recipes: 5, 
    skillLevel: 89,
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
}


module.exports = placeholderProfile;
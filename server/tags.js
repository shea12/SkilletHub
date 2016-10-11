let cuisines = [
  'american',
  'british',
  'irish',
  'scottish',
  'welsh',
  'spanish',
  'portugese',
  'french',
  'german',
  'italian',
  'dutch',
  'swedish',
  'russian',
  'chinese',
  'japanese',
  'korean',
  'thai',
  'vietnamese',
  'filipino',
  'indonodesian',
  'hawaiian',
  'mexican',
  'brazilian',
  'argentinian',
  'peruvian',
  'moroccan',
  'ethiopian',
  'turkish',
  'syrian',
  'greek',
  'hungarian',
  'iranian',
  'indian',
  'pakistani',
  'puerto rican',
  'afghani',
  'persian'
];

let diets = [
  'vegetarian',
  'ovo vegetarian',
  'lacto vegetarian',
  'ovo-lacto vegetarian',
  'fruitarian',
  'vegan',
  'pescetarian',
  'gluten-free',
  'raw',
  'paleo'
];

let religious = [
  'kosher',
  'halal'
];

let nutritional = [
  'low carb',
  'low fat',
  'low calorie'
];

let tags = [];

cuisines.forEach(tag => {
  tags.push({
    name: tag,
    type: 'cuisine'
  });
});
diets.forEach(tag => {
  tags.push({
    name: tag,
    type: 'diet'
  });
});
religious.forEach(tag => {
  tags.push({
    name: tag,
    type: 'religious'
  });
});
nutritional.forEach(tag => {
  tags.push({
    name: tag,
    type: 'nutrition'
  });
});

module.exports = {
  tags: tags
};
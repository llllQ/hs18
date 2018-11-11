const ADJECTIVES = [
    'Golden', 'Killer', 'Zesty', 'Smokin', 'Humble', 'Disappointing', 'Exceptional',
    'Rude', 'Nasty', 'Big'
];

const FIRST_NAMES = [
    'Espresso', 'Grapefruit', 'Grape', 'Tomato', 'Strawberry', 'Mulled', 'Raspberry',
    'Clemintine', 'Blueberry', 'Oreo', 'Caramel', 'Chocolate', 'Peach',
];

const LAST_NAMES = [
    '-Cosmopolitan', '-Mojito', '-Negroni' , '-Old-Fashioned', '-Martini', 
    '-Margarita', '-Daiquiri', '-Beer', '-Stout', '-Wine' , '-WKD', '-and-Coke',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = () => rand(ADJECTIVES) +'-'+ rand(FIRST_NAMES) + rand(LAST_NAMES);

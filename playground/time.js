const moment = require('moment');

// var date = new Date();

// console.log(date.getMonth());

var date = moment();

// date.add(1, 'y').subtract(9, 'd');

console.log(date.format('MMM Do, YYYY h:mm a'));
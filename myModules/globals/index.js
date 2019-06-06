const {range} = require('rxjs')
// const {filter, map, take, toArray} = require('rxjs/operators')

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

module.exports = {
  increase: function(value) {
    return value + 1
  },
  random: function() {
    // return getRandomInt(100)
    return range(1, 10)
  },
}

const numeral = require("numeral")

let diffTotal = numeral(1000).difference(50)
console.log(diffTotal)

let addTotal = numeral(1000).add(100)
let number = numeral(1000)
let total = number.add(500)
console.log(addTotal)
console.log(total)

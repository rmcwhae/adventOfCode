const processFile = require("../openfile")

processFile('./input.txt').then(contents => {
    console.log(contents)
})
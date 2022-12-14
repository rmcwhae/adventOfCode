const processFile = require("../openfile")

processFile('./input.txt').then(contents => {
    const part1 = contents
        .map(string => {
            return string.split(',')
        })
    console.log('Part 1', part1)
})
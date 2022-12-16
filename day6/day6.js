const string = require('./input')

const characterArray = Array.from(string)

const part1Count = processArray(characterArray, 4)
console.log("Part 1 count", part1Count)
const part2Count = processArray(characterArray, 14)
console.log("Part 2 count", part2Count)

function isAllUnique(characters) {
    const uniqueItems = new Set(characters)

    return Array.from(uniqueItems).length === characters.length
}

function processArray(array, length) {
    const adjustedIndex = length - 1
    for (let i = adjustedIndex; i < array.length; i++) {
        const previousCharacters = characterArray.slice(i - adjustedIndex, i + 1)
        if (isAllUnique(previousCharacters)) {
            return i + 1
        }
    }
}
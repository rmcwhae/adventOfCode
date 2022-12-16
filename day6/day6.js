const string = require('./input')


const characterArray = Array.from(string)

console.log({ characterArray })

for (let i = 3; i < characterArray.length; i++) {
    const previousFourCharacters = characterArray.slice(i - 3, i + 1)
    if (isAllUnique(previousFourCharacters)) {
        console.log("The code starts after character", i + 1)
        return
    }
}

function isAllUnique(characters) {
    const uniqueItems = new Set(characters)

    return Array.from(uniqueItems).length === characters.length
}
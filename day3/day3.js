const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function processFile() {
    try {
        const filePath = resolve('./input.txt')
        return await readFile(filePath, { encoding: 'utf8' })
    } catch (err) {
        console.error(err.message)
    }
}

processFile().then(contents => {
    const part1ProcessedContents = contents
        .split('\n')
        .map(row => {
            const length = row.length
            const half = length / 2
            return [row.slice(0, half), row.slice(half, length)]
        })
        .map(([a, b]) => {
            return findCommonLetter(a.split(""), b.split(""))
        })
        .reduce((a, b) => a + priorityMap[b], 0)
    console.log("The total sum of priorities is", part1ProcessedContents)
})

// Constants and utils

const lowerCaseAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97)); 
const uppperCaseAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65)); 

const alphabet = [...lowerCaseAlphabet, ...uppperCaseAlphabet]

const priorityMap = {}
for (const [index, letter] of alphabet.entries()) {
    priorityMap[letter] = index + 1
}

function findCommonLetter(arrayA, arrayB) {
    for (const letter of arrayA) {
        if (arrayB.includes(letter)) {
            return letter
        }
    }
}
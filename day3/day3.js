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
    console.log("Part 1: the total sum of priorities is", part1ProcessedContents)

    const part2ProcessedContents = contents
        .split('\n')
    const groupedIntoThrees = []
    for (let i = 0; i < part2ProcessedContents.length; i = i + 3) {
        groupedIntoThrees.push(part2ProcessedContents.slice(i, i + 3))
    }
    const priorities = groupedIntoThrees.map(([a, b, c]) => {
        return findCommonLetterInThree(a.split(""), b.split(""), c.split(""))
    }).reduce((a, b) => a + priorityMap[b], 0)

    console.log("Part 2: the total sum of priorities is", priorities)
})

// Constants and utils

const lowerCaseAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const uppperCaseAlphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));

const alphabet = [...lowerCaseAlphabet, ...uppperCaseAlphabet]

const priorityMap = {}
for (const [index, letter] of alphabet.entries()) {
    priorityMap[letter] = index + 1
}

function findCommonLetterInThree(arrayA, arrayB, arrayC) {
    for (const letterA of arrayA) {
        if (arrayB.includes(letterA)) {
            if (arrayC.includes(letterA)) {
                return letterA
            }
        }
    }
}

function findCommonLetter(arrayA, arrayB) {
    for (const letter of arrayA) {
        if (arrayB.includes(letter)) {
            return letter
        }
    }
}
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function processFile() {
    try {
        const filePath = resolve('./input.txt')
        const contents = await readFile(filePath, { encoding: 'utf8' })
        const processedContents = contents
            .split('\n')
            .map(entry => entry.split(' '))
            .map(round => computeRoundScore(round[0], round[1]))
            .reduce((a, b) => a + b, 0)
        console.log(processedContents)
    } catch (err) {
        console.error(err.message)
    }
}

processFile()

function computeRoundScore(opponentHand, yourHand) {
    if (opponentHand === 'A') {
        if (yourHand === 'X') {
            return 1 + 3
        } else if (yourHand === 'Y') {
            return 2 + 6
        } else if (yourHand === 'Z') {
            return 3 + 0
        }
    } else if (opponentHand ==='B') {
        if (yourHand === 'X') {
            return 1 + 0
        } else if (yourHand === 'Y') {
            return 2 + 3
        } else if (yourHand === 'Z') {
            return 3 + 6
        }
    } else if (opponentHand === 'C') {
        if (yourHand === 'X') {
            return 1 + 6
        } else if (yourHand === 'Y') {
            return 2 + 0
        } else if (yourHand === 'Z') {
            return 3 + 3
        }
    }
}

// Rock (A/X) 1
// Paper (B/Y) 2
// Scissors (C/Z) 3
// Win 6
// Loss 0
// Draw 3
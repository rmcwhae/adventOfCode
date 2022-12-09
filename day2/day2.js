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
    const part1Contents = contents
        .split('\n')
        .map(entry => entry.split(' '))
        .map(round => computeRoundScoreByShape(round[0], round[1]))
        .reduce((a, b) => a + b, 0)

    console.log('Part 1: The total score is', part1Contents)

    const processedContentsRnd2 = contents
        .split('\n')
        .map(entry => entry.split(' '))
        .map(round => computeRoundScoreByOutcome(round[0], round[1]))
        .reduce((a, b) => a + b, 0)
        
    console.log('Part 2: The total score is', processedContentsRnd2)
})

// Helpers

function computeRoundScoreByShape(opponentHand, yourHand) {
    if (opponentHand === 'A') {
        if (yourHand === 'X') {
            return 1 + 3
        } else if (yourHand === 'Y') {
            return 2 + 6
        } else if (yourHand === 'Z') {
            return 3 + 0
        }
    } else if (opponentHand === 'B') {
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

function computeRoundScoreByOutcome(opponentHand, outcome) {
    if (outcome === 'X') { // Lose
        if (opponentHand === 'A') {
            return 0 + 3
        } else if (opponentHand === 'B') {
            return 0 + 1
        } else if (opponentHand === 'C') {
            return 0 + 2
        }
    } else if (outcome === 'Y') { // Draw
        if (opponentHand === 'A') {
            return 3 + 1
        } else if (opponentHand === 'B') {
            return 3 + 2
        } else if (opponentHand === 'C') {
            return 3 + 3
        }
    } else if (outcome === 'Z') { // Win
        if (opponentHand === 'A') {
            return 6 + 2
        } else if (opponentHand === 'B') {
            return 6 + 3
        } else if (opponentHand === 'C') {
            return 6 + 1
        }
    }
}

// Part 1
// Rock (A/X) 1
// Paper (B/Y) 2
// Scissors (C/Z) 3
// Win 6
// Loss 0
// Draw 3

// Part 2
// X lose 0
// Y draw 3
// Z win 6
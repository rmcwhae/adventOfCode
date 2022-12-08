const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function logFile() {
    try {
        const filePath = resolve('./input.txt')
        const contents = await readFile(filePath, { encoding: 'utf8' })
        const splitByLineGaps = contents
            .split('\n\n')
            .map(line => line.split('\n'))
            .map(values => values.map(value => Number(value)))
            .map(values => values.reduce((a, b) => a + b, 0))
        console.log('The most calories carried by an elf is', Math.max(...splitByLineGaps))
        const sorted = splitByLineGaps.sort((a, b) => b - a)
        const top3Sum = sorted.slice(0, 3).reduce((a, b) => a + b, 0)
        console.log('The top three elves carry this many calories', top3Sum)
    } catch (err) {
        console.error(err.message)
    }
}

logFile()
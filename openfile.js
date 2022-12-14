const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function processFile(file) {
    try {
        const filePath = resolve(file)
        const fileContents = await readFile(filePath, { encoding: 'utf8' })
        return fileContents.split('\n')
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = processFile
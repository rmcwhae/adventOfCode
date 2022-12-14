const processFile = require("../openfile")

processFile('./input.txt').then(contents => {
    const count = contents
        .map(string => {
            return string.split(',')
        })
        .map(processPair).filter(item => item === true).length
    console.log('Part 1 count is', count)

})

function processPair(pair) {
    const range1 = pair[0].split('-').map(item => Number(item))
    const range2 = pair[1].split('-').map(item => Number(item))
    const array1 = []
    const array2 = []
    for (let i = range1[0]; i <= range1[1]; i++) {
        array1.push(i)
    }
    for (let i = range2[0]; i <= range2[1]; i++) {
        array2.push(i)
    }
    const containedCount = checkContainment(array1, array2)
    return containedCount
}

function checkContainment(array1, array2) {
    let array1Matches = 0
    for (const array1Item of array1) {
        if (array2.find(array2Item => array2Item === array1Item)) {
            array1Matches++
        }
    }
    let array2Matches = 0
    for (const array2Item of array2) {
        if (array1.find(array1Item => array1Item === array2Item)) {
            array2Matches++
        }
    }

    if (array1.length === array1Matches || array2.length === array2Matches) {
        return true
    }

    return false
}
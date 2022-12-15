const processFile = require("../openfile")

const stacks = {
    "1": ["B", "Q", "C"],
    "2": ["R", "Q", "W", "Z"],
    "3": ["B", "M", "R", "L", "V"],
    "4": ["C", "Z", "H", "V", "T", "W"],
    "5": ["D", "Z", "H", "B", "N", "V", "G"],
    "6": ["H", "N", "P", "C", "J", "F", "V", "Q"],
    "7": ["D", "G", "T", "R", "W", "Z", "S"],
    "8": ["C", "G", "M", "N", "B", "W", "Z", "P"],
    "9": ["N", "J", "B", "M", "W", "Q", "F", "P"],
}

processFile('./input.txt').then(contents => {
    const part1Instructions = contents
        .map(string => {
            return string.split(',')
        })
        .flat()
        .map(processMoveInstructions)

    for (const instruction of part1Instructions) {
        handleInstruction(instruction, stacks)
    }
    const finalStacks = []
    for (const [key, value] of Object.entries(stacks)) {
        finalStacks.push(value.slice(-1)[0])
    }
    console.log({ finalStacks })
    console.log('Part 1 final stacks', finalStacks.join(''))
})

function handleInstruction(instruction, stacks) {
    // Instruction = { number: a, from: b, to: c }
    const { number, from, to } = instruction
    console.log('------------------------------------------')
    console.log({ stacksBefore: stacks })
    console.log({ number, from, to })

    for (let i = 0; i < number; i++) {
        const itemToMove = stacks[from].splice(-1)[0]
        if (itemToMove) {
            stacks[to] = [...stacks[to], itemToMove]
        }
    }
    console.log({ stacksAfter: stacks })
    

    return stacks
}

function processMoveInstructions(string) {
    // Input: 'move 1 from 7 to 8'
    const [moveNumber, stacks] = string.split(' from ')

    const moveNumberArray = moveNumber.split(' ')
    const stacksArray = stacks.split(' to ')
    const number = Number(moveNumberArray[1])
    const from = Number(stacksArray[0])
    const to = Number(stacksArray[1])

    return { number, from, to }
}
const processFile = require("../openfile")

const part1Stacks = {
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
const part2Stacks = JSON.parse(JSON.stringify(part1Stacks)) // Deep clone

processFile('./input.txt').then(contents => {
    const instructions = contents
        .map(string => {
            return string.split(',')
        })
        .flat()
        .map(processMoveInstructions)

    for (const instruction of instructions) {
        handleInstruction(instruction, part1Stacks)
    }
    const part1FinalStacks = []
    for (const [key, value] of Object.entries(part1Stacks)) {
        part1FinalStacks.push(value.slice(-1)[0])
    }
    console.log('Part 1 final stacks', part1FinalStacks.join(''))

    for (const instruction of instructions) {
        handleInstructionPart2(instruction, part2Stacks)
    }
    const part2FinalStacks = []
    for (const [key, value] of Object.entries(part2Stacks)) {
        part2FinalStacks.push(value.slice(-1)[0])
    }
    console.log('Part 2 final stacks', part2FinalStacks.join(''))
})

function handleInstructionPart2(instruction, stacks) {
    // Instruction = { number: a, from: b, to: c }
    const { number, from, to } = instruction
    const itemsToMove = stacks[from].splice(stacks[from].length - number)
    stacks[to] = [...stacks[to], ...itemsToMove]

    return stacks
}

function handleInstruction(instruction, stacks) {
    // Instruction = { number: a, from: b, to: c }
    const { number, from, to } = instruction
    for (let i = 0; i < number; i++) {
        const itemToMove = stacks[from].splice(-1)[0]
        if (itemToMove) {
            stacks[to] = [...stacks[to], itemToMove]
        }
    }

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
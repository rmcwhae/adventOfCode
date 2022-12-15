const processFile = require("../openfile")

// [Q]     [P] [P]
// [G] [V] [S] [Z] [F]
// [W] [V] [F] [Z] [W] [Q]
// [V] [T] [N] [J] [W] [B] [W]
// [Z] [L] [V] [B] [C] [R] [N] [M]
// [C] [W] [R] [H] [H] [P] [T] [M] [B]
// [Q] [Q] [M] [Z] [Z] [N] [G] [G] [J]
// [B] [R] [B] [C] [D] [H] [D] [C] [N]
// 1   2   3   4   5   6   7   8   9 

const stacks = [["B", "Q", "C", "Z", "V", "W", "G", "Q"],
["R", "Q", "W", "L", "T", "V", "V"],
["B", "M", "R", "V", "N", "F", "S", "P"],
["C", "Z", "H", "B", "J", "Z", "Z", "P"],
["D", "Z", "H", "C", "W", "W", "F"],
["H", "N", "P", "R", "B", "Q"],
["D", "G", "T", "N", "N"],
["C", "G", "M", "M"],
["B", "J", "N"]
]

// console.log({ stacks })
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
    for (const stack of stacks) {
        finalStacks.push(stack.slice(-1)[0])
    }
    console.log('Part 1 final stacks', finalStacks.join(''))
})

function handleInstruction(instruction, stacks) {
    // Instruction = { number: a, from: b, to: c }
    const { number, from, to } = instruction
    const toBeMoved = stacks[from - 1].splice(number)
    stacks[to - 1] = [...stacks[to - 1], ...toBeMoved]

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
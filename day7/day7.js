const processFile = require("../openfile")

processFile('./input.txt').then(commands => {

    
    const groupedCommands = groupIntoCommands(commands)
    console.log(groupedCommands)
    // for (const command of groupedCommands) {
    //     console.log(command)
    //     processCommand(command)
    // }

})

function groupIntoCommands(commands) {
    let groupedCommands = {}

    for (let i = 0; i < commands.length; i++) {
        const currentCommandNumber = Array.from(groupedCommands).length + 1
        console.log({currentCommandNumber})
        if (commands[i][0] === '$') {
            // Create a new group
            groupedCommands[currentCommandNumber + 1] = [commands[i]]
        } else {
            // Keep adding to the last group
            if (i > 1) {
                groupedCommands[currentCommandNumber] = [...groupedCommands[currentCommandNumber], commands[i]]
            }
        }
        console.log({groupedCommands})
    }

    return groupedCommands

}

function processCommand(command) {
}
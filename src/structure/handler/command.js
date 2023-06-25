const fs = require('fs');

module.exports = async (client) => {
    const commandSubFolders = fs.readdirSync('./src/commands/').filter(f => !f.endsWith('.js'))
    commandSubFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}/`).filter(f => f.endsWith('.js'))

        for (const file of commandFiles) {
            const command = require(`../../../src/commands/${folder}/${file}`)
            console.log('\x1b[31m' + `La commande ` + '\x1b[35m' + `${file.split('.')[0]}` + '\x1b[31m' + ' est chargé depuis ' + '\x1b[35m' + `${folder}`)
            const data = new command()
            client.commands.set(data.name, data)
        }
    });
}
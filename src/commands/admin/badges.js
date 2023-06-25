const { EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "badges"
        this.description = "Permets de configurer les rôles selons les badges discord"
        this.permissions = "Administrator"
        this.category = "Admin"

    }

    async execute(client, interaction) {
        let onemoji
        let textonoff;
        let onoff;
        let status;
        let equipediscord;
        let partenaire;
        let ancienmodo;
        let hypesquadevent;
        let chass2;
        let chass1;
        let hypesquadbal;
        let hypesquadbril;
        let hypesquadbra;
        let dev;
        let soutien;
        let config = await client.db.get(`badges_${interaction.guild.id}`)
        if (!config) {
            status = 'Désactivé';
            equipediscord = 'Aucun rôle configuré.';
            partenaire = 'Aucun rôle configuré.';
            ancienmodo = 'Aucun rôle configuré.';
            hypesquadevent = 'Aucun rôle configuré.';
            hypesquadbra = 'Aucun rôle configuré.';
            hypesquadbril = 'Aucun rôle configuré.';
            hypesquadbal = 'Aucun rôle configuré.';
            chass1 = 'Aucun rôle configuré.';
            chass2 = 'Aucun rôle configuré.';
            dev = 'Aucun rôle configuré.';
            soutien = 'Aucun rôle configuré.';
        }
        if (config?.status == 'on') status = 'Activé'
        if (config?.status == 'off') status = 'Désactivé'
        const embed_badge = new EmbedBuilder()
            .setTitle(`Role Badge`)
            .setDescription(`
         Statut: ${status}
         > <:staff_discord:1112117923474063542> Discord Staff - ${equipediscord}
         > <:Partner:1112117926326185994> Partener Server Owner - ${partenaire}
         > <:B_profileBadgeModProgramsAlumni:1112117928121356470> Mod Programs Alumni - ${ancienmodo}
         > <:HypeSquadEvents:1112117930176565338> Hypesquad Event - ${hypesquadevent}
         > <:HypeSquadBravery:1112117932089147472> Bravery House - ${hypesquadbra}
         > <:HypequadBrilliance:1112117935541071943> Brillance House - ${hypesquadbril}
         > <:HypesquadBalance:1095185964168659046> Balance House - ${hypesquadbal}
         > <:BugHunterLevel1:1112117937533370431> Bug Hunter Level 1 - ${chass1}
         > <:GoldenBugHunter:1112117939127205888> Golden Bug Hunter - ${chass2}
         > <:Dev:1112117941127872552> Early Verified Developer - ${dev}
         > <:Early:1112117942847537154> Early Suporter - ${soutien}
         `)

        let rolebadged = new StringSelectMenuBuilder()
            .setCustomId('rolebadge')
            .setPlaceholder("Sélectionner une option")
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions([
                {
                    label: config?.status ? "Désactivé le système" : "Activé le système",
                    value: `status`,
                },
                {
                    label: 'Configurer automatiquement des rôles',
                    value: `rolebadgeconf`,
                },
                {
                    label: 'Configurer manuellement les rôles',
                    value: "rolebadgemaj",
                },
            ])
        const menumsg = await interaction.reply({ embeds: [embed_badge], components: [new ActionRowBuilder().addComponents([rolebadged])] })
        let msg = menumsg


        let filter1 = (i) => i.user.id === message.author.id;

        const col = await msg.createMessageComponentCollector({
            filter: filter1,
            componentType: "SELECT_MENU"
        })


        col.on("collect", async (i) => {
            await i.deferUpdate()
            if (i.values[0] === "rolebadgeonoff") {
                client.db.query(`SELECT * FROM badgerole WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if (err) throw err;

                    if (req.length < 1) {
                        client.db.query(`INSERT INTO badgerole (guildId, status) VALUES ("${message.guild.id}", "on")`)
                        const embed_badge2 = new MessageEmbed()
                            .setTitle(`Role Badge`)
                            .setColor('PURPLE')
                            .setDescription(`
               Statut: <a:loadingGreen:1109779997331304468>
               > <:DiscordEmployee:1109520664949424229> - ${equipediscord}
               > <:PartneredServerOwner:1109520663343009884> - ${partenaire}
               > <:DiscordCertifiedModerator:1109520659756892290> - ${ancienmodo}
               > <:HypeSquadEvents:1109520666199326800> - ${hypesquadevent}
               > <:HouseBravery:1109520662252507258> - ${hypesquadbra}
               > <:HouseBrilliance:1109520655214456883> - ${hypesquadbril}
               > <:HouseBalance:1109520651917721643> - ${hypesquadbal}
               > <:BugHunterLevel1:1109520653670944778> - ${chass1}
               > <:BugHunterLevel2:1109520660977430619> - ${chass2}
               > <:EarlyVerifiedBotDeveloper:1109520650613313707> - ${dev}
               > <:soutien:1109528537280553060> - ${soutien}
               `)
                            .setFooter(client.footer)
                        menumsg.edit({ embeds: [embed_badge2], components: [new MessageActionRow().addComponents([rolebadged])] })
                    } else {
                        let stat = req[0].status

                        if (stat == 'on') onoff = 'off'
                        if (stat == 'off') onoff = 'on'
                        if (stat == 'on') onemoji = '<a:loadingRed:1109779995758440549>'
                        if (stat == 'off') onemoji = '<a:loadingGreen:1109779997331304468>'



                        const embed_badge2 = new MessageEmbed()
                            .setTitle(`Role Badge`)
                            .setDescription(`
                            Statut: <a:loadingGreen:1109779997331304468>
                            > <:DiscordEmployee:1109520664949424229> - ${equipediscord}
                            > <:PartneredServerOwner:1109520663343009884> - ${partenaire}
                            > <:DiscordCertifiedModerator:1109520659756892290> - ${ancienmodo}
                            > <:HypeSquadEvents:1109520666199326800> - ${hypesquadevent}
                            > <:HouseBravery:1109520662252507258> - ${hypesquadbra}
                            > <:HouseBrilliance:1109520655214456883> - ${hypesquadbril}
                            > <:HouseBalance:1109520651917721643> - ${hypesquadbal}
                            > <:BugHunterLevel1:1109520653670944778> - ${chass1}
                            > <:BugHunterLevel2:1109520660977430619> - ${chass2}
                            > <:EarlyVerifiedBotDeveloper:1109520650613313707> - ${dev}
                            > <:soutien:1109528537280553060> - ${soutien}
                            `)
                            .setFooter(client.footer)


                        await client.db.set(`status_${interaction.guild.id}`, {
                            status: on
                        })


                        menumsg.edit({ embeds: [embed_badge2], components: [new MessageActionRow().addComponents([rolebadged])] })
                    }
                })
            }
        })

    }
}
module.exports = command
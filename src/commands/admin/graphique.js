const Discord = require("discord.js");
const Canvas = require("canvas");
const moment = require("moment");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

class command {
    constructor() {
        this.name = "graphique"
        this.maintenance = false
        this.description = "Permets de générer un graphique des joins et leaves."
        this.category = "Admin"
    }

    async execute(client, interaction) {
        const lang = await client.db.get(`config.${interaction.user.id}`) || { langue: "fr" }
        const stats = await client.db.get(`graph_${interaction.guild.id}`) || []
        if (stats.length === 0) return interaction.reply(`${await client.lang('graphique.notStats', interaction.user.id)}`);

        const newMembers = stats[0];

        const dataset = {
            data: [],
            labels: []
        }

        stats.forEach((stat) => {
            dataset.data.push(stat.members);
            dataset.labels.push(moment(stat.time).format('DD/MM'));
        });

        const canvas = Canvas.createCanvas(926, 497);
        const context = canvas.getContext("2d");
        let backgroundUrl;
        backgroundUrl = 'https://media.discordapp.net/attachments/1107057280953884692/1108524286219665488/Sans_titre.png';
        const background = await Canvas.loadImage(backgroundUrl);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const chart = new ChartJSNodeCanvas({ width: 896, height: 310 });
        const chartConfig = defaultChartConfig;

        chartConfig.data.datasets.push({
            label: "Membres",
            data: dataset.data,
            borderColor: "rgb(88, 101, 241)",
            backgroundColor: "rgba(88, 101, 241, 0.2)",
            borderWidth: 7,
            pointRadius: 0,
            tension: 0.6,
            fill: true
        });

        chartConfig.data.labels = dataset.labels;

        const chartComponentImage = await chart.renderToBuffer(chartConfig);
        context.drawImage(await Canvas.loadImage(chartComponentImage), 20, 170);

        const chartImage = new Discord.AttachmentBuilder(
            canvas.toBuffer(),
            "chart.png"
        )
        const members = interaction.guild.memberCount - newMembers.members
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('addRank')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setLabel(`${members} ${await client.lang('graphique.newMembers', interaction.user.id)}`)
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('test')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel(`${interaction.guild.memberCount} ${await client.lang('graphique.members', interaction.user.id)}`)
                    .setDisabled(true),
            )

        const chartMessage = {
            title: `${await client.lang('graphique.title', interaction.user.id)}`,
            description: `${await client.lang('graphique.description', interaction.user.id)}`,
            image: { url: "attachment://file.jpg" },
            color: client.config.clients.color
        }

        return interaction.reply({
            embeds: [chartMessage],
            components: [row],
            files: [chartImage]
        });

    }
}


const defaultChartConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: []
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        },

        layout: {},

        scales: {

            x: {
                grid: {
                    color: "rgba(255,255,255,0.02)",
                    lineWidth: 1.5,
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 400
                    },
                    color: "rgba(255,255,255,0.4)",
                },
            },

            y: {
                grid: {
                    color: "rgba(255,255,255,0.05)",
                    lineWidth: 3,
                },
                ticks: {
                    beginAtZero: false,
                    font: {
                        size: 16,
                        weight: "bold"
                    },
                    color: "rgba(255,255,255,0.5)",
                    stepSize: 1,
                    precision: 0,
                },
            }
        }
    }
}


module.exports = command
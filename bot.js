require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 👉 URL du serveur (Render plus tard)
const SERVER_URL = "https://TON-SERVEUR.onrender.com";

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    await fetch(`${SERVER_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            type: "text",
            content: message.content
        })
    });
});

client.login(process.env.DISCORD_TOKEN);
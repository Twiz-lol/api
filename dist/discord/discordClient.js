"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscordClient = void 0;
// discordClient.ts
const discord_js_1 = require("discord.js");
function createDiscordClient() {
    const client = new discord_js_1.Client({
        intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MEMBERS, discord_js_1.Intents.FLAGS.GUILD_PRESENCES]
    });
    client.once('ready', () => {
        console.log(`Logged in as ${client.user?.tag}!`);
    });
    return client;
}
exports.createDiscordClient = createDiscordClient;

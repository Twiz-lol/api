"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../main");
const axios_1 = __importDefault(require("axios"));
main_1.app.get('/v3/sections/discord_servers', async (req, res) => {
    var inviteINK = req.query.link;
    if (inviteINK) {
        const match = inviteINK.match(/discord\.gg\/(.+)/);
        if (match) {
            inviteINK = match[1];
            // console.log(inviteINK); // This will print 'ABC123'
        }
        else {
            // console.log('No invite code found');
        }
    }
    else {
        res.redirect("/error?message=No invite link");
    }
    try {
        const response = await axios_1.default.get(`https://discord.com/api/v10/invites/${inviteINK}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        });
        const guildId = response.data.guild.id;
        const guildName = response.data.guild.name;
        let guildSplash = null;
        let guildIcon = null;
        let guildBanner = null;
        if (response.data.guild.splash !== null) {
            guildSplash = `https://cdn.discordapp.com/splashes/${response.data.guild.id}${response.data.guild.splash}`;
        }
        if (response.data.guild.icon !== null) {
            guildIcon = `https://cdn.discordapp.com/icons/${response.data.guild.id}/${response.data.guild.icon}`;
        }
        if (response.data.guild.banner !== null) {
            guildBanner = `https://cdn.discordapp.com/banners/${response.data.guild.id}/${response.data.guild.banner}`;
        }
        res.json({ guildName: response.data.guild.name, guildSplash: `${guildSplash}`,
            guildBanner: guildBanner, guildIcon: `${guildIcon}`, guildBoosts: response.data.guild.premium_subscription_count });
    }
    catch (error) {
        // console.error(error);
        res.send("Something went off");
    }
});

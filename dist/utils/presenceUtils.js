"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresence = exports.formatSpotifyActivity = exports.formatActivity = void 0;
function formatActivity(activity) {
    return {
        type: activity.type,
        timestamps: activity.timestamps,
        state: activity.state,
        name: activity.name,
        id: activity.id,
        details: activity.details,
        created_at: activity.createdTimestamp,
        assets: activity.assets,
        application_id: activity.applicationId
    };
}
exports.formatActivity = formatActivity;
function formatSpotifyActivity(activity) {
    if (!activity?.syncId) {
        return null;
    }
    return {
        track_id: activity.syncId,
        timestamps: activity.timestamps,
        song: activity.details,
        artist: activity.state,
        album_art_url: activity.assets?.largeImage,
        album: activity.assets?.largeText,
        is: "true"
    };
}
exports.formatSpotifyActivity = formatSpotifyActivity;
async function getPresence(user, client, config) {
    try {
        const guilds = config.guildIds.map((guildId) => client.guilds.fetch(guildId));
        // deepcode ignore PromiseNotCaughtGeneral: <please specify a reason of ignoring this>
        const guild = await Promise.all(guilds).then((guilds) => guilds.find((guild) => guild.members.cache.has(user)));
        if (!guild) {
            throw new Error('Member not found');
        }
        const member = await guild.members.fetch(user);
        if (!member || !member.presence) {
            throw new Error('Member not found');
        }
        const activities = member.presence.activities.map((activity) => formatActivity(activity));
        const listeningToSpotifyActivity = member.presence.activities.find((activity) => activity.type === 'LISTENING' && activity.name === 'Spotify');
        const spotify = formatSpotifyActivity(listeningToSpotifyActivity);
        const presence = {
            success: true,
            data: {
                listening_to_spotify: spotify !== null,
                spotify: spotify,
                discord_user: {
                    username: member.user.username,
                    flags: member.user.flags?.bitfield,
                    id: member.user.id,
                    discriminator: member.user.discriminator,
                    avatar: member.user.avatarURL()
                },
                discord_status: member.presence.status,
                activities: activities
            }
        };
        return presence;
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            data: {
                listening_to_spotify: false,
                spotify: null,
                discord_user: {
                    username: '',
                    flags: 0,
                    id: '',
                    discriminator: '',
                    avatar: ''
                },
                discord_status: '',
                activities: []
            }
        };
    }
}
exports.getPresence = getPresence;

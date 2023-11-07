import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
	DEV: true,
	RATE_LIMITING_ENABLED: true,
	RATE_LIMITING_WINDOW_MILLISECONDS: 3000,
	RATE_LIMITING_REQUEST_LIMIT: 30,
	port: process.env.PORT || 3000,
	botToken: process.env.BOT_TOKEN,
	guildIds: process.env.GUILD_IDS?.split(','),
}

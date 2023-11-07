import express, { Request, Response } from 'express'
import cors from 'cors'
import { createDiscordClient } from './discord/discordClient'
import { config } from './config/config'
import { getPresence } from './utils/presenceUtils'
import path from 'path'

const app = express();
const port = config.port;

app.use(cors())

const client = createDiscordClient()
app.set('view engine', 'ejs');
app.disable('x-powered-by');

// for apis
export { app };

// discord server api
require('./extra/gulids/main.ts');

app.get('/v3/sections/u_g/:user', async (req: Request, res: Response) => {
	const presence = await getPresence(req.params.user, client, config)

	if (!presence.success) {
		res.status(404).json(presence)
		return
	}

	res.json(presence)
})
app.get('/', (req,res)=> {
	res.send(`
	
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Twiz APi</title>
	
		<style>
			[x-cloak] {
				display: none
			}
		</style>
	
		<script src="https://cdn.tailwindcss.com"></script>
	
		<script>
			tailwind.config = {
				darkMode: 'class',
			}
		</script>
		
		<script src="//unpkg.com/alpinejs" defer></script>
	</head>
	<body x-data="{ open: true, darkMode: true }" :class="darkMode ? 'dark' : ''">
		<div class="relative min-h-screen bg-gray-100 dark:bg-gray-900">
			<section class="bg-white dark:bg-gray-900 ">
		<div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
			<div class="wf-ull lg:w-1/2">
				<p class="text-sm font-medium text-blue-500 dark:text-blue-400">GET | respond</p>
				<h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We're still working on this page</h1>
				<p class="mt-4 text-gray-500 dark:text-gray-400">Here are some helpful links:</p>
	
				<div class="flex items-center mt-6 gap-x-3">
	
					<button onclick="window.location.href = '/twast';" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
						Check out Twast
					</button>
					<button onclick="window.location.href = 'https://docs.twiz.lol';" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
						Check out docs
					</button>
				</div>
			</div>
	
			<!--<div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
				<img class="w-full max-w-lg lg:mx-auto" src="https://merakiui.com/images/components/illustration.svg" alt="">
			</div> -->
		</div>
	</section>
		
			</div>
		</div>
	</body>
	</html>`)
})

app.get('/twast', (req,res)=> {
	res.sendFile(path.join(__dirname, 'extra','twast','views','index.html'))
})
app.get('/cdn/twast.js',(req,res)=> {
	res.sendFile(path.join(__dirname, 'extra','twast','twast.js'))
})
// file deepcode ignore NoRateLimitingForExpensiveWebOperation: not needed

app.get('/fonts/SatoshiBlack', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'views','SatoshiBlack.ttf'))
})

import Domains from "./database/models/api-domains";
app.get('/v3/widgets', async (req: Request, res: Response) => {
	// protection
	// const apikey = req.query.apikey as string;
	// const search = await Domains.findOne({
	// 	secret: apikey
	// });
	// const origin = req.get('host') as string;
	// console.log(origin)
	// if (search) {
		// console.log(search?.allowedDomains);
		// var alloweddo = JSON.parse(`${search.allowedDomains}`);
		// if (alloweddo.includes(origin as string)) {
		const presence = await getPresence(req.query.id as string, client, config)
		if  (!req.query.id) {
			res.status(404).render(path.join(__dirname, 'views', 'n.ejs'))
		}
		if (!presence.success) {
			// res.status(404).json(presence)
			res.status(404).render(path.join(__dirname, 'views', 'n.ejs'))
			return
		}
		let  username = presence.data.discord_user.username;
		let  avatar = presence.data.discord_user.avatar;
		let  status = presence.data.discord_status;
		let  isSpotfy = presence.data.listening_to_spotify;
		//  Strings
		let spotify = null;
		let  imgL = null;
		let  imgS = null;
		let  custom_u = null;
		let  presence_type = null;
		let oo;
		if (isSpotfy == true) {
			spotify = presence.data.spotify;
		} else  {
			spotify = null;
		}
		let  presence1 = presence.data.activities[1];
		try {
		custom_u = presence.data.activities[0].state;
		imgL = presence.data.activities[1].assets?.large_image;
		imgS = presence.data.activities[1].assets?.small_image;
		// console.log(presence.data.activities[1].type)
		} catch(e) {
			// custom_u = null;
		}
		// console.log(custom_u)
		// console.log(isSpotfy +" "+ spotify?.album_art_url)
	
		
		res.render(path.join(__dirname, 'views', 'rp.ejs'), {
			username: username,
			avatar: avatar,
			presence: presence1,
			presence_type: presence_type,
			user_status: status,
			isSpotfy: isSpotfy,
			spotify: spotify || "null",
			custom_deatil: custom_u,
			imgL: imgL || "null",
			imgS: imgS || "null",
		});
// 	} else {
//         return res.status(403).send(`Forbidden<hr>Not allowed`);
// 	}
// } else {
// 	return res.status(403).send(`Forbidden<hr>Not allowed`);
// }
	
});

app.use((req: Request, res: Response) => {
	res.status(404).send(`
	
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>404 APi</title>

    <style>
        [x-cloak] {
            display: none
        }
    </style>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    
    <script src="//unpkg.com/alpinejs" defer></script>
</head>
<body x-data="{ open: true, darkMode: true }" :class="darkMode ? 'dark' : ''">
    <div class="relative min-h-screen bg-gray-100 dark:bg-gray-900">
        <section class="bg-white dark:bg-gray-900 ">
    <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div class="wf-ull lg:w-1/2">
            <p class="text-sm font-medium text-blue-500 dark:text-blue-400">404 respond</p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Api not found</h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">Sorry, the api you are looking for doesn't exist, Here are some helpful links:</p>

            <div class="flex items-center mt-6 gap-x-3">
                <button onclick="window.navigation.back()" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>


                    <span>Go back</span>
                </button>

                <button onclick="window.location.href = '/twast';" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    Check out Twast
                </button>
            </div>
        </div>

        <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img class="w-full max-w-lg lg:mx-auto" src="https://merakiui.com/images/components/illustration.svg" alt="">
        </div>
    </div>
</section>
    
        </div>
    </div>
</body>
</html>`)
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})

client.login(config.botToken)

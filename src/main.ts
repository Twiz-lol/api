// main.ts
import express, { Request, Response } from 'express'
// import cors from 'cors'
import { createDiscordClient } from './discord/discordClient'
import { config } from './config/config'
import { getPresence } from './utils/presenceUtils'
import path from 'path'

const app = express()
const port = config.port

// app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from localhost
  // Other CORS headers like methods, headers, etc. can be set here if needed
  next();
});

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, cf-ray');
  res.sendStatus(200);
});


const client = createDiscordClient()
app.set('view engine', 'ejs');

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
		<title>Twiz API</title>
	
		<style>
			[x-cloak] {
				display: none
			}
		</style>
	
		<script src="https://cdn.tailwindcss.com"></script>
	
		
		<style>/* ! tailwindcss v3.4.0 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.fixed{position:fixed}.relative{position:relative}.inset-x-4{left:1rem;right:1rem}.bottom-20{bottom:5rem}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.mr-4{margin-right:1rem}.mt-3{margin-top:0.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.inline-block{display:inline-block}.flex{display:flex}.h-5{height:1.25rem}.h-7{height:1.75rem}.min-h-screen{min-height:100vh}.w-1\/2{width:50%}.w-5{width:1.25rem}.w-auto{width:auto}.w-full{width:100%}.shrink-0{flex-shrink:0}.transform{transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-x-2{column-gap:0.5rem}.gap-x-3{column-gap:0.75rem}.space-x-6 > :not([hidden]) ~ :not([hidden]){--tw-space-x-reverse:0;margin-right:calc(1.5rem * var(--tw-space-x-reverse));margin-left:calc(1.5rem * calc(1 - var(--tw-space-x-reverse)))}.rounded-lg{border-radius:0.5rem}.rounded-md{border-radius:0.375rem}.rounded-xl{border-radius:0.75rem}.border{border-width:1px}.bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.bg-gray-800{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.p-1{padding:0.25rem}.px-1{padding-left:0.25rem;padding-right:0.25rem}.px-1\.5{padding-left:0.375rem;padding-right:0.375rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.px-8{padding-left:2rem;padding-right:2rem}.py-12{padding-top:3rem;padding-bottom:3rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.font-medium{font-weight:500}.font-semibold{font-weight:600}.tracking-wide{letter-spacing:0.025em}.text-blue-500{--tw-text-opacity:1;color:rgb(59 130 246 / var(--tw-text-opacity))}.text-gray-100{--tw-text-opacity:1;color:rgb(243 244 246 / var(--tw-text-opacity))}.text-gray-300{--tw-text-opacity:1;color:rgb(209 213 219 / var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.underline{-webkit-text-decoration-line:underline;text-decoration-line:underline}.transition-colors{transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-200{transition-duration:200ms}.duration-300{transition-duration:300ms}.hover\:bg-blue-600:hover{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))}.hover\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246 / var(--tw-bg-opacity))}.hover\:bg-gray-600:hover{--tw-bg-opacity:1;background-color:rgb(75 85 99 / var(--tw-bg-opacity))}.hover\:bg-gray-700:hover{--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity))}.hover\:bg-opacity-25:hover{--tw-bg-opacity:0.25}.hover\:text-blue-400:hover{--tw-text-opacity:1;color:rgb(96 165 250 / var(--tw-text-opacity))}.focus\:border-blue-500:focus{--tw-border-opacity:1;border-color:rgb(59 130 246 / var(--tw-border-opacity))}.focus\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\:ring:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.focus\:ring-blue-300:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(147 197 253 / var(--tw-ring-opacity))}.focus\:ring-opacity-40:focus{--tw-ring-opacity:0.4}@media (min-width: 640px){.sm\:left-12{left:3rem}.sm\:h-6{height:1.5rem}.sm\:h-9{height:2.25rem}.sm\:w-6{width:1.5rem}.sm\:w-auto{width:auto}.sm\:w-full{width:100%}.sm\:max-w-md{max-width:28rem}}@media (min-width: 768px){.md\:text-3xl{font-size:1.875rem;line-height:2.25rem}}@media (min-width: 1280px){.xl\:px-6{padding-left:1.5rem;padding-right:1.5rem}}:is(:where([dir="rtl"]) .rtl\:rotate-180){--tw-rotate:180deg;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}:is(:where(.dark) .dark\:border-gray-700){--tw-border-opacity:1;border-color:rgb(55 65 81 / var(--tw-border-opacity))}:is(:where(.dark) .dark\:bg-blue-600){--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity))}:is(:where(.dark) .dark\:bg-gray-900){--tw-bg-opacity:1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}:is(:where(.dark) .dark\:text-blue-400){--tw-text-opacity:1;color:rgb(96 165 250 / var(--tw-text-opacity))}:is(:where(.dark) .dark\:text-gray-200){--tw-text-opacity:1;color:rgb(229 231 235 / var(--tw-text-opacity))}:is(:where(.dark) .dark\:text-gray-400){--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity))}:is(:where(.dark) .dark\:text-white){--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}:is(:where(.dark) .dark\:hover\:bg-blue-500:hover){--tw-bg-opacity:1;background-color:rgb(59 130 246 / var(--tw-bg-opacity))}:is(:where(.dark) .dark\:hover\:bg-gray-800:hover){--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}</style>
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

app.get('/fonts/SatoshiBlack', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'views','SatoshiBlack.ttf'))
})

app.get('/v3/widgets', async (req: Request, res: Response) => {
	// const id = req.query.id as string; 
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

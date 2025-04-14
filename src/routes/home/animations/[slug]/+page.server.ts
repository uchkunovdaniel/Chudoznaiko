// import * as fs from 'node:fs';
import { error } from '@sveltejs/kit';
import { GEMINI_KEY } from '$env/static/private';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';


// const videos = fs.readdirSync('src/lib/animations/videos');
export const load = async ({ params, locals }) => {
	const animations = await locals.pb.collection('animations').getFullList();
	const videos = animations.map(({video}) => video);
	const names = animations.map(({name}) => name);
	const filenames = videos.map((video) => video[0]+'.mp4');
	if(filenames.includes(params.slug + '.mp4')){
		return {
			id: animations[parseInt(params.slug)-1].id,
			name: names[parseInt(params.slug)-1],
			video: locals.pb.files.getURL(animations[parseInt(params.slug)-1], videos[parseInt(params.slug)-1]),
			description: animations[parseInt(params.slug)-1].description
		};
	}
	return error(404);
};

export const actions = {
	prompt: async ({ request }) => {

		const data = await request.formData();
		const genAI = new GoogleGenerativeAI(GEMINI_KEY);
		const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash', safetySettings: [{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
			{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
			{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
			{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
			]});
		try {
			const result = await model.generateContent([
				`Ти си AI асистент, създаден да насърчава уважителни, неутрални и приобщаващи разговори. Трябва да избягваш използването на политически термини, обиди или дискриминационен език. Увери се, че всички отговори остават обективни, учтиви и без предразсъдъци. Ако потребителят се опита да започне политически дискусии, да използва обиден език или да засяга дискриминационни теми, тактично насочи разговора към неутрални и конструктивни теми. Поддържай любезен и професионален тон във всички случаи, като насърчаваш позитивни и смислени взаимодействия. Отговаряш на дете от 3 до 7 години. Отговорите да са кратки до 50 думи. Говори само в мъжки род. Не казвай нищо което може да бъде опасно дори и инструкции как да не правим опасни неща. Не отговаряй на въпроси свързани с политици ако е зададен такъв въпрос кажи че трябва да се попита възрастен.: ${data.get('prompt') as string}`
			]);
			return {
				response: result.response.text()
			}
	}catch (error) {
			console.log(error);
			return {
				response: 'Извинявай, не можах да генерирам отговор.'
			};
		}
	},
	save: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {
			'favourite_animations+': data.get('id') as string
		})
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {
			'favourite_animations-': data.get('id') as string
		})
	}
}
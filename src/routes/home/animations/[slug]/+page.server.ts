// import * as fs from 'node:fs';
import { error } from '@sveltejs/kit';
import { GEMINI_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
		const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

		const result = await model.generateContent([
			`Отговори като за малко дете: ${data.get('prompt') as string}`
		]);
		return {
			response: result.response.text()
		}
	},
	save: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {
			'favourite_animations+': data.get('id') as string
		})

	}
}
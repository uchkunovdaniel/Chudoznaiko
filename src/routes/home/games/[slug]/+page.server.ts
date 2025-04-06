import { error } from '@sveltejs/kit';


export const load = async ({ params, locals }) => {
	const games = await locals.pb.collection('games').getFullList();
	const thumbnails = games.map(({thumbnail}) => thumbnail);
	const names = games.map(({name}) => name);
	const filenames = thumbnails.map((thumbnail) => thumbnail[0]+'.png');

	if(filenames.includes(params.slug + '.png')) {
		return {
			name: names[parseInt(params.slug)-1],
			video: locals.pb.files.getURL(games[parseInt(params.slug)-1], thumbnails[parseInt(params.slug)-1]),
			description: games[parseInt(params.slug)-1].description,
			index: parseInt(params.slug),
			id: games[parseInt(params.slug)-1].id,
		};
	}
	throw error(404);
};

export const actions = {
	save: async ({request, locals}) => {
		const data = await request.formData();
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {
			'favourite_games+': data.get('id') as string
		})
	},
	delete: async ({request, locals}) => {
		const data = await request.formData();
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {
			'favourite_games-': data.get('id') as string
		})
	}
 	}
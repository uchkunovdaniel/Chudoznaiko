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
			index: parseInt(params.slug)
		};
	}
	throw error(404);
};

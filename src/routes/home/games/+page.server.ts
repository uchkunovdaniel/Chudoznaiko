
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({locals}) => {
	const games = await locals.pb.collection('games').getFullList();
	const imgs = games.map(({thumbnail}) => thumbnail);
	const thumbnails = imgs.map((img, i) => locals.pb.files.getURL(games[i], img));
	return { games: games, thumbnails: thumbnails};
}
import { redirect } from '@sveltejs/kit';

export const load = async ({locals}) => {
	const animations = await locals.pb.collection('animations').getFullList();
	const imgsa = animations.map(({thumbnail}) => thumbnail);
	const thumbnailsa = imgsa.map((img, i) => locals.pb.files.getURL(animations[i], img));
	const games = await locals.pb.collection('games').getFullList();
	const imgsg = games.map(({thumbnail}) => thumbnail);
	const thumbnailsg = imgsg.map((img, i) => locals.pb.files.getURL(games[i], img));
	const favvids = locals.pb.authStore.record?.favourites || [];
	const favs = await Promise.all(favvids.map((id: string) => locals.pb.collection('animations').getOne(id)));
	const favimgs = favs.map(({thumbnail}) => thumbnail);
	const favids = favimgs.map((id) => id[0]);
	const favthumbnails = favimgs.map((img, i) => locals.pb.files.getURL(favs[i], img));
	return { animations: animations, thumbnailsa: thumbnailsa, games: games, thumbnailsg: thumbnailsg, favourites: { thumbnails: favthumbnails, ids: favids}};
}

export const actions = {
	logout: async ({locals}) => {
		locals.pb.authStore.clear();
	},
	name: async ({locals, request}) => {
		const data = await request.formData();
		const name = data.get('name');
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {name});
	},
	removename: async ({locals}) => {
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {name: ''});
	},
	search: async ({locals, request}) => {
		const data = await request.formData();
		const search = data.get('search') as string;
		const animations = await locals.pb.collection('animations').getFullList();
		const games = await locals.pb.collection('games').getFullList();
		const animationsFiltered = animations.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()));
		const gamesFiltered = games.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()));

		if(search.length < 3 ) throw redirect(303, '/home');

		if(animationsFiltered.length > 0){
			throw redirect(303, '/home/animations/' + animationsFiltered[0].thumbnail[0]);
		}
		else if(gamesFiltered.length > 0){
			throw redirect(303, '/home/games/' + gamesFiltered[0].thumbnail[0]);
		}
		else{
			throw redirect(303, '/home');
		}
	}
}
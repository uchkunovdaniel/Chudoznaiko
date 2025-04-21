import { redirect } from '@sveltejs/kit';

function dataURLtoFile(dataurl: string, filename: string) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
export const load = async ({locals}) => {
	const animations = await locals.pb.collection('animations').getFullList();
	const imgsa = animations.map(({thumbnail}) => thumbnail);
	const thumbnailsa = imgsa.map((img, i) => locals.pb.files.getURL(animations[i], img));

	const games = await locals.pb.collection('games').getFullList();
	const imgsg = games.map(({thumbnail}) => thumbnail);
	const thumbnailsg = imgsg.map((img, i) => locals.pb.files.getURL(games[i], img));

	const fav_videos = locals.pb.authStore.record?.favourite_animations || [];
	const favourite_animations = await Promise.all(fav_videos.map((id: string) => locals.pb.collection('animations').getOne(id)));
	const fav_a_imgs = favourite_animations.map(({thumbnail}) => thumbnail);
	const fav_a_ids = fav_a_imgs.map((id) => id[0]);
	const fav_a_thumbnails = fav_a_imgs.map((img, i) => locals.pb.files.getURL(favourite_animations[i], img));

	const fav_games = locals.pb.authStore.record?.favourite_games || [];
	const favourite_games = await Promise.all(fav_games.map((id: string) => locals.pb.collection('games').getOne(id)));
	const fav_g_imgs = favourite_games.map(({thumbnail}) => thumbnail);
	const fav_g_ids = fav_g_imgs.map((id) => id[0]);
	const fav_g_thumbnails = fav_g_imgs.map((img, i) => locals.pb.files.getURL(favourite_games[i], img));

	const avatar = locals.pb.files.getURL(locals.pb.authStore.record!, locals.pb.authStore.record?.avatar);

	return { avatar, animations: animations, thumbnailsa: thumbnailsa, games: games, thumbnailsg: thumbnailsg, favourites: { thumbnails: { animations: fav_a_thumbnails, games: fav_g_thumbnails }, ids: { animations: fav_a_ids, games: fav_g_ids}}};
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
	},
	saveimg: async ({locals, request}) => {
		const data = await request.formData();
		const img = data.get('image') as string;
		// console.log(img);
		const file = dataURLtoFile(img, 'avatar.png');
		await locals.pb.collection('users').update(locals.pb.authStore.record!.id, {avatar: file});
		throw redirect(303, '/home');
	}
}
import { redirect } from '@sveltejs/kit';



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

		if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
	else{
			return { user: locals.pb.authStore.record , avatar, animations: animations, thumbnailsa: thumbnailsa, games: games, thumbnailsg: thumbnailsg, favourites: { thumbnails: { animations: fav_a_thumbnails, games: fav_g_thumbnails }, ids: { animations: fav_a_ids, games: fav_g_ids}}};
	}
}

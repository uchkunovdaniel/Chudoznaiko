import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async  ({locals}) => {
	const animations = await locals.pb.collection('animations').getFullList();
	const imgs = animations.map(({thumbnail}) => thumbnail);
	const thumbnails = imgs.map((img, i) => locals.pb.files.getURL(animations[i], img));
	return { animations: animations, thumbnails: thumbnails};
}
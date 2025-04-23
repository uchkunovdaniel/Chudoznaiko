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

		// return { avatar: locals.pb.files.getURL(locals.pb.authStore.record!, locals.pb.authStore.record?.avatar) }
	}
}
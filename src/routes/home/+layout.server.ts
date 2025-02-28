import { redirect } from '@sveltejs/kit';


export const load = async ({locals}) => {
	// await locals.pb.collection('users').authRefresh();
	if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
	else{
		return{
			user: locals.pb.authStore.record,
		}
	}
}

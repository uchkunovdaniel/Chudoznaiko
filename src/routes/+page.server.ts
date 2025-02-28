import { redirect} from '@sveltejs/kit';
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({locals}) => {
	if(locals.pb.authStore.isValid){
		throw redirect(303, '/home');
	}
}

export const actions = {
	login: async ({locals, request}) => {
		const data = await request.formData();
		try{
				await locals.pb.collection('users').authWithPassword(`${data.get('email')}`, `${data.get('password')}`);
		} catch (e) {
			// console.log(error.data.message);
			return { success: false, message: 'Грешен имейл или парола' };
		}
	},
	register: async ({locals, request}) => {
		const data = await request.formData();
		try{
				await locals.pb.collection('users').create({email: `${data.get('email')}`, password: `${data.get('password')}`, passwordConfirm: `${data.get('passwordConfirm')}`});
				await locals.pb.collection('users').authWithPassword(`${data.get('email')}`, `${data.get('password')}`);
			} catch (error) {
				console.log(error);
			}
	},
	google: async ({ locals, cookies }) => {
		const provider = (await locals.pb.collection('users').listAuthMethods()).oauth2.providers.find((p) => p.name === 'google');
    cookies.set('provider', JSON.stringify(provider), {httpOnly: true, path: `http://127.0.0.1:8090/api/oauth2-redirect`});
    throw redirect(303, provider?.authURL + "http://127.0.0.1:8090/api/oauth2-redirect");
}
}

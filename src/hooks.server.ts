import Pocketbase from 'pocketbase';

export const handle = async ({event, resolve}) => {
	event.locals.pb = new Pocketbase('http://127.0.0.1:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if(event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.record
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
}
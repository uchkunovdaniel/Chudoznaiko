// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type Pocketbase from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: Pocketbase.Record | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

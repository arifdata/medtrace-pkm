import PocketBase from 'pocketbase'
import { writable } from 'svelte/store';

export const client = new PocketBase('http://localhost:8090');
client.autoCancellation(false);
export const isLoggedIn = writable(client.authStore.isValid);

client.authStore.onChange(() => {
    isLoggedIn.set(client.authStore.isValid);
});

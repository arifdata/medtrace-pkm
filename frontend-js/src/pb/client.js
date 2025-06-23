import PocketBase from 'pocketbase'

export const client = new PocketBase('http://localhost:8090');
client.autoCancellation(false);

// export default client;

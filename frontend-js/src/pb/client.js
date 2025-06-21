import PocketBase from 'pocketbase'

const client = new PocketBase('http://localhost:8090');
client.autoCancellation(false);

export default client;

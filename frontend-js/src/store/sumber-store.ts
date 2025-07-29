import { writable } from 'svelte/store';
import { client } from "../pb/client";

export const data = writable({
  value: 0,
});

export async function test(): any {
  const record = await client.collection('sumber').getFirstListItem();
  return record;
}

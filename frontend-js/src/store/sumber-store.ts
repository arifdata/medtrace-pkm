import { writable } from 'svelte/store';
import { client } from "../pb/client";
import type { RecordModel } from 'pocketbase';

export const data = writable<RecordModel[]>([]);

async function getFullSumber(): Promise<RecordModel[]> {
  let sumber: RecordModel[] = [];
  const records = await client.collection('sumber').getFullList({
    sort: 'sumber',
  });

  for (let i = 0; i < records.length; i++) {
    sumber.push(records[i]);
  }

  return sumber;
}

export async function setValueSumber(): Promise<void> {
  data.set(await getFullSumber());
}

setValueSumber();
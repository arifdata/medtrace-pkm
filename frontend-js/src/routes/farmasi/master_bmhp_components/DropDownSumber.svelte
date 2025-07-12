<script>
  import { client } from '../../../pb/client'
  import { ComboBox } from "carbon-components-svelte";

  export let idSumber = "";

  async function tarikDataSumber(){
    try {
      const records = await client.collection('sumber').getFullList();
      return records;
    } catch (error) {
      alert(error);
    }
  }

  function itemComboBox(data) {
    let items = [];

    for (let i = 0; i < data.length; i++) {
      const item = {
        id: i,
        text: data[i]['sumber'],
        idSumber: data[i]['id'],
      }

      items.push(item);
    }
    return items;
  }

  let promiseSumber = tarikDataSumber();

  export function refreshValue(){
    promiseSumber = tarikDataSumber();
  }

  function shouldFilterItem(item, value) {
    if (!value) return true;
    return item.text.toLowerCase().includes(value.toLowerCase());
  }

</script>

{#await promiseSumber}
  Loading...
  {:then val}

  <ComboBox
    titleText="Sumber"
    placeholder="Pilih satu sumber"
    items={itemComboBox(val)}
    {shouldFilterItem}
    on:select={(val) => {
      idSumber = val['detail']['selectedItem']['idSumber'];
    }}
    on:clear={(val) => {
      idSumber = "";
    }}
  />

  <br />

  {:catch error}
  {error}

{/await}

<script>
  import { ComboBox } from "carbon-components-svelte";

  import { storeSumber } from "../../../store/sumber-store.ts";

  export let idSumber = "";

  function itemComboBox(data) {
    let items = [];

    for (let i = 0; i < data.length; i++) {
      const item = {
        id: i,
        text: data[i]["sumber"],
        idSumber: data[i]["id"],
      };

      items.push(item);
    }
    return items;
  }

  function shouldFilterItem(item, value) {
    if (!value) return true;
    return item.text.toLowerCase().includes(value.toLowerCase());
  }
</script>

{#await $storeSumber}
  Loading...
{:then val}
  <ComboBox
    titleText="Sumber"
    placeholder="Pilih satu sumber"
    items={itemComboBox(val)}
    {shouldFilterItem}
    on:select={(val) => {
      idSumber = val["detail"]["selectedItem"]["idSumber"];
    }}
    on:clear={(val) => {
      idSumber = "";
    }}
  />

  <br />
{:catch error}
  {error}
{/await}

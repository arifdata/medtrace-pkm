<script>
  import { client } from "../../pb/client.js";
  import { Button, InlineNotification } from "carbon-components-svelte";
  export let params = {};

  // console.log(params["id"])
  async function getDataPasien(id) {
    const data = await client.collection("data_pasien").getOne(id);
    return data;
  }

  let dataPasien = getDataPasien(params["id"]);
</script>

{#await dataPasien}
  Loading...
{:then data}
  <Button>{data["nama_pasien"]}</Button>
{:catch error}
  <InlineNotification
    title="Error:"
    subtitle={error}
    lowContrast
    hideCloseButton
  />
{/await}

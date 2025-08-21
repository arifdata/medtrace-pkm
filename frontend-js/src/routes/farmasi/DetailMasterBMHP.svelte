<script>
  import { client } from "../../pb/client.js"
  export let params = {};

  import { storeSumber, setValueSumber } from "../../store/sumber-store";

  let queriedData = {};

  async function getData(id) {
    const record = await client.collection('master_bmhp').getOne(id);
    return record;
  }

  let coba = getData(params["id"]).then((data) => {
    queriedData["nama_obat"] = data["nama_obat"];
    queriedData["sumber"] = data["sumber"];
    queriedData["is_antibiotik"] = data["is_antibiotik"];
    queriedData["is_narko_psiko"] = data["is_narko_psiko"];
  });


  // setValueSumber();
  // console.log(yy);
  // JSON.stringify(yy);
</script>

<h4>Detail Master BMHP</h4>
{JSON.stringify(queriedData)}
<button on:click={() => {
  console.log(JSON.stringify(queriedData));
}}>tekan</button>

<!-- {$storeSumber[0].sumber} -->
{#await coba}

{:then data}

  test
{/await}

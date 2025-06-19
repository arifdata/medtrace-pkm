<script>
  import client from '../pb/client'

  async function cobaListPasien(){
  	const resultList = await client.collection('data_pasien').getList(1, 2, {
  	  sort: 'nama_pasien', //bisa juga -nama_pasien
  	});

  	//const data = await resultList.json();
  	return resultList;
  }

  let a = cobaListPasien();
  console.log(a);
</script>
<h4>Data Pasien</h4>

{#await a}
  ... Loading
{:then val}
  {#each val["items"] as data}
  	{data.nama_pasien}<br>
  {/each}
{:catch error}
  {error}
{/await}

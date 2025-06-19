<script>
  import client from '../pb/client'

  async function listPasien(){
  	const resultList = await client.collection('data_pasien').getList(1, 5, {
  	  sort: 'nama_pasien', //bisa juga -nama_pasien
  	});
  	return resultList;
  }


  import { SkeletonText } from "carbon-components-svelte";
</script>
<h4>Data Pasien</h4>

{#await listPasien()}
  <SkeletonText />
{:then val}
  {#if val["totalItems"] != 0}
	  {#each val["items"] as data}
	  	{data.nama_pasien}<br>
	  {/each}
  {:else}
  <p>
  Belum ada data pasien
  </p>
  {/if}
{:catch error}
  Login untuk akses halaman ini.
{/await}

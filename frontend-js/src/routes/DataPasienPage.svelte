<script>
  import client from "../pb/client";
  import { fakerID_ID as faker } from "@faker-js/faker";

  async function generateDataPasien() {
    // example create data
    const data = {
      nama_pasien: faker.person.fullName(),
      nomor_kartu: faker.finance.accountNumber(),
      alamat: faker.location.city(),
      tanggal_lahir: faker.date.birthdate(),
      nomor_telepon: faker.phone.number(),
    };

    const record = await client.collection("data_pasien").create(data);
  }

  async function listPasien() {
    const resultList = await client.collection("data_pasien").getList(1, 50, {
      sort: "nama_pasien", //bisa juga -nama_pasien
    });
    return resultList;
  }

  import { SkeletonText, Button } from "carbon-components-svelte";
</script>

<h4>Data Pasien</h4>
<Button on:click={generateDataPasien}>Generate Data</Button><br />

{#await listPasien()}
  <SkeletonText />
{:then val}
  {#if val["totalItems"] != 0}
    {#each val["items"] as data}
      {data.nama_pasien}<br />
    {/each}
  {:else}
    <p>Belum ada data pasien</p>
  {/if}
{:catch error}
  Login untuk akses halaman ini.
{/await}

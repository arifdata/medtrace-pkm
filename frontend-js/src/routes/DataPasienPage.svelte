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
    const resultList = await client.collection("data_pasien").getList(1, 10, {
      sort: "nama_pasien", //bisa juga -nama_pasien
    });
    return resultList;
  }

  function generateRowTablePasien(data){
    let rowData = [];
    for (let i = 0; i < data.length; i++) {
      rowData.push(
      {
        "id": data[i].id,
        "nama-pasien": data[i].nama_pasien,
        "nomor-kartu": data[i].nomor_kartu,
        "alamat": data[i].alamat,
        "usia": data[i].tanggal_lahir, 
        "no-hp": data[i].nomor_telepon,
      }
      );
    }
    return rowData;
  }

  import { SkeletonText, Button, DataTable } from "carbon-components-svelte";
</script>

<h4>Data Pasien</h4>
<Button on:click={generateDataPasien}>Generate Data</Button><br />

{#await listPasien()}
  <SkeletonText />
{:then val}
  {#if val["totalItems"] != 0}

<DataTable
  zebra
  headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        { key: "usia", value: "Usia" },
        { key: "no-hp", value: "Nomor Telepon" },
      ]}
  rows={generateRowTablePasien(val["items"])}
  />
  {:else}
    <p>Belum ada data pasien</p>
  {/if}
{:catch error}
  Login untuk akses halaman ini.
{/await}

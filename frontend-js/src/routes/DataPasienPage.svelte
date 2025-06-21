<script>
  import client from "../pb/client";
  import { fakerID_ID as faker } from "@faker-js/faker";
  import dayjs from "dayjs";
  import "dayjs/locale/id";
  dayjs.locale("id");

  // some icons
  import { Add, NextFilled, PreviousFilled } from "carbon-icons-svelte";

  // function untuk generate fake data
  async function generateDataPasien() {
    // example create data
    const data = {
      nama_pasien: faker.person.fullName(),
      nomor_kartu: faker.finance.accountNumber(),
      alamat: faker.location.city(),
      tanggal_lahir: faker.date.birthdate(),
      nomor_telepon: faker.phone.number(),
    };

    try {
      const record = await client
        .collection("data_pasien")
        .create(data)
        .then((data) => alert(data["nama_pasien"]));
    } catch (e) {
      alert(e);
    }
  }

  //function untuk menghitung usia
  function hitungUsia(tanggalLahir) {
    let dt1 = dayjs(tanggalLahir);
    let dt2 = dayjs();
    let usiaTahun = dt2.diff(dt1, "year");
    let usiaBulan = dt2.diff(dt1, "month") % 12;
    return `${dt1.format("D MMMM YYYY")} (${usiaTahun} th ${usiaBulan} bl)`;
  }

  //tarik seluruh data pasien dari pocketbase
  async function listFullPasien() {
    const resultList = await client.collection("data_pasien").getFullList({
      sort: "nama_pasien", //bisa juga -nama_pasien
    });
    return resultList;
  }

  // function untuk generate rowdata untuk komponen DataTable
  function generateRowTablePasien(data) {
    let rowData = [];
    for (let i = 0; i < data.length; i++) {
      rowData.push({
        id: data[i].id,
        "nama-pasien": data[i].nama_pasien,
        "nomor-kartu": data[i].nomor_kartu,
        alamat: data[i].alamat,
        usia: hitungUsia(data[i].tanggal_lahir),
        "no-hp": data[i].nomor_telepon,
      });
    }
    return rowData;
  }

  import {
    Grid,
    Column,
    Row,
    SkeletonText,
    Pagination,
    DataTable,
  } from "carbon-components-svelte";

  let promiseListPasien = listFullPasien();
  let pageSize = 10;
  let page = 1;
</script>

<Grid>
  <Row>
    <Column><h4>Data Pasien</h4></Column>

    <Column>
      <button on:click={generateDataPasien}>Fake Data</button>
    </Column>
  </Row>
</Grid>

{#await promiseListPasien}
  <SkeletonText />
{:then val}
  {#if val.length > 0}
    <DataTable
      sortable
      size="short"
      zebra
      headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        { key: "usia", value: "Tanggal Lahir" },
        { key: "no-hp", value: "Nomor Telepon" },
      ]}
      rows={generateRowTablePasien(val)}
      {page}
      {pageSize}
    />
    <Pagination
      bind:pageSize
      bind:page
      totalItems={val.length}
      pageSizes={[10, 15, 20]}
    />
  {:else}
    <p>Belum ada data pasien</p>
  {/if}
{:catch error}
  Login untuk akses halaman ini.
{/await}

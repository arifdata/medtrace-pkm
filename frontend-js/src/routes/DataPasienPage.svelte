<script>
  import {client} from "../pb/client";
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
        .then((data) => console.log(data["nama_pasien"]));
    } catch (e) {
      console.log(e);
    }
  }

  function generateBanyakDataPasien(number) {
    for (let i = 0; i < number; i++) {
      generateDataPasien();
    }
  }

  //function untuk menampilan tanggal lahir dengan enak dibaca
  function rapikanTanggalLahir(tanggalLahir) {
    let dt = dayjs(tanggalLahir);
    return dt.format("DD MMMM YYYY");
  }

  //function untuk menghitung usia
  function hitungUsia(tanggalLahir) {
    let dt1 = dayjs(tanggalLahir);
    let dt2 = dayjs();
    let usiaTahun = dt2.diff(dt1, "year");
    let usiaBulan = dt2.diff(dt1, "month") % 12;
    return `${usiaTahun} tahun ${usiaBulan} bulan`;
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
        "tgl-lahir": rapikanTanggalLahir(data[i].tanggal_lahir),
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
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Button,
  } from "carbon-components-svelte";

  let promiseListPasien = listFullPasien();
  let pageSize = 15;
  let page = 1;
</script>

<Grid>
  <Row>
    <Column>
      <!-- <button on:click={generateDataPasien}>Fake Data</button> -->
    </Column>
  </Row>
</Grid>

{#await promiseListPasien}
  <SkeletonText />
{:then val}
  {#if val.length > 0}
    <DataTable
      title="Data Pasien"
      sortable
      size="short"
      zebra
      headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        { key: "tgl-lahir", value: "Tanggal Lahir" },
        { key: "usia", value: "Usia" },
        { key: "no-hp", value: "Nomor Telepon" },
      ]}
      rows={generateRowTablePasien(val)}
      {page}
      {pageSize}
    >
      <Toolbar size="sm">
        <ToolbarContent>
          <ToolbarSearch persistent shouldFilterRows />
        </ToolbarContent>
      </Toolbar>
    </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={val.length}
      pageSizes={[15, 20]}
    />
  {:else}
    <p>Belum ada data pasien</p>
  {/if}
{:catch error}
  Login untuk akses halaman ini.
{/await}
<button
  on:click={() => {
    generateBanyakDataPasien(500);
  }}>Generate 500 Fake Data</button
>

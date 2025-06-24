<script>
  import { client } from "../../pb/client";
  import { fakerID_ID as faker } from "@faker-js/faker";
  import dayjs from "dayjs";
  import "dayjs/locale/id";
  dayjs.locale("id");

  // some icons
  import { Add, Renew } from "carbon-icons-svelte";

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
    DataTableSkeleton,
    InlineNotification,
    Pagination,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Button,
    Link,
  } from "carbon-components-svelte";

  let promiseListPasien = listFullPasien();
  let pageSize = 20;
  let page = 1;
</script>

{#await promiseListPasien}
  <DataTableSkeleton
    size="short"
    zebra
    headers={[
      "Nama Pasien",
      "Nomor Kartu",
      "Alamat",
      "Tanggal Lahir",
      "Usia",
      "Nomor Telepon",
    ]}
    rows={20}
  />
{:then val}
  {#if val.length > 0}
    <DataTable
      title="Data Pasien"
      sortable
      size="short"
      zebra
      expandable
      stickyHeader
      headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        //{ key: "tgl-lahir", value: "Tanggal Lahir" },
        { key: "usia", value: "Usia" },
        //{ key: "no-hp", value: "Nomor Telepon" },
      ]}
      rows={generateRowTablePasien(val)}
      {page}
      {pageSize}
      on:click:row={(data) => {
        // console.log(data["detail"]);
        window.open(`#/data_pasien/${data["detail"]["id"]}`, "_blank").focus();
      }}
    >
      <Toolbar size="sm">
        <ToolbarContent>
          <ToolbarSearch persistent shouldFilterRows />
          <Button icon={Add}>Tambah Data</Button>
          <Button
            icon={Renew}
            on:click={() => {
              promiseListPasien = listFullPasien();
            }}>Refresh</Button
          >
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="expanded-row" let:row>
        <pre>Tanggal lahir: {row["tgl-lahir"]}</pre>
        <pre>Nomor telepon: {row["no-hp"]}</pre>
      </svelte:fragment>
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === "rule"}
          <Link
            icon={Launch}
            href="https://en.wikipedia.org/wiki/Round-robin_DNS"
            target="_blank">{cell.value}</Link
          >
        {:else}
          {cell.value}
        {/if}
      </svelte:fragment>
    </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={val.length}
      pageSizes={[20, 35, 50]}
    />
  {:else}
    <DataTable
      title="Data Pasien"
      description="Belum ada data pasien."
      size="short"
      zebra
      expandable
      headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        //{ key: "tgl-lahir", value: "Tanggal Lahir" },
        { key: "usia", value: "Usia" },
        //{ key: "no-hp", value: "Nomor Telepon" },
      ]}
      rows={[]}
      {page}
      {pageSize}
    >
      <Toolbar size="sm">
        <ToolbarContent>
          <ToolbarSearch persistent />
          <Button icon={Add}>Tambah Data</Button>
          <Button
            icon={Renew}
            on:click={() => {
              promiseListPasien = listFullPasien();
            }}>Refresh</Button
          >
        </ToolbarContent>
      </Toolbar>
    </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={0}
      pageSizes={[20, 35, 50]}
    />
  {/if}
{:catch error}
  <InlineNotification
    title="Error:"
    subtitle={error}
    lowContrast
    hideCloseButton
  />
{/await}

<!-- <button -->
<!--   on:click={() => { -->
<!--     generateBanyakDataPasien(500); -->
<!--   }}>Generate 500 Fake Data</button -->
<!-- > -->

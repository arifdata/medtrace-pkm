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

    const record = await client
      .collection("data_pasien")
      .create(data)
      .then((data) => alert(data["nama_pasien"]));
  }

  //function untuk menghitung usia
  function hitungUsia(tanggalLahir) {
    let dt1 = dayjs(tanggalLahir);
    let dt2 = dayjs();
    let usiaTahun = dt2.diff(dt1, "year");
    let usiaBulan = dt2.diff(dt1, "month") % 12;
    return `${dt1.format("D MMMM YYYY")} (${usiaTahun} th ${usiaBulan} bl)`;
  }

  //function tarik data dari pocketbase berdasarkan halaman
  async function listPasien(halaman) {
    const resultList = await client
      .collection("data_pasien")
      .getList(halaman, 10, {
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
    Button,
    ButtonSet,
    DataTable,
  } from "carbon-components-svelte";

  let indeksPage = 1;
  let promiseListPasien = listPasien(indeksPage);
</script>

<Grid>
  <Row>
    <Column><h4>Data Pasien</h4></Column>
    <Column></Column>
    <Column></Column>
    <Column></Column>
    <Column></Column>
    <Column>
      <Button
        size="small"
        icon={Add}
        iconDescription="Tambah Data"
        on:click={generateDataPasien}
      />
      <Button
        size="small"
        icon={PreviousFilled}
        iconDescription="Mundur"
        on:click={() => {
          indeksPage -= 1;
          if (indeksPage < 1) {
            indeksPage = 1;
            promiseListPasien = listPasien(indeksPage);
          } else {
            promiseListPasien = listPasien(indeksPage);
          }
        }}
      />
      <Button
        size="small"
        icon={NextFilled}
        iconDescription="Maju"
        on:click={() => {
          indeksPage += 1;
          promiseListPasien = listPasien(indeksPage);
        }}
      />
    </Column>
  </Row>
</Grid>

{#await promiseListPasien}
  <SkeletonText />
{:then val}
  {#if val["totalItems"] != 0}
    <DataTable
      zebra
      headers={[
        { key: "nama-pasien", value: "Nama Pasien" },
        { key: "nomor-kartu", value: "Nomor Kartu" },
        { key: "alamat", value: "Alamat" },
        { key: "usia", value: "Tanggal Lahir" },
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

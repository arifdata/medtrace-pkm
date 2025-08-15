<script>
  import { client } from "../../../pb/client";

  import {
    Pagination,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Button,
    Loading,
    Modal,
    TextInput,
    Toggle,
    Grid,
    Row,
    Column,
    Link,
  } from "carbon-components-svelte";

  import { Add, Renew } from "carbon-icons-svelte";

  import DropDownSumber from "./DropDownSumber.svelte";
  import { storeSumber, setValueSumber } from "../../../store/sumber-store";
  setValueSumber();

  async function createNewMaster() {
    try {
      const data = {
        nama_obat: nama_obat,
        sumber: idSumber,
        is_generik: is_generik,
        is_alkes: is_alkes,
      };
      await client.collection("master_bmhp").create(data);
      return true;
    } catch (err) {
      return false;
    }
  }

  let modalAddMaster = false;
  let addLoading = false;

  async function listFullMasterBMHP() {
    const resultList = await client.collection("master_bmhp").getFullList({
      sort: "nama_obat",
      expand: "sumber",
    });
    return resultList;
  }

  function generateRowMasterBMHP(value) {
    let rowData = [];
    for (let i = 0; i < value.length; i++) {
      rowData.push({
        id: value[i].id,
        "nama-bmhp": value[i].nama_obat,
        sumber: $storeSumber[i].sumber,
        "is-generik": value[i].is_generik ? "Generik" : "Non-Gnrk",
        "is-alkes": value[i].is_alkes ? "Alkes" : "Non-Alks",
      });
    }
    return rowData;
  }

  let promiseListMaster = listFullMasterBMHP();
  let pageSize = 20;
  let page = 1;

  let nama_obat = "";
  let idSumber;
  let is_generik = true;
  let is_alkes = false;

  let sumberDropdown;

  import { successToast, errorToast } from "../../../utils/toast";
</script>

{#await promiseListMaster}
  <Loading />
{:then val}
  {#if val.length > 0}
    <DataTable
      title="Master Item BMHP"
      sortable
      size="short"
      zebra
      stickyHeader
      headers={[
        { key: "nama-bmhp", value: "Nama BMHP" },
        { key: "sumber", value: "Sumber" },
        { key: "is-generik", value: "Generik?" },
        { key: "is-alkes", value: "Alkes?" },
      ]}
      rows={generateRowMasterBMHP(val)}
      {page}
      {pageSize}
    >
      <Toolbar size="sm">
        <ToolbarContent>
          <ToolbarSearch persistent shouldFilterRows />
          <Button
            icon={Add}
            on:click={() => {
              modalAddMaster = true;
            }}>Tambah Data</Button
          >
          <Button
            icon={Renew}
            on:click={() => {
              promiseListMaster = listFullMasterBMHP();
              sumberDropdown.refreshValue();
            }}>Muat ulang</Button
          >
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === "nama-bmhp"}
          <Link
            href={`#/farmasi/master_bmhp/detail/${row["id"]}`}
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
    belum ada data
  {/if}
{/await}

<Modal
  bind:open={modalAddMaster}
  modalHeading="Tambah Master Item Baru"
  primaryButtonText="Submit"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#nama-bmhp"
  on:click:button--secondary={() => {
    modalAddMaster = false;
    nama_obat = "";
    is_generik = true;
    is_alkes = false;
  }}
  on:open
  on:close
  on:submit={() => {
    addLoading = true;
    createNewMaster().then((val) => {
      if (val) {
        addLoading = false;
        modalAddMaster = false;
        promiseListMaster = listFullMasterBMHP();
        successToast("Berhasil menambah data");
      } else {
        addLoading = false;
        modalAddMaster = false;
        errorToast("Gagal menambah data.");
      }
    });
  }}
>
  <Loading bind:active={addLoading} />

  <TextInput
    id="nama-bmhp"
    labelText="Nama BMHP"
    placeholder="Masukkan nama BMHP..."
    bind:value={nama_obat}
  />
  <br />
  <DropDownSumber bind:this={sumberDropdown} bind:idSumber />

  <Grid narrow>
    <Row>
      <Column>
        <Toggle
          labelText="Apakah termasuk Alkes"
          bind:toggled={is_alkes}
          labelA="Non Alkes"
          labelB="Alkes"
          size="sm"
        />
      </Column>
      <Column>
        <Toggle
          labelText="Apakah termasuk Obat Generik"
          bind:toggled={is_generik}
          labelA="Non Generik"
          labelB="Generik"
          size="sm"
        />
      </Column>
    </Row>
  </Grid>
</Modal>

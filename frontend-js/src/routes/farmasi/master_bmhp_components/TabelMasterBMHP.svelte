<script>
    import { client } from "../../../pb/client";

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
        Loading,
        Modal,
        TextInput,
        Toggle,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";

    import { Add, Renew } from "carbon-icons-svelte";

    import DropDownSumber from './DropDownSumber.svelte'

    async function createNewMaster(){
      try {
        const data = {
          "nama_obat": "Suntikan Maxx",
          "sumber": "tptoah9makn5utt",
          "is_generik": false,
          "is_alkes": true,
        };
        await client.collection('master_bmhp').create(data);
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

    function generateRowMasterBMHP(data) {
      let rowData = [];
      for (let i = 0; i < data.length; i++) {
        rowData.push({
          id: data[i].id,
          "nama-bmhp": data[i].nama_obat,
          "sumber": data[i].expand.sumber.sumber,
          "is-generik": data[i].is_generik ? "Generik" : "Non-Gnrk",
          "is-alkes": data[i].is_alkes ? "Alkes" : "Non-Alks",
        });
      }
      return rowData;
    }

    let promiseListMaster = listFullMasterBMHP();
    let pageSize = 20;
    let page = 1;

    let nama_obat = "";
    let sumber = "";
    let is_generik = true;
    let is_alkes = false;
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
          <Button icon={Add}
			on:click={() => {
				modalAddMaster = true;
			}}
            >Tambah Data</Button
          >
          <Button icon={Renew}
            on:click={() => {
              promiseListMaster = listFullMasterBMHP();
            }}>Muat ulang</Button
          >
        </ToolbarContent>
      </Toolbar>
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
  }}
  on:open
  on:close
  on:submit={() => {
    addLoading = true;
    createNewMaster().then((val) => {
      if (val) {
        alert("Berhasil");
        addLoading = false;
        modalAddMaster = false;
        promiseListMaster = listFullMasterBMHP();
      } else {
        alert("Gagal");
        addLoading = false;
        modalAddMaster = false;
      }
    });
  }}
>
  <Loading bind:active={addLoading}/>

  <TextInput
    id="nama-bmhp"
    labelText="Nama BMHP"
    placeholder="Masukkan nama BMHP..."
    bind:value={nama_obat}
  />
  <br />
  <DropDownSumber />

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

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
    } from "carbon-components-svelte";

    import { Add, Renew } from "carbon-icons-svelte";

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
          <Button icon={Add} href="#/farmasi/master_bmhp/tambah" target="_blank"
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

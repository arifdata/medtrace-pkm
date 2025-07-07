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
        });
      }
      return rowData;
    }

    let promiseListMaster = listFullMasterBMHP();
    let pageSize = 20;
    let page = 1;
    console.log(promiseListMaster);
</script>

{#await promiseListMaster}
  loading...
{:then val}
  {#if val.length > 0}
    <DataTable
      title="Master Item BMHP"
      sortable
      size="short"
      zebra
      expandable
      stickyHeader
      headers={[
        { key: "nama-bmhp", value: "Nama BMHP" },
        { key: "sumber", value: "Sumber" },
      ]}
      rows={generateRowMasterBMHP(val)}
      {page}
      {pageSize}
    >
      <Toolbar size="sm">
        <ToolbarContent>
          <ToolbarSearch persistent shouldFilterRows />
          <Button icon={Add} href="#/data_pasien/tambah" target="_blank"
            >Tambah Data</Button
          >
          <Button icon={Renew}
            on:click={() => {
              console.log("test");
            }}>Muat ulang</Button
          >
        </ToolbarContent>
      </Toolbar>
  </DataTable>
  {:else}
  belum ada data
  {/if}
{/await}

<script>
  import { client } from "../../../pb/client";
  import {
    Button,
    Modal,
    TextInput,
    ButtonSet,
    Grid,
    Row,
    Column,
    UnorderedList,
    ListItem,
    Loading,
  } from "carbon-components-svelte";

  import { Add, Renew } from "carbon-icons-svelte";

  let modalSumberOpened = false;
  let valueNewSumber = "";
  let addLoading = false;

  async function listFullSumber() {
    const resultList = await client.collection("sumber").getFullList();
    return resultList;
  }

  async function createNewSumber(value) {
    const data = {
      sumber: value,
    };
    await client.collection("sumber").create(data);
  }

  let promiseListSumber = listFullSumber();
</script>

<Modal
  bind:open={modalSumberOpened}
  modalHeading="Tambah sumber BMHP baru"
  primaryButtonText="Submit"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#form-sumber"
  on:click:button--secondary={() => {
    modalSumberOpened = false;
    valueNewSumber = "";
  }}
  on:open
  on:close
  on:submit={() => {
    addLoading = true;
    createNewSumber(valueNewSumber).then(() => {
      valueNewSumber = "";
      promiseListSumber = listFullSumber();
      addLoading = false;
      modalSumberOpened = false;
    });
  }}
>
<Loading bind:active={addLoading}/>
  <TextInput
    id="form-sumber"
    labelText="Sumber BMHP"
    placeholder="Masukkan sumber BMHP..."
    bind:value={valueNewSumber}
  />
</Modal>

<Grid noGutterLeft narrow>
  <Row>
    <Column><h6>Sumber BMHP</h6></Column>
    <Column></Column>
    <Column></Column>
    <Column
      ><ButtonSet>
        <Button
          icon={Add}
          size="small"
          on:click={() => (modalSumberOpened = true)}>Tambah sumber</Button
        >
        <Button
          icon={Renew}
          size="small"
          on:click={() => {
            promiseListSumber = listFullSumber();
          }}>Muat ulang</Button
        >
      </ButtonSet></Column
    >
  </Row>
</Grid>

<br />

{#await promiseListSumber}
  <Loading />
{:then val}
  {#if val.length > 0}
    <UnorderedList>
      {#each val as item}
        <ListItem>{item.sumber}</ListItem>
      {/each}
    </UnorderedList>
  {:else}
    Belum ada data
  {/if}
{:catch error}
  {error}
{/await}

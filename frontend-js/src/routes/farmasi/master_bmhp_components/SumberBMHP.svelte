<script>
  import { client } from "../../../pb/client";
  import {
    Button,
    Modal,
    TextInput,
    Grid,
    Row,
    Column,
    UnorderedList,
    ListItem,
    Loading,
    Link,
  } from "carbon-components-svelte";

  import { Add } from "carbon-icons-svelte";

  let modalSumberOpened = false;
  let valueNewSumber = "";
  let loading = false;

  async function createNewSumber(value) {
    const data = {
      sumber: value,
    };
    await client.collection("sumber").create(data);
  }

  async function editSumber(id, newValue) {
    const data = {
      sumber: newValue,
    };
    await client.collection("sumber").update(id, data);
  }

  import { storeSumber, setValueSumber } from "../../../store/sumber-store";
  setValueSumber();

  let modalEditOpened = false;
  let idModal = "";
  let editNewSumber = "";
  let buffereditNewSumber = "";
  let disableEditModalPrimaryButton = false;
</script>

<Modal
  bind:open={modalEditOpened}
  on:open
  bind:primaryButtonDisabled={disableEditModalPrimaryButton}
  on:close={() => {
    idModal = "";
    editNewSumber = "";
  }}
  modalHeading="Edit Nama Sumber"
  primaryButtonText="Submit"
  secondaryButtonText="Cancel"
  selectorPrimaryFocus="#edit-sumber"
  on:click:button--secondary={() => {
    modalEditOpened = false;
  }}
  on:submit={() => {
    loading = true;
    editSumber(idModal, editNewSumber).then(() => {
      loading = false;
      setValueSumber();
      modalEditOpened = false;
    });
  }}
>
  <Loading bind:active={loading} />
  <TextInput
    bind:value={editNewSumber}
    id="edit-sumber"
    on:input={() => {
      if (editNewSumber == "" || editNewSumber == buffereditNewSumber) {
        disableEditModalPrimaryButton = true;
      } else {
        disableEditModalPrimaryButton = false;
      }
    }}
  />
</Modal>

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
    loading = true;
    createNewSumber(valueNewSumber).then(() => {
      valueNewSumber = "";
      loading = false;
      modalSumberOpened = false;
      setValueSumber();
    });
  }}
>
  <Loading bind:active={loading} />
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
    <Column>
      <Button
        icon={Add}
        size="small"
        on:click={() => (modalSumberOpened = true)}>Tambah sumber</Button
      >
    </Column>
  </Row>
</Grid>

<br />

{#await $storeSumber}
  <Loading />
{:then val}
  {#if val.length > 0}
    <UnorderedList>
      {#each val as item}
        <ListItem>
          <Link
            on:click={() => {
              modalEditOpened = true;
              idModal = item.id;
              editNewSumber = item.sumber;
              buffereditNewSumber = item.sumber;
              disableEditModalPrimaryButton = true;
            }}>{item.sumber}</Link
          >
        </ListItem>
      {/each}
    </UnorderedList>
  {:else}
    Belum ada data
  {/if}
{:catch error}
  {error}
{/await}

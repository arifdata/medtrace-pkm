<script>
  import { Button, Modal, TextInput } from "carbon-components-svelte";
  let modalSumberOpened = false;
</script>

<Button size="small" on:click={() => (modalSumberOpened = true)} >Tambah sumber BMHP</Button>
<Modal
    bind:open={modalSumberOpened}
    modalHeading="Tambah sumber BMHP baru"
    primaryButtonText="Submit"
    secondaryButtonText="Cancel"
    selectorPrimaryFocus="#form-sumber"
    on:click:button--secondary={() => (modalSumberOpened = false)}
    on:open
    on:close
    on:submit
  >
      <TextInput
    id="form-sumber"
    labelText="Sumber BMHP"
    placeholder="Masukkan sumber BMHP..."
  />
    </Modal>

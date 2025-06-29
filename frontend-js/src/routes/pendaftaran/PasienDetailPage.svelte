<script>
  import { client } from "../../pb/client.js";
  import {
    Button,
    InlineNotification,
    Grid,
    Column,
    Row,
    Tile,
    SkeletonPlaceholder,
    Form,
    FormGroup,
    TextInput,
  } from "carbon-components-svelte";

  import isEqual from "underscore/modules/isEqual";
  export let params = {};

  let queriedData = {};

  // console.log(params["id"])
  async function getDataPasien(id) {
    const data = await client.collection("data_pasien").getOne(id);
    return data;
  }

  let dataPasien = getDataPasien(params["id"]).then((data) => {
    queriedData["namaPasienOri"] = data["nama_pasien"];
    queriedData["nomorKartuOri"] = data["nomor_kartu"];
    queriedData["alamatOri"] = data["alamat"];
    queriedData["tanggalLahirOri"] = data["tanggal_lahir"].slice(0, 10);
    queriedData["nomorTeleponOri"] = data["nomor_telepon"];
  });

  let bufferData = queriedData;
  let buttonDisabled = isEqual(queriedData, bufferData);
</script>

<h4>Detail Pasien</h4>

<br />

<Grid noGutterLeft>
  <Row>
    <Column>
      <Tile light>
        <h5>Original Data</h5>
        <br />
        <strong>Nama Pasien:</strong>
        {queriedData["namaPasienOri"]}<br /><br />

        <strong>Nomor Kartu:</strong>
        {#if queriedData["nomorKartuOri"]}{queriedData[
            "nomorKartuOri"
          ]}{:else}-{/if}<br /><br />

        <strong>Alamat:</strong>
        {queriedData["alamatOri"]}<br /><br />

        <strong>Tanggal Lahir:</strong>
        {queriedData["tanggalLahirOri"]}<br /><br />

        <strong>Nomor Telepon:</strong>
        {#if queriedData["nomorTeleponOri"]}{queriedData[
            "nomorTeleponOri"
          ]}{:else}-{/if}<br /><br />
      </Tile>
    </Column>
    <Column>
      <Tile>
        {#await dataPasien}
          <SkeletonPlaceholder />
        {:then data}
          <h5>Edit Data</h5>
          <br />
          <Form
            on:submit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <FormGroup>
              <TextInput
                labelText="Nama Pasien"
                value={queriedData["namaPasienOri"]}
                on:input={(val) => {
                  console.log(val);
                  if (queriedData["namaPasienOri"] != val["detail"]) {
                    buttonDisabled = false;
                  } else {
                    buttonDisabled = true;
                  }
                }}
              ></TextInput>
            </FormGroup>
            <Button bind:disabled={buttonDisabled} size="small" type="submit"
              >Edit</Button
            >
          </Form>
        {:catch error}
          <InlineNotification
            title="Error:"
            subtitle={error}
            lowContrast
            hideCloseButton
          />
        {/await}
      </Tile></Column
    >
  </Row>
</Grid>
<br />

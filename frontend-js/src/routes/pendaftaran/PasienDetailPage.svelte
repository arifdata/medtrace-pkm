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
  export let params = {};

  let buttonDisabled = true;

  let queriedData = {};

  // console.log(params["id"])
  async function getDataPasien(id) {
    const data = await client.collection("data_pasien").getOne(id);
    return data;
  }

  let dataPasien = getDataPasien(params["id"]).then((data) => {
    queriedData["namaPasienOri"] = data["nama_pasien"];
  });
</script>

<h4>Detail Pasien</h4>

<Grid noGutterLeft>
  <Row>
    <Column>
      <Tile>
        {#await dataPasien}
          <SkeletonPlaceholder />
        {:then data}
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
      </Tile>
    </Column>
    <Column></Column>
    <Column></Column>
  </Row>
</Grid>
<br />

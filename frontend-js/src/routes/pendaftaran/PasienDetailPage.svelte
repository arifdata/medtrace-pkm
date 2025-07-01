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
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";


  import { isEqual } from "lodash";
  import { Indonesian } from "flatpickr/dist/l10n/id.js";
  export let params = {};

  let queriedData = {};
  let bufferData = {};

  // console.log(params["id"])
  async function getDataPasien(id) {
    const data = await client.collection("data_pasien").getOne(id);
    return data;
  }

  function aturTanggal(tanggal) {
    let tglSplit = tanggal.split("-");
    return `${tglSplit[2]}-${tglSplit[1]}-${tglSplit[0]}`;
  }

  let dataPasien = getDataPasien(params["id"]).then((data) => {
    queriedData["nama_pasien"] = data["nama_pasien"];
    queriedData["nomor_kartu"] = data["nomor_kartu"];
    queriedData["alamat"] = data["alamat"];
    queriedData["tanggal_lahir"] = aturTanggal(
      data["tanggal_lahir"].slice(0, 10),
    );
    queriedData["nomor_telepon"] = data["nomor_telepon"];

    bufferData["nama_pasien"] = data["nama_pasien"];
    bufferData["nomor_kartu"] = data["nomor_kartu"];
    bufferData["alamat"] = data["alamat"];
    bufferData["tanggal_lahir"] = aturTanggal(
      data["tanggal_lahir"].slice(0, 10),
    );
    bufferData["nomor_telepon"] = data["nomor_telepon"];
  });

  // console.log(queriedData);
  // console.log(bufferData);
  // console.log(isEqual(queriedData, bufferData));
  let buttonDisabled = true;
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
        {queriedData["nama_pasien"]}<br /><br />

        <strong>Nomor Kartu:</strong>
        {#if queriedData["nomor_kartu"]}{queriedData[
            "nomor_kartu"
          ]}{:else}-{/if}<br /><br />

        <strong>Alamat:</strong>
        {queriedData["alamat"]}<br /><br />

        <strong>Tanggal Lahir:</strong>
        {queriedData["tanggal_lahir"]}<br /><br />

        <strong>Nomor Telepon:</strong>
        {#if queriedData["nomor_telepon"]}{queriedData[
            "nomor_telepon"
          ]}{:else}-{/if}<br /><br />
      </Tile>
    </Column>
    <Column>
      <Tile>
        {#await dataPasien}
          <SkeletonPlaceholder />
        {:then data}
          <h5>Perbaharui Data</h5>
          <br />
          <Form
            on:submit={(e) => {
              e.preventDefault();
              console.log(e['target'][1].value);
              console.log(e['target'][2].value);
              console.log(e['target'][3].value);
              const tgl = e['target'][4].value;
              const tglSplit = tgl.split("-");
              console.log(tglSplit)
              const tglParse = Date.parse(`${tglSplit[2]}-${tglSplit[1]}-${tglSplit[0]}T00:00:00Z`);
              console.log(tglParse);
              console.log(e['target'][7].value);
              console.log(params['id']);
            }}
          >
            <FormGroup>
              <TextInput
                required
                labelText="Nama Pasien"
                value={bufferData["nama_pasien"]}
                on:input={(val) => {
                  bufferData["nama_pasien"] = val["detail"];
                  buttonDisabled = isEqual(queriedData, bufferData);
                }}
              ></TextInput>

              <TextInput
                labelText="Nomor kartu"
                value={bufferData["nomor_kartu"]}
                on:input={(val) => {
                  bufferData["nomor_kartu"] = val["detail"];
                  buttonDisabled = isEqual(queriedData, bufferData);
                }}
              ></TextInput>

              <TextInput
                required
                labelText="Alamat"
                value={bufferData["alamat"]}
                on:input={(val) => {
                  bufferData["alamat"] = val["detail"];
                  buttonDisabled = isEqual(queriedData, bufferData);
                }}
              ></TextInput>

              <DatePicker
                locale={Indonesian}
                light
                value={bufferData["tanggal_lahir"]}
                datePickerType="single"
                on:change={(val) => {
                  bufferData["tanggal_lahir"] = val["detail"]["dateStr"];
                  buttonDisabled = isEqual(queriedData, bufferData);
                }}
                dateFormat="d-m-Y"
              >
                <DatePickerInput
                  required
                  labelText="Tanggal Lahir"
                  placeholder="DD-MM-YYYY"
                  pattern={`\\d{1,2}\\-\\d{1,2}\\-\\d{4}`}
                />
              </DatePicker>

              <TextInput
                labelText="Nomor Telepon"
                value={bufferData["nomor_telepon"]}
                on:input={(val) => {
                  bufferData["nomor_telepon"] = val["detail"];
                  buttonDisabled = isEqual(queriedData, bufferData);
                }}
              ></TextInput>
            </FormGroup>
            <Button bind:disabled={buttonDisabled} size="small" type="submit"
              >Ubah Data</Button
            >
            <!-- <button
              on:click={() => {
                buttonDisabled = !buttonDisabled;
                console.log(buttonDisabled);
              }}>aaa</button
            > -->
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

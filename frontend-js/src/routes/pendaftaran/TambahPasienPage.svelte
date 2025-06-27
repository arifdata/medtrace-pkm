<script>
  import {
    TextInput,
    Button,
    DatePicker,
    DatePickerInput,
    Form,
    FormGroup,
    Loading,
  } from "carbon-components-svelte";
  import { Indonesian } from "flatpickr/dist/l10n/id.js";
  import { parseDatePicker } from "../../utils/dateUtils";
  import { tambahDataPasien } from "../../utils/crudUtils";
  import { tr } from "@faker-js/faker";

  let buttonIsDisabled = false;

  let namaPasienInput;
  let nomorKartuInput;
  let alamatInput;
  let tanggalInput;
  let nomorTeleponInput;

  let invalidValues = {};

  function clearForm() {
    namaPasienInput = undefined;
    nomorKartuInput = undefined;
    alamatInput = undefined;
    tanggalInput = undefined;
    nomorTeleponInput = undefined;
  }
</script>

<h4>Tambah pasien</h4>

<Form
  on:submit={(e) => {
    e.preventDefault();
    buttonIsDisabled = true;
    tambahDataPasien(
      namaPasienInput,
      nomorKartuInput,
      alamatInput,
      parseDatePicker(tanggalInput),
      nomorTeleponInput,
    ).then((sukses) => {
      if (sukses) {
        buttonIsDisabled = false;
        clearForm();
      }
    });
  }}
>
  <FormGroup>
    <TextInput
      required
      light
      size="sm"
      invalidText={invalidValues["namaWarnText"]}
      invalid={invalidValues["namaWarn"]}
      labelText="Nama"
      placeholder="Masukkan nama pasien..."
      bind:value={namaPasienInput}
      on:input={(val) => {
        if (val["detail"] == "") {
          invalidValues["namaWarnText"] = "Nama tidak boleh kosong";
          invalidValues["namaWarn"] = true;
        } else if (val["detail"].length > 100) {
          invalidValues["namaWarnText"] = "Maksimal 100 karakter";
          invalidValues["namaWarn"] = true;
        } else {
          invalidValues["namaWarn"] = false;
        }
      }}
    />

    <TextInput
      size="sm"
      light
      labelText="Nomor Kartu"
      placeholder="Masukkan nomor kartu..."
      bind:value={nomorKartuInput}
    />

    <TextInput
      light
      size="sm"
      invalid={invalidValues["alamatWarn"]}
      invalidText={invalidValues["alamatWarnText"]}
      labelText="Alamat"
      placeholder="Masukkan alamat pasien..."
      bind:value={alamatInput}
      on:input={(val) => {
        if (val["detail"] == "") {
          invalidValues["alamatWarnText"] = "Alamat tidak boleh kosong";
          invalidValues["alamatWarn"] = true;
        } else {
          invalidValues["alamatWarn"] = false;
        }
      }}
    />

    <DatePicker
      locale={Indonesian}
      light
      datePickerType="single"
      on:change
      bind:value={tanggalInput}
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
      size="sm"
      light
      labelText="Nomor Telepon"
      placeholder="Masukkan nomor telepon..."
      bind:value={nomorTeleponInput}
    />
  </FormGroup>
  <Button size="small" type="submit" disabled={buttonIsDisabled}
    >Tambah<Loading withOverlay={false} small active={buttonIsDisabled} />
  </Button>
</Form>

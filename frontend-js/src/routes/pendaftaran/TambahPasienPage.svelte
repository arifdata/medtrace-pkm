<script>
  import { TextInput } from "carbon-components-svelte";
  let namaPasienInput = {value: ""};
  let nomorKartu = "";
  let alamatInput = {value: ""};


</script>

<h4>Tambah pasien</h4>

<TextInput
  light
  size="sm"
  warn={namaPasienInput['warn']}
  warnText={namaPasienInput['warnText']}
  labelText="Nama"
  placeholder="Masukkan nama pasien..."
  on:input={(val) => {
    if (val['detail'] == "") {
      namaPasienInput['warnText'] = "Nama tidak boleh kosong";
      namaPasienInput['warn'] = true;
      namaPasienInput['value'] = val['detail'];
    } else if (val['detail'].length > 100) {
      namaPasienInput['warnText'] = "Maksimal 100 karakter";
      namaPasienInput['warn'] = true;
      namaPasienInput['value'] = val['detail'];
    } else {
      namaPasienInput['warn'] = false;
      namaPasienInput['value'] = val['detail'];
    }
  }}
/>

<TextInput
  size="sm"
  light
  labelText="Nomor Kartu"
  placeholder="Masukkan nomor kartu..."
  on:input={(val) => {
    nomorKartu = val['detail'];
  }}
/>

<TextInput
  light
  size="sm"
  warn={alamatInput['warn']}
  warnText={alamatInput['warnText']}
  labelText="Alamat"
  placeholder="Masukkan alamat pasien..."
  on:input={(val) => {
    if (val['detail'] == "") {
      alamatInput['warnText'] = "Alamat tidak boleh kosong";
      alamatInput['warn'] = true;
      alamatInput['value'] = val['detail'];
    } else {
      alamatInput['warn'] = false;
      alamatInput['value'] = val['detail'];
    }
  }}
/>

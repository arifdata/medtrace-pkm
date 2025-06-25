<script>
  import { TextInput } from "carbon-components-svelte";
  let namaPasienInput = {
    warn: true,
    warnText: "",
    value: "",
  };
  let alamat = "";
  let tanggalLahir;

  // todo: perbaiki lagi fungsi ini utk dipakai di field yg lain
  function warningChecker(max_length, inputText, data){
    if (inputText == "") {
      data['warnText'] = "Tidak boleh kosong";
      data['warn'] = true;
    } else if (inputText.length > max_length) {
      data['warnText'] = `Maksimal ${max_length} karakter`;
      data['warn'] = true;
      data['value'] = inputText;
    } else {
      data['warn'] = false;
      data['value'] = inputText;
      console.log(data['value']);
    }
  }

</script>

<h4>Tambah pasien</h4>

<TextInput
  light
  warn={namaPasienInput['warn']}
  warnText={namaPasienInput['warnText']}
  labelText="Nama"
  placeholder="Masukkan nama pasien..."
  on:input={(val) => {
    if (val['detail'] == "") {
      namaPasienInput['warnText'] = "Nama tidak boleh kosong"
      namaPasienInput['warn'] = true;
    } else if (val['detail'].length > 10) {
      namaPasienInput['warnText'] = "Maksimal 10 karakter";
      namaPasienInput['warn'] = true;
      namaPasienInput['value'] = val['detail'];
    } else {
      namaPasienInput['warn'] = false;
      namaPasienInput['value'] = val['detail'];
      console.log(namaPasienInput['value']);
    }
  }}
/>


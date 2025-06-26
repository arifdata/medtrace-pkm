// function ini berguna utk merubah string dari svelte-carbon-components DatePicker ke JS Date object
// format "DD-MM-YYYY" menjadi javascript date object
export function parseDatePicker(tanggal) {
  let splitTgl = tanggal.split("-");
  let tanggalJS = new Date(`${splitTgl[2]}-${splitTgl[1]}-${splitTgl[0]}`);
  return tanggalJS;
}

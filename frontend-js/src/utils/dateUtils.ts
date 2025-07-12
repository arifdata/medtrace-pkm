import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");


// function ini berguna utk merubah string dari svelte-carbon-components DatePicker ke JS Date object
// format "DD-MM-YYYY" menjadi javascript date object
export function parseDatePicker(tanggal: string): Date {
  let splitTgl = tanggal.split("-");
  let tanggalJS = new Date(`${splitTgl[2]}-${splitTgl[1]}-${splitTgl[0]}`);
  return tanggalJS;
}

//function untuk menampilan tanggal lahir dengan enak dibaca
export function rapikanTanggalLahir(tanggalLahir: any) {
  let dt = dayjs(tanggalLahir);
  return dt.format("DD MMMM YYYY");
}

//function untuk menghitung usia
export function hitungUsia(tanggalLahir: any): string {
  let dt1 = dayjs(tanggalLahir);
  let dt2 = dayjs();
  let usiaTahun = dt2.diff(dt1, "year");
  let usiaBulan = dt2.diff(dt1, "month") % 12;
  return `${usiaTahun} tahun ${usiaBulan} bulan`;
}
import { client } from '../pb/client';

export async function tambahDataPasien(nama, nomor_kartu, alamat, tanggal_lahir, nomor_telepon) {
    // example create data
    const data = {
      nama_pasien: nama,
      nomor_kartu: nomor_kartu,
      alamat: alamat,
      tanggal_lahir: tanggal_lahir,
      nomor_telepon: nomor_telepon,
    };

    try {
      await client
        .collection("data_pasien")
        .create(data)
        .then((data) => console.log(data["nama_pasien"]));
    } catch (e) {
      console.log(e);
    }
  }


import { client } from '../pb/client'
import { successToast, errorToast } from './toast';

export async function tambahDataPasien(nama: string, nomor_kartu: string, alamat: string, tanggal_lahir: string, nomor_telepon: string): Promise<boolean> {
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
      .then(() => {
        successToast(`Berhasil input ${data["nama_pasien"]}`);
      });
    return true;
  } catch (e) {
    errorToast(`Gagal input data ${data["nama_pasien"]}`)
    return false;
  }
}


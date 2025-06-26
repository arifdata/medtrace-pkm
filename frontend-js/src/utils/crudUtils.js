import { client } from '../pb/client';
  import Toastify from "toastify-js";
  import "toastify-js/src/toastify.css";

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
        .then(() => Toastify({
        text: `Berhasil input ${data["nama_pasien"]}`,
        duration: 3000,
        gravity: "bottom",
        style: {
          background: "#42be65",
        },
      }).showToast()
);
    } catch (e) {
      Toastify({
        text: "Gagal input data.",
        duration: 3000,
        gravity: "bottom",
        style: {
          background: "#fa4d56",
        },
      }).showToast();
    }
  }


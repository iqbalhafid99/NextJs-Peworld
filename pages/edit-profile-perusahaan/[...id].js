import LayoutAdmin from "@/components/LayoutAdmin";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
export default function Portofolio() {
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    bidang: "",
    kota: "",
    deskripsi: "",
    email: "",
    ig: "",
    hp: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.put(
          `http://localhost:5000/admin-photo/${userData.id}`,
          formData
        );

        if (response.status === 200) {
          Swal.fire(
            "Berhasil Mengubah Photo Porfile!",
            "klik tombol di bawah",
            "success"
          );
          console.log("Gambar berhasil diupload!");
        } else {
          // Jika permintaan gagal, tampilkan pesan error
          console.error("Gagal mengupload gambar!");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengupload gambar:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim permintaan POST menggunakan Axios
    axios
      .put(`http://localhost:5000/admin/${userData.id}`, formData)
      .then((response) => {
        // Tampilkan pesan sukses menggunakan SweetAlert atau cara lainnya
        Swal.fire("Berhasil Mengubah Data Diri!", "klik tombol", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const alreadyLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:5000/credential-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        const id = await axios.get(
          `http://localhost:5000/admin/${response.data.id}`
        );
        setProfile(id.data.payload.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }
  return (
    <LayoutAdmin>
      <div className="relative h-[150vh]">
        <div>
          <div className="mx-[150px] relative">
            <div className="w-[380px] bg-slate-50 rounded-lg absolute top-20 ">
              <div className="flex items-center flex-col">
                <img
                  src={profile.image || "/portofolio.png"}
                  alt="Picture of the author"
                  className=" mt-[30px] rounded-full w-[150px] h-[150px]"
                />

                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-[100px] mt-5"
                />
              </div>

              <div>
                <div className="pb-20">
                  <div className="flex flex-col gap-3 mt-9 px-[30px]">
                    <h1 className="text-2xl font-semibold text-[#1F2A36]">
                      {profile.nama || "Belum Ada Nama"}
                    </h1>
                    <p className="text-sm font-normal text-[#1F2A36]">
                      {profile.bidang}
                    </p>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/map-pin.png"
                        width={16}
                        height={16}
                        alt="Picture of the author"
                      />
                      <p className="text-sm font-normal text-[#9EA0A5]">
                        {profile.kota}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[550px] flex flex-col">
              <button
                onClick={handleImageUpload}
                className="px-[150px] py-[15px] bg-[#5E50A1] rounded text-base font-bold text-white mt-[38px]"
              >
                Simpan
              </button>
              <Link
                href={"/profile-perusahaan/" + userData.id}
                className="px-[150px] py-[15px] border border-[#5E50A1] rounded text-base font-bold text-[#5E50A1] mt-[15px]"
              >
                Lihat Profile
              </Link>
            </div>
            <div className="w-[953px] h-[1220px] rounded-lg bg-slate-50 absolute top-20 right-0">
              <div className="mt-5 border-b border-[#C4C4C4]">
                <h1 className=" ml-8 pb-5 text-2xl font-semibold cursor-pointer ">
                  Data Diri
                </h1>
              </div>
              <div>
                <div className="mx-[30px]">
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Nama Perusahaan
                      <input
                        placeholder="Masukan alamat nama perusahaan"
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Bidang
                      <input
                        type="text"
                        name="bidang"
                        value={formData.bidang}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan bidang perusahaan ex : Financial"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Kota
                      <input
                        type="text"
                        name="kota"
                        value={formData.kota}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Kota"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Deskripsi singkat
                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        rows="7"
                        cols="80"
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Deskripsi singkat"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Email
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan email"
                      />
                    </label>
                    <label
                      htmlFor="domisili"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Instagram
                      <input
                        type="text"
                        name="ig"
                        value={formData.ig}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Instagram"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Nomor hp
                      <input
                        type="text"
                        name="hp"
                        value={formData.hp}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Nomor hp"
                      />
                    </label>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Linked In
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Linked In"
                      />
                    </label>
                    <button className="py-4 w-full mt-5 rounded-lg border border-[#FBB017] text-[#FBB017] text-base font-bold">
                      Edit Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] bg-[#5E50A1] absolute top-0 -z-10"></div>
      </div>
    </LayoutAdmin>
  );
}

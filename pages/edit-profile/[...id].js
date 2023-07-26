import Image from "next/image";
import axios from "axios";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Portofolio from "@/components/FormPortfolio";
import Link from "next/link";

export default function EditProfile() {
  // image upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState("");

  // Fungsi untuk mengirim gambar ke API
  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.put(
          `http://localhost:5000/photo/${userData.id}`,
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

  // Fungsi untuk menangani perubahan input file
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  // akhir

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    jobdesk: "",
    domisili: "",
    tempat_kerja: "",
    deskripsi: "",
  });
  const [works, setWorks] = useState({
    posisi: "",
    perusahaan: "",
    tanggal: "",
    deskripsi: "",
  });
  const [skills, setSkills] = useState({
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleWorksChange = (e) => {
    setWorks({ ...works, [e.target.name]: e.target.value });
  };
  const handleSkillsChange = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const handleWorksSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:5000/add-works",
          works,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        Swal.fire("Berhasil Menambah Pekerjaan!", "Klik tombol!", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSkillsSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:5000/add-skills",
          skills,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        Swal.fire("Berhasil Menambah skills!", "Klik tombol!", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim permintaan POST menggunakan Axios
    axios
      .put(`http://localhost:5000/editprofile/${userData.id}`, formData)
      .then((response) => {
        // Berhasil, perbarui state userData dengan data terbaru
        setUserData(response.data);

        // Tampilkan pesan sukses menggunakan SweetAlert atau cara lainnya
        Swal.fire(
          "Berhasil Mengubah Data Diri!",
          "klik tombol di bawah",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const alreadyLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/credential", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        const id = await axios.get(
          `http://localhost:5000/user/${response.data.id}`
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
    <Layout>
      <div className="relative h-[270vh]">
        <div>
          <div className="mx-[150px] relative">
            <div className="w-[357px] bg-slate-50 rounded-lg absolute top-20 ">
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
                      {profile.name || ""}
                    </h1>
                    <p className="text-sm font-normal text-[#1F2A36]">
                      {profile.jobdesk}
                    </p>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/map-pin.png"
                        width={16}
                        height={16}
                        alt="Picture of the author"
                      />
                      <p className="text-sm font-normal text-[#9EA0A5]">
                        {profile.domisili}
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
                href={"/portofolio/" + userData.id}
                className="px-[150px] py-[15px] border border-[#5E50A1] rounded text-base font-bold text-[#5E50A1] mt-[15px]"
              >
                Lihat Profile
              </Link>
            </div>
            <div className="w-[953px] h-[850px] rounded-lg bg-slate-50 absolute top-20 right-0">
              <div className="mt-5 border-b border-[#C4C4C4]">
                <h1 className=" ml-8 pb-5 text-2xl font-semibold cursor-pointer ">
                  Data Diri
                </h1>
              </div>
              <div>
                <div className="mx-[30px]">
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <label
                      htmlFor="nama"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Nama lengkap
                      <input
                        placeholder="Masukan alamat nama lengkap"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                      />
                    </label>
                    <label
                      htmlFor="job desk"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Job desk
                      <input
                        type="text"
                        name="jobdesk"
                        value={formData.jobdesk}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan job desk"
                      />
                    </label>
                    <label
                      htmlFor="domisili"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Domisili
                      <input
                        type="text"
                        name="domisili"
                        value={formData.domisili}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan Domisili"
                      />
                    </label>
                    <label
                      htmlFor="kerja"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Tempat kerja
                      <input
                        type="text"
                        name="tempat_kerja"
                        value={formData.tempat_kerja}
                        onChange={handleChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Masukan tempat kerja"
                      />
                    </label>
                    <label
                      htmlFor="deskripsi"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
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
                    <button className="py-4 w-full mt-5 rounded-lg border border-[#FBB017] text-[#FBB017] text-base font-bold">
                      Edit Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-[953px] h-[227px] rounded-lg bg-slate-50 absolute top-[960px] right-0">
              <div className="mt-5 border-b border-[#C4C4C4]">
                <h1 className=" ml-8 pb-5 text-2xl font-semibold cursor-pointer ">
                  Skill
                </h1>
              </div>
              <div>
                <div className="mx-[30px]">
                  <form onSubmit={handleSkillsSubmit}>
                    <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                      Skill
                      <div className="flex gap-4 items-end">
                        <input
                          placeholder="Masukan alamat Skill"
                          type="text"
                          name="skills"
                          value={skills.skills}
                          onChange={handleSkillsChange}
                          className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded flex-auto w-[600px]"
                        />
                        <button className="bg-[#FBB017] px-4 h-[60px] rounded-md font-bold text-white flex-auto w-20">
                          Simpan
                        </button>
                      </div>
                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-[953px] h-[700px] rounded-lg bg-slate-50 absolute top-[1220px] right-0">
              <div className="mt-5 border-b border-[#C4C4C4]">
                <h1 className=" ml-8 pb-5 text-2xl font-semibold cursor-pointer ">
                  Pengalaman Kerja
                </h1>
              </div>
              <div>
                <div className="mx-[30px]">
                  <form onSubmit={handleWorksSubmit} className="flex flex-col">
                    <label
                      htmlFor="nama"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                    >
                      Posisi
                      <input
                        placeholder="Masukan posisi"
                        type="text"
                        name="posisi"
                        value={works.posisi}
                        onChange={handleWorksChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                      />
                    </label>
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <label
                          htmlFor="nama"
                          className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                        >
                          Nama Perusahaan
                          <input
                            placeholder="Masukan nama perusahaan"
                            type="text"
                            name="perusahaan"
                            value={works.perusahaan}
                            onChange={handleWorksChange}
                            className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                          />
                        </label>
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="nama"
                          className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                        >
                          Bulan/tahun
                          <input
                            placeholder="Masukan bulan dan tahun"
                            type="text"
                            name="tanggal"
                            value={works.tanggal}
                            onChange={handleWorksChange}
                            className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                          />
                        </label>
                      </div>
                    </div>
                    <label
                      htmlFor="deskripsi"
                      className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5] border-b pb-10"
                    >
                      Deskripsi singkat
                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        rows="7"
                        cols="80"
                        value={works.deskripsi}
                        onChange={handleWorksChange}
                        className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                        placeholder="Deskripsi pekerjaan anda"
                      />
                    </label>
                    <button className="py-4 w-full rounded-lg border border-[#FBB017] text-[#FBB017] text-base font-bold">
                      Tambah Pengalaman Kerja
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-[953px] h-[650px] rounded-lg bg-slate-50 absolute top-[1980px] right-0">
              <div className="mt-5 border-b border-[#C4C4C4]">
                <h1 className=" ml-8 pb-5 text-2xl font-semibold cursor-pointer ">
                  Portofolio
                </h1>
              </div>
              <div>
                <Portofolio />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] bg-[#5E50A1] absolute top-0 -z-10"></div>
      </div>
    </Layout>
  );
}

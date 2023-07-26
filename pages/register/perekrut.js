import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterPerekrut() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    perusahaan: "",
    jabatan: "",
    hp: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim permintaan POST menggunakan Axios
    axios
      .post("http://localhost:5000/register-admin", formData)
      .then((response) => {
        // Berhasil, lakukan tindakan setelah registrasi sukses
        Swal.fire(
          "Register Sebagai Perekrut Berhasil!",
          "clicked the button!",
          "success"
        );
        router.push("/login/perekrut");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email sudah digunakan",
        });
      });
  };

  return (
    <div className="">
      <div className="flex">
        <div className="ml-[75px] flex-1 mt-[35px] relative">
          <Image
            src="/background.png"
            width={720}
            height={872}
            alt="Picture of the author"
            className="absolute"
          />
          <div className="bg-[#5E50A1] opacity-80 w-[715px] h-[905px] absolute top-0">
            <div className="flex items-center gap-2 m-[47px]">
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="Picture of the author"
              />
              <h1 className="text-white">Peworld</h1>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mt-[175px] ml-[75px] leading-[80px]">
                Temukan developer berbakat & terbaik di berbagai bidang <br />{" "}
                keahlian
              </h1>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-[100px] mr-[175px] ml-[170px]">
          <div>
            <h1 className="text-4xl font-semibold text-[#1F2A36]">
              Halo, Pewpeople
            </h1>
            <p className="text-lg font-normal text-[#46505C] mt-10">
              Apakah anda sedang mencari pekerjaan yang keren? silahkan daftar{" "}
              <Link href={"/register"} className="text-[#FBB017]">
                - di sini
              </Link>
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              action="submit"
              className="flex flex-col"
            >
              <label className="flex flex-col mt-16 text-xs font-normal text-[#9EA0A5]">
                Nama
                <input
                  placeholder="Masukan nama lengkap"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                />
              </label>
              <label
                htmlFor="Email"
                className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
              >
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Masukan alamat email"
                />
              </label>
              <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                Perusahaan
                <input
                  type="text"
                  name="perusahaan"
                  value={formData.perusahaan}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Masukan nama perusahaan"
                />
              </label>
              <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                Jabatan
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Posisi di perusahaan anda"
                />
              </label>
              <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                No handphone
                <input
                  type="text"
                  name="hp"
                  value={formData.hp}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Masukan no handphone"
                />
              </label>
              <label
                htmlFor="Password"
                className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
              >
                Kata Sandi
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Masukan kata Sandi"
                />
              </label>
              <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
                Konfirmasi kata Sandi
                <input
                  type="password"
                  name="Password"
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Konfirmasi kata Sandi"
                />
              </label>
              <button className="mt-[52px] w-full bg-[#FBB017] py-4 rounded text-base font-bold text-white">
                Daftar
              </button>
            </form>
            <div>
              <p className="mt-7 text-center text-base font-normal mb-10">
                Anda sudah punya akun?{" "}
                <Link
                  href={"/login/perekrut"}
                  className="text-[#FBB017] cursor-pointer"
                >
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

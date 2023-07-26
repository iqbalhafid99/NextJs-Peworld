import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handphone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim permintaan POST menggunakan Axios
    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        // Berhasil, lakukan tindakan setelah registrasi sukses
        Swal.fire("Register Berhasil!", "clicked the button!", "success");
        router.push("/login");
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
                Temukan pekerjaan <br /> terbaik di berbagai <br /> bidang{" "}
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
              Ingin mencari Pekerja yang handal? Daftar sebagai Perekrut{" "}
              <Link href={"/register/perekrut"} className="text-[#FBB017]">
                - di sini
              </Link>
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="Nama"
                className="flex flex-col mt-16 text-xs font-normal text-[#9EA0A5]"
              >
                Nama
                <input
                  placeholder="Masukan nama lengkap"
                  type="text"
                  name="name"
                  value={formData.name}
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
              <label
                htmlFor="No handphone"
                className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
              >
                No handphone
                <input
                  type="text"
                  name="handphone"
                  value={formData.handphone}
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
              <label
                htmlFor="Password"
                className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
              >
                Konfirmasi kata Sandi
                <input
                  type="password"
                  name="Password"
                  id=""
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Konfirmasi kata Sandi"
                />
              </label>
              <button
                type="submit"
                className="mt-[52px] w-full bg-[#FBB017] py-4 rounded text-base font-bold text-white"
              >
                Daftar
              </button>
            </form>

            <div>
              <p className="mt-7 text-center text-base font-normal mb-10">
                Anda sudah punya akun?{" "}
                <Link href="/login">
                  <span className="text-[#FBB017] cursor-pointer">
                    Masuk disini
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

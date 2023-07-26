import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login-admin", {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        // Menyimpan token di localStorage
        localStorage.setItem("token", token);

        Swal.fire("Login Berhasil!", "clicked the button!", "success");
        router.push("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Waduh!",
          text: "Email atau Kata sandi Salah",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Waduh!",
        text: "Email atau Kata sandi Salah",
      });
      console.error(error);
    }
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
          <div className="bg-[#5E50A1] opacity-80 w-[720px] h-[912px] absolute top-0">
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
        <div className="flex-1 mt-[165px] mr-[175px] ml-[170px]">
          <div>
            <h1 className="text-4xl font-semibold text-[#1F2A36]">
              Halo, Pewpeople
            </h1>
            <p className="text-lg font-normal text-[#46505C] mt-10">
              Apakah anda sedang mencari pekerjaan yang keren? jika iya silahkan
              login
              <Link href={"/login"} className="text-[#FBB017]">
                - di sini
              </Link>
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="Email"
                className="flex flex-col mt-16 text-xs font-normal text-[#9EA0A5]"
              >
                Email
                <input
                  placeholder="Masukan alamat email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder:text-sm py-5 pl-5 mt-3 bg-[#ecedf1] rounded"
                  placeholder="Masukan kata Sandi"
                />
              </label>
              <button className="mt-7 w-full bg-[#FBB017] py-4 rounded text-base font-bold text-white">
                Masuk
              </button>
            </form>
            <div>
              <p className="mt-7 text-right text-base font-normal text-[#1F2A36] cursor-pointer  hover:font-semibold">
                Lupa kata sandi?
              </p>
            </div>
            <div>
              <p className="mt-7 text-center text-base font-normal">
                Anda belum punya akun?{" "}
                <Link href="/register/perekrut">
                  <span className="text-[#FBB017] cursor-pointer">
                    Daftar disini
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

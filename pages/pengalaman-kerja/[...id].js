import Image from "next/image";
import axios from "axios";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
export default function PengalamanKerja() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");
  const [keahlian, setKeahlian] = useState([]);
  const [work, setWork] = useState([]);

  const alreadyLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/credential", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        const id = await axios.get(
          `http://localhost:5000/user/${response.data.id}`
        );
        setProfile(id.data.payload.data[0]);
        const skills = await axios.get(
          `http://localhost:5000/skills/${response.data.id}`
        );
        setKeahlian(skills.data.payload.data);
        const porto = await axios.get(
          `http://localhost:5000/works/${response.data.id}`
        );
        setWork(porto.data.payload.data);
        console.log(porto.data.payload.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <div className="relative h-[120vh]">
        <div>
          <div className="mx-[150px] relative">
            <div className="w-[357px] h-[700px] bg-slate-50 rounded-lg absolute top-20 ">
              <div className="flex justify-center">
                <img
                  src={profile.image || "/portofolio.png"}
                  alt="Picture of the author"
                  className=" mt-[30px] rounded-full w-[150px] h-[150px]"
                />
              </div>

              <div>
                <div>
                  <div className="flex flex-col gap-3 mt-9 px-[30px]">
                    <h1 className="text-2xl font-semibold text-[#1F2A36]">
                      {profile.name}
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
                    <p className="text-sm font-normal text-[#9EA0A5]">
                      {profile.deskripsi}
                    </p>
                    <Link href={"/edit-profile/" + user.id}>
                      <button className="px-[132px] py-[15px] bg-[#5E50A1] rounded text-base font-bold text-white mt-[38px]">
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3 mt-9 px-[30px]">
                    <h1 className="text-2xl font-semibold text-[#1F2A36]">
                      Skill
                    </h1>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        {keahlian.map((s) => (
                          <div key={s.id}>
                            <div className="flex items-center justify-between gap-2 px-3 py-1 text-white bg-[#FBB017] rounded opacity-60 text-xs font-semibold border border-[#ad7300] ">
                              <p>{s.skills}</p>
                              <button
                                onClick={async () => {
                                  try {
                                    await axios.delete(
                                      `http://localhost:5000/skills/${s.id}`
                                    );

                                    Swal.fire({
                                      icon: "success",
                                      title: "Skill Terhapus",
                                      text: "Skill berhasil dihapus.",
                                    });
                                  } catch (error) {
                                    console.log(error);
                                    // Tampilkan pesan kesalahan kepada pengguna
                                    Swal.fire({
                                      icon: "error",
                                      title: "Gagal Menghapus Skill",
                                      text: "Terjadi kesalahan saat menghapus skill. Silakan coba lagi nanti.",
                                    });
                                  }
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[953px] h-[716px] rounded-lg bg-slate-50 absolute top-20 right-0">
              <div className="ml-8 mt-5 flex items-center gap-[30px]">
                <Link href={"/portofolio/" + user.id}>
                  <h1 className="text-2xl  cursor-pointer">Portofolio</h1>
                </Link>
                <h1 className="text-2xl font-semibold cursor-pointer">
                  Pengalaman Kerja
                </h1>
              </div>

              {work.map((kerja) => (
                <div key={kerja.id} className="mt-10 mx-10 flex gap-8">
                  <div className="flex gap-10">
                    <div>
                      <img
                        src="/perusahaan.png"
                        alt="perusahaan"
                        className="w-24 h-24"
                      />
                    </div>
                    <div>
                      <div>
                        <h1 className="text-xl font-semibold text-[#1F2A36]">
                          {kerja.posisi}
                        </h1>
                        <p className="text-lg text-[#46505C]">
                          {kerja.perusahaan}
                        </p>
                        <p className="text-[#9EA0A5]">{kerja.tanggal}</p>
                      </div>
                      <div className="mt-4 pb-5 border-b border-[#E2E5ED]">
                        <p className="text-[#1F2A36]">{kerja.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] bg-[#5E50A1] absolute top-0 -z-10"></div>
      </div>
    </Layout>
  );
}

import Image from "next/image";
import axios from "axios";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Portofolio() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");
  const [keahlian, setKeahlian] = useState([]);
  const [portofolio, setPortofolio] = useState([]);

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
          `http://localhost:5000/porto/${response.data.id}`
        );
        setPortofolio(porto.data.payload.data);
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
                <Link href="/portofolio">
                  <h1 className="text-2xl font-semibold cursor-pointer">
                    Portofolio
                  </h1>
                </Link>
                <Link href={"/pengalaman-kerja/" + user.id}>
                  <h1 className="text-2xl cursor-pointer">Pengalaman Kerja</h1>
                </Link>
              </div>
              <div className="flex flex-wrap gap-14 mt-10 mx-10">
                {portofolio.map((porto) => (
                  <div
                    key={porto.id}
                    className="ml-8 mt-4 flex flex-col items-center"
                  >
                    <img
                      src={porto.image}
                      alt="porto"
                      className="w-full h-[148px] mt-[30px]"
                    />

                    <div className="flex justify-center items-end gap-2">
                      <p className="mt-3 text-[#1F2A36]">{porto.aplikasi}</p>
                      <button
                        onClick={async () => {
                          try {
                            await axios.delete(
                              `http://localhost:5000/porto/${porto.id}`
                            );

                            Swal.fire({
                              icon: "success",
                              title: "Portofolio Terhapus",
                              text: "Portofolio berhasil dihapus.",
                            });
                          } catch (error) {
                            console.log(error);
                            // Tampilkan pesan kesalahan kepada pengguna
                            Swal.fire({
                              icon: "error",
                              title: "Gagal Menghapus Portofolio",
                              text: "Terjadi kesalahan saat menghapus Portofolio. Silakan coba lagi nanti.",
                            });
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
        <div className="w-full h-[500px] bg-[#5E50A1] absolute top-0 -z-10"></div>
      </div>
    </Layout>
  );
}

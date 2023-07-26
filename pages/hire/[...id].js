import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import LayoutAdmin from "@/components/LayoutAdmin";

export default function Hire() {
  const [profile, setProfile] = useState("");
  const [keahlian, setKeahlian] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const alreadyLoggedIn = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      setProfile(response.data.payload.data[0]);
      console.log(response.data.payload.data[0]);
      const skills = await axios.get(`http://localhost:5000/skills/${id}`);
      setKeahlian(skills.data.payload.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);
  return (
    <LayoutAdmin>
      <div className="h-[120vh] ">
        <div className="flex">
          <div className="mx-[150px] flex-auto w-[400px]">
            <div className="w-[357px] h-[700px] mt-20 bg-slate-50 rounded-lg absolute top-20 ">
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
                    <Link href={"/hire/" + id}>
                      <button className="px-[132px] py-[15px] bg-[#5E50A1] rounded text-base font-bold text-white mt-[38px]">
                        Hire
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
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto w-full">
            <h1 className="text-[32px] font-semibold text-[#1F2A36]">
              Hubungi {profile.name}
            </h1>
            <p className="text-lg mt-4 text-[#46505C]">{profile.deskripsi}</p>
            <div className="mt-14 mr-[150px]">
              <form action="submit" className="flex flex-col">
                <label
                  htmlFor="nama"
                  className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                >
                  Tujuan tentang pesan ini
                  <input
                    placeholder="Project"
                    type="text"
                    name="nama"
                    id=""
                    className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                  />
                </label>
                <label
                  htmlFor="job desk"
                  className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                >
                  Nama Lengkap
                  <input
                    type="text"
                    name="job desk"
                    id=""
                    className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                    placeholder="Masukan Nama Lengkap"
                  />
                </label>
                <label
                  htmlFor="domisili"
                  className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                >
                  Email
                  <input
                    type="text"
                    name="domisili"
                    id=""
                    className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                    placeholder="Masukan Email"
                  />
                </label>
                <label
                  htmlFor="kerja"
                  className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                >
                  Nomor Handphone
                  <input
                    type="text"
                    name="kerja"
                    id=""
                    className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                    placeholder="Masukan nomor handphone"
                  />
                </label>
                <label
                  htmlFor="deskripsi"
                  className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]"
                >
                  Deskripsi
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows="7"
                    cols="80"
                    className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
                    placeholder="Deskripsikan/jelaskan lebih detail"
                  />
                </label>
              </form>
              <button
                onClick={() =>
                  Swal.fire(
                    `Berhasil Menghubungi ${profile.name}`,
                    "klik tombol di bawah",
                    "success"
                  )
                }
                className="py-4 w-full rounded-lg bg-[#FBB017] text-white text-base mt-10 font-bold"
              >
                Hire
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

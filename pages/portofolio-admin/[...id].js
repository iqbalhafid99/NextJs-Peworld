import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import LayoutAdmin from "@/components/LayoutAdmin";

export default function Portofolio() {
  const [profile, setProfile] = useState("");
  const [keahlian, setKeahlian] = useState([]);
  const [portofolio, setPortofolio] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const alreadyLoggedIn = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      setProfile(response.data.payload.data[0]);
      console.log(response.data.payload.data[0]);
      const skills = await axios.get(`http://localhost:5000/skills/${id}`);
      setKeahlian(skills.data.payload.data);
      const porto = await axios.get(`http://localhost:5000/porto/${id}`);
      setPortofolio(porto.data.payload.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

  return (
    <LayoutAdmin>
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
            <div className="w-[953px] h-[716px] rounded-lg bg-slate-50 absolute top-20 right-0">
              <div className="ml-8 mt-5 flex items-center gap-[30px]">
                <Link href="/portofolio">
                  <h1 className="text-2xl font-semibold cursor-pointer">
                    Portofolio
                  </h1>
                </Link>
                <Link href={"/pengalaman-kerja-admin/" + id}>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] bg-[#5E50A1] absolute top-0 -z-10"></div>
      </div>
    </LayoutAdmin>
  );
}

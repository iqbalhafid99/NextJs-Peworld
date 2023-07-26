import LayoutAdmin from "@/components/LayoutAdmin";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
export default function ProfilePerusahaan() {
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState("");

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
      <div>
        <div className="w-[80%] h-screen bg-slate-50 m-auto mt-20 rounded-lg">
          <div className="h-[200px] w-full bg-[#5E50A1] rounded-t-lg"></div>
          <div className="-mt-[110px]">
            <div className="flex justify-center">
              <img
                src={profile.image}
                alt="foto profile"
                className="mt-[30px] h-[150px] w-[150px] rounded-full"
              />
            </div>
            <div className="flex flex-col items-center gap-3 mt-9 px-[30px]">
              <h1 className="text-2xl font-semibold text-[#1F2A36]">
                {profile.nama}
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
              <p className="text-sm mx-[400px] text-center font-normal text-[#9EA0A5]">
                {profile.deskripsi}
              </p>
              <Link href={"/edit-profile-perusahaan/2"}>
                <button className="px-[132px] py-[15px] bg-[#5E50A1] rounded text-base font-bold text-white mt-[38px]">
                  Edit Profile
                </button>
              </Link>
              <div className="mt-[64px]">
                <div className="flex items-center gap-6">
                  <Image
                    src="/mail.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <p className="text-sm font-normal text-[#9EA0A5]">
                    {profile.email}
                  </p>
                </div>
                <div className="flex mt-[30px] items-center gap-6">
                  <Image
                    src="/instagram.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <p className="text-sm font-normal text-[#9EA0A5]">
                    {profile.ig}
                  </p>
                </div>
                <div className="flex mt-[30px] items-center gap-6">
                  <Image
                    src="/github.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <p className="text-sm font-normal text-[#9EA0A5]">
                    {profile.ig}
                  </p>
                </div>
                <div className="flex mt-[30px] items-center gap-6">
                  <Image
                    src="/Vector.png"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                  <p className="text-sm font-normal text-[#9EA0A5]">
                    {profile.linkedin}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

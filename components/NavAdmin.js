import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");

  const alreadyLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Panggil endpoint untuk memeriksa token dan mendapatkan data pengguna
        const response = await axios.get(
          "http://localhost:5000/credential-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setId(response.data.id);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire("Login Berhasil!", "clicked the button!", "success");
    setIsLoggedIn(false);
    router.push("/login/perekrut");
  };

  return (
    <div>
      <div className="flex justify-between px-[150px] pt-10 pb-10">
        <button onClick={() => router.push("/admin")}>
          <img src="/navbarLogo.png" alt="" />
        </button>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={() => router.push("/profile-perusahaan/" + id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="font-bold px-[20px] py-[10px] rounded border border-[#5E50A1] text-[#5E50A1]">
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button className="font-bold px-[20px] py-[10px] rounded bg-[#5E50A1] text-white">
                  Daftar
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

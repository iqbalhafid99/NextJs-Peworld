import LayoutAdmin from "@/components/LayoutAdmin";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";

export default function Home() {
  const [profile, setProfile] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dataPerPage = 5; // Jumlah data per halaman
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("asc");

  const handleSort = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sort?sort=${sortType}`
      );
      setProfile(response.data.payload.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSortType = () => {
    setSortType(sortType === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
        const id = await axios.get(`http://localhost:5000/user`);
        setProfile(id.data.payload.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const performSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search?query=${searchQuery}`
      );
      setProfile(response.data.payload.data);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce(performSearch, 500);

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  const pageCount = Math.ceil(profile.length / dataPerPage);
  const offset = currentPage * dataPerPage;
  const currentData = profile.slice(offset, offset + dataPerPage);

  return (
    <LayoutAdmin>
      <div>
        <div className="flex items-center h-[100px] w-full bg-[#5E50A1]">
          <div className="ml-[150px] text-3xl font-bold text-white">
            Top Pekerja
          </div>
        </div>
        <div>
          <div className="mt-[50px] flex items-center h-[80px] bg-slate-100 rounded-box mx-[150px] m-auto">
            <div className="flex-1 px-2 lg:flex-none">
              <input
                type="text"
                placeholder="Search for any skill"
                className="input input-ghost w-[900px] max-w-xs ml-5"
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex justify-end flex-1 px-2">
              <div className="flex items-stretch gap-[53px]">
                <button
                  className="px-[27px] py-[17px] bg-[#5E50A1] rounded text-white font-semibold ease-in duration-300 hover:bg-[#9789df]"
                  onClick={() => {
                    handleSort();
                    toggleSortType();
                  }}
                >
                  Sort
                </button>
                <button
                  className="py-[17px] px-[34px] cursor-pointer ease-in duration-300 hover:bg-[#9789df] text-white bg-[#5E50A1] rounded-btn"
                  onClick={debouncedSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[50px] bg-slate-100 mx-[150px] rounded-lg">
          {currentData.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between ml-[20px] mr-[77px] pb-10 border-b-2 border-[#e2dfdf]"
            >
              <div className="flex items-center gap-8">
                <div>
                  <img
                    src={p.image || "/portofolio.png"}
                    alt="Picture of the author"
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-9">
                  <h1 className="text-2xl font-semibold text-[#1F2A36]">
                    {p.name || "belum ada nama"}
                  </h1>
                  <p className="text-sm font-normal text-[#9EA0A5]">
                    {p.jobdesk || "belum di tambahkan"}
                  </p>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/map-pin.png"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                    <p className="text-sm font-normal text-[#9EA0A5]">
                      {p.domisili || "belum di tambahkan"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-6 py-1 text-white bg-[#FBB017] rounded opacity-60 text-xs font-semibold border border-[#ad7300] ">
                      PHP
                    </button>
                    <button className="px-6 py-1 text-white bg-[#FBB017] rounded opacity-60 text-xs font-semibold border border-[#ad7300] ">
                      javaScript
                    </button>
                    <button className="px-6 py-1 text-white bg-[#FBB017] rounded opacity-60 text-xs font-semibold border border-[#ad7300] ">
                      HTML
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <Link href={"/portofolio-admin/" + p.id}>
                  <button className="px-[27px] py-[17px] bg-[#5E50A1] rounded text-white font-semibold ease-in duration-300 hover:bg-[#9789df]">
                    Lihat Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          className="flex justify-center gap-10 mt-20 text-2xl font-bold text-[#5E50A1] "
        />
      </div>
    </LayoutAdmin>
  );
}

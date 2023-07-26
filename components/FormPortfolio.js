import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Portofolio() {
  const [formData, setFormData] = useState({
    aplikasi: "",
    repo: "",
    type: "Aplikasi Mobile", // Default value
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to send the image file along with other data
    const formDataToSend = new FormData();
    formDataToSend.append("aplikasi", formData.aplikasi);
    formDataToSend.append("repo", formData.repo);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("image", formData.image);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:5000/add-portfolio",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        Swal.fire("Berhasil Portofolio!", "Klik tombol!", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mx-[30px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
          Nama Aplikasi
          <input
            placeholder="Masukan alamat nama lengkap"
            type="text"
            name="aplikasi"
            value={formData.aplikasi}
            onChange={handleChange}
            className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
          />
        </label>
        <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
          Link Repository
          <input
            type="text"
            name="repo"
            value={formData.repo}
            onChange={handleChange}
            className="placeholder:text-sm py-5 pl-5 mt-3 border bg-white rounded"
            placeholder="Masukan Link Repository"
          />
        </label>
        <p className="text-xs mt-8 font-normal text-[#9EA0A5]">
          Type Portofolio
        </p>
        <div className="flex gap-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="Aplikasi Mobile"
                checked={formData.type === "Aplikasi Mobile"}
                onChange={handleChange}
                className="radio checked:bg-red-500"
              />
              <span className="ml-4 text-[#9EA0A5] label-text">
                Aplikasi Mobile
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="type"
                value="Aplikasi Web"
                checked={formData.type === "Aplikasi Web"}
                onChange={handleChange}
                className="radio checked:bg-blue-500"
              />
              <span className="ml-4 text-[#9EA0A5] label-text">
                Aplikasi Web
              </span>
            </label>
          </div>
        </div>

        <label className="flex flex-col mt-8 text-xs font-normal text-[#9EA0A5]">
          Upload gambar
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-3 file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </label>
        <button
          type="submit"
          className="mt-10 py-4 w-full rounded-lg border border-[#FBB017] text-[#FBB017] text-base font-bold"
        >
          Tambah Portofolio
        </button>
      </form>
    </div>
  );
}

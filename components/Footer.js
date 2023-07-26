import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-[100px]">
      {/* footer */}
      <div className="w-full h-[400px] bg-[#5E50A1] ">
        <div className="pt-[70px] mx-[150px]">
          <div>
            <Image
              src="/footerlogo.png"
              width={127}
              height={35}
              alt="Picture of the author"
            />
          </div>
          <div className="text-lg font-normal text-white mt-8">
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. In
            euismod ipsum et dui <br /> rhoncus auctor.
          </div>
          <div className="flex justify-between  mt-16 border-t border-white pt-[30px]">
            <div>
              <p className="text-lg font-normal text-white">
                2020 Pewworld. All right reserved
              </p>
            </div>
            <div className="flex justify-between gap-[80px]">
              <p className="text-lg font-normal text-white">Telepon</p>
              <p className="text-lg font-normal text-white">Email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

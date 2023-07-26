import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
export default function Home() {
  return (
    <Layout>
      <div className="mx-[150px]">
        <div className="flex">
          <div className="flex-1 mt-60">
            <h1 className="text-[44px] font-semibold text-[#1F2A36] leading-[70px]">
              Talenta terbaik negri <br /> untuk perubahan <br /> revolusi 4.0
            </h1>
            <p className="mt-5 text-lg font-normal text-[#46505C]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In <br />
              euismod ipsum et dui rhoncus auctor.
            </p>
            <Link href="/">
              <button className="mt-[55px] rounded py-[21px] px-6 bg-[#5E50A1] text-base font-bold text-white">
                Mulai Dari Sekarang
              </button>
            </Link>
          </div>
          <div className="flex-1 mt-[150px] ml-[175px] relative">
            <Image
              src="/backgroundImage.png"
              width={600}
              height={600}
              alt="Picture of the author"
            />
            <Image
              src="/headerImage.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute top-10 left-10"
            />
            <Image
              src="/hiasan.png"
              width={139}
              height={212}
              alt="Picture of the author"
              className="absolute bottom-8 left-5"
            />
          </div>
        </div>
        <div className="flex">
          <div className="mt-52 relative flex-1">
            <Image
              src="/backgroundImage2.png"
              width={600}
              height={600}
              alt="Picture of the author"
            />
            <Image
              src="/konten1.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute top-16 left-10"
            />
            <Image
              src="/hiasan2.png"
              width={90}
              height={90}
              alt="Picture of the author"
              className="absolute top-3 left-3"
            />
          </div>
          <div className="flex-1 mt-64">
            <h1 className="text-4xl font-semibold text-[#1F2A36] leading-[56px]">
              Kenapa harus mencari tallent <br /> di peworld
            </h1>
            <div className="mt-9">
              <div className="flex gap-6 ">
                <Image
                  src="/bullet.png"
                  width={24}
                  height={24}
                  alt="Picture of the author"
                />
                <p className="text-base font-normal text-[#46505C]">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-6 mt-7">
                <Image
                  src="/bullet.png"
                  width={24}
                  height={24}
                  alt="Picture of the author"
                />
                <p className="text-base font-normal text-[#46505C]">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-6 mt-7">
                <Image
                  src="/bullet.png"
                  width={24}
                  height={24}
                  alt="Picture of the author"
                />
                <p className="text-base font-normal text-[#46505C]">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div className="flex gap-6 mt-7">
                <Image
                  src="/bullet.png"
                  width={24}
                  height={24}
                  alt="Picture of the author"
                />
                <p className="text-base font-normal text-[#46505C]">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ml-[205px]">
          <div className="flex-1 mt-64">
            <h1 className="text-4xl font-semibold text-[#1F2A36] leading-[56px]">
              Skill Talent
            </h1>
            <p className="mt-5 text-lg font-normal text-[#46505C]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In <br />
              euismod ipsum et dui rhoncus auctor.
            </p>
            <div className="mt-9 flex gap-[105px]">
              <div>
                <div className="flex gap-6 ">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">Java</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">Kotlin</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">PHP</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">
                    JavaScript
                  </p>
                </div>
              </div>
              <div>
                <div className="flex gap-6 ">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">Golang</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">C++</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">Ruby</p>
                </div>
                <div className="flex gap-6 mt-7">
                  <Image
                    src="/bullet2.png"
                    width={24}
                    height={24}
                    alt="Picture of the author"
                  />
                  <p className="text-base font-normal text-[#46505C]">
                    10+ Bahasa Lainnya
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-52 relative flex-1">
            <Image
              src="/backgroundImage2.png"
              width={600}
              height={600}
              alt="Picture of the author"
            />
            <Image
              src="/konten2.png"
              width={500}
              height={500}
              alt="Picture of the author"
              className="absolute top-16 left-10"
            />
            <Image
              src="/hiasan3.png"
              width={90}
              height={90}
              alt="Picture of the author"
              className="absolute top-3 left-3"
            />
          </div>
        </div>
        <div className=" mt-[230px]">
          <div>
            <h1 className="text-center pt-[80px] mb-[52px] text-4xl font-semibold text-[#1F2A36]">
              Their opinion about peworld
            </h1>
          </div>
          {/* <div className="w-full h-screen bg-[#E5E5E5]"> */}
          <div className="flex gap-8 justify-center ">
            <div className="w-[340px] h-[440px] bg-gray-50 flex flex-col items-center justify-center">
              <Image
                src="/profile2.png"
                width={120}
                height={120}
                alt="Picture of the author"
                className="border-8 rounded-full border-[#FBB0175E]"
              />
              <h1 className="text-3xl font-semibold text-[#1F2A36] mt-3">
                Niall Horan
              </h1>
              <h2 className=" text-lg font-normal text-[#9EA0A5] mt-2">
                Web Developer
              </h2>
              <p className="text-center px-[76px] mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <div className="w-[340px] h-[440px] bg-gray-50 flex flex-col items-center justify-center">
              <Image
                src="/profile3.png"
                width={120}
                height={120}
                alt="Picture of the author"
                className="border-8 rounded-full border-[#FBB0175E]"
              />
              <h1 className="text-3xl font-semibold text-[#1F2A36] mt-3">
                Louis Tomlinson
              </h1>
              <h2 className=" text-lg font-normal text-[#9EA0A5] mt-2">
                Web Developer
              </h2>
              <p className="text-center px-[76px] mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
            <div className="w-[340px] h-[440px] bg-gray-50 flex flex-col items-center justify-center">
              <Image
                src="/profile1.png"
                width={120}
                height={120}
                alt="Picture of the author"
                className="border-8 rounded-full border-[#FBB0175E]"
              />
              <h1 className="text-3xl font-semibold text-[#1F2A36] mt-3">
                Harry Styles
              </h1>
              <h2 className=" text-lg font-normal text-[#9EA0A5] mt-2">
                Web Developer
              </h2>
              <p className="text-center px-[76px] mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[235px] flex flex-col items-center relative">
          <div>
            <Image
              src="/footer.png"
              width={1140}
              height={227}
              alt="Picture of the author"
            />
            <Image
              src="/hiasanfooter.png"
              width={1140}
              height={294}
              alt="Picture of the author"
              className="absolute bottom-0"
            />
          </div>
          <div className="absolute flex gap-[505px] top-20">
            <h1 className="text-4xl font-semibold text-white ">
              Lorem ipsum <br />
              dolor sit amet
            </h1>
            <Link href="/home">
              <button className="rounded py-[21px] px-6 bg-white text-base font-bold text-[#5E50A1]">
                Mulai Dari Sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

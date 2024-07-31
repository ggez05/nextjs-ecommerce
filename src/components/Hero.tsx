import Image from "next/image";
import Link from "next/link";

interface IProps {
  setRatio: (value: number) => void;
}

export default function Hero({ setRatio }: IProps) {
  return (
    <div className="w-full h-screen relative flex-col flex items-center px-3 justify-center text-center">
      <Image
        src={"/intro.jpg"}
        alt="no Image"
        fill
        className="w-full h-full hidden md:block object-cover opacity-80"
        onLoadingComplete={({ naturalWidth, naturalHeight }) =>
          setRatio(naturalWidth / naturalHeight)
        }
      />
      <div className="w-full md:hidden">
        <Image
          src={"/mob-intro.png"}
          className="object-cover opacity-30"
          alt="no image"
          fill
        />
      </div>
      <h1 className="mb-2 text-5xl text-orange-400 z-10 font-semibold pb-8">
        Get what you want, at the lowest prices!
      </h1>
      <Link
        href={"/#my-Categories"}
        className="border pt-5 pb-5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 border-none  text-white hover:bg-gradient-to-br w-40 text-2xl  z-40"
      >
        Shop Now
      </Link>
    </div>
  );
}

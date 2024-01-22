import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-grow w-full bg-gray-100 h-full flex flex-col items-center bg-gradient-to-b from-cerise-red-50 via-energy-yellow-50 to-indigo-50 overflow-y-hidden">
      <div className="pt-4 pb-2 m-2 max-w-[1000px] items-center h-full flex-grow flex flex-col">
        <div className="w-1/2 border-b border-b-gray-400/70 items-center flex flex-col pb-2 mb-4">
          <h1 className="text-3xl text-black-900 font-mono">Hi!</h1>
        </div>
        <div className="flex-grow items-center w-1/2">
          <p>
            I&apos;m Ashby. I study Mathematics and Computer Science at the
            University of Bristol.
          </p>
          <p>
            I am interested in building software and web applications, along
            with data science in R and Python.
          </p>
        </div>
        <Image src="/bottom_pattern.svg" alt="waves" width={900} height={900} />
      </div>
    </div>
  );
}

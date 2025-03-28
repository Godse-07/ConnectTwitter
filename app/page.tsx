import Image from "next/image";
import NavBar from "./Pages/NavBar";
import Below_Nav from "./Pages/Below_Nav";
import { Features_card } from "./Pages/Features_card";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] min-h-screen w-full">
      <NavBar />

      {/* Below Navbar Section */}
      <div className="h-[300px] flex justify-center items-center text-white pt-16">
        <Below_Nav />
      </div>

      {/* features card */}

      <div className="h-[300px] flex justify-center items-center">
        <Features_card />
      </div>

      {/* Rest of the content */}
      <main className="flex justify-center items-center min-h-[500px] text-white">
        <p className="text-xl">More Content Here</p>
      </main>
    </div>
  );
}

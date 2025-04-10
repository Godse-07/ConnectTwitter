import NavBar from "./Pages/NavBar";
import Below_Nav from "./Pages/Below_Nav";
import { Features_card } from "./Pages/Features_card";
import Tweets from "./Pages/Tweets";
import Footer from "./Pages/Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#050505] w-full min-h-screen">
      <NavBar />

      {/* Below Navbar Section */}
      <div className="py-20 flex justify-center items-center text-white pt-16">
        <Below_Nav />
      </div>

      {/* Features Card */}
      <div className="py-20 flex justify-center items-center">
        <Features_card />
      </div>

      {/* Main Tweets */}
      <main className="flex flex-col items-center justify-center text-white py-20">
        <Tweets />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

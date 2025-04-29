import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function Layout() {
  const [showClip, setShowClip] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105 filter blur-md"
        style={{ backgroundImage: "url('/images/forgexp-bg.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />

      <div className="relative z-10 flex flex-col flex-grow">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer setShowClip={setShowClip} />
      </div>
      {showClip && (
        <div className="fixed bottom-24 right-6 z-50 bg-gray-900 border border-blue-500 rounded-lg p-4 shadow-lg w-80">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm font-semibold">Gameplay Clip</h3>
            <button
              onClick={() => setShowClip(false)}
              className="text-gray-400 hover:text-white text-lg"
            >
              ✖
            </button>
          </div>
          <video src="/videos/myClip.mp4" controls className="w-full rounded" />
        </div>
      )}
    </div>
  );
}

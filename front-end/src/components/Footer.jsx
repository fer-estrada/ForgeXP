import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function Footer({ setShowClip }) {
  return (
    <footer className="relative z-10 w-full bg-gray-900 text-white py-2 px-6 border-t border-gray-700">
      <div className="w-full text-left text-sm">
        © {new Date().getFullYear()} ForgeXP. All rights reserved.
      </div>
      <div className="absolute bottom-1 right-2 w-[2rem] h-[2rem] ">
        <div className="wambutton w-full h-full">
          <button
            name="checkbox"
            type="button"
            onClick={() => setShowClip(true)}
          ></button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </footer>
  );
}

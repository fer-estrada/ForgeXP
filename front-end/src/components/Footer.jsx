export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-gray-900 text-white py-2 px-6 border-t border-gray-700 ">
      <div className="w-full text-left text-sm">
        © {new Date().getFullYear()} ForgeXP. All rights reserved.
      </div>
    </footer>
  );
}

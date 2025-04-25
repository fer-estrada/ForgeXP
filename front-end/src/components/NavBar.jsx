import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SearchUser from "./SearchUser";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const clickHandle = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-700 text-white px-6 py-4 shadow-md border-b">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/minilogo.png"
            alt="ForgeXP Logo"
            className="h-8 w-auto drop-shadow-xl"
            onClick={() => setIsOpen(false)}
          />
          <span
            className="font-[SCREAM] text-orange-500 text-2xl tracking-wide drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]"
            onClick={() => setIsOpen(false)}
          >
            ForgeXP
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav links (desktop not mobile) */}
        <ul className="hidden lg:flex gap-6 text-lg">
          {/*!!!MOVE Into Community!!!*/}

          <li>
            <Link
              to="/community"
              className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              Community
            </Link>
          </li>

          <li>
            <Link
              to="/all-games"
              className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              All Games
            </Link>
          </li>
          {!localStorage.getItem("token") ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/account"
                  className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  My Account
                </Link>
              </li>
            </>
          )}
          <li
            onClick={clickHandle}
            className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>

      {/* NavBar links WHEN mobile dropdown ("hamburger") using lucid-react. Others may have to install. Ask Jason for install command */}
      {isOpen && (
        <ul className="flex flex-col mt-4 space-y-3 lg:hidden text-lg">
          <li>
            <Link
              to="/community"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              to="/all-games"
              className="hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              All Games
            </Link>
          </li>

          {!localStorage.getItem("token") ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-orange-400"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-orange-400"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  clickHandle();
                  setIsOpen(false);
                }}
                className="hover:text-orange-400 cursor-pointer"
              >
                Logout
              </li>
              <li>
                <Link
                  to="/account"
                  className="hover:text-orange-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
              </li>
              <li>
                <SearchUser />
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

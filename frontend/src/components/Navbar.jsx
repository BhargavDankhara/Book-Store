import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img src="/logo.png" alt=" Logo" className=" w-16  sm:w-16" />
        </Link>
        <div className="hidden sm:flex gap-2 items-center">
          <Link to="/allbooks" className="hover:underline">
            All Books
          </Link>
          <Link to="/" className="hover:underline">
            Borrow
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-slate-300 border rounded border-gray-800">
          <Link
            to={"/allbooks"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            All Books
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Borrow
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const status = useSelector((state) => state.auth.status);

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  const toggleMenu = () => {
    setIsMenuActive((prevIsMenuActive) => !prevIsMenuActive);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white text-black border-b sticky top-0 z-50">
      <nav className="flex items-center gap-5 justify-between px-6 py-4 relative">
        <div
          id="menu-btn"
          className="hidden max-[1050px]:block max-[1050px]:order-1 text-3xl cursor-pointer"
          onClick={toggleMenu}
        >
          ☰
        </div>
        <ul className="max-[1050px]:order-2">
          <li className="font-bold text-2xl">Bloggify</li>
        </ul>
        <ul id="menu" className={`menu ${isMenuActive ? "active" : ""}`}>
          <li>
            <i
              className="fas fa-times close-btn mb-12 cursor-pointer text-2xl"
              onClick={closeMenu}
            ></i>
          </li>
          <li>
            <Link to="/" onClick={closeMenu}>
              <span
                className={`px-2 py-3 cursor-pointer ${
                  location.pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={closeMenu}>
              <span
                className={`px-2 py-3 cursor-pointer ${
                  location.pathname.startsWith("/blogs") ? "font-bold" : ""
                }`}
              >
                Blogs
              </span>
            </Link>
          </li>
        </ul>
        <ul className="ml-auto max-[1050px]:ml-0 max-[1050px]:order-3">
          <li>
            {isLoggedIn ? (
              <div className="relative">
                <div
                  id="avatarButton"
                  type="button"
                  onClick={toggleDropdown}
                  className="h-10 w-10 text-md flex items-center justify-center text-white font-bold uppercase rounded-full cursor-pointer bg-gray-500"
                >
                  {user?.fullName.substring(0, 1)}
                </div>

                {isDropdownVisible && (
                  <div
                    id="userDropdown"
                    className="z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <div>{user?.fullName}</div>
                      <div className="font-medium truncate">{user?.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="avatarButton"
                    >
                      <li>
                        <Link
                          to="/my-blogs"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/write-blog"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Write Blog
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                        &nbsp; Sign out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <span className="px-6 py-2 cursor-pointer border border-black rounded-md hover:text-white hover:bg-black">
                  Login
                </span>
              </Link>
            )}
          </li>
        </ul>
        <div
          className={`overlay ${isMenuActive ? "active" : ""}`}
          onClick={closeMenu}
        ></div>
      </nav>
    </header>
  );
};

export default Navbar;

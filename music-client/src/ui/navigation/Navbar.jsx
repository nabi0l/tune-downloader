import {
  FaMusic,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SearchBar from "../../components/Search/SearchBar";
import { NavLink, useMatch } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { cart } = useCart();
  const { currentUser, signout, isAdmin } = useAuth();

  // Track active routes for music dropdown
  const isAlbumsActive = useMatch("/catalog/albums/*");
  const isSinglesActive = useMatch("/catalog/singles/*");
  const isMusicActive = isAlbumsActive || isSinglesActive;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsMusicOpen(false);
      setIsUserDropdownOpen(false);
    }
  };

  const toggleMusic = () => {
    setIsMusicOpen(!isMusicOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsMusicOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signout();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };



  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaMusic className="text-2xl text-black" />
            <h1 className="text-2xl font-bold text-black">TuneDownloader</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center items-center">
            <ul className="flex items-center space-x-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-black transition ${
                      isActive ? "text-black font-medium" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/catalog/artists"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-black transition ${
                      isActive ? "text-black font-medium" : ""
                    }`
                  }
                >
                  Artists
                </NavLink>
              </li>

              <li className="relative">
                <div className="flex items-center">
                  <span
                    className={`text-gray-600 hover:text-black transition ${
                      isMusicActive ? "text-black font-medium" : ""
                    }`}
                  >
                    Music
                  </span>
                  <button
                    onClick={toggleMusic}
                    className="ml-1 focus:outline-none"
                  >
                    {isMusicOpen ? (
                      <FaChevronUp className="text-sm" />
                    ) : (
                      <FaChevronDown className="text-sm" />
                    )}
                  </button>
                </div>
                {isMusicOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <NavLink
                      to="/catalog/albums"
                      onClick={() => setIsMusicOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black ${
                          isActive ? "bg-gray-50 text-black" : ""
                        }`
                      }
                    >
                      Albums
                    </NavLink>
                    <NavLink
                      to="/catalog/singles"
                      onClick={() => setIsMusicOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black ${
                          isActive ? "bg-gray-50 text-black" : ""
                        }`
                      }
                    >
                      Singles
                    </NavLink>
                  </div>
                )}
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-gray-600 hover:text-black transition ${
                      isActive ? "text-black font-medium" : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="hidden md:block w-full max-w-md">
              <SearchBar />
            </div>

            {/* Cart with badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-gray-600 hover:text-black text-xl relative ${
                  isActive ? "text-black" : ""
                }`
              }
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </span>
              )}
            </NavLink>

            {/* User dropdown or login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center text-gray-600 hover:text-black transition"
                >
                  <FaUser className="text-xl" />
                  <FaChevronDown
                    className={`ml-1 text-xs transition-transform ${
                      isUserDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {/* Admin Dashboard link for admins only */}
                    {isAdmin && (
                      <NavLink
                        to="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black font-semibold"
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    <NavLink
                      to="/account"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                    >
                      My Account
                    </NavLink>
                    {/* Favorites link - only show for regular users, not admins */}
                    {!isAdmin && (
                      <NavLink
                        to="/favorites"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                      >
                        Favorites
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-gray-600 hover:text-black transition ${
                    isActive ? "text-black font-medium" : ""
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <SearchBar />
            </div>

            <nav>
              <ul className="flex flex-col space-y-3 px-2">
                <li>
                  <NavLink
                    to="/"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block py-2 text-gray-600 hover:text-black ${
                        isActive ? "text-black font-medium" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/catalog/artists"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block py-2 text-gray-600 hover:text-black ${
                        isActive ? "text-black font-medium" : ""
                      }`
                    }
                  >
                    Artists
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={toggleMusic}
                    className="flex items-center w-full py-2 text-gray-600 hover:text-black"
                  >
                    Music
                    {isMusicOpen ? (
                      <FaChevronUp className="ml-1 text-sm" />
                    ) : (
                      <FaChevronDown className="ml-1 text-sm" />
                    )}
                  </button>
                  {isMusicOpen && (
                    <div className="pl-4 mt-1 space-y-2">
                      <NavLink
                        to="/catalog/albums"
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `block py-1 text-gray-600 hover:text-black ${
                            isActive ? "text-black font-medium" : ""
                          }`
                        }
                      >
                        Albums
                      </NavLink>
                      <NavLink
                        to="/catalog/singles"
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `block py-1 text-gray-600 hover:text-black ${
                            isActive ? "text-black font-medium" : ""
                          }`
                        }
                      >
                        Singles
                      </NavLink>
                      {/* <NavLink
                        to="/catalog/playlists"
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `block py-1 text-gray-600 hover:text-black ${
                            isActive ? "text-black font-medium" : ""
                          }`
                        }
                      >
                        Playlists
                      </NavLink> */}
                    </div>
                  )}
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block py-2 text-gray-600 hover:text-black ${
                        isActive ? "text-black font-medium" : ""
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>

                <li className="flex items-center justify-between pt-4 border-t border-gray-200 mt-2">
                  <NavLink
                    to="/cart"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-black text-xl relative ${
                        isActive ? "text-black" : ""
                      }`
                    }
                  >
                    <FaShoppingCart />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                      </span>
                    )}
                  </NavLink>

                  {currentUser ? (
                    <div className="flex space-x-4">
                      <NavLink
                        to="/account"
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `text-gray-600 hover:text-black ${
                            isActive ? "text-black font-medium" : ""
                          }`
                        }
                      >
                        Account
                      </NavLink>
                      {/* Favorites link - only show for regular users, not admins */}
                      {!isAdmin && (
                        <NavLink
                          to="/favorites"
                          onClick={toggleMenu}
                          className={({ isActive }) =>
                            `text-gray-600 hover:text-black ${
                              isActive ? "text-black font-medium" : ""
                            }`
                          }
                        >
                          Favorites
                        </NavLink>
                      )}
                      <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-black"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `text-gray-600 hover:text-black ${
                          isActive ? "text-black font-medium" : ""
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  )}
                </li>

                {/* Mobile menu admin link */}
                {currentUser && isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-black ${
                        isActive ? "text-black font-medium" : ""
                      }`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

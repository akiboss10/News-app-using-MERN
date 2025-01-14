import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import countries from "./countries"; // Assuming you have the country data

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup forms
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For signup form

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  }

  function handleLogin() {
    // Mock login validation logic
    if (username && password) {
      alert(`Welcome, ${username}!`);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } else {
      alert("Please enter both username and password!");
    }
  }

  function handleSignup() {
    // Mock signup validation logic
    if (username && password && email) {
      alert(`Account created for ${username}!`);
      setIsSignup(false); // Switch back to login form
    } else {
      alert("Please fill all fields!");
    }
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
        <h3 className="heading font-bold text-2xl">News Hub</h3>

        <ul
          className={`${
            active ? "active" : ""
          } nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end`}
        >
          <li>
            <Link
              className="no-underline font-semibold"
              to="/"
              onClick={() => setActive(!active)}
            >
              All News
            </Link>
          </li>

          {/* Top Headlines Dropdown */}
          <li className="dropdown-li">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines
              <FontAwesomeIcon
                className={showCategoryDropdown ? "down-arrow-icon-active" : ""}
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={`dropdown p-2 ${showCategoryDropdown ? "show-dropdown" : ""}`}
            >
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <Link
                    to={`/top-headlines/${category}`}
                    className="flex gap-3 capitalize"
                    onClick={() => setActive(!active)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Country Dropdown */}
          <li className="dropdown-li">
            <Link
              className="no-underline font-semibold flex items-center gap-2"
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country
              <FontAwesomeIcon
                className={showCountryDropdown ? "down-arrow-icon-active" : ""}
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={`dropdown p-2 ${showCountryDropdown ? "show-dropdown" : ""}`}
            >
              {countries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <Link
                    to={`/country/${country.iso_2_alpha}`}
                    className="flex gap-3"
                    onClick={() => setActive(!active)}
                  >
                    <img
                      src={`https://flagcdn.com/32x24/${country.iso_2_alpha}.png`}
                      alt={country.countryName}
                    />
                    <span>{country.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Theme Toggle */}
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>

          {/* Login Button */}
          <li>
            <button
              className="login-btn font-semibold"
              onClick={() => setShowLoginModal(true)}
            >
              {isLoggedIn ? "Profile" : "Login"}
            </button>
          </li>
        </ul>

        <div
          className={`ham-burger ${active ? "ham-open" : ""}`}
          onClick={() => setActive(!active)}
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="modal-content">
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isSignup && (
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn-login"
              onClick={isSignup ? handleSignup : handleLogin}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
            {!isSignup ? (
              <p>
                Don’t have an account?{" "}
                <button
                  className="signup-link"
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  className="signup-link"
                  onClick={() => setIsSignup(false)}
                >
                  Login
                </button>
              </p>
            )}
            <button
              className="btn-close"
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

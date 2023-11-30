import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import Logout from "./Logout"; 
import AutocompleteSearch from "./AutoCompleteSearch";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleDataAnalyticsClick = () => {
    // Toggle the visibility of sub-items
    setIsDropdownActive((prev) => !prev);
  };

  useEffect(() => {
    // Check if the user is already logged in using localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the loggedInUser from localStorage and update isLoggedIn state
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleNavLinkClick = (title, subItemId) => {
    setActive(title);
    // Close the Data Analytics dropdown when clicking on other Navlinks or on the Home page
    if (title !== "Data Analytics" && title !== "Home") {
      setIsDropdownActive(false);
    }

    if (title === "Home") {
      navigate("/");
    } else if (title === "Login") {
      navigate("/login");
    } else if (title === "Services") {
      navigate("/services");
    } else if (title === "Contact") {
      navigate("/contact");
    } else if (title === "Application Analysis") {
      navigate("/DataAnalyticsApplication");
    } else if (title == "Cryptocurrency Analysis") {
      navigate("/DataAnalysisCrypto");
    } 
    else if (title == "Profile") {
      navigate("/profile");
    } 
    else {
      // Handle other navigation logic if needed
      // For example: navigate(`/${title.toLowerCase()}`)
    }
  };

  return (
    <nav className={`w-full flex py-6 justify-between items-center navbar ${isDropdownActive ? 'dropdown-active' : ''}`}>
      {/* Your logo or site name */}
      <a href="/" className="text-gradient text-[34px] flex-1 justify-start">
        Quantum Vault
      </a>{" "}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => {
          if (nav.title === "Login" && isLoggedIn) {
            return null; // Hide "Login" link if logged in
          } else if (nav.title === "Logout" && !isLoggedIn) {
            return null; // Hide "Logout" link if not logged in
          }
          return (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => {
                // Handle "Data Analytics" click separately
                if (nav.title === "Data Analytics") {
                  handleDataAnalyticsClick();
                } else {
                  // Handle other links
                  handleNavLinkClick(nav.title);
                }
              }}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {/* Render subItems for "Data Analytics" dropdown */}
              {nav.subItems && nav.title === "Data Analytics" && (
                <ul className={`absolute ${isDropdownActive ? "block" : "hidden"} bg-white text-black mt-2 p-2 space-y-2`}>
                  {nav.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className={`font-poppins font-normal cursor-pointer text-[16px] ${
                        active === subItem.title ? "bg-dimWhite" : "bg-white"
                      }`}
                      onClick={() => handleNavLinkClick(subItem.title, subItem.id)}
                    >
                      <a href={`#${subItem.id}`}>{subItem.title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        {isLoggedIn && (
          <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite">
            <Logout handleLogout={handleLogout} />
          </li>
        )}
      </ul>
      {/* Rest of your code for responsive design */}
      <div className="flex items-center flex-1 justify-end">
        <AutocompleteSearch />
      </div>
    </nav>
  );
};

export default Navbar;

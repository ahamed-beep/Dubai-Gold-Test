import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Scroll hone par background show
      } else {
        setIsScrolled(false); // TOP pe bilkul transparent
      }
    };

    // Page load ke time bhi check kare
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`  px-2 md:px-2 md:pr-3  py-2  transition-all duration-300 mb-0 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-sm shadow"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/Images/newlogo.png"
            className=" w-15 h-15  md:w-20 md:h-20 object-contain"
            alt="Dubai GoldBarMaker Logo"
          />
          <div className="  ">
            <div className="flex flex-col">
              <div className=" -ml-2 md:ml-0 text-[13px] md:text-xl font-bold text-amber-800 leading-tight">
                DUBAI
              </div>
              <div className=" -ml-2 md:ml-0 text-[12px] md:text-base font-semibold text-amber-700">
                Gold/Silver-BarMaker
              </div>
            </div>
          </div>
        </div>

        {/* Admin Login Button */}
        <div>
          <Link to='/login' >
          <button className="bg-yellow-300 px-4 text-[13px] text-black md:px-6 py-2.5 rounded-full md:font-medium md:text-[15px] hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            Admin Login
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
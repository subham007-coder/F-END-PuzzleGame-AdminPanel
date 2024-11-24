import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineProject, AiOutlineDashboard } from "react-icons/ai";
import { BsListTask, BsClock, BsPeople, BsGear } from "react-icons/bs";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi"; // Import menu icons

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 right-4 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-all duration-300"
      >
        {isExpanded ? (
          <HiMenuAlt3 className="text-2xl text-gray-600" />
        ) : (
          <HiMenuAlt2 className="text-2xl text-gray-600" />
        )}
      </button>

      {/* Navbar */}
      <nav className={`bg-black h-screen ${isExpanded ? 'w-64' : 'w-20'} p-4 fixed left-0 top-0 transition-all duration-300`}>
        <div className="flex flex-col space-y-6">
          <h1 className={`text-xl font-bold text-white ${!isExpanded && 'hidden'}`}>
            Memory Card Game
          </h1>

          {/* Create New Card Button */}
          <Link 
            to="/new-project" 
            className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} bg-white rounded-full px-4 py-2`}
          >
            <AiOutlinePlus className="text-orange-500 text-xl" />
            {isExpanded && <span className="text-black">Create new Card</span>}
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} text-white hover:text-orange-500 px-4 py-2`}
            >
              <AiOutlineDashboard className="text-2xl" />
              {isExpanded && <span>Dashboard</span>}
            </Link>

            <Link 
              to="/projects" 
              className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} text-white hover:text-orange-500 px-4 py-2`}
            >
              <AiOutlineProject className="text-2xl" />
              {isExpanded && <span>Projects</span>}
            </Link>

            <Link 
              to="/time-log" 
              className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} text-white hover:text-orange-500 px-4 py-2`}
            >
              <BsClock className="text-2xl" />
              {isExpanded && <span>Time log</span>}
            </Link>

            <Link 
              to="/menu-settings" 
              className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} text-white hover:text-orange-500 px-4 py-2`}
            >
              <BsGear className="text-2xl" />
              {isExpanded && <span>Menu settings</span>}
            </Link>
          </div>
        </div>
      </nav>

      {/* Adjust main content margin */}
      <div className={`${isExpanded ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Your main content here */}
      </div>
    </>
  );
}

export default Navbar;

import React from "react";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="flex text-sm text-gray-500 sm:text-center">
            © 2023 <li className="hover:underline">trello</li>. All Rights
            Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li className="hover:underline me-4 md:me-6">About</li>
            <li className="hover:underline me-4 md:me-6">Privacy Policy</li>
            <li className="hover:underline me-4 md:me-6">Licensing</li>
            <li className="hover:underline">Contact</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-500 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 Blood Donation App. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="/" className="hover:underline">Home</a>
          <a href="/register" className="hover:underline">Register</a>
          <a href="/search" className="hover:underline">Search Donors</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

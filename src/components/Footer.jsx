import React from "react";
// Import icons from lucide-react (standard in many React projects)
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-500 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2026 Blood Donation App. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:underline text-sm">Home</a>
          <a href="/register" className="hover:underline text-sm">Register</a>
          <a href="/search" className="hover:underline text-sm">Search Donors</a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-5">
          <a href="https://www.facebook.com/groups/dhakablooddonation" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 transition-colors">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://x.com/blooddonation0" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 transition-colors">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://www.instagram.com/donate_blood_to_save_life/" target="_blank" rel="noopener noreferrer" className="hover:text-red-200 transition-colors">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="mailto:contact@bloodapp.com" className="hover:text-red-200 transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
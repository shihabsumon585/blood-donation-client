import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-10 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 text-center md:text-left">
          <p className="text-lg font-semibold">Blood Pulse</p>
          <p className="max-w-md text-sm text-red-100/90">
            Donate blood, save lives and stay connected with local donation requests.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <a href="/" className="text-sm transition hover:text-red-200">Home</a>
          <a href="/register" className="text-sm transition hover:text-red-200">Register</a>
          <a href="/search" className="text-sm transition hover:text-red-200">Search Donors</a>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a href="https://www.facebook.com/groups/dhakablooddonation" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
            <Facebook size={18} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://x.com/blooddonation0" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
            <Twitter size={18} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://www.instagram.com/donate_blood_to_save_life/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
            <Instagram size={18} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="mailto:contact@bloodapp.com" className="rounded-full bg-white/10 p-3 transition hover:bg-white/20">
            <Mail size={18} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-red-100/80">
        &copy; {new Date().getFullYear()} Blood Donation App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
import { Film, Mail, Phone } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white pt-10 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5" />
            <h1 className="text-lg italic font-bold">Movie Z</h1>
          </div>
          <p className="text-sm">© 2025 Movie Z. All Rights Reserved.</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24">
          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Contact Information</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">support@movieZ.com</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">Phone:</span>
                <span className="text-sm">+976 (11) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Follow Us</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/pinecone.academy.mongolia/"
                className="text-sm font-medium hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/pineconemongolia/?hl=en"
                className="text-sm font-medium hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@PineconeAcademy"
                className="text-sm font-medium hover:underline"
              >
                Youtube
              </a>
              <a
                href="https://x.com/PineconeAcademy/status/1549962051199479808"
                className="text-sm font-medium hover:underline"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

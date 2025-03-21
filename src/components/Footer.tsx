import { Film, Mail, Phone } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex pt-[51px]">
      <div className="w-full bg-indigo-700 h-[200px] flex px-[80px] py-[40px]">
      <div className="flex w-full justify-between">
        <div className="flex items-start flex-col gap-3">
          <div className="flex gap-2 items-center justify-center">
            <Film className="text-[#FAFAFA] size-[20px]" />
            <h1 className="text-[16px] italic text-[#FAFAFA] font-[700]">
              Movie Z
            </h1>
          </div>
          <p className="text-[#FAFAFA] text-[14px]">
            © 2025 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div>
          <div className="flex gap-[96px]">
            <div className="flex items-start gap-3 flex-col">
              <p className="text-[#FAFAFA] text-[14px]">Contact information</p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex  gap-[12px] justify-center">
                  <Mail className="text-[#FAFAFA]" />
                  <h1 className="text-[#FAFAFA] text-[14px]">Email:</h1>
                  <p className="text-[#FAFAFA] text-[14px]">
                    support@movieZ.com
                  </p>
                </div>
                <div className="flex gap-[12px] justify-center">
                  <Phone className=" text-[#FAFAFA]" />
                  <h1 className="text-[#FAFAFA] text-[14px]">Phone:</h1>
                  <p className="text-[#FAFAFA] text-[14px]">
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[#FAFAFA] text-[14px]">Follow us</h1>
              <div className="flex gap-3">
                <a
                  className="text-[#FAFAFA] font-[500] text-[14px]"
                  href="https://www.facebook.com/pinecone.academy.mongolia/"
                >
                  Facebook
                </a>
                <a
                  className="text-[#FAFAFA] font-[500] text-[14px]"
                  href="https://www.instagram.com/pineconemongolia/?hl=en"
                >
                  Instagram
                </a>
                <a
                  className="text-[#FAFAFA] font-[500] text-[14px]"
                  href="https://www.youtube.com/@PineconeAcademy"
                >
                  Youtube
                </a>
                <a
                  className="text-[#FAFAFA] font-[500] text-[14px]"
                  href="https://x.com/PineconeAcademy/status/1549962051199479808"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

"use client";
import React from "react";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import WhatsApp from "../assets/whatsapp.svg";
import Linkedin from "../assets/linkedin.svg";
import Instagram from "../assets/instagram.svg";
import { motion } from "framer-motion";

const contact = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <motion.div
        className="mr-30 ml-30 mt-65"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <p className="text-3xl font-bold">
          I’d love to hear from you!
          <br />
          Feel free to say hi via email or social media
        </p>
        <div className="mt-5 flex items-center gap-4">
          {/* Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=artini.artalia501@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base bg-[#806D9C] text-white py-2 px-6 rounded-2xl hover:bg-white hover:text-[#806D9C] outline-2 outline-transparent hover:outline-[#806D9C] transition"
          >
            artini.artalia501@gmail.com
          </a>

          {/* Ikon Sosial Media */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6283119679411"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#806D9C] rounded-full p-2 inline-block hover:bg-white hover:outline-2 hover:outline-[#806D9C] outline-transparent transition group"
            >
              <Image
                src={WhatsApp}
                alt="WhatsApp"
                width={20}
                height={20}
                className="invert transition group-hover:invert-0 group-hover:brightness-0 group-hover:[filter:invert(25%)_sepia(13%)_saturate(800%)_hue-rotate(230deg)_brightness(95%)_contrast(90%)]"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/artini-artalia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#806D9C] rounded-full p-2 inline-block hover:bg-white hover:outline-2 hover:outline-[#806D9C] outline-transparent transition group"
            >
              <Image
                src={Linkedin}
                alt="Linkedin"
                width={20}
                height={20}
                className="invert transition group-hover:invert-0 group-hover:brightness-0 group-hover:[filter:invert(25%)_sepia(13%)_saturate(800%)_hue-rotate(230deg)_brightness(95%)_contrast(90%)]"
              />
            </a>

            <a
              href="https://www.instagram.com/artini.artalia?igsh=MWE3bDlqMG90azFncw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#806D9C] rounded-full p-2 inline-block hover:bg-white hover:outline-2 hover:outline-[#806D9C] outline-transparent transition group"
            >
              <Image
                src={Instagram}
                alt="Instagram"
                width={20}
                height={20}
                className="invert transition group-hover:invert-0 group-hover:brightness-0 group-hover:[filter:invert(25%)_sepia(13%)_saturate(800%)_hue-rotate(230deg)_brightness(95%)_contrast(90%)]"
              />
            </a>
          </div>
        </div>
      </motion.div>
      <hr className="border-t-1 border-[#806D9C] ml-30 mr-30 mt-50" />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default contact;

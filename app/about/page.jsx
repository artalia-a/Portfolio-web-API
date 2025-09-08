"use client";
import React from "react";
import Image from "next/image";
import Gambar1 from "../assets/gambar1.jpeg";
import Gambar2 from "../assets/gambar2.jpg";
import Header from "../components/header";
import Footer from "../components/footer";
import Tools from "../data/tools.json";
import dataExperience from "../data/experience.json";
import { motion } from "framer-motion";
// import { o } from "framer-motion/dist/types.d-Cjd591yU";

const About = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mx-30 mt-65">
        <p className="text-4xl mb-8 font-bold">Hi!, I'm Artini Artalia</p>
        <p className="text-gray-800 ">
          Enthusiastic designing UI/UX and implementing them with frontend code
          — <br />
          bridging visuals and functionality in every project.
        </p>
      </div>
      <div className="mx-30 mb-40 mt-10">
        <a
          href="../cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base mt-10 bg-[#806D9C] text-white py-2 px-6 rounded-2xl hover:bg-white hover:text-[#806D9C] outline-2 outline-transparent hover:outline-[#806D9C] transition"
        >
          View My Resume
        </a>
      </div>
      <hr className="border-t-1 border-[#806D9C] mx-30 shadow-lg" />
      <motion.div
        className="grid grid-cols-[2fr_1fr] gap-1 rounded-lg shadow-lg p-10 mx-30 mt-15"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <div className="">
          <div className="">
            <p className="text-lg mb-8 font-semibold">LITTLE ABOUT ME</p>
          </div>
          <div className="pr-20">
            <p className="text-base mb-2  text-gray-700 text-justify">
              I am a{" "}
              <span className="font-bold">
                UI/UX Designer and Front-End Developer
              </span>{" "}
              passionate about creating intuitive and engaging digital
              experiences. In addition to design, I have a strong interest in
              technical writing and experience in producing clear and
              well-structured documentation. Currently, I am pursuing a degree
              in Information Systems, which enhances my ability to combine
              creative design with technical aspects.
            </p>
            <p className="text-base mb-2 text-gray-700 text-justify">
              Throughout my academic journey and projects, I have been involved
              in various stages of the design process, including user research,
              wireframing, and creating user interfaces based on human-centered
              design principles. I also possess front-end development skills
              using modern frameworks, allowing me to bridge the gap between
              design and implementation effectively.
            </p>
            <p className="text-base   text-gray-700 text-justify">
              I am an adaptive and collaborative individual who is always eager
              to learn new things in the ever-evolving digital landscape. My
              goal is to deliver digital solutions that are not only
              aesthetically pleasing and consistent but also provide real value
              to users.
            </p>
          </div>
        </div>
        <div className="relative  mt-15">
          <div className=" ">
            <Image
              src={Gambar2}
              alt="Gambar 2"
              width={300}
              height={100}
              className="object-cover rounded-lg shadow-lg mb-10"
            />
          </div>
        </div>
      </motion.div>
      {/* <hr className="border-t-1 border-[#806D9C] ml-30 mr-30" /> */}
      <motion.div
        className="mx-30 mt-15 rounded-lg shadow-xl p-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <p className="text-lg mb-2 font-semibold ">ESSENTIAL TOOLS I USE</p>
        <p className="mb-8 text-sm text-gray-700">
          Discover the powerful tools and technologies I use to create
          exceptional, high-performing websites & applications.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#806D9C] p-2 flex flex-row items-start gap-4"
            >
              <Image
                src={tool.image}
                alt={tool.title}
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="flex flex-col items-start">
                <h3 className="text-sm font-semibold">{tool.title}</h3>
                <p className="text-xs text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-15 ml-30 mr-30 rounded-lg shadow-xl p-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <p className="text-lg mb-8 font-semibold">MY EXPERIENCE</p>
        <div className="relative border-l-2 border-gray-300 pl-8">
          {dataExperience.map((experience, index) => (
            <div key={index} className="mb-8 relative">
              {/* Bullet point */}
              <div className="absolute -left-10 top-2 w-4 h-4 bg-[#806D9C] rounded-full border-2 border-gray-300"></div>

              {/* Konten */}
              <p className="text-base font-semibold">{experience.name}</p>
              <p className="text-sm italic text-gray-500 mb-2">
                {experience.year}
              </p>
              <p className="text-sm text-gray-700 text-justify pr-10">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About;

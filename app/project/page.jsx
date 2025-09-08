"use client";
import React from "react";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import projects from "../data/project.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const project = () => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="relative flex items-center justify-center h-[625px] bg-white overflow-hidden">
        <div className="relative text-center ">
          <p className="mb-4 mt-30 text-4xl font-bold text-[#806D9C] animate__animated animate__fadeInUp">
            Where creativity meets functionality -
          </p>
          <p className="text-gray-700 animate__animated animate__fadeInUp">
            Explore curated projects that reflect my passion, precision, and
            expertise in UI/UX design and front-end development.
          </p>
        </div>
      </div>
      <hr className="border-t-1 border-[#806D9C] mx-30" />
      <div className="mr-30 ml-30 rounded-lg shadow-xl p-10 mt-15">
        <p className="text-lg mb-8 font-semibold">PROJECT</p>
        <div className="mt-15 mb-15">
          {/* <p className="text-lg mb-10 font-bold">PROJECT</p> */}
          <div className="flex justify-center">
            <motion.div
              className="grid grid-cols-3 gap-15"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              {projects.map((project, idx) => (
                <Link key={idx} href={`/project/${project.id}`}>
                  <div className="relative w-70 h-60 rounded-xl overflow-hidden group shadow-lg mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-start">
                    <p>{project.title}</p>
                  </div>
                  <div className=" mt-1 text-xs text-gray-700 text-start">
                    <p>{project.role}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-[#806D9C] mt-15 mx-30" />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default project;

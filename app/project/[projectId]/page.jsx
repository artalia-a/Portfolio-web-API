"use client";
import React from "react";
import projects from "../../data/project.json";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((p) => String(p.id) === params.projectId);
  if (!project) return notFound();

  return (
    <>
      <Header />
      <div className="mx-30 mt-30  ">
        <div className="grid grid-cols-2 gap-2 mb-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }} // mulai dari kiri
            whileInView={{ x: 0, opacity: 1 }} // ke posisi normal
            transition={{ duration: 0.5, ease: "easeOut" }} // agak cepat
            viewport={{ once: false }}
          >
            <Image
              src={project.foto}
              alt={project.title}
              width={500}
              height={500}
              className="w-full"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
            className="flex flex-col justify-center items-start"
            initial={{ x: 100, opacity: 0 }} // mulai dari kanan
            whileInView={{ x: 0, opacity: 1 }} // geser ke posisi normal
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }} // animasi setiap muncul di viewport
          >
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="mb-5 italic ">
              {project.role} - {project.year}
            </p>
            <p className="mb-4 text-sm text-gray-700 text-justify pr-30">
              {project.description}
            </p>
            <div className="mt-5">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base mt-10 bg-[#806D9C] text-white py-2 px-6 rounded-2xl hover:bg-white hover:text-[#806D9C] outline-2 outline-transparent hover:outline-[#806D9C] transition"
              >
                View Full Project
              </a>
            </div>
          </motion.div>
        </div>
        <hr className="border-t-1 border-[#806D9C]" />
        <motion.div
          className="mt-15"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <p className="font-bold text-2xl text-center">
            High Quality Awesome{" "}
            <span className=" text-[#6531b3]">{project.title}</span> Features{" "}
            <br /> You Will Impress
          </p>
          <div className="grid grid-cols-3 gap-6 mt-15 items-stretch">
            {project.fitur.map((item, index) => (
              <div
                key={index}
                className="rounded-lg shadow-xl p-10 text-center flex flex-col justify-start"
              >
                <h3 className="text-base font-semibold mb-2 text-[#6531b3]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
          className="grid grid-cols-2 gap-2 mt-30 items-center"
        >
          {project.contibution?.map((con, i) => (
            <React.Fragment key={i}>
              {/* Kolom Kiri (Image) */}
              <div className="flex justify-center">
                <img
                  src={con.image}
                  alt="Contribution"
                  className="w-full max-w-sm "
                />
              </div>

              {/* Kolom Kanan (List) */}
              <div className="rounded-lg shadow-xl p-10">
                <h2 className="text-2xl font-bold mb-4 ">My Contributions</h2>
                <ul className="space-y-4">
                  {con.list.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {/* Lingkaran dengan angka */}
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#806D9C] text-white rounded-full text-sm font-bold">
                        {idx + 1}
                      </div>
                      {/* Teks */}
                      <p className="text-base text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
        <motion.div
          className="rounded-lg  p-10 mt-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <p className="text-xl font-semibold mt-15 mb-10">Project Overview</p>

          <div className="grid grid-cols-2 gap-2 justify-center place-items-center mt-15">
            {project.images?.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={project.title + i}
                width={500}
                height={500}
                className=" rounded-xl mb-10"
              />
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

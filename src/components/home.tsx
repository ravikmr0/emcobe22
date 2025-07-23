import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesGrid from "./ServicesGrid";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import ProjectPhotosGallery from "./ProjectPhotosGallery";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={fadeIn}
      >
        <HeroSection />
      </motion.div>

      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
      >
        <AboutSection />
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
      >
        <ServicesGrid />
      </motion.div>

      {/* Standards Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Standards & Compliance
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Standard logos */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                <span className="text-xl font-bold text-blue-700">AISC</span>
              </div>
              <span className="mt-2 text-sm text-gray-600">
                American Institute of Steel Construction
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                <span className="text-xl font-bold text-blue-700">NISD</span>
              </div>
              <span className="mt-2 text-sm text-gray-600">
                National Institute of Steel Detailing
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                <span className="text-xl font-bold text-blue-700">AWS</span>
              </div>
              <span className="mt-2 text-sm text-gray-600">
                American Welding Society
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                <span className="text-xl font-bold text-blue-700">OSHA</span>
              </div>
              <span className="mt-2 text-sm text-gray-600">
                Occupational Safety and Health Administration
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Gallery */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Project Photos
          </h2>
          <ProjectPhotosGallery />
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeIn}
      >
        <ContactSection />
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

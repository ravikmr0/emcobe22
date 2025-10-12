import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Building, Users } from "lucide-react";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filters = [
    "All",
    "Cherokee Federal",
    "SUNDT Construction",
    "Mortenson Construction",
    "Willmeng Construction",
  ];

  const projects = [
    {
      id: 1,
      title: "Yuma PHS Clinic – Yuma County Health Department",
      category: "Mortenson Construction",
      location: "Yuma, Arizona",
      // year: "2023",
      description:
        " We provided complete structural and miscellaneous steel detailing services for the Yuma PHS Clinic—an essential public health facility serving the Yuma County community. This project supports a broad range of health services, requiring precision coordination and compliance with healthcare construction standards.",
      image:
        "/images/3d-images/yuma.png",
      stats: {
        // area: "2.5M sq ft",
        // steel: "15,000 tons",
        // duration: "18 months",
      },
      tags: [" MEP and architectural disciplines", "Miscellaneous steel detailing ", "BIM model coordination "],
    },
    {
      id: 2,
      title: "Embry-Riddle Aeronautical University – Prescott Campus",
      category: "SUNDT Construction",
      location: "Prescott, Arizona",
      // year: "2023",
      description:
        "We were honored to provide detailed steel drafting and BIM coordination services for Embry-Riddle Aeronautical University’s Prescott Campus—an institution known globally for aviation and aerospace excellence. This project involved delivering steel solutions that support the school’s commitment to cutting-edge education and innovation.",
      image:
        "/images/3d-images/embry-a1.png",
      stats: {
        // area: "800K sq ft",
        // steel: "8,500 tons",
        // duration: "12 months",
      },
      tags: ["Structural steel framing for educational facilities", "Miscellaneous steel detailing ", "Full 3D model coordination with clash detection"],
    },
    {
      id: 3,
      title: "BIA Chi Chil Tah Boarding School ",
      category: "Cherokee Federal",
      location: "831 Cousins Rd, Vanderwagen, New Mexico 87326",
      // year: "2022",
      description:
        "Our detailing team proudly supported the construction of the BIA Chi Chil Tah Boarding School, a vital educational facility for Native American students in rural New Mexico. This project demanded precision, cultural sensitivity, and efficient coordination with structural engineers and fabricators.",
      image:
        "/images/3d-images/bia-chi.png",
      stats: {
        // length: "1,200 ft",
        // steel: "12,000 tons",
        // duration: "24 months",
      },
      tags: ["Full structural steel detailing", "Miscellaneous steel including stairs", "3D BIM coordination and model integration"],
    },
    {
      id: 4,
      title: "Phoenix Zoo – Veterinary Medical Center",
      category: "SUNDT Construction",
      location: "455 N. Galvin Parkway, Phoenix, AZ 85008",
      // year: "2022",
      description:
        " We provided precision steel detailing for the Veterinary Medical Center at the Phoenix Zoo—a state-of-the-art facility designed to support animal care, research, and wildlife conservation. As part of one of the most visited non-profit zoos in the U.S., this project demanded a high standard of accuracy, coordination, and technical understanding.",
      image:
        "/images/3d-images/phxzoo.png",
      stats: {
        // area: "1.8M sq ft",
        // steel: "9,200 tons",
        // duration: "15 months",
      },
      tags: ["Structural steel framing for the medical ", "Full 3D BIM modeling and clash coordination", "Comprehensive shop "],
    },
    {
      id: 5,
      title: "Santa Rosa Ranch Community School",
      category: "Cherokee Federal",
      location: "Indian Route 35, Sells, AZ 85634",
      // year: "2021",
      description:
        "Our team proudly contributed steel detailing services for the Santa Rosa Ranch Community School—an important educational facility serving students in the Tohono O’odham Nation. This culturally significant project required precise coordination and an understanding of community-driven construction priorities.",
      image:
        "/images/3d-images/santa.png",
      stats: {
        // area: "500K sq ft",
        // steel: "18,000 tons",
        // duration: "30 months",
      },
      tags: ["Structural Steel Detailing ", "Educational Buildings", "BIM coordination and clash detection"],
    },
    {
      id: 6,
      title: "Gateway Interchange Business Park",
      category: "Willmeng Construction",
      location: "8341 E. Sebring Ave, Mesa, AZ",
      // year: "2021",
      description:
        "We were proud to provide precision steel detailing services for Gateway Interchange Business Park, a modern industrial and commercial hub strategically located in the fast-growing Mesa Gateway area. This development was designed for flexibility, performance, and long-term business growth.",
      image:
        "/images/3d-images/gateway.jpg",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural steel framing for tilt-up buildings", "Miscellaneous steel elements", "BIM coordination with clash detection"],
    },
    {
      id: 7,
      title: "Uptown MR2 Hotel – Tempo by Hilton",
      category: "Willmeng Construction",
      location: "7401 N La Cholla Blvd, Pima County, AZ 85741",
      // year: "2021",
      description:
        "We were proud to deliver comprehensive steel detailing services for the Uptown MR2 Hotel—an upscale Tempo by Hilton project designed for modern travelers. This hospitality development by Uptown Lodging, LLC blends comfort and sophistication with structural efficiency.",
      image:
        "/images/3d-images/tempo.png",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural steel framing for hotel guest floors", "•	Miscellaneous steel: stair towers, railings", "BIM coordination for seamless integration "],
    },
    {
      id: 8,
      title: "Tucson Rehabilitation Hospital",
      category: "MYCON",
      location: "870 E Tucson Marketplace Blvd, Tucson, AZ 85713",
      // year: "2021",
      description:
       "We proudly provided full-service steel detailing & connection design for the Tucson Rehabilitation Hospital—a modern, inpatient facility designed to support physical therapy, recovery, and long-term patient care. This healthcare project required a high degree of precision and compliance with stringent medical construction standards.",
      image:
        "/images/3d-images/tucson.png",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural steel framing for tilt-up buildings", "Comprehensive shop and erection drawings ", "BIM coordination with clash detection"],
    },
    {
      id: 9,
      title: "Shamrock Foods Distribution Facility",
      category: "Willmeng Construction",
      location: "Marana, Arizona 85653",
      // year: "2021",
      description:
      "We provided detailed structural and miscellaneous steel services for Shamrock Foods’ state-of-the-art distribution facility in Marana, AZ—supporting one of the largest foodservice providers in the western United States.",
      image:
        "/images/3d-images/shamrock.png",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural steel framing for tilt-up buildings", "Miscellaneous steel elements", "BIM coordination with clash detection"],
    },
    {
      id: 10,
      title: "Heritage Academy – Maricopa Campus",
      category: "Willmeng Construction",
      location: "Maricopa, AZ 85138",
      // year: "2021",
      description:
        "We proudly provided complete steel detailing services for the Heritage Academy campus in Maricopa, AZ—an inspiring educational facility designed to serve the growing student population in this fast-developing area.",
      image:
        "/images/3d-images/heritage.png",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural steel framing for academic", "Multi-Purpose Buildings", "Miscellaneous steel elements", "Full BIM coordination with clash detection"],
    },
    {
      id: 11,
      title: "DICK'S Sporting Goods – Glendale, AZ",
      category: "VCC Construction",
      location: "Glendale, Arizona 85305",
      // year: "2021",
      description:
        "We provided full-service steel detailing for the DICK'S Sporting Goods retail location in Glendale, AZ—supporting the creation of a modern, large-format sporting goods store built for performance and durability.",
      image:
        "/images/3d-images/dicks.png",
      stats: {
        // floors: "45 floors",
        // steel: "6,800 tons",
        // duration: "20 months",
      },
      tags: ["Structural Steel Framing", "Miscellaneous Steel", "3D model coordination (BIM)", "Full BIM coordination with clash detection"],
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Project Portfolio
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our diverse range of successfully completed steel
              detailing projects across various industries and scales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin size={16} className="mr-1" />
                      {project.location}
                      <Calendar size={16} className="ml-4 mr-1" />
                      {project.year}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-2 rounded">
                          <div className="text-xs text-gray-500 uppercase">
                            {key}
                          </div>
                          <div className="text-sm font-semibold text-gray-800">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Project Statistics
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our track record speaks for itself with successful project
              deliveries across multiple sectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Building size={32} />,
                number: "100+",
                label: "Projects Completed",
              },
              {
                icon: <Users size={32} />,
                number: "95+",
                label: "Happy Clients",
              },
              {
                icon: <MapPin size={32} />,
                number: "6+",
                label: "Countries Served",
              },
              {
                icon: <Calendar size={32} />,
                number: "5+",
                label: "Years Experience",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="flex justify-center mb-4 text-blue-200">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you bring your steel construction project to life with
              our expert detailing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.emcobe.net/contact" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Start Your Project
                </Button>
              </a>
              <a href="#">
                <Button variant="outline" className="px-8 py-3">
                  View More Projects
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;

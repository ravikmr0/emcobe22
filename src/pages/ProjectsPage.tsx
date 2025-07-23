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
    "Commercial",
    "Industrial",
    "Infrastructure",
    "Residential",
  ];

  const projects = [
    {
      id: 1,
      title: "Metropolitan Office Complex",
      category: "Commercial",
      location: "New York, USA",
      year: "2023",
      description:
        "A 40-story office complex featuring advanced steel framework and innovative architectural design.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      stats: {
        area: "2.5M sq ft",
        steel: "15,000 tons",
        duration: "18 months",
      },
      tags: ["BIM Modeling", "3D Modeling", "Shop Drawings"],
    },
    {
      id: 2,
      title: "Industrial Manufacturing Plant",
      category: "Industrial",
      location: "Detroit, USA",
      year: "2023",
      description:
        "Large-scale manufacturing facility with complex steel structures and specialized equipment foundations.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
      stats: {
        area: "800K sq ft",
        steel: "8,500 tons",
        duration: "12 months",
      },
      tags: ["Fabrication Drawings", "CNC Integration", "Erection Drawings"],
    },
    {
      id: 3,
      title: "Highway Bridge Construction",
      category: "Infrastructure",
      location: "California, USA",
      year: "2022",
      description:
        "Multi-span highway bridge with innovative steel design and seismic resistance features.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      stats: {
        length: "1,200 ft",
        steel: "12,000 tons",
        duration: "24 months",
      },
      tags: ["Structural Analysis", "3D Modeling", "General Arrangement"],
    },
    {
      id: 4,
      title: "Shopping Mall Complex",
      category: "Commercial",
      location: "Texas, USA",
      year: "2022",
      description:
        "Large retail complex with intricate steel framework supporting expansive open spaces.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      stats: {
        area: "1.8M sq ft",
        steel: "9,200 tons",
        duration: "15 months",
      },
      tags: ["BIM Coordination", "Shop Drawings", "Material Lists"],
    },
    {
      id: 5,
      title: "Power Plant Infrastructure",
      category: "Industrial",
      location: "Ohio, USA",
      year: "2021",
      description:
        "Critical infrastructure project requiring precision steel detailing for power generation equipment.",
      image:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
      stats: {
        area: "500K sq ft",
        steel: "18,000 tons",
        duration: "30 months",
      },
      tags: ["Precision Detailing", "Quality Control", "Technical Drawings"],
    },
    {
      id: 6,
      title: "Residential High-Rise",
      category: "Residential",
      location: "Florida, USA",
      year: "2021",
      description:
        "Luxury residential tower with complex steel framework and architectural steel elements.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      stats: {
        floors: "45 floors",
        steel: "6,800 tons",
        duration: "20 months",
      },
      tags: ["Architectural Steel", "3D Visualization", "Coordination"],
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

      {/* Stats Section */}
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
                number: "500+",
                label: "Projects Completed",
              },
              {
                icon: <Users size={32} />,
                number: "200+",
                label: "Happy Clients",
              },
              {
                icon: <MapPin size={32} />,
                number: "25+",
                label: "Countries Served",
              },
              {
                icon: <Calendar size={32} />,
                number: "15+",
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
      </section>

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
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Your Project
              </Button>
              <Button variant="outline" className="px-8 py-3">
                View More Projects
              </Button>
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

import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Box,
  Building2,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  Hammer,
  Cog,
  Factory,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ServicesPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: <Box size={32} />,
      title: "3D Modeling",
      description:
        "Comprehensive 3D structural models with precise detailing for accurate visualization and planning.",
      features: [
        "Detailed 3D structural models",
        "Clash detection and resolution",
        "Visualization and walkthroughs",
        "Integration with BIM workflows",
      ],
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      icon: <Building2 size={32} />,
      title: "BIM Modeling",
      description:
        "Building Information Modeling services that enhance coordination and reduce conflicts in construction.",
      features: [
        "4D and 5D BIM implementation",
        "Multi-disciplinary coordination",
        "Clash detection and resolution",
        "BIM execution planning",
      ],
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    },
    {
      icon: <FileSpreadsheet size={32} />,
      title: "Advanced Bill of Material",
      description:
        "Detailed material lists with accurate quantities, specifications, and cost estimations.",
      features: [
        "Accurate quantity takeoffs",
        "Material specifications",
        "Cost estimation support",
        "Procurement assistance",
      ],
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    },
    {
      icon: <FileText size={32} />,
      title: "Shop Drawings",
      description:
        "Precise fabrication drawings with detailed dimensions and specifications for manufacturing.",
      features: [
        "Detailed fabrication drawings",
        "Assembly instructions",
        "Material specifications",
        "Quality control checklists",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1661340695541-ee1ca7efedd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      icon: <LayoutGrid size={32} />,
      title: "General Arrangement Drawings",
      description:
        "Comprehensive layout plans showing the arrangement and positioning of structural elements.",
      features: [
        "Overall structural layout",
        "Element positioning",
        "Dimensional coordination",
        "Reference drawings",
      ],
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    },
    {
      icon: <Hammer size={32} />,
      title: "Miscellaneous Steel Detailing",
      description:
        "Specialized drawings for miscellaneous steel components and erection guidance.",
      features: [
        "Handrails and guardrails",
        "Stairs and platforms",
        "Architectural steel elements",
        "Custom fabrications",
      ],
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      icon: <Cog size={32} />,
      title: "CNC/FABTROL/KISS Integration",
      description:
        "Seamless integration with fabrication software for optimized production workflows.",
      features: [
        "CNC programming support",
        "FABTROL integration",
        "KISS system compatibility",
        "Production optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
    },
    {
      icon: <Factory size={32} />,
      title: "Fabrication Drawings",
      description:
        "Detailed drawings for fabrication with precise measurements and assembly instructions.",
      features: [
        "Piece mark drawings",
        "Assembly sequences",
        "Welding details",
        "Quality specifications",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Project Analysis",
      description:
        "We analyze your project requirements and structural drawings to understand the scope and complexity.",
    },
    {
      step: "02",
      title: "3D Modeling",
      description:
        "Our engineers create detailed 3D models using industry-leading software like Tekla Structures.",
    },
    {
      step: "03",
      title: "Drawing Production",
      description:
        "We produce comprehensive shop drawings, fabrication drawings, and erection drawings.",
    },
    {
      step: "04",
      title: "Quality Review",
      description:
        "All drawings undergo rigorous quality checks and reviews before delivery to ensure accuracy.",
    },
    {
      step: "05",
      title: "Delivery & Support",
      description:
        "We deliver the final drawings and provide ongoing support throughout the fabrication process.",
    },
  ];

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
              Our Steel Detailing Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Comprehensive steel detailing solutions powered by cutting-edge
              technology and delivered by experienced professionals.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Complete Steel Detailing Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From initial 3D modeling to final fabrication drawings, we provide
              end-to-end steel detailing services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="text-blue-600 mr-3">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle
                                size={16}
                                className="text-green-500 mr-2 flex-shrink-0"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative h-48 md:h-full">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-r-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to steel detailing that ensures accuracy,
              efficiency, and quality in every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight
                    className="hidden md:block absolute top-8 -right-3 text-gray-400"
                    size={20}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your steel detailing requirements and
              get a customized solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Request Quote
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                View Portfolio
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

export default ServicesPage;

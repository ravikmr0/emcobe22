import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Box,
  Building2,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  Hammer,
  Cog,
  Factory,
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description = "" }: ServiceCardProps) => {
  return (
    <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center p-6 text-center h-full">
        <div className="mb-4 text-blue-600 p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      icon: <Box size={24} />,
      title: "3D Modeling",
      description:
        "Comprehensive 3D structural models with precise detailing for accurate visualization and planning.",
    },
    {
      icon: <Building2 size={24} />,
      title: "BIM Modeling",
      description:
        "Building Information Modeling services that enhance coordination and reduce conflicts in construction.",
    },
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Advance Bill of Material",
      description:
        "Detailed material lists with accurate quantities, specifications, and cost estimations.",
    },
    {
      icon: <FileText size={24} />,
      title: "Shop Drawings",
      description:
        "Precise fabrication drawings with detailed dimensions and specifications for manufacturing.",
    },
    {
      icon: <LayoutGrid size={24} />,
      title: "General Arrangement Drawings",
      description:
        "Comprehensive layout plans showing the arrangement and positioning of structural elements.",
    },
    {
      icon: <Hammer size={24} />,
      title: "Miscellaneous Erection & Shop Drawings",
      description:
        "Specialized drawings for miscellaneous steel components and erection guidance.",
    },
    {
      icon: <Cog size={24} />,
      title: "CNC/FABTROL/KISS Integration",
      description:
        "Seamless integration with fabrication software for optimized production workflows.",
    },
    {
      icon: <Factory size={24} />,
      title: "Fabrication Drawings",
      description:
        "Detailed drawings for fabrication with precise measurements and assembly instructions.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-gray-50" id="services">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Services We Offer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive steel detailing solutions using
            cutting-edge technology and industry best practices.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;

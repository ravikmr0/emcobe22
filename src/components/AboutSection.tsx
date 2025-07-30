import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

interface AboutSectionProps {
  title?: string;
  description?: string;
  expertise?: string[];
  values?: Array<{ title: string; description: string }>;
}

const AboutSection = ({
  title = "Who We Are",
  description = "At Emcobe Engineering & Consultants, we specialize in delivering precise, high-quality steel detailing solutions for the industrial and commercial sectors. Backed by deep expertise and years of experience, we are committed to excellence in every project we undertake.",
  expertise = ["Tekla Structures", "SDS/2", "•	Structural & Miscellaneous Steel Detailing", "•	3D Modeling & BIM Integration", "Connection Design & Shop Drawings", "Standards Compliance & Quality Assurance", "Project Management & Coordination"],
  values = [
    {
      title: "Coordination",
      description:
        "We ensure seamless coordination across all project stakeholders.",
    },
    {
      title: "Deadlines",
      description:
        "We are committed to meeting project timelines without compromising quality.",
    },
    {
      title: "Trade-neutralization",
      description:
        "Our solutions integrate smoothly with all related trades and systems.",
    },
  ],
}: AboutSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Expertise
            </h3>
            <p className="text-gray-600 mb-4">
              We leverage industry-leading technologies to deliver precise and
              efficient steel detailing solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              {expertise.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-blue-50 p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Approach
            </h3>
            <p className="text-gray-600 mb-4">
              We combine technical expertise with a commitment to quality and
              client satisfaction.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Precision in every detail</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Industry-standard compliance</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Innovative solutions</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-blue-700 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Users, Award, Target, Globe } from "lucide-react";

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { icon: <Users size={32} />, number: "50+", label: "Expert Engineers" },
    { icon: <Award size={32} />, number: "100+", label: "Projects Completed" },
    { icon: <Target size={32} />, number: "5+", label: "Years Experience" },
    { icon: <Globe size={32} />, number: "15+", label: "Countries Served" },
  ];

  const values = [
    {
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in all our steel detailing projects, ensuring precision and accuracy in every drawing.",
      icon: "🎯",
    },
    {
      title: "Innovation",
      description:
        "We leverage cutting-edge technology and software to deliver innovative solutions that meet modern construction demands.",
      icon: "💡",
    },
    {
      title: "Client Focus",
      description:
        "Our client-centric approach ensures that we understand and exceed expectations while maintaining strong partnerships.",
      icon: "🤝",
    },
    {
      title: "Timely Delivery",
      description:
        "We are committed to meeting project deadlines without compromising on quality, ensuring your projects stay on schedule.",
      icon: "⏰",
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
              About EMCOBE Engineering & Consultants
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Leading the industry in steel detailing and structural engineering
              solutions with precision, innovation, and unwavering commitment to
              excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to revolutionize the steel detailing
                industry, EMCOBE Engineering & Consultants has grown from a
                small team of passionate engineers to a globally recognized
                leader in structural steel detailing services.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a simple belief: that precision in steel
                detailing is not just about technical accuracy, but about
                building the foundation for safer, stronger, and more efficient
                structures that stand the test of time.
              </p>
              <p className="text-gray-600">
                Today, we serve clients across multiple continents, delivering
                comprehensive steel detailing solutions that combine traditional
                engineering excellence with cutting-edge technology and
                innovative methodologies. 
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/about.webp"
                alt="Steel construction site"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4 text-blue-200">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our
              commitment to excellence in steel detailing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
        </motion.div>  
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;

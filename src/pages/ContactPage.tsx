import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { Card, CardContent } from "../components/ui/card";
import { Mail, Phone, MapPin, Clock, Globe, Users } from "lucide-react";

const ContactPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "mail@emcobe.net",
      action: "mailto:mail@emcobe.net",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      description: "Speak directly with our team during business hours",
      contact: "+91 7982864577",
      action: "tel:+917982864577",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      description: "Come to our office for an in-person consultation",
      contact: "5th Floor, Logix Technova, Block-C, Delhi, India",
      action: "#",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const globalOffices = [
    {
      city: "New Delhi",
      country: "India",
      address: "5th Floor, Logix Technova, Block-C",
      phone: "+91 7982864577",
      email: "delhi@emcobe.net",
    },
    {
      city: "New York",
      country: "USA",
      address: "123 Steel Avenue, Manhattan",
      phone: "+1 (555) 123-4567",
      email: "usa@emcobe.net",
    },
    {
      city: "London",
      country: "UK",
      address: "45 Engineering Street, London",
      phone: "+44 20 1234 5678",
      email: "uk@emcobe.net",
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
              Get In Touch With Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to discuss your steel detailing project? Our team of experts
              is here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              How to Reach Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {method.description}
                    </p>
                    <a
                      href={method.action}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      {/* Office Hours & Global Offices */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Office Hours */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Clock className="text-blue-600 mr-3" size={24} />
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="font-medium text-gray-700">
                          {schedule.day}
                        </span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Emergency Support:</strong> Available 24/7 for
                      critical project issues.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Global Offices */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Globe className="text-blue-600 mr-3" size={24} />
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Global Offices
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {globalOffices.map((office, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-gray-200 last:border-b-0"
                      >
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {office.city}, {office.country}
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-start">
                            <MapPin
                              size={14}
                              className="mr-2 mt-0.5 flex-shrink-0"
                            />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={14} className="mr-2 flex-shrink-0" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail size={14} className="mr-2 flex-shrink-0" />
                            <span>{office.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services and
              processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is your typical project turnaround time?",
                answer:
                  "Project timelines vary based on complexity and scope. Simple projects can be completed in 1-2 weeks, while complex industrial projects may take 2-3 months. We provide detailed timelines during the initial consultation.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "Yes, we serve clients globally with offices in India, USA, and UK. We're experienced in working across different time zones and international building standards.",
              },
              {
                question: "What software do you use for steel detailing?",
                answer:
                  "We primarily use Tekla Structures and SDS/2 for steel detailing, along with AutoCAD and other industry-standard software for specialized requirements.",
              },
              {
                question: "Can you handle rush projects?",
                answer:
                  "Yes, we offer expedited services for urgent projects. Rush projects may incur additional fees, but we're committed to meeting your critical deadlines.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;

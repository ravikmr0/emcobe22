import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    }, 3000);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: "Email Address",
      details: "mail@emcobe.net",
      action: "mailto:mail@emcobe.net",
    },
    {
      icon: <Phone size={20} />,
      title: "Phone Number",
      details: "+91  7500186008",
      action: "tel:+917500186008",
    },
    {
      icon: <MapPin size={20} />,
      title: "Office Location",
      details: "EMCOBE, 84, Chandpur Kalan, Dist-Mathura U.P, India",
      action: "#",
    },
    {
      icon: <Clock size={20} />,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      action: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Start Your Project
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Ready to bring your steel detailing vision to life? Get in touch
              with our expert team for a personalized consultation and detailed
              project quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                      <Send className="mr-3 text-blue-600" size={24} />
                      Project Inquiry Form
                    </CardTitle>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within
                      24 hours with a detailed response.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <CheckCircle
                          className="mx-auto text-green-500 mb-4"
                          size={64}
                        />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          Thank You!
                        </h3>
                        <p className="text-gray-600">
                          Your message has been sent successfully. We'll contact
                          you soon.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="Enter Your First Name"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              required
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Enter Your Last Name"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              required
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter Your Email Address"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              required
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Enter Your Phone Number"
                              value={formData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your Company Name"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Project Details */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="projectType">Project Type *</Label>
                            <Select
                              value={formData.projectType}
                              onValueChange={(value) =>
                                handleInputChange("projectType", value)
                              }
                            >
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="steel-detailing">
                                  Steel Detailing
                                </SelectItem>
                                <SelectItem value="3d-modeling">
                                  3D Modeling
                                </SelectItem>
                                <SelectItem value="bim-modeling">
                                  BIM Modeling
                                </SelectItem>
                                <SelectItem value="shop-drawings">
                                  Shop Drawings
                                </SelectItem>
                                <SelectItem value="structural-engineering">
                                  Structural Engineering
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div> */}
                          {/*  */}
                          {/* <div className="space-y-2">
                            <Label htmlFor="budget">Project Budget</Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) =>
                                handleInputChange("budget", value)
                              }
                            >
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-10k">
                                  Under $10,000
                                </SelectItem>
                                <SelectItem value="10k-25k">
                                  $10,000 - $25,000
                                </SelectItem>
                                <SelectItem value="25k-50k">
                                  $25,000 - $50,000
                                </SelectItem>
                                <SelectItem value="50k-100k">
                                  $50,000 - $100,000
                                </SelectItem>
                                <SelectItem value="over-100k">
                                  Over $100,000
                                </SelectItem>
                                <SelectItem value="discuss">
                                  Prefer to Discuss
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div> */}
                        {/* </div> */}
                        {/*  */}

                        {/* <div className="space-y-2">
                          <Label htmlFor="timeline">Project Timeline</Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) =>
                              handleInputChange("timeline", value)
                            }
                          >
                            <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-2-weeks">
                                1-2 Weeks
                              </SelectItem>
                              <SelectItem value="1-month">1 Month</SelectItem>
                              <SelectItem value="2-3-months">
                                2-3 Months
                              </SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div> */}

                        <div className="space-y-2">
                          <Label htmlFor="message">Project Details *</Label>
                          <Textarea
                            id="message"
                            placeholder="Please describe your project requirements, specifications, and any additional details that would help us understand your needs better..."
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            required
                            rows={6}
                            className="focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Sending Message...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Send className="mr-2" size={20} />
                              Send Message
                            </div>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      Contact Information
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      Get in touch with us directly through any of these
                      channels.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-blue-600 mt-1">{info.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {info.title}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            {info.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg bg-blue-50">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-800 mb-3">
                      Why Choose EMCOBE?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle
                          className="text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        7+ Years of Industry Experience
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className="text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        Global Client Base &amp; 24/7 Support
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className="text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        Advanced Technology &amp; Software
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          className="text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        Competitive Pricing &amp; Fast Delivery
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-gray-800 mb-2">
                      Need Immediate Assistance?
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Call us directly for urgent project requirements.
                    </p>
                     <a href="tel:+917500186008">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Phone className="mr-2" size={16} />
                          Call Now
                        </Button>
                      </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  location: string;
  projectType: string;
  completionDate: string;
  rating: number;
  testimonial: string;
  projectValue: string;
  avatar: string;
  companyLogo?: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Rodriguez",
      position: "Project Manager",
      company: "Phoenix Construction Group",
      location: "Phoenix, Arizona",
      projectType: "Commercial Complex",
      completionDate: "March 2024",
      rating: 5,
      testimonial:
        "EMCOBE's attention to detail and precision in steel detailing exceeded our expectations. Their 3D modeling capabilities helped us identify potential issues early, saving both time and costs. The team's professionalism and commitment to deadlines made our project a complete success.",
      projectValue: "$2.8M",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "Senior Architect",
      company: "Desert Design Associates",
      location: "Tucson, Arizona",
      projectType: "Healthcare Facility",
      completionDate: "January 2024",
      rating: 5,
      testimonial:
        "Working with EMCOBE was a game-changer for our healthcare facility project. Their BIM integration and coordination capabilities streamlined our entire workflow. The quality of their shop drawings and technical documentation was exceptional, making fabrication seamless.",
      projectValue: "$4.2M",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 3,
      name: "David Thompson",
      position: "Construction Director",
      company: "Southwest Steel Solutions",
      location: "Albuquerque, New Mexico",
      projectType: "Educational Complex",
      completionDate: "November 2023",
      rating: 5,
      testimonial:
        "EMCOBE's expertise in structural steel detailing is unmatched. Their team delivered precise drawings and maintained excellent communication throughout the project. The connection designs were innovative and cost-effective, contributing significantly to our project's success.",
      projectValue: "$3.5M",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: 4,
      name: "Jennifer Martinez",
      position: "Engineering Manager",
      company: "Rocky Mountain Engineering",
      location: "Denver, Colorado",
      projectType: "Industrial Facility",
      completionDate: "September 2023",
      rating: 5,
      testimonial:
        "The level of technical expertise and project coordination provided by EMCOBE was outstanding. Their ability to work with complex geometries and deliver accurate fabrication drawings on tight schedules made them an invaluable partner for our industrial project.",
      projectValue: "$5.1M",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Quote className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Client Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our precision steel detailing and engineering expertise
            has helped clients achieve exceptional results across diverse
            projects
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Client Info */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                      <div className="relative inline-block mb-6">
                        <div className="w-24 h-24 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg">
                          <img
                            src={testimonials[currentIndex].avatar}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                          <Building2 className="h-4 w-4" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-1">
                        {testimonials[currentIndex].position}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {testimonials[currentIndex].company}
                      </p>

                      <div className="flex justify-center lg:justify-start mb-4">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>

                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-center lg:justify-start">
                          <MapPin className="h-4 w-4 mr-2" />
                          {testimonials[currentIndex].location}
                        </div>
                        <div className="flex items-center justify-center lg:justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          {testimonials[currentIndex].completionDate}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Quote className="absolute -top-4 -left-4 h-12 w-12 text-blue-200 transform rotate-180" />
                        <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 relative z-10">
                          "{testimonials[currentIndex].testimonial}"
                        </blockquote>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            Project Type
                          </h4>
                          <p className="text-blue-600">
                            {testimonials[currentIndex].projectType}
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            Project Value
                          </h4>
                          <p className="text-green-600 font-bold">
                            {testimonials[currentIndex].projectValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={prevTestimonial}
            className="rounded-full p-3 hover:bg-blue-50 border-blue-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={nextTestimonial}
            className="rounded-full p-3 hover:bg-blue-50 border-blue-200"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === currentIndex
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => goToTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    "{testimonial.testimonial.substring(0, 100)}..."
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.projectType}
                    </Badge>
                    <span className="text-xs text-green-600 font-semibold">
                      {testimonial.projectValue}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Start Your Success Story?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our satisfied clients and experience the precision and
            excellence that sets EMCOBE apart in steel detailing and
            engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
              onClick={() => (window.location.href = "/projects")}
            >
              View Our Projects
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

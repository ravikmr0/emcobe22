import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Award,
  Coffee,
  Heart,
  Zap,
} from "lucide-react";

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Steel Detailer",
      department: "Engineering",
      location: "Remote / On-site",
      type: "Full-time",
      experience: "5+ years",
      salary: "$70,000 - $90,000",
      description:
        "We are seeking an experienced Steel Detailer proficient in Tekla Structures to join our growing team. The ideal candidate will have extensive experience in commercial and industrial projects.",
      requirements: [
        "5+ years of steel detailing experience",
        "Proficiency in Tekla Structures",
        "Knowledge of AISC standards",
        "Experience with complex connections",
        "Strong attention to detail",
      ],
      benefits: [
        "Health Insurance",
        "401(k)",
        "Remote Work",
        "Professional Development",
      ],
    },
    {
      id: 2,
      title: "BIM Coordinator",
      department: "Technology",
      location: "Hybrid",
      type: "Full-time",
      experience: "3+ years",
      salary: "$60,000 - $80,000",
      description:
        "Join our team as a BIM Coordinator to manage and coordinate Building Information Modeling processes across multiple projects. Experience with clash detection and model coordination required.",
      requirements: [
        "3+ years of BIM experience",
        "Proficiency in Navisworks",
        "Experience with clash detection",
        "Knowledge of BIM standards",
        "Strong communication skills",
      ],
      benefits: [
        "Health Insurance",
        "Flexible Hours",
        "Training Budget",
        "Team Events",
      ],
    },
    {
      id: 3,
      title: "Junior Structural Engineer",
      department: "Engineering",
      location: "On-site",
      type: "Full-time",
      experience: "1-3 years",
      salary: "$55,000 - $70,000",
      description:
        "Opportunity for a Junior Structural Engineer to grow with our team. You'll work on diverse projects while receiving mentorship from senior engineers.",
      requirements: [
        "Bachelor's degree in Structural Engineering",
        "1-3 years of experience",
        "Knowledge of steel design principles",
        "Familiarity with design software",
        "EIT certification preferred",
      ],
      benefits: [
        "Mentorship Program",
        "Health Insurance",
        "Career Growth",
        "Continuing Education",
      ],
    },
    {
      id: 4,
      title: "CAD Technician",
      department: "Design",
      location: "Remote",
      type: "Part-time",
      experience: "2+ years",
      salary: "$25 - $35/hour",
      description:
        "We're looking for a skilled CAD Technician to support our drafting and design team. This is a great opportunity for someone looking for flexible, remote work.",
      requirements: [
        "2+ years of CAD experience",
        "Proficiency in AutoCAD",
        "Knowledge of steel construction",
        "Attention to detail",
        "Reliable internet connection",
      ],
      benefits: [
        "Flexible Schedule",
        "Remote Work",
        "Competitive Hourly Rate",
        "Project Bonuses",
      ],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, dental, and vision coverage for you and your family.",
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description:
        "Competitive salaries with performance-based bonuses and annual reviews.",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description:
        "Flexible working hours, remote work options, and generous PTO policy.",
    },
    {
      icon: Award,
      title: "Professional Growth",
      description:
        "Continuous learning opportunities, conference attendance, and certification support.",
    },
    {
      icon: Users,
      title: "Team Culture",
      description:
        "Collaborative environment with regular team events and open communication.",
    },
    {
      icon: Zap,
      title: "Cutting-Edge Technology",
      description:
        "Work with the latest software and technology in steel detailing and BIM.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Build your career with EMCOBE Engineering & Consultants. We're
              looking for talented professionals who share our passion for
              precision and excellence in steel detailing.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in creating an environment where our team members can
              thrive, grow, and make meaningful contributions to exciting
              projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
            <p className="text-gray-600">
              Explore our current job opportunities and find the perfect role
              for your career.
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{job.department}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 lg:flex-shrink-0">
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-700">{job.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined application process is designed to be efficient
              and transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Apply Online</h3>
              <p className="text-sm text-gray-600">
                Submit your application and resume through our online portal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Initial Review</h3>
              <p className="text-sm text-gray-600">
                Our HR team reviews your application and qualifications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Interview</h3>
              <p className="text-sm text-gray-600">
                Technical and cultural fit interviews with our team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Welcome Aboard</h3>
              <p className="text-sm text-gray-600">
                Join our team and start your journey with EMCOBE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't see a position that matches your skills? We're always looking
            for talented individuals to join our growing team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Send Your Resume
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact HR
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;

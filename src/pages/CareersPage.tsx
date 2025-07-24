import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Mail } from "lucide-react";

const CareersPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Careers at Emcobe
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-8">
                At Emcobe Engineering & Consultants, we believe our strength
                lies in our people. We're always looking for passionate,
                detail-driven professionals who are ready to grow, innovate, and
                make an impact in the world of steel detailing.
              </p>

              <p className="text-lg text-gray-700 mb-12">
                Whether you're an experienced detailer, a skilled modeler, or a
                recent graduate eager to learn, Emcobe offers a collaborative
                environment where your ideas are valued, and your growth is
                supported.
              </p>

              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Why Join Us?
              </h2>

              <ul className="space-y-4 mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">
                    Work on challenging and diverse projects across industrial
                    and commercial sectors
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">
                    Collaborate with experienced teams using cutting-edge tools
                    and technologies
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">
                    Continuous learning, skill development, and career
                    advancement opportunities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">
                    A culture that values integrity, precision, and teamwork
                  </span>
                </li>
              </ul>

              <div className="bg-blue-50 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Build your future with Emcobe.
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  If you're ready to take the next step in your career, we'd
                  love to hear from you.
                </p>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Send your resume to [your email]
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;

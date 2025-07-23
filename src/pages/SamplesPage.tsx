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
import { Download, Eye, FileText, Image } from "lucide-react";

const SamplesPage = () => {
  const sampleProjects = [
    {
      id: 1,
      title: "Commercial Office Building",
      category: "Steel Detailing",
      description:
        "Complete steel detailing for a 15-story commercial office building with complex connections and architectural features.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      files: [
        { name: "General Arrangement Drawings", type: "PDF", size: "2.4 MB" },
        { name: "Connection Details", type: "DWG", size: "1.8 MB" },
        { name: "3D Model Views", type: "PDF", size: "3.2 MB" },
      ],
      tags: ["Tekla Structures", "Complex Connections", "High-Rise"],
    },
    {
      id: 2,
      title: "Industrial Warehouse Facility",
      category: "BIM Modeling",
      description:
        "BIM modeling and coordination for a large industrial warehouse with crane systems and specialized equipment.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80",
      files: [
        { name: "BIM Model", type: "IFC", size: "15.6 MB" },
        { name: "Clash Detection Report", type: "PDF", size: "890 KB" },
        { name: "Shop Drawings", type: "PDF", size: "4.1 MB" },
      ],
      tags: ["BIM Coordination", "Industrial", "Crane Systems"],
    },
    {
      id: 3,
      title: "Bridge Structure Project",
      category: "3D Modeling",
      description:
        "Detailed 3D modeling and analysis for a steel bridge structure with complex geometry and load requirements.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      files: [
        { name: "3D Model", type: "3DS", size: "8.7 MB" },
        { name: "Structural Analysis", type: "PDF", size: "2.1 MB" },
        { name: "Fabrication Drawings", type: "DWG", size: "3.4 MB" },
      ],
      tags: ["Bridge Design", "Complex Geometry", "Structural Analysis"],
    },
    {
      id: 4,
      title: "Residential Complex",
      category: "Shop Drawings",
      description:
        "Comprehensive shop drawings for a multi-building residential complex with standardized connections.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      files: [
        { name: "Shop Drawings Set A", type: "PDF", size: "5.2 MB" },
        { name: "Shop Drawings Set B", type: "PDF", size: "4.8 MB" },
        { name: "Material List", type: "XLS", size: "245 KB" },
      ],
      tags: ["Residential", "Multi-Building", "Standardized"],
    },
    {
      id: 5,
      title: "Sports Arena Structure",
      category: "Connection Design",
      description:
        "Specialized connection design for a large sports arena with long-span trusses and unique architectural requirements.",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
      files: [
        { name: "Connection Calculations", type: "PDF", size: "1.9 MB" },
        { name: "Detail Drawings", type: "DWG", size: "2.7 MB" },
        { name: "Specification Sheet", type: "PDF", size: "680 KB" },
      ],
      tags: ["Long-Span", "Sports Facility", "Custom Connections"],
    },
    {
      id: 6,
      title: "Manufacturing Plant",
      category: "Steel Detailing",
      description:
        "Complete steel detailing for a manufacturing plant with heavy equipment foundations and specialized structures.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      files: [
        { name: "Foundation Details", type: "PDF", size: "3.1 MB" },
        { name: "Equipment Support Drawings", type: "DWG", size: "2.3 MB" },
        { name: "Erection Sequence", type: "PDF", size: "1.5 MB" },
      ],
      tags: ["Manufacturing", "Heavy Equipment", "Foundation Design"],
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
              Project Samples
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Explore our portfolio of completed projects showcasing our
              expertise in steel detailing, BIM modeling, and structural
              engineering across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Samples Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800"
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Files */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700">
                        Available Files:
                      </h4>
                      {project.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">{file.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <span className="text-xs">{file.size}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Similar Work Done?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experienced team can deliver high-quality steel detailing and
            engineering services tailored to your specific project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Request Quote
            </Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SamplesPage;

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
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Steel Detailing: BIM Integration and Automation",
      excerpt:
        "Explore how Building Information Modeling (BIM) is revolutionizing the steel detailing industry and what it means for project efficiency and accuracy.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
      author: "John Smith",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Technology",
      tags: ["BIM", "Automation", "Steel Detailing"],
    },
    {
      id: 2,
      title: "Best Practices for Connection Design in High-Rise Buildings",
      excerpt:
        "Learn about the critical considerations and best practices for designing steel connections in high-rise construction projects.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      author: "Sarah Johnson",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Engineering",
      tags: ["Connections", "High-Rise", "Design"],
    },
    {
      id: 3,
      title: "Tekla Structures vs SDS/2: A Comprehensive Comparison",
      excerpt:
        "An in-depth comparison of two leading steel detailing software platforms, helping you choose the right tool for your projects.",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80",
      author: "Mike Chen",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "Software",
      tags: ["Tekla", "SDS/2", "Comparison"],
    },
    {
      id: 4,
      title: "Quality Control in Steel Fabrication: Ensuring Precision",
      excerpt:
        "Discover the essential quality control measures that ensure accuracy and reliability in steel fabrication projects.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80",
      author: "David Wilson",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "Quality",
      tags: ["Quality Control", "Fabrication", "Standards"],
    },
    {
      id: 5,
      title: "Sustainable Steel Construction: Environmental Considerations",
      excerpt:
        "Explore how modern steel construction practices are becoming more environmentally friendly and sustainable.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      author: "Lisa Anderson",
      date: "2023-12-20",
      readTime: "7 min read",
      category: "Sustainability",
      tags: ["Sustainability", "Environment", "Green Building"],
    },
    {
      id: 6,
      title: "Common Challenges in Steel Detailing and How to Overcome Them",
      excerpt:
        "Identify the most common challenges faced in steel detailing projects and learn practical solutions to address them.",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
      author: "Robert Taylor",
      date: "2023-12-15",
      readTime: "11 min read",
      category: "Best Practices",
      tags: ["Challenges", "Solutions", "Project Management"],
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Engineering",
    "Software",
    "Quality",
    "Sustainability",
    "Best Practices",
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Engineering Insights Blog
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Stay updated with the latest trends, technologies, and best
              practices in steel detailing, structural engineering, and
              construction industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={
                  category === "All" ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-800"
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Read Time and CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest articles,
              industry insights, and engineering tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;

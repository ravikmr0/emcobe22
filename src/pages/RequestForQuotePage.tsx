import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CheckCircle, Clock, FileText, Users } from "lucide-react";

const RequestForQuotePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request For Quote
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get a detailed quote for your steel detailing and engineering
              projects. Our team will provide you with competitive pricing and
              timeline estimates.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <CardDescription>
                      Please provide as much detail as possible about your
                      project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" placeholder="Your Company" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select>
                        <SelectTrigger>
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
                          <SelectItem value="connection-design">
                            Connection Design
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectSize">Project Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">
                            Small (Under 100 tons)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium (100-500 tons)
                          </SelectItem>
                          <SelectItem value="large">
                            Large (500-1000 tons)
                          </SelectItem>
                          <SelectItem value="xl">
                            Extra Large (1000+ tons)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Required Timeline</Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 2 weeks, 1 month"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please describe your project requirements, specifications, and any special considerations..."
                        rows={5}
                      />
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit Quote Request
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Quick Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We typically respond to quote requests within 24 hours
                      during business days.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      What We Need
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Architectural drawings or plans
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Project specifications
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Timeline requirements
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Special requirements or constraints
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Expert Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our experienced engineers and detailers will review your
                      project and provide accurate pricing based on complexity
                      and requirements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RequestForQuotePage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPhoto {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
}

const ProjectPhotosGallery = () => {
  const [selectedImage, setSelectedImage] = useState<ProjectPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projectPhotos: ProjectPhoto[] = [
    {
      id: 1,
      title: "Santa Rosa Ranch Community School",
      category: "Commercial",
      location: "📍Indian Route 35, Sells, AZ 85634",
      image: "/images/3d-images/snap_005.png",
      description: " State-of-the-art educational facility with advanced steel structures and sustainable design features."
    },
    {
      id: 2,
      title: "Shamrock Foods Distribution Facility",
      category: "Industrial",
      location: "📍Marana, Arizona 85653",
      image: "/images/3d-images/shamrock.png",
      description: "We provided detailed structural and miscellaneous steel services for Shamrock Foods’ state-of-the-art distribution facility."
    },
    {
      id: 3,
      title: "Phoenix Zoo – Veterinary Medical Center",
      category: "Healthcare",
      location: "📍 455 N. Galvin Parkway, Phoenix, AZ 85008",
      image: "/images/3d-images/phxzoo.png",
      description: "We provided precision steel detailing for the Veterinary Medical Center at the Phoenix Zoo—a state-of-the-art facility designed. "
    },
    {
      id: 4,
      title: "Tucson Rehabilitation Hospital",
      category: "Healthcare",
      location: "📍870 E-Tucson Marketplace Blvd,Tucson,AZ 85713",
      image: "/images/3d-images/tucson-rehab-hospital.png",
      description: "We proudly provided full-service steel detailing & connection design for the Tucson Rehabilitation Hospital."
    },
    {
      id: 5,
      title: "Uptown MR2 Hotel – Tempo by Hilton",
      category: "Industrial",
      location: "📍7401 N La Cholla Blvd, Pima County, AZ 85741",
      image: "/images/3d-images/tempo.png",
      description: "We were proud to deliver comprehensive steel detailing services for the Uptown MR2 Hotel—an upscale Tempo by Hilton project designed for modern travelers."
    },
    {
      id: 6,
      title: "BIA Chi Chil Tah Boarding School",
      category: "Residential",
      location: "📍831 Cousins Rd, Vanderwagen, New Mexico 87326",
      image: "/images/3d-images/bia-chi.png",
      description: "Our detailing team proudly supported the construction of the BIA Chi Chil Tah Boarding School, a vital educational facility."
    },
    {
      id: 7,
      title: "Embry-Riddle Aeronautical University – Prescott Campus",
      category: "Educational",
      location: "📍Prescott, Arizona",
      image: "/images/3d-images/embry-a1.png",
      description: "We were honored to provide detailed steel drafting and BIM coordination services for Embry-Riddle Aeronautical University’s."
    },
    {
      id: 8,
      title: "Yuma PHS Clinic – Yuma County Health Department",
      category: "Infrastructure",
      location: "📍Yuma, Arizona",
      image: "/images/3d-images/yuma.png",
      description: "We provided complete structural and miscellaneous steel detailing services for the Yuma PHS Clinic—an essential public health."
    }
  ];

  const openLightbox = (photo: ProjectPhoto, index: number) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % projectPhotos.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(projectPhotos[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + projectPhotos.length) % projectPhotos.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(projectPhotos[prevIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projectPhotos.map((photo, index) => (
          <motion.div key={photo.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="relative">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-800 hover:bg-white"
                    onClick={() => openLightbox(photo, index)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {photo.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{photo.location}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {photo.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-white/10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {selectedImage.category}
                </Badge>
                <span className="text-sm opacity-75">{selectedImage.location}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-sm opacity-90">{selectedImage.description}</p>
              <div className="mt-3 text-xs opacity-75">
                {currentIndex + 1} of {projectPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectPhotosGallery;
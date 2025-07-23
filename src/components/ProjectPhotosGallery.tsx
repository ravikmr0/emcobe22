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
      title: "Metropolitan Office Complex",
      category: "Commercial",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "40-story office complex with advanced steel framework and innovative architectural design."
    },
    {
      id: 2,
      title: "Industrial Manufacturing Plant",
      category: "Industrial",
      location: "Detroit, USA",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
      description: "Large-scale manufacturing facility with complex steel structures and specialized equipment foundations."
    },
    {
      id: 3,
      title: "Highway Bridge Construction",
      category: "Infrastructure",
      location: "California, USA",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      description: "Multi-span highway bridge with innovative steel design and seismic resistance features."
    },
    {
      id: 4,
      title: "Shopping Mall Complex",
      category: "Commercial",
      location: "Texas, USA",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      description: "Large retail complex with intricate steel framework supporting expansive open spaces."
    },
    {
      id: 5,
      title: "Power Plant Infrastructure",
      category: "Industrial",
      location: "Ohio, USA",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
      description: "Critical infrastructure project requiring precision steel detailing for power generation equipment."
    },
    {
      id: 6,
      title: "Residential High-Rise",
      category: "Residential",
      location: "Florida, USA",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      description: "Luxury residential tower with complex steel framework and architectural steel elements."
    },
    {
      id: 7,
      title: "Sports Arena Structure",
      category: "Sports",
      location: "Arizona, USA",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
      description: "Large sports arena with long-span trusses and unique architectural requirements."
    },
    {
      id: 8,
      title: "Airport Terminal",
      category: "Infrastructure",
      location: "Denver, USA",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      description: "Modern airport terminal with complex steel roof structure and architectural features."
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
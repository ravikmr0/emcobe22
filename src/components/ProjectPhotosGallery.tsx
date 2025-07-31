import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPhoto {
  id: number;
  title: string;
  category: string;
  location: string;
  images: string[];
  description: string;
}

const ProjectPhotosGallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ photo: ProjectPhoto; imageIndex: number } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardImageIndexes, setCardImageIndexes] = useState<number[]>([]);

  // Check if image URL is valid
  const isValidImageUrl = (url: string) => {
    return url && url !== "/" && url !== "" && url.includes(".");
  };

  const projectPhotos: ProjectPhoto[] = [
    {
      id: 1,
      title: "Santa Rosa Ranch Community School",
      category: "Commercial",
      location: "���Indian Route 35, Sells, AZ 85634",
      images: [
        "/images/3d-images/snap_005.png",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
      ],
      description: "State-of-the-art educational facility with advanced steel structures and sustainable design features."
    },
    {
      id: 2,
      title: "Shamrock Foods Distribution Facility",
      category: "Industrial",
      location: "📍Marana, Arizona 85653",
      images: [
        "/images/3d-images/shamrock.png",
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&q=80"
      ],
      description: "We provided detailed structural and miscellaneous steel services for Shamrock Foods' state-of-the-art distribution facility."
    },
    {
      id: 3,
      title: "Phoenix Zoo – Veterinary Medical Center",
      category: "Healthcare",
      location: "📍 455 N. Galvin Parkway, Phoenix, AZ 85008",
      images: [
        "/images/3d-images/phxzoo.png",
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
        "https://images.unsplash.com/photo-1586773860418-d1f249b22234?w=800&q=80",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
      ],
      description: "We provided precision steel detailing for the Veterinary Medical Center at the Phoenix Zoo—a state-of-the-art facility designed."
    },
    {
      id: 4,
      title: "Tucson Rehabilitation Hospital",
      category: "Healthcare",
      location: "📍870 E-Tucson Marketplace Blvd,Tucson,AZ 85713",
      images: [
        "/images/3d-images/tucson-rehab-hospital.png",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
      ],
      description: "We proudly provided full-service steel detailing & connection design for the Tucson Rehabilitation Hospital."
    },
    {
      id: 5,
      title: "Uptown MR2 Hotel – Tempo by Hilton",
      category: "Hospitality",
      location: "📍7401 N La Cholla Blvd, Pima County, AZ 85741",
      images: [
        "/images/3d-images/tempo.png",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
      ],
      description: "We were proud to deliver comprehensive steel detailing services for the Uptown MR2 Hotel—an upscale Tempo by Hilton project."
    },
    {
      id: 6,
      title: "BIA Chi Chil Tah Boarding School",
      category: "Educational",
      location: "📍831 Cousins Rd, Vanderwagen, New Mexico 87326",
      images: [
        "/images/3d-images/bia-chi.png",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
      ],
      description: "Our detailing team proudly supported the construction of the BIA Chi Chil Tah Boarding School, a vital educational facility."
    },
    {
      id: 7,
      title: "Embry-Riddle Aeronautical University",
      category: "Educational",
      location: "📍Prescott, Arizona",
      images: [
        "/images/3d-images/embry-a1.png",
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
        "https://images.unsplash.com/photo-1581447109200-bf2769116351?w=800&q=80",
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80"
      ],
      description: "We were honored to provide detailed steel drafting and BIM coordination services for Embry-Riddle Aeronautical University."
    },
    {
      id: 8,
      title: "Yuma PHS Clinic",
      category: "Healthcare",
      location: "📍Yuma, Arizona",
      images: [
        "/images/3d-images/yuma.png",
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80"
      ],
      description: "We provided complete structural and miscellaneous steel detailing services for the Yuma PHS Clinic—an essential public health facility."
    }
  ];

  // Initialize card image indexes - start with second image (index 1)
  useEffect(() => {
    const initialIndexes = projectPhotos.map(photo =>
      photo.images.length > 1 ? 1 : 0
    );
    setCardImageIndexes(initialIndexes);
  }, []);

  // Auto-slide functionality for individual cards - only when hovered
  useEffect(() => {
    if (hoveredCard === null) return;

    const interval = setInterval(() => {
      setCardImageIndexes(prev => {
        const newIndexes = [...prev];
        const photo = projectPhotos[hoveredCard];
        if (photo && photo.images.length > 1) {
          // Find next valid image
          let nextIndex = (newIndexes[hoveredCard] + 1) % photo.images.length;
          while (!isValidImageUrl(photo.images[nextIndex]) && nextIndex !== newIndexes[hoveredCard]) {
            nextIndex = (nextIndex + 1) % photo.images.length;
          }
          newIndexes[hoveredCard] = nextIndex;
        }
        return newIndexes;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [hoveredCard]);

  const openLightbox = (photo: ProjectPhoto, imageIndex: number) => {
    setSelectedImage({ photo, imageIndex });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          if (selectedImage.photo.images.length > 1) {
            let prevIndex = (selectedImage.imageIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
            while (!isValidImageUrl(selectedImage.photo.images[prevIndex]) && prevIndex !== selectedImage.imageIndex) {
              prevIndex = (prevIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
            }
            setSelectedImage({ ...selectedImage, imageIndex: prevIndex });
          }
          break;
        case 'ArrowRight':
          if (selectedImage.photo.images.length > 1) {
            let nextIndex = (selectedImage.imageIndex + 1) % selectedImage.photo.images.length;
            while (!isValidImageUrl(selectedImage.photo.images[nextIndex]) && nextIndex !== selectedImage.imageIndex) {
              nextIndex = (nextIndex + 1) % selectedImage.photo.images.length;
            }
            setSelectedImage({ ...selectedImage, imageIndex: nextIndex });
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, isValidImageUrl]);

  // Row/Column arrangement - alternating layouts
  const getLayoutClass = (index: number) => {
    if (index % 4 === 0 || index % 4 === 3) {
      return "md:flex-row"; // Image left, content right
    } else {
      return "md:flex-row-reverse"; // Content left, image right
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.55, 1.4]
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <div className="space-y-16 px-4 md:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Project Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive portfolio of structural steel detailing and engineering projects
          </p>
        </motion.div>

        {/* Project Cards in Row/Column Format */}
        <motion.div
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectPhotos.map((photo, index) => {
            const photoIndex = index;
            const currentImageIndex = cardImageIndexes[photoIndex] ?? (photo.images.length > 1 ? 1 : 0);
            const currentImage = photo.images[currentImageIndex];
            const isValidImage = isValidImageUrl(currentImage);

            return (
              <motion.div
                key={photo.id}
                variants={cardVariants}
                className="group"
              >
                <Card
                  className={`
                    relative overflow-hidden transition-all duration-700 cursor-pointer
                    bg-gradient-to-br from-white via-gray-50/90 to-white/80
                    backdrop-blur-xl border-2 border-transparent
                    shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                    hover:border-gradient-to-r hover:from-blue-500/30 hover:via-purple-500/30 hover:to-cyan-500/30
                    before:absolute before:inset-0 before:rounded-lg
                    before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/10 before:to-cyan-500/10
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                    after:absolute after:inset-[1px] after:rounded-lg after:bg-white/90
                    hover:after:bg-gradient-to-br hover:after:from-white/95 hover:after:to-gray-50/90
                    ${index % 2 === 0 ? 'hover:translate-x-2' : 'hover:-translate-x-2'}
                    hover:scale-[1.02] transform-gpu
                  `}
                  style={{
                    background: `
                      linear-gradient(135deg,
                        rgba(255,255,255,0.95) 0%,
                        rgba(248,250,252,0.9) 50%,
                        rgba(255,255,255,0.85) 100%
                      )
                    `,
                    borderImage: hoveredCard === photoIndex
                      ? 'linear-gradient(45deg, rgba(59,130,246,0.5), rgba(168,85,247,0.5), rgba(6,182,212,0.5)) 1'
                      : 'none',
                  }}
                  onMouseEnter={() => setHoveredCard(photoIndex)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`flex flex-col ${getLayoutClass(index)} min-h-[400px] md:min-h-[500px]`}>
                    {/* Image Section with Advanced Borders */}
                    <div className="relative flex-1 md:w-1/2 overflow-hidden">
                      {/* Sophisticated Border Frame */}
                      <div className="absolute inset-2 border-2 border-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-lg pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Corner Accent Elements */}
                      <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-500/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-10"></div>
                      <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-purple-500/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 z-10"></div>
                      <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 z-10"></div>
                      <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-indigo-500/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400 z-10"></div>

                      {/* Fallback for invalid images */}
                      {!isValidImage && (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-gray-500 text-center">
                            <div className="text-4xl mb-2">🏗️</div>
                            <div className="text-sm">Image not available</div>
                          </div>
                        </div>
                      )}

                      <AnimatePresence mode="wait">
                        {isValidImage && (
                          <motion.div
                            key={`${photo.id}-${currentImageIndex}`}
                            className="relative w-full h-full"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                          >
                            <motion.img
                              src={currentImage}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              variants={imageVariants}
                              whileHover="hover"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Image Navigation Overlay */}
                      {photo.images.filter(img => isValidImageUrl(img)).length > 1 && hoveredCard === photoIndex && (
                        <motion.div
                          className="absolute inset-0 bg-black/20 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            size="lg"
                            className="bg-white/90 text-gray-800 hover:bg-white shadow-lg"
                            onClick={() => openLightbox(photo, currentImageIndex)}
                          >
                            <Eye className="h-5 w-5 mr-2" />
                            View Gallery ({photo.images.filter(img => isValidImageUrl(img)).length})
                          </Button>
                        </motion.div>
                      )}

                      {/* Thumbnail of first image */}
                      {isValidImageUrl(photo.images[0]) && photo.images.length > 1 && (
                        <motion.div
                          className="absolute bottom-4 left-4 w-16 h-12 rounded-lg overflow-hidden border-2 border-white/80 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          onClick={() => {
                            setCardImageIndexes(prev => {
                              const newIndexes = [...prev];
                              newIndexes[photoIndex] = 0;
                              return newIndexes;
                            });
                          }}
                        >
                          <img
                            src={photo.images[0]}
                            alt={`${photo.title} thumbnail`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <span className="text-white text-xs font-semibold">3D</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Image Counter */}
                      {photo.images.filter(img => isValidImageUrl(img)).length > 1 && (
                        <motion.div
                          className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentImageIndex + 1}/{photo.images.filter(img => isValidImageUrl(img)).length}
                        </motion.div>
                      )}

                      {/* Category Badge */}
                      <motion.div 
                        className="absolute top-4 left-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-white/90 text-gray-800 shadow-lg text-sm px-3 py-1"
                        >
                          {photo.category}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Content Section with Enhanced Design */}
                    <CardContent className="relative flex-1 md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white/95 via-gray-50/50 to-white/90">
                      {/* Decorative Background Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/5 via-pink-500/5 to-orange-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>

                      {/* Subtle Border Accent */}
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="relative z-10"
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                          {photo.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-6">
                          <span className="text-base">{photo.location}</span>
                        </div>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                          {photo.description}
                        </p>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          <Button
                            onClick={() => openLightbox(photo, currentImageIndex)}
                            className="
                              relative overflow-hidden px-8 py-4 text-lg font-semibold
                              bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700
                              hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700
                              text-white border-2 border-transparent
                              hover:border-white/20 shadow-2xl hover:shadow-blue-500/25
                              transition-all duration-500 rounded-xl
                              before:absolute before:inset-0 before:bg-gradient-to-r
                              before:from-white/0 before:via-white/10 before:to-white/0
                              before:translate-x-[-100%] hover:before:translate-x-[100%]
                              before:transition-transform before:duration-700
                              group/button
                            "
                          >
                            <span className="relative z-10 flex items-center">
                              View Project Details
                              <motion.div
                                animate={{ x: hoveredCard === photoIndex ? 5 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="h-5 w-5 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                              </motion.div>
                            </span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <Button
                size="lg"
                variant="ghost"
                className="absolute top-4 right-4 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              {selectedImage.photo.images.filter(img => isValidImageUrl(img)).length > 1 && (
                <>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                    onClick={() => {
                      let prevIndex = (selectedImage.imageIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
                      while (!isValidImageUrl(selectedImage.photo.images[prevIndex]) && prevIndex !== selectedImage.imageIndex) {
                        prevIndex = (prevIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
                      }
                      setSelectedImage({ ...selectedImage, imageIndex: prevIndex });
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                    onClick={() => {
                      let nextIndex = (selectedImage.imageIndex + 1) % selectedImage.photo.images.length;
                      while (!isValidImageUrl(selectedImage.photo.images[nextIndex]) && nextIndex !== selectedImage.imageIndex) {
                        nextIndex = (nextIndex + 1) % selectedImage.photo.images.length;
                      }
                      setSelectedImage({ ...selectedImage, imageIndex: nextIndex });
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center w-full h-full">
                {isValidImageUrl(selectedImage.photo.images[selectedImage.imageIndex]) ? (
                  <motion.img
                    key={`${selectedImage.photo.id}-${selectedImage.imageIndex}`}
                    src={selectedImage.photo.images[selectedImage.imageIndex]}
                    alt={selectedImage.photo.title}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="bg-gray-800 text-white p-8 rounded-lg">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏗️</div>
                      <div>Image not available</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Counter */}
              {selectedImage.photo.images.filter(img => isValidImageUrl(img)).length > 1 && (
                <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium">
                    {selectedImage.imageIndex + 1} / {selectedImage.photo.images.filter(img => isValidImageUrl(img)).length}
                  </span>
                </div>
              )}

              {/* Enhanced Info Panel */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border border-white/30">
                      {selectedImage.photo.category}
                    </Badge>
                    <span className="text-sm opacity-75">
                      {selectedImage.photo.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{selectedImage.photo.title}</h3>
                  <p className="text-base opacity-90 leading-relaxed max-w-3xl">
                    {selectedImage.photo.description}
                  </p>
                </div>
              </motion.div>

              {/* ESC hint */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 text-xs opacity-75">
                Press ESC or click outside to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectPhotosGallery;

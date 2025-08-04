import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
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

// Memoized project card component to prevent unnecessary re-renders
const ProjectCard = memo(
  ({
    photo,
    index,
    cardImageIndexes,
    hoveredCard,
    setHoveredCard,
    setCardImageIndexes,
    openLightbox,
    getLayoutClass,
    isValidImageUrl,
  }: {
    photo: ProjectPhoto;
    index: number;
    cardImageIndexes: number[];
    hoveredCard: number | null;
    setHoveredCard: (index: number | null) => void;
    setCardImageIndexes: React.Dispatch<React.SetStateAction<number[]>>;
    openLightbox: (photo: ProjectPhoto, imageIndex: number) => void;
    getLayoutClass: (index: number) => string;
    isValidImageUrl: (url: string) => boolean;
  }) => {
    const photoIndex = index;
    // Get current image index with proper fallback
    let currentImageIndex = cardImageIndexes[photoIndex];
    if (currentImageIndex === undefined) {
      // If not initialized yet, try second image first, then first
      if (photo.images.length > 1 && isValidImageUrl(photo.images[1])) {
        currentImageIndex = 1;
      } else {
        currentImageIndex = 0;
      }
    }
    const currentImage = photo.images[currentImageIndex];
    const isValidImage = isValidImageUrl(currentImage);

    const cardVariants = {
      hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.4, 0.55, 1.4],
        },
      },
    };

    const imageVariants = {
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div key={photo.id} variants={cardVariants} className="group">
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
          after:absolute after:inset-[1px] after:rounded-lg 
          hover:after:bg-gradient-to-br hover:after:from-white/95 
          ${index % 2 === 0 ? "hover:translate-x-2" : "hover:-translate-x-2"}
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
            borderImage:
              hoveredCard === photoIndex
                ? "linear-gradient(45deg, rgba(59,130,246,0.5), rgba(168,85,247,0.5), rgba(6,182,212,0.5)) 1"
                : "none",
          }}
          onMouseEnter={() => setHoveredCard(photoIndex)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`flex flex-col ${getLayoutClass(index)} min-h-[400px] md:min-h-[410px]`}
          >
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
                      decoding="async"
                      fetchPriority={index < 2 ? "high" : "low"}
                      variants={imageVariants}
                      whileHover="hover"
                      onError={(e) => {
                        // If image fails to load, try to show a different image
                        console.warn(`Failed to load image: ${currentImage}`);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Navigation Overlay */}
              {photo.images.filter((img) => isValidImageUrl(img)).length > 1 &&
                hoveredCard === photoIndex && (
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
                      View Gallery (
                      {
                        photo.images.filter((img) => isValidImageUrl(img))
                          .length
                      }
                      )
                    </Button>
                  </motion.div>
                )}

              {/* Thumbnail - always shows first image (3D rendering) */}
              {isValidImageUrl(photo.images[0]) &&
                photo.images.length > 1 &&
                currentImageIndex !== 0 && (
                  <motion.div
                    className="absolute bottom-4 left-4 w-20 h-16 rounded-lg overflow-hidden border-3 border-white shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 z-10 bg-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setCardImageIndexes((prev) => {
                        const newIndexes = [...prev];
                        newIndexes[photoIndex] = 0;
                        return newIndexes;
                      });
                    }}
                  >
                    <img
                      src={photo.images[0]}
                      alt={`${photo.title} 3D rendering`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded font-semibold">
                      3D
                    </div>
                  </motion.div>
                )}

              {/* Image Counter */}
              {photo.images.filter((img) => isValidImageUrl(img)).length >
                1 && (
                <motion.div
                  className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentImageIndex + 1}/
                  {photo.images.filter((img) => isValidImageUrl(img)).length}
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
  },
);

const ProjectPhotosGallery = () => {
  const [selectedImage, setSelectedImage] = useState<{
    photo: ProjectPhoto;
    imageIndex: number;
  } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardImageIndexes, setCardImageIndexes] = useState<number[]>([]);

  // Memoized function to check if image URL is valid
  const isValidImageUrl = useCallback((url: string) => {
    return url && url !== "/" && url !== "" && url.includes(".");
  }, []);

  // Memoized project photos data to prevent recreation on every render
  const projectPhotos: ProjectPhoto[] = useMemo(
    () => [
      {
        id: 1,
        title: "Santa Rosa Ranch Community School",
        category: "Commercial",
        location: "📍Indian Route 35, Sells, AZ 85634",
        images: [
          "/images/building/santa-rosa.png",
          "/images/3d-images/snap_005.png",
          "/images/site-images/1.jpg",
          "/images/site-images/5.jpeg",
        ],
        description:
          " Our team proudly contributed steel detailing services for the Santa Rosa Ranch Community School—an important educational facility serving students in the Tohono O’odham Nation. This culturally significant project required precise coordination and an understanding of community-driven construction priorities.",
      },
      {
        id: 2,
        title: "Shamrock Foods Distribution Facility",
        category: "Industrial",
        location: "📍Marana, Arizona 85653",
        images: [
          "/images/building/b2.webp",
          "/images/3d-images/shamrock.png",
          "/images/site-images/4.jpg",
          "/images/site-images/8.jpeg",
        ],
        description:
          " We provided detailed structural and miscellaneous steel services for Shamrock Foods’ state-of-the-art distribution facility in Marana, AZ—supporting one of the largest foodservice providers in the western United States.this high-performance logistics center required precise steel coordination to meet operational demands for cold storage, distribution efficiency, and large-scale warehousing",
      },
      {
        id: 3,
        title: "Phoenix Zoo – Veterinary Medical Center",
        category: "Healthcare",
        location: "📍 455 N. Galvin Parkway, Phoenix, AZ 85008",
        images: [
          "/images/building/b3.webp",
          "/images/3d-images/phxzoo.png",
          "/images/site-images/3.jpeg",
          "/images/site-images/7.jpeg",
        ],
        description:
          "We provided precision steel detailing for the Veterinary Medical Center at the Phoenix Zoo—a state-of-the-art facility designed to support animal care, research, and wildlife conservation. As part of one of the most visited non-profit zoos in the U.S., this project demanded a high standard of accuracy, coordination, and technical understanding.",
      },
      {
        id: 4,
        title: "Tucson Rehabilitation Hospital",
        category: "Healthcare",
        location: "📍870 E-Tucson Marketplace Blvd,Tucson,AZ 85713",
        images: [
         "/images/building/b4.webp",
          "/images/3d-images/tucson.png",
          "/images/site-images/2.jpeg",
          "/images/site-images/4.jpg",
        ],
        description:
          "We proudly provided full-service steel detailing & connection design for the Tucson Rehabilitation Hospital—a modern, inpatient facility designed to support physical therapy, recovery, and long-term patient care. This healthcare project required a high degree of precision and compliance with stringent medical construction standards.",
      },
      {
        id: 5,
        title: "Uptown MR2 Hotel – Tempo by Hilton",
        category: "Hospitality",
        location: "📍7401 N La Cholla Blvd, Pima County, AZ 85741",
        images: [
          "/images/building/tempo.png",
          "/images/3d-images/tempo.png",
          "/images/site-images/7.jpeg",
          "/images/site-images/5.jpeg",
        ],
        description:
          "We were proud to deliver comprehensive steel detailing services for the Uptown MR2 Hotel—an upscale Tempo by Hilton project designed for modern travelers. This hospitality development by Uptown Lodging, LLC blends comfort and sophistication with structural efficiency.",
      },
      {
        id: 6,
        title: "BIA Chi Chil Tah Boarding School",
        category: "Educational",
        location: "📍831 Cousins Rd, Vanderwagen, New Mexico 87326",
        images: [
          "/images/building/bia-chi.png",
          "/images/3d-images/bia-chi.png",
          "/images/site-images/3.jpeg",
          "/images/site-images/8.jpeg",
        ],
        description:
          "Our detailing team proudly supported the construction of the BIA Chi Chil Tah Boarding School, a vital educational facility for Native American students in rural New Mexico. This project demanded precision, cultural sensitivity, and efficient coordination with structural engineers and fabricators.",
      },
      {
        id: 7,
        title: "Embry-Riddle Aeronautical University",
        category: "Educational",
        location: "📍Prescott, Arizona",
        images: [
         "/images/building/embry-riddle1.webp",
          "/images/3d-images/embry-a1.png",
          "/images/building/embry-riddle1.webp",
          "/images/site-images/2.jpeg",
        ],
        description:
          "We were honored to provide detailed steel drafting and BIM coordination services for Embry-Riddle Aeronautical University’s Prescott Campus—an institution known globally for aviation and aerospace excellence. This project involved delivering steel solutions that support the school’s commitment to cutting-edge education and innovation.",
      },
      {
        id: 8,
        title: "Yuma PHS Clinic – Yuma County Health Department",
        category: "Healthcare",
        location: "📍Yuma, Arizona",
        images: [
         "/images/building/b1.webp",
          "/images/3d-images/yuma.png",
          "/images/site-images/1.jpg",
          "/images/site-images/5.jpeg",
        ],
        description:
          "We provided complete structural and miscellaneous steel detailing services for the Yuma PHS Clinic—an essential public health facility serving the Yuma County community. This project supports a broad range of health services, requiring precision coordination and compliance with healthcare construction standards.",
      },
    ],
    [],
  );

  // Initialize card image indexes - start with second image (index 1) if valid
  useEffect(() => {
    const initialIndexes = projectPhotos.map((photo) => {
      if (photo.images.length > 1 && isValidImageUrl(photo.images[1])) {
        return 1; // Start with second image if it exists and is valid
      }
      return 0; // Fall back to first image
    });
    setCardImageIndexes(initialIndexes);
  }, []);

  // Optimized auto-slide functionality with throttling
  useEffect(() => {
    if (hoveredCard === null) return;

    const interval = setInterval(() => {
      setCardImageIndexes((prev) => {
        const newIndexes = [...prev];
        const photo = projectPhotos[hoveredCard];
        if (photo && photo.images.length > 1) {
          // Find next valid image
          let nextIndex = (newIndexes[hoveredCard] + 1) % photo.images.length;
          while (
            !isValidImageUrl(photo.images[nextIndex]) &&
            nextIndex !== newIndexes[hoveredCard]
          ) {
            nextIndex = (nextIndex + 1) % photo.images.length;
          }
          newIndexes[hoveredCard] = nextIndex;
        }
        return newIndexes;
      });
    }, 2000); // Increased interval to reduce CPU usage

    return () => clearInterval(interval);
  }, [hoveredCard, projectPhotos, isValidImageUrl]);

  // Memoized callback functions to prevent recreation on every render
  const openLightbox = useCallback(
    (photo: ProjectPhoto, imageIndex: number) => {
      setSelectedImage({ photo, imageIndex });
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Memoized navigation handlers for lightbox
  const handlePrevImage = useCallback(() => {
    if (!selectedImage || selectedImage.photo.images.length <= 1) return;

    let prevIndex =
      (selectedImage.imageIndex - 1 + selectedImage.photo.images.length) %
      selectedImage.photo.images.length;
    while (
      !isValidImageUrl(selectedImage.photo.images[prevIndex]) &&
      prevIndex !== selectedImage.imageIndex
    ) {
      prevIndex =
        (prevIndex - 1 + selectedImage.photo.images.length) %
        selectedImage.photo.images.length;
    }
    setSelectedImage({ ...selectedImage, imageIndex: prevIndex });
  }, [selectedImage, isValidImageUrl]);

  const handleNextImage = useCallback(() => {
    if (!selectedImage || selectedImage.photo.images.length <= 1) return;

    let nextIndex =
      (selectedImage.imageIndex + 1) % selectedImage.photo.images.length;
    while (
      !isValidImageUrl(selectedImage.photo.images[nextIndex]) &&
      nextIndex !== selectedImage.imageIndex
    ) {
      nextIndex = (nextIndex + 1) % selectedImage.photo.images.length;
    }
    setSelectedImage({ ...selectedImage, imageIndex: nextIndex });
  }, [selectedImage, isValidImageUrl]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, closeLightbox, handlePrevImage, handleNextImage]);

  // Memoized layout class function
  const getLayoutClass = useCallback((index: number) => {
    if (index % 4 === 0 || index % 4 === 3) {
      return "md:flex-row"; // Image left, content right
    } else {
      return "md:flex-row-reverse"; // Content left, image right
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.55, 1.4],
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
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
            Discover our comprehensive portfolio of structural steel detailing
            and engineering projects
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
          {projectPhotos.map((photo, index) => (
            <ProjectCard
              key={photo.id}
              photo={photo}
              index={index}
              cardImageIndexes={cardImageIndexes}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              setCardImageIndexes={setCardImageIndexes}
              openLightbox={openLightbox}
              getLayoutClass={getLayoutClass}
              isValidImageUrl={isValidImageUrl}
            />
          ))}
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
              {selectedImage.photo.images.filter((img) => isValidImageUrl(img))
                .length > 1 && (
                <>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center w-full h-full">
                {isValidImageUrl(
                  selectedImage.photo.images[selectedImage.imageIndex],
                ) ? (
                  <motion.img
                    key={`${selectedImage.photo.id}-${selectedImage.imageIndex}`}
                    src={selectedImage.photo.images[selectedImage.imageIndex]}
                    alt={selectedImage.photo.title}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="bg-gray-800 text-white p-8 rounded-lg">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏗���</div>
                      <div>Image not available</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Counter */}
              {selectedImage.photo.images.filter((img) => isValidImageUrl(img))
                .length > 1 && (
                <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium">
                    {selectedImage.imageIndex + 1} /{" "}
                    {
                      selectedImage.photo.images.filter((img) =>
                        isValidImageUrl(img),
                      ).length
                    }
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
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border border-white/30"
                    >
                      {selectedImage.photo.category}
                    </Badge>
                    <span className="text-sm opacity-75">
                      {selectedImage.photo.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {selectedImage.photo.title}
                  </h3>
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

export default memo(ProjectPhotosGallery);

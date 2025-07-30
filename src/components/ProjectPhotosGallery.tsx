import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[][]>([]);
  const [cardImageIndexes, setCardImageIndexes] = useState<number[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[][]>([]);
  const [loadingQueue, setLoadingQueue] = useState<Array<{photoIndex: number, imageIndex: number}>>([]);
  const [currentlyLoading, setCurrentlyLoading] = useState<{photoIndex: number, imageIndex: number} | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sequential image loading - one by one for better performance
  const handleImageLoad = useCallback((photoIndex: number, imageIndex: number) => {
    setImagesLoaded(prev => {
      const newLoaded = [...prev];
      if (newLoaded[photoIndex]) {
        newLoaded[photoIndex][imageIndex] = true;
      }
      return newLoaded;
    });
    setImageLoadingStates(prev => {
      const newStates = [...prev];
      if (newStates[photoIndex]) {
        newStates[photoIndex][imageIndex] = false;
      }
      return newStates;
    });
    setCurrentlyLoading(null);
  }, []);

  const startImageLoading = useCallback((photoIndex: number, imageIndex: number) => {
    setImageLoadingStates(prev => {
      const newStates = [...prev];
      if (newStates[photoIndex]) {
        newStates[photoIndex][imageIndex] = true;
      }
      return newStates;
    });
  }, []);

  // Process loading queue one by one
  const processLoadingQueue = useCallback(() => {
    if (currentlyLoading || loadingQueue.length === 0) return;

    const nextItem = loadingQueue[0];
    setLoadingQueue(prev => prev.slice(1));
    setCurrentlyLoading(nextItem);

    const photo = projectPhotos[nextItem.photoIndex];
    if (photo && photo.images[nextItem.imageIndex]) {
      startImageLoading(nextItem.photoIndex, nextItem.imageIndex);

      const img = new Image();
      img.onload = () => {
        handleImageLoad(nextItem.photoIndex, nextItem.imageIndex);
        // Small delay between loads for smoother experience
        setTimeout(() => {
          setCurrentlyLoading(null);
        }, 100);
      };
      img.onerror = () => {
        setImageLoadingStates(prev => {
          const newStates = [...prev];
          if (newStates[nextItem.photoIndex]) {
            newStates[nextItem.photoIndex][nextItem.imageIndex] = false;
          }
          return newStates;
        });
        setCurrentlyLoading(null);
      };
      img.src = photo.images[nextItem.imageIndex];
    }
  }, [currentlyLoading, loadingQueue, startImageLoading, handleImageLoad]);

  // Auto-process queue when items are added or current loading finishes
  useEffect(() => {
    if (!currentlyLoading && loadingQueue.length > 0) {
      const timer = setTimeout(processLoadingQueue, 50);
      return () => clearTimeout(timer);
    }
  }, [currentlyLoading, loadingQueue, processLoadingQueue]);

  // Add image to loading queue
  const queueImageForLoading = useCallback((photoIndex: number, imageIndex: number) => {
    if (imagesLoaded[photoIndex]?.[imageIndex]) return;

    setLoadingQueue(prev => {
      const exists = prev.some(item =>
        item.photoIndex === photoIndex && item.imageIndex === imageIndex
      );
      if (exists) return prev;
      return [...prev, { photoIndex, imageIndex }];
    });
  }, [imagesLoaded]);

  const projectPhotos: ProjectPhoto[] = [
    {
      id: 1,
      title: "Santa Rosa Ranch Community School",
      category: "Commercial",
      location: "📍Indian Route 35, Sells, AZ 85634",
      images: [
        "/images/3d-images/snap_005.png",
        "/images/",
        "/images/",
        "/images"
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
        "/",
        "/"
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
        "/",
        "/"
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
        "/"
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
        "/"
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
        "/"
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
        "/"
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
        ""
      ],
      description: "We provided complete structural and miscellaneous steel detailing services for the Yuma PHS Clinic—an essential public health facility."
    }
  ];

  // Initialize card image indexes and loading states with sequential loading
  useEffect(() => {
    const initialIndexes = projectPhotos.map(() => 0);
    setCardImageIndexes(initialIndexes);

    const loadedStatus = projectPhotos.map(photo =>
      new Array(photo.images.length).fill(false)
    );
    setImagesLoaded(loadedStatus);

    const loadingStates = projectPhotos.map(photo =>
      new Array(photo.images.length).fill(false)
    );
    setImageLoadingStates(loadingStates);

    // Setup intersection observer for sequential lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleCards(prev => new Set([...prev, cardIndex]));

            // Queue images for sequential loading (one by one)
            const photo = projectPhotos[cardIndex];
            if (photo) {
              // Start with the first image, then queue the rest
              photo.images.forEach((_, imageIndex) => {
                queueImageForLoading(cardIndex, imageIndex);
              });
            }
          }
        });
      },
      {
        rootMargin: '200px', // Load earlier for better UX
        threshold: 0.1
      }
    );

    // Observe all card elements
    cardRefs.current.forEach((cardElement) => {
      if (cardElement && observerRef.current) {
        observerRef.current.observe(cardElement);
      }
    });

    // Start loading first visible images immediately
    setTimeout(() => {
      // Queue first few images for immediate loading
      projectPhotos.slice(0, 2).forEach((photo, photoIndex) => {
        queueImageForLoading(photoIndex, 0);
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [queueImageForLoading]);

  // Auto-slide functionality for individual cards - only when hovered
  useEffect(() => {
    if (hoveredCard === null) return;

    // Priority load all images for hovered card
    const hoveredPhoto = projectPhotos[hoveredCard];
    if (hoveredPhoto) {
      hoveredPhoto.images.forEach((_, imageIndex) => {
        if (!imagesLoaded[hoveredCard]?.[imageIndex]) {
          // Add to front of queue for priority loading
          setLoadingQueue(prev => {
            const exists = prev.some(item =>
              item.photoIndex === hoveredCard && item.imageIndex === imageIndex
            );
            if (exists) return prev;
            return [{ photoIndex: hoveredCard, imageIndex }, ...prev];
          });
        }
      });
    }

    const interval = setInterval(() => {
      setCardImageIndexes(prev => {
        const newIndexes = [...prev];
        const photo = projectPhotos[hoveredCard];
        if (photo && photo.images.length > 1) {
          newIndexes[hoveredCard] = (newIndexes[hoveredCard] + 1) % photo.images.length;
        }
        return newIndexes;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [hoveredCard, projectPhotos, imagesLoaded]);

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
            const prevIndex = (selectedImage.imageIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
            setSelectedImage({ ...selectedImage, imageIndex: prevIndex });
          }
          break;
        case 'ArrowRight':
          if (selectedImage.photo.images.length > 1) {
            const nextIndex = (selectedImage.imageIndex + 1) % selectedImage.photo.images.length;
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
  }, [selectedImage]);

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
            const currentImageIndex = cardImageIndexes[photoIndex] || 0;
            const currentImage = photo.images[currentImageIndex];
            const isLoaded = imagesLoaded[photoIndex]?.[currentImageIndex];
            
            return (
              <motion.div
                key={photo.id}
                variants={cardVariants}
                className="group"
                ref={(el) => {
                  cardRefs.current[photoIndex] = el;
                }}
                data-card-index={photoIndex}
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

                      {/* Advanced Sequential Loading State */}
                      {(!isLoaded || imageLoadingStates[photoIndex]?.[currentImageIndex]) && (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_2s_infinite] transform skew-x-12"></div>
                          <div className="flex flex-col items-center space-y-4 z-10">
                            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                            <div className="text-gray-500 text-sm font-medium">
                              {currentlyLoading?.photoIndex === photoIndex && currentlyLoading?.imageIndex === currentImageIndex
                                ? 'Loading...'
                                : `In Queue (${loadingQueue.findIndex(item => item.photoIndex === photoIndex && item.imageIndex === currentImageIndex) + 1})`
                              }
                            </div>
                            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                animate={{
                                  width: currentlyLoading?.photoIndex === photoIndex && currentlyLoading?.imageIndex === currentImageIndex
                                    ? "100%"
                                    : "20%"
                                }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            {loadingQueue.length > 0 && (
                              <div className="text-xs text-gray-400">
                                {loadingQueue.length} images in queue
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <AnimatePresence mode="wait">
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
                            className={`w-full h-full object-cover ${
                              isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            loading="lazy"
                            variants={imageVariants}
                            whileHover="hover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Image Navigation Overlay */}
                      {photo.images.length > 1 && hoveredCard === photoIndex && (
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
                            View Gallery ({photo.images.length})
                          </Button>
                        </motion.div>
                      )}

                      {/* Image Counter */}
                      {photo.images.length > 1 && (
                        <motion.div 
                          className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentImageIndex + 1}/{photo.images.length}
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
              {selectedImage.photo.images.length > 1 && (
                <>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm border border-white/20"
                    onClick={() => {
                      const prevIndex = (selectedImage.imageIndex - 1 + selectedImage.photo.images.length) % selectedImage.photo.images.length;
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
                      const nextIndex = (selectedImage.imageIndex + 1) % selectedImage.photo.images.length;
                      setSelectedImage({ ...selectedImage, imageIndex: nextIndex });
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Main Image Container */}
              <div className="relative flex items-center justify-center w-full h-full">
                <motion.img
                  key={`${selectedImage.photo.id}-${selectedImage.imageIndex}`}
                  src={selectedImage.photo.images[selectedImage.imageIndex]}
                  alt={selectedImage.photo.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Image Counter */}
              {selectedImage.photo.images.length > 1 && (
                <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium">
                    {selectedImage.imageIndex + 1} / {selectedImage.photo.images.length}
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

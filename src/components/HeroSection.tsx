import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { ChevronDown, Play, Pause } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  tagline?: string;
  backgroundImages?: string[];
  logoSrc?: string;
}

const HeroSection = ({
  title = "EMCOBE Engineering & Consultants",
  tagline = "Accuracy we prefer, Perfection we provide.",
  backgroundImages = [
    "https://images.unsplash.com/photo-1706552128399-43e2baff0fe5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90",
    "https://images.unsplash.com/photo-1565213785833-2eeb151d4e82?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661936501209-f5bf746abbde?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  logoSrc = "/logo.jpg",
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api || !isAutoPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Image Carousel */}
      <Carousel
        className="absolute inset-0 z-0"
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
          dragFree: false,
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0">
          {backgroundImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-screen w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            title={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === current - 1
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Indicator clicked", index, api);
              if (api) {
                api.scrollTo(index);
                setIsAutoPlaying(false);
              }
            }}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 max-w-5xl"
        >
          {/* Logo with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl" />
              <img
                src={logoSrc}
                alt="EMCOBE Logo"
                className="relative mx-auto h-28 w-auto rounded-2xl object-contain p-4 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Enhanced Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-2"
          >
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto mt-6 max-w-3xl text-xl font-light italic text-blue-100 sm:text-2xl md:text-3xl leading-relaxed"
          >
            &quot;{tagline}&quot;
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 hover:scale-105"
            onClick={() => navigate("/services")}
          >
            <span className="relative z-10">Explore Our Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group relative overflow-hidden border-2 border-white/50 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate("/contact")}
          >
            <span className="relative z-10">Get In Touch</span>
          </Button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-10 w-6 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm">
              <motion.div
                className="mx-auto mt-2 h-2 w-1 rounded-full bg-white"
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
            <ChevronDown className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 text-white/60 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

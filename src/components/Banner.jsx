import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://i.ibb.co.com/Swkq0782/gabriel-gurrola-u6-BPMXg-URu-I-unsplash.jpg", 
  "https://i.ibb.co.com/HpkMKRXQ/hayes-potter-d-Hu-Kem53-H0w-unsplash.jpg",
  "https://i.ibb.co.com/qMs8dbyy/ryan-spencer-c-NEi-PIxp-YI-unsplash.jpg"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  const handleAllVehiclesClick = () => {
    window.location.href = "/all-vehicles";
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.9,
        ease: "easeOut"
      }
    }
  };

  const iconRotateVariants = {
    hover: {
      rotate: 250,
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full -mt-px"> 
      <div className="max-w-full mx-auto px-0">
        <div className="relative w-full overflow-hidden bg-black">
        
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <img
                  src={src.endsWith(".mp4") || src.endsWith(".webm")
                    ? `${src}#t=0.1`
                    : src}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-screen object-cover brightness-75"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-white text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl"
              >
                Find Your Perfect Ride
              </motion.h1>
              
              <motion.p
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                className="text-white/90 text-lg md:text-2xl mb-8 font-light tracking-wide drop-shadow-lg"
              >
                Travel in Comfort with Vehicles Made for Your Tour.
              </motion.p>
              
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onClick={handleAllVehiclesClick}
                className="flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-gray-900 font-semibold rounded-full px-8 py-4 shadow-2xl transition-colors duration-300 mx-auto"
              >
                <motion.svg
                  variants={iconRotateVariants}
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                  />
                </motion.svg>
                <span className="text-lg">Explore All Vehicles</span>
              </motion.button>
              
              <motion.div
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center gap-8 mt-8 text-white/80 text-sm md:text-base"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, color: "rgba(255, 255, 255, 1)" }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>5000+ Happy Customers</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, color: "rgba(255, 255, 255, 1)" }}
                  className="hidden md:flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified Vehicles</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-300 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-300 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i
                    ? "bg-white w-8"
                    : "bg-white/50 w-2 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default Banner;
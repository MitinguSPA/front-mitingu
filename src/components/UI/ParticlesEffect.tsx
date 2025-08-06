import { motion, useViewportScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ParticlesEffectProps {
  particleCount?: number;
  colors?: string[];
  shapes?: string[];
  sizeRange?: [number, number];
  durationRange?: [number, number];
  delayRange?: [number, number];
  className?: string;
  responsive?: boolean;
  scrollInteractive?: boolean;
  direction?: "top" | "bottom" | "left" | "right";
}

const ParticlesEffect: React.FC<ParticlesEffectProps> = ({
  particleCount = 30,
  colors = ["#F4A9B6", "#DD6E81", "#FFFFFF"],
  shapes = ["✿", "❀", "✽", "❁", "✦"],
  sizeRange = [10, 20],
  durationRange = [3, 6],
  delayRange = [0, 2],
  className = "",
  responsive = true,
  scrollInteractive = false,
  direction = "top"
}) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });
  const { scrollYProgress } = useViewportScroll();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { x: Math.random() * windowSize.width, y: -50 };
      case "bottom":
        return { x: Math.random() * windowSize.width, y: windowSize.height + 50 };
      case "left":
        return { x: -50, y: Math.random() * windowSize.height };
      case "right":
        return { x: windowSize.width + 50, y: Math.random() * windowSize.height };
      default:
        return { x: Math.random() * windowSize.width, y: -50 };
    }
  };

  // Get animate position based on direction
  const getAnimatePosition = () => {
    switch (direction) {
      case "top":
        return { y: windowSize.height + 50 };
      case "bottom":
        return { y: -50 };
      case "left":
        return { x: windowSize.width + 50 };
      case "right":
        return { x: -50 };
      default:
        return { y: windowSize.height + 50 };
    }
  };

  // Scroll interaction effect
  const scrollEffect = scrollInteractive 
    ? useTransform(scrollYProgress, [0, 1], [0, -100])
    : 0;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(particleCount)].map((_, i) => {
        const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
        const delay = delayRange[0] + Math.random() * (delayRange[1] - delayRange[0]);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const initialPos = getInitialPosition();
        const animatePos = getAnimatePosition();

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: initialPos.x,
              y: initialPos.y,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{
              y: scrollInteractive 
                ? animatePos.y + scrollEffect 
                : animatePos.y,
              x: scrollInteractive
                ? animatePos.x + scrollEffect
                : animatePos.x,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              fontSize: `${size}px`,
              color,
              ...(responsive ? {} : { left: `${Math.random() * 100}%` })
            }}
          >
            {shape}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticlesEffect;
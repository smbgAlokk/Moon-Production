import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedMicrophone = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.3; // Start animation when scrolled 30% of viewport

      if (scrollPosition > triggerPoint && !shouldAnimate) {
        setShouldAnimate(true);
        controls.start({
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 1,
          transition: {
            duration: 2,
            ease: [0.68, -0.55, 0.265, 1.55], // Custom bounce easing
            times: [0, 0.6, 0.8, 1],
            y: {
              duration: 2,
              ease: [0.68, -0.55, 0.265, 1.55]
            },
            rotate: {
              duration: 1.8,
              ease: "easeOut"
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldAnimate, controls]);

  return (
    <motion.div
      className="fixed top-10 right-10 z-30 pointer-events-none"
      initial={{ 
        y: -200, 
        x: -50, 
        rotate: -180, 
        opacity: 0 
      }}
      animate={controls}
    >
      {/* 3D Microphone SVG */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl opacity-60">
          <svg
            width="80"
            height="120"
            viewBox="0 0 80 120"
            className="filter drop-shadow-[0_0_20px_hsl(var(--studio-fuchsia))]"
          >
            <defs>
              <linearGradient id="micGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--studio-fuchsia))" />
                <stop offset="100%" stopColor="hsl(var(--studio-purple))" />
              </linearGradient>
            </defs>
            <ellipse cx="40" cy="30" rx="18" ry="25" fill="url(#micGlow)" opacity="0.8" />
          </svg>
        </div>
        
        {/* Main microphone */}
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--studio-fuchsia))" />
              <stop offset="50%" stopColor="hsl(var(--studio-purple))" />
              <stop offset="100%" stopColor="hsl(var(--studio-accent))" />
            </linearGradient>
            <linearGradient id="standGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--studio-grey))" />
              <stop offset="100%" stopColor="hsl(var(--studio-dark))" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="hsl(var(--studio-dark))" floodOpacity="0.5"/>
            </filter>
          </defs>
          
          {/* Microphone body */}
          <ellipse cx="40" cy="30" rx="16" ry="23" fill="url(#micGradient)" filter="url(#shadow)" />
          
          {/* Microphone grille lines */}
          <g stroke="hsl(var(--studio-dark))" strokeWidth="1" opacity="0.6">
            <line x1="28" y1="20" x2="52" y2="20" />
            <line x1="26" y1="25" x2="54" y2="25" />
            <line x1="26" y1="30" x2="54" y2="30" />
            <line x1="26" y1="35" x2="54" y2="35" />
            <line x1="28" y1="40" x2="52" y2="40" />
          </g>
          
          {/* Highlight */}
          <ellipse cx="35" cy="25" rx="3" ry="8" fill="hsl(var(--foreground))" opacity="0.3" />
          
          {/* Stand base */}
          <rect x="35" y="53" width="10" height="8" fill="url(#standGradient)" rx="2" filter="url(#shadow)" />
          
          {/* Stand pole */}
          <rect x="38" y="61" width="4" height="35" fill="url(#standGradient)" filter="url(#shadow)" />
          
          {/* Base */}
          <ellipse cx="40" cy="105" rx="20" ry="8" fill="url(#standGradient)" filter="url(#shadow)" />
          
          {/* Base ring detail */}
          <ellipse cx="40" cy="105" rx="16" ry="6" fill="none" stroke="hsl(var(--studio-fuchsia))" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Floating particles around microphone */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-studio-fuchsia rounded-full"
              style={{
                left: `${50 + 30 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 30 * Math.sin((i * Math.PI * 2) / 6)}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedMicrophone;
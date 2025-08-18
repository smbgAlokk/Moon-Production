import { Button } from "@/components/ui/button";
import { Play, Phone, Calendar, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animated-gradient"></div>
      
      {/* Background Image with Premium Overlay */}
      <div className="absolute inset-0 z-1">
        <img 
          src={heroBackground} 
          alt="Professional recording studio" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-studio-dark via-studio-dark/80 to-transparent"></div>
      </div>

      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--studio-fuchsia) / 0.3), transparent 70%)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--studio-purple) / 0.4), transparent 70%)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--studio-accent) / 0.2), transparent 70%)' }}
          animate={{ 
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear" 
          }}
        />
      </div>

      {/* Premium Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <motion.h1 
            className="font-hero text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="block text-premium"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              🎧 WHERE MUSIC
            </motion.span>
            <motion.span 
              className="block text-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              MEETS MAGIC
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            One-stop studio for Music Production, Voiceovers, Podcasts & More.
            <span className="block mt-1">Transform your creative vision into reality with professional-grade equipment.</span>
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="lg" 
                className="button-premium text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-[280px] sm:min-w-[200px]"
                asChild
              >
                <Link to="/booking">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">🎙️ Book Your Session</span>
                  <span className="sm:hidden">🎙️ Book Session</span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-[280px] sm:min-w-[200px] glass-premium border-studio-fuchsia/30 hover:border-studio-fuchsia/60 hover:bg-studio-fuchsia/10"
                onClick={() => window.open('tel:+918528934948', '_blank')}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">📞 Call Primary</span>
                <span className="sm:hidden">📞 Call Now</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Stats */}
          <motion.div 
            className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { number: "500+", label: "Projects Completed", delay: 0 },
              { number: "24/7", label: "Studio Available", delay: 0.1 },
              { number: "Pro", label: "Grade Equipment", delay: 0.2 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-premium p-3 sm:p-4 rounded-lg text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + stat.delay }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px hsl(var(--studio-fuchsia) / 0.3)"
                }}
              >
                <motion.div 
                  className="text-xl sm:text-2xl font-heading text-premium mb-1"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div className="w-6 h-10 border-2 border-studio-fuchsia rounded-full flex justify-center relative overflow-hidden">
            <motion.div 
              className="w-1 h-3 bg-studio-fuchsia rounded-full mt-2"
              animate={{ 
                opacity: [1, 0.3, 1],
                scale: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-studio-fuchsia/20 to-transparent opacity-50"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic, Headphones, MicVocal, Video, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import studioServices from "@/assets/studio-services.jpg";
import podcastSetup from "@/assets/podcast-setup.jpg";
import mixingMastering from "@/assets/mixing-mastering.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: Mic,
      title: "🎙️ Recording Studio",
      description: "Professional recording sessions with industry-standard equipment.",
      image: studioServices,
      features: ["Multi-track Recording", "Professional Microphones", "Acoustic Treatment"],
      link: "/services/recording-studio"
    },
    {
      icon: Headphones,
      title: "🎧 Mixing & Mastering",
      description: "Finalize your sound with clarity, punch, and depth.",
      image: mixingMastering,
      features: ["Professional Mixing", "Mastering", "Audio Restoration"],
      link: "/services/mixing-mastering"
    },
    {
      icon: Video,
      title: "🎥 Podcast Production",
      description: "Complete podcast production from recording to final delivery.",
      image: podcastSetup,
      features: ["Recording & Editing", "Sound Design", "Distribution Support"],
      link: "/services/podcast-production"
    },
    {
      icon: Music,
      title: "🎵 Music Production",
      description: "Bring your tracks to life with rich arrangements and modern soundscapes.",
      image: studioServices,
      features: ["Original Composition", "Arrangement", "Sound Design"],
      link: "/services/music-production"
    },
    {
      icon: MicVocal,
      title: "🎤 Voice Dubbing",
      description: "Studio-quality dubbing for films, series, YouTube, and OTT content.",
      image: podcastSetup,
      features: ["Film Dubbing", "Commercial Voice", "Character Voices"],
      link: "/services/voice-dubbing"
    },
    {
      icon: Settings,
      title: "🎚️ Vocal Chain Setup",
      description: "From mic to mix — build your vocal chain for the perfect tone.",
      image: mixingMastering,
      features: ["Equipment Setup", "Signal Processing", "Acoustic Treatment"],
      link: "/services/vocal-chain-setup"
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0 animated-gradient"></div>
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-1">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--studio-purple) / 0.2), transparent 70%)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(var(--studio-fuchsia) / 0.3), transparent 70%)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-premium">🎶 OUR STUDIO</span>
            <br />
            <span className="text-foreground">SERVICES</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            High-end production, all in one place. Professional equipment and expert guidance for every creative need.
          </motion.p>
        </motion.div>

        {/* Premium Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="glass-premium group overflow-hidden border-studio-fuchsia/20 hover:border-studio-fuchsia/40 h-full">
                  <motion.div 
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-dark/90 via-studio-dark/30 to-transparent"></div>
                    <motion.div 
                      className="absolute bottom-4 left-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2 rounded-full glass-premium border border-studio-fuchsia/30">
                        <IconComponent className="w-6 h-6 text-studio-fuchsia" />
                      </div>
                    </motion.div>
                    
                    {/* Premium glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at center, hsl(var(--studio-fuchsia) / 0.2), transparent 70%)'
                      }}
                    />
                  </motion.div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-heading text-foreground group-hover:text-premium transition-all duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (index * 0.1) + (featureIndex * 0.05) }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-studio-fuchsia rounded-full mr-3"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                          />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full button-premium" asChild>
                          <Link to={service.link}>
                            Book Now
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="glass" className="w-full" asChild>
                          <Link to={service.link}>
                            Learn More
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              size="lg" 
              className="button-premium text-lg px-8 py-4 animate-pulse-glow"
              asChild
            >
              <Link to="/services-pricing">
                View All Services & Pricing
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
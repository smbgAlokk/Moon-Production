import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, Volume2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ViewWorkPage = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState(0);

  const portfolioProjects = [
    {
      title: "Midnight Echoes",
      artist: "Luna Ray",
      type: "Album",
      genre: "Electronic Pop",
      description: "A dreamy electronic pop album with ethereal vocals and ambient soundscapes"
    },
    {
      title: "Urban Legends",
      artist: "Street Poets",
      type: "EP",
      genre: "Hip Hop",
      description: "Raw urban storytelling with hard-hitting beats and conscious lyrics"
    },
    {
      title: "Acoustic Dreams",
      artist: "River Stone",
      type: "Single",
      genre: "Folk",
      description: "Intimate acoustic performance capturing raw emotional depth"
    },
    {
      title: "Neon Nights",
      artist: "Cyber Funk",
      type: "Album",
      genre: "Synthwave",
      description: "Retro-futuristic sounds blending 80s nostalgia with modern production"
    }
  ];

  const audioSamples = [
    { title: "Cinematic Score", duration: "2:34", type: "Instrumental" },
    { title: "Podcast Intro", duration: "0:15", type: "Audio Logo" },
    { title: "Commercial Jingle", duration: "0:30", type: "Advertisement" },
    { title: "Beat Demo", duration: "1:45", type: "Hip Hop" },
    { title: "Ambient Soundscape", duration: "3:12", type: "Background" },
    { title: "Voice Over Sample", duration: "1:20", type: "Narration" }
  ];

  const videoReels = [
    { title: "Studio Session - Electronic Production", type: "Behind the Scenes" },
    { title: "Vocal Recording Process", type: "Process Video" },
    { title: "Mixing & Mastering Walkthrough", type: "Educational" },
    { title: "Artist Interview", type: "Documentary" },
    { title: "Equipment Showcase", type: "Studio Tour" },
    { title: "Creative Process", type: "Time-lapse" }
  ];

  const nextAlbum = () => {
    setCurrentAlbum((prev) => (prev + 1) % portfolioProjects.length);
  };

  const prevAlbum = () => {
    setCurrentAlbum((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  return (
    <div className="min-h-screen bg-studio-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 70% 20%, hsl(var(--studio-purple) / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 30% 80%, hsl(var(--studio-fuchsia) / 0.1) 0%, transparent 50%),
              linear-gradient(45deg, hsl(var(--studio-dark)) 0%, hsl(var(--studio-charcoal)) 100%)
            `
          }}
          animate={{
            background: [
              `radial-gradient(circle at 70% 20%, hsl(var(--studio-purple) / 0.15) 0%, transparent 50%),
               radial-gradient(circle at 30% 80%, hsl(var(--studio-fuchsia) / 0.1) 0%, transparent 50%),
               linear-gradient(45deg, hsl(var(--studio-dark)) 0%, hsl(var(--studio-charcoal)) 100%)`,
              `radial-gradient(circle at 30% 20%, hsl(var(--studio-purple) / 0.1) 0%, transparent 50%),
               radial-gradient(circle at 70% 80%, hsl(var(--studio-fuchsia) / 0.15) 0%, transparent 50%),
               linear-gradient(45deg, hsl(var(--studio-charcoal)) 0%, hsl(var(--studio-dark)) 100%)`,
              `radial-gradient(circle at 70% 20%, hsl(var(--studio-purple) / 0.15) 0%, transparent 50%),
               radial-gradient(circle at 30% 80%, hsl(var(--studio-fuchsia) / 0.1) 0%, transparent 50%),
               linear-gradient(45deg, hsl(var(--studio-dark)) 0%, hsl(var(--studio-charcoal)) 100%)`
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Musical Notes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-studio-fuchsia opacity-20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="studio-glow hover-glow">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl mb-6 leading-tight">
            <span className="text-gradient">Our</span>
            <br />
            <span className="text-studio-light">Portfolio</span>
          </h1>
          <p className="text-xl text-studio-muted max-w-2xl mx-auto">
            Discover the exceptional work we've created with artists across genres
          </p>
        </motion.div>

        {/* Portfolio Showcase Carousel */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-heading text-studio-light mb-8 text-center">Featured Projects</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="glass-effect border-studio-fuchsia/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Album Cover Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-studio-fuchsia/20 to-studio-purple/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-studio-fuchsia/30 to-studio-purple/30"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl text-studio-fuchsia/50">🎵</div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="outline" className="border-studio-fuchsia/50 text-studio-fuchsia w-fit mb-4">
                      {portfolioProjects[currentAlbum].type}
                    </Badge>
                    <h3 className="text-2xl font-heading text-studio-light mb-2">
                      {portfolioProjects[currentAlbum].title}
                    </h3>
                    <p className="text-studio-fuchsia mb-2">{portfolioProjects[currentAlbum].artist}</p>
                    <Badge variant="outline" className="border-studio-purple/50 text-studio-purple w-fit mb-4">
                      {portfolioProjects[currentAlbum].genre}
                    </Badge>
                    <p className="text-studio-muted mb-6">{portfolioProjects[currentAlbum].description}</p>
                    <Button className="studio-glow hover-glow w-fit">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={prevAlbum}
              className="absolute left-4 top-1/2 -translate-y-1/2 studio-glow hover-glow"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={nextAlbum}
              className="absolute right-4 top-1/2 -translate-y-1/2 studio-glow hover-glow"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.section>

        {/* Audio Samples Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-heading text-studio-light mb-8 text-center">Audio Samples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioSamples.map((sample, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="glass-effect border-studio-fuchsia/20 hover-glow transition-studio group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-studio-purple/50 text-studio-purple">
                        {sample.type}
                      </Badge>
                      <span className="text-sm text-studio-muted">{sample.duration}</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-studio-light mb-4">{sample.title}</h3>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        onClick={() => setCurrentTrack(currentTrack === index ? null : index)}
                        className="studio-glow hover-glow"
                      >
                        {currentTrack === index ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      
                      <div className="flex-1 h-2 bg-studio-charcoal rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-studio-fuchsia to-studio-purple"
                          style={{ width: currentTrack === index ? "60%" : "0%" }}
                          animate={{ 
                            width: currentTrack === index ? ["0%", "60%"] : "0%",
                            background: currentTrack === index ? [
                              "linear-gradient(to right, hsl(var(--studio-fuchsia)), hsl(var(--studio-purple)))",
                              "linear-gradient(to right, hsl(var(--studio-purple)), hsl(var(--studio-fuchsia)))",
                              "linear-gradient(to right, hsl(var(--studio-fuchsia)), hsl(var(--studio-purple)))"
                            ] : "linear-gradient(to right, hsl(var(--studio-fuchsia)), hsl(var(--studio-purple)))"
                          }}
                          transition={{ 
                            width: { duration: 2 },
                            background: { duration: 1.5, repeat: Infinity }
                          }}
                        />
                      </div>
                      
                      <Volume2 className="w-4 h-4 text-studio-muted" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Reels Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-heading text-studio-light mb-8 text-center">Behind the Scenes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoReels.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="glass-effect border-studio-purple/20 hover-glow transition-studio group overflow-hidden">
                  <CardContent className="p-0">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-studio-charcoal to-studio-dark relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-studio-fuchsia/10 to-studio-purple/10"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={() => setCurrentVideo(currentVideo === index ? null : index)}
                          className="studio-glow hover-glow"
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      {currentVideo === index && (
                        <motion.div
                          className="absolute inset-2 border-2 border-studio-fuchsia rounded"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    <div className="p-6">
                      <Badge variant="outline" className="border-studio-fuchsia/50 text-studio-fuchsia mb-3">
                        {video.type}
                      </Badge>
                      <h3 className="text-lg font-medium text-studio-light">{video.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-heading text-studio-light mb-6">Ready to Create Your Masterpiece?</h2>
          <p className="text-xl text-studio-muted mb-8 max-w-2xl mx-auto">
            Join the artists who trust Moon Production with their creative vision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="studio-glow hover-glow transition-bounce">
                Book Your Session
              </Button>
            </Link>
            <Link to="/schedule-tour">
              <Button variant="outline" size="lg" className="hover-glow transition-bounce">
                Schedule a Tour
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewWorkPage;
import { Button } from "@/components/ui/button";
import { Play, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Professional recording studio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 md:bg-gradient-to-r md:from-background/60 md:via-background/40 md:to-background/80"></div>
      </div>

      {/* Mobile-Optimized Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/6 left-1/6 w-32 h-32 md:w-64 md:h-64 bg-primary/8 rounded-full blur-2xl md:blur-3xl animate-float"></div>
        <div className="absolute bottom-1/6 right-1/6 w-40 h-40 md:w-96 md:h-96 bg-accent/8 rounded-full blur-2xl md:blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 bg-studio-glow/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-8 md:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Main Heading - Mobile Optimized */}
          <div className="space-y-2 md:space-y-4">
            <h1 className="font-hero text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight">
              <span className="block text-gradient mb-1 md:mb-2">🎧 WHERE MUSIC</span>
              <span className="block text-foreground">MEETS MAGIC</span>
            </h1>
          </div>

          {/* Mobile-Friendly Subheading */}
          <div className="space-y-3 md:space-y-4">
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-heading text-primary/90 leading-tight">
              One-stop studio for Music Production
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Voiceovers, Podcasts & More. Transform your creative vision into reality with professional-grade equipment.
            </p>
          </div>

          {/* Mobile-First CTA Buttons */}
          <div className="flex flex-col gap-4 px-2 md:flex-row md:justify-center md:gap-6 md:px-0">
            <Button 
              size="lg" 
              className="studio-glow hover-glow text-base md:text-lg px-8 py-4 h-14 md:h-16 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/booking">
                <Calendar className="w-5 h-5 mr-3" />
                🎙️ Book Your Session
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base md:text-lg px-8 py-4 h-14 md:h-16 font-semibold glass-effect hover-glow transition-all duration-300 hover:scale-105 border-2"
              onClick={() => window.open('tel:+918528934948', '_blank')}
            >
              <Phone className="w-5 h-5 mr-3" />
              📞 Contact Us Now
            </Button>
          </div>

          {/* Enhanced Mobile Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 md:gap-6 max-w-lg md:max-w-2xl mx-auto pt-4">
            <div className="glass-effect p-4 md:p-6 rounded-xl hover-glow transition-all duration-300 hover:scale-105 border border-primary/20">
              <div className="text-2xl md:text-3xl font-heading text-primary mb-1 font-bold">500+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="glass-effect p-4 md:p-6 rounded-xl hover-glow transition-all duration-300 hover:scale-105 border border-accent/20">
              <div className="text-2xl md:text-3xl font-heading text-accent mb-1 font-bold">24/7</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Studio Available</div>
            </div>
            <div className="glass-effect p-4 md:p-6 rounded-xl hover-glow transition-all duration-300 hover:scale-105 border border-studio-glow/20 xs:col-span-1">
              <div className="text-2xl md:text-3xl font-heading text-studio-glow mb-1 font-bold">Pro</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">Grade Equipment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
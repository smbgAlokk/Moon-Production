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
        <div className="absolute inset-0 studio-gradient"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-hero text-4xl sm:text-6xl lg:text-8xl mb-6 leading-tight">
            <span className="block text-gradient">🎧 WHERE MUSIC</span>
            <span className="block text-foreground">MEETS MAGIC</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            One-stop studio for Music Production, Voiceovers, Podcasts & More.
            Transform your creative vision into reality with professional-grade equipment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <Button 
              size="lg" 
              className="studio-glow hover-glow text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-w-[160px] sm:min-w-[200px] transition-bounce"
              asChild
            >
              <Link to="/booking">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">🎙️ Book Your Session</span>
                <span className="sm:hidden">🎙️ Book Now</span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base sm:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 min-w-[160px] sm:min-w-[200px] glass-effect hover-glow transition-bounce"
              onClick={() => window.open('tel:+918528934948', '_blank')}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">📞 Contact Us Now</span>
              <span className="sm:hidden">📞 Call Now</span>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass-effect p-4 rounded-lg hover-glow transition-studio">
              <div className="text-2xl font-heading text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="glass-effect p-4 rounded-lg hover-glow transition-studio">
              <div className="text-2xl font-heading text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Studio Available</div>
            </div>
            <div className="glass-effect p-4 rounded-lg hover-glow transition-studio">
              <div className="text-2xl font-heading text-primary mb-1">Pro</div>
              <div className="text-sm text-muted-foreground">Grade Equipment</div>
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
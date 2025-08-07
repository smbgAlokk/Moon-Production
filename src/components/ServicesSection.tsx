import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Mic, Headphones, MicVocal, Video, Settings } from "lucide-react";
import { Link } from "react-router-dom";
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
    <section id="services" className="py-20 bg-studio-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
            <span className="text-gradient">🎶 OUR STUDIO</span>
            <br />
            <span className="text-foreground">SERVICES</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-end production, all in one place. Professional equipment and expert guidance for every creative need.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <Card 
                key={index} 
                className="glass-effect hover-glow transition-studio group overflow-hidden border-primary/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-l font-heading text-foreground group-hover:text-primary transition-studio">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 hover-glow transition-bounce" asChild>
                      <Link to={service.link}>
                        Book Now
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to={service.link}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="studio-glow text-lg px-8 py-4 animate-pulse-glow"
          >
            View All Services & Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
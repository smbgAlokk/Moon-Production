import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Star, Clock, DollarSign, Users, Award, Zap } from "lucide-react";
import studioServices from "@/assets/studio-services.jpg";
import podcastSetup from "@/assets/podcast-setup.jpg";
import mixingMastering from "@/assets/mixing-mastering.jpg";

const ServicesPricingPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: "recording-studio",
      category: "recording",
      icon: "🎙️",
      title: "Recording Studio",
      subtitle: "Professional Recording Sessions",
      description: "High-quality recording sessions with industry-standard equipment and expert engineers.",
      image: studioServices,
      features: [
        "Multi-track Recording",
        "Professional Microphones",
        "Acoustic Treatment",
        "Engineer Included",
        "File Delivery"
      ],
      pricing: {
        hourly: "$50/hour",
        halfDay: "$200 (4 hours)",
        fullDay: "$350 (8 hours)",
        package: "$1,200 (4 full days)"
      },
      popular: false,
      link: "/services/recording-studio"
    },
    {
      id: "mixing-mastering",
      category: "post-production",
      icon: "🎧",
      title: "Mixing & Mastering",
      subtitle: "Professional Audio Post-Production",
      description: "Transform your raw recordings into polished, radio-ready tracks with expert mixing and mastering.",
      image: mixingMastering,
      features: [
        "Professional Mixing",
        "Mastering Services",
        "Unlimited Revisions",
        "Multiple Formats",
        "Quality Guarantee"
      ],
      pricing: {
        single: "$150/track",
        ep: "$400 (3-5 tracks)",
        album: "$800 (8-12 tracks)",
        custom: "Custom Quote"
      },
      popular: true,
      link: "/services/mixing-mastering"
    },
    {
      id: "podcast-production",
      category: "podcast",
      icon: "🎥",
      title: "Podcast Production",
      subtitle: "Complete Podcast Solutions",
      description: "End-to-end podcast production from recording to distribution with professional quality.",
      image: podcastSetup,
      features: [
        "Recording & Editing",
        "Sound Design",
        "Episode Assembly",
        "Distribution Support",
        "Show Notes"
      ],
      pricing: {
        perEpisode: "$200/episode",
        monthly: "$600/month (4 episodes)",
        season: "$2,000 (12 episodes)",
        custom: "Custom Package"
      },
      popular: false,
      link: "/services/podcast-production"
    },
    {
      id: "music-production",
      category: "production",
      icon: "🎵",
      title: "Music Production",
      subtitle: "Original Music Creation",
      description: "Create original music with professional production, arrangement, and sound design.",
      image: studioServices,
      features: [
        "Original Composition",
        "Arrangement",
        "Sound Design",
        "Instrumentation",
        "Full Production"
      ],
      pricing: {
        single: "$300/track",
        ep: "$1,200 (4-6 tracks)",
        album: "$2,500 (8-12 tracks)",
        custom: "Project Based"
      },
      popular: false,
      link: "/services/music-production"
    },
    {
      id: "voice-dubbing",
      category: "voice",
      icon: "🎤",
      title: "Voice Dubbing",
      subtitle: "Professional Voice Services",
      description: "Studio-quality dubbing for films, series, YouTube, and OTT content with professional voice talent.",
      image: podcastSetup,
      features: [
        "Film Dubbing",
        "Commercial Voice",
        "Character Voices",
        "Multiple Languages",
        "Quality Assurance"
      ],
      pricing: {
        perMinute: "$50/minute",
        perProject: "$300/project",
        bulk: "$1,000 (25 minutes)",
        custom: "Custom Quote"
      },
      popular: false,
      link: "/services/voice-dubbing"
    },
    {
      id: "vocal-chain-setup",
      category: "setup",
      icon: "🎚️",
      title: "Vocal Chain Setup",
      subtitle: "Professional Vocal Processing",
      description: "Build the perfect vocal chain from mic to mix with expert signal processing and acoustic treatment.",
      image: mixingMastering,
      features: [
        "Equipment Setup",
        "Signal Processing",
        "Acoustic Treatment",
        "Chain Optimization",
        "Training Included"
      ],
      pricing: {
        consultation: "$100/hour",
        setup: "$300 (full setup)",
        training: "$150 (2 hours)",
        package: "$500 (setup + training)"
      },
      popular: false,
      link: "/services/vocal-chain-setup"
    }
  ];

  const categories = [
    { id: "all", label: "All Services", count: services.length },
    { id: "recording", label: "Recording", count: services.filter(s => s.category === "recording").length },
    { id: "post-production", label: "Post-Production", count: services.filter(s => s.category === "post-production").length },
    { id: "podcast", label: "Podcast", count: services.filter(s => s.category === "podcast").length },
    { id: "production", label: "Production", count: services.filter(s => s.category === "production").length },
    { id: "voice", label: "Voice", count: services.filter(s => s.category === "voice").length },
    { id: "setup", label: "Setup", count: services.filter(s => s.category === "setup").length }
  ];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-studio-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              <span className="text-gradient">🎶 STUDIO</span>
              <br />
              <span className="text-foreground">SERVICES & PRICING</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional audio services tailored to your creative vision. Transparent pricing, exceptional quality, and expert guidance every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 w-full max-w-4xl">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 py-3"
                >
                  <span className="text-sm font-medium">{category.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card 
                  key={service.id} 
                  className={`glass-effect hover-glow transition-studio group overflow-hidden border-primary/20 relative ${
                    service.popular ? 'ring-2 ring-primary/50' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-primary-foreground animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-4xl">
                      {service.icon}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-foreground group-hover:text-primary transition-studio">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-medium">
                      {service.subtitle}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">What's Included:</h4>
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Pricing Options:</h4>
                      <div className="space-y-2">
                        {Object.entries(service.pricing).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                            </span>
                            <span className="font-semibold text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-studio-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-6">
              <span className="text-gradient">Why Choose</span>
              <br />
              <span className="text-foreground">Moon Production?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Professional Quality</h3>
              <p className="text-muted-foreground text-sm">
                Industry-standard equipment and expert engineers ensure top-tier results
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Fast Turnaround</h3>
              <p className="text-muted-foreground text-sm">
                Quick delivery without compromising on quality or attention to detail
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Expert Team</h3>
              <p className="text-muted-foreground text-sm">
                Experienced professionals dedicated to bringing your vision to life
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Creative Freedom</h3>
              <p className="text-muted-foreground text-sm">
                Collaborative approach that respects and enhances your creative vision
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us to discuss your project requirements and receive a custom quote tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="studio-glow text-lg px-8 py-4" asChild>
              <Link to="/booking">
                Book a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to="/#contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPricingPage;

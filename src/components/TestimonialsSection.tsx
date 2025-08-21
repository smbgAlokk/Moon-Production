import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Arjun Kapoor",
      role: "Independent Artist",
      project: "EP Recording & Mixing",
      rating: 5,
      text: "Best studio in West Delhi for professional mixing! The team at Moon Production helped me achieve the exact sound I was looking for. The equipment is top-notch and the atmosphere is incredibly creative.",
      avatar: "🎤"
    },
    {
      name: "Priya Sharma",
      role: "Podcast Creator",
      project: "Weekly Podcast Series",
      rating: 5,
      text: "Booked a podcast shoot — the vibe and quality were next-level. Moon Production made our podcast sound professional and the video quality exceeded our expectations. Highly recommended!",
      avatar: "🎧"
    },
    {
      name: "DJ Rohit",
      role: "Music Producer",
      project: "Album Production",
      rating: 5,
      text: "Moon Production helped me find my true sound. Working with their team was an amazing experience. The acoustic treatment and equipment quality is unmatched in West Delhi.",
      avatar: "🎵"
    },
    {
      name: "Sneha Gupta",
      role: "Voice Artist",
      project: "Commercial Dubbing",
      rating: 5,
      text: "Professional dubbing services at its finest! The sound isolation and recording quality is perfect for voiceover work. The team understands the nuances of voice recording really well.",
      avatar: "🎙️"
    },
    {
      name: "Band Echoes",
      role: "Rock Band",
      project: "Single Recording",
      rating: 5,
      text: "From recording to final mastering, everything was handled with utmost professionalism. The live room acoustics are perfect for band recordings. Will definitely be back for our next album!",
      avatar: "🎸"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-studio-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient">WHAT OUR</span>
            <br />
            <span className="text-foreground">CLIENTS SAY</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what artists and creators say about their experience at Moon Production.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="glass-effect border-primary/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="relative">
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-primary/30 absolute -top-2 -left-2" />
                
                {/* Current Testimonial */}
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <div className="font-heading text-xl text-foreground">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-primary font-medium">
                        {testimonials[currentIndex].role}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].project}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="hover-glow transition-bounce"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-studio ${
                    index === currentIndex 
                      ? 'bg-primary shadow-lg' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="hover-glow transition-bounce"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Instagram Feed Section */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-6">
            🎬 Follow Our Journey
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Follow us on Instagram for behind-the-scenes content, live sessions, and the latest from our studio.
          </p>
          
          {/* Instagram Grid Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="glass-effect border-primary/20 aspect-square hover-glow transition-studio group cursor-pointer">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-xs text-muted-foreground">Instagram Post {item}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            size="lg" 
            className="studio-glow hover-glow transition-bounce"
            onClick={() => window.open('https://instagram.com/moonstudiodelhi', '_blank')}
          >
            📱 Follow @moonstudiodelhi
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Clock, Star } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "Industry Experience",
      description: "5+ Years of professional music production",
      stat: "500+"
    },
    {
      icon: Users,
      title: "Happy Clients",
      description: "Artists, creators, and brands trust us",
      stat: "200+"
    },
    {
      icon: Clock,
      title: "Studio Hours",
      description: "Available 7 days a week for your convenience",
      stat: "24/7"
    },
    {
      icon: Star,
      title: "Projects Completed",
      description: "From singles to full albums and podcasts",
      stat: "1000+"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl mb-6">
                <span className="text-gradient">About</span>
                <br />
                <span className="text-foreground">MOON PRODUCTION</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Moon Production is not just a studio — it's a space where creativity flows.
                  We're based in Delhi and offer end-to-end audio and visual production: from vocal recording 
                  and music production to podcasts, voiceovers, and music videos.
                </p>
                <p>
                  Our acoustic-treated rooms, pro-grade equipment, and collaborative vibe make us the 
                  go-to studio for upcoming and professional artists alike.
                </p>
                <p className="text-primary font-medium">
                  Join us and let's make your next project unforgettable.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="studio-glow hover-glow transition-bounce">
                Schedule a Tour
              </Button>
              <Button variant="outline" size="lg" className="hover-glow transition-bounce">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Stats Side */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card 
                  key={index}
                  className="glass-effect hover-glow transition-studio p-6 text-center group border-primary/20"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-studio">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-heading text-primary mb-1">
                        {achievement.stat}
                      </div>
                      <div className="font-medium text-foreground mb-2">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-8">
            Our Expert Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Ashwani Malik", role: "Lead Producer", specialty: "Composer" },
              { name: "Alok Manchal", role: "Sound Engineer", specialty: "Mixing & Mastering, Visual Content and Lyricist" },
              { name: "Rahul Sharma", role: "Producer", specialty: "Music Production" }
            ].map((member, index) => (
              <Card key={index} className="glass-effect hover-glow transition-studio border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    🎵
                  </div>
                  <h4 className="font-heading text-lg text-foreground mb-1">{member.name}</h4>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
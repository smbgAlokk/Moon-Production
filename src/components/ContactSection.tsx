import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 9876543210",
      description: "Available 9 AM - 9 PM",
      action: "tel:+919876543210"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@moonproduction.com",
      description: "We reply within 24 hours",
      action: "mailto:hello@moonproduction.com"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Connaught Place, New Delhi",
      description: "Delhi 110001, India",
      action: "https://maps.google.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+91 9876543210",
      description: "Quick responses guaranteed",
      action: "https://wa.me/919876543210"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient">GET IN</span>
            <br />
            <span className="text-foreground">TOUCH</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for bookings, collaborations, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">
                  <Send className="w-6 h-6 inline-block mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, requirements, or any questions you have..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full studio-glow hover-glow transition-bounce"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={index} 
                  className="glass-effect hover-glow transition-studio border-primary/20 group cursor-pointer"
                  onClick={() => window.open(item.action, '_blank')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-studio">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          {item.info}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Business Hours */}
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-foreground">
                  <Clock className="w-5 h-5 inline-block mr-2" />
                  Studio Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-primary">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-primary">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-primary">12:00 PM - 6:00 PM</span>
                </div>
                <div className="text-sm text-muted-foreground pt-2 border-t border-border/50">
                  * Extended hours available by appointment
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="glass-effect border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <h3 className="font-heading text-lg text-foreground mb-2">
                  🚨 Urgent Booking?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need a same-day session? Call our emergency line
                </p>
                <Button 
                  className="w-full studio-glow animate-pulse-glow"
                  onClick={() => window.open('tel:+919876543210', '_blank')}
                >
                  📞 Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-16">
          <Card className="glass-effect border-primary/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-heading text-foreground mb-2">
                    Moon Production Studio
                  </p>
                  <p className="text-muted-foreground">
                    Connaught Place, New Delhi - 110001
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4 hover-glow"
                    onClick={() => window.open('https://maps.google.com', '_blank')}
                  >
                    View on Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
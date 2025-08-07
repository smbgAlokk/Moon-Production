import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const services = [
    "Music Production",
    "Vocal Recording",
    "Mixing & Mastering",
    "Podcast Recording",
    "Voice Dubbing",
    "Video Production"
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Booking", href: "#booking" },
    { name: "Contact", href: "#contact" },
    { name: "Portfolio", href: "#" },
    { name: "Blog", href: "#" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/moonstudiodelhi", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/moonproduction", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com/@moonproduction", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/moonproduction", label: "Twitter" }
  ];

  return (
    <footer className="bg-studio-dark border-t border-border/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center studio-glow">
                <span className="text-primary-foreground text-xl">🌙</span>
              </div>
              <div>
                <h3 className="font-heading text-xl text-gradient">
                  MOON PRODUCTION
                </h3>
                <p className="text-sm text-muted-foreground">
                  Where Music Meets Magic
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional recording studio in Delhi offering music production, 
              vocal recording, mixing, mastering, and video production services.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                +91 8528934948 (Primary)
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                +91 6392772903 (Secondary)
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                Contactus.moonstudio@gmail.com
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Dwarka, New Delhi
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-muted-foreground hover:text-primary transition-studio text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-studio text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-6">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for studio updates, tips, and exclusive offers.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input 
                  placeholder="Your email" 
                  className="rounded-r-none border-r-0 bg-background/50"
                />
                <Button className="rounded-l-none studio-glow">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="border-t border-border/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/50 rounded-full hover:bg-primary/20 transition-studio group"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-studio" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>© 2025 Moon Production. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-studio">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-studio">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <div>
              <h5 className="font-heading text-lg text-foreground">🚨 Need Urgent Studio Time?</h5>
              <p className="text-sm text-muted-foreground">
                Call our 24/7 emergency booking line for same-day sessions
              </p>
            </div>
            <Button 
              className="studio-glow animate-pulse-glow whitespace-nowrap"
              onClick={() => window.open('tel:+918528934948', '_blank')}
            >
              📞 Emergency Booking (Primary)
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
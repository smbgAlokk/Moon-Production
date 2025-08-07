import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Services & Pricing", href: "/services-pricing", isExternal: true },
    { name: "About", href: "#about" },
    { name: "Booking", href: "#booking" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-studio ${
      isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center studio-glow">
              <span className="text-primary-foreground font-heading text-xl">🌙</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-heading text-base sm:text-lg md:text-xl lg:text-2xl text-gradient truncate">
                MOON PRODUCTION
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Where Music Meets Magic
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-studio font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-studio font-medium"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover-glow text-xs xl:text-sm px-2 xl:px-3"
              onClick={() => window.open('tel:+918528934948', '_blank')}
            >
              <Phone className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Call Now</span>
              <span className="xl:hidden">Call</span>
            </Button>
            {user ? (
              <div className="flex items-center space-x-1 xl:space-x-2">
                <Button size="sm" className="studio-glow animate-pulse-glow text-xs xl:text-sm px-2 xl:px-3" asChild>
                  <Link to="/booking">
                    <span className="hidden xl:inline">🎙️ Book Session</span>
                    <span className="xl:hidden">🎙️ Book</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={signOut} className="text-xs xl:text-sm px-2 xl:px-3">
                  <LogOut className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
                  <span className="hidden xl:inline">Sign Out</span>
                  <span className="xl:hidden">Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 xl:space-x-2">
                <Button variant="outline" size="sm" asChild className="text-xs xl:text-sm px-2 xl:px-3">
                  <Link to="/auth">
                    <User className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
                    <span className="hidden xl:inline">Sign In</span>
                    <span className="xl:hidden">In</span>
                  </Link>
                </Button>
                <Button size="sm" className="studio-glow animate-pulse-glow text-xs xl:text-sm px-2 xl:px-3" asChild>
                  <Link to="/booking">
                    <span className="hidden xl:inline">🎙️ Book Session</span>
                    <span className="xl:hidden">🎙️ Book</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-studio"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-border/50 mt-2 rounded-lg p-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.isExternal ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-primary transition-studio font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-studio font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('tel:+918528934948', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                {user ? (
                  <>
                    <Button size="sm" className="w-full studio-glow" asChild>
                      <Link to="/booking">🎙️ Book Session</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/auth">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full studio-glow" asChild>
                      <Link to="/booking">🎙️ Book Session</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
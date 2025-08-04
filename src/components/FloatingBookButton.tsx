import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingBookButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <Button
        size="lg"
        className="studio-glow animate-pulse-glow shadow-2xl hover-glow transition-bounce rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
        asChild
      >
        <Link to="/booking">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Book Now</span>
          <span className="sm:hidden">Book</span>
        </Link>
      </Button>
    </div>
  );
};

export default FloatingBookButton;
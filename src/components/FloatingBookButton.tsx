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
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="studio-glow animate-pulse-glow shadow-2xl hover-glow transition-bounce rounded-full px-6 py-3"
        asChild
      >
        <Link to="/booking">
          <Calendar className="w-5 h-5 mr-2" />
          Book Now
        </Link>
      </Button>
    </div>
  );
};

export default FloatingBookButton;
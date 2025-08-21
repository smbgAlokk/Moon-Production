import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Play, Image, Video } from "lucide-react";
import { Link } from "react-router-dom";

const ScheduleTourPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const studioRooms = [
    {
      name: "Vocal Booth",
      description: "Professional vocal recording with acoustic treatment",
      features: ["Neumann U87", "SSL Console", "Acoustic Panels"]
    },
    {
      name: "Live Room",
      description: "Full band recording space with natural acoustics", 
      features: ["Steinway Piano", "Full Drum Kit", "Amp Collection"]
    },
    {
      name: "Control Room",
      description: "Mixing and mastering suite with premium monitors",
      features: ["Pro Tools HDX", "Genelec Monitors", "Outboard Gear"]
    },
    {
      name: "Lounge Area",
      description: "Comfortable space for artists to relax and create",
      features: ["Creative Corner", "Coffee Station", "Inspiration Wall"]
    }
  ];

  return (
    <div className="min-h-screen bg-studio-dark relative overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, hsl(var(--studio-fuchsia) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, hsl(var(--studio-purple) / 0.15) 0%, transparent 50%),
              linear-gradient(135deg, hsl(var(--studio-dark)) 0%, hsl(var(--studio-charcoal)) 100%)
            `
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="studio-glow hover:scale-105 transition-transform duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl mb-6 leading-tight">
            <span className="text-gradient">Schedule</span>
            <br />
            <span className="text-studio-light">Your Studio Tour</span>
          </h1>
          <p className="text-xl text-studio-muted max-w-2xl mx-auto mb-8">
            Experience our world-class facilities and see why artists choose Moon Production
          </p>
          
          {/* Intro Video Placeholder */}
          <motion.div 
            className="relative max-w-4xl mx-auto mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect border-studio-fuchsia/30">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-studio-charcoal to-studio-dark rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Button size="lg" className="studio-glow hover:scale-105 transition-transform duration-200 z-10">
                    <Play className="w-6 h-6 mr-2" />
                    Watch Studio Tour
                  </Button>
                </div>
                <p className="text-sm text-studio-muted mt-4">
                  30-second walkthrough of our premium facilities
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-effect border-studio-fuchsia/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CalendarIcon className="w-6 h-6 text-studio-fuchsia" />
                  <h2 className="text-2xl font-heading text-studio-light">Select Date & Time</h2>
                </div>
                
                <div className="space-y-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-studio-fuchsia/20"
                    disabled={(date) => date < new Date()}
                  />
                  
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-studio-fuchsia" />
                        <h3 className="text-lg font-medium text-studio-light">Available Times</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={`transition-all duration-150 ${
                              selectedTime === time 
                                ? 'bg-studio-fuchsia hover:bg-studio-fuchsia/80' 
                                : 'hover:bg-studio-fuchsia/10 hover:border-studio-fuchsia/50 hover:scale-[1.02]'
                            }`}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass-effect border-studio-purple/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-studio-purple" />
                    <h3 className="text-lg font-medium text-studio-light">Studio Location</h3>
                  </div>
                  <p className="text-studio-muted mb-2">Moon Production Studio</p>
                  <p className="text-studio-muted">Delhi, India</p>
                  <Badge variant="outline" className="mt-3 border-studio-purple/50 text-studio-purple">
                    Free Parking Available
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Studio Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="space-y-6">
              {studioRooms.map((room, index) => (
                <div
                  key={room.name}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <Card className="glass-effect border-studio-fuchsia/20 hover:border-studio-fuchsia/40 transition-all duration-200 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-studio-fuchsia/20 to-studio-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-studio-fuchsia/30 group-hover:to-studio-purple/30 transition-all duration-200">
                          <Image className="w-8 h-8 text-studio-fuchsia" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading text-studio-light mb-2">{room.name}</h3>
                          <p className="text-studio-muted mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature) => (
                              <Badge 
                                key={feature}
                                variant="outline" 
                                className="border-studio-fuchsia/50 text-studio-fuchsia text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Placeholder for Room Photo */}
                      <div className="mt-4 aspect-video bg-gradient-to-br from-studio-charcoal to-studio-dark rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-12 h-12 text-studio-fuchsia/50" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Confirm Booking CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button 
            size="lg" 
            className="studio-glow hover:scale-105 transition-transform duration-200 px-12 py-6 text-lg"
            disabled={!selectedDate || !selectedTime}
          >
            <CalendarIcon className="w-6 h-6 mr-3" />
            Confirm Your Tour
          </Button>
          {selectedDate && selectedTime && (
            <motion.p 
              className="mt-4 text-studio-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Tour scheduled for {selectedDate.toDateString()} at {selectedTime}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleTourPage;
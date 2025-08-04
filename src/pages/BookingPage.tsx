import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, ArrowLeft, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const { toast } = useToast();

  const services = [
    { id: "music-production", name: "Music Production", price: 2500 },
    { id: "voice-dubbing", name: "Voice Dubbing", price: 1500 },
    { id: "mixing-mastering", name: "Mixing & Mastering", price: 2000 },
    { id: "vocal-recording", name: "Vocal Recording", price: 1200 },
    { id: "podcast-video", name: "Podcast & Video Shooting", price: 3000 },
    { id: "vocal-chain", name: "Vocal Chain Setup", price: 1800 },
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const addOns = [
    { id: "video-shoot", name: "Video Shoot", price: 1500 },
    { id: "extra-mixing", name: "Additional Mixing", price: 800 },
    { id: "mastering", name: "Professional Mastering", price: 1000 },
    { id: "backup-vocals", name: "Backup Vocals Recording", price: 1200 },
  ];

  const calculateTotal = () => {
    const servicePrice = services.find(s => s.id === selectedService)?.price || 0;
    const durationMultiplier = duration ? parseInt(duration) : 1;
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    return (servicePrice * durationMultiplier) + addOnPrice;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !duration || !clientName || !clientEmail || !clientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to complete your booking.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Submitted! 🎉",
      description: "We'll contact you within 24 hours to confirm your session.",
    });

    // Reset form
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setDuration("");
    setSelectedAddOns([]);
    setNotes("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="studio-gradient"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="glass-effect hover-glow">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-4">
              <span className="text-gradient">🎙️ Book Your Session</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to create something amazing? Fill out the details below and let's bring your vision to life.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="glass-effect border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-gradient">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter your full name"
                        className="glass-effect mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="glass-effect mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="glass-effect mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Selection */}
              <Card className="glass-effect border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-gradient">Service & Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Select Service *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger className="glass-effect mt-1">
                        <SelectValue placeholder="Choose your service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - ₹{service.price}/hour
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Select Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal glass-effect mt-1",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Select Time *</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="glass-effect mt-1">
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Duration (Hours) *</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="glass-effect mt-1">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Hour</SelectItem>
                        <SelectItem value="2">2 Hours</SelectItem>
                        <SelectItem value="3">3 Hours</SelectItem>
                        <SelectItem value="4">4 Hours</SelectItem>
                        <SelectItem value="6">6 Hours</SelectItem>
                        <SelectItem value="8">8 Hours (Full Day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card className="glass-effect border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-gradient">Add-on Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOns.map((addOn) => (
                      <div key={addOn.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={addOn.id}
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                        />
                        <Label htmlFor={addOn.id} className="flex-1 cursor-pointer">
                          {addOn.name} (+₹{addOn.price})
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="glass-effect border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-gradient">Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your project, special requirements, or any questions..."
                    className="glass-effect min-h-[100px]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-effect border-0 shadow-2xl sticky top-24">
                <CardHeader>
                  <CardTitle className="text-gradient">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedService && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span className="text-primary font-medium">
                          {services.find(s => s.id === selectedService)?.name}
                        </span>
                      </div>
                      {selectedDate && (
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{format(selectedDate, "MMM dd, yyyy")}</span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{selectedTime}</span>
                        </div>
                      )}
                      {duration && (
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{duration} hour(s)</span>
                        </div>
                      )}
                      {selectedAddOns.length > 0 && (
                        <div>
                          <span className="font-medium">Add-ons:</span>
                          {selectedAddOns.map(addOnId => {
                            const addOn = addOns.find(a => a.id === addOnId);
                            return (
                              <div key={addOnId} className="flex justify-between text-sm">
                                <span>• {addOn?.name}</span>
                                <span>+₹{addOn?.price}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">₹{calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <Button 
                      onClick={handleBooking}
                      className="w-full studio-glow hover-glow text-lg py-6"
                      size="lg"
                    >
                      💳 Pay & Book Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full glass-effect hover-glow"
                      asChild
                    >
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Us
                      </a>
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground mt-4">
                    <p>• 50% advance payment required to confirm booking</p>
                    <p>• Free cancellation up to 24 hours before session</p>
                    <p>• All rates are inclusive of studio time and basic equipment</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;
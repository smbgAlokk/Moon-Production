import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, DollarSign, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingSection = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const services = [
    { id: "recording", name: "Vocal Recording", price: 2000 },
    { id: "production", name: "Music Production", price: 5000 },
    { id: "mixing", name: "Mixing & Mastering", price: 3000 },
    { id: "podcast", name: "Podcast Recording", price: 1500 },
    { id: "dubbing", name: "Voice Dubbing", price: 2500 },
    { id: "video", name: "Video Shoot", price: 4000 }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const addOnOptions = [
    { id: "video-shoot", name: "Video Shoot Add-on", price: 2000 },
    { id: "extra-mixing", name: "Additional Mixing", price: 1000 },
    { id: "mastering", name: "Professional Mastering", price: 1500 },
    { id: "backup-vocals", name: "Backup Vocals", price: 1200 }
  ];

  const calculateTotal = () => {
    const servicePrice = services.find(s => s.id === selectedService)?.price || 0;
    const durationMultiplier = parseInt(duration) || 1;
    const addOnTotal = addOns.reduce((total, addOnId) => {
      const addOn = addOnOptions.find(ao => ao.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    
    return (servicePrice * durationMultiplier) + addOnTotal;
  };

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Submitted!",
      description: "We'll contact you shortly to confirm your session.",
    });
  };

  return (
    <section id="booking" className="py-20 bg-studio-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient">BOOK YOUR</span>
            <br />
            <span className="text-foreground">STUDIO SESSION</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to create something amazing? Book your session now and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">
                  <Calendar className="w-6 h-6 inline-block mr-2" />
                  Studio Booking Form
                </CardTitle>
                <CardDescription>
                  Fill in the details below to book your studio session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
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

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
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

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours) *</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 8].map((hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} hour{hours > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Add-ons */}
                <div className="space-y-2">
                  <Label>Add-ons (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {addOnOptions.map((addOn) => (
                      <div 
                        key={addOn.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-studio ${
                          addOns.includes(addOn.id) 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleAddOnToggle(addOn.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{addOn.name}</span>
                          <span className="text-sm text-primary">₹{addOn.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Special Requirements / Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes for your session..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-heading text-foreground">
                  <DollarSign className="w-5 h-5 inline-block mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="text-primary font-medium">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    {duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{duration} hour{parseInt(duration) > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{selectedTime}</span>
                      </div>
                    )}
                  </div>
                )}

                {addOns.length > 0 && (
                  <div className="border-t border-border/50 pt-3">
                    <div className="text-sm font-medium mb-2">Add-ons:</div>
                    {addOns.map(addOnId => {
                      const addOn = addOnOptions.find(ao => ao.id === addOnId);
                      return (
                        <div key={addOnId} className="flex justify-between text-sm">
                          <span>{addOn?.name}</span>
                          <span>₹{addOn?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="border-t border-border/50 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full studio-glow hover-glow transition-bounce"
                  onClick={handleBooking}
                  size="lg"
                >
                  💳 Pay & Book Now
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure payment • 100% refundable within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-heading text-lg mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about our services or booking?
                </p>
                <Button variant="outline" className="w-full hover-glow">
                  📱 WhatsApp Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
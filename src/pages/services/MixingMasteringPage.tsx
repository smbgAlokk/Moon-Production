import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sliders, Volume2, Award, Music } from "lucide-react";
import { Link } from "react-router-dom";

const MixingMasteringPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a service request.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const requestData = {
      user_id: user.id,
      service_type: "Mixing & Mastering",
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      project_title: formData.get("projectTitle") as string,
      project_description: formData.get("projectDescription") as string,
      budget_range: formData.get("budgetRange") as string,
      timeline: formData.get("timeline") as string,
      additional_notes: formData.get("additionalNotes") as string,
    };

    const { error } = await supabase
      .from("service_requests")
      .insert([requestData]);

    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request submitted successfully!",
        description: "We'll review your tracks and get back to you with a detailed quote.",
      });
      navigate("/");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sliders className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Mixing & Mastering</h1>
                  <p className="text-muted-foreground">Professional audio post-production</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sliders className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Professional Mixing</h4>
                    <p className="text-sm text-muted-foreground">Balance, EQ, compression, and effects</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Volume2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Mastering Services</h4>
                    <p className="text-sm text-muted-foreground">Final polish for streaming and radio</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-muted-foreground">Unlimited revisions until satisfied</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Music className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Multiple Formats</h4>
                    <p className="text-sm text-muted-foreground">Delivery in WAV, MP3, and streaming formats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Mixing & Mastering</CardTitle>
              <CardDescription>
                Send us your tracks and we'll provide a custom quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle">Project Title *</Label>
                  <Input id="projectTitle" name="projectTitle" placeholder="e.g., Single Track Mix, Album Mastering" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea 
                    id="projectDescription" 
                    name="projectDescription" 
                    placeholder="Describe your project: number of tracks, genre, current state (rough mix, stems, etc.), specific requirements"
                    className="min-h-[120px]"
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select name="budgetRange">
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-200">Under $200</SelectItem>
                        <SelectItem value="200-500">$200 - $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="over-2000">Over $2,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select name="timeline">
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-days">Within 3 days</SelectItem>
                        <SelectItem value="1-week">Within 1 week</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea 
                    id="additionalNotes" 
                    name="additionalNotes" 
                    placeholder="Reference tracks, specific sound goals, file sharing preferences, etc."
                    className="min-h-[80px]"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MixingMasteringPage;
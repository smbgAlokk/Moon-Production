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
import { ArrowLeft, Radio, Headphones, FileAudio, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PodcastProductionPage = () => {
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
      service_type: "Podcast Production",
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
        description: "We'll contact you to discuss your podcast production needs.",
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
                  <Radio className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Podcast Production</h1>
                  <p className="text-muted-foreground">Complete podcast creation services</p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Radio className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Recording & Setup</h4>
                    <p className="text-sm text-muted-foreground">Professional podcast recording and technical setup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileAudio className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Audio Editing</h4>
                    <p className="text-sm text-muted-foreground">Complete post-production and audio enhancement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Headphones className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sound Design</h4>
                    <p className="text-sm text-muted-foreground">Intro/outro music, sound effects, and branding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Distribution Support</h4>
                    <p className="text-sm text-muted-foreground">Help with podcast platform uploads and optimization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Podcast Production</CardTitle>
              <CardDescription>
                Tell us about your podcast and we'll create a production plan
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
                  <Label htmlFor="projectTitle">Podcast Name/Title *</Label>
                  <Input id="projectTitle" name="projectTitle" placeholder="What's your podcast called?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Podcast Description *</Label>
                  <Textarea 
                    id="projectDescription" 
                    name="projectDescription" 
                    placeholder="Tell us about your podcast: topic, format, target audience, episode frequency, number of hosts/guests, etc."
                    className="min-h-[120px]"
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget per Episode</Label>
                    <Select name="budgetRange">
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100">Under $100</SelectItem>
                        <SelectItem value="100-250">$100 - $250</SelectItem>
                        <SelectItem value="250-500">$250 - $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="over-1000">Over $1,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Launch Timeline</Label>
                    <Select name="timeline">
                      <SelectTrigger>
                        <SelectValue placeholder="When do you want to launch?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-months">Within 2 months</SelectItem>
                        <SelectItem value="planning">Still planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Requirements</Label>
                  <Textarea 
                    id="additionalNotes" 
                    name="additionalNotes" 
                    placeholder="Any specific requirements: remote recording needs, existing equipment, branding requirements, distribution preferences, etc."
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

export default PodcastProductionPage;
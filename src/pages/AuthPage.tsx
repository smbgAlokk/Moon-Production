import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Music, ArrowLeft, Eye, EyeOff, Phone, Mail, User, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    description: string;
    show: boolean;
  } | null>(null);
  
  // Add debounce ref to prevent rapid submissions
  const lastSubmissionTime = useRef<number>(0);
  const DEBOUNCE_DELAY = 2000; // 2 seconds
  
  // Add form refs for safer form reset
  const signInFormRef = useRef<HTMLFormElement>(null);
  const signUpFormRef = useRef<HTMLFormElement>(null);
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Reset loading state when tab changes
  useEffect(() => {
    resetLoadingState();
  }, [activeTab]);

  // Cleanup effect to reset loading state on unmount
  useEffect(() => {
    return () => {
      resetLoadingState();
      // Reset debounce timer
      lastSubmissionTime.current = 0;
    };
  }, []);

  // Handle escape key to close alert
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && alertMessage) {
        setAlertMessage(null);
      }
    };

    if (alertMessage) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [alertMessage]);

  const resetLoadingState = () => {
    setIsLoading(false);
  };

  const clearForm = (formRef: React.RefObject<HTMLFormElement>) => {
    if (formRef.current) {
      try {
        formRef.current.reset();
      } catch (error) {
        console.log('Form reset error (non-critical):', error);
        // Clear form fields manually if reset fails
        const inputs = formRef.current.querySelectorAll('input');
        inputs.forEach(input => {
          if (input.type !== 'submit') {
            (input as HTMLInputElement).value = '';
          }
        });
      }
    }
  };

  const showAlert = (type: 'success' | 'error' | 'info', title: string, description: string) => {
    // Clear any existing alert first
    setAlertMessage(null);
    
    // Set new alert after a brief delay to ensure smooth transition
    setTimeout(() => {
      setAlertMessage({ type, title, description, show: true });
      
      // Auto-hide only for error and info messages, not for success
      if (type !== 'success') {
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
      }
    }, 100);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    
    // Check debounce to prevent rapid submissions
    const now = Date.now();
    if (now - lastSubmissionTime.current < DEBOUNCE_DELAY) {
      showAlert('error', '❌ Too Fast', 'Please wait a moment before trying again.');
      return;
    }
    lastSubmissionTime.current = now;
    
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // Basic validation
      if (!email || !email.includes('@')) {
        showAlert('error', '❌ Invalid Email', 'Please enter a valid email address.');
        resetLoadingState();
        return;
      }

      if (!password || password.length < 1) {
        showAlert('error', '❌ Password Required', 'Please enter your password.');
        resetLoadingState();
        return;
      }

      const { error } = await signIn(email, password);

      if (error) {
        // Error is already handled by AuthContext toast
        resetLoadingState();
        return;
      }

      // Success - navigate after a short delay
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error('Sign in error:', error);
      showAlert('error', '❌ Sign In Failed', 'An unexpected error occurred. Please try again.');
      resetLoadingState();
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple submissions
    
    // Check debounce to prevent rapid submissions
    const now = Date.now();
    if (now - lastSubmissionTime.current < DEBOUNCE_DELAY) {
      showAlert('error', '❌ Too Fast', 'Please wait a moment before trying again.');
      return;
    }
    lastSubmissionTime.current = now;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      const fullName = formData.get("fullName") as string;
      const mobileNumber = formData.get("mobileNumber") as string;
      
      // Enhanced validation
      if (!email || !email.includes('@')) {
        showAlert('error', '❌ Invalid Email', 'Please enter a valid email address.');
        resetLoadingState();
        return;
      }
      
      if (!fullName || fullName.trim().length < 2) {
        showAlert('error', '❌ Invalid Name', 'Please enter your full name (at least 2 characters).');
        resetLoadingState();
        return;
      }
      
      if (password !== confirmPassword) {
        showAlert('error', '❌ Password Mismatch', 'Passwords do not match. Please try again.');
        resetLoadingState();
        return;
      }
      
      if (password.length < 6) {
        showAlert('error', '❌ Weak Password', 'Password must be at least 6 characters long.');
        resetLoadingState();
        return;
      }
      
      if (!mobileNumber || mobileNumber.replace(/\D/g, '').length < 10) {
        showAlert('error', '❌ Invalid Mobile Number', 'Please enter a valid mobile number.');
        resetLoadingState();
        return;
      }
      
      const { error } = await signUp(email, password, fullName, mobileNumber);
      
      if (error) {
        const errorMessage = error.message?.toLowerCase() || '';
        
        // Check for email already exists
        if (
          errorMessage.includes('already registered') || 
          errorMessage.includes('already exists') || 
          errorMessage.includes('email already') ||
          errorMessage.includes('user already') ||
          errorMessage.includes('already been') ||
          errorMessage.includes('already in use')
        ) {
          showAlert('info', '📧 Email Already Registered', 'The email you entered is already used. Please sign in with your existing account.');
          setActiveTab("signin");
        } else if (errorMessage.includes('429') || errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
          showAlert('error', '❌ Too Many Requests', 'Please wait a moment before trying again. You\'ve made too many sign-up attempts.');
        } else {
          showAlert('error', '❌ Sign Up Failed', error.message || 'An error occurred during sign up.');
        }
        resetLoadingState();
        return;
      }
      
      // Success
      showAlert('success', '🎉 Welcome to Moon Production!', 'Your account has been created successfully. Please check your email to confirm your account.');
      
      // Safely reset the form using ref
      clearForm(signUpFormRef);
      
      setActiveTab("signin");
      resetLoadingState();
    } catch (error) {
      console.error('Sign up error:', error);
      showAlert('error', '❌ Sign Up Failed', 'An unexpected error occurred. Please try again.');
      resetLoadingState();
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Alert Message Overlay */}
      {alertMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className={cn(
              "relative max-w-md w-full p-6 rounded-2xl shadow-2xl transform transition-all duration-500",
              alertMessage.type === 'success' && "bg-gradient-to-br from-green-500/90 to-green-600/90 text-white ",
              alertMessage.type === 'error' && "bg-gradient-to-br from-red-500/90 to-red-600/90 text-white",
              alertMessage.type === 'info' && "bg-gradient-to-br from-blue-500/90 to-blue-600/90 text-white"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {alertMessage.type === 'success' && <CheckCircle className="w-8 h-8 text-green-100" />}
                {alertMessage.type === 'error' && <AlertCircle className="w-8 h-8 text-red-100" />}
                {alertMessage.type === 'info' && <AlertCircle className="w-8 h-8 text-blue-100" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{alertMessage.title}</h3>
                <p className="text-sm opacity-90 mb-4">{alertMessage.description}</p>
                {alertMessage.type === 'info' && alertMessage.title.includes('Email Already Registered') && (
                  <Button 
                    onClick={() => {
                      setAlertMessage(null);
                      setActiveTab("signin");
                    }}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    size="sm"
                  >
                    🎵 Switch to Sign In
                  </Button>
                )}
                {alertMessage.type === 'success' && (
                  <p className="text-xs opacity-75 mt-2">
                    Click the ✕ button to close this message
                  </p>
                )}
                {alertMessage.type === 'success' && alertMessage.title.includes('Welcome to Moon Production') && (
                  <p className="text-xs opacity-75 mt-2 border-t border-white/20 pt-2">
                    💡 If you don't receive a confirmation email, try logging in with the same email address.
                  </p>
                )}
              </div>
              <button
                onClick={() => setAlertMessage(null)}
                className={cn(
                  "transition-all duration-200 rounded-full p-1",
                  alertMessage.type === 'success' 
                    ? "text-white hover:text-green-100 text-lg font-bold bg-white/20 hover:bg-white/30" 
                    : "text-white/70 hover:text-white"
                )}
                aria-label="Close alert"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center studio-glow">
                  <Music className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading text-gradient">MOON PRODUCTION</h1>
                  <p className="text-sm text-muted-foreground">Where Music Meets Magic</p>
                </div>
              </div>
              
              <Link 
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Auth Card */}
            <Card className="glass-effect border-primary/20 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-heading text-foreground">
                  Welcome to Moon Production
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to your account or create a new one to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="signin" className="text-sm font-medium">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="text-sm font-medium">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-6">
                    <form ref={signInFormRef} onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signin-email"
                            name="email" 
                            type="email" 
                            placeholder="Enter your email"
                            className="pl-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signin-password"
                            name="password" 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full studio-glow hover-glow text-base py-3" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          "🎵 Sign In"
                        )}
                      </Button>
                      {isLoading && (
                        <p className="text-xs text-muted-foreground text-center">
                          Please wait while we authenticate your account...
                        </p>
                      )}
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-6">
                    <form ref={signUpFormRef} onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-name"
                            name="fullName" 
                            type="text" 
                            placeholder="Enter your full name"
                            className="pl-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-mobile" className="text-sm font-medium">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-mobile"
                            name="mobileNumber" 
                            type="tel" 
                            placeholder="+91 XXXXXXXXXX"
                            className="pl-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-email"
                            name="email" 
                            type="email" 
                            placeholder="Enter your email"
                            className="pl-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-password"
                            name="password" 
                            type={showSignUpPassword ? "text" : "password"}
                            placeholder="Create a password (min 6 characters)"
                            className="pl-10 pr-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-confirm-password"
                            name="confirmPassword" 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 glass-effect"
                            required 
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full studio-glow hover-glow text-base py-3" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "🎉 Create Account"
                        )}
                      </Button>
                      {isLoading && (
                        <p className="text-xs text-muted-foreground text-center">
                          Please wait while we create your account...
                        </p>
                      )}
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                By signing up, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span>Need help?</span>
                <a href="tel:+918528934948" className="text-primary hover:underline">📞 Call Us</a>
                <span>or</span>
                <a href="https://wa.me/918528934948" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">📱 WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
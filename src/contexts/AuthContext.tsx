import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, mobileNumber: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  sendPhoneOtp: (phone: string) => Promise<{ error: any }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, mobileNumber: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const attemptSignUp = async (retryCount = 0): Promise<{ error: any }> => {
      try {
        // Add a small delay to prevent rate limiting
        if (retryCount > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
        } else {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
              mobile_number: mobileNumber
            }
          }
        });
        
        if (error) {
          // Check for rate limiting error
          if ((error.message.includes('429') || error.message.includes('rate limit') || error.message.includes('too many requests')) && retryCount < 2) {
            console.log(`Rate limiting detected, retrying... (attempt ${retryCount + 1})`);
            return attemptSignUp(retryCount + 1);
          }
          
          // If it's a rate limit but we've exhausted retries, return a friendly message
          if (error.message.includes('429') || error.message.includes('rate limit') || error.message.includes('too many requests')) {
            return { 
              error: { 
                message: 'Too many sign-up attempts. Please wait a moment before trying again.' 
              } 
            };
          }
          
          // Pass through the original error so the UI can detect cases like "email already registered"
          return { error };
        }
        return { error };
      } catch (error) {
        console.error('Sign up error:', error);
        
        // Handle network or other errors
        if (error instanceof Error) {
          if (error.message.includes('429') || error.message.includes('rate limit')) {
            return { 
              error: { 
                message: 'Too many sign-up attempts. Please wait a moment before trying again.' 
              } 
            };
          }
        }
        
        return { 
          error: { 
            message: 'An unexpected error occurred during sign up. Please try again.' 
          } 
        };
      }
    };
    
    const result = await attemptSignUp();
    
    // Profile is auto-created via DB trigger (public.handle_new_user). No manual upsert here.
    
    return result;
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        toast({
          title: "❌ Google Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return { error };
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "❌ Google Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const sendPhoneOtp = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'sms' },
      });
      if (error) {
        toast({
          title: "❌ OTP Send Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "📲 OTP Sent",
          description: "We sent a 6-digit code via SMS.",
        });
      }
      return { error };
    } catch (error) {
      console.error('Send OTP error:', error);
      toast({
        title: "❌ OTP Send Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
      });
      if (error) {
        toast({
          title: "❌ OTP Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "✅ Verified",
          description: "Phone number verified successfully.",
        });
      }
      return { error };
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast({
        title: "❌ OTP Verification Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "❌ Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "🎵 Welcome Back!",
          description: "You have successfully signed in to Moon Production.",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "❌ Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "❌ Sign Out Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "👋 See You Soon!",
          description: "You have been successfully signed out.",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "❌ Sign Out Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
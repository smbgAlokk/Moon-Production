import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedMicrophone from "./components/AnimatedMicrophone";
import Index from "./pages/Index";
import BookingPage from "./pages/BookingPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import RecordingStudioPage from "./pages/services/RecordingStudioPage";
import MixingMasteringPage from "./pages/services/MixingMasteringPage";
import PodcastProductionPage from "./pages/services/PodcastProductionPage";
import MusicProductionPage from "./pages/services/MusicProductionPage";
import VoiceDubbingPage from "./pages/services/VoiceDubbingPage";
import VocalChainSetupPage from "./pages/services/VocalChainSetupPage";
import ServicesPricingPage from "./pages/ServicesPricingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedMicrophone />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/services/recording-studio" element={<RecordingStudioPage />} />
            <Route path="/services/mixing-mastering" element={<MixingMasteringPage />} />
            <Route path="/services/podcast-production" element={<PodcastProductionPage />} />
            <Route path="/services/music-production" element={<MusicProductionPage />} />
            <Route path="/services/voice-dubbing" element={<VoiceDubbingPage />} />
            <Route path="/services/vocal-chain-setup" element={<VocalChainSetupPage />} />
            <Route path="/services-pricing" element={<ServicesPricingPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

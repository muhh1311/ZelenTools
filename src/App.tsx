// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

// 🏠 General Pages Imports
import Index from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

// 🛠️ Tools Pages Imports
// 👇 1. Yahan humne aapka page import kiya (Note: Agar file name mein space hai to exactly waisa hi likhna parega)
import UniversalConverter from "./pages/ImageTools/Universal Image Converter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <TopBar />
            
            <main className="flex-grow">
              <Routes>
                {/* Main Home Page */}
                <Route path="/" element={<Index />} />
                
                {/* General Information Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* 🚀 Active Tools & Dynamic SEO Routes */}
                {/* 👇 2. Yahan humne tool ka url route set kar diya */}
                <Route path="/convert-image" element={<UniversalConverter />} />
               
              </Routes>
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
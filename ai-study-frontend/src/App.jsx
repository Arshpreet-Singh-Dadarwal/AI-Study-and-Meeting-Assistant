import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyAssistant from "./pages/StudyAssistant";
import MeetingAssistant from "./pages/MeetingAssistant";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";  
import Dashboard from "./pages/Dashboard";
import Protectroute from "./context/Protectroute";
import MeetingRoom from "./pages/MeetingRoom";

const queryClient = new QueryClient();

import { ThemeProvider } from "next-themes";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
          <Routes>
             <Route path="/" element={<Index />} />
          <Route path="/study" element={<StudyAssistant />} />
          <Route path="/meeting" element={<MeetingAssistant />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={
             <Protectroute><Dashboard /></Protectroute>
            } />
            <Route path="/meeting/:roomId" element={<MeetingRoom />} />
          </Routes>
        
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
export default App;

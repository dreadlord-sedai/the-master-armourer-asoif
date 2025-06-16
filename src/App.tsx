
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Houses from "./pages/Houses";
import Armies from "./pages/Armies";
import Characters from "./pages/Characters";
import Chronicles from "./pages/Chronicles";
import Armoury from "./pages/Armoury";
import BattleSimulator from "./pages/BattleSimulator";
import InteractiveMap from "./pages/InteractiveMap";
import CharacterCreator from "./pages/CharacterCreator";
import Tournaments from "./pages/Tournaments";
import Economy from "./pages/Economy";
import Prophecies from "./pages/Prophecies";
import Library from "./pages/Library";
import Stories from "./pages/Stories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/armies" element={<Armies />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chronicles" element={<Chronicles />} />
          <Route path="/armoury" element={<Armoury />} />
          <Route path="/battle-simulator" element={<BattleSimulator />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/create-character" element={<CharacterCreator />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/prophecies" element={<Prophecies />} />
          <Route path="/library" element={<Library />} />
          <Route path="/stories" element={<Stories />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Houses from "./pages/Houses";
import Armies from "./pages/Armies";
import Characters from "./pages/Characters";
import Chronicles from "./pages/Chronicles";
import Armoury from "./pages/Armoury";
import BattleSimulator from "./pages/BattleSimulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/armies" element={<Armies />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chronicles" element={<Chronicles />} />
          <Route path="/armoury" element={<Armoury />} />
          <Route path="/battle-simulator" element={<BattleSimulator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import BrowseJobsPage from "./pages/BrowseJobsPage";
import PostJobPage from "./pages/PostJobPage";
import MyListingsPage from "./pages/MyListingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/browse-jobs" element={<BrowseJobsPage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/my-listings" element={<MyListingsPage />} />
            {/* Placeholder routes */}
            <Route path="/profile" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Company Profile</h1><p className="text-muted-foreground">Configure your company information and branding</p></div>} />
            <Route path="/team" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Team Management</h1><p className="text-muted-foreground">Manage team members and permissions</p></div>} />
            <Route path="/settings" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Account and notification preferences</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

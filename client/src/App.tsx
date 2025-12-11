import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Timeline from "@/pages/Timeline";
import Documents from "@/pages/Documents";
import Journal from "@/pages/Journal";
import Help from "@/pages/Help";
import Assistant from "@/pages/Assistant";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/not-found";
import { useUserStore } from "@/lib/userStore";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();
  const { profile } = useUserStore();

  useEffect(() => {
    if (!profile.isOnboarded && location !== "/onboarding") {
      setLocation("/onboarding");
    }
  }, [profile.isOnboarded, location, setLocation]);

  if (!profile.isOnboarded) {
    return (
      <Switch>
        <Route path="/onboarding" component={Onboarding} />
        {/* Redirect all other paths to onboarding if not onboarded */}
        <Route component={Onboarding} />
      </Switch>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/assistant" component={Assistant} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/documents" component={Documents} />
        <Route path="/journal" component={Journal} />
        <Route path="/help" component={Help} />
        <Route path="/onboarding" component={() => {
             setLocation("/");
             return null;
        }} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

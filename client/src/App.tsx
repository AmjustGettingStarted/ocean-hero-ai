import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

function LenisSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;
    }
    return () => {
      (window as unknown as { __lenis?: typeof lenis }).__lenis = undefined;
    };
  }, [lenis]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.085,
              duration: 1.2,
              smoothWheel: true,
              wheelMultiplier: 1,
              touchMultiplier: 1.8,
            }}
          >
            <LenisSync />
            <Toaster />
            <Router />
          </ReactLenis>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


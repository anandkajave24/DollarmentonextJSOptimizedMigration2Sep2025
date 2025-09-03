import '../styles/globals.css'
import '../client/src/styles/financial-calculators.css'
import '../client/src/styles/money-relationships.css'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "../contexts/ThemeContext";
import { WebSocketProvider } from "../contexts/WebSocketContext";
import { BudgetProvider } from "../contexts/BudgetContext";
import { IncomeExpensesProvider } from "../contexts/IncomeExpensesContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PerformanceMonitor } from "../components/PerformanceMonitor";

// Import WithNavLayout normally to fix hydration
import WithNavLayout from "../client/src/components/WithNavLayout";

// import { Toaster } from "../components/ui/toaster"; // Temporarily removed to fix "N" overlay

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simple loading states and prefetching
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Prefetch critical routes aggressively
    const criticalRoutes = [
      '/financial-calculators', 
      '/learning', 
      '/investment-market-menu',
      '/budget-buddy',
      '/401k-calculator',
      '/mortgage-calculator'
    ];
    criticalRoutes.forEach(route => router.prefetch(route));
    
    // Preload on hover for instant navigation
    const handleMouseOver = (event) => {
      const target = event.target.closest('a');
      if (target && target.href && target.hostname === window.location.hostname) {
        const path = target.pathname;
        router.prefetch(path);
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  // Pages that should NOT have navigation (clean layout)
  const pagesWithoutNav = ['/'];
  
  // Check if current page should have navigation
  const shouldShowNavigation = !pagesWithoutNav.includes(router.pathname);
  
  return (
    <PerformanceMonitor>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>DollarMento - Complete Financial Planning & Calculator Platform USA</title>
          <meta name="description" content="America's most comprehensive financial platform: 45+ calculators, retirement planning, tax optimization, investment tools, budget planners & financial education." />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="true" />
          <link rel="preload" href="/logo.png" as="image" />
          <link rel="preload" href="/financial-calculators" as="document" />
          <link rel="preload" href="/learning" as="document" />
          <link rel="preload" href="/investment-market-menu" as="document" />
          <meta name="theme-color" content="#ffffff" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              `
            }}
          />
        </Helmet>
        
        <ThemeProvider>
          <WebSocketProvider>
            <BudgetProvider>
              <IncomeExpensesProvider>
                {shouldShowNavigation ? (
                  <WithNavLayout>
                    <Component {...pageProps} />
                  </WithNavLayout>
                ) : (
                  <Component {...pageProps} />
                )}
                {/* <Toaster /> */}
              </IncomeExpensesProvider>
            </BudgetProvider>
          </WebSocketProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PerformanceMonitor>
  )
}
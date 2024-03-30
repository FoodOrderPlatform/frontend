import { Outlet, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import { QueryClient, QueryClientProvider } from "react-query";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const location = useLocation();
  const showHero = location.pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <div className="flex min-w-[screen] flex-col justify-center ">
          <Header />
          {showHero && <Hero />}
          <Outlet />
          <Toaster visibleToasts={1} position="top-right" richColors />
          <Footer />
        </div>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  );
}

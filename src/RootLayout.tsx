import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import { QueryClient, QueryClientProvider } from "react-query";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <div className="flex min-w-[screen] flex-col justify-center ">
          <Header />
          <Hero />
          <Outlet />
          <Footer />
        </div>
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  );
}

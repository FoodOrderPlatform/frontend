import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

export default function RootLayout() {
  return (
    <Auth0ProviderWithNavigate>
      <div className="flex min-w-[screen] flex-col justify-center ">
        <Header />
        <Hero />
        <Outlet />
        <Footer />
      </div>
    </Auth0ProviderWithNavigate>
  );
}

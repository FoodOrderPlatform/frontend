import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Hero from "./components/Hero";

export default function RootLayout() {
  return (
    <>
      <div className="flex min-w-[screen] flex-col justify-center ">
        <Header />
        <Hero />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

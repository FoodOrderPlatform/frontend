import { Link } from "react-router-dom";
import NavMobile from "../components/NavMobile";
import MainNav from "../components/MainNav";

export default function Header() {
  return (
    <>
      <div className="flex items-center border-b border-primary py-6">
        <div className="container mx-auto flex flex-1 items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight text-primary"
          >
            Food Ordering Platform
          </Link>
          <div className="md:hidden">
            <NavMobile />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </>
  );
}

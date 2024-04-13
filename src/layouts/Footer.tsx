import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={`flex w-full items-center justify-center bg-primary py-4`}>
      <div className="container mx-auto grid items-center gap-2 md:grid-cols-2">
        <Link
          to="/"
          className="font-bold tracking-tight text-white  hover:text-slate-600"
        >
          Food Ordering Platform
        </Link>
        <Link
          to="/"
          className="justify-self-start text-white hover:text-slate-600 md:justify-self-end"
        >
          @about us
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 my-4 flex w-full items-center justify-center border-t border-orange-500">
      <div className="container mx-auto mt-4 flex flex-1 items-center justify-start">
        <Link to="/" className="font-bold tracking-tight text-orange-500">
          Food Ordering Platform
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="border-primary sticked bottom-0 left-0 flex w-full items-center justify-center border-t py-4">
      <div className="container mx-auto flex flex-1 items-center justify-between">
        <Link to="/" className="text-primary font-bold tracking-tight">
          Food Ordering Platform
        </Link>
        <Link to="/" className="text-primary">
          @about us
        </Link>
      </div>
    </div>
  );
}

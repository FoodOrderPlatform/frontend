import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="my-6 flex items-center border-b border-orange-500 pb-2 ">
        <div className="container mx-auto flex-1 items-center justify-center">
          <Link
            to="/"
            className="justify-self-start text-3xl font-bold tracking-tight text-orange-500"
          >
            Food Ordering Platform
          </Link>
        </div>
      </div>
    </>
  );
}

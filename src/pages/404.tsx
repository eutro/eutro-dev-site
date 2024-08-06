import { useEffect } from "react";
import { SubpageLink } from "../components/Navbar";
import { Link } from "../components/simple";

export default function NotFound({}: {}) {
  useEffect(() => {
    if (!import.meta.env.SSR) {
      document.title = "404 Not Found";
      return () => {
        document.title = "Eutro";
      }
    }
  });

  return (
    <div className="text-center mt-12 p-12">
      <h1 className="inline text-6xl">404</h1>
      <span className="text-2xl ml-3">Not Found</span>
      <div className="mt-2">
        <SubpageLink Link={Link} subpage={0}>Return to main site</SubpageLink>
      </div>
    </div>
  )
}

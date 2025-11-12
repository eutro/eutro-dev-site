import License from "../components/License";
import { Link } from "../components/simple";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-6 px-6 pb-24">
      <hr className="hidden"/>
      <div className="text-center">
        <div className="mb-2">
          © Beatrice Szilvasy 2022-2025, <License license="MIT" inline/>
        </div>
        <div className="mb-2">
          Source available on <Link href="https://github.com/eutro/eutro-dev-site">GitHub</Link>.
        </div>
      </div>
    </footer>
  );
}

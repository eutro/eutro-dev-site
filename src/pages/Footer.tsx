import License from "../components/License";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-6 px-6 pb-24">
      <hr className="hidden"/>
      <div className="text-center">
        <div className="mb-2">
          © Beatrice Szilvasy 2024, <License license="MIT" inline/>
        </div>
      </div>
    </footer>
  );
}

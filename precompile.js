import { renderApp } from "./dist/server/entry-server.js"
import fsp from "node:fs/promises"

async function main(sourceDir, distDir) {
  await fsp.cp(sourceDir, distDir, {
    recursive: true,
  });

  const template = await fsp.readFile(`${sourceDir}/index.html`, {
    encoding: "utf8",
  });
  const [prefix, suffix] = template.split("<!--prerender-html-->");

  async function exportRoute({ loc }) {
    await fsp.mkdir(`${distDir}/${loc}`, { recursive: true });
    await fsp.writeFile(
      `${distDir}/${loc}/index.html`,
      prefix + renderApp({ path: loc }) + suffix
    );
    console.log(`Rendered ${loc}`);
  }

  const allRoutes = [
    { loc: "/" },
    { loc: "games" },
    { loc: "music" },
    { loc: "others" },
  ];

  await Promise.all(allRoutes.map(exportRoute));
}

main("dist/client", "dist/finished")

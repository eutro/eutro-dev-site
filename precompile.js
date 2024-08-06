import { renderApp } from "./dist/server/entry-server.js"
import fsp from "node:fs/promises"
import path from "node:path"

async function main(sourceDir, distDir) {
  await fsp.cp(sourceDir, distDir, {
    recursive: true,
  });

  const template = await fsp.readFile(`${sourceDir}/index.html`, {
    encoding: "utf8",
  });
  const pat = /<!--{{(\w+)}}-->[\s\S]*<!--{{\/\1}}-->/g;

  async function exportRoute({ loc, dst, name, title }) {
    const outFile = path.join(distDir, dst ?? loc, name ?? "index.html");
    const outDir = path.dirname(outFile);
    await fsp.mkdir(outDir, { recursive: true });

    const obj = {
      title: `<title>${title ?? "Eutro"}</title>`,
      get app() { return renderApp({ path: loc }) },
    };
    await fsp.writeFile(outFile, template.replace(pat, (_, name) => obj[name]));
    console.log(`Rendered ${loc}`);
  }

  const allRoutes = [
    { loc: "/", dst: "." },
    { loc: "games" },
    { loc: "music" },
    { loc: "others" },
    { loc: "404.html", dst: ".", name: "404.html", title: "404 Not Found" },
  ];

  await Promise.all(allRoutes.map(exportRoute));
}

main("dist/client", "dist/finished")

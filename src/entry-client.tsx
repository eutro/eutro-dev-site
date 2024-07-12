import { ReactNode, StrictMode } from "react"
import { createRoot, hydrateRoot, Root } from "react-dom/client";

import App from "./pages/App"

function start(container: Element, node: ReactNode) {
  let root: Root;
  if (import.meta.env.PROD) {
    root = hydrateRoot(container, node);
  } else {
    root = createRoot(container);
    root.render(node);
  }
}

start(document.getElementById("root-container")!!,
  <StrictMode>
    <App />
  </StrictMode>
);

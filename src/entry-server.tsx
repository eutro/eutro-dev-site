import { renderToString } from "react-dom/server"
import App from "./pages/App"
import { StrictMode } from "react"

export function renderApp({ path }: { path: string }) {
  return renderToString(
    <StrictMode>
      <App initLocation={{ pathname: path }} />
    </StrictMode>
  );
}

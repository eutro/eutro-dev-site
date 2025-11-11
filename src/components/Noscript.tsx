import { PropsWithChildren, useContext } from "react";
import { IsHydrating } from "./context";

export function NoScript({children}: PropsWithChildren) {
  const isHydrating = useContext(IsHydrating);
  if (isHydrating) {
    return <noscript>{children}</noscript>;
  } else {
    // <noscript> elements can be removed once we are running JS on
    // the client.
    return null;
  }
}

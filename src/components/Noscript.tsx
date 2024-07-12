import { PropsWithChildren, useContext } from "react";
import { IsHydrating } from "./Navbar";

export function NoScript(props: PropsWithChildren<{}>) {
  const isHydrating = useContext(IsHydrating);
  if (isHydrating) {
    return <noscript>{props.children}</noscript>
  } else {
    return null;
  }
}

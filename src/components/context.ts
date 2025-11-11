import { createContext } from "react";

// "do we have to match the SSR content"
export const IsHydrating = createContext(true);
export const SubpageState = createContext({
  subpage: 0,
  setSubpage: (evt: React.MouseEvent<HTMLAnchorElement>, _subpage: number) => {
    void evt; // noop
  },
  tabs: [] as { href: string, title: string }[]
});

import { useEffect, useState } from "react";
import Games from "./Games";
import Home from "./Home";
import OtherThings from "./Misc";
import Music from "./Music";
import Navbar, { IsHydrating } from "../components/Navbar";

const tabs = [
  {
    component: Home,
    title: "Home",
    href: ""
  },
  {
    component: Games,
    title: "Games",
    href: "games"
  },
  {
    component: Music,
    title: "Music",
    href: "music"
  },
  {
    component: OtherThings,
    title: "Other Projects",
    href: "others"
  },
];

export type SubpageLocation = { pathname: string, hash?: string }
export function detectSubpage({pathname, hash}: SubpageLocation) {
  const pageTarget = pathname + (hash?.substring(1) ?? "");
  const idx = tabs.findIndex(({ href }) => href !== "" && pageTarget.includes(href));
  return idx === -1 ? 0 : idx;
}

export default function App({initLocation}: { initLocation?: SubpageLocation }) {
  const [subpage, setSubpageInternal] = useState(() => {
    const page = detectSubpage(initLocation ?? document.location)
    if (!import.meta.env.SSR) {
      history.replaceState(page, "", String(document.location));
    }
    return page;
  });

  const [isHydrating, setHydrating] = useState(true);
  useEffect(() => { setHydrating(false); })

  // we do a little client-side routing
  const setSubpage = (evt: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    setSubpageInternal(page);
    const { href } = evt.currentTarget;
    if (!import.meta.env.SSR) {
      history.pushState(page, href, href);
    }
  };
  useEffect(() => {
    const listener = ({state}: PopStateEvent) => {
      if (typeof state === "number") {
        setSubpageInternal(state)
      }
    };
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, [setSubpageInternal])

  const CurrentTab = tabs[subpage].component;
  return (
    <>
      <IsHydrating.Provider value={isHydrating}>
        <Navbar subpage={subpage} setSubpage={setSubpage} tabs={tabs}/>
        <div className="bg-white dark:bg-slate-800">
          <div className="mx-auto 2xl:max-w-screen-xl xl:max-w-screen-lg lg:max-w-screen-md">
            <CurrentTab/>
          </div>
        </div>
      </IsHydrating.Provider>
    </>
  );
}

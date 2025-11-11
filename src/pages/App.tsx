import { useEffect, useState } from "react";
import Games from "./Games";
import Home from "./Home";
import OtherThings from "./Misc";
import Music from "./Music";
import NotFound from "./404";
import Footer from "./Footer";
import Navbar from "../components/Navbar";
import { IsHydrating, SubpageState } from "../components/context";

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
  }
];

const NotFoundTab = {
  component: NotFound,
  title: "Not Found",
  href: "404.html"
};

export interface SubpageLocation { pathname: string, hash?: string }
function detectSubpage({pathname, hash}: SubpageLocation) {
  let pageTarget = pathname + (hash?.substring(1) ?? "");
  pageTarget = pageTarget.replace(/\//g, "");
  if (!pageTarget) return 0;
  return tabs.findIndex(({ href }) => pageTarget === href);
}

export default function App({initLocation}: { initLocation?: SubpageLocation }) {
  const [subpage, setSubpageInternal] = useState(() => {
    const page = detectSubpage(initLocation ?? document.location);
    if (!import.meta.env.SSR) {
      history.replaceState(page, "", String(document.location));
    }
    return page;
  });

  const [isHydrating, setHydrating] = useState(true);
  // I want to change state after the first time the page is rendered,
  // for which I use an effect (which isn't run in SSR).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrating(false), []);

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
        setSubpageInternal(state);
      }
    };
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, [setSubpageInternal]);

  const tab = tabs[subpage] ?? NotFoundTab;
  const CurrentTab = tab.component;
  return (
    <>
      <IsHydrating.Provider value={isHydrating}>
        <SubpageState.Provider value={{ subpage, setSubpage, tabs }}>
          {tab !== NotFoundTab && <Navbar/>}
          <main className="bg-white dark:bg-slate-800">
            <div className="mx-auto 2xl:max-w-screen-xl xl:max-w-screen-lg lg:max-w-screen-md">
              <CurrentTab/>
            </div>
          </main>
          <Footer/>
        </SubpageState.Provider>
      </IsHydrating.Provider>
    </>
  );
}

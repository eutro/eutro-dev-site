import { createContext, useState } from "react";
import { cc } from "./utils";
import { Icon, MatIcon } from "./simple";

// "do we have to match the SSR content"
export const IsHydrating = createContext(true);

export default function Navbar({tabs, subpage, setSubpage}: {
  tabs: { href: string, title: string }[],
  subpage: number,
  setSubpage: (evt: React.MouseEvent<HTMLAnchorElement>, subpage: number) => void
}) {
  const [burgerActive, setBurgerActive] = useState(false);
  return (
    <div className={cc(
      "bg-gray-100 dark:bg-gray-900 dark:text-white",
      "px-2 flex align-center relative"
    )}>
      <Icon className="w-12 h-12 p-1 my-2 bg-white dark:bg-slate-700 rounded-full">
        <a href="/"><img src="/favicon.ico" title="logo"/></a>
      </Icon>
      <div className={cc(
        "bg-gray-100 dark:bg-gray-900 w-full absolute bottom-0 z-10 flex",
        "flex-col md:flex-row",
        "md:inline-flex",
        "translate-y-full md:translate-y-0",
        "-ml-2 md:ml-0",
        "md:left-14",
        "md:max-h-fit",
        "overflow-hidden transition-[opacity,max-height]",
        burgerActive ? "opacity-100 max-h-[100vh]" : "opacity-0 md:opacity-100 max-h-0"
      )}>
        {tabs.map((tab, i) => (
          <a key={i} href={tab.href} className={cc(
              "p-2 mb-3 md:mt-auto md:rounded-t my-auto md:ml-3 md:mb-0",
              subpage === i
                  ? "bg-white dark:bg-slate-800"
                  : ["bg-teal-200 hover:bg-teal-100",
                      "dark:bg-teal-700 dark:hover:bg-teal-900"],
          )}
            onClick={(evt) => setSubpage(evt, i)}>
            {tab.title}
          </a>
        ))}
      </div>
      <button
        className={cc(
          "w-12 h-12 my-auto cursor-pointer relative ml-auto inline-flex align-center justify-center",
          "md:hidden"
        )}
        onClick={() => setBurgerActive(!burgerActive)}>
        <MatIcon className={cc(
          "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
          burgerActive ? "opacity-0" : "opacity-100",
        )}>menu</MatIcon>
        <MatIcon className={cc(
          "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
          burgerActive ? "opacity-100" : "opacity-0",
        )}>close</MatIcon>
      </button>
    </div>
  );
}


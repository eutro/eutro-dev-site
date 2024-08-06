import { createContext, useContext, useState, ElementType, PropsWithChildren, ComponentProps } from "react";
import { cc } from "./utils";
import { Icon, MatIcon } from "./simple";

// "do we have to match the SSR content"
export const IsHydrating = createContext(true);
export const SubpageState = createContext({
  subpage: 0,
  setSubpage: (_evt: React.MouseEvent<HTMLAnchorElement>, _subpage: number) => {},
  tabs: [] as { href: string, title: string }[]
});

export function SubpageLink<T extends ElementType<{href?: string}, "a">>(
  { Link, children, subpage, ...props }:
  PropsWithChildren<{subpage: number, Link: T} & Omit<ComponentProps<T>, "href" | "onClick">>
) {
  const {tabs, setSubpage} = useContext(SubpageState);
  const AnyLink = Link as any;
  return (
    <AnyLink
      href={"/" + tabs[subpage].href}
      onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => setSubpage(evt, subpage)}
      {...props}>
      {children}
    </AnyLink>
  );
}

export default function Navbar() {
  const [burgerActive, setBurgerActive] = useState(false);
  const {tabs, subpage} = useContext(SubpageState);
  return (
    <div className={cc(
      "bg-gray-100 dark:bg-gray-900 dark:text-white",
      "px-2 flex align-center relative"
    )}>
      <Icon className="w-12 h-12 p-1 my-2 bg-white dark:bg-slate-700 rounded-full">
        <SubpageLink Link="a" subpage={0}><img src="/favicon.ico" title="logo"/></SubpageLink>
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
          <SubpageLink Link="a" key={i} subpage={i} className={cc(
              "p-2 mb-3 md:mt-auto md:rounded-t my-auto md:ml-3 md:mb-0",
              subpage === i
                  ? "bg-white dark:bg-slate-800"
                  : ["bg-teal-200 hover:bg-teal-100",
                      "dark:bg-teal-700 dark:hover:bg-teal-900"],
          )}>
            {tab.title}
          </SubpageLink>
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


import { useContext, useState, ElementType, PropsWithChildren, ComponentProps, Fragment } from "react";
import { cc } from "./utils";
import { Icon, MatIcon } from "./simple";
import { IsHydrating, SubpageState } from "./context";

export function SubpageLink<T extends ElementType<{href?: string}, "a">>(
  { Link, children, subpage, ...props }:
  PropsWithChildren<{subpage: number, Link: T} & Omit<ComponentProps<T>, "href" | "onClick">>
) {
  const {tabs, setSubpage} = useContext(SubpageState);
  // I do not care
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // TODO: it might be worth separating out the desktop and mobile
  // navbar here, it is difficult to reason about if the difference is
  // pure CSS, and also has issues, e.g. tabbing order. The mobile
  // navbar is disabled without JavaScript anyway.

  const [burgerActive, setBurgerActive] = useState(false);
  const {tabs, subpage} = useContext(SubpageState);
  const isHydrating = useContext(IsHydrating);
  return (
    <nav className={cc(
      "bg-gray-100 dark:bg-gray-900 dark:text-white",
      "px-2 flex align-center relative"
    )}>
      <Icon className="w-12 h-12 p-1 my-2 bg-white dark:bg-slate-700 rounded-full">
        <SubpageLink Link="a" subpage={0}><img src="/favicon.ico" title="logo" width="50" height="50"/></SubpageLink>
      </Icon>
      <span className={cc(
        "bg-gray-100 dark:bg-gray-900 w-full absolute bottom-0 z-10 flex",
        isHydrating
          ? "ml-0 left-14 max-h-fit inline-flex flex-row translate-y-0"
          : "translate-y-full flex-col -ml-2 md:ml-0 md:left-14 md:max-h-fit md:inline-flex md:flex-row md:translate-y-0",
        "overflow-hidden transition-[opacity,max-height]",
        burgerActive
          ? "opacity-100 max-h-[100vh]"
          : (isHydrating
            ? "opacity-100"
            : "opacity-0 max-h-0 md:opacity-100")
      )}>
        {tabs.map((tab, i) => (
          <Fragment key={i}>
            <SubpageLink Link="a" subpage={i} className={cc(
              "p-2",
              isHydrating
                ? "mt-auto rounded-t ml-3 mb-0"
                : "mb-3 my-auto md:mt-auto md:rounded-t md:ml-3 md:mb-0",
              subpage === i
                ? "bg-white dark:bg-slate-800"
                : ["bg-teal-200 hover:bg-teal-100",
                  "dark:bg-teal-700 dark:hover:bg-teal-900"],
            )}>
              {tab.title}
            </SubpageLink>
            {i !== tabs.length - 1 && <span className="hidden"> / </span>}
          </Fragment>
        ))}
      </span>
      {!isHydrating &&
        <span
          aria-label="Menu" role="button"
          tabIndex={0}
          onKeyDown={(evt) => {
            if (evt.key === "Enter" || evt.key === " ") {
              setBurgerActive(!burgerActive);
            }
          }}
          onClick={() => setBurgerActive(!burgerActive)}
          aria-pressed={burgerActive}
          className={cc(
            "w-12 h-12 my-auto cursor-pointer relative ml-auto inline-flex align-center justify-center",
            "md:hidden"
          )}>
          <MatIcon className={cc(
            "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
            burgerActive ? "opacity-0" : "opacity-100",
            // menu
            String.raw`before:content-["\e5d2"]`,
          )}/>
          <MatIcon className={cc(
            "text-[48px] absolute t-0 l-0 transition duration-100 ease-linear",
            burgerActive ? "opacity-100" : "opacity-0",
            // close
            String.raw`before:content-["\e5cd"]`,
          )}/>
        </span>}
      <hr className="hidden"/>
    </nav>
  );
}


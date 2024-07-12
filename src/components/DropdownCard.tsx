import { PropsWithChildren, useContext, useState } from "react";
import { Block, Link } from "./simple";
import { cc } from "./utils";
import { IsHydrating } from "./Navbar";
import { NoScript } from "./Noscript";

function Collapsible(props: PropsWithChildren<{ down: boolean }>) {
  return (
    <>
      <div
        className={cc(
          "collapsible-wrapper",
          !props.down && "collapsed"
        )}>
        <div className="collapsible w-full">
          {props.children}
        </div>
      </div>
      <NoScript>
        <div>
          {props.children}
        </div>
      </NoScript>
    </>
  )
}

export default function DropdownCard(props: PropsWithChildren<{
  title: string,
  icon: React.ElementType<{className: string, down: boolean}>,
  links?: ({url: string, text: string})[]
}>) {
  const isHydrating = useContext(IsHydrating);
  const [down, setDown] = useState(false);

  const Icon = props.icon;
  return (
    <Block>
      <div className="rounded shadow-lg max-w-full">
        <div
          className={cc(
            "bg-teal-300 dark:bg-teal-800 dark:text-white rounded-t flex font-bold",
            !(down || isHydrating) && "rounded-b",
          )}
          aria-label={props.title}
          role="button"
          tabIndex={0}
          onKeyDown={props.children ? ((evt) => {
            if(evt.which === 13 || evt.which === 32) {
              setDown(!down);
              evt.preventDefault();
            }
          }) : undefined}
          onClick={props.children ? (() => setDown(!down)) : undefined}
        >
          <p className="flex-grow align-center py-3 px-4">{props.title}</p>
          <button className="py-3 px-4 flex" aria-label="more options" tabIndex={-1}>
            <Icon className="w-6 h-6" down={down}/>
          </button>
        </div>
        <Collapsible down={down}>
          {props.children &&
              <div
                className={cc(
                "p-6 dark:bg-neutral-800",
                !props.links && "rounded-b"
              )}>
              {props.children}
            </div>}
            {props.links &&
              <footer className="border-slate-300 dark:border-white border-t flex items-stretch rounded-b dark:bg-neutral-800">
                {props.links.map((l, i) => (
                  <Link
                    key={i}
                    className={cc(
                      "p-3",
                      "border-slate-300 dark:border-white border-r last:border-none",
                      "flex justify-center flex-grow",
                      "dark:text-slate-200 dark:hover:text-sky-200"
                    )}
                    href={l.url}
                  >
                    {l.text}
                  </Link>
                ))}
              </footer>}
        </Collapsible>
      </div>
    </Block>
  );
}

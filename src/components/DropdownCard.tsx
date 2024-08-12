import { Fragment, PropsWithChildren, useContext, useState } from "react";
import { Section, Link } from "./simple";
import { cc } from "./utils";
import { IsHydrating } from "./Navbar";
import { NoScript } from "./Noscript";

function Collapsible(props: PropsWithChildren<{ down: boolean }>) {
  const isHydrating = useContext(IsHydrating);
  return (
    <>
      {!isHydrating &&
        <div
          className={cc(
            "collapsible-wrapper",
            !props.down && "collapsed"
          )}>
          <div className="collapsible w-full">
            {props.children}
          </div>
        </div>}
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
    <Section>
      <hr className="hidden"/>
      <div className="rounded shadow-lg max-w-full">
        <h2
          className={cc(
            "bg-teal-300 dark:bg-teal-800 dark:text-white rounded-t flex font-bold",
            !(down || isHydrating) && "rounded-b",
          )}
          aria-label={props.title}
          {...(isHydrating ? {} : {
            role: "button",
            tabIndex: 0,
            onKeyDown: props.children ? ((evt) => {
              if(evt.key === "Enter" || evt.key === " ") {
                setDown(!down);
                evt.preventDefault();
              }
            }) : undefined,
            "aria-pressed": down,
            onClick: props.children ? (() => setDown(!down)) : undefined
          })}
        >
          <span className="flex-grow align-center py-3 px-4">{props.title}</span>
          {" "}
          <span className="py-3 px-4 flex">
            <Icon className="w-6 h-6" down={down}/>
          </span>
        </h2>
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
                  <Fragment key={i}>
                    <Link
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
                    {i !== props.links!!.length - 1 && <span className="hidden"> / </span>}
                  </Fragment>
                ))}
              </footer>}
        </Collapsible>
      </div>
    </Section>
  );
}

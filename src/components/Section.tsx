import { ReactNode } from "react";

export default function Section(props: { title: string, children?: ReactNode }) {
  return (
    <div className="p-12 pb-0 last:pb-12">
      <h1 className="text-3xl text-slate-700 dark:text-slate-100 font-bold mb-6">
        {props.title}
      </h1>
      {props.children}
    </div>
  )
}

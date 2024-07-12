import React, { forwardRef } from 'react'

export type Classes = string | Classes[] | false | undefined | null
function cc0(sb: { v: string, empty: boolean }, cs: Classes) {
  if (!cs) return;
  if (typeof cs === 'string') {
    if (sb.empty) {
      sb.empty = false;
      sb.v = cs;
    } else {
      sb.v += " " + cs;
    }
    return;
  }
  for (const c of cs) {
    cc0(sb, c);
  }
}
export function cc(...cs: Classes[]): string {
  const sb = { v: "", empty: true };
  cc0(sb, cs);
  return sb.v;
}

type IntrinsicsKey = ["div", "span", "p", "h1", "h2", "h3",
 "button", "dl", "ul", "ol", "i", "a", "img"][number]
export type UtilProps<N extends IntrinsicsKey> = React.JSX.IntrinsicElements[N]

export function Util<N extends IntrinsicsKey>(
  what: N,
  props: UtilProps<N>,
  className: string,
  ref?: React.ForwardedRef<unknown>,
) {
  return React.createElement(what, {
    ...props,
    className: cc(className, props.className),
    ref
  });
}

export function mkUtil<N extends IntrinsicsKey>(
  name: string,
  what: N,
  className: string,
) {
  const fwd = forwardRef((props: UtilProps<N>, ref) => Util(what, props, className, ref));
  fwd.displayName = name;
  return fwd;
}

import { mkUtil, UtilProps } from "./utils"

export const Link = mkUtil("Link", "a", "text-sky-500 hover:text-sky-700")
export const Block = mkUtil("Block", "div", "mb-6 last:mb-0")
export function BlockImg(props: UtilProps<"img">) { return <Block><img {...props}/></Block>; }
export function Caption(props: UtilProps<"i">) { return <p className="mb-6 last:mb-0"><i {...props}/></p>; }
export const Icon = mkUtil("Icon", "span", "inline-flex align-center justify-center")
export const MatIcon = mkUtil("MatIcon", "span", "material-icons")

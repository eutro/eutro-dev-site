import { Block, Link } from "./simple"

const LICENSES = {
    "MIT": { "url": "https://opensource.org/licenses/mit-license.php" },
    "CC0": { "url": "http://creativecommons.org/publicdomain/zero/1.0/" },
    "CC BY 4.0": { "url": "https://creativecommons.org/licenses/by/4.0/" },
    "CC BY-SA 4.0": { "url": "https://creativecommons.org/licenses/by-sa/4.0/" },
} as const;

export default function License(props: {
  license: keyof typeof LICENSES | "ARR"
}) {
  if (props.license === "ARR") {
    return <Block>All rights reserved</Block>;
  }
  let license = LICENSES[props.license];
  return (
    <Block>
      License: <Link href={license.url}>{props.license}</Link>
    </Block>
  )
}

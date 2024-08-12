import { Icon } from "./simple";
import { cc, UtilProps } from "./utils";

export function iconOf(url: string, name: string) {
  return function({down, ...props}: UtilProps<"span"> & { down: boolean }) {
    return (
      <Icon {...props}>
        <img
          className={cc(
            "material-icons transition motion-reduce:transition-none duration-500",
            down && "rotate-[360deg]"
          )}
          width="24"
          height="24"
          src={url}
          alt="v"
          aria-label={name}/>
      </Icon>
    )
  };
}

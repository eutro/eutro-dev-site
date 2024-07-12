import { Icon } from "./simple";
import { cc, UtilProps } from "./utils";

export default function IconOf(url: string, name: string) {
  return function({down, ...props}: UtilProps<"span"> & { down: boolean }) {
    return (
      <Icon {...props}>
        <img
          className={cc(
            "material-icons transition motion-reduce:transition-none duration-500",
            down && "rotate-[360deg]"
          )}
          src={url}
          alt="arrow_drop_down"
          aria-label={name}/>
      </Icon>
    )
  };
}

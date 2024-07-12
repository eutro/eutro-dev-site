import { Icon, MatIcon } from "./simple";
import { cc, UtilProps } from "./utils";

export default function DefaultIcon({down, ...props}: UtilProps<"span"> & { down: boolean }) {
  return (
    <Icon {...props}>
      <MatIcon
        className={cc(
          "transition motion-reduce:transition-none duration-500",
          down && "-scale-y-100"
        )}>
        arrow_drop_down
      </MatIcon>
    </Icon>
  )
}

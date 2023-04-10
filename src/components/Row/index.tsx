import styles from "./styles.module.scss";
import cn from "classnames";
import { FC, ReactNode } from "react";

type TOuterProps = {
  children: ReactNode;
  className?: string;
  gap?: "sm" | "md" | "lg";
};

const Row: FC<TOuterProps> = ({ gap = "sm", children, className }) => {
  return (
    <div className={cn(styles.container, styles[gap], className)}>
      {children}
    </div>
  );
};

export default Row;

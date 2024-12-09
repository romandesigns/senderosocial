import { twMerge } from "tailwind-merge";
import clsx from "classnames";

type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | Record<string, boolean>
  | ClassValue[];

export const cx = (...classes: ClassValue[]) => twMerge(clsx(...classes));

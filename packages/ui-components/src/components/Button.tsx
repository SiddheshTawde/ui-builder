import { ButtonHTMLAttributes } from "react";
import { FiLoader } from "react-icons/fi";
import { cn } from "../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "link";
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <div className="button-container relative">
      <button
        {...props}
        disabled={props.loading || props.disabled}
        className={cn(
          "button-element ui-px-4 ui-py-2 ui-font-semibold ui-transition-colors",
          {
            "disabled:text-transparent ui-text-indigo-500 hover:ui-bg-indigo-500/5 active:ui-bg-indigo-500/10 disabled:ui-bg-indigo-500/10 disabled:ui-text-transparent/5":
              props.variant === "link",
          },
          {
            "ui-border ui-border-dashed ui-border-indigo-500 ui-text-indigo-500 hover:ui-bg-indigo-500/5 active:ui-bg-indigo-500/10 disabled:ui-border-indigo-500/20 disabled:ui-bg-indigo-500/15 disabled:ui-text-transparent/5":
              props.variant === "outlined",
          },
          {
            "ui-border ui-border-indigo-500 ui-bg-indigo-500/10 ui-text-indigo-500 hover:ui-bg-indigo-500/5 active:ui-bg-indigo-500/20 disabled:ui-border-indigo-500/10 disabled:ui-bg-indigo-500/15 disabled:ui-text-transparent/5":
              props.variant === "contained",
          },
        )}
      >
        {props.children}
      </button>

      {props.loading ? (
        <FiLoader className="ui-absolute ui-bottom-0 ui-left-0 ui-right-0 ui-top-0 ui-z-10 ui-m-auto ui-h-5 ui-w-5 ui-animate-spin ui-text-indigo-500" />
      ) : null}
    </div>
  );
}

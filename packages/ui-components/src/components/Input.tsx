import { InputHTMLAttributes, useMemo, useState } from "react";
import { clsx } from "clsx";
import { generateRandomId } from "../lib/utils";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "number" | "url" | "search";
  loading?: boolean;
  label?: string;
  error?: string;
}

export function Input(props: InputProps) {
  const input_id = useMemo(() => generateRandomId(8), []);
  return (
    <div className="ui-group ui-flex ui-w-auto ui-flex-col">
      {props.label ? (
        <label
          htmlFor={input_id}
          className={clsx("ui-mb-1 ui-text-sm ui-font-semibold", {
            "ui-text-red-500": props.error,
          })}
        >
          {props.label}
        </label>
      ) : null}

      <div className="ui-relative">
        <input
          {...props}
          id={input_id}
          type={props.type || "text"}
          className={clsx(
            "ui-border ui-bg-transparent ui-px-4 ui-py-2 ui-outline-none focus:ui-ring",
            {
              "ui-border-red-600": props.error,
            },
          )}
          value={props.value}
          onChange={props.onChange}
          disabled={props.loading || props.disabled}
        />
      </div>

      {props.error ? (
        <div className="ui-mt-1 ui-flex ui-items-center ui-gap-2 ui-text-sm ui-text-red-500">
          <ExclamationTriangleIcon className="ui-h-4 ui-w-4" />
          <span>{props.error}</span>
        </div>
      ) : null}
    </div>
  );
}

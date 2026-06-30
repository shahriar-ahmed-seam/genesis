"use client";

import { ReactNode, useState } from "react";

/** Collapsible section with a header. */
export function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.07] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 group"
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--text-faint)] group-hover:text-[var(--text-dim)] transition-colors">
          {title}
        </span>
        <span
          className={`text-[var(--text-faint)] text-xs transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
        >
          ›
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[800px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

/** Labeled slider with live value readout. */
export function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-[var(--text-dim)]">{label}</label>
        <span className="text-xs font-mono text-white tabular-nums">
          {Number.isInteger(step) ? value : value.toFixed(2)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

/** Color swatch + native picker. */
export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-[var(--text-dim)]">{label}</label>
      <div className="flex items-center gap-2.5">
        <span className="text-[0.7rem] font-mono text-[var(--text-faint)] uppercase">
          {value}
        </span>
        <div className="relative w-7 h-7 rounded-lg overflow-hidden ring-1 ring-white/15">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/** Pill toggle. */
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-[var(--text-dim)]">{label}</label>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-colors ${
          checked ? "bg-[var(--accent)]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all ${
            checked ? "left-[21px]" : "left-[3px]"
          }`}
        />
      </button>
    </div>
  );
}

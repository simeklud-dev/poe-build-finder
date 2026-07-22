"use client";

import { useEffect, useRef, useState } from "react";

interface TagsDropdownProps {
  options: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}

export default function TagsDropdown({
  options,
  selected,
  onChange,
  placeholder,
}: TagsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleTag(tag: string) {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag],
    );
  }

  const label = selected.length > 0 ? selected.join(", ") : placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input flex items-center justify-between gap-2 truncate text-left"
        title={label}
      >
        <span className="truncate">{label}</span>
        <span className="shrink-0 text-xs opacity-60">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="panel absolute z-10 mt-1 max-h-56 w-full min-w-[12rem] overflow-y-auto p-2 shadow-lg">
          {options.length === 0 && (
            <p className="px-2 py-1 text-sm text-neutral-500">—</p>
          )}
          {options.map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-white/5"
            >
              <input
                type="checkbox"
                checked={selected.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";

/* "AI-first" actions for a journal entry: copy the raw markdown, or open a
   chat assistant pre-prompted with the entry's public URL. The markdown
   itself is passed down from the server (read from content/journals). */

const assistants = [
  { id: "chatgpt", label: "Open in ChatGPT", buildUrl: (prompt: string) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}` },
  { id: "claude", label: "Open in Claude", buildUrl: (prompt: string) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}` },
  { id: "gemini", label: "Open in Gemini", buildUrl: (prompt: string) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}` },
] as const;

export function AiActions({ markdown, url, title }: { markdown: string; url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const prompt = `Read the journal entry "${title}" at ${url} so I can ask questions about it.`;

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    addEventListener("pointerdown", onPointerDown);
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("pointerdown", onPointerDown);
      removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const copyMarkdown = () => {
    navigator.clipboard?.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copyMarkdown}
        className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 font-secondary text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {copied ? (
          <Check className="size-3.5 text-primary" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        {copied ? "Copied" : "Copy Markdown"}
      </button>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 font-secondary text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Open with
          <ChevronDown
            className={`size-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {menuOpen && (
          <div
            role="menu"
            className="absolute left-0 z-40 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl"
          >
            {assistants.map((assistant) => (
              <a
                key={assistant.id}
                role="menuitem"
                href={assistant.buildUrl(prompt)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {assistant.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Beaker,
  Briefcase,
  Copy,
  FileText,
  Globe,
  Mail,
  MoonStar,
  Search,
  UserRound,
} from "lucide-react";
import { caseStudies, site } from "@/lib/site";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "work",
        label: "Go to Work",
        icon: <Briefcase className="size-4" aria-hidden />,
        keywords: "work projects case studies",
        run: () => {
          router.push("/#work");
          close();
        },
      },
      {
        id: "lab",
        label: "Go to the Lab",
        icon: <Beaker className="size-4" aria-hidden />,
        keywords: "lab experiments math playground",
        run: () => {
          router.push("/#lab");
          close();
        },
      },
      ...caseStudies.map((cs) => ({
        id: `case-${cs.slug}`,
        label: `Read: ${cs.title}`,
        hint: "case study",
        icon: <FileText className="size-4" aria-hidden />,
        keywords: `${cs.title} ${cs.tagline} case study read`,
        run: () => {
          router.push(`/work/${cs.slug}`);
          close();
        },
      })),
      {
        id: "theme",
        label: "Toggle theme",
        hint: resolvedTheme === "dark" ? "to light" : "to dark",
        icon: <MoonStar className="size-4" aria-hidden />,
        keywords: "theme dark light mode toggle",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        },
      },
      {
        id: "email",
        label: copied ? "Copied!" : "Copy email address",
        hint: site.email,
        icon: copied ? (
          <Mail className="size-4" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        ),
        keywords: "email copy contact mail",
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
              close();
            }, 900);
          });
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "new tab",
        icon: <Globe className="size-4" aria-hidden />,
        keywords: "github source code profile",
        run: () => {
          window.open(site.github, "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "new tab",
        icon: <UserRound className="size-4" aria-hidden />,
        keywords: "linkedin profile connect",
        run: () => {
          window.open(site.linkedin, "_blank", "noopener,noreferrer");
          close();
        },
      },
    ],
    [router, close, resolvedTheme, setTheme, copied],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setIndex(0);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onOpenEvent = () => {
      setOpen(true);
      setQuery("");
      setIndex(0);
    };
    addEventListener("keydown", onKey);
    addEventListener("open-command-palette", onOpenEvent);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("open-command-palette", onOpenEvent);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/60 p-4 pt-[18vh] backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && filtered[index]) {
                e.preventDefault();
                filtered[index].run();
              }
            }}
            placeholder="Type a command or search…"
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
            aria-activedescendant={
              filtered[index] ? `cmd-${filtered[index].id}` : undefined
            }
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-secondary text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>
        <ul ref={listRef} role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”
            </li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id} role="option" aria-selected={i === index} id={`cmd-${cmd.id}`}>
              <button
                type="button"
                onClick={cmd.run}
                onMouseEnter={() => setIndex(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === index
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <span className="text-muted-foreground">{cmd.icon}</span>
                <span className="flex-1">{cmd.label}</span>
                {cmd.hint && (
                  <span className="font-secondary text-xs text-muted-foreground">
                    {cmd.hint}
                  </span>
                )}
                {(cmd.id === "github" || cmd.id === "linkedin") && (
                  <ArrowUpRight className="size-3 text-muted-foreground" aria-hidden />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

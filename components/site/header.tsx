"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Command } from "lucide-react";
import { sections, site } from "@/lib/site";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
      <nav
        aria-label="Site"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/#top"
          className="font-secondary text-sm font-medium tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {site.shortName}
          <span aria-hidden className="text-muted-foreground">
            (t)
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={onHome && active === id ? "location" : undefined}
              className={`hidden rounded-md px-2.5 py-1.5 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block ${
                onHome && active === id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open command palette"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 font-secondary text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Command className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">K</span>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

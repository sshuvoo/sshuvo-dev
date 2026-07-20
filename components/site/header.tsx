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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-foreground"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
      <nav
        aria-label="Site"
        className={`mx-auto flex w-full items-center p-4 font-secondary transition-[max-width] duration-500 ease-in-out motion-reduce:transition-none ${
          scrolled ? "max-w-full" : "max-w-5xl sm:px-6"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full border transition-all duration-500 ease-in-out motion-reduce:transition-none ${
            scrolled
              ? "border-transparent bg-transparent"
              : "border-border bg-background/80 p-1.5 shadow-lg backdrop-blur-md"
          }`}
        >
          <Link
            href="/#top"
            className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium tracking-tight text-foreground transition-all duration-500 ease-in-out focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none ${
              scrolled
                ? "border-border bg-background/80 shadow-lg backdrop-blur-md"
                : "border-transparent bg-transparent"
            }`}
          >
            {site.shortName}
            <span aria-hidden className="text-muted-foreground">
              ()
            </span>
          </Link>
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-500 ease-in-out motion-reduce:transition-none ${
              scrolled
                ? "border-border bg-background/80 shadow-lg backdrop-blur-md"
                : "border-transparent bg-transparent"
            }`}
          >
          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={onHome && active === id ? "location" : undefined}
              className={`hidden rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block ${
                onHome && active === id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={`hidden rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block ${
              pathname === "/about"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            About
          </Link>
          <Link
            href="/journal"
            aria-current={pathname.startsWith("/journal") ? "page" : undefined}
            className={`hidden rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block ${
              pathname.startsWith("/journal")
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Journal
          </Link>
          <Link
            href="/problem-solving"
            aria-current={pathname.startsWith("/problem-solving") ? "page" : undefined}
            className={`hidden rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-block ${
              pathname.startsWith("/problem-solving")
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Problem Solving
          </Link>
          <button
            type="button"
            onClick={() => dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open command palette"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Command className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">K</span>
          </button>
          <ThemeToggle />
        </div>
        </div>
      </nav>
    </header>
  );
}

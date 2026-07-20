import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-border relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 border-t px-4 py-20 sm:px-6"
    >
      <Reveal>
        {/* CTA */}
        <h2 className="font-heading text-3xl font-bold tracking-tight">
          The Inbox is Open
        </h2>
        <p className="text-muted-foreground mt-4 max-w-prose text-sm leading-relaxed">
          If you have a challenging project, need help with system
          architecture, or want to collaborate on AI-first products — let&apos;s
          talk.
        </p>
        <p className="text-foreground mt-6 font-mono text-lg font-bold">
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
        </p>

        {/* Footer bar */}
        <div className="border-border font-secondary text-2xs text-muted-foreground mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-bold tracking-widest uppercase">
          <span>
            {site.name} · {site.location}
          </span>
          <div className="flex gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1.5"
            >
              <ExternalLink className="size-3.5" />
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1.5"
            >
              <ExternalLink className="size-3.5" />
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

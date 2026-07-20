import { ArrowUp, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { FooterClock } from "@/components/site/footer-clock";
import { site } from "@/lib/site";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

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
        <a
          href={`mailto:${site.email}`}
          className="group text-foreground mt-6 inline-flex items-center gap-2 font-mono text-lg font-bold hover:underline"
        >
          <Mail className="text-muted-foreground group-hover:text-foreground size-4.5 transition-colors" />
          {site.email}
        </a>

        {/* Signature bar */}
        <div className="border-border mt-16 border-t pt-8">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            {/* Identity as function composition */}
            <p className="font-secondary text-foreground text-sm">
              Saffaullah Shuvo
            </p>

            <div className="flex items-center gap-5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <span aria-hidden className="bg-border h-4 w-px" />
              <a
                href="#top"
                className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 font-secondary text-2xs font-bold tracking-widest uppercase transition-colors"
              >
                Top
                <ArrowUp className="size-3 transition-transform group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="font-secondary text-2xs text-muted-foreground mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-foreground/80 inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="hero-badge-dot"
                style={{ opacity: 1, background: '#22c55e' }}
              />
              Available for work
            </span>
            <span aria-hidden>·</span>
            <span>
              <FooterClock /> in {site.location}
            </span>

          </div>
        </div>
      </Reveal>
    </footer>
  );
}

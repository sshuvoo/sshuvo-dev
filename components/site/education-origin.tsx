import { GraduationCap } from "lucide-react";

// Each line of the proof: a year, the "statement" (math ∩ code), and a
// margin annotation like a textbook proof / code comment.
interface ProofStep {
  n: number;
  year: string;
  statement: React.ReactNode;
  note: string;
  spark?: boolean;
}

const steps: ProofStep[] = [
  {
    n: 1,
    year: "2018",
    statement: (
      <>
        <span className="text-muted-foreground">let</span> foundation{" "}
        <span className="text-muted-foreground">=</span> &#123; calculus,
        linear_algebra, differential_eq &#125;
      </>
    ),
    note: "enrolled · pure abstraction, no code yet",
  },
  {
    n: 2,
    year: "2020",
    statement: (
      <>
        foundation<span className="text-muted-foreground">.map(</span>
        abstraction <span className="text-muted-foreground">⟼</span> execution
        <span className="text-muted-foreground">)</span>
      </>
    ),
    note: "3rd year · two CS courses — first contact",
  },
  {
    n: 3,
    year: "2021",
    statement: (
      <>
        <span className="text-muted-foreground">solve(</span>mathProblems,{" "}
        <span className="text-emerald-400">&quot;C++&quot;</span>
        <span className="text-muted-foreground">)</span>{" "}
        <span className="text-muted-foreground">⟹</span> a proof that{" "}
        <span className="text-emerald-400">runs</span>
      </>
    ),
    note: "4th year · the fixed point where it all converged",
    spark: true,
  },
  {
    n: 4,
    year: "2022",
    statement: (
      <>
        <span className="text-muted-foreground">∴ return</span>{" "}
        SoftwareEngineer
      </>
    ),
    note: "graduated · Q.E.D.",
  },
];

export function EducationOrigin() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header — the credential, always in view */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-muted/30 text-foreground">
            <GraduationCap className="size-4.5" />
          </span>
          <div>
            <h3 className="font-heading text-base leading-tight font-semibold">
              University of Rajshahi
            </h3>
            <p className="font-secondary text-[0.625rem] text-muted-foreground mt-1 font-bold tracking-widest uppercase">
              B.Sc. Applied Mathematics · 2018—2022
            </p>
          </div>
        </div>
        <span className="font-secondary text-2xs text-muted-foreground rounded bg-muted/40 px-2 py-1 font-semibold tracking-wider">
          theorem · origin
        </span>
      </div>

      {/* Claim */}
      <div className="border-b border-border px-6 py-5">
        <p className="font-secondary text-2xs text-muted-foreground font-bold tracking-widest uppercase">
          Claim
        </p>
        <p className="font-secondary text-foreground mt-2 text-sm leading-relaxed">
          <span className="text-muted-foreground">∃</span> a path{" "}
          <span className="font-semibold">P</span> such that{" "}
          <span className="font-semibold">P</span>
          <span className="text-muted-foreground"> : </span>
          PureMathematics <span className="text-muted-foreground">⟶</span>{" "}
          Software
        </p>
      </div>

      {/* Proof body */}
      <div className="px-4 py-5 sm:px-6">
        <p className="font-secondary text-2xs text-muted-foreground mb-4 pl-8 font-bold tracking-widest uppercase">
          Proof.
        </p>

        <ol className="font-secondary space-y-4 text-sm">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group grid grid-cols-[2rem_1fr] items-start gap-x-3"
            >
              {/* Line-number gutter */}
              <span
                className={`pt-0.5 text-right text-xs tabular-nums ${
                  step.spark ? "text-emerald-400" : "text-muted-foreground/50"
                }`}
              >
                {step.n}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`text-2xs shrink-0 rounded px-1.5 py-0.5 font-bold tracking-wider ${
                      step.spark
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {step.year}
                  </span>
                  <span
                    className={`leading-normal ${
                      step.spark ? "text-foreground" : "text-foreground/90"
                    }`}
                  >
                    {step.statement}
                  </span>
                </div>
                <p className="text-muted-foreground/70 mt-1 text-xs">
                  <span className="text-muted-foreground/40">{"// "}</span>
                  {step.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Q.E.D. — ties back to the sshuvo() logo */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-muted/20 px-6 py-5">
        <p className="font-secondary text-foreground flex items-center gap-2 text-sm">
          <span className="flex flex-col items-center leading-none">
            <span className="font-semibold">lim</span>
            <span className="text-2xs text-muted-foreground mt-0.5">
              t→2022
            </span>
          </span>
          <span>
            sshuvo<span className="text-muted-foreground">(t)</span>
          </span>
          <span className="text-muted-foreground">=</span>
          <span className="font-semibold">Software Engineer</span>
        </p>
        <span className="font-secondary text-2xs text-muted-foreground flex items-center gap-2 font-bold tracking-widest uppercase">
          Q.E.D.
          <span className="edu-caret inline-block size-2.5 bg-foreground" />
        </span>
      </div>
    </div>
  );
}

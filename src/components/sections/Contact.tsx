import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, SF_MEETUP_EMAIL_URL } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto flex min-h-[70svh] w-full max-w-5xl flex-col justify-center px-6 pt-16 pb-36 sm:px-10 sm:pt-24 sm:pb-44"
    >
      <Reveal>
        <h2
          id="contact-title"
          className="font-display text-[clamp(3.6rem,8vw,7rem)] leading-[1.02] tracking-[-0.04em]"
        >
          San Francisco,
          <br />
          <span className="italic text-accent">let&apos;s meet.</span>
        </h2>
        <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <p className="max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
            I&apos;m heading to San Francisco for three weeks in January.
            I&apos;m figuring out what to build next and want to spend that time
            with founders who are going after something big.
          </p>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <a
              href={SF_MEETUP_EMAIL_URL}
              className="focus-ring group flex w-fit items-center gap-6 border-b border-ink/50 py-3 text-base"
            >
              Meet me in San Francisco{" "}
              <span
                aria-hidden="true"
                className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="focus-ring py-2 text-sm text-ink/75 underline underline-offset-4"
            >
              Or arrange a call
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

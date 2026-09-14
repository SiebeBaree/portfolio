import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL } from "@/lib/site";

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
          className="max-w-3xl font-display text-[clamp(3.8rem,9vw,7.5rem)] leading-[0.98] tracking-[-0.045em]"
        >
          What are <span className="italic text-accent">you</span>
          <br />
          working on?
        </h2>
        <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-ink/80 sm:text-lg">
            I&apos;d love to meet more people building companies. Send me a
            message. Let&apos;s grab a coffee in Ghent or jump on a call.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="focus-ring group flex w-fit items-center gap-8 border-b border-ink/50 py-3 text-lg"
          >
            Let&apos;s meet{" "}
            <span
              aria-hidden="true"
              className="text-2xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

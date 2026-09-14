import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { PROJECTS } from "@/lib/projects";

const APPS = [
  {
    name: "Umber",
    description:
      "An open source image and video studio. Your API keys, your models.",
    href: "https://umber.s4.nu",
    logo: "/apps/umber-mark.svg",
  },
  {
    name: "anyfmt",
    description:
      "Convert images in your browser. Your files stay on your device.",
    href: "https://anyfmt.xyz",
    logo: "/apps/anyfmt-mark.svg",
  },
  {
    name: "VoilaZaak",
    description:
      "An experiment in using AI agents to build and sell websites for local businesses.",
    href: "https://voilazaak.be",
    logo: "/apps/voilazaak-mark.svg",
  },
];

export default function CurrentApps() {
  const earlier = PROJECTS.filter(
    ({ slug }) => slug !== "enkryptify" && slug !== "coinz",
  );
  return (
    <section
      aria-labelledby="other-work-title"
      className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24"
    >
      <Reveal>
        <h2
          id="other-work-title"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          A few other things I&apos;ve built.
        </h2>
        <div className="mt-10">
          {APPS.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group grid grid-cols-[44px_1fr_24px] items-center gap-x-5 border-b border-ink/15 py-6 sm:grid-cols-[44px_130px_1fr_24px] sm:gap-x-6"
            >
              <Image
                src={app.logo}
                alt=""
                width={40}
                height={40}
                className="col-start-1 row-start-1 row-span-2 h-10 w-10 transition-transform duration-200 group-hover:-rotate-6 sm:row-span-1 sm:row-start-1"
              />
              <span className="col-start-2 row-start-1 font-display text-2xl">
                {app.name}
              </span>
              <span className="col-start-2 row-start-2 mt-1 text-sm leading-relaxed text-ink/75 sm:col-start-3 sm:row-start-1 sm:mt-0">
                {app.description}
              </span>
              <span
                aria-hidden="true"
                className="col-start-3 row-start-1 text-xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 sm:col-start-4"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
        <details className="group mt-10">
          <summary className="focus-ring flex w-fit cursor-pointer list-none items-center gap-4 py-3 text-sm [&::-webkit-details-marker]:hidden">
            Earlier work{" "}
            <span
              aria-hidden="true"
              className="text-lg transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="grid gap-x-10 sm:grid-cols-2">
            {earlier.map((project) => (
              <StoryLink
                key={project.slug}
                href={`/work/${project.slug}`}
                className="focus-ring flex items-center justify-between border-b border-ink/10 py-4 text-sm"
              >
                <span>{project.title}</span>
                <span className="text-ink/60">
                  {project.year}{" "}
                  <span aria-hidden="true" className="ml-3">
                    ↗
                  </span>
                </span>
              </StoryLink>
            ))}
          </div>
        </details>
      </Reveal>
    </section>
  );
}

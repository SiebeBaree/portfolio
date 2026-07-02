"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { EPILOGUE, LINKS } from "@/content/copy";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group mt-8 block cursor-pointer text-left"
      aria-label={`Copy email address ${LINKS.email}`}
    >
      <span className="display block text-[clamp(1.375rem,3.4vw,2.75rem)] text-ink leading-tight transition-colors duration-300 group-hover:text-accent">
        {LINKS.email}
      </span>
      <span className="mt-2 block font-serif text-[0.9375rem] text-muted italic">
        {copied ? (
          <span className="text-accent">{EPILOGUE.copiedHint}</span>
        ) : (
          EPILOGUE.copyHint
        )}
      </span>
    </button>
  );
}

export function Epilogue() {
  return (
    <section id="contact" className="px-6 pt-8 pb-12 md:px-12 md:pt-16">
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-1 items-end gap-x-20 gap-y-16 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h2
              data-reveal
              className="display max-w-[24ch] text-balance text-[clamp(1.875rem,4.2vw,3.5rem)] leading-[1.05] text-ink"
            >
              {EPILOGUE.contactHeading}
            </h2>

            <div data-reveal>
              <CopyEmail />
            </div>

            <div data-reveal className="mt-12 flex gap-8">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                GitHub ↗
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div data-reveal data-delay="0.15" className="max-w-95">
            <Image
              src="/siebe.png"
              alt="Portrait of Siebe Barée"
              width={760}
              height={760}
              className="block h-auto w-full select-none rounded-sm"
            />
            <p className="mt-4 font-serif text-[0.9375rem] text-muted italic">
              {EPILOGUE.signoff}
            </p>
          </div>
        </div>

        <footer className="mt-28 border-line border-t py-8 md:mt-36">
          <p className="font-sans text-[0.8125rem] text-muted">
            © 2026 Siebe Barée
          </p>
        </footer>
      </div>
    </section>
  );
}

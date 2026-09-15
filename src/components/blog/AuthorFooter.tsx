import Image from "next/image";
import StoryLink from "@/components/ui/StoryLink";
import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";
import { CONTACT_EMAIL, SITE_LINKS, SITE_NAME } from "@/lib/site";
import styles from "./author-footer.module.css";

const CONTACT_LINKS = [
  { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", href: SITE_LINKS.linkedin },
  { label: "X", href: SITE_LINKS.x },
  { label: "GitHub", href: SITE_LINKS.github },
];

/** Included by the article page so every post has the same author note. */
export default function AuthorFooter() {
  return (
    <footer className={styles.author}>
      <StoryLink href="/" className={`${styles.identity} focus-ring`}>
        <Image
          src="/portrait.webp"
          alt=""
          width={64}
          height={64}
          sizes="64px"
          className={styles.portrait}
        />
        <span className={styles.name}>{SITE_NAME}</span>
      </StoryLink>
      <p className={styles.bio}>
        I&apos;m a software engineer and founder from Belgium. I built Coinz to{" "}
        {COINZ_STATS.users} users and raised {ENKRYPTIFY_FUNDING} for
        Enkryptify. I&apos;m looking for a co-founder to build my next company
        with.
      </p>
      <nav className={styles.links} aria-label="Contact the author">
        {CONTACT_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("https:") ? "_blank" : undefined}
            rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
            className="focus-ring"
          >
            {label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </footer>
  );
}

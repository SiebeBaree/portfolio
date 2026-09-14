import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { ENKRYPTIFY_FUNDING } from "@/lib/projects";
import styles from "./enkryptify.module.css";

export default function Enkryptify() {
  return (
    <section
      id="work"
      aria-labelledby="enkryptify-title"
      className={styles.section}
    >
      <Reveal>
        <div className={styles.heading}>
          <h2 id="enkryptify-title">
            Enkryptify<span className={styles.dot}>.</span>
          </h2>
          <Image
            src="/apps/enkryptify-mark.svg"
            width={64}
            height={64}
            alt=""
          />
        </div>
        <div className={styles.intro}>
          <div className={styles.copy}>
            <p>
              I founded Enkryptify, a secrets management platform for software
              teams. We raised {ENKRYPTIFY_FUNDING} from VCs and built a product
              with paying customers.
            </p>
            <StoryLink className={styles.link} href="/work/enkryptify">
              More about Enkryptify <span aria-hidden="true">↗</span>
            </StoryLink>
          </div>
          <dl className={styles.funding}>
            <div>
              <dt>VC funding raised</dt>
              <dd>{ENKRYPTIFY_FUNDING}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <figure className={styles.product}>
          <StoryLink
            href="/work/enkryptify"
            className={styles.productLink}
            aria-label="Read the Enkryptify story"
          >
            <Image
              src="/apps/enkryptify-secrets.webp"
              width={1182}
              height={887}
              sizes="(min-width: 1280px) 1080px, 94vw"
              alt="Enkryptify showing which secrets are available across production, development, CI and local environments"
              className={styles.screenshot}
            />
          </StoryLink>
          <figcaption>
            One place for a team&apos;s secrets. Every environment connected.
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

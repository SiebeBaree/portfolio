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
          <div>
            <h2 id="enkryptify-title">Enkryptify</h2>
            <p className="mt-3 text-sm text-ink/75">Founded 2024 · Closed</p>
          </div>
          <Image
            src="/apps/enkryptify-mark.svg"
            width={48}
            height={48}
            alt=""
          />
        </div>
        <div className={styles.body}>
          <div className={styles.copy}>
            <p>
              I founded Enkryptify to help software teams manage their API keys
              and credentials. We raised {ENKRYPTIFY_FUNDING} from VCs and had
              paying customers.
            </p>
            <dl className={styles.metrics}>
              <div>
                <dt>VC funding raised</dt>
                <dd>{ENKRYPTIFY_FUNDING}</dd>
              </div>
            </dl>
            <StoryLink className={styles.link} href="/work/enkryptify">
              Read the story <span aria-hidden="true">↗</span>
            </StoryLink>
          </div>
          <StoryLink
            href="/work/enkryptify"
            className={styles.imageLink}
            aria-label="Read the Enkryptify story"
          >
            <Image
              src="/apps/enkryptify-secrets.webp"
              width={2364}
              height={1774}
              unoptimized
              alt="Enkryptify showing secrets across production, development, CI and local environments"
              className={styles.screenshot}
            />
          </StoryLink>
        </div>
      </Reveal>
    </section>
  );
}

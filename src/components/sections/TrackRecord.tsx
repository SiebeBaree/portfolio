import Image from "next/image";
import coin from "@/assets/logos/coinz.png";
import coinzWebsite from "@/assets/work/coinz-website.webp";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { COINZ_STATS, ENKRYPTIFY_FUNDING } from "@/lib/projects";
import styles from "./track-record.module.css";

export default function TrackRecord() {
  return (
    <section
      id="work"
      aria-labelledby="track-record-title"
      className={styles.section}
    >
      <Reveal>
        <h2 id="track-record-title" className={styles.title}>
          My track record.
        </h2>
        <div className={styles.projects}>
          <article className={styles.project}>
            <div className={styles.heading}>
              <div>
                <h3>Enkryptify</h3>
                <p>Founded 2024 · Closed</p>
              </div>
              <Image
                src="/apps/enkryptify-mark.svg"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <dl className={styles.metrics}>
              <div>
                <dt>Funding raised</dt>
                <dd>{ENKRYPTIFY_FUNDING}</dd>
              </div>
            </dl>
            <p className={styles.description}>
              I founded a company that helped software teams manage their API
              keys and credentials. We raised VC funding and had paying
              customers.
            </p>
            <StoryLink className={styles.link} href="/work/enkryptify">
              More about Enkryptify <span aria-hidden="true">↗</span>
            </StoryLink>
            <StoryLink
              href="/work/enkryptify"
              className={`${styles.imageLink} ${styles.enkryptifyImage}`}
              aria-label="Read the Enkryptify story"
            >
              <Image
                src="/apps/enkryptify-secrets.webp"
                width={2364}
                height={1774}
                unoptimized
                alt="Enkryptify's secrets management dashboard"
                className={styles.screenshot}
              />
            </StoryLink>
          </article>
          <article className={styles.project}>
            <div className={styles.heading}>
              <div>
                <h3>Coinz</h3>
                <p>2022 to 2025 · Closed</p>
              </div>
              <Image src={coin} width={40} height={40} alt="" unoptimized />
            </div>
            <dl className={styles.metrics}>
              <div>
                <dt>users</dt>
                <dd>{COINZ_STATS.users}</dd>
              </div>
              <div>
                <dt>daily active at its peak</dt>
                <dd>{COINZ_STATS.peakDailyActive}</dd>
              </div>
            </dl>
            <p className={styles.description}>
              I built and ran an economy game inside Discord for three years. I
              wrote the game, kept it running and grew its community.
            </p>
            <StoryLink className={styles.link} href="/work/coinz">
              More about Coinz <span aria-hidden="true">↗</span>
            </StoryLink>
            <StoryLink
              href="/work/coinz"
              className={styles.imageLink}
              aria-label="Read the Coinz story"
            >
              <Image
                src={coinzWebsite}
                unoptimized
                alt="The Coinz website, showing an earlier count of 850K users"
                className={styles.screenshot}
              />
            </StoryLink>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

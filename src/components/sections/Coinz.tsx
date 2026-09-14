import Image from "next/image";
import coin from "@/assets/logos/coinz.png";
import coinzWebsite from "@/assets/work/coinz-website.webp";
import Reveal from "@/components/ui/Reveal";
import StoryLink from "@/components/ui/StoryLink";
import { COINZ_STATS } from "@/lib/projects";
import styles from "./coinz.module.css";

export default function Coinz() {
  return (
    <section aria-labelledby="coinz-title" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <h2 id="coinz-title">
            Coinz<span className={styles.dot}>.</span>
          </h2>
          <span className={styles.years}>2022 to 2025</span>
        </div>
        <div className={styles.numbers}>
          <dl className={styles.users}>
            <div>
              <dt>users</dt>
              <dd>{COINZ_STATS.users}</dd>
            </div>
          </dl>
          <div className={styles.coins} aria-hidden="true">
            <Image
              src={coin}
              alt=""
              className={styles.coinBack}
              sizes="200px"
            />
            <Image
              src={coin}
              alt=""
              className={styles.coinFront}
              sizes="280px"
            />
          </div>
        </div>
        <div className={styles.story}>
          <div className={styles.copy}>
            <p>
              I built an entire economy inside Discord. People could trade
              stocks, run businesses, hire each other and play more than 15
              minigames. Coinz grew to 1.35 million users, with 16,000 active in
              a single day at its peak.
            </p>
            <p>
              I spent three years building it, running the infrastructure and
              growing the community.
            </p>
            <StoryLink href="/work/coinz" className={styles.link}>
              The Coinz story <span aria-hidden="true">↗</span>
            </StoryLink>
          </div>
          <dl className={styles.daily}>
            <div>
              <dt>daily active users at its peak</dt>
              <dd>{COINZ_STATS.peakDailyActive}</dd>
            </div>
          </dl>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <figure className={styles.website}>
          <StoryLink href="/work/coinz" aria-label="Read the Coinz story">
            <Image
              src={coinzWebsite}
              alt="An earlier Coinz website, featuring its game character and economy game"
              sizes="(min-width: 1200px) 840px, 90vw"
              placeholder="blur"
            />
          </StoryLink>
          <figcaption>The website on the way to 1.35 million users.</figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

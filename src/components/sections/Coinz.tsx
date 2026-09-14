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
          <h2 id="coinz-title">Coinz</h2>
          <Image src={coin} width={48} height={48} alt="" unoptimized />
        </div>
        <div className={styles.body}>
          <div className={styles.copy}>
            <p>
              I built and ran Coinz from 2022 to 2025. It was an economy game
              inside Discord where people could trade stocks, run businesses,
              hire each other and play more than 15 minigames.
            </p>
            <p>
              I wrote the game, ran the infrastructure and grew the community.
            </p>
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
            <StoryLink href="/work/coinz" className={styles.link}>
              Read the story <span aria-hidden="true">↗</span>
            </StoryLink>
          </div>
          <StoryLink
            href="/work/coinz"
            className={styles.imageLink}
            aria-label="Read the Coinz story"
          >
            <Image
              src={coinzWebsite}
              unoptimized
              alt="The Coinz website during its growth, showing an earlier count of 850K users"
              className={styles.screenshot}
            />
          </StoryLink>
        </div>
      </Reveal>
    </section>
  );
}

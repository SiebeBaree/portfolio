/*
 * SHARED. The one map from project slug to its real logo asset, read by the
 * bento grid on the home page and by the /work chapter pages. Projects
 * missing here either fall back to a monogram tile (dead projects whose
 * logo is lost) or to the dashed red X (upcoming chapters whose assets are
 * still on their way).
 *
 * `fit` says how the mark sits in its tile: "cover" for full-bleed square
 * marks that carry their own background, "pad" for marks drawn on white or
 * transparency that need breathing room on a white tile.
 */

import type { StaticImageData } from "next/image";
import aquasolutions from "@/assets/logos/aquasolutions.webp";
import bigben from "@/assets/logos/bigben.webp";
import bothosted from "@/assets/logos/bothosted.webp";
import coinz from "@/assets/logos/coinz.png";
import eeveeMobility from "@/assets/logos/eevee-mobility.svg";
import gameout from "@/assets/logos/gameout.webp";
import habitflow from "@/assets/logos/habitflow.png";
import icount from "@/assets/logos/icount.webp";
import invitemanager from "@/assets/logos/invitemanager.webp";
import jarvis from "@/assets/logos/jarvis.webp";
import maxerg from "@/assets/logos/maxerg.webp";
import siebegpt from "@/assets/logos/siebegpt.webp";
import tickr from "@/assets/logos/tickr.webp";

export type Logo = {
  image: StaticImageData;
  fit: "cover" | "pad";
};

export const LOGOS: Record<string, Logo> = {
  aquasolutions: { image: aquasolutions, fit: "cover" },
  bigben: { image: bigben, fit: "pad" },
  bothosted: { image: bothosted, fit: "pad" },
  coinz: { image: coinz, fit: "pad" },
  "eevee-mobility": { image: eeveeMobility, fit: "pad" },
  gameout: { image: gameout, fit: "pad" },
  habitflow: { image: habitflow, fit: "cover" },
  icount: { image: icount, fit: "pad" },
  invitemanager: { image: invitemanager, fit: "cover" },
  jarvis: { image: jarvis, fit: "cover" },
  maxerg: { image: maxerg, fit: "pad" },
  siebegpt: { image: siebegpt, fit: "pad" },
  tickr: { image: tickr, fit: "pad" },
};

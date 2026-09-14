import type { StaticImageData } from "next/image";
import aquasolutions from "@/assets/logos/aquasolutions.webp";
import bothosted from "@/assets/logos/bothosted.webp";
import coinz from "@/assets/logos/coinz.png";
import eeveeMobility from "@/assets/logos/eevee-mobility.svg";
import maxerg from "@/assets/logos/maxerg.webp";
import type { Project } from "@/lib/projects";

import enkryptify from "../../public/apps/enkryptify-mark.svg";

export type Logo = {
  image: StaticImageData;
  fit: "cover" | "pad";
};

/** Real marks shared by the project stories. */
export const LOGOS: Partial<Record<Project["slug"], Logo>> = {
  enkryptify: { image: enkryptify, fit: "pad" },
  aquasolutions: { image: aquasolutions, fit: "cover" },
  bothosted: { image: bothosted, fit: "pad" },
  coinz: { image: coinz, fit: "pad" },
  "eevee-mobility": { image: eeveeMobility, fit: "pad" },
  maxerg: { image: maxerg, fit: "pad" },
};

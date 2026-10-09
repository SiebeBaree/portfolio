import type { StaticImageData } from "next/image";
import aquasolutions from "@/assets/logos/aquasolutions.webp";
import bothosted from "@/assets/logos/bothosted.webp";
import coinz from "@/assets/logos/coinz.png";
import eeveeMobility from "@/assets/logos/eevee-mobility.svg";
import maxerg from "@/assets/logos/maxerg.webp";
import type { Project } from "@/lib/projects";

import anyfmt from "../../public/apps/anyfmt-mark.svg";
import bareeCloud from "../../public/apps/baree-cloud-mark.png";
import bmail from "../../public/apps/bmail-mark.png";
import enkryptify from "../../public/apps/enkryptify-mark.svg";
import imprint from "../../public/apps/imprint-mark.svg";
import notchlet from "../../public/apps/notchlet-mark.svg";
import pitchpoppy from "../../public/apps/pitchpoppy-mark.svg";
import umber from "../../public/apps/umber-mark.svg";

export type Logo = {
  image: StaticImageData;
  fit: "cover" | "pad";
};

/** Real marks shared by the project stories. */
export const LOGOS: Partial<Record<Project["slug"], Logo>> = {
  enkryptify: { image: enkryptify, fit: "pad" },
  notchlet: { image: notchlet, fit: "cover" },
  bmail: { image: bmail, fit: "cover" },
  pitchpoppy: { image: pitchpoppy, fit: "cover" },
  "plan-baree-be": { image: bareeCloud, fit: "pad" },
  "files-baree-be": { image: bareeCloud, fit: "pad" },
  imprint: { image: imprint, fit: "pad" },
  umber: { image: umber, fit: "pad" },
  anyfmt: { image: anyfmt, fit: "cover" },
  aquasolutions: { image: aquasolutions, fit: "cover" },
  bothosted: { image: bothosted, fit: "pad" },
  coinz: { image: coinz, fit: "pad" },
  "eevee-mobility": { image: eeveeMobility, fit: "pad" },
  maxerg: { image: maxerg, fit: "pad" },
};

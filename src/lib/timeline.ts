/*
 * The load-in is one choreography spread across three components, so its
 * beats live here instead of as magic numbers in each file. Change a value
 * and every part that references it moves together.
 *
 * Seconds from mount:
 *   0.50  the name fades in, still as one word pair   (sections/Hero)
 *   0.55  the clouds start parting, scroll locked     (backdrop/CloudLayer)
 *   1.05  the face starts rising from below the fold  (sections/Hero)
 *   2.30  the top bar fades in                        (sections/Hero)
 *   2.45  the clouds finish, scroll unlocks           (backdrop/CloudLayer)
 *   2.90  the face settles, the name is fully parted  (sections/Hero)
 *   3.05  the scroll cue and dock fade in             (overlay/ScrollCue, overlay/Dock)
 */
export const INTRO = {
  /** the name arrives before the face so it reads as one name first */
  nameStart: 0.5,
  nameDuration: 0.55,
  /** the clouds part, and scrolling stays locked for exactly this long */
  cloudsStart: 0.55,
  cloudsDuration: 1.9,
  /** the face rises and pushes the two words apart */
  faceStart: 1.05,
  faceDuration: 1.85,
  /** the logo and role line, last so they do not compete with the reveal */
  topBarStart: 2.3,
} as const;

/** when the clouds are done and scrolling is handed back to the reader */
export const SCROLL_UNLOCK_AT = INTRO.cloudsStart + INTRO.cloudsDuration;

/** entrances and short transitions */
export const EASE_OUT_QUINT: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/** long settles that need to decay rather than arrive */
export const EASE_EXPO_OUT: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

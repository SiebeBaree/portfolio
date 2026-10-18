/*
 * San Francisco at night along the bottom of the Contact section, drawn once
 * and never animated: the Golden Gate Bridge running out from the Marin
 * Headlands on the left, the city on the right, the bay along the bottom. Everything is generated from a few
 * measurements so the bridge stays structurally right (towers, portal
 * struts, catenary cables, suspenders, deck, anchorages) and the windows come
 * from a seeded generator, so server and client draw the same lights.
 *
 * viewBox units: 1600 wide, 470 tall. Water at y=380.
 */

const W = 1600;
const H = 470;
const WATER = 380;
const DECK = 318;
const TOWER_TOP = 168;
const TOWERS = [252, 732];
const ANCHOR = [122, 862];
const CITY_GROUND = 372;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const f = (n: number) => n.toFixed(2);

/* ---------- the bridge ---------- */

/*
 * One tower seen face-on: two legs that step inward at every strut, four
 * portal struts above the deck with openings shrinking toward the crown,
 * and a deep strut plus X-bracing below the deck down to the pier.
 */
function towerPaths(cx: number) {
  const T = TOWER_TOP;
  // the solid bands above the deck, crown first, as [top, bottom]
  const crown: [number, number] = [T, T + 20];
  const struts: [number, number][] = [
    [T + 36, T + 43],
    [T + 66, T + 73],
    [T + 104, T + 111],
  ];
  // leg edges per stage (0 = crown stage); the legs set back at every strut
  const outer = (i: number) => 11.5 + i * 1.8;
  const inner = (i: number) => 5 + i * 0.45;
  const levels = [T, T + 36, T + 66, T + 104, DECK, WATER];
  const legs: string[] = [];
  for (const side of [-1, 1]) {
    let d = "";
    // outer edge going down with setbacks, then inner edge going up
    for (let i = 0; i < levels.length - 1; i++) {
      const x = cx + side * outer(i);
      d += `${i === 0 ? "M" : "L"}${f(x)} ${f(levels[i])} L${f(x)} ${f(levels[i + 1])} `;
    }
    for (let i = levels.length - 2; i >= 0; i--) {
      const x = cx + side * inner(i);
      d += `L${f(x)} ${f(levels[i + 1])} L${f(x)} ${f(levels[i])} `;
    }
    legs.push(`${d}Z`);
  }
  const bands = [crown, ...struts].map(
    ([a, b], i) =>
      `M${f(cx - inner(i) - 0.5)} ${a} H${f(cx + inner(i) + 0.5)} V${b} H${f(cx - inner(i) - 0.5)} Z`,
  );
  // the cable saddle housings capping each leg
  const caps = [-1, 1].map((side) => {
    const a = cx + side * (inner(0) + 1.2);
    const b = cx + side * (outer(0) - 1.2);
    return `M${f(Math.min(a, b))} ${T - 4} H${f(Math.max(a, b))} V${T} H${f(Math.min(a, b))} Z`;
  });
  // below the deck: a deep strut under the roadway and an X down to the pier
  const below = [
    `M${f(cx - inner(4))} ${DECK} H${f(cx + inner(4))} V${DECK + 14} H${f(cx - inner(4))} Z`,
  ];
  const x1 = cx - inner(4);
  const x2 = cx + inner(4);
  const brace = `M${f(x1)} ${DECK + 14} L${f(x2)} ${WATER - 8} M${f(x2)} ${DECK + 14} L${f(x1)} ${WATER - 8}`;
  return { legs, bands: [...bands, ...caps, ...below], brace };
}

/** main span cable: a parabola from tower top to tower top, sagging to the deck */
function mainCable(t1: number, t2: number) {
  const top = TOWER_TOP + 3;
  const low = DECK - 6;
  const mid = (t1 + t2) / 2;
  const half = (t2 - t1) / 2;
  const pts: [number, number][] = [];
  for (let x = t1; x <= t2 + 0.01; x += 4) {
    const k = (x - mid) / half;
    pts.push([x, low + (top - low) * k * k]);
  }
  return pts;
}

/** side span cable: the same parabola continued past the tower to the anchorage */
function sideCable(tower: number, anchor: number) {
  const top = TOWER_TOP + 3;
  const end = DECK + 2;
  const pts: [number, number][] = [];
  const steps = 40;
  // sags gently: quadratic from the tower top, steepest at the anchorage end
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = tower + (anchor - tower) * t;
    const y = top + (end - top) * (0.55 * t + 0.45 * t * t);
    pts.push([x, y]);
  }
  return pts;
}

const toPath = (pts: [number, number][]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join(" ");

/** deck height at x: a shallow arch between the anchorages */
function deckY(x: number) {
  if (x < ANCHOR[0] || x > ANCHOR[1]) return DECK + 2;
  const mid = (ANCHOR[0] + ANCHOR[1]) / 2;
  const k = (x - mid) / ((ANCHOR[1] - ANCHOR[0]) / 2);
  return DECK - 5 * (1 - k * k);
}

function Bridge() {
  const cables = [
    mainCable(TOWERS[0], TOWERS[1]),
    sideCable(TOWERS[0], ANCHOR[0]),
    sideCable(TOWERS[1], ANCHOR[1]),
  ];
  // suspenders every 6 units from each cable down to the deck
  const suspenders: string[] = [];
  for (const cable of cables) {
    const xs = cable.map(([x]) => x);
    const lo = Math.min(...xs);
    const hi = Math.max(...xs);
    for (let x = Math.ceil(lo / 6) * 6; x <= hi; x += 6) {
      if (Math.abs(x - TOWERS[0]) < 16 || Math.abs(x - TOWERS[1]) < 16)
        continue;
      // interpolate the cable height at x
      const sorted = [...cable].sort((a, b) => a[0] - b[0]);
      const j = sorted.findIndex(([px]) => px >= x);
      if (j <= 0) continue;
      const [ax, ay] = sorted[j - 1];
      const [bx, by] = sorted[j];
      const y = ay + ((by - ay) * (x - ax)) / (bx - ax || 1);
      const d = deckY(x);
      if (d - y > 3) suspenders.push(`M${f(x)} ${f(y)} V${f(d)}`);
    }
  }
  // the deck, from the headland on the left to the shore past Fort Point
  const deckTop: string[] = [];
  for (let x = 0; x <= 990; x += 6) deckTop.push(`${f(x)} ${f(deckY(x))}`);
  const deck = `M${deckTop.join(" L")} L990 ${DECK + 10} L0 ${DECK + 10} Z`;
  // approach viaduct piers on both shores
  const piers: string[] = [];
  for (let x = 30; x < ANCHOR[0]; x += 26)
    piers.push(`M${x} ${DECK + 8} V${WATER}`);
  for (let x = ANCHOR[1] + 22; x < 990; x += 26)
    piers.push(`M${x} ${DECK + 8} V${CITY_GROUND}`);
  // roadway lamps along the deck
  const lamps: [number, number][] = [];
  for (let x = 8; x <= 984; x += 14) lamps.push([x, deckY(x) - 2.2]);

  return (
    <g>
      {/* anchorages: massive concrete blocks where the cables end */}
      {ANCHOR.map((x) => (
        <path
          key={x}
          d={`M${x - 16} ${DECK - 4} H${x + 16} L${x + 20} ${WATER} H${x - 20} Z`}
          fill="#1a1530"
        />
      ))}
      <g stroke="#2a1830" strokeWidth="3">
        <path d={piers.join(" ")} />
      </g>

      {/* towers, floodlit international orange from below */}
      {TOWERS.map((cx) => {
        const t = towerPaths(cx);
        return (
          <g key={cx}>
            <path
              d={`M${cx - 26} ${WATER - 12} H${cx + 26} L${cx + 28} ${WATER + 2} H${cx - 28} Z`}
              fill="#2a1d36"
            />
            <path d={t.brace} stroke="url(#sf-tower)" strokeWidth="3" />
            {t.legs.map((d) => (
              <path key={d} d={d} fill="url(#sf-tower)" />
            ))}
            {t.bands.map((d) => (
              <path key={d} d={d} fill="url(#sf-tower)" />
            ))}
            {/* art deco fluting catching the light */}
            <path
              d={`M${cx - 10} ${TOWER_TOP + 2} V${DECK} M${cx + 10} ${TOWER_TOP + 2} V${DECK}`}
              stroke="#ffb27a"
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
            {/* aviation lights on the tower tops */}
            <circle
              cx={cx - 11}
              cy={TOWER_TOP - 2}
              r="5"
              fill="url(#sf-red-glow)"
            />
            <circle
              cx={cx + 11}
              cy={TOWER_TOP - 2}
              r="5"
              fill="url(#sf-red-glow)"
            />
            <circle cx={cx - 11} cy={TOWER_TOP - 2} r="1.3" fill="#ff5a4a" />
            <circle cx={cx + 11} cy={TOWER_TOP - 2} r="1.3" fill="#ff5a4a" />
          </g>
        );
      })}

      <g stroke="#e8743f" strokeOpacity="0.38" strokeWidth="0.55">
        <path d={suspenders.join(" ")} />
      </g>
      <g fill="none" stroke="#e06c3c" strokeWidth="2.4" strokeLinecap="round">
        {cables.map((c) => (
          <path key={c[0][0] + c.length} d={toPath(c)} />
        ))}
      </g>

      <path d={deck} fill="#3a1a1d" />
      <path
        d={`M${deckTop.join(" L")}`}
        fill="none"
        stroke="#ff9a5a"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {lamps.map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="4.2" fill="url(#sf-amber-glow)" />
          <circle cx={x} cy={y} r="0.9" fill="#ffd9a0" />
        </g>
      ))}
    </g>
  );
}

/* ---------- the land ---------- */

const MARIN =
  "M0 196 C 30 192, 58 206, 82 226 C 104 244, 124 262, 150 284 C 172 304, 196 330, 214 356 C 222 368, 228 376, 232 380 L0 380 Z";
const MARIN_FAR =
  "M0 236 C 40 222, 78 230, 110 250 C 140 268, 170 300, 200 330 C 212 344, 222 362, 230 380 L0 380 Z";
// the Fort Point bluff the south approach runs onto, falling away into the city
const PRESIDIO =
  "M864 380 C 874 358, 888 330, 910 321 C 930 316, 966 315, 1000 319 C 1036 325, 1062 342, 1092 346 L1600 344 L1600 380 Z";
// Telegraph Hill, crowned by Coit Tower
const TELEGRAPH =
  "M1010 380 C 1030 360, 1050 338, 1076 330 C 1098 324, 1116 330, 1134 342 C 1150 352, 1166 366, 1180 380 Z";
const EAST_BAY =
  "M900 352 C 1000 340, 1080 338, 1180 334 C 1300 330, 1420 322, 1500 326 C 1550 328, 1580 332, 1600 334 L1600 380 L900 380 Z";

/* ---------- the city ---------- */

type Building = { x: number; w: number; top: number; shape?: "flat" | "step" };

/** filler towers, hand placed for rhythm, seeded heights for texture */
function fillers(): { far: Building[]; mid: Building[] } {
  const r = rng(415);
  const far: Building[] = [];
  for (let x = 1120; x < 1600; x += 14 + r() * 16) {
    far.push({ x, w: 12 + r() * 16, top: 300 - r() * 46 });
  }
  const mid: Building[] = [];
  let x = 1150;
  while (x < 1600) {
    const w = 14 + r() * 20;
    const nearCore = Math.exp(-(((x - 1360) / 150) ** 2));
    mid.push({
      x,
      w,
      top: 334 - (26 + r() * 40) - nearCore * (40 + r() * 70),
      shape: r() > 0.6 ? "step" : "flat",
    });
    x += w + 2 + r() * 6;
  }
  return { far, mid };
}
const FILL = fillers();

// landmark towers in the near layer
const TRANSAMERICA = 1268;
const SALESFORCE = 1408;

function transamerica(cx: number) {
  const base = CITY_GROUND;
  const apex = 152;
  const halfBase = 19;
  const half = (y: number) => (halfBase * (y - apex)) / (base - apex);
  // the two wings that stand proud of the slope near the top
  const wingOut = 7.6;
  const wingTop = 200;
  const wingFrom = apex + (wingOut * (base - apex)) / halfBase;
  return [
    `M${f(cx - halfBase)} ${base}`,
    `L${f(cx - wingOut)} ${f(wingFrom)}`,
    `L${f(cx - wingOut)} ${wingTop}`,
    `L${f(cx - half(wingTop + 6))} ${wingTop + 6}`,
    `L${f(cx - half(212))} 212`,
    `L${cx - 1.2} ${apex + 6}`,
    `L${cx} ${apex - 2}`,
    `L${cx + 1.2} ${apex + 6}`,
    `L${f(cx + half(212))} 212`,
    `L${f(cx + half(wingTop + 6))} ${wingTop + 6}`,
    `L${f(cx + wingOut)} ${wingTop}`,
    `L${f(cx + wingOut)} ${f(wingFrom)}`,
    `L${f(cx + halfBase)} ${base} Z`,
  ].join(" ");
}

function salesforce(cx: number) {
  return `M${cx - 17} ${CITY_GROUND} L${cx - 13} 150 Q${cx - 13} 124 ${cx} 118 Q${cx + 13} 124 ${cx + 13} 150 L${cx + 17} ${CITY_GROUND} Z`;
}

const NEAR: { d: string; key: string; rect?: Building }[] = [
  // 181 Fremont: slim, raked top with a spire
  {
    key: "fremont",
    d: `M1436 ${CITY_GROUND} L1438 182 L1449 170 L1450 150 L1451 170 L1458 178 L1460 ${CITY_GROUND} Z`,
  },
  // 555 California: dark, broad, flat-topped
  {
    key: "555",
    d: `M1196 ${CITY_GROUND} V196 H1230 V${CITY_GROUND} Z`,
    rect: { x: 1196, w: 34, top: 196 },
  },
  // Millennium Tower
  {
    key: "millennium",
    d: `M1468 ${CITY_GROUND} V206 Q1478 200 1488 206 V${CITY_GROUND} Z`,
    rect: { x: 1468, w: 20, top: 206 },
  },
  {
    key: "345",
    d: `M1306 ${CITY_GROUND} V222 H1330 V${CITY_GROUND} Z`,
    rect: { x: 1306, w: 24, top: 222 },
  },
  {
    key: "embarcadero",
    d: `M1338 ${CITY_GROUND} V244 H1362 V${CITY_GROUND} Z`,
    rect: { x: 1338, w: 24, top: 244 },
  },
  {
    key: "rincon",
    d: `M1520 ${CITY_GROUND} V214 H1540 V${CITY_GROUND} Z`,
    rect: { x: 1520, w: 20, top: 214 },
  },
  {
    key: "mission",
    d: `M1166 ${CITY_GROUND} V250 H1186 V${CITY_GROUND} Z`,
    rect: { x: 1166, w: 20, top: 250 },
  },
  {
    key: "transamerica",
    d: transamerica(TRANSAMERICA),
  },
  { key: "salesforce", d: salesforce(SALESFORCE) },
];

function windows(b: Building, seed: number, density: number) {
  const r = rng(seed);
  const out: { x: number; y: number; o: number }[] = [];
  for (let y = b.top + 6; y < CITY_GROUND - 6; y += 6) {
    for (let x = b.x + 3; x < b.x + b.w - 3; x += 4.5) {
      if (r() < density) out.push({ x, y, o: 0.45 + r() * 0.5 });
    }
  }
  return out;
}

function City() {
  const midWindows = FILL.mid.flatMap((b, i) => windows(b, 900 + i, 0.07));
  const nearWindows = NEAR.flatMap((n, i) =>
    n.rect ? windows(n.rect, 77 + i, 0.11) : [],
  );
  // windows inside the two landmarks follow their silhouettes
  const r = rng(2026);
  const pyramid: { x: number; y: number; o: number }[] = [];
  for (let y = 222; y < CITY_GROUND - 6; y += 6) {
    const half = (19 * (y - 152)) / (CITY_GROUND - 152) - 3.5;
    for (let x = TRANSAMERICA - half; x < TRANSAMERICA + half; x += 4)
      if (r() < 0.14) pyramid.push({ x, y, o: 0.5 + r() * 0.45 });
  }
  const tower: { x: number; y: number; o: number }[] = [];
  for (let y = 160; y < CITY_GROUND - 6; y += 6)
    for (let x = SALESFORCE - 11; x < SALESFORCE + 11; x += 4.4)
      if (r() < 0.12) tower.push({ x, y, o: 0.5 + r() * 0.45 });

  return (
    <g>
      {/* far: a haze of towers toward the bay, barely there */}
      <g fill="#1d2152" opacity="0.85">
        {FILL.far.map((b) => (
          <rect key={b.x} x={b.x} y={b.top} width={b.w} height={380 - b.top} />
        ))}
      </g>
      <path d={EAST_BAY} fill="#161a42" />
      {/* mid: the body of downtown and North Beach */}
      <g fill="#10143a">
        {FILL.mid.map((b) => (
          <path
            key={b.x}
            d={
              b.shape === "step"
                ? `M${f(b.x)} 380 V${f(b.top + 8)} H${f(b.x + b.w * 0.2)} V${f(b.top)} H${f(b.x + b.w * 0.8)} V${f(b.top + 8)} H${f(b.x + b.w)} V380 Z`
                : `M${f(b.x)} 380 V${f(b.top)} H${f(b.x + b.w)} V380 Z`
            }
          />
        ))}
      </g>
      <g fill="#ffcf8f">
        {midWindows.map((w) => (
          <rect
            key={`${w.x}:${w.y}`}
            x={w.x}
            y={w.y}
            width="2"
            height="2.6"
            opacity={w.o * 0.75}
          />
        ))}
      </g>
      <path d={TELEGRAPH} fill="#0c1030" />
      {/* Coit Tower on the hill */}
      {/* Coit Tower, floodlit on its hill */}
      <ellipse cx="1097" cy="312" rx="16" ry="22" fill="url(#sf-coit-glow)" />
      <path
        d="M1092.5 332 V301 H1091.5 V297 H1102.5 V301 H1101.5 V332 Z"
        fill="url(#sf-coit)"
      />
      <path
        d="M1094.5 301 V331 M1097 301 V331 M1099.5 301 V331"
        stroke="#b99872"
        strokeOpacity="0.5"
        strokeWidth="0.5"
      />

      {/* near: the landmarks */}
      <g fill="#080a22">
        {NEAR.map((n) => (
          <path key={n.key} d={n.d} />
        ))}
      </g>
      {/* Salesforce Tower's crown glows at night */}
      <path
        d={`M${SALESFORCE - 13} 150 Q${SALESFORCE - 13} 124 ${SALESFORCE} 118 Q${SALESFORCE + 13} 124 ${SALESFORCE + 13} 150 Z`}
        fill="url(#sf-crown)"
      />
      <g fill="#ffd497">
        {[...nearWindows, ...pyramid, ...tower].map((w) => (
          <rect
            key={`${w.x.toFixed(1)}:${w.y}`}
            x={w.x}
            y={w.y}
            width="2"
            height="2.6"
            opacity={w.o}
          />
        ))}
      </g>
      {/* aviation lights on the tallest tops */}
      {[
        [SALESFORCE, 116],
        [TRANSAMERICA, 149],
        [1450, 149],
      ].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="6" fill="url(#sf-red-glow)" />
          <circle cx={x} cy={y} r="1.4" fill="#ff5a4a" />
        </g>
      ))}
    </g>
  );
}

/* ---------- the bay ---------- */

function Bay() {
  // reflections: a long orange smear under each tower and a few under the city
  const streaks = [
    { x: TOWERS[0], w: 26, o: 0.5, c: "#ff7a3d" },
    { x: TOWERS[1], w: 26, o: 0.5, c: "#ff7a3d" },
    { x: SALESFORCE, w: 18, o: 0.22, c: "#ffd497" },
    { x: TRANSAMERICA, w: 14, o: 0.2, c: "#ffd497" },
    { x: 1340, w: 60, o: 0.12, c: "#ffd497" },
    { x: 1500, w: 50, o: 0.1, c: "#ffd497" },
  ];
  const r = rng(51);
  const glints: { x: number; y: number; w: number; o: number }[] = [];
  for (let i = 0; i < 70; i++) {
    const x = r() * W;
    const near = x < 1000 ? 0.6 : 1;
    glints.push({
      x,
      y: WATER + 4 + r() ** 1.4 * (H - WATER - 8),
      w: 4 + r() * 16,
      o: (0.08 + r() * 0.22) * near,
    });
  }
  return (
    <g>
      <rect
        x="0"
        y={WATER}
        width={W}
        height={H - WATER}
        fill="url(#sf-water)"
      />
      <g filter="url(#sf-soft)">
        {streaks.map((s) => (
          <rect
            key={s.x}
            x={s.x - s.w / 2}
            y={WATER}
            width={s.w}
            height={H - WATER}
            fill={`url(#sf-streak-${s.c === "#ff7a3d" ? "orange" : "warm"})`}
            opacity={s.o}
          />
        ))}
      </g>
      <g fill="#ffd8a8">
        {glints.map((g) => (
          <rect
            key={`${g.x.toFixed(2)}`}
            x={g.x}
            y={g.y}
            width={g.w}
            height="0.8"
            opacity={g.o}
          />
        ))}
      </g>
    </g>
  );
}

export default function Skyline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax meet"
      className={className}
    >
      <defs>
        <linearGradient
          id="sf-tower"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={TOWER_TOP - 4}
          x2="0"
          y2={WATER}
        >
          <stop offset="0%" stopColor="#9a3623" />
          <stop offset="45%" stopColor="#c9522d" />
          <stop offset="70%" stopColor="#ec7340" />
          <stop offset="74%" stopColor="#b2462a" />
          <stop offset="100%" stopColor="#5e2420" />
        </linearGradient>
        <linearGradient id="sf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141640" />
          <stop offset="100%" stopColor="#04060f" />
        </linearGradient>
        <linearGradient id="sf-streak-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8a4a" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff8a4a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-streak-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd497" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffd497" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sf-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe6ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9aa8ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="sf-coit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7a74" />
          <stop offset="100%" stopColor="#2e2c48" />
        </linearGradient>
        <radialGradient id="sf-coit-glow">
          <stop offset="0%" stopColor="#ffe2b0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffe2b0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sf-red-glow">
          <stop offset="0%" stopColor="#ff4a3a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff4a3a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sf-amber-glow">
          <stop offset="0%" stopColor="#ffb867" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffb867" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sf-city-glow" cx="0.5" cy="1" r="0.6">
          <stop offset="0%" stopColor="#c0687a" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#6a4a8a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6a4a8a" stopOpacity="0" />
        </radialGradient>
        <filter id="sf-soft" x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="3 1" />
        </filter>
      </defs>

      {/* the city's glow on the low cloud behind it */}
      <ellipse cx="1340" cy="380" rx="420" ry="220" fill="url(#sf-city-glow)" />

      <path d={MARIN_FAR} fill="#151a40" />
      <path d={MARIN} fill="#0b0e2a" />
      <City />
      <Bridge />
      {/* after the bridge, so the south approach runs into the bluff */}
      <path d={PRESIDIO} fill="#0a0d26" />
      <Bay />
    </svg>
  );
}

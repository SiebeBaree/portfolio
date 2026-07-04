import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The card that represents the site when the link is shared:
// just the name, set in Mona Sans on the same warm paper background.
export const alt = "Siebe Barée";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same light (top-of-page) palette as globals.css.
const PAPER = "#f4f0e8";
const INK = "#191611";

export default async function Image() {
  const display = await readFile(
    join(process.cwd(), "assets/fonts/MonaSansDisplayExpanded-ExtraBold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: PAPER,
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "Mona Sans Display",
          fontWeight: 800,
          fontSize: 150,
          letterSpacing: "-0.035em",
          color: INK,
        }}
      >
        Siebe Barée
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Mona Sans Display",
          data: display,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}

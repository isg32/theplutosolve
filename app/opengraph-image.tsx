import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/content";

export const alt = `${brand.name} — ${brand.social}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The cover composition: wordmark on the left, slab, signal block and tint block on the right.
export default async function OpengraphImage() {
  // Liberation Sans (OFL): metric-compatible stand-in for the Helvetica stack.
  const dir = join(process.cwd(), "app/og-fonts");
  const [bold, regular] = await Promise.all([
    readFile(join(dir, "LiberationSans-Bold.ttf")),
    readFile(join(dir, "LiberationSans-Regular.ttf")),
  ]);
  const dots = [];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 7; c++)
      dots.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: 640 + 30 + c * 60 - 3,
            top: 30 + r * 60 - 3 + 105,
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "#86868a",
          }}
        />,
      );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#f6f6f4", fontFamily: "Sans" }}>
        <div style={{ position: "absolute", left: 640, top: 0, width: 420, height: 630, background: "#0c0c0d" }} />
        <div style={{ position: "absolute", left: 1060, top: 315, width: 140, height: 315, background: "#b8370b" }} />
        <div style={{ position: "absolute", left: 1060, top: 0, width: 140, height: 140, background: "#86868a" }} />
        {dots}
        <div style={{ position: "absolute", left: 760, top: 194, width: 120, height: 3, background: "#b8370b" }} />
        <div style={{ position: "absolute", left: 877, top: 194, width: 3, height: 180, background: "#b8370b" }} />
        <div style={{ position: "absolute", left: 877, top: 371, width: 183, height: 3, background: "#b8370b" }} />
        {[
          [760, 195],
          [878, 195],
          [878, 372],
        ].map(([x, y]) => (
          <div
            key={`${x}-${y}`}
            style={{ position: "absolute", left: x - 10, top: y - 10, width: 20, height: 20, borderRadius: 10, background: "#b8370b" }}
          />
        ))}
        <div style={{ position: "absolute", left: 64, bottom: 72, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, color: "#0c0c0d" }}>{brand.name}</div>
          <div style={{ fontSize: 28, color: "#57575b", marginTop: 12 }}>{brand.social}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sans", data: bold, weight: 700, style: "normal" },
        { name: "Sans", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}

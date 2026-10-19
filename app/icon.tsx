import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// A signal node on an ink square: the brand's outcome node.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0d",
          borderRadius: 4,
        }}
      >
        <div style={{ width: 22, height: 22, background: "#b8370b", borderRadius: 2 }} />
      </div>
    ),
    size,
  );
}

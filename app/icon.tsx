import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram mark: a white frame on ink. */
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
          backgroundColor: "#0f0e0c",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            border: "2px solid #f4f1ea",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}

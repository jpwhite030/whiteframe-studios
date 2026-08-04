import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0e0c",
          color: "#f4f1ea",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#928c81",
          }}
        >
          <span>{siteConfig.wordmark}</span>
          <span>{siteConfig.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 3,
              backgroundColor: "#7189ff",
              marginBottom: 40,
            }}
          />
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            {siteConfig.hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2b2926",
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#928c81",
          }}
        >
          <span>Independent product studio</span>
          <span>Founded by {siteConfig.founder}</span>
        </div>
      </div>
    ),
    size,
  );
}

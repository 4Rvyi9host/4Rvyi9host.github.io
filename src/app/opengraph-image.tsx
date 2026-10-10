import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Portofolio Muhammad Ar Rafi Saifuddin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#eff2e9", background: "linear-gradient(135deg,#0d1110 0%,#172019 62%,#26321c 100%)", fontFamily: "Arial" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#c8f27a", fontSize: 24, letterSpacing: 5 }}>RAFI <span style={{ color: "#879083" }}>· PERSONAL PORTFOLIO</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -5 }}>Muhammad Ar Rafi</div>
          <div style={{ color: "#c8f27a", fontSize: 43 }}>IT Support · Database</div>
          <div style={{ color: "#a1aaa0", fontSize: 24 }}>IT Support · Database · Data Mining</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#879083", fontSize: 18 }}><span>JAKARTA TIMUR, INDONESIA</span><span>SUPPORT / DATABASE / DATA MINING</span></div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { modules } from "@/lib/modules";
import { quizQuestions } from "@/lib/quiz-data";

export const alt = "Claude Expert — Devenez expert de Claude Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #221d1a 0%, #2e2420 55%, #3a2a22 100%)",
          color: "#fdfaf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #d97a3f, #c0432f)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700 }}>Claude Expert</span>
            <span style={{ fontSize: 18, color: "#c9beb3" }}>Une formation WeHighTech</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Devenez expert
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              backgroundImage: "linear-gradient(90deg, #e08a4d, #c0432f)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            de Claude Code
          </span>
          <span style={{ fontSize: 26, color: "#e3dbd2", maxWidth: 820 }}>
            Modules de cours, quiz corrigés et suivi de progression pour maîtriser l&apos;agent
            de codage d&apos;Anthropic.
          </span>
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          <Stat value={`${modules.length}`} label="Modules" />
          <Stat value={`${quizQuestions.length}`} label="Questions de quiz" />
          <Stat value="12" label="Catégories" />
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 36, fontWeight: 700, color: "#e08a4d" }}>{value}</span>
      <span style={{ fontSize: 18, color: "#c9beb3" }}>{label}</span>
    </div>
  );
}

// Purely decorative, original CSS/SVG-driven background effect (no external
// artwork or game assets) — a handful of slowly rising embers to evoke the
// Path of Exile atmosphere behind the app content.
const EMBERS = [
  { left: "4%", duration: "14s", delay: "0s", drift: "18px", size: 1 },
  { left: "12%", duration: "18s", delay: "3s", drift: "-24px", size: 2 },
  { left: "20%", duration: "12s", delay: "1s", drift: "10px", size: 1 },
  { left: "29%", duration: "20s", delay: "6s", drift: "-14px", size: 1 },
  { left: "37%", duration: "16s", delay: "2s", drift: "22px", size: 2 },
  { left: "46%", duration: "13s", delay: "8s", drift: "-8px", size: 1 },
  { left: "54%", duration: "19s", delay: "4s", drift: "16px", size: 1 },
  { left: "62%", duration: "15s", delay: "0.5s", drift: "-20px", size: 2 },
  { left: "70%", duration: "17s", delay: "7s", drift: "12px", size: 1 },
  { left: "78%", duration: "12s", delay: "5s", drift: "-16px", size: 1 },
  { left: "86%", duration: "21s", delay: "2.5s", drift: "20px", size: 2 },
  { left: "93%", duration: "14.5s", delay: "9s", drift: "-10px", size: 1 },
] as const;

export default function EmberField() {
  return (
    <div className="ember-field" aria-hidden="true">
      {EMBERS.map((e, i) => (
        <span
          key={i}
          style={{
            left: e.left,
            width: e.size === 2 ? 4 : 3,
            height: e.size === 2 ? 4 : 3,
            animationDuration: e.duration,
            animationDelay: e.delay,
            ["--drift" as string]: e.drift,
          }}
        />
      ))}
    </div>
  );
}

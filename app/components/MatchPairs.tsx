"use client";
import { useState, useEffect } from "react";

type Pair = { left: string; right: string; id: number; hint?: string };

export default function MatchPairs({ pairs, title }: { pairs: Pair[]; title: string }) {
  const [leftItems, setLeftItems] = useState<(Pair & { text: string })[]>([]);
  const [rightItems, setRightItems] = useState<{ text: string; id: number }[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);
  const [activeHint, setActiveHint] = useState<number | null>(null);

  useEffect(() => {
    const shuffledLeft = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ ...p, text: p.left }));
    const shuffledRight = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ text: p.right, id: p.id }));
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
  }, [pairs]);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        setMatched(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrong(false);
        setActiveHint(null);
      } else {
        setWrong(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrong(false);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight]);

  const colors = [
    "var(--accent-blue)",
    "var(--accent-green)",
    "var(--accent-orange)",
    "var(--accent-primary)",
    "#8b5cf6", // Violeta
    "#ec4899", // Rosa
  ];

  const getPairColor = (id: number) => colors[id % colors.length];

  const allMatched = matched.length === pairs.length && pairs.length > 0;

  return (
    <div className="card" style={{ marginBottom: "2rem", border: "1px solid var(--border-color)", background: "var(--bg-card)", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ width: "48px", height: "48px", background: "var(--accent-primary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem" }}>🔗</div>
        <div>
          <h4 style={{ color: "var(--text-primary)", fontWeight: 800, margin: 0, fontSize: "1.1rem" }}>{title}</h4>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>Une los conceptos con sus definiciones correspondientes.</p>
        </div>
      </div>

      {allMatched ? (
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid var(--accent-green)", borderRadius: "16px", padding: "2.5rem", textAlign: "center", color: "var(--accent-green)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏆</div>
          <h4 style={{ fontWeight: 900, margin: "0 0 0.5rem 0", fontSize: "1.5rem" }}>¡Dominio Total!</h4>
          <p style={{ fontSize: "1rem", margin: 0, opacity: 0.9 }}>Has completado todas las relaciones correctamente.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {leftItems.map((item) => {
              const isMatched = matched.includes(item.id);
              const isSelected = selectedLeft === item.id;
              const pairColor = getPairColor(item.id);
              const hasHint = !!item.hint;
              
              return (
                <div key={`l-cont-${item.id}`} style={{ position: "relative" }}>
                  <button
                    disabled={isMatched}
                    onClick={() => setSelectedLeft(isSelected ? null : item.id)}
                    style={{
                      width: "100%",
                      padding: "1.1rem",
                      borderRadius: "12px",
                      border: `2px solid ${isMatched ? pairColor : isSelected ? "var(--accent-primary)" : "var(--border-color)"}`,
                      background: isMatched ? `${pairColor}10` : isSelected ? "rgba(155,28,46,0.05)" : "var(--bg-secondary)",
                      color: isMatched ? pairColor : isSelected ? "var(--accent-primary)" : "var(--text-primary)",
                      fontWeight: isSelected || isMatched ? 800 : 600,
                      textAlign: "center",
                      cursor: isMatched ? "default" : "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isMatched ? `0 4px 12px ${pairColor}15` : "none",
                      paddingRight: hasHint && !isMatched ? "3rem" : "1.1rem"
                    }}
                  >
                    {item.text}
                  </button>
                  {hasHint && !isMatched && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveHint(activeHint === item.id ? null : item.id); }}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: activeHint === item.id ? "#fbbf24" : "transparent",
                        border: "none",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                        transition: "all 0.2s",
                        opacity: 0.6
                      }}
                      title="Ver pista"
                    >
                      💡
                    </button>
                  )}
                  {activeHint === item.id && (
                    <div style={{ 
                      position: "absolute", 
                      top: "105%", 
                      left: "0", 
                      right: "0", 
                      background: "#fffbeb", 
                      border: "1px solid #fcd34d", 
                      borderRadius: "8px", 
                      padding: "0.8rem", 
                      fontSize: "0.8rem", 
                      color: "#92400e", 
                      zIndex: 10,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      animation: "fadeIn 0.2s ease"
                    }}>
                      <strong>Pista:</strong> {item.hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {rightItems.map((item) => {
              const isMatched = matched.includes(item.id);
              const isSelected = selectedRight === item.id;
              const pairColor = getPairColor(item.id);
              return (
                <button
                  key={`r-${item.id}`}
                  disabled={isMatched}
                  onClick={() => setSelectedRight(isSelected ? null : item.id)}
                  style={{
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border: `2px solid ${isMatched ? pairColor : isSelected ? "var(--accent-primary)" : "var(--border-color)"}`,
                    background: isMatched ? `${pairColor}10` : isSelected ? "rgba(155,28,46,0.05)" : "var(--bg-secondary)",
                    color: isMatched ? pairColor : isSelected ? "var(--accent-primary)" : "var(--text-secondary)",
                    fontSize: "0.9rem",
                    fontWeight: isMatched ? 700 : 500,
                    textAlign: "center",
                    cursor: isMatched ? "default" : "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isMatched ? `0 4px 12px ${pairColor}15` : "none"
                  }}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}

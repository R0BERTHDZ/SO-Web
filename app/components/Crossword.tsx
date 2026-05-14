"use client";
import React, { useState, useEffect, useRef } from "react";

interface Clue {
  number: number;
  direction: "across" | "down";
  row: number;
  col: number;
  answer: string;
  clue: string;
  hint?: string;
}

interface CrosswordProps {
  title: string;
  clues: Clue[];
  size: number;
}

export default function Crossword({ title, clues, size }: CrosswordProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [focused, setFocused] = useState<{ r: number; c: number } | null>(null);
  const [activeHints, setActiveHints] = useState<number[]>([]);

  useEffect(() => {
    const g = Array(size).fill(null).map(() => Array(size).fill("#"));
    clues.forEach(c => {
      for (let i = 0; i < c.answer.length; i++) {
        const r = c.direction === "down" ? c.row + i : c.row;
        const col = c.direction === "across" ? c.col + i : c.col;
        g[r][col] = "";
      }
    });
    setGrid(g);
    setUserGrid(Array(size).fill(null).map(() => Array(size).fill("")));
  }, [clues, size]);

  const toggleHint = (num: number) => {
    setActiveHints(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleChange = (r: number, c: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newGrid = [...userGrid];
    if (!newGrid[r]) newGrid[r] = [];
    newGrid[r][c] = val.toUpperCase();
    setUserGrid(newGrid);
  };

  const solveClue = (c: Clue) => {
    const newGrid = [...userGrid];
    for (let i = 0; i < c.answer.length; i++) {
      const row = c.direction === "down" ? c.row + i : c.row;
      const col = c.direction === "across" ? c.col + i : c.col;
      if (!newGrid[row]) newGrid[row] = [];
      newGrid[row][col] = c.answer[i].toUpperCase();
    }
    setUserGrid(newGrid);
  };

  const isCorrect = (r: number, c: number) => {
    const char = userGrid[r]?.[c];
    if (!char || char === "") return null;

    const cluesPassing = clues.filter(cl => {
      if (cl.direction === "across") {
        return r === cl.row && c >= cl.col && c < cl.col + cl.answer.length;
      } else {
        return c === cl.col && r >= cl.row && r < cl.row + cl.answer.length;
      }
    });

    return cluesPassing.every(cl => {
      const idx = cl.direction === "across" ? c - cl.col : r - cl.row;
      return cl.answer[idx].toUpperCase() === char.toUpperCase();
    });
  };

  const getNumber = (r: number, c: number) => {
    const clue = clues.find(cl => cl.row === r && cl.col === c);
    return clue ? clue.number : null;
  };

  const allDone = clues.length > 0 && userGrid.length > 0 && clues.every(cl => {
    for (let i = 0; i < cl.answer.length; i++) {
      const r = cl.direction === "down" ? cl.row + i : cl.row;
      const col = cl.direction === "across" ? cl.col + i : cl.col;
      if (!userGrid[r] || userGrid[r][col] === undefined) return false;
      if (userGrid[r][col].toUpperCase() !== cl.answer[i].toUpperCase()) return false;
    }
    return true;
  });

  return (
    <div className="card" style={{ padding: "2.5rem", marginBottom: "4rem", background: "var(--bg-card)", borderRadius: "24px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)", border: "1px solid var(--border-color)" }}>
      <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", padding: "0.5rem", borderRadius: "12px", display: "flex" }}>🧩</span> {title}
      </h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "3.5rem", justifyContent: "center", alignItems: "flex-start" }}>
        {/* Crossword Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gap: "4px",
          background: "var(--border-color)",
          padding: "15px",
          borderRadius: "16px",
          width: "fit-content",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          border: "1px solid var(--border-color)"
        }}>
          {grid.map((row, r) => row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{ position: "relative", width: "44px", height: "44px", background: cell === "#" ? "transparent" : "var(--bg-secondary)", borderRadius: "8px", overflow: "hidden" }}>
              {cell !== "#" && (
                <>
                  {getNumber(r, c) && (
                    <span style={{ position: "absolute", top: "4px", left: "6px", fontSize: "10px", fontWeight: "900", zIndex: 1, color: "var(--accent-primary)", opacity: 0.8 }}>
                      {getNumber(r, c)}
                    </span>
                  )}
                  <input
                    type="text"
                    value={userGrid[r]?.[c] || ""}
                    onChange={(e) => handleChange(r, c, e.target.value)}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      textAlign: "center",
                      fontSize: "1.3rem",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      background: isCorrect(r, c) === true ? "rgba(16,185,129,0.15)" : isCorrect(r, c) === false ? "rgba(239,68,68,0.15)" : "transparent",
                      color: isCorrect(r, c) === true ? "var(--accent-green)" : isCorrect(r, c) === false ? "var(--accent-red)" : "var(--text-primary)",
                      outline: "none",
                      transition: "all 0.2s"
                    }}
                    onFocus={() => setFocused({ r, c })}
                    onBlur={() => setFocused(null)}
                  />
                  {focused?.r === r && focused?.c === c && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--accent-primary)" }}></div>
                  )}
                </>
              )}
            </div>
          )))}
        </div>

        {/* Clues */}
        <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {["across", "down"].map(dir => (
            <div key={dir}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.6rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-primary)" }}></span>
                {dir === "across" ? "Horizontales" : "Verticales"}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {clues.filter(c => c.direction === dir).map(c => (
                  <div key={c.number} style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        <strong style={{ color: "var(--accent-primary)", fontSize: "1.1rem", marginRight: "0.6rem" }}>{c.number}</strong> {c.clue}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {c.hint && (
                          <button
                            onClick={() => toggleHint(c.number)}
                            style={{
                              background: activeHints.includes(c.number) ? "rgba(251, 191, 36, 0.2)" : "var(--bg-primary)",
                              border: `1px solid ${activeHints.includes(c.number) ? "#f59e0b" : "var(--border-color)"}`,
                              borderRadius: "8px",
                              padding: "0.4rem 0.8rem",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              color: activeHints.includes(c.number) ? "#b45309" : "var(--text-muted)",
                              cursor: "pointer",
                              transition: "all 0.2s",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {activeHints.includes(c.number) ? "💡 Ocultar" : "💡 Pista"}
                          </button>
                        )}
                        <button
                          onClick={() => solveClue(c)}
                          style={{
                            background: "var(--bg-primary)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            whiteSpace: "nowrap"
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = "var(--bg-primary)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                        >
                          👀 Ver
                        </button>
                      </div>
                    </div>
                    {activeHints.includes(c.number) && (
                      <div style={{ marginTop: "0.8rem", padding: "0.8rem", background: "rgba(251, 191, 36, 0.05)", borderRadius: "8px", fontSize: "0.85rem", color: "#b45309", borderLeft: "3px solid #fbbf24", animation: "fadeIn 0.3s ease" }}>
                        <strong>Pista:</strong> {c.hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {allDone && (
            <div style={{ marginTop: "1rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid var(--accent-green)", borderRadius: "16px", textAlign: "center", color: "var(--accent-green)", fontWeight: 900, fontSize: "1.2rem", animation: "bounce 1s infinite" }}>
              ¡Crucigrama Completado! 🏆
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>
        Haz clic en las celdas para escribir. Las letras correctas se marcarán en verde automáticamente.
      </p>
    </div>
  );
}

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
        if (r < size && col < size) {
          g[r][col] = "";
        }
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

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleChange = (r: number, c: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newGrid = [...userGrid];
    if (!newGrid[r]) newGrid[r] = [];
    newGrid[r][c] = val.toUpperCase();
    setUserGrid(newGrid);

    // Auto-advance
    if (val !== "") {
      const currentClue = clues.find(cl => {
        if (cl.direction === "across") {
          return r === cl.row && c >= cl.col && c < cl.col + cl.answer.length;
        } else {
          return c === cl.col && r >= cl.row && r < cl.row + cl.answer.length;
        }
      });

      if (currentClue) {
        const nr = currentClue.direction === "down" ? r + 1 : r;
        const nc = currentClue.direction === "across" ? c + 1 : c;
        if (nr < size && nc < size && grid[nr][nc] !== "#") {
          inputRefs.current[`${nr}-${nc}`]?.focus();
        }
      }
    }
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
    <div className="card" style={{ padding: "1.5rem", marginBottom: "4rem", background: "var(--bg-card)", borderRadius: "24px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)", border: "1px solid var(--border-color)" }}>
      <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", padding: "0.5rem", borderRadius: "12px", display: "flex" }}>🧩</span> {title}
      </h3>
      
      <div className="game-container-flex">
        <div className="game-grid-scroll">
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: `repeat(${size}, clamp(38px, 10vw, 48px))`, 
              gap: "3px", 
              background: "var(--border-color)", 
              padding: "6px", 
              borderRadius: "12px", 
              width: "max-content"
            }}
          >
            {grid.map((row, r) => row.map((cell, c) => (
              <div key={`${r}-${c}`} style={{ position: "relative", width: "clamp(38px, 10vw, 48px)", height: "clamp(38px, 10vw, 48px)", background: cell === "#" ? "transparent" : "var(--bg-secondary)", borderRadius: "6px", overflow: "hidden" }}>
                {cell !== "#" && (
                  <>
                    {getNumber(r, c) && (
                      <span style={{ position: "absolute", top: "2px", left: "4px", fontSize: "clamp(9px, 2.5vw, 11px)", fontWeight: "900", zIndex: 1, color: "var(--accent-primary)", opacity: 0.8 }}>
                        {getNumber(r, c)}
                      </span>
                    )}
                    <input
                      type="text"
                      ref={el => { inputRefs.current[`${r}-${c}`] = el; }}
                      value={userGrid[r]?.[c] || ""}
                      onChange={(e) => handleChange(r, c, e.target.value)}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        textAlign: "center",
                        fontSize: "clamp(1.1rem, 5vw, 1.4rem)",
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
        </div>

        <div className="game-clues-container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h5 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--accent-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Horizontal</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {clues.filter(cl => cl.direction === "across").map(cl => (
                  <div key={`${cl.number}-across`} style={{ padding: "0.8rem", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)", fontSize: "0.95rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontWeight: 900, color: "var(--accent-primary)", minWidth: "25px" }}>{cl.number}.</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{cl.clue}</span>
                    </div>
                    {cl.hint && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <button onClick={() => toggleHint(cl.number)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", padding: 0 }}>
                          {activeHints.includes(cl.number) ? "Ocultar pista" : "Ver pista"}
                        </button>
                        {activeHints.includes(cl.number) && (
                          <div style={{ marginTop: "0.4rem", padding: "0.5rem", background: "rgba(251, 191, 36, 0.1)", borderRadius: "8px", fontSize: "0.85rem", color: "#b45309", borderLeft: "3px solid #fbbf24" }}>
                            {cl.hint}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", color: "var(--accent-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>Vertical</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {clues.filter(cl => cl.direction === "down").map(cl => (
                  <div key={`${cl.number}-down`} style={{ padding: "0.8rem", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)", fontSize: "0.95rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontWeight: 900, color: "var(--accent-primary)", minWidth: "25px" }}>{cl.number}.</span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{cl.clue}</span>
                    </div>
                    {cl.hint && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <button onClick={() => toggleHint(cl.number)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", padding: 0 }}>
                          {activeHints.includes(cl.number) ? "Ocultar pista" : "Ver pista"}
                        </button>
                        {activeHints.includes(cl.number) && (
                          <div style={{ marginTop: "0.4rem", padding: "0.5rem", background: "rgba(251, 191, 36, 0.1)", borderRadius: "8px", fontSize: "0.85rem", color: "#b45309", borderLeft: "3px solid #fbbf24" }}>
                            {cl.hint}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {allDone && (
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid var(--accent-green)", borderRadius: "16px", textAlign: "center", color: "var(--accent-green)", fontWeight: 900, fontSize: "1.2rem" }}>
          ¡Increíble! Has resuelto el crucigrama correctamente. 🏆
        </div>
      )}
    </div>
  );
}

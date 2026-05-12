"use client";
import { useState, useRef } from "react";

/*
  Crossword layout updated for comprehensive SO + Minishell terms
*/

import ExamHint from "./ExamHint";

type WordDef = {
  num: number;
  clue: string;
  direction: "H" | "V";
  row: number;
  col: number;
  answer: string;
  hint?: string;
};

const WORDS: WordDef[] = [
  { num: 1, clue: "Núcleo del SO que gestiona hardware y recursos", direction: "V", row: 0, col: 4, answer: "KERNEL", hint: "Es el 'corazón' del Sistema Operativo." },
  { num: 2, clue: "Entidad activa con su propio espacio de direccionamiento", direction: "H", row: 2, col: 0, answer: "PROCESO", hint: "Es un programa en ejecución." },
  { num: 3, clue: "Llamada fundamental para duplicar procesos en Linux", direction: "H", row: 4, col: 6, answer: "FORK", hint: "Significa 'tenedor' o 'bifurcación' en inglés." },
  { num: 4, clue: "Tubería con nombre que permite comunicación entre procesos no emparentados", direction: "V", row: 0, col: 0, answer: "FIFO", hint: "Sus siglas significan First In, First Out." },
  { num: 5, clue: "Mecanismo IPC de System V que es el más rápido para intercambiar datos", direction: "H", row: 6, col: 0, answer: "MEMORIA", hint: "Es la '___ Compartida' (Shared ___)." },
  { num: 6, clue: "Unidad mínima de ejecución que comparte recursos en un proceso", direction: "V", row: 2, col: 10, answer: "HILO", hint: "También conocido como 'Thread'." },
  { num: 7, clue: "Llamada al sistema para control de dispositivos (usada para la MAC)", direction: "H", row: 10, col: 4, answer: "IOCTL", hint: "Input/Output ConTroL." },
  { num: 8, clue: "Llamada para crear un canal de comunicación unidireccional", direction: "V", row: 0, col: 2, answer: "PIPE", hint: "Significa 'tubería' en inglés." },
  { num: 9, clue: "Proyecto final: Intérprete de comandos que interactúa con el Kernel", direction: "H", row: 12, col: 0, answer: "MINISHELL", hint: "Es una versión 'pequeña' de Bash o Zsh." },
  { num: 10, clue: "Llamada para obtener estadísticas de memoria RAM (free)", direction: "V", row: 4, col: 13, answer: "SYSINFO", hint: "Abreviatura de SYStem INFOrmation." },
];

function buildGrid() {
  const ROWS = 15;
  const COLS = 15;
  const grid: (string | null)[][] = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
  const numMap: Record<string, number[]> = {};

  WORDS.forEach((w) => {
    for (let i = 0; i < w.answer.length; i++) {
      const r = w.direction === "H" ? w.row : w.row + i;
      const c = w.direction === "H" ? w.col + i : w.col;
      if (r < ROWS && c < COLS) {
        grid[r][c] = w.answer[i];
        const key = `${r},${c}`;
        numMap[key] = [...(numMap[key] || []), w.num];
      }
    }
  });
  return { grid, numMap, ROWS, COLS };
}

const { grid, numMap, ROWS, COLS } = buildGrid();

const startNums: Record<string, number> = {};
WORDS.forEach((w) => {
  const key = `${w.row},${w.col}`;
  if (!startNums[key]) startNums[key] = w.num;
});

export default function CrosswordSection() {
  const [userGrid, setUserGrid] = useState<string[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(""))
  );
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [showClues, setShowClues] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );

  const isPartOfWord = (r: number, c: number, wordNum: number): boolean => {
    const w = WORDS.find((x) => x.num === wordNum);
    if (!w) return false;
    for (let i = 0; i < w.answer.length; i++) {
      const wr = w.direction === "H" ? w.row : w.row + i;
      const wc = w.direction === "H" ? w.col + i : w.col;
      if (wr === r && wc === c) return true;
    }
    return false;
  };

  const handleInput = (r: number, c: number, val: string) => {
    const letter = val.slice(-1).toUpperCase();
    const newGrid = userGrid.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? letter : cell))
    );
    setUserGrid(newGrid);

    if (activeWord && letter) {
      const w = WORDS.find((x) => x.num === activeWord);
      if (w) {
        const cells: [number, number][] = [];
        for (let i = 0; i < w.answer.length; i++) {
          cells.push([w.direction === "H" ? w.row : w.row + i, w.direction === "H" ? w.col + i : w.col]);
        }
        const idx = cells.findIndex(([wr, wc]) => wr === r && wc === c);
        if (idx !== -1 && idx + 1 < cells.length) {
          const [nr, nc] = cells[idx + 1];
          inputRefs.current[nr]?.[nc]?.focus();
        }
      }
    }
  };

  const checkCrossword = () => setChecked(true);
  const resetCrossword = () => {
    setUserGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill("")));
    setChecked(false);
    setActiveWord(null);
  };

  const getScore = () => {
    let correct = 0, total = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c]) {
          total++;
          if (userGrid[r][c] === grid[r][c]) correct++;
        }
      }
    }
    return { correct, total, pct: total > 0 ? Math.round((correct / total) * 100) : 0 };
  };

  const { correct, total, pct } = getScore();

  return (
    <section id="crucigrama" style={{ padding: "6rem 2rem", background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className="section-title">Crucigrama Global de SO</h2>
          <p className="section-subtitle">Aplica todo lo aprendido desde procesos hasta el Minishell</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="crossword-layout">
          <div style={{ order: 1 }} className="crossword-clues">
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <button
                style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: showClues ? "var(--accent-primary)" : "var(--bg-secondary)", color: showClues ? "white" : "var(--text-secondary)", fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}
                onClick={() => setShowClues(true)}
              >Horizontales</button>
              <button
                style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: !showClues ? "var(--accent-primary)" : "var(--bg-secondary)", color: !showClues ? "white" : "var(--text-secondary)", fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}
                onClick={() => setShowClues(false)}
              >Verticales</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {WORDS.filter((w) => showClues ? w.direction === "H" : w.direction === "V").map((w) => (
                <div key={w.num} onClick={() => { setActiveWord(w.num); inputRefs.current[w.row]?.[w.col]?.focus(); }}
                  style={{ 
                    padding: "1rem", 
                    borderRadius: "12px", 
                    cursor: "pointer", 
                    background: activeWord === w.num ? "rgba(155,28,46,0.1)" : "var(--bg-card)", 
                    border: `1px solid ${activeWord === w.num ? "var(--accent-primary)" : "var(--border-color)"}`, 
                    transition: "all 0.2s", 
                    display: "flex", 
                    gap: "1rem", 
                    alignItems: "flex-start",
                    boxShadow: activeWord === w.num ? "0 4px 12px rgba(155,28,46,0.15)" : "none"
                  }}>
                  <span style={{ fontWeight: 800, color: activeWord === w.num ? "var(--accent-primary)" : "var(--text-muted)", fontSize: "0.9rem", minWidth: "24px", paddingTop: "2px" }}>{w.num}.</span>
                  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <span style={{ color: activeWord === w.num ? "var(--text-primary)" : "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, fontWeight: activeWord === w.num ? 600 : 500 }}>{w.clue}</span>
                    {w.hint && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <ExamHint hint={w.hint} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {checked && (
              <div style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: "16px", background: pct >= 70 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `2px solid ${pct >= 70 ? "var(--accent-green)" : "var(--accent-red)"}`, textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 900, color: pct >= 70 ? "var(--accent-green)" : "var(--accent-red)", fontFamily: "Outfit, sans-serif" }}>{pct}%</div>
                <div style={{ color: "var(--text-primary)", fontSize: "0.95rem", fontWeight: 600 }}>{correct}/{total} letras correctas</div>
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button className="btn-primary" onClick={checkCrossword} style={{ flex: 1, padding: "1rem" }}>✅ Verificar</button>
              <button className="btn-secondary" onClick={resetCrossword} style={{ flex: 1, padding: "1rem" }}>🔄 Reiniciar</button>
            </div>
          </div>

          <div style={{ overflowX: "auto", order: 2 }}>
            <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${COLS}, 40px)`, gap: "4px", background: "var(--bg-primary)", padding: "12px", borderRadius: "16px", border: "2px solid var(--border-color)", boxShadow: "0 0 40px rgba(0,0,0,0.3)" }}>
              {Array(ROWS).fill(null).map((_, r) => Array(COLS).fill(null).map((_, c) => {
                const letter = grid[r][c];
                const key = `${r},${c}`;
                const num = startNums[key];
                const isActive = activeWord !== null && isPartOfWord(r, c, activeWord);
                const isCorrect = checked && letter && userGrid[r][c] === letter;
                const isWrong = checked && letter && userGrid[r][c] && userGrid[r][c] !== letter;

                if (!letter) return <div key={key} style={{ width: "40px", height: "40px", background: "rgba(255,255,255,0.03)", borderRadius: "6px" }} />;

                return (
                  <div key={key} style={{ position: "relative" }}>
                    {num && <span style={{ position: "absolute", top: "2px", left: "4px", fontSize: "0.65rem", color: "var(--accent-primary)", zIndex: 2, fontWeight: 900, textShadow: "0 0 4px rgba(0,0,0,0.5)" }}>{num}</span>}
                    <input ref={(el) => { if (!inputRefs.current[r]) inputRefs.current[r] = []; inputRefs.current[r][c] = el; }}
                      className={`crossword-cell ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      value={userGrid[r][c]} maxLength={1} onChange={(e) => handleInput(r, c, e.target.value)}
                      onFocus={() => { const wNum = numMap[key]?.[0]; if (wNum) setActiveWord(wNum); }}
                      style={{ 
                        background: isCorrect ? "rgba(16,185,129,0.2)" : isWrong ? "rgba(239,68,68,0.2)" : isActive ? "rgba(155,28,46,0.15)" : "var(--bg-card)", 
                        width: "40px", 
                        height: "40px", 
                        textAlign: "center", 
                        fontSize: "1.1rem", 
                        fontWeight: 900, 
                        border: `1.5px solid ${isActive ? "var(--accent-primary)" : isCorrect ? "var(--accent-green)" : isWrong ? "var(--accent-red)" : "var(--border-color)"}`, 
                        borderRadius: "6px", 
                        outline: "none",
                        color: isCorrect ? "var(--accent-green)" : isWrong ? "var(--accent-red)" : "var(--text-primary)",
                        transition: "all 0.2s",
                        boxShadow: isActive ? "0 0 10px rgba(155,28,46,0.2)" : "none"
                      }}
                    />
                  </div>
                );
              }))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .crossword-layout { grid-template-columns: 1fr !important; }
          .crossword-clues { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}

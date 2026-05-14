"use client";
import React, { useState } from "react";

export interface FillBlankItem {
  id: number;
  textBefore: string;
  textAfter: string;
  answer: string;
  hint?: string;
}

interface FillInBlanksProps {
  title: string;
  items: FillBlankItem[];
}

export default function FillInBlanks({ title, items }: FillInBlanksProps) {
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [activeHints, setActiveHints] = useState<number[]>([]);

  const toggleHint = (id: number) => {
    setActiveHints(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const handleReveal = () => {
    const revealed: {[key: number]: string} = {};
    items.forEach(i => revealed[i.id] = i.answer);
    setAnswers(revealed);
    setShowResults(true);
  };

  const normalize = (str: string) => 
    str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

  const isCorrect = (id: number) => {
    const item = items.find(i => i.id === id);
    if (!item) return false;
    return normalize(answers[id]) === normalize(item.answer);
  };

  const allCorrect = items.every(i => isCorrect(i.id));

  return (
    <div className="card" style={{ padding: "2.5rem", marginBottom: "4rem", background: "var(--bg-card)", borderRadius: "24px", boxShadow: "0 15px 40px rgba(0,0,0,0.08)", border: "1px solid var(--border-color)" }}>
      <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", padding: "0.5rem", borderRadius: "12px", display: "flex" }}>📝</span> {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {items.map((item, idx) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "1.1rem", color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border-color)", lineHeight: "1.8" }}>
            <span style={{ fontWeight: 800, color: "var(--accent-primary)", marginRight: "0.5rem" }}>{idx + 1}.</span>
            <span>{item.textBefore}</span>
            <input 
              type="text" 
              value={answers[item.id] || ""}
              onChange={(e) => {
                setAnswers({...answers, [item.id]: e.target.value});
                setShowResults(false);
              }}
              style={{
                background: "var(--bg-primary)",
                border: showResults ? (isCorrect(item.id) ? "2px solid var(--accent-green)" : "2px solid var(--accent-red)") : "2px solid var(--border-color)",
                color: showResults ? (isCorrect(item.id) ? "var(--accent-green)" : "var(--accent-red)") : "var(--text-primary)",
                borderRadius: "8px",
                padding: "0.3rem 0.6rem",
                width: Math.max(120, item.answer.length * 12) + "px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                outline: "none",
                fontFamily: "monospace"
              }}
              spellCheck={false}
            />
            <span>{item.textAfter}</span>
            {item.hint && (
              <div style={{ width: "100%", marginTop: "0.8rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div>
                  <button
                    onClick={() => toggleHint(item.id)}
                    style={{
                      background: activeHints.includes(item.id) ? "rgba(251, 191, 36, 0.2)" : "var(--bg-primary)",
                      border: `1px solid ${activeHints.includes(item.id) ? "#f59e0b" : "var(--border-color)"}`,
                      borderRadius: "8px",
                      padding: "0.4rem 0.8rem",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: activeHints.includes(item.id) ? "#b45309" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {activeHints.includes(item.id) ? "💡 Ocultar Pista" : "💡 Mostrar Pista"}
                  </button>
                </div>
                {activeHints.includes(item.id) && (
                  <div style={{ padding: "0.8rem", background: "rgba(251, 191, 36, 0.05)", borderRadius: "8px", fontSize: "0.85rem", color: "#b45309", borderLeft: "3px solid #fbbf24", animation: "fadeIn 0.3s ease" }}>
                    <strong>Pista:</strong> {item.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        {!allCorrect && (
          <>
            <button 
              onClick={() => setShowResults(true)}
              style={{ padding: "0.8rem 2rem", background: "var(--accent-primary)", color: "white", border: "none", borderRadius: "12px", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={e => e.currentTarget.style.filter = "brightness(1.1)"}
              onMouseOut={e => e.currentTarget.style.filter = "none"}
            >
              Comprobar Respuestas
            </button>
            <button 
              onClick={handleReveal}
              style={{ padding: "0.8rem 2rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", borderRadius: "12px", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}
            >
              👀 Ver Solución
            </button>
          </>
        )}
      </div>

      {showResults && allCorrect && (
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid var(--accent-green)", borderRadius: "16px", textAlign: "center", color: "var(--accent-green)", fontWeight: 900, fontSize: "1.2rem", animation: "bounce 1s infinite" }}>
          ¡Excelente! Has completado todas las frases correctamente. 🏆
        </div>
      )}
    </div>
  );
}

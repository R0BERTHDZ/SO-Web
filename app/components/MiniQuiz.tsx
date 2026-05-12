"use client";
import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hint?: string;
};

export default function MiniQuiz({ questions, title, nextSectionId }: { questions: Question[]; title: string; nextSectionId?: string }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (selected !== questions[current].correct) {
      setHasFailed(true);
      return;
    }

    if (current + 1 >= questions.length) {
      setIsPassed(true);
      const completedStr = localStorage.getItem("os_completed_quizzes") || "[]";
      let completed: string[] = [];
      try { completed = JSON.parse(completedStr); } catch(e){}
      if (!completed.includes(title)) {
        completed.push(title);
        localStorage.setItem("os_completed_quizzes", JSON.stringify(completed));
        window.dispatchEvent(new Event("os_progress_update"));
      }
    } else {
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
      setCurrent(c => c + 1);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setShowHint(false);
    setIsPassed(false);
    setHasFailed(false);
    setScore(0);
  };

  if (isPassed) {
    return (
      <div className="card animate-fadeInUp" style={{ marginBottom: "2rem", border: "1px solid var(--accent-green)", textAlign: "center", padding: "3rem 2rem", background: "var(--bg-card)", borderRadius: "16px", boxShadow: "0 10px 25px rgba(16,185,129,0.15)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>🏆</div>
        <h4 style={{ color: "var(--accent-green)", fontWeight: 800, margin: "0 0 1rem", fontSize: "1.8rem", letterSpacing: "-0.5px" }}>¡Examen Perfecto!</h4>
        <p style={{ fontSize: "1.15rem", marginBottom: nextSectionId ? "2rem" : "0", color: "var(--text-secondary)", fontWeight: 500 }}>Has respondido correctamente {questions.length}/{questions.length} preguntas. ¡Dominas el tema!</p>
        
        {nextSectionId && (
          <button 
            className="btn-primary" 
            onClick={() => {
              window.dispatchEvent(new CustomEvent("os_navigate", { detail: nextSectionId }));
            }}
            style={{ 
              background: "var(--accent-green)", 
              borderColor: "var(--accent-green)", 
              fontSize: "1.1rem", 
              padding: "0.8rem 2.5rem", 
              borderRadius: "30px", 
              fontWeight: 700, 
              boxShadow: "0 4px 15px rgba(5, 150, 105, 0.3)", 
              transition: "transform 0.2s" 
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            Siguiente Lección ➔
          </button>
        )}
      </div>
    );
  }

  if (hasFailed) {
    return (
      <div className="card animate-fadeInUp" style={{ marginBottom: "2rem", border: "1px solid var(--accent-red)", textAlign: "center", padding: "3rem 2rem", background: "var(--bg-card)", borderRadius: "16px", boxShadow: "0 10px 25px rgba(239,68,68,0.15)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>😓</div>
        <h4 style={{ color: "var(--accent-red)", fontWeight: 800, margin: "0 0 1rem", fontSize: "1.8rem", letterSpacing: "-0.5px" }}>Mini-Examen Fallido</h4>
        <p style={{ fontSize: "1.15rem", marginBottom: "2rem", color: "var(--text-secondary)", fontWeight: 500 }}>Equivocaste la pregunta {current + 1}. Se requiere calificación perfecta ({questions.length}/{questions.length}) para aprobar.</p>
        <button className="btn-primary" onClick={reset} style={{ background: "var(--accent-primary)", borderColor: "var(--accent-primary)", fontSize: "1.1rem", padding: "0.8rem 2rem" }}>Reintentar Examen</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="card" style={{ marginBottom: "2rem", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.5rem" }}>📝</span>
          <h4 style={{ color: "var(--accent-primary)", fontWeight: 800, margin: 0, fontSize: "1.2rem" }}>{title}</h4>
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 700, background: "var(--bg-primary)", padding: "0.3rem 0.8rem", borderRadius: "20px" }}>
          Pregunta {current + 1} de {questions.length} (Racha: {score})
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>
          {q.question}
        </div>
        {q.hint && !showResult && (
          <button 
            onClick={() => setShowHint(!showHint)}
            style={{ 
              background: showHint ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)", 
              border: `1px solid ${showHint ? "#f59e0b" : "var(--border-color)"}`,
              borderRadius: "8px",
              padding: "0.4rem 0.8rem",
              fontSize: "0.8rem",
              fontWeight: 800,
              color: showHint ? "#b45309" : "var(--text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.2s"
            }}
          >
            <span>💡</span> {showHint ? "Ocultar Pista" : "Ver Pista"}
          </button>
        )}
      </div>

      {showHint && !showResult && (
        <div style={{ 
          marginBottom: "1.5rem", 
          padding: "1rem 1.5rem", 
          background: "rgba(251, 191, 36, 0.05)", 
          borderRadius: "12px", 
          borderLeft: "4px solid #fbbf24",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          fontStyle: "italic",
          animation: "fadeIn 0.3s ease"
        }}>
          <strong>Pista:</strong> {q.hint}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
        {q.options.map((opt, idx) => {
          let bg = "var(--bg-secondary)";
          let border = "1px solid var(--border-color)";
          let color = "var(--text-secondary)";
          
          if (showResult) {
            if (idx === q.correct) {
              bg = "rgba(16,185,129,0.1)";
              border = "2px solid var(--accent-green)";
              color = "var(--accent-green)";
            } else if (idx === selected) {
              bg = "rgba(239,68,68,0.1)";
              border = "2px solid var(--accent-red)";
              color = "var(--accent-red)";
            }
          } else if (selected === idx) {
            bg = "rgba(155, 28, 46, 0.05)";
            border = "2px solid var(--accent-primary)";
            color = "var(--text-primary)";
          }

          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => handleSelect(idx)}
              style={{
                padding: "1.1rem 1.5rem",
                borderRadius: "12px",
                background: bg,
                border: border,
                color: color,
                textAlign: "left",
                cursor: showResult ? "default" : "pointer",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                fontWeight: (showResult && idx === q.correct) || (selected === idx) ? 700 : 500,
                fontSize: "1rem",
                boxShadow: !showResult && selected === idx ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ 
                  width: "22px", 
                  height: "22px", 
                  minWidth: "22px", 
                  borderRadius: "50%", 
                  border: `2px solid ${idx === q.correct && showResult ? "var(--accent-green)" : (selected === idx ? "var(--accent-primary)" : "var(--border-color)")}`,
                  background: (idx === q.correct && showResult) ? "var(--accent-green)" : (selected === idx ? "var(--accent-primary)" : "transparent"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  color: (selected === idx) || (idx === q.correct && showResult) ? "white" : "var(--text-muted)",
                  marginTop: "2px"
                }}>
                  {showResult && idx === q.correct ? "✓" : String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div style={{ animation: "fadeIn 0.3s ease", background: selected === q.correct ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)", padding: "1.5rem", borderRadius: "12px", borderLeft: selected === q.correct ? "4px solid var(--accent-green)" : "4px solid var(--accent-red)" }}>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", color: selected === q.correct ? "var(--accent-green)" : "var(--accent-red)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {selected === q.correct ? "✅ ¡Respuesta Correcta!" : "❌ Respuesta Incorrecta"}
          </div>
          <div style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            {q.explanation}
          </div>
          <div style={{ textAlign: "right" }}>
            <button 
              className="btn-primary" 
              onClick={handleNext} 
              style={{ 
                background: selected === q.correct ? "var(--accent-green)" : "var(--accent-primary)", 
                borderColor: selected === q.correct ? "var(--accent-green)" : "var(--accent-primary)", 
                padding: "0.8rem 2rem", 
                fontSize: "1.05rem" 
              }}
            >
              {selected !== q.correct ? "Finalizar Intento" : (current + 1 >= questions.length ? "Finalizar Mini-Examen 🏆" : "Siguiente Pregunta ➔")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState } from 'react';

export default function ZombieActivity() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const correctAnswers = {
    q1: "wait",
    q2: "tabla",
    q3: "init",
    q4: "Z"
  };

  const checkAllCorrect = () => {
    return Object.keys(correctAnswers).every(key => answers[key as keyof typeof answers] === correctAnswers[key as keyof typeof correctAnswers]);
  };

  const handleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    setShowResult(false);
  };

  return (
    <div className="card animate-fadeInUp" style={{ padding: "clamp(1.5rem, 5vw, 2.5rem)", borderRadius: "16px", background: "linear-gradient(135deg, #2a0808 0%, #1a1a1a 100%)", color: "white", marginTop: "3rem", marginBottom: "2rem", border: "1px solid rgba(239, 68, 68, 0.2)", boxShadow: "0 10px 30px rgba(239, 68, 68, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <h3 style={{ color: "#ef4444", margin: 0, display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "clamp(1.2rem, 5vw, 1.4rem)", fontWeight: 800 }}>
          <span>🧟</span> Actividad: Laboratorio de Zombis
        </h3>
        <button 
          onClick={() => setShowHint(!showHint)}
          style={{ 
            background: showHint ? "rgba(251, 191, 36, 0.2)" : "rgba(255,255,255,0.05)", 
            border: `1px solid ${showHint ? "#f59e0b" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "8px",
            padding: "0.4rem 0.8rem",
            fontSize: "0.75rem",
            fontWeight: 800,
            color: showHint ? "#fbbf24" : "#d4d4d4",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {showHint ? "💡 Ocultar Pista" : "💡 Ver Pista"}
        </button>
      </div>

      {showHint && (
        <div style={{ marginBottom: "1.5rem", padding: "1rem 1.2rem", background: "rgba(251, 191, 36, 0.1)", borderRadius: "10px", borderLeft: "4px solid #fbbf24", fontSize: "clamp(0.85rem, 4vw, 0.95rem)", color: "#fbbf24", animation: "fadeIn 0.3s ease" }}>
          <strong>Pista:</strong> Recuerda que wait() 'espera' por el hijo, 'init' es el padre de todos, y la 'Z' viene de la primera letra de la palabra que define este estado.
        </div>
      )}
      <p style={{ color: "#d4d4d4", lineHeight: "clamp(2, 6vw, 2.4)", fontSize: "clamp(1rem, 4.5vw, 1.15rem)", margin: 0 }}>
        Un proceso zombi surge cuando un hijo termina pero su proceso padre no ejecuta <select value={answers.q1} onChange={(e) => handleSelect("q1", e.target.value)} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "0.2rem 0.4rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", outline: "none", appearance: "none", textAlign: "center", margin: "0 0.2rem" }}>
          <option value="" disabled>___</option>
          <option value="fork">fork()</option>
          <option value="wait">wait()</option>
          <option value="exit">exit()</option>
        </select> para recoger su estado de salida. 
        <br/><br/>
        Aunque el zombi ya no consume tiempo de CPU, es peligroso porque sigue ocupando una entrada en la <select value={answers.q2} onChange={(e) => handleSelect("q2", e.target.value)} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "0.2rem 0.4rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", outline: "none", appearance: "none", textAlign: "center", margin: "0 0.2rem" }}>
          <option value="" disabled>___</option>
          <option value="ram">memoria RAM</option>
          <option value="disco">caché de disco</option>
          <option value="tabla">tabla de procesos</option>
        </select>.
        <br/><br/>
        Si el padre muere antes que el hijo, el hijo no se vuelve zombi; se vuelve huérfano y es adoptado inmediatamente por <select value={answers.q3} onChange={(e) => handleSelect("q3", e.target.value)} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "0.2rem 0.4rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", outline: "none", appearance: "none", textAlign: "center", margin: "0 0.2rem" }}>
          <option value="" disabled>___</option>
          <option value="init">PID 1 (init/systemd)</option>
          <option value="kernel">el Kernel</option>
          <option value="bash">bash</option>
        </select> quien lo limpiará. 
        <br/><br/>
        Para buscar y observar zombis en tu sistema Linux desde la terminal, puedes usar el comando <code>ps -el | grep</code> <select value={answers.q4} onChange={(e) => handleSelect("q4", e.target.value)} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "6px", padding: "0.2rem 0.4rem", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", outline: "none", appearance: "none", textAlign: "center", margin: "0 0.2rem" }}>
          <option value="" disabled>_</option>
          <option value="X">X</option>
          <option value="Z">Z</option>
          <option value="S">S</option>
        </select>.
      </p>

      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <button 
          onClick={() => setShowResult(true)}
          style={{
            background: "var(--accent-primary)",
            color: "white",
            border: "none",
            padding: "0.8rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            width: "100%",
            maxWidth: "300px"
          }}
          onMouseOver={(e) => e.currentTarget.style.filter = "brightness(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.filter = "brightness(1)"}
        >
          Verificar Respuestas
        </button>
      </div>

      {showResult && (
        checkAllCorrect() ? (
          <div className="animate-fadeInUp" style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.15)", border: "2px solid #10b981", borderRadius: "12px", color: "#34d399", fontWeight: "bold", textAlign: "center", fontSize: "1.2rem", boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)" }}>
            ¡Excelente! Has limpiado la tabla de procesos y dominado el concepto zombi. 🚀
          </div>
        ) : (
          <div className="animate-fadeInUp" style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(239, 68, 68, 0.1)", border: "2px dashed rgba(239, 68, 68, 0.5)", borderRadius: "12px", color: "#fca5a5" }}>
            <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.1rem", marginBottom: "1rem" }}>
              Aún quedan zombis en el sistema. 🧟 Aquí tienes la corrección:
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {answers.q1 !== correctAnswers.q1 && <li>❌ Pregunta 1: Elegiste un valor incorrecto. La llamada correcta es <strong style={{ color: "white" }}>wait()</strong>.</li>}
              {answers.q2 !== correctAnswers.q2 && <li>❌ Pregunta 2: Los zombis ya no ocupan memoria RAM. Siguen ocupando una entrada en la <strong style={{ color: "white" }}>tabla de procesos</strong>.</li>}
              {answers.q3 !== correctAnswers.q3 && <li>❌ Pregunta 3: El Kernel no adopta directamente; el proceso padre definitivo que adopta huérfanos es <strong style={{ color: "white" }}>PID 1 (init/systemd)</strong>.</li>}
              {answers.q4 !== correctAnswers.q4 && <li>❌ Pregunta 4: La letra que identifica el estado Zombi en 'ps' es la <strong style={{ color: "white" }}>Z</strong>.</li>}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

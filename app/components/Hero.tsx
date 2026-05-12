"use client";
import { useState, useEffect } from "react";
import SystemMonitor from "./SystemMonitor";
import QuickCommand from "./QuickCommand";

export default function Hero() {
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    const updateProgress = () => {
      const completedStr = localStorage.getItem("os_completed_quizzes") || "[]";
      try {
        setCompletedQuizzes(JSON.parse(completedStr));
      } catch (e) { }
    };

    updateProgress();
    window.addEventListener("os_progress_update", updateProgress);
    return () => window.removeEventListener("os_progress_update", updateProgress);
  }, []);

  const totalChapters = 2;
  const progressPercent = Math.min(100, Math.round((completedQuizzes.length / totalChapters) * 100));

  const currentLessonTitle = completedQuizzes.length === 0 ? "1. Introducción a SO" : "2. Procesos e Hilos";
  const currentLessonDesc = completedQuizzes.length === 0 ? "Conceptos fundamentales, arquitectura básica y clasificación general." : "Implementación de un algoritmo de planificación en lenguaje C.";
  const buttonText = completedQuizzes.length === 0 ? "Comenzar Lectura" : "Continuar Lectura";

  const handleScrollToLesson = () => {
    const targetId = completedQuizzes.length === 0 ? "intro-linux" : "procesos-conceptos";
    window.dispatchEvent(new CustomEvent("os_navigate", { detail: targetId }));
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 1.5rem" }} className="animate-fadeInUp">
      <div className="hero-grid">

        {/* Left Column: Welcome & Progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              Un vistazo a los <br /><span style={{ color: "var(--text-primary)" }}>Sistemas Operativos</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", lineHeight: 1.7 }}>
              Bienvenido a tu estación de trabajo. Administra tu aprendizaje y monitorea el estado del núcleo en tiempo real.
            </p>
          </div>

          <div style={{ border: "1px solid var(--border-color)", borderRadius: "20px", padding: "2rem", background: "var(--bg-card)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem", alignItems: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--text-primary)" }}>Nivel de Acceso: Root</div>
              <div style={{ color: "white", fontWeight: 800, background: "var(--accent-primary)", padding: "0.4rem 1rem", borderRadius: "10px", fontSize: "0.9rem", boxShadow: "0 4px 12px rgba(155,28,46,0.3)" }}>{progressPercent}% COMPLETE</div>
            </div>
            <div style={{ height: "12px", background: "var(--bg-primary)", borderRadius: "6px", marginBottom: "2rem", overflow: "hidden", border: "1px solid var(--border-color)" }}>
              <div style={{ width: `${progressPercent}%`, height: "100%", background: "linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-blue) 100%)", borderRadius: "6px", transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "var(--glow-primary)" }}></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "TEORÍA", val: "82%", color: "var(--accent-primary)" },
                { label: "PRÁCTICAS", val: "45%", color: "var(--accent-blue)" }
              ].map(stat => (
                <div key={stat.label} style={{ background: "var(--bg-secondary)", padding: "1.2rem 1rem", borderRadius: "14px", textAlign: "center", border: "1px solid var(--border-color)", transition: "transform 0.3s ease" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "1.5px", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{stat.label}</div>
                  <div style={{ fontWeight: 900, color: stat.color, fontSize: "1.4rem", letterSpacing: "-0.02em" }}>{stat.val}</div>
                </div>
              ))}
            </div>
          </div>

          <QuickCommand />
        </div>

        {/* Right Column: Active Lesson & System Monitor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "20px", padding: "2.5rem", color: "white", position: "relative", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(155, 28, 46, 0.1)", borderRadius: "50%", filter: "blur(40px)" }}></div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", opacity: 0.7, marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#f59e0b", borderRadius: "50%" }}></span>
              LECCIÓN PRIORITARIA
            </div>

            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
              {currentLessonTitle}
            </h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "2.5rem", lineHeight: 1.6, maxWidth: "400px" }}>
              {currentLessonDesc}
            </p>

            <button
              onClick={handleScrollToLesson}
              style={{
                background: "white",
                color: "#0f172a",
                border: "none",
                padding: "1.2rem 2rem",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                width: "fit-content"
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(255,255,255,0.2)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {buttonText}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <SystemMonitor />
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) { 
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

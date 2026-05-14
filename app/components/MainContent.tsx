"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Chapter1_1, Chapter1_2, Chapter1_3, Chapter2_1, Chapter2_2, Chapter2_3, Chapter2_5, Chapter2_6, Chapter2_7, Chapter2_8, Chapter2_8_1 } from "./Chapters12";
import { Chapter3_Intro, Chapter3_1_1, Chapter3_1_2, Chapter3_2_1, Chapter3_2_2, Chapter3_3_1, Chapter3_3_2, Chapter3_3_3, Chapter3_4 } from "./Chapter3";
import ExercisesSection from "./ExercisesSection";
import CrosswordSection from "./CrosswordSection";
import CreditsSection from "./CreditsSection";
import Hero from "./Hero";
import UnitReview1 from "./UnitReview1";
import UnitReview2 from "./UnitReview2";
import UnitReview3 from "./UnitReview3";
import UnitReviewMinishell from "./UnitReviewMinishell";
import MinishellProject from "./MinishellProject";
import PartialExam2 from "./PartialExam2";
import PartialExam3 from "./PartialExam3";

// Ordered list of all topics — this controls the prev/next flow
const TOPICS: { id: string; label: string; component: React.ReactNode }[] = [
  { id: "intro-so",          label: "1.1 ¿Qué es un SO?",                  component: <Chapter1_1 /> },
  { id: "clasificacion",      label: "1.2 Clasificación de SO",             component: <Chapter1_2 /> },
  { id: "arranque",           label: "1.3 Proceso de Arranque",             component: <Chapter1_3 /> },
  { id: "repaso-unidad1",     label: "🧠 Repaso: Unidad 1",                 component: <UnitReview1 /> },
  { id: "procesos-conceptos",   label: "2.1 Conceptos de Procesos",           component: <Chapter2_1 /> },
  { id: "crear-procesos",       label: "2.2 Crear Procesos (fork)",           component: <Chapter2_2 /> },
  { id: "identificar-procesos", label: "2.4 Identificar Procesos",            component: <Chapter2_3 /> },
  { id: "wait",                 label: "2.5 Sistema de llamada wait()",        component: <Chapter2_5 /> },
  { id: "waitpid",              label: "2.5.1 Uso de waitpid()",              component: <Chapter2_5 /> },
  { id: "exit",                 label: "2.6 _exit() y exit()",                component: <Chapter2_6 /> },
  { id: "zombi",                label: "2.7 Estado Zombi",                    component: <Chapter2_7 /> },
  { id: "hilos",                label: "2.8 Hilos (Threads)",                 component: <Chapter2_8 /> },
  { id: "creacion-hilos",       label: "2.8.1 Creación de Hilos",             component: <Chapter2_8_1 /> },
  { id: "repaso-unidad2",       label: "🧠 Repaso: Unidad 2",                 component: <UnitReview2 /> },
  { id: "ipc-intro",          label: "3.1 Introducción IPC",                component: <Chapter3_Intro /> },
  { id: "ipc-pipes",          label: "3.1.1 Tuberías (Pipes)",               component: <Chapter3_1_1 /> },
  { id: "ipc-fifo",           label: "3.1.2 Tuberías (FIFO)",                component: <Chapter3_1_2 /> },
  { id: "sysv-keys",          label: "3.2.1 Llaves (ftok)",                  component: <Chapter3_2_1 /> },
  { id: "sysv-sem",           label: "3.2.2 Semáforos System V",             component: <Chapter3_2_2 /> },
  { id: "sysv-shm",           label: "3.3 Memoria Compartida",               component: <Chapter3_3_1 /> },
  { id: "sysv-msg",           label: "3.4 Colas de Mensajes",                component: <Chapter3_3_2 /> },
  { id: "sysv-ipcs",          label: "3.5 Comandos del Sistema",             component: <Chapter3_3_3 /> },
  { id: "repaso-unidad3",     label: "🧠 Repaso: Unidad 3",                 component: <UnitReview3 /> },
  { id: "minishell",          label: "🚀 Proyecto: Minishell",               component: <MinishellProject /> },
  { id: "repaso-minishell",   label: "🧠 Repaso: Minishell",                component: <UnitReviewMinishell /> },
  { id: "examen-parcial2",    label: "📝 Examen: 2do Parcial",               component: <PartialExam2 /> },
  { id: "examen-parcial3",    label: "📝 Examen: 3er Parcial",               component: <PartialExam3 /> },
  { id: "ejercicios",         label: "Práctica Global",                      component: <UnitReview3 /> },
  { id: "creditos",             label: "Créditos",                            component: <CreditsSection /> },
];

const ALIAS: Record<string, string> = {
  "intro-linux": "intro-so",
  "procesos": "procesos-conceptos",
  "ipc": "ipc-intro"
};

export default function MainContent() {
  const [activeId, setActiveId] = useState("intro-so");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resolveId = (id: string) => ALIAS[id] ?? id;

  const currentIndex = TOPICS.findIndex(t => t.id === activeId);

  const navigate = (id: string) => {
    const resolved = resolveId(id);
    setActiveId(resolved);
    setIsMobileMenuOpen(false); // Auto-close on mobile
    
    // Scroll logic
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const contentArea = document.getElementById("study-material");
      if (contentArea) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = contentArea.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) navigate(customEvent.detail);
    };
    window.addEventListener("os_navigate", handleNavigate);
    return () => window.removeEventListener("os_navigate", handleNavigate);
  }, []);

  const currentTopic = TOPICS[currentIndex];

  return (
    <>
      <Hero />
      
      <div id="study-material" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: "2.5rem", alignItems: "stretch", paddingTop: "2rem", paddingBottom: "5rem" }}>
        
        {/* Mobile Overlay */}
        <div 
          className={`mobile-overlay ${isMobileMenuOpen ? "open" : ""}`} 
          style={{ cursor: "pointer" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Button - ONLY VISIBLE ON MOBILE VIA CSS */}
        <button 
          className="sidebar-toggle-btn" 
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(true);
          }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
          Temario del Curso
        </button>

        {/* Sidebar Wrapper */}
        <div className={`sidebar-wrapper ${isMobileMenuOpen ? "open" : ""}`}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "1.5rem", 
            borderBottom: "1px solid var(--border-color)",
            marginBottom: "0.5rem",
            background: "var(--bg-primary)"
          }} className="mobile-only-close">
             <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--accent-primary)", letterSpacing: "-0.02em" }}>Menú del Curso</h3>
             <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              style={{ 
                background: "var(--bg-secondary)", 
                border: "1px solid var(--border-color)", 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                fontSize: "1.2rem", 
                cursor: "pointer", 
                color: "var(--text-primary)" 
              }}>×</button>
          </div>
          <Sidebar active={activeId} setActive={(id: string) => navigate(id)} />
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Material de Estudio</h2>
            <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", color: "var(--accent-primary)", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
              Descargar Tema PDF
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>

          {/* Render the active topic component */}
          <div key={activeId} className="animate-fadeIn">
            {currentTopic?.component}
          </div>

          {/* Navigation buttons at the bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
            {currentIndex > 0 ? (
              <button 
                onClick={() => navigate(TOPICS[currentIndex - 1].id)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1px" }}>TEMA ANTERIOR</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>← {TOPICS[currentIndex - 1].label}</span>
              </button>
            ) : <div />}

            {currentIndex < TOPICS.length - 1 ? (
              <button 
                onClick={() => navigate(TOPICS[currentIndex + 1].id)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1px" }}>SIGUIENTE TEMA</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-primary)" }}>{TOPICS[currentIndex + 1].label} →</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </>
  );
}

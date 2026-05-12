"use client";
import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    topic: "Definición",
    question: "¿Cuál es la definición más completa de un Sistema Operativo?",
    options: [
      "Un programa que solo administra la memoria RAM del dispositivo.",
      "El software fundamental que administra los recursos del hardware y actúa como interfaz entre el usuario y el hardware.",
      "Un conjunto de aplicaciones de usuario instaladas en el dispositivo.",
      "El firmware almacenado en la memoria ROM de la placa base.",
    ],
    correct: 1,
    feedback: "Un SO es el software fundamental que gestiona todos los recursos (CPU, memoria, E/S) del hardware y proporciona una interfaz para que usuarios y aplicaciones puedan utilizarlos de forma cómoda y eficiente.",
    hint: "Piensa en el software que sirve de mediador entre el silicio y los programas."
  },
  {
    id: 2,
    topic: "Funciones del SO",
    question: "¿Cuál de las siguientes NO es una responsabilidad principal del Sistema Operativo?",
    options: [
      "Administración de procesos y evitar interbloqueos.",
      "Asignación y aislamiento de espacios de memoria para cada proceso.",
      "Diseñar la interfaz visual de las aplicaciones de usuario.",
      "Control de acceso y políticas de seguridad.",
    ],
    correct: 2,
    feedback: "Diseñar la interfaz visual de las aplicaciones es responsabilidad de los desarrolladores de software, no del SO. El SO gestiona procesos, memoria, seguridad y recursos de hardware.",
    hint: "Busca la tarea que suele recaer en los programadores de apps (como el diseño de botones o logos)."
  },
  {
    id: 3,
    topic: "Clasificación",
    question: "Un sistema operativo de tiempo real (RTOS) se caracteriza principalmente por...",
    options: [
      "Procesar trabajos por lotes para maximizar el uso de la CPU.",
      "Cumplir con restricciones temporales estrictas de forma determinista.",
      "Ser el tipo de SO más común en computadoras de escritorio.",
      "Distribuir procesos transparentemente a través de una red.",
    ],
    correct: 1,
    feedback: "Un RTOS garantiza respuestas en tiempos predecibles y exactos. Se usa en sistemas críticos como equipos médicos, control de tráfico aéreo o sistemas de navegación, donde un retraso puede tener consecuencias graves.",
    hint: "Su nombre lo indica: las respuestas deben ocurrir 'en el momento justo'."
  },
  {
    id: 4,
    topic: "Clasificación",
    question: "¿Qué distingue a un sistema operativo de red de uno distribuido?",
    options: [
      "Un SO de red oculta completamente la existencia de múltiples máquinas al usuario; el distribuido no.",
      "Un SO de red permite compartir recursos entre máquinas conectadas, mientras el distribuido hace que múltiples máquinas actúen como una sola de forma transparente.",
      "Los SO de red solo funcionan en entornos inalámbricos.",
      "Un SO distribuido requiere que todas las máquinas tengan el mismo hardware.",
    ],
    correct: 1,
    feedback: "En un SO de red las máquinas son visibles y el usuario sabe que está accediendo a recursos remotos. En un SO distribuido, la colección de máquinas aparece ante el usuario como un único sistema coherente (transparencia).",
    hint: "En uno sabes que hay 'otras máquinas', en el otro parece que solo hay 'una gran máquina'."
  },
  {
    id: 5,
    topic: "Clasificación",
    question: "¿Cuál es la característica principal de un sistema operativo móvil comparado con uno de escritorio?",
    options: [
      "Los SO móviles no pueden ejecutar múltiples procesos al mismo tiempo.",
      "Los SO móviles están diseñados para hardware de alto rendimiento sin restricciones de energía.",
      "Los SO móviles están optimizados para hardware limitado (batería, CPU, RAM) con interfaz táctil y conectividad constante.",
      "Los SO móviles no requieren un kernel para funcionar.",
    ],
    correct: 2,
    feedback: "Los SO móviles (Android, iOS) están diseñados para entornos con recursos limitados: optimizan el consumo de batería, gestionan CPU y RAM eficientemente, y priorizan la interfaz táctil y la conectividad.",
    hint: "Piensa en las limitaciones de tu smartphone comparado con una computadora de escritorio."
  },
  {
    id: 6,
    topic: "Arranque",
    question: "¿Cuál es el orden correcto de las etapas del proceso de arranque (boot)?",
    options: [
      "POST → BIOS/UEFI → MBR → Boot Manager → Kernel SO → Corriente",
      "Corriente → BIOS/UEFI → POST → MBR → Boot Manager → Kernel SO",
      "Boot Manager → BIOS → POST → MBR → Kernel SO → Corriente",
      "Corriente → POST → Boot Manager → BIOS/UEFI → MBR → Kernel SO",
    ],
    correct: 1,
    feedback: "El orden es: (1) Suministro de corriente → (2) BIOS/UEFI se activa → (3) POST verifica hardware → (4) Búsqueda del MBR/EFI en disco → (5) Boot Manager (ej. GRUB) carga → (6) Kernel del SO se carga en RAM.",
    hint: "Primero entra la energía, luego se revisa el hardware, y al final se carga el Kernel."
  },
  {
    id: 7,
    topic: "Arranque",
    question: "¿Cuál es la función del POST (Power-On Self Test)?",
    options: [
      "Cargar el kernel del Sistema Operativo en la memoria RAM.",
      "Establecer la conexión a internet para descargar actualizaciones.",
      "Verificar que el hardware crítico (RAM, video, teclado, discos) funcione correctamente antes de arrancar.",
      "Seleccionar qué sistema operativo iniciar cuando hay varios instalados.",
    ],
    correct: 2,
    feedback: "El POST es ejecutado por la BIOS/UEFI inmediatamente después de recibir corriente. Diagnostica los componentes esenciales de hardware. Si algo falla, emite códigos de error (pitidos o mensajes en pantalla) antes de continuar.",
    hint: "Es una 'auto-prueba' de encendido."
  },
  {
    id: 8,
    topic: "Arranque",
    question: "¿Qué papel juega el Boot Manager (ej. GRUB) en el proceso de arranque?",
    options: [
      "Verificar la integridad del hardware antes de iniciar.",
      "Ejecutar el POST y diagnosticar posibles fallas.",
      "Leer el firmware almacenado en la memoria ROM de la placa base.",
      "Permitir al usuario elegir qué sistema operativo cargar y transferir el control al kernel seleccionado.",
    ],
    correct: 3,
    feedback: "El Boot Manager (GRUB en Linux, Windows Boot Manager en Windows) es cargado desde el sector MBR/EFI. Su función es presentar opciones al usuario y transferir el control al kernel del SO seleccionado.",
    hint: "Es el menú que aparece antes de que el logo del SO se muestre."
  },
  {
    id: 9,
    topic: "Kernel",
    question: "¿Qué es el Kernel de un sistema operativo?",
    options: [
      "El navegador web integrado por defecto.",
      "El núcleo central que tiene control total sobre todo lo que sucede en el sistema y se carga en la zona protegida de la RAM.",
      "La carpeta donde se guardan los archivos del usuario.",
      "El software encargado de la desfragmentación del disco.",
    ],
    correct: 1,
    feedback: "El Kernel es la parte más interna del SO. Se encarga de la gestión de memoria, procesos, drivers y seguridad. Se carga al inicio y permanece en RAM hasta que el sistema se apaga.",
    hint: "Es la 'semilla' o núcleo fundamental del sistema."
  },
  {
    id: 10,
    topic: "Kernel",
    question: "¿En qué consiste la arquitectura de Microkernel?",
    options: [
      "Un kernel extremadamente grande que incluye todos los servicios posibles.",
      "Dividir el kernel en módulos pequeños, dejando solo lo esencial en el núcleo y moviendo servicios (como red o drivers) al espacio de usuario.",
      "Un kernel que solo funciona en microprocesadores de gama baja.",
      "Un diseño donde el kernel no tiene acceso directo al hardware.",
    ],
    correct: 1,
    feedback: "El Microkernel busca la estabilidad y modularidad. Si un driver falla (fuera del kernel), el sistema no colapsa por completo, a diferencia de los kernels monolíticos donde todo corre en un mismo espacio privilegiado.",
    hint: "Busca la opción que habla de 'modularidad' y 'servicios en espacio de usuario'."
  }
];

const TOPICS = [...new Set(QUESTIONS.map(q => q.topic))];
const TOPIC_COLORS: Record<string, string> = {
  "Definición": "#6366f1",
  "Funciones del SO": "#0ea5e9",
  "Clasificación": "#9b1c2e",
  "Arranque": "#16a34a",
  "Kernel": "#7c3aed",
};

export default function UnitReview1() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeHints, setActiveHints] = useState<number[]>([]);
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? QUESTIONS : QUESTIONS.filter(q => q.topic === filter);
  const answered = Object.keys(answers).length;
  const correct = submitted ? QUESTIONS.filter(q => answers[q.id] === q.correct).length : 0;
  const pct = submitted ? Math.round((correct / QUESTIONS.length) * 100) : 0;
  const scoreColor = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";
  const scoreMsg = pct >= 90 ? "¡Excelente! Dominas la Unidad 1 completamente. 🏆" : pct >= 75 ? "¡Buen trabajo! Repasa los temas marcados en rojo. 📚" : pct >= 50 ? "Necesitas reforzar algunos conceptos. 💪" : "Revisa la Unidad 1 completa antes de continuar. 📖";

  return (
    <section className="chapter-section animate-fadeInUp">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #151535 50%, #0a0a1a 100%)", borderRadius: "20px", padding: "3rem 2.5rem", marginBottom: "3rem", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🧠</span>
            <div>
              <p style={{ color: "#a5b4fc", fontWeight: 700, fontSize: "0.9rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Repaso Completo</p>
              <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 900 }}>Unidad 1: Introducción a los SO</h2>
            </div>
          </div>
          <p style={{ color: "#d4d4d4", fontSize: "1.05rem", margin: 0, maxWidth: "600px" }}>
            {QUESTIONS.length} preguntas que cubren: definición de SO, funciones, clasificación (tiempo real, red, distribuido, móvil) y proceso de arranque.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {TOPICS.map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${TOPIC_COLORS[t] || "#6366f1"}`, color: "white", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      {!submitted && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600 }}>Progreso de Evaluación</span>
            <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#6366f1" }}>{answered} / {QUESTIONS.length}</span>
          </div>
          <div style={{ background: "var(--bg-secondary)", borderRadius: "999px", height: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ background: "linear-gradient(90deg, #6366f1, #818cf8)", borderRadius: "999px", height: "100%", width: `${(answered / QUESTIONS.length) * 100}%`, transition: "width 0.6s ease" }} />
          </div>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "3rem" }}>
        {["Todos", ...TOPICS].map(t => (
          <button key={t} onClick={() => setFilter(t)} 
            style={{ 
              padding: "0.5rem 1.2rem", 
              borderRadius: "12px", 
              border: "1px solid",
              borderColor: filter === t ? (TOPIC_COLORS[t] || "#6366f1") : "var(--border-color)", 
              background: filter === t ? (TOPIC_COLORS[t] || "#6366f1") : "var(--bg-card)", 
              color: filter === t ? "white" : "var(--text-secondary)", 
              fontWeight: 700, 
              fontSize: "0.85rem", 
              cursor: "pointer", 
              transition: "all 0.3s ease" 
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {filtered.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correct;
          const topicColor = TOPIC_COLORS[q.topic] || "#6366f1";
          return (
            <div key={q.id} style={{ 
              background: "var(--bg-card)", 
              borderRadius: "20px", 
              border: "1px solid",
              borderColor: submitted ? (isCorrect ? "var(--accent-green)" : "var(--accent-red)") : "var(--border-color)", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)", 
              overflow: "hidden", 
              transition: "all 0.3s ease" 
            }}>
              <div style={{ padding: "2rem 2.5rem 1.2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{ background: topicColor, color: "white", borderRadius: "8px", padding: "0.25rem 0.8rem", fontSize: "0.75rem", fontWeight: 800 }}>{q.topic}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>Pregunta {q.id}</span>
                  {submitted && <span style={{ marginLeft: "auto", fontSize: "1.4rem" }}>{isCorrect ? "✅" : "❌"}</span>}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.4, flex: 1 }}>{q.question}</p>
                  {q.hint && !submitted && (
                    <button 
                      onClick={() => setActiveHints(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])}
                      style={{ 
                        background: activeHints.includes(q.id) ? "rgba(251, 191, 36, 0.2)" : "var(--bg-secondary)", 
                        border: `1px solid ${activeHints.includes(q.id) ? "#f59e0b" : "var(--border-color)"}`,
                        borderRadius: "8px",
                        padding: "0.4rem 0.8rem",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: activeHints.includes(q.id) ? "#b45309" : "var(--text-muted)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {activeHints.includes(q.id) ? "💡 Ocultar" : "💡 Pista"}
                    </button>
                  )}
                </div>
                {activeHints.includes(q.id) && !submitted && (
                  <div style={{ marginTop: "1rem", padding: "0.8rem 1.2rem", background: "rgba(251, 191, 36, 0.05)", borderRadius: "10px", borderLeft: "4px solid #fbbf24", fontSize: "0.9rem", color: "#b45309", animation: "fadeIn 0.3s ease" }}>
                    <strong>Pista:</strong> {q.hint}
                  </div>
                )}
              </div>
              <div style={{ padding: "0 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isRight = idx === q.correct;
                  let bg = "var(--bg-secondary)", border = "var(--border-color)", color = "var(--text-secondary)";
                  if (submitted) {
                    if (isRight) { bg = "rgba(16, 185, 129, 0.1)"; border = "var(--accent-green)"; color = "var(--accent-green)"; }
                    else if (isSelected && !isRight) { bg = "rgba(239, 68, 68, 0.1)"; border = "var(--accent-red)"; color = "var(--accent-red)"; }
                  } else if (isSelected) { bg = "rgba(99, 102, 241, 0.1)"; border = topicColor; color = "var(--text-primary)"; }
                  return (
                    <button key={idx} onClick={() => !submitted && setAnswers({ ...answers, [q.id]: idx })}
                      style={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        gap: "1rem", 
                        padding: "1rem 1.2rem", 
                        borderRadius: "12px", 
                        border: `2px solid ${border}`, 
                        background: bg, 
                        cursor: submitted ? "default" : "pointer", 
                        textAlign: "left", 
                        transition: "all 0.2s ease", 
                        width: "100%" 
                      }}>
                      <span style={{ 
                        width: "24px", 
                        height: "24px", 
                        minWidth: "24px", 
                        borderRadius: "50%", 
                        border: `2px solid ${isSelected || (submitted && isRight) ? (isRight && submitted ? "var(--accent-green)" : topicColor) : "var(--border-color)"}`, 
                        background: isSelected ? topicColor : (submitted && isRight ? "var(--accent-green)" : "var(--bg-primary)"), 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "0.75rem", 
                        fontWeight: 900, 
                        color: isSelected || (submitted && isRight) ? "white" : "var(--text-muted)", 
                        marginTop: "2px" 
                      }}>
                        {submitted && isRight ? "✓" : submitted && isSelected && !isRight ? "✗" : String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ fontSize: "1rem", color, lineHeight: 1.5, fontWeight: isSelected ? 700 : 500 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div style={{ margin: "0 2.5rem 2rem", padding: "1.2rem 1.5rem", background: isCorrect ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)", borderRadius: "12px", borderLeft: `5px solid ${isCorrect ? "var(--accent-green)" : "var(--accent-red)"}` }}>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: isCorrect ? "var(--accent-green)" : "var(--accent-red)", lineHeight: 1.7 }}>
                    <strong style={{ fontSize: "1rem", display: "block", marginBottom: "0.3rem" }}>{isCorrect ? "✅ ¡Correcto!" : "❌ Revisión Necesaria"}</strong> {q.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Results */}
      {!submitted ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
          <button onClick={() => setSubmitted(true)} disabled={answered < QUESTIONS.length}
            style={{ 
              padding: "1.2rem 4rem", 
              background: answered === QUESTIONS.length ? "#6366f1" : "var(--bg-card)", 
              color: answered === QUESTIONS.length ? "white" : "var(--text-muted)", 
              border: "1px solid var(--border-color)", 
              borderRadius: "40px", 
              fontWeight: 900, 
              fontSize: "1.2rem", 
              cursor: answered === QUESTIONS.length ? "pointer" : "not-allowed", 
              boxShadow: answered === QUESTIONS.length ? "0 10px 25px rgba(99,102,241,0.3)" : "none", 
              transition: "all 0.4s" 
            }}>
            {answered < QUESTIONS.length ? `Pendiente: ${QUESTIONS.length - answered} Preguntas` : "✔ Finalizar Evaluación"}
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "4rem", padding: "3.5rem 2.5rem", background: "var(--bg-card)", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", border: `3px solid ${scoreColor}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: scoreColor }} />
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>{pct >= 90 ? "🏆" : pct >= 75 ? "🎯" : pct >= 50 ? "📚" : "💡"}</div>
          <div style={{ fontSize: "4rem", fontWeight: 900, color: scoreColor, marginBottom: "0.5rem" }}>{pct}%</div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", margin: "0.5rem 0" }}>{correct} de {QUESTIONS.length} Aciertos</h3>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3rem" }}>{scoreMsg}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem", marginBottom: "3.5rem" }}>
            {TOPICS.map(topic => {
              const tqs = QUESTIONS.filter(q => q.topic === topic);
              const tcorrect = tqs.filter(q => answers[q.id] === q.correct).length;
              const tpct = Math.round((tcorrect / tqs.length) * 100);
              const c = TOPIC_COLORS[topic] || "#6366f1";
              return (
                <div key={topic} style={{ background: "var(--bg-secondary)", borderRadius: "16px", padding: "1.2rem", border: "1px solid var(--border-color)", borderTop: `4px solid ${tpct === 100 ? "var(--accent-green)" : tpct >= 50 ? c : "var(--accent-red)"}` }}>
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", fontWeight: 800, color: c, textTransform: "uppercase" }}>{topic}</p>
                  <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900, color: tpct === 100 ? "var(--accent-green)" : tpct >= 50 ? "var(--text-primary)" : "var(--accent-red)" }}>{tcorrect}/{tqs.length}</p>
                  <div style={{ background: "var(--bg-primary)", borderRadius: "999px", height: "6px", marginTop: "0.8rem" }}>
                    <div style={{ background: tpct === 100 ? "var(--accent-green)" : c, borderRadius: "999px", height: "100%", width: `${tpct}%`, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false); setFilter("Todos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ padding: "1rem 3.5rem", background: "#6366f1", color: "white", border: "none", borderRadius: "40px", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(99,102,241,0.3)" }}>
            🔄 Reintentar Evaluación
          </button>
        </div>
      )}
    </section>
  );
}

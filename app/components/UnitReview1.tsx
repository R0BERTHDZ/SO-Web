"use client";
import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    topic: "Definición",
    question: "¿Cuál es la definición principal de un Sistema Operativo (SO)?",
    options: [
      "Es una colección de aplicaciones de oficina y herramientas de productividad instaladas de fábrica.",
      "Es el software principal que actúa como intermediario entre el hardware de la computadora y el usuario, administrando los recursos del sistema.",
      "Es el chip físico ubicado en la placa base que contiene las instrucciones básicas de arranque.",
      "Es un programa diseñado exclusivamente para proteger el equipo contra virus y malware en la red.",
    ],
    correct: 1,
    feedback: "Exacto. El SO administra recursos (CPU, memoria, periféricos) y proporciona un entorno para ejecutar las aplicaciones del usuario.",
    hint: "Piensa en el 'mediador' o 'puente' entre la máquina física y las aplicaciones que usas."
  },
  {
    id: 2,
    topic: "Funciones del SO",
    question: "¿Cuáles son los dos objetivos principales de un Sistema Operativo?",
    options: [
      "Conveniencia (fácil de usar) y Eficiencia (administrar recursos óptimamente).",
      "Seguridad (evitar hackeos) y Estética (diseño de interfaz gráfica atractiva).",
      "Velocidad (overclocking del procesador) y Portabilidad (poder moverse en USB).",
      "Compilación (convertir código a máquina) y Navegación (acceso a internet).",
    ],
    correct: 0,
    feedback: "Los dos objetivos fundamentales son la Conveniencia (hacer que la computadora sea más fácil de usar para el usuario) y la Eficiencia (administrar los recursos del hardware de la manera más óptima posible).",
    hint: "Busca las palabras que indican 'facilidad de uso' y 'uso óptimo de recursos'."
  },
  {
    id: 3,
    topic: "Kernel",
    question: "¿Qué es el 'Kernel' o Núcleo de un sistema operativo?",
    options: [
      "La interfaz gráfica que permite al usuario abrir ventanas y carpetas con el ratón.",
      "El programa de arranque inicial que reside en la memoria ROM (BIOS).",
      "La parte central del SO que gestiona el acceso directo al hardware, memoria y procesos, y permanece en RAM siempre.",
      "El gestor de descargas que actualiza los programas instalados en segundo plano.",
    ],
    correct: 2,
    feedback: "El Kernel es la parte central y fundamental del SO. Se carga en memoria al arrancar y gestiona de manera privilegiada el acceso directo al hardware y la planificación de procesos.",
    hint: "Es la parte más 'profunda' o 'central' del SO."
  },
  {
    id: 4,
    topic: "Clasificación",
    question: "¿Cuál es la diferencia principal entre un sistema Monousuario y uno Multiusuario?",
    options: [
      "El monousuario no soporta contraseñas, el multiusuario sí exige autenticación.",
      "El monousuario permite que un solo usuario acceda a los recursos a la vez, mientras que el multiusuario permite a varios usar el sistema simultáneamente.",
      "El monousuario solo puede ejecutar una aplicación a la vez (monotarea), el multiusuario ejecuta varias.",
      "El monousuario no tiene conexión a internet, el multiusuario requiere estar conectado a la nube.",
    ],
    correct: 1,
    feedback: "Un SO monousuario (ej. Windows 10 doméstico) permite a un solo usuario acceder a la vez. Un SO multiusuario (ej. Servidor Linux) permite a múltiples usuarios utilizar simultáneamente los recursos.",
    hint: "Céntrate en la cantidad de personas (usuarios) accediendo a los recursos al mismo tiempo."
  },
  {
    id: 5,
    topic: "Clasificación",
    question: "¿Qué distingue a un sistema de Multiprocesamiento (Sistemas Paralelos)?",
    options: [
      "Distribuyen las tareas a través de internet hacia otras computadoras en distintas ubicaciones.",
      "Utilizan un solo procesador de muy alta velocidad para simular que realizan varias tareas a la vez.",
      "Cuentan con dos o más procesadores que comparten el mismo bus, reloj y memoria para ejecutar tareas simultáneamente.",
      "Tienen un procesador principal y varios procesadores de respaldo inactivos por si el principal falla.",
    ],
    correct: 2,
    feedback: "Son sistemas que cuentan con dos o más procesadores que comparten el mismo bus de datos, reloj y memoria, permitiendo ejecutar múltiples tareas simultáneamente para aumentar la velocidad.",
    hint: "Piensa en 'varios cerebros' físicos en una misma computadora compartiendo recursos."
  },
  {
    id: 6,
    topic: "Clasificación",
    question: "¿Qué es un sistema operativo de Tiempo Real (RTOS)?",
    options: [
      "Aquel diseñado para responder a eventos dentro de un límite de tiempo estrictamente definido (usado en robótica o tráfico aéreo).",
      "Un sistema que actualiza su reloj automáticamente consultando servidores horarios en internet.",
      "Un SO que permite ver películas y streaming en alta definición sin interrupciones ni lag.",
      "Cualquier sistema moderno que use un procesador de múltiples núcleos (multicore).",
    ],
    correct: 0,
    feedback: "Un RTOS es un sistema diseñado para responder a eventos dentro de un límite de tiempo estrictamente definido. Se usan en entornos críticos como control de tráfico aéreo o sistemas médicos.",
    hint: "Si un sistema crítico se retrasa un milisegundo en responder, hay un fallo total."
  },
  {
    id: 7,
    topic: "Clasificación",
    question: "¿Cuál es la diferencia entre un sistema de red y un sistema distribuido?",
    options: [
      "El sistema de red solo usa cables Ethernet, el distribuido usa conexión Wi-Fi.",
      "En el de red, los usuarios saben que existen otras máquinas; en el distribuido, el usuario ve el conjunto de máquinas como un único sistema coherente.",
      "El sistema de red es más rápido y seguro que el distribuido debido a su encriptación punto a punto.",
      "El sistema distribuido almacena todo en un servidor central, mientras que el de red no tiene servidores.",
    ],
    correct: 1,
    feedback: "En red, los usuarios saben que existen otras máquinas. En un sistema distribuido, la distribución es transparente: el usuario ve múltiples máquinas actuando como un único gran sistema.",
    hint: "Recuerda la palabra 'transparencia'. En uno ves los diferentes equipos, en otro ves todo como si fuera uno solo."
  },
  {
    id: 8,
    topic: "Arranque",
    question: "¿Qué es el BIOS (o UEFI) y cuál es su función en el arranque?",
    options: [
      "Es el gestor de ventanas que carga el escritorio una vez que el usuario ingresa su contraseña.",
      "Es un pequeño programa de red que descarga el sistema operativo desde un servidor remoto al iniciar.",
      "Es el primer programa que se ejecuta al encender la PC, encargado de realizar el POST (autodiagnóstico) y verificar el hardware básico.",
      "Es el área de memoria RAM reservada exclusivamente para alojar el Kernel del SO.",
    ],
    correct: 2,
    feedback: "BIOS/UEFI es el primer programa que se ejecuta al encender la PC. Su función es realizar el POST para verificar que el hardware básico (teclado, RAM, disco) funcione correctamente.",
    hint: "Piensa en lo primero que procesa la computadora, antes de que siquiera se lea el disco duro."
  },
  {
    id: 9,
    topic: "Arranque",
    question: "¿A qué se refiere el término 'Bootstrapping' o cargador de arranque?",
    options: [
      "Al escaneo de seguridad (antivirus) que se ejecuta antes de montar los discos duros.",
      "Al apagado forzado del sistema cuando se detecta un sobrecalentamiento en la CPU.",
      "A la instalación del sistema operativo en el disco duro por primera vez usando una memoria USB.",
      "Al proceso donde un pequeño programa localiza el núcleo del sistema operativo en el disco duro y lo carga en memoria RAM.",
    ],
    correct: 3,
    feedback: "Es el proceso por el cual un pequeño programa (bootstrap loader) localiza el núcleo del SO en el almacenamiento secundario y lo sube a la memoria RAM para que el SO tome el control.",
    hint: "Tiene que ver con 'cargar' el núcleo desde el disco hacia la memoria principal."
  },
  {
    id: 10,
    topic: "Arranque",
    question: "¿Qué sucede durante la fase de 'POST' (Power-On Self-Test)?",
    options: [
      "El sistema realiza una comprobación rápida de los componentes electrónicos y si detecta un error grave emite pitidos o detiene el proceso.",
      "Se comprueba la conexión a internet y se sincroniza la fecha y hora del sistema.",
      "Se cargan los perfiles de usuario y se verifica si la contraseña ingresada es la correcta.",
      "El SO limpia los archivos temporales y la caché acumulada del uso anterior del equipo.",
    ],
    correct: 0,
    feedback: "Durante el POST, el sistema verifica el hardware. Si detecta un error grave (como falta de memoria RAM o error de video), emite pitidos y detiene el proceso antes de intentar cargar el SO.",
    hint: "Self-Test = Autocomprobación física. Si la PC hace un ruido extraño y no da video, esta fase falló."
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

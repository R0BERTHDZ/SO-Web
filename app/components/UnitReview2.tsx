"use client";
import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    topic: "Conceptos",
    question: "¿Cuál es la diferencia fundamental entre un programa y un proceso?",
    options: [
      "Son sinónimos; ambos términos se refieren al mismo concepto.",
      "Un programa es código estático en disco; un proceso es ese programa en ejecución con recursos asignados.",
      "Un proceso solo existe en la memoria RAM, mientras que un programa existe en la CPU.",
      "Un programa puede tener múltiples instrucciones, pero un proceso solo ejecuta una.",
    ],
    correct: 1,
    feedback: "Un programa es un archivo ejecutable pasivo almacenado en disco. Un proceso es una instancia activa de ese programa: tiene un PID, memoria asignada, registros de CPU y un estado de ejecución.",
    hint: "Uno es el archivo '.exe' o binario en la carpeta, el otro es cuando ya le diste doble clic."
  },
  {
    id: 2,
    topic: "Estados",
    question: "Un proceso pasa del estado 'Ejecutado' al estado 'Bloqueado' cuando...",
    options: [
      "El planificador le retira el CPU porque agotó su quantum de tiempo.",
      "El proceso solicita una operación de E/S y debe esperar su resultado.",
      "El proceso es creado por primera vez con fork().",
      "El proceso llama a exit() para terminar normalmente.",
    ],
    correct: 1,
    feedback: "La transición Ejecutado → Bloqueado ocurre cuando el proceso realiza una solicitud de E/S (lectura de disco, espera de red, etc.). El proceso no puede continuar hasta que la operación finalice, así que libera la CPU voluntariamente.",
    hint: "Ocurre cuando el proceso necesita algo externo (como leer un archivo) y tiene que esperar."
  },
  {
    id: 3,
    topic: "fork()",
    question: "Después de fork(), ¿qué valor recibe el proceso hijo en la variable de retorno?",
    options: [
      "El PID del proceso padre.",
      "Un número negativo indicando error.",
      "El valor 0.",
      "El PID del proceso hijo.",
    ],
    correct: 2,
    feedback: "fork() devuelve 0 al hijo (para que sepa que 'es el hijo') y devuelve el PID del hijo al padre (para que pueda referenciarlo). Si devuelve -1, significa que ocurrió un error y no se creó ningún proceso.",
    hint: "Es el valor que indica 'yo soy el nuevo'."
  },
  {
    id: 4,
    topic: "fork()",
    question: "¿Qué es el mecanismo Copy-on-Write (COW) en el contexto de fork()?",
    options: [
      "El hijo recibe una copia completa de la memoria del padre en el momento exacto del fork().",
      "El padre y el hijo comparten las mismas páginas físicas de memoria de solo lectura hasta que alguno realiza una escritura, momento en que se crea una copia privada.",
      "El proceso padre escribe sus datos en un archivo antes de que el hijo los copie.",
      "El kernel copia los registros de la CPU del padre al hijo durante la ejecución.",
    ],
    correct: 1,
    feedback: "COW es una optimización del kernel: padre e hijo comparten las mismas páginas físicas marcadas como solo lectura. Solo cuando uno de ellos intenta escribir en una página, el kernel crea una copia privada para ese proceso. Esto hace fork() muy eficiente en memoria.",
    hint: "Se traduce como 'Copia al escribir'."
  },
  {
    id: 5,
    topic: "Identificadores",
    question: "¿Qué función retorna el PID del proceso padre del proceso que realiza la llamada?",
    options: ["getpid()", "getppid()", "getpgrp()", "setpgrp()"],
    correct: 1,
    feedback: "getppid() (get parent process ID) retorna el PPID — el identificador del proceso padre. getpid() retorna el PID del proceso actual. getpgrp() retorna el ID del grupo de procesos.",
    hint: "Busca el que tiene una 'p' extra de 'parent'."
  },
  {
    id: 6,
    topic: "wait()",
    question: "¿Qué ocurre si un proceso padre llama a wait() y no tiene procesos hijos?",
    options: [
      "wait() se bloquea indefinidamente esperando cualquier proceso del sistema.",
      "wait() retorna inmediatamente con valor 0.",
      "wait() retorna -1 y errno se establece en ECHILD.",
      "El sistema operativo crea automáticamente un proceso hijo vacío.",
    ],
    correct: 2,
    feedback: "Si el padre no tiene hijos, wait() retorna -1 y errno = ECHILD ('no child processes'). Siempre debes verificar el valor de retorno de wait() para manejar este caso de error correctamente.",
    hint: "No puedes esperar a alguien que no existe."
  },
  {
    id: 7,
    topic: "waitpid()",
    question: "¿Cuál es el efecto de usar la opción WNOHANG en waitpid()?",
    options: [
      "waitpid() bloquea al padre hasta que el hijo con el PID indicado termine.",
      "waitpid() retorna inmediatamente con 0 si no hay hijos que hayan terminado, sin bloquear al padre.",
      "waitpid() espera a que TODOS los hijos del proceso terminen.",
      "waitpid() cancela la ejecución del hijo especificado.",
    ],
    correct: 1,
    feedback: "WNOHANG hace que waitpid() sea no bloqueante: si el hijo especificado aún no terminó, retorna 0 inmediatamente en lugar de suspender al padre. Útil para verificar periódicamente si un hijo terminó sin detener la ejecución del padre.",
    hint: "Su nombre significa 'Sin colgarse'."
  },
  {
    id: 8,
    topic: "_exit() / exit()",
    question: "¿Cuál es la diferencia principal entre _exit() y exit()?",
    options: [
      "_exit() solo puede usarse en procesos hijo; exit() solo en el proceso padre.",
      "exit() es una llamada directa al kernel; _exit() es una función de biblioteca.",
      "exit() vacía los buffers de stdio y llama a funciones atexit() antes de terminar; _exit() termina inmediatamente sin esas acciones.",
      "Ambas son idénticas; la diferencia es solo histórica.",
    ],
    correct: 2,
    feedback: "exit() (stdlib.h) realiza limpieza: vacía buffers de stdio, cierra flujos fopen() y ejecuta funciones registradas con atexit(). Luego llama a _exit(). _exit() (unistd.h) termina el proceso directamente sin ninguna limpieza. En procesos hijo que fallan exec(), se recomienda usar _exit() para no corromper buffers del padre.",
    hint: "Una es 'limpia' (lib-C) y la otra es 'cruda' (llamada al sistema)."
  },
  {
    id: 9,
    topic: "Zombi",
    question: "Un proceso se convierte en Zombi cuando...",
    options: [
      "El proceso padre muere antes que el proceso hijo.",
      "El proceso hijo termina pero el padre aún no ha llamado wait() para recoger su estado de salida.",
      "El proceso excede el tiempo máximo de CPU asignado.",
      "El proceso intenta acceder a memoria de otro proceso.",
    ],
    correct: 1,
    feedback: "El estado Zombi ocurre cuando el hijo ya terminó (llamó exit()) pero el padre no ha ejecutado wait(). El kernel mantiene la entrada del hijo en la tabla de procesos (con su PID y código de salida) hasta que el padre lo 'recoja'. No consume CPU pero sí ocupa un slot en la tabla.",
    hint: "Es un proceso que ya 'murió' pero su 'cuerpo' (entrada en tabla) sigue ahí."
  },
  {
    id: 10,
    topic: "Zombi",
    question: "¿Qué le ocurre a un proceso hijo cuando su padre termina antes que él?",
    options: [
      "El hijo también termina inmediatamente al morir el padre.",
      "El hijo se convierte en un proceso zombi permanente.",
      "El hijo se convierte en huérfano y es adoptado por el proceso init (PID 1), que lo recolectará al terminar.",
      "El hijo toma el PID del padre y continúa como proceso principal.",
    ],
    correct: 2,
    feedback: "Un hijo cuyo padre muere se convierte en 'huérfano'. El kernel lo reasigna automáticamente al proceso init (PID 1) o systemd. init siempre ejecuta wait() periódicamente, por lo que recogerá al huérfano cuando este termine, evitando que quede como zombi.",
    hint: "El proceso init actúa como el 'adoptante' universal."
  },
  {
    id: 11,
    topic: "Hilos",
    question: "¿Qué recursos comparten todos los hilos de un mismo proceso?",
    options: [
      "Stack de ejecución, registros de CPU y contador de programa.",
      "Espacio de direcciones, variables globales, heap y archivos abiertos.",
      "Solo el código del programa (segmento de texto).",
      "Ninguno; cada hilo tiene recursos completamente independientes.",
    ],
    correct: 1,
    feedback: "Los hilos de un proceso comparten: espacio de direcciones (pueden leer/escribir las mismas variables globales), heap y archivos abiertos. Cada hilo tiene PRIVADO su propio stack, registros y contador de programa (PC), ya que cada uno sigue una línea de ejecución diferente.",
    hint: "Comparten casi todo lo que pertenece al 'contenedor' del proceso."
  },
  {
    id: 12,
    topic: "Pthreads",
    question: "¿Qué función de pthreads es equivalente a wait() pero para hilos?",
    options: ["pthread_exit()", "pthread_cancel()", "pthread_join()", "pthread_create()"],
    correct: 2,
    feedback: "pthread_join() suspende el hilo llamante hasta que el hilo especificado termine, y opcionalmente recoge su valor de retorno. Es análogo a wait() en el modelo de procesos. pthread_exit() termina un hilo; pthread_create() lo crea; pthread_cancel() lo cancela.",
    hint: "Busca el término que significa 'unirse' o 'esperar a que se una'."
  },
];

const TOPICS = [...new Set(QUESTIONS.map(q => q.topic))];
const TOPIC_COLORS: Record<string, string> = {
  "Conceptos": "#6366f1", "Estados": "#0ea5e9", "fork()": "#9b1c2e",
  "Identificadores": "#d97706", "wait()": "#16a34a", "waitpid()": "#059669",
  "_exit() / exit()": "#7c3aed", "Zombi": "#dc2626", "Hilos": "#2563eb", "Pthreads": "#0891b2"
};

export default function UnitReview2() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeHints, setActiveHints] = useState<number[]>([]);
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? QUESTIONS : QUESTIONS.filter(q => q.topic === filter);
  const answered = Object.keys(answers).length;
  const correct = submitted ? QUESTIONS.filter(q => answers[q.id] === q.correct).length : 0;
  const pct = submitted ? Math.round((correct / QUESTIONS.length) * 100) : 0;

  const scoreColor = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";
  const scoreMsg = pct >= 90 ? "¡Excelente dominio de la Unidad 2! 🏆" : pct >= 75 ? "¡Buen trabajo! Repasa los temas en rojo. 📚" : pct >= 50 ? "Necesitas repasar varios temas. 💪" : "Revisa la Unidad 2 completa antes de continuar. 📖";

  return (
    <section className="chapter-section animate-fadeInUp">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%)", borderRadius: "20px", padding: "3rem 2.5rem", marginBottom: "3rem", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(155,28,46,0.3) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "2.5rem" }}>🧠</span>
            <div>
              <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "0.9rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Repaso Completo</p>
              <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 900 }}>Unidad 2: Procesos e Hilos</h2>
            </div>
          </div>
          <p style={{ color: "#d4d4d4", fontSize: "1.05rem", margin: 0, maxWidth: "600px" }}>
            {QUESTIONS.length} preguntas que cubren: estados de procesos, fork(), identificadores, wait(), waitpid(), _exit(), zombis e hilos POSIX.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {TOPICS.map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.1)", border: `1px solid ${TOPIC_COLORS[t] || "#9b1c2e"}`, color: "white", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {!submitted && (
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600 }}>Estado de la Misión</span>
            <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--accent-primary)" }}>{answered} / {QUESTIONS.length} COMPLETADAS</span>
          </div>
          <div style={{ background: "var(--bg-secondary)", borderRadius: "999px", height: "10px", border: "1px solid var(--border-color)" }}>
            <div style={{ background: "linear-gradient(90deg, var(--accent-primary), #ef4444)", borderRadius: "999px", height: "100%", width: `${(answered / QUESTIONS.length) * 100}%`, transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 0 15px rgba(155,28,46,0.3)" }} />
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
              borderColor: filter === t ? (TOPIC_COLORS[t] || "var(--accent-primary)") : "var(--border-color)", 
              background: filter === t ? (TOPIC_COLORS[t] || "var(--accent-primary)") : "var(--bg-card)", 
              color: filter === t ? "white" : "var(--text-secondary)", 
              fontWeight: 700, 
              fontSize: "0.85rem", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              boxShadow: filter === t ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
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
          const topicColor = TOPIC_COLORS[q.topic] || "var(--accent-primary)";

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
              {/* Question header */}
              <div style={{ padding: "2rem 2.5rem 1.2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{ background: topicColor, color: "white", borderRadius: "8px", padding: "0.25rem 0.8rem", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>{q.topic}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>ID-QUES: {q.id.toString().padStart(2, '0')}</span>
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

              {/* Options */}
              <div style={{ padding: "0 2.5rem 2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isRightAnswer = idx === q.correct;
                  let bg = "var(--bg-secondary)", border = "var(--border-color)", color = "var(--text-secondary)";

                  if (submitted) {
                    if (isRightAnswer) { bg = "rgba(16, 185, 129, 0.1)"; border = "var(--accent-green)"; color = "var(--accent-green)"; }
                    else if (isSelected && !isRightAnswer) { bg = "rgba(239, 68, 68, 0.1)"; border = "var(--accent-red)"; color = "var(--accent-red)"; }
                  } else if (isSelected) {
                    bg = "rgba(155, 28, 46, 0.05)"; border = topicColor; color = "var(--text-primary)";
                  }

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
                        width: "100%",
                        position: "relative"
                      }}>
                      <span style={{ 
                        width: "24px", 
                        height: "24px", 
                        minWidth: "24px", 
                        borderRadius: "50%", 
                        border: `2px solid ${isSelected || (submitted && isRightAnswer) ? (isRightAnswer && submitted ? "var(--accent-green)" : topicColor) : "var(--border-color)"}`, 
                        background: isSelected ? topicColor : (submitted && isRightAnswer ? "var(--accent-green)" : "var(--bg-primary)"), 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontSize: "0.75rem", 
                        fontWeight: 900, 
                        color: isSelected || (submitted && isRightAnswer) ? "white" : "var(--text-muted)", 
                        marginTop: "2px" 
                      }}>
                        {submitted && isRightAnswer ? "✓" : submitted && isSelected && !isRightAnswer ? "✗" : String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ fontSize: "1rem", color, lineHeight: 1.5, fontWeight: isSelected ? 700 : 500 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {submitted && (
                <div style={{ margin: "0 2.5rem 2rem", padding: "1.2rem 1.5rem", background: isCorrect ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)", borderRadius: "12px", borderLeft: `5px solid ${isCorrect ? "var(--accent-green)" : "var(--accent-red)"}` }}>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: isCorrect ? "var(--accent-green)" : "var(--accent-red)", lineHeight: 1.7 }}>
                    <strong style={{ fontSize: "1rem", display: "block", marginBottom: "0.3rem" }}>{isCorrect ? "✅ ¡Análisis Correcto!" : "❌ Error de Diagnóstico"}</strong> 
                    {q.feedback}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!submitted ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
          <button onClick={() => setSubmitted(true)}
            disabled={answered < QUESTIONS.length}
            style={{ 
              padding: "1.2rem 4rem", 
              background: answered === QUESTIONS.length ? "var(--accent-primary)" : "var(--bg-card)", 
              color: answered === QUESTIONS.length ? "white" : "var(--text-muted)", 
              border: "1px solid var(--border-color)", 
              borderRadius: "40px", 
              fontWeight: 900, 
              fontSize: "1.2rem", 
              cursor: answered === QUESTIONS.length ? "pointer" : "not-allowed", 
              boxShadow: answered === QUESTIONS.length ? "var(--glow-primary)" : "none", 
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" 
            }}>
            {answered < QUESTIONS.length ? `Faltan ${QUESTIONS.length - answered} Respuestas` : "🚀 Finalizar Evaluación"}
          </button>
        </div>
      ) : (
        /* Results panel */
        <div style={{ marginTop: "4rem", padding: "3.5rem 2.5rem", background: "var(--bg-card)", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", border: `3px solid ${scoreColor}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: scoreColor }} />
          <div style={{ fontSize: "5rem", marginBottom: "1rem", filter: "drop-shadow(0 0 15px rgba(0,0,0,0.1))" }}>
            {pct >= 90 ? "🏆" : pct >= 75 ? "🎯" : pct >= 50 ? "📚" : "💡"}
          </div>
          <div style={{ fontSize: "4rem", fontWeight: 900, color: scoreColor, marginBottom: "0.5rem", letterSpacing: "-0.05em" }}>{pct}%</div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", margin: "0.5rem 0" }}>
            {correct} de {QUESTIONS.length} Aciertos Detectados
          </h3>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3rem", maxWidth: "500px", margin: "0 auto 3rem" }}>{scoreMsg}</p>

          {/* Per-topic breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.2rem", marginBottom: "3.5rem" }}>
            {TOPICS.map(topic => {
              const tqs = QUESTIONS.filter(q => q.topic === topic);
              const tcorrect = tqs.filter(q => answers[q.id] === q.correct).length;
              const tpct = Math.round((tcorrect / tqs.length) * 100);
              const c = TOPIC_COLORS[topic] || "var(--accent-primary)";
              return (
                <div key={topic} style={{ background: "var(--bg-secondary)", borderRadius: "16px", padding: "1.2rem", border: "1px solid var(--border-color)", borderTop: `4px solid ${tpct === 100 ? "var(--accent-green)" : tpct >= 50 ? c : "var(--accent-red)"}` }}>
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", fontWeight: 800, color: c, textTransform: "uppercase", letterSpacing: "1px" }}>{topic}</p>
                  <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900, color: tpct === 100 ? "var(--accent-green)" : tpct >= 50 ? "var(--text-primary)" : "var(--accent-red)" }}>{tcorrect}/{tqs.length}</p>
                  <div style={{ background: "var(--bg-primary)", borderRadius: "999px", height: "6px", marginTop: "0.8rem", border: "1px solid var(--border-color)" }}>
                    <div style={{ background: tpct === 100 ? "var(--accent-green)" : c, borderRadius: "999px", height: "100%", width: `${tpct}%`, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => { setAnswers({}); setSubmitted(false); setFilter("Todos"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ padding: "1rem 3.5rem", background: "var(--accent-primary)", color: "white", border: "none", borderRadius: "40px", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", boxShadow: "var(--glow-primary)", transition: "all 0.3s ease" }}>
            🔄 Reiniciar Evaluación
          </button>
        </div>
      )}
    </section>
  );
}

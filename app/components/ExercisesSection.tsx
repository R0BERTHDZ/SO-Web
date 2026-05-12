"use client";
import { useState } from "react";

const questions = [
  { id: 1, text: "La llamada al sistema _____ crea un proceso hijo devolviendo _____ al proceso hijo.", answers: ["fork", "0"], hint: "Llamada para duplicar procesos; el valor especial del retorno al hijo." },
  { id: 2, text: "El padre usa _____ para esperar a un hijo específico, y _____ para obtener su código de salida.", answers: ["waitpid", "WEXITSTATUS"], hint: "Variante de wait() con PID; macro para extraer el valor de exit()." },
  { id: 3, text: "Un proceso _____ es aquel que terminó pero cuyo padre no ha llamado a _____.", answers: ["zombi", "wait"], hint: "Estado Z en ps aux; la llamada que libera ese estado." },
  { id: 4, text: "La tubería sin nombre se crea con _____, donde fd[0] es _____ y fd[1] es escritura.", answers: ["pipe", "lectura"], hint: "Función C para crear pipe; el descriptor de entrada del pipe." },
  { id: 5, text: "Una tubería con nombre se crea con _____ y permite comunicación entre procesos no _____.", answers: ["mkfifo", "emparentados"], hint: "Función que crea un FIFO en disco; los procesos no tienen esta relación." },
  { id: 6, text: "La función _____ genera una llave IPC a partir de un archivo y un identificador numérico.", answers: ["ftok"], hint: "Función de System V para generar llaves." },
  { id: 7, text: "En semáforos System V, _____ crea el semáforo, _____ realiza P() o V(), y semctl() lo elimina.", answers: ["semget", "semop"], hint: "Las dos funciones principales de operación sobre semáforos System V." },
  { id: 8, text: "Para memoria compartida: _____ crea el segmento, _____ lo adjunta al proceso y shmdt() lo desadjunta.", answers: ["shmget", "shmat"], hint: "Las primeras dos funciones en el flujo de memoria compartida." },
  { id: 9, text: "Las colas de mensajes usan _____ para enviar y _____ para recibir mensajes tipados.", answers: ["msgsnd", "msgrcv"], hint: "send y receive en la API de colas System V." },
  { id: 10, text: "Un _____ es la unidad mínima de ejecución que comparte memoria con otros del mismo proceso, y se crea con _____.", answers: ["hilo", "pthread_create"], hint: "Thread en inglés; función POSIX para crearlo." },
  { id: 11, text: "En el proyecto Minishell, la función _____ se usa para dividir la entrada del usuario en argumentos.", answers: ["strtok"], hint: "Función estándar de C para separar cadenas por delimitadores." },
  { id: 12, text: "Para obtener la dirección MAC en el proyecto, se utiliza la llamada _____ con el parámetro _____.", answers: ["ioctl", "SIOCGIFHWADDR"], hint: "Llamada de control de E/S; constante para hardware address." },
  { id: 13, text: "La llamada al sistema _____ permite obtener estadísticas del sistema de archivos como bloques totales y libres.", answers: ["statvfs"], hint: "Variante de stat para el Virtual File System." },
  { id: 14, text: "Para listar las interfaces de red e IPs en el comando 'ip', se utiliza la función _____.", answers: ["getifaddrs"], hint: "Función que devuelve una lista enlazada de interfaces." },
  { id: 15, text: "La estructura _____ del kernel se usa en el comando 'stat' para obtener el inodo y tamaño del archivo.", answers: ["stat"], hint: "Estructura fundamental que contiene metadatos de archivos." },
];

export default function ExercisesSection() {
  const [answers, setAnswers] = useState<Record<number, string[]>>(
    Object.fromEntries(questions.map((q) => [q.id, Array(q.answers.length).fill("")]))
  );
  const [checked, setChecked] = useState(false);
  const [hints, setHints] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const set = (qid: number, idx: number, val: string) =>
    setAnswers((p) => ({ ...p, [qid]: p[qid].map((v, i) => (i === idx ? val : v)) }));

  const checkAll = () => setChecked(true);
  const reset = () => { setAnswers(Object.fromEntries(questions.map((q) => [q.id, Array(q.answers.length).fill("")]))); setChecked(false); setRevealed({}); setHints({}); };
  const reveal = (qid: number) => { setAnswers((p) => ({ ...p, [qid]: questions.find((q) => q.id === qid)!.answers })); setRevealed((p) => ({ ...p, [qid]: true })); };

  const isCorrect = (qid: number, idx: number) => answers[qid][idx].trim().toLowerCase() === questions.find((q) => q.id === qid)!.answers[idx].toLowerCase();

  const score = questions.reduce((acc, q) => acc + q.answers.filter((_, i) => isCorrect(q.id, i)).length, 0);
  const total = questions.reduce((acc, q) => acc + q.answers.length, 0);
  const pct = checked ? Math.round((score / total) * 100) : null;

  return (
    <section id="ejercicios" style={{ padding: "5rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 className="section-title">Ejercicios Prácticos</h2>
        <p className="section-subtitle">Completa los espacios para repasar los conceptos clave</p>
      </div>

      {pct !== null && (
        <div style={{ background: pct >= 70 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${pct >= 70 ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`, borderRadius: "12px", padding: "1.5rem", textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", fontFamily: "Outfit, sans-serif", fontWeight: 900, color: pct >= 70 ? "#10b981" : "#ef4444" }}>{pct}%</div>
          <div style={{ color: "var(--text-secondary)" }}>{score}/{total} respuestas correctas — {pct >= 80 ? "🏆 ¡Excelente!" : pct >= 60 ? "👍 Bien, sigue practicando" : "📚 Repasa los temas"}</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {questions.map((q) => {
          const parts = q.text.split("_____");
          return (
            <div key={q.id} className="card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{q.id}</div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600 }}>Completa la frase</span>
              </div>
              <div style={{ fontSize: "1rem", lineHeight: 2.2, color: "var(--text-primary)" }}>
                {parts.map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < q.answers.length && (
                      <input
                        type="text"
                        value={answers[q.id][i]}
                        onChange={(e) => set(q.id, i, e.target.value)}
                        disabled={revealed[q.id]}
                        className={`fill-blank ${checked ? (isCorrect(q.id, i) ? "correct" : "wrong") : ""}`}
                        placeholder="___"
                        style={{ width: Math.max(80, q.answers[i].length * 11) + "px" }}
                      />
                    )}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => setHints((p) => ({ ...p, [q.id]: !p[q.id] }))} style={{ background: "transparent", border: "1px solid var(--accent-orange)", borderRadius: "6px", color: "var(--accent-orange)", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                  💡 {hints[q.id] ? "Ocultar Pista" : "Ver Pista"}
                </button>
                {!revealed[q.id] && (
                  <button onClick={() => reveal(q.id)} style={{ background: "transparent", border: "1px solid var(--text-muted)", borderRadius: "6px", color: "var(--text-secondary)", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                    👁 Revelar Respuesta
                  </button>
                )}
              </div>
              {hints[q.id] && (
                <div style={{ marginTop: "0.75rem", padding: "0.8rem 1rem", background: "rgba(245,158,11,0.1)", borderLeft: "3px solid var(--accent-orange)", borderRadius: "4px", color: "#b45309", fontSize: "0.85rem" }}>
                  <strong>Pista:</strong> {q.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={checkAll}>✅ Verificar Respuestas</button>
        <button className="btn-secondary" onClick={reset}>🔄 Reiniciar</button>
      </div>
    </section>
  );
}

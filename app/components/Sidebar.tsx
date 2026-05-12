"use client";

const chapters = [
  { id: "intro-linux", num: "1", label: "Introducción a los sistemas operativos", desc: "Conceptos básicos", isSection: true },
  { id: "procesos", num: "2", label: "Procesos e Hilos", desc: "Conceptos, llamadas y concurrencia", isSection: true },
  { id: "ipc", num: "3", label: "Mecanismos de comunicación entre procesos-IPC", desc: "Tuberías, System V, Shared Mem", isSection: true },
];

const subchapters = [
  // Chapter 1
  { id: "intro-so",       parent: "1", label: "1.1 ¿Qué es un Sistema Operativo?" },
  { id: "clasificacion",  parent: "1", label: "1.2 Clasificación de los SO" },
  { id: "arranque",       parent: "1", label: "1.3 Proceso de Arranque" },
  { id: "repaso-unidad1", parent: "1", label: "🧠 Repaso: Unidad 1 completa", isReview: true },

  // Chapter 2
  { id: "procesos-conceptos", parent: "2", label: "2.1 Introducción a procesos" },
  { id: "crear-procesos", parent: "2", label: "2.2 Sistema de llamado para crear procesos" },
  { id: "identificar-procesos", parent: "2", label: "2.4 Sistema de llamado para identificar procesos" },
  { id: "wait", parent: "2", label: "2.5 Sistema de llamado wait()" },
  { id: "waitpid", parent: "2", label: "2.5.1 Uso de waitpid()", isSub: true },
  { id: "exit", parent: "2", label: "2.6 Sistema de llamada _exit() y exit()" },
  { id: "zombi", parent: "2", label: "2.7 Estado Zombi" },
  { id: "hilos", parent: "2", label: "2.8 Hilos" },
  { id: "creacion-hilos", parent: "2", label: "2.8.1 Creación de hilos", isSub: true },
  { id: "repaso-unidad2", parent: "2", label: "🧠 Repaso: Unidad 2 completa", isReview: true },

  // Chapter 3
  { id: "ipc-intro", parent: "3", label: "3.1 Comunicación mediante tuberías" },
  { id: "ipc-pipes", parent: "3", label: "3.1.1 Tuberías sin nombre - pipe", isSub: true },
  { id: "ipc-fifo", parent: "3", label: "3.1.2 Tuberías con nombre - fifo", isSub: true },
  { id: "sysv-keys", parent: "3", label: "3.2 Mecanismos IPC (System V)" },
  { id: "sysv-sem", parent: "3", label: "3.2.2 Semáforos", isSub: true },
  { id: "sysv-shm", parent: "3", label: "3.3 Memoria compartida" },
  { id: "sysv-msg", parent: "3", label: "3.4 Cola de mensajes" },
  { id: "sysv-ipcs", parent: "3", label: "3.5 Comandos del sistema (ipcs)" },
  { id: "repaso-unidad3", parent: "3", label: "🧠 Repaso: Unidad 3 completa", isReview: true },
];

export default function Sidebar({ active, setActive }: { active: string; setActive: (id: string) => void }) {

  // Find which chapter is active based on the active sub-item
  const activeChapterNum = subchapters.find(s => s.id === active)?.parent || chapters.find(c => c.id === active)?.num || null;

  return (
    <aside className="sidebar-aside" style={{
      flexShrink: 0,
      padding: "1rem",
      background: "var(--bg-secondary)",
    }}>
      <div style={{ color: "var(--accent-primary)", fontSize: "1rem", fontWeight: 700, padding: "0 0.5rem 1rem" }}>
        Temario Oficial
      </div>

      <div style={{ position: "relative", marginLeft: "1rem" }}>
        {/* Línea conectora */}
        <div style={{ position: "absolute", left: "14px", top: "14px", bottom: "14px", width: "1px", background: "var(--border-color)", zIndex: 1 }}></div>

        {chapters.map((ch) => {
          const isChapterActive = activeChapterNum === ch.num;
          return (
            <div key={ch.id} style={{ position: "relative", zIndex: 2, marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: isChapterActive ? "var(--accent-primary)" : "var(--bg-primary)",
                  color: isChapterActive ? "white" : "var(--text-muted)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", fontWeight: 700, flexShrink: 0,
                  border: isChapterActive ? "none" : "1px solid rgba(0,0,0,0.15)",
                  boxShadow: isChapterActive ? "0 0 0 4px rgba(155, 28, 46, 0.1)" : "none"
                }}>
                  {ch.num}
                </div>
                <div style={{ paddingTop: "0.2rem", flex: 1 }}>
                  <button
                    onClick={() => setActive(ch.id)}
                    style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontWeight: 700, color: isChapterActive ? "var(--accent-primary)" : "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.3 }}
                  >
                    {ch.label}
                  </button>

                  {isChapterActive && (
                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {subchapters.filter(sub => sub.parent === ch.num).map(sub => {
                        const isSubActive = active === sub.id || (active === ch.id && sub.id === ch.id);
                        const isReview = (sub as any).isReview;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setActive(sub.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              background: isSubActive ? (isReview ? "rgba(99,102,241,0.08)" : "rgba(155,28,46,0.06)") : "none",
                              border: isReview ? `1.5px ${isSubActive ? "solid" : "dashed"} ${isSubActive ? "#6366f1" : "#c7d2fe"}` : "none",
                              borderRadius: isReview ? "8px" : "0",
                              paddingTop: isReview ? "0.5rem" : "0",
                              paddingBottom: isReview ? "0.5rem" : "0",
                              paddingRight: isReview ? "0.7rem" : "0",
                              paddingLeft: isReview ? "0.7rem" : sub.isSub ? "1.5rem" : "0",
                              cursor: "pointer",
                              textAlign: "left",
                              fontSize: "0.85rem",
                              color: isSubActive ? (isReview ? "#6366f1" : "var(--accent-primary)") : (isReview ? "#6366f1" : "var(--text-secondary)"),
                              fontWeight: isSubActive ? 700 : isReview ? 600 : 400,
                              width: "100%",
                              marginTop: isReview ? "0.5rem" : "0",
                            }}
                          >
                            {!sub.isSub && !isReview && (
                              <div style={{
                                width: "12px", height: "12px", borderRadius: "50%",
                                border: isSubActive ? "none" : "1px solid #ccc",
                                background: isSubActive ? "var(--accent-primary)" : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0
                              }}>
                                {isSubActive && <div style={{ width: "4px", height: "4px", background: "white", borderRadius: "50%" }}></div>}
                              </div>
                            )}
                            {sub.isSub && !isReview && <div style={{ color: "var(--accent-primary)", opacity: 0.5 }}>↳</div>}
                            <span style={{ lineHeight: 1.2 }}>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {!isChapterActive && (
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                      {ch.desc}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Global Sections */}
        <div style={{ position: "relative", zIndex: 2, marginTop: "3rem" }}>
          <button
            onClick={() => setActive("minishell")}
            style={{ display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: active === "minishell" ? "var(--accent-primary)" : "#f0f0f0", color: active === "minishell" ? "white" : "#666", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>
              🚀
            </div>
            <span style={{ fontWeight: 600, color: active === "minishell" ? "var(--accent-primary)" : "var(--text-primary)", fontSize: "0.95rem" }}>Proyecto: Minishell</span>
          </button>
          {active === "minishell" || active === "repaso-minishell" ? (
            <div style={{ marginLeft: "3rem", marginTop: "0.5rem" }}>
              <button
                onClick={() => setActive("repaso-minishell")}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: active === "repaso-minishell" ? "rgba(99,102,241,0.08)" : "none",
                  border: `1.5px ${active === "repaso-minishell" ? "solid" : "dashed"} #c7d2fe`,
                  borderRadius: "8px", padding: "0.5rem 0.7rem", cursor: "pointer", textAlign: "left",
                  fontSize: "0.85rem", color: "#6366f1", fontWeight: active === "repaso-minishell" ? 700 : 600, width: "100%"
                }}
              >
                🧠 Repaso del Proyecto
              </button>
            </div>
          ) : null}
          <div style={{ height: "1.5rem" }}></div>
          <button
            onClick={() => setActive("examen-parcial2")}
            style={{ display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: active === "examen-parcial2" ? "var(--accent-primary)" : "var(--bg-primary)", color: active === "examen-parcial2" ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0, border: active === "examen-parcial2" ? "none" : "1px solid rgba(0,0,0,0.15)" }}>
              📝
            </div>
            <span style={{ fontWeight: 600, color: active === "examen-parcial2" ? "var(--accent-primary)" : "var(--text-primary)", fontSize: "0.95rem" }}>Examen: 2do Parcial</span>
          </button>
          <div style={{ height: "0.8rem" }}></div>
          <button
            onClick={() => setActive("examen-parcial3")}
            style={{ display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: active === "examen-parcial3" ? "var(--accent-primary)" : "var(--bg-primary)", color: active === "examen-parcial3" ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0, border: active === "examen-parcial3" ? "none" : "1px solid rgba(0,0,0,0.15)" }}>
              📝
            </div>
            <span style={{ fontWeight: 600, color: active === "examen-parcial3" ? "var(--accent-primary)" : "var(--text-primary)", fontSize: "0.95rem" }}>Examen: 3er Parcial</span>
          </button>
          <div style={{ height: "1.5rem" }}></div>
          <button
            onClick={() => setActive("ejercicios")}
            style={{ display: "flex", alignItems: "center", gap: "1rem", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: active === "ejercicios" ? "var(--accent-primary)" : "var(--bg-primary)", color: active === "ejercicios" ? "white" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>
              🎮
            </div>
            <span style={{ fontWeight: 600, color: active === "ejercicios" ? "var(--accent-primary)" : "var(--text-primary)", fontSize: "0.95rem" }}>Práctica Global</span>
          </button>
        </div>
      </div>

      <div style={{ marginTop: "3rem", padding: "1rem", background: "var(--bg-primary)", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "1px", marginBottom: "0.5rem" }}>TERMINAL ACTIVA</div>
        <div style={{ background: "#1e1e1e", color: "#a8d8a8", padding: "0.5rem 0.8rem", borderRadius: "4px", fontSize: "0.8rem", fontFamily: "JetBrains Mono, monospace", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }}></div>
          linux_os:~/SO$
        </div>
      </div>
    </aside>
  );
}

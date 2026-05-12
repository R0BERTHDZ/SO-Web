"use client";
import { useState } from "react";

const concepts = [
  {
    id: 1,
    title: "Sistema Operativo",
    icon: "💻",
    color: "#3b82f6",
    short: "Software que gestiona los recursos del hardware",
    definition: "Un Sistema Operativo (SO) es el software fundamental que actúa como intermediario entre el hardware de la computadora y los programas del usuario. Gestiona recursos como CPU, memoria, dispositivos de entrada/salida y proporciona servicios esenciales.",
    examples: ["Windows 11", "Linux (Ubuntu, Debian)", "macOS Sequoia", "Android", "iOS"],
    category: "fundamentos",
  },
  {
    id: 2,
    title: "Proceso",
    icon: "⚙️",
    color: "#8b5cf6",
    short: "Programa en ejecución con su propio contexto",
    definition: "Un proceso es un programa en ejecución. Incluye el código del programa, sus datos, el stack, el heap y los recursos del SO asignados. Cada proceso tiene su propio espacio de direcciones y contexto de ejecución.",
    examples: ["Un programa de texto ejecutándose", "Servidor web apache", "Proceso hijo creado con fork()"],
    category: "procesos",
  },
  {
    id: 3,
    title: "Kernel",
    icon: "🔧",
    color: "#06b6d4",
    short: "Núcleo central del sistema operativo",
    definition: "El kernel es el núcleo central del SO. Se ejecuta con máximos privilegios y controla directamente el hardware. Gestiona la memoria, los procesos, el sistema de archivos y la comunicación entre procesos.",
    examples: ["Linux Kernel 6.x", "Mach (macOS)", "Windows NT Kernel"],
    category: "fundamentos",
  },
  {
    id: 4,
    title: "PCB",
    icon: "📋",
    color: "#10b981",
    short: "Process Control Block: estructura de datos del proceso",
    definition: "El Bloque de Control de Proceso (PCB) es una estructura de datos que contiene toda la información sobre un proceso: estado, contador de programa, registros de CPU, información de memoria, listas de E/S y credenciales.",
    examples: ["PID, estado, registros CPU", "Puntero a tabla de páginas", "Archivos abiertos"],
    category: "procesos",
  },
  {
    id: 5,
    title: "Memoria Virtual",
    icon: "🧠",
    color: "#f59e0b",
    short: "Abstracción que extiende la RAM disponible",
    definition: "La memoria virtual es una técnica que permite a los procesos usar más memoria de la físicamente disponible. Usa el disco como extensión de la RAM mediante paginación y segmentación, dando a cada proceso su propio espacio de direcciones.",
    examples: ["Paginación bajo demanda", "Swap en Linux", "Segmentación de código/datos"],
    category: "memoria",
  },
  {
    id: 6,
    title: "Hilo (Thread)",
    icon: "🧵",
    color: "#ec4899",
    short: "Unidad de ejecución dentro de un proceso",
    definition: "Un hilo (thread) es la unidad básica de utilización de CPU dentro de un proceso. Comparte código, datos y recursos con otros hilos del mismo proceso, pero tiene su propio stack y registros.",
    examples: ["pthread_create()", "Hilos de kernel vs usuario", "Modelo M:N de hilos"],
    category: "procesos",
  },
  {
    id: 7,
    title: "Semáforo",
    icon: "🚦",
    color: "#ef4444",
    short: "Mecanismo de sincronización entre procesos",
    definition: "Un semáforo es una variable entera usada para sincronizar el acceso a recursos compartidos. Las operaciones P (wait/down) y V (signal/up) son atómicas para evitar condiciones de carrera.",
    examples: ["sem_wait() y sem_post()", "Semáforo binario (mutex)", "Semáforo contador"],
    category: "sincronización",
  },
  {
    id: 8,
    title: "Sistema de Archivos",
    icon: "📁",
    color: "#3b82f6",
    short: "Organización lógica de datos en disco",
    definition: "El sistema de archivos define cómo se almacenan, organizan y acceden los datos en un dispositivo de almacenamiento. Proporciona estructura jerárquica mediante directorios y maneja inodos, bloques de datos y metadatos.",
    examples: ["ext4 (Linux)", "NTFS (Windows)", "FAT32", "HFS+ (macOS)"],
    category: "archivos",
  },
  {
    id: 9,
    title: "Planificador CPU",
    icon: "📅",
    color: "#8b5cf6",
    short: "Algoritmo que decide qué proceso usa la CPU",
    definition: "El planificador (scheduler) de CPU decide cuál de los procesos listos debe ejecutarse en la CPU en cada momento. Busca maximizar el uso de CPU, minimizar tiempos de espera y ser justo con todos los procesos.",
    examples: ["FCFS", "Round Robin (RR)", "Shortest Job First (SJF)", "Prioridades"],
    category: "procesos",
  },
];

const categories = [
  { id: "todos", label: "Todos" },
  { id: "fundamentos", label: "Fundamentos" },
  { id: "procesos", label: "Procesos" },
  { id: "memoria", label: "Memoria" },
  { id: "sincronización", label: "Sincronización" },
  { id: "archivos", label: "Archivos" },
];

export default function ConceptsSection() {
  const [selected, setSelected] = useState<typeof concepts[0] | null>(null);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = concepts.filter((c) => {
    const matchCat = filter === "todos" || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.definition.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="conceptos" style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="badge badge-purple" style={{ marginBottom: "1rem", display: "inline-flex" }}>
          📚 Glosario Interactivo
        </span>
        <h2 className="section-title">Conceptos Clave de SO</h2>
        <p className="section-subtitle">
          Haz clic en cualquier tarjeta para ver la definición completa
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${filter === cat.id ? "active" : ""}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ maxWidth: "400px", margin: "0 auto 2.5rem" }}>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#64748b",
          }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar concepto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "10px",
              color: "var(--text-primary)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.6)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; }}
          />
        </div>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.25rem",
        marginBottom: "3rem",
      }}>
        {filtered.map((c) => (
          <div
            key={c.id}
            className="concept-card"
            onClick={() => setSelected(c)}
            style={{ cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: `${c.color}20`,
                border: `1px solid ${c.color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}>
                {c.icon}
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                  {c.title}
                </h3>
                <span className="badge" style={{
                  background: `${c.color}15`,
                  color: c.color,
                  border: `1px solid ${c.color}30`,
                  fontSize: "0.65rem",
                }}>
                  {c.category}
                </span>
              </div>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              {c.short}
            </p>
            <div style={{ marginTop: "1rem", color: c.color, fontSize: "0.8rem", fontWeight: 600 }}>
              Ver más →
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${selected.color}40`,
              borderRadius: "20px",
              padding: "2rem",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: `0 0 60px ${selected.color}20`,
            }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "14px",
                background: `${selected.color}20`,
                border: `1px solid ${selected.color}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}>
                {selected.icon}
              </div>
              <div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: selected.color }}>
                  {selected.title}
                </h2>
                <span className="badge" style={{
                  background: `${selected.color}15`,
                  color: selected.color,
                  border: `1px solid ${selected.color}30`,
                }}>
                  {selected.category}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#94a3b8",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >✕</button>
            </div>

            {/* Definition */}
            <div style={{
              background: `${selected.color}08`,
              border: `1px solid ${selected.color}20`,
              borderRadius: "12px",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}>
              <h4 style={{ color: selected.color, fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                📖 Definición
              </h4>
              <p style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {selected.definition}
              </p>
            </div>

            {/* Examples */}
            <div>
              <h4 style={{ color: selected.color, fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                💡 Ejemplos
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {selected.examples.map((ex, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 1rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <span style={{ color: selected.color }}>▸</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontFamily: "JetBrains Mono, monospace" }}>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

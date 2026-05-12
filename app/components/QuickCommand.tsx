"use client";
import React, { useState, useEffect, useRef } from "react";

export default function QuickCommand() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Bienvenido al Shell del Dashboard.", "Escribe 'help' para ver los comandos disponibles."]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    const newHistory = [...history, `user@so:~$ ${input}`];

    switch (cmd) {
      case "help":
        newHistory.push("Comandos disponibles:", "- help: Muestra esta ayuda", "- clear: Limpia la terminal", "- goto [tema]: Navega a un tema (ej: goto 2.1)", "- info: Información del sistema", "- whoami: ¿Quién eres?");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        newHistory.push("Eres un estudiante de Ingeniería en Computación explorando el Kernel.");
        break;
      case "info":
        newHistory.push("Plataforma Educativa de Sistemas Operativos v2.0", "Desarrollado con Next.js y React.", "Corriendo en modo interactivo.");
        break;
      default:
        if (cmd.startsWith("goto ")) {
          const target = cmd.replace("goto ", "").trim();
          newHistory.push(`Navegando a: ${target}...`);
          // Dispatch navigation event
          const mapping: Record<string, string> = {
            "1.1": "intro-so",
            "1.2": "clasificacion",
            "2.1": "procesos-conceptos",
            "2.2": "crear-procesos",
            "2.4": "identificar-procesos",
            "3.1": "ipc-intro",
            "practicas": "practicas"
          };
          
          if (target === "practicas") {
            window.location.href = "/practicas";
          } else if (mapping[target]) {
            window.dispatchEvent(new CustomEvent("os_navigate", { detail: mapping[target] }));
          } else {
            newHistory.push(`Error: Tema '${target}' no encontrado.`);
          }
        } else {
          newHistory.push(`Comando no reconocido: ${cmd}. Escribe 'help' para ayuda.`);
        }
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div style={{
      background: "#0f172a",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "1rem",
      color: "#38bdf8",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.85rem",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)"
    }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", marginBottom: "0.5rem", scrollBehavior: "smooth" }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: "0.2rem", lineHeight: 1.4 }}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.5rem" }}>
        <span style={{ color: "#10b981" }}>user@so:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={{
            background: "none",
            border: "none",
            color: "white",
            outline: "none",
            flex: 1,
            fontSize: "0.85rem",
            fontFamily: "inherit"
          }}
        />
      </form>
    </div>
  );
}

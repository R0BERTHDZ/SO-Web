"use client";
import React, { useState, useEffect, useRef } from "react";

interface QuickCommandProps {
  isRoot: boolean;
  setIsRoot: (val: boolean) => void;
}

export default function QuickCommand({ isRoot, setIsRoot }: QuickCommandProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Bienvenido al Shell del Dashboard.", "Escribe 'help' para ver los comandos disponibles."]);
  const [mode, setMode] = useState<"IDLE" | "PASSWORD">("IDLE");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput && mode === "IDLE") return;

    if (mode === "PASSWORD") {
      if (input === "root" || input === "admin") {
        setIsRoot(true);
        setHistory([...history, "********", "Autenticación exitosa. Cambiando a superusuario (root)...", "⚠️ Advertencia: ¡Con un gran poder conlleva una gran responsabilidad!"]);
      } else {
        setHistory([...history, "********", "su: Fallo de autenticación. Inténtelo de nuevo."]);
      }
      setMode("IDLE");
      setInput("");
      return;
    }

    const cmd = cleanInput.toLowerCase();
    const prompt = isRoot ? "root@so:#" : "user@so:~$";
    const newHistory = [...history, `${prompt} ${cleanInput}`];

    switch (cmd) {
      case "su root":
      case "sudo su":
      case "su":
        if (!isRoot) {
          setHistory([...newHistory, "Contraseña:"]);
          setMode("PASSWORD");
          setInput("");
          return;
        } else {
          newHistory.push("Ya eres superusuario.");
        }
        break;
      case "exit":
        if (isRoot) {
          setIsRoot(false);
          newHistory.push("Sesión de superusuario terminada. Regresando a usuario normal.");
        } else {
          newHistory.push("Cerrando sesión de terminal...");
        }
        break;
      case "help":
        newHistory.push("Comandos disponibles:", "- help: Muestra esta ayuda", "- clear: Limpia la terminal", "- goto [tema]: Navega a un tema", "- info: Información del sistema", "- whoami: ¿Quién eres?", "- su root: Escalar privilegios a superusuario", "- exit: Salir de la sesión actual");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        if (isRoot) {
          newHistory.push("root - Tienes control absoluto sobre el sistema.");
        } else {
          newHistory.push("Eres un estudiante de Ingeniería en Computación explorando el Kernel.");
        }
        break;
      case "info":
        newHistory.push("Plataforma Educativa de Sistemas Operativos v2.0", "Desarrollado con Next.js y React.", "Corriendo en modo interactivo.");
        break;
      default:
        if (cmd.startsWith("goto ")) {
          const target = cmd.replace("goto ", "").trim();
          newHistory.push(`Navegando a: ${target}...`);
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
      borderRadius: "16px",
      border: `2px solid ${isRoot ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
      padding: "1rem",
      color: isRoot ? "#f87171" : "#38bdf8",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.85rem",
      height: "220px",
      display: "flex",
      flexDirection: "column",
      boxShadow: isRoot ? "0 0 20px rgba(239, 68, 68, 0.2)" : "inset 0 2px 10px rgba(0,0,0,0.5)",
      transition: "all 0.3s ease"
    }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", marginBottom: "0.5rem", scrollBehavior: "smooth" }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: "0.2rem", lineHeight: 1.4 }}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} style={{ display: "flex", alignItems: "center", gap: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "0.5rem" }}>
        {mode === "IDLE" && (
          <span style={{ color: isRoot ? "#ef4444" : "#10b981", fontWeight: isRoot ? "bold" : "normal" }}>
            {isRoot ? "root@so:#" : "user@so:~$"}
          </span>
        )}
        <input
          type={mode === "PASSWORD" ? "password" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder={mode === "PASSWORD" ? "Ingresa contraseña..." : ""}
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

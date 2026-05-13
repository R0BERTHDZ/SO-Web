"use client";
import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import { CODE } from "./codeSnippets";
import MatchPairs from "./MatchPairs";
import MiniQuiz from "./MiniQuiz";
import ZombieActivity from "./ZombieActivity";
import WordSearch from "./WordSearch";
import Crossword from "./Crossword";

export function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card" style={{
      borderLeft: "4px solid var(--accent-primary)",
      marginBottom: "2.5rem",
      background: "var(--bg-card)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
      borderRadius: "12px",
      padding: "1.8rem 2rem"
    }}>
      <h4 style={{ color: "var(--text-primary)", fontWeight: 800, marginBottom: "1.2rem", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ color: "var(--accent-primary)", fontSize: "1.2rem" }}>✦</span> {title}
      </h4>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            <span style={{ color: "var(--accent-primary)", marginTop: "2px", fontWeight: "bold" }}>▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NextTopicButton({ targetId, text = "Siguiente Subtema ➔" }: { targetId: string, text?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem", marginBottom: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
      <button
        className="btn-primary"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("os_navigate", { detail: targetId }));
        }}
        style={{ padding: "0.8rem 2rem", fontSize: "1.05rem", borderRadius: "30px", fontWeight: 700, boxShadow: "0 4px 15px rgba(155, 28, 46, 0.2)", transition: "transform 0.2s" }}
        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        {text}
      </button>
    </div>
  );
}

function ProcessStateDiagram() {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "2.5rem 0", display: "flex", justifyContent: "center", background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid var(--border-color)" }}>
      <svg width="750" height="380" viewBox="0 0 750 380" style={{ maxWidth: "100%", height: "auto", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-primary)" />
          </marker>
        </defs>

        {/* Nodes */}
        <circle cx="80" cy="190" r="45" fill="var(--bg-secondary)" stroke="var(--text-primary)" strokeWidth="2" />
        <text x="80" y="195" textAnchor="middle" fontWeight="bold" fill="var(--text-primary)" fontSize="15">Nuevo</text>

        <circle cx="280" cy="190" r="45" fill="var(--bg-secondary)" stroke="var(--text-primary)" strokeWidth="2" />
        <text x="280" y="195" textAnchor="middle" fontWeight="bold" fill="var(--text-primary)" fontSize="15">Listo</text>

        <circle cx="480" cy="90" r="45" fill="var(--bg-secondary)" stroke="var(--text-primary)" strokeWidth="2" />
        <text x="480" y="95" textAnchor="middle" fontWeight="bold" fill="var(--text-primary)" fontSize="15">Ejecutado</text>

        <circle cx="480" cy="290" r="45" fill="var(--bg-secondary)" stroke="var(--text-primary)" strokeWidth="2" />
        <text x="480" y="295" textAnchor="middle" fontWeight="bold" fill="var(--text-primary)" fontSize="15">Bloqueado</text>

        <circle cx="680" cy="190" r="45" fill="var(--bg-secondary)" stroke="var(--text-primary)" strokeWidth="2" />
        <text x="680" y="195" textAnchor="middle" fontWeight="bold" fill="var(--text-primary)" fontSize="15">Hecho</text>

        {/* Edges */}
        {/* Nuevo -> Listo */}
        <line x1="125" y1="190" x2="230" y2="190" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="177" y="165" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">Proceso</text>
        <text x="177" y="180" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">creado</text>

        {/* Listo -> Ejecutado */}
        <line x1="315" y1="160" x2="435" y2="110" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="365" y="115" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">Seleccionado</text>
        <text x="365" y="130" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">para ejecución</text>

        {/* Ejecutado -> Listo */}
        <line x1="435" y1="125" x2="315" y2="175" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="390" y="165" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">Tiempo</text>
        <text x="390" y="180" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">terminado</text>

        {/* Ejecutado -> Bloqueado */}
        <line x1="480" y1="135" x2="480" y2="240" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="530" y="185" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">Solicitud</text>
        <text x="530" y="200" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">de E/S</text>

        {/* Bloqueado -> Listo */}
        <line x1="440" y1="270" x2="310" y2="215" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="375" y="245" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">E/S</text>
        <text x="375" y="260" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">completa</text>

        {/* Ejecutado -> Hecho */}
        <line x1="520" y1="110" x2="640" y2="170" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="590" y="125" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">Terminación</text>
        <text x="590" y="140" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">normal/anormal</text>
      </svg>
    </div>
  );
}

function ForkDiagram() {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "2.5rem 0", display: "flex", justifyContent: "center", background: "var(--bg-card)", padding: "2.5rem 1rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid var(--border-color)" }}>
      <svg width="700" height="300" viewBox="0 0 700 300" style={{ maxWidth: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}>
        <defs>
          <marker id="fa" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--accent-primary)" /></marker>
          <linearGradient id="gp" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(155, 28, 46, 0.1)" /><stop offset="100%" stopColor="rgba(155, 28, 46, 0.05)" /></linearGradient>
          <linearGradient id="gc" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" /><stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" /></linearGradient>
        </defs>
        {/* Proceso original */}
        <rect x="10" y="80" width="140" height="140" rx="10" fill="url(#gp)" stroke="var(--accent-primary)" strokeWidth="2" />
        <text x="80" y="108" textAnchor="middle" fontWeight="800" fontSize="13" fill="var(--accent-primary)">PROCESO</text>
        <text x="80" y="124" textAnchor="middle" fontWeight="800" fontSize="13" fill="var(--accent-primary)">PADRE</text>
        <text x="80" y="145" textAnchor="middle" fontSize="11" fill="var(--text-muted)">PID = 1000</text>
        <rect x="25" y="155" width="110" height="18" rx="4" fill="var(--accent-primary)" opacity="0.15" />
        <text x="80" y="168" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Texto · Datos · Heap · Stack</text>
        <rect x="25" y="178" width="110" height="18" rx="4" fill="var(--accent-primary)" opacity="0.15" />
        <text x="80" y="191" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Archivos abiertos</text>
        {/* fork() label */}
        <text x="220" y="140" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--accent-primary)">fork()</text>
        <line x1="155" y1="130" x2="195" y2="130" stroke="var(--accent-primary)" strokeWidth="2" markerEnd="url(#fa)" />
        <line x1="215" y1="130" x2="215" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="215" y1="170" x2="215" y2="210" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="215" y1="90" x2="250" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" markerEnd="url(#fa)" />
        <line x1="215" y1="210" x2="250" y2="210" stroke="var(--accent-primary)" strokeWidth="1.5" markerEnd="url(#fa)" />
        {/* Padre después */}
        <rect x="255" y="40" width="150" height="100" rx="10" fill="url(#gp)" stroke="var(--accent-primary)" strokeWidth="2" />
        <text x="330" y="65" textAnchor="middle" fontWeight="800" fontSize="13" fill="var(--accent-primary)">PADRE</text>
        <text x="330" y="82" textAnchor="middle" fontSize="11" fill="var(--text-muted)">PID = 1000</text>
        <text x="330" y="99" textAnchor="middle" fontSize="11" fill="var(--text-muted)">retorna: PID_hijo</text>
        <rect x="270" y="108" width="120" height="16" rx="4" fill="var(--accent-primary)" opacity="0.15" />
        <text x="330" y="120" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Copia virtual (COW)</text>
        {/* Hijo */}
        <rect x="255" y="160" width="150" height="100" rx="10" fill="url(#gc)" stroke="#3b82f6" strokeWidth="2" />
        <text x="330" y="185" textAnchor="middle" fontWeight="800" fontSize="13" fill="#3b82f6">HIJO</text>
        <text x="330" y="202" textAnchor="middle" fontSize="11" fill="var(--text-muted)">PID = 1001</text>
        <text x="330" y="219" textAnchor="middle" fontSize="11" fill="var(--text-muted)">retorna: 0</text>
        <rect x="270" y="228" width="120" height="16" rx="4" fill="#3b82f6" opacity="0.15" />
        <text x="330" y="240" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Copia virtual (COW)</text>
        {/* COW arrow */}
        <line x1="408" y1="90" x2="490" y2="90" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#fa)" />
        <line x1="408" y1="210" x2="490" y2="210" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#fa)" />
        {/* Shared memory */}
        <rect x="494" y="130" width="140" height="100" rx="10" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="2" />
        <text x="564" y="155" textAnchor="middle" fontWeight="800" fontSize="12" fill="#10b981">MEMORIA</text>
        <text x="564" y="170" textAnchor="middle" fontWeight="800" fontSize="12" fill="#10b981">FÍSICA</text>
        <text x="564" y="190" textAnchor="middle" fontSize="10" fill="var(--text-muted)">Páginas compartidas</text>
        <text x="564" y="205" textAnchor="middle" fontSize="10" fill="#10b981">hasta escritura (COW)</text>
        <text x="564" y="222" textAnchor="middle" fontSize="10" fill="var(--text-muted)">Segmento Texto</text>
      </svg>
    </div>
  );
}

function WaitDiagram() {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "2.5rem 0", background: "var(--bg-card)", padding: "2.5rem 2rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid var(--border-color)" }}>
      <p style={{ textAlign: "center", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", fontSize: "1rem" }}>⏱ Línea de tiempo: wait() en acción</p>
      <svg width="660" height="200" viewBox="0 0 660 200" style={{ maxWidth: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}>
        <defs>
          <marker id="wa" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="var(--text-primary)" /></marker>
        </defs>
        {/* Timeline axis */}
        <line x1="20" y1="185" x2="640" y2="185" stroke="var(--border-color)" strokeWidth="1.5" markerEnd="url(#wa)" />
        <text x="610" y="175" fontSize="11" fill="var(--text-muted)">tiempo</text>
        {/* PADRE lane */}
        <text x="14" y="55" fontSize="11" fontWeight="800" fill="var(--accent-primary)" textAnchor="middle" transform="rotate(-90, 14, 55)">PADRE</text>
        <rect x="30" y="30" width="120" height="28" rx="6" fill="rgba(155, 28, 46, 0.1)" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <text x="90" y="49" textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontWeight="700">Ejecutando</text>
        <rect x="152" y="30" width="160" height="28" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="232" y="49" textAnchor="middle" fontSize="11" fill="#f59e0b" fontWeight="700">BLOQUEADO en wait()</text>
        <rect x="314" y="30" width="120" height="28" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1.5" />
        <text x="374" y="49" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="700">Continúa 🎉</text>
        {/* Fork arrow */}
        <line x1="152" y1="90" x2="152" y2="110" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#wa)" />
        <text x="152" y="88" textAnchor="middle" fontSize="10" fill="var(--text-muted)">fork()</text>
        {/* wait arrow */}
        <line x1="232" y1="58" x2="232" y2="75" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#wa)" />
        <text x="232" y="72" textAnchor="middle" fontSize="9" fill="#f59e0b">wait()</text>
        {/* HIJO lane */}
        <text x="14" y="135" fontSize="11" fontWeight="800" fill="#3b82f6" textAnchor="middle" transform="rotate(-90, 14, 135)">HIJO</text>
        <rect x="152" y="110" width="140" height="28" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="222" y="129" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="700">Ejecutando tarea</text>
        <rect x="294" y="110" width="42" height="28" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="315" y="129" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="700">exit()</text>
        {/* SIGCHLD */}
        <line x1="315" y1="110" x2="315" y2="58" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#wa)" />
        <text x="340" y="86" fontSize="9" fill="#ef4444">SIGCHLD</text>
      </svg>
    </div>
  );
}

function ThreadDiagram() {
  return (
    <div style={{ width: "100%", overflowX: "auto", margin: "2.5rem 0", background: "var(--bg-card)", padding: "2.5rem 2rem", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid var(--border-color)" }}>
      <p style={{ textAlign: "center", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", fontSize: "1rem" }}>🧵 Proceso con múltiples hilos</p>
      <svg width="660" height="270" viewBox="0 0 660 270" style={{ maxWidth: "100%", height: "auto", fontFamily: "system-ui, sans-serif" }}>
        {/* Process container */}
        <rect x="10" y="10" width="640" height="250" rx="14" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="6,3" />
        <text x="330" y="34" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--accent-primary)">PROCESO (PID = 2000)</text>
        {/* Shared resources box */}
        <rect x="30" y="45" width="600" height="55" rx="8" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="1.5" />
        <text x="330" y="65" textAnchor="middle" fontWeight="800" fontSize="12" fill="#10b981">RECURSOS COMPARTIDOS POR TODOS LOS HILOS</text>
        <text x="160" y="86" textAnchor="middle" fontSize="10" fill="var(--text-primary)">📄 Segmento Texto</text>
        <text x="280" y="86" textAnchor="middle" fontSize="10" fill="var(--text-primary)">🗂 Variables Globales</text>
        <text x="400" y="86" textAnchor="middle" fontSize="10" fill="var(--text-primary)">🔗 Archivos Abiertos</text>
        <text x="520" y="86" textAnchor="middle" fontSize="10" fill="var(--text-primary)">💾 Heap</text>
        {/* Thread boxes */}
        {[0, 1, 2].map((i) => {
          const x = 30 + i * 210;
          const colors = [
            ["rgba(59, 130, 246, 0.1)", "#3b82f6"],
            ["rgba(139, 92, 246, 0.1)", "#8b5cf6"],
            ["rgba(245, 158, 11, 0.1)", "#f59e0b"]
          ];
          const [bg, stroke] = colors[i];
          return (
            <g key={i}>
              <rect x={x} y="118" width="190" height="120" rx="8" fill={bg} stroke={stroke} strokeWidth="1.5" />
              <text x={x + 95} y="138" textAnchor="middle" fontWeight="800" fontSize="12" fill={stroke}>Hilo {i + 1} (TID={2001 + i})</text>
              <rect x={x + 10} y="148" width="170" height="20" rx="4" fill={stroke} opacity="0.15" />
              <text x={x + 95} y="162" textAnchor="middle" fontSize="10" fill="var(--text-primary)">🔢 Registros propios</text>
              <rect x={x + 10} y="173" width="170" height="20" rx="4" fill={stroke} opacity="0.15" />
              <text x={x + 95} y="187" textAnchor="middle" fontSize="10" fill="var(--text-primary)">📍 Contador de Programa</text>
              <rect x={x + 10} y="198" width="170" height="20" rx="4" fill={stroke} opacity="0.15" />
              <text x={x + 95} y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">📚 Stack propio</text>
              <text x={x + 95} y="232" textAnchor="middle" fontSize="9" fill="var(--text-muted)">ejecuta start_routine()</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ChapterHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <div style={{
      marginBottom: "3.5rem",
      borderRadius: "16px",
      overflow: "hidden",
      background: "var(--bg-card)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
      border: "1px solid var(--border-color)"
    }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(155, 28, 46, 0.06) 0%, rgba(155, 28, 46, 0.01) 100%)",
        padding: "2.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        borderBottom: "1px solid rgba(155, 28, 46, 0.08)"
      }}>
        <div style={{
          minWidth: "54px",
          height: "54px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, var(--accent-primary) 0%, #7a1523 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "1.25rem",
          flexShrink: 0,
          boxShadow: "0 4px 15px rgba(155, 28, 46, 0.3)"
        }}>
          {num}
        </div>
        <h2 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{title}</h2>
      </div>
      <div style={{
        padding: "1.8rem 2.5rem",
        background: "var(--bg-secondary)",
        color: "var(--text-secondary)",
        fontSize: "1.1rem",
        lineHeight: 1.7,
        fontWeight: 500
      }}>
        {subtitle}
      </div>
    </div>
  );
}

export function SectionText({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.85, marginBottom: "1.75rem", letterSpacing: "0.01em" }}>{children}</p>;
}

function DidYouKnow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      gap: "1.2rem",
      background: "var(--bg-secondary)",
      border: "1px solid var(--accent-orange)",
      borderRadius: "12px",
      padding: "1.5rem",
      margin: "1.5rem 0",
      boxShadow: "0 4px 15px rgba(245,158,11,0.15)",
      alignItems: "flex-start"
    }}>
      <div style={{ fontSize: "2rem", color: "#d97706", lineHeight: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
        💡
      </div>
      <div>
        <h4 style={{ color: "var(--accent-orange)", fontWeight: 800, margin: "0 0 0.4rem 0", fontSize: "1.1rem" }}>¿Sabías que...?</h4>
        <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>{children}</p>
      </div>
    </div>
  );
}

export function Chapter1_1() {
  return (
    <section id="intro-so" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="1.1" title="¿Qué es un Sistema Operativo?" subtitle="Definición, funciones principales y posición en la arquitectura del sistema." />

      <div className="card" style={{ marginBottom: "3rem", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <SectionText>
          Un <strong>Sistema Operativo (SO)</strong> es el software fundamental que administra los recursos de un dispositivo y actúa como interfaz entre el usuario y el hardware. Sus funciones principales se centran en brindar comodidad, eficiencia y la capacidad de evolución del sistema.
        </SectionText>

        <InfoCard title="Responsabilidades Principales del SO" items={[
          "Administración de Procesos: Gestión de programas en ejecución evitando conflictos (sincronización incorrecta, interbloqueos).",
          "Administración de Memoria: Asignación y aislamiento de espacios de memoria para cada proceso de forma segura.",
          "Gestión de Seguridad: Control de acceso, políticas de compartición y control del flujo de información.",
          "Administración de Recursos: Uso equitativo y eficiente de procesadores, medios de almacenamiento y E/S."
        ]} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2.5rem 0 1rem", padding: "2rem 1.5rem", background: "var(--bg-primary)", borderRadius: "12px", border: "1px dashed var(--border-color)" }}>
          <div style={{ background: "#3b82f6", color: "white", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: 700, width: "240px", textAlign: "center", marginBottom: "0.5rem", boxShadow: "0 4px 10px rgba(59,130,246,0.2)" }}>Usuarios / Aplicaciones</div>
          <div style={{ fontSize: "1.8rem", color: "var(--text-muted)", margin: "0.1rem 0", fontWeight: 800 }}>↕</div>
          <div style={{ background: "var(--accent-primary)", color: "white", padding: "1.2rem 2.5rem", borderRadius: "8px", fontWeight: 800, width: "280px", textAlign: "center", fontSize: "1.2rem", margin: "0.5rem 0", boxShadow: "0 6px 15px rgba(155,28,46,0.3)", position: "relative" }}>
            Sistema Operativo
            <div style={{ position: "absolute", right: "-15px", top: "-15px", background: "#f59e0b", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>⚙️</div>
          </div>
          <div style={{ fontSize: "1.8rem", color: "var(--text-muted)", margin: "0.1rem 0", fontWeight: 800 }}>↕</div>
          <div style={{ background: "#1f2937", color: "white", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: 700, width: "240px", textAlign: "center", marginTop: "0.5rem", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>Hardware (CPU, RAM, E/S)</div>
        </div>

        <DidYouKnow>
          El software de navegación del <strong>Apolo 11</strong> que llevó al hombre a la luna operaba con principios fundamentales de un <em>sistema operativo de tiempo real</em>, garantizando la atención inmediata de tareas críticas. Sorprendentemente, esa computadora era mucho menos potente que el microprocesador de un horno de microondas actual. ¡La eficiencia del diseño del SO fue la verdadera clave de su éxito!
        </DidYouKnow>

        <WordSearch
          title="Sopa de Letras: Conceptos Base"
          items={[
            {
              word: "KERNEL",
              meaning: "Es el componente central y más interno del sistema operativo. Actúa como el puente principal entre las aplicaciones de software y el procesamiento de datos realizado a nivel de hardware, gestionando recursos de manera segura y eficiente.",
              importance: "Sin el Kernel, el software no podría comunicarse con el hardware. Es responsable de la gestión de memoria, el sistema de archivos, y el manejo de interrupciones, garantizando la estabilidad total del equipo.",
              hint: "Es el corazón o núcleo del sistema operativo."
            },
            {
              word: "PROCESO",
              meaning: "Se define como una instancia de un programa en ejecución. Incluye el código del programa, sus datos, su pila, su contador de programa y otros registros de la CPU necesarios para su control por parte del SO.",
              importance: "La gestión de procesos permite el multiprocesamiento y la multitarea. El sistema operativo debe decidir qué proceso obtiene la CPU y por cuánto tiempo, evitando conflictos y asegurando que ninguna tarea bloquee el sistema.",
              hint: "Un programa en ejecución."
            },
            {
              word: "MEMORIA",
              meaning: "Se refiere principalmente a la RAM (Random Access Memory), el espacio de almacenamiento temporal de alta velocidad donde el procesador guarda los datos y las instrucciones de los programas que se están usando activamente.",
              importance: "Una gestión de memoria eficiente es vital para el rendimiento. El SO debe asignar y liberar memoria dinámicamente, además de implementar memoria virtual para permitir que los programas usen más espacio del que físicamente existe.",
              hint: "Espacio de almacenamiento temporal RAM."
            },
            {
              word: "HARDWARE",
              meaning: "Engloba todos los componentes físicos y tangibles de una computadora, desde la Unidad Central de Procesamiento (CPU) y la placa base hasta los dispositivos periféricos de entrada y salida como discos y monitores.",
              importance: "El hardware proporciona la capacidad de cómputo bruta. El sistema operativo existe para abstraer la complejidad del hardware, permitiendo que los desarrolladores escriban software sin preocuparse por los detalles eléctricos de cada chip.",
              hint: "La parte física que puedes tocar."
            },
            {
              word: "INTERFAZ",
              meaning: "Es el punto de interacción entre el usuario y el sistema operativo. Puede ser una Interfaz de Línea de Comandos (CLI), basada en texto, o una Interfaz Gráfica de Usuario (GUI), basada en ventanas e iconos.",
              importance: "La interfaz determina la accesibilidad y la experiencia del usuario (UX). Permite que humanos sin conocimientos técnicos profundos puedan operar máquinas complejas de manera intuitiva y productiva.",
              hint: "Punto de contacto entre usuario y sistema."
            },
            {
              word: "SISTEMA",
              meaning: "Se refiere al ecosistema completo donde coexisten el hardware, el firmware y el software. Es un conjunto de elementos relacionados que funcionan como un todo para procesar información y resolver problemas.",
              importance: "La visión sistémica permite entender la computadora como una unidad coordinada. El sistema operativo actúa como el director de orquesta de este ecosistema, asegurando que todos los componentes colaboren sin errores.",
              hint: "Conjunto ordenado de elementos que interactúan."
            },
            {
              word: "LINUX",
              meaning: "Es un núcleo de sistema operativo de tipo Unix, multitararea y multiusuario, desarrollado originalmente por Linus Torvalds bajo una licencia de código abierto (GPL). Es el ejemplo más exitoso de software libre.",
              importance: "Linux es fundamental en la computación moderna: impulsa casi todos los supercomputadores del mundo, la gran mayoría de los servidores de internet y es la base de sistemas como Android, ofreciendo seguridad y personalización extrema.",
              hint: "El sistema operativo del pingüino."
            },
            {
              word: "SHELL",
              meaning: "Es un programa que actúa como interfaz entre el usuario y el núcleo del sistema operativo. Recibe los comandos del usuario en lenguaje natural o scripts y los traduce en instrucciones que el Kernel puede entender.",
              importance: "El Shell (como Bash en Linux) es la herramienta más poderosa para administradores de sistemas. Permite la automatización de tareas complejas mediante scripts, algo que sería extremadamente lento o imposible de hacer manualmente.",
              hint: "Intérprete de comandos."
            }
          ]}
          size={10}
        />
      </div>
    </section>
  );
}

export function Chapter1_2() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const classifications = [
    {
      id: "lote", title: "Sistemas por Lotes", color: "#6366f1", icon: <span style={{ fontSize: "2rem" }}>📦</span>,
      shortDesc: "Procesan trabajos sin interacción del usuario, uno tras otro.",
      content: <><p>Los <strong>sistemas por lotes</strong> agrupan tareas similares y las ejecutan secuencialmente sin intervención del usuario. Fueron los primeros SO.</p><p style={{ marginTop: "1rem" }}>Ejemplos: IBM OS/360. Se usan aún en bancos para procesamiento nocturno de transacciones.</p></>
    },
    {
      id: "tiempo-real", title: "Tiempo Real (RTOS)", color: "#ef4444", icon: <span style={{ fontSize: "2rem" }}>⏱️</span>,
      shortDesc: "Garantizan respuestas en tiempos exactos y predecibles.",
      content: <><p>Un <strong>RTOS</strong> garantiza que las tareas críticas se completen dentro de plazos estrictos. Un fallo temporal puede ser catastrófico.</p><p style={{ marginTop: "1rem" }}>Ejemplos: VxWorks, FreeRTOS. Usos: control de tráfico aéreo, equipos médicos, sistemas de misiles.</p></>
    },
    {
      id: "red", title: "Sistemas de Red", color: "#0ea5e9", icon: <span style={{ fontSize: "2rem" }}>🌐</span>,
      shortDesc: "Permiten compartir recursos entre máquinas en red.",
      content: <><p>Un <strong>SO de red</strong> permite que las máquinas compartan archivos, impresoras y otros recursos. El usuario sabe que está accediendo a recursos remotos.</p><p style={{ marginTop: "1rem" }}>Ejemplos: Windows Server, Linux con Samba/NFS.</p></>
    },
    {
      id: "distribuido", title: "Distribuidos", color: "#16a34a", icon: <span style={{ fontSize: "2rem" }}>🔗</span>,
      shortDesc: "Múltiples máquinas actúan como una sola de forma transparente.",
      content: <><p>Un <strong>SO distribuido</strong> hace que una colección de computadoras aparezca ante el usuario como un único sistema coherente. La distribución es transparente.</p><p style={{ marginTop: "1rem" }}>Ejemplos: Amoeba, Google&apos;s Borg. Base de los sistemas cloud modernos.</p></>
    },
    {
      id: "movil", title: "Sistemas Móviles", color: "#f59e0b", icon: <span style={{ fontSize: "2rem" }}>📱</span>,
      shortDesc: "Optimizados para hardware limitado con interfaz táctil.",
      content: <><p>Los <strong>SO móviles</strong> gestionan dispositivos con restricciones de batería, CPU y RAM. Priorizan la interfaz táctil y la conectividad.</p><p style={{ marginTop: "1rem" }}>Ejemplos: Android (kernel Linux modificado), iOS (basado en Darwin/XNU).</p><DidYouKnow>La primera versión del Kernel Linux liberada por Linus Torvalds en 1991 tenía apenas <strong>10,239 líneas de código</strong>. Hoy, el kernel de Android cuenta con más de <strong>30 millones</strong> de líneas.</DidYouKnow></>
    },
  ];
  const activeData = classifications.find(c => c.id === activeModal);

  return (
    <section className="chapter-section animate-fadeInUp">
      <ChapterHeader num="1.2" title="Clasificación de los Sistemas Operativos" subtitle="Tipos de SO según su arquitectura, propósito y entorno de uso." />

      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1.05rem" }}>Selecciona una categoría para ver la información detallada.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {classifications.map((item) => (
          <div key={item.id} onClick={() => setActiveModal(item.id)} className="hover:-translate-y-1"
            style={{ padding: "1.8rem", background: "var(--bg-card)", borderRadius: "12px", borderLeft: `4px solid ${item.color}`, boxShadow: "0 4px 15px rgba(0,0,0,0.04)", transition: "all 0.3s ease", cursor: "pointer" }}>
            <div style={{ color: item.color, marginBottom: "1rem" }}>{item.icon}</div>
            <h4 style={{ fontWeight: 800, marginBottom: "0.5rem", fontSize: "1.15rem", color: "var(--text-primary)" }}>{item.title}</h4>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{item.shortDesc}</p>
            <div style={{ marginTop: "1rem", color: item.color, fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>Leer más <span>→</span></div>
          </div>
        ))}
      </div>

      {activeModal && activeData && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "1rem" }} onClick={() => setActiveModal(null)}>
          <div style={{ background: "var(--bg-secondary)", borderRadius: "16px", padding: "2.5rem", maxWidth: "700px", width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", position: "relative" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(0,0,0,0.05)", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>✕</button>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: activeData.color, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>{activeData.title}</h3>
            <div style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8 }}>{activeData.content}</div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Chapter1_3() {
  return (
    <section className="chapter-section animate-fadeInUp">
      <ChapterHeader num="1.3" title="Proceso de Arranque" subtitle="Secuencia crítica de 6 pasos que inicializa el hardware y carga el SO." />

      <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.85, marginBottom: "2.5rem" }}>
        El arranque o <em>booting</em> es la secuencia crítica que inicializa el hardware y carga el Sistema Operativo en la memoria principal. A continuación, se detalla el flujo de los 6 pasos clave:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {[
          { n: "1°", color: "#ef4444", icon: "⚡", title: "Suministro de corriente", desc: "El hardware recibe energía, se estabiliza la tensión y la CPU se inicializa enviando una señal de reset." },
          { n: "2°", color: "#f97316", icon: "⚙️", title: "La BIOS / UEFI", desc: "Se ejecuta el firmware básico almacenado en la memoria ROM de la placa base para reconocer los componentes." },
          { n: "3°", color: "#f59e0b", icon: "🔍", title: "El POST", desc: "El Power-On Self Test verifica que el hardware crítico (RAM, video, teclado, discos) funcione correctamente." },
          { n: "4°", color: "#10b981", icon: "💽", title: "Búsqueda del MBR", desc: "La BIOS busca el sector de arranque (Master Boot Record o EFI) en el dispositivo de almacenamiento configurado." },
          { n: "5°", color: "#3b82f6", icon: "🔀", title: "Cargar Boot Manager", desc: "Se carga el gestor de arranque en memoria y cede el control (ej. GRUB) para seleccionar qué sistema iniciar." },
          { n: "6°", color: "var(--accent-primary)", icon: "🚀", title: "Carga del S.O.", desc: "El Kernel del SO se carga en memoria RAM, inicializa sus propios controladores y transfiere el control a la interfaz gráfica." },
        ].map(step => (
          <div key={step.n} style={{ position: "relative", padding: "1.8rem", background: "var(--bg-card)", borderRadius: "12px", borderTop: `4px solid ${step.color}`, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <div style={{ position: "absolute", top: "-15px", left: "15px", background: step.color, color: "white", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{step.n}</div>
            <div style={{ fontSize: "2rem", marginBottom: "1rem", color: step.color }}>{step.icon}</div>
            <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{step.title}</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




export function Chapter2_1() {
  return (
    <section id="procesos-conceptos" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.1" title="Introducción a procesos" subtitle="Todos los sistemas de multiprogramación están construidos en torno al concepto de proceso. De manera simplificada, en un instante determinado un proceso puede encontrarse ejecutándose en el procesador o fuera de él a la espera de ser ejecutado. Bajo esta visión básica, un proceso puede estar en uno de dos estados: Ejecución o No ejecución." />

      <div className="card" style={{ marginBottom: "3rem", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: "var(--accent-primary)" }}>●</span> Administración y Estados
        </h3>
        <SectionText>
          Para poder administrar los procesos, el sistema operativo debe identificar a cada uno de ellos y mantener información asociada, como su estado actual, su ubicación en memoria y otros datos de control. Los procesos que no se encuentran en ejecución deben almacenarse en alguna estructura, generalmente colas, donde esperan su turno para ser atendidos por el procesador.
        </SectionText>
        <SectionText>
          Si todos los procesos que no están ejecutándose estuvieran siempre listos para hacerlo, una única cola de espera sería suficiente. Sin embargo, esta situación no refleja el comportamiento real de un sistema, ya que algunos procesos se encuentran listos para ejecutarse, mientras que otros están bloqueados esperando la finalización de una operación de entrada/salida u otro evento. Por esta razón, el estado de No ejecución se puede dividir en dos estados diferenciados: Listo y Bloqueado. Al considerar esta división, y sumando los estados de creación y finalización, se obtiene un modelo de cinco estados.
        </SectionText>
      </div>

      <ProcessStateDiagram />

      <InfoCard title="Modelo de Cinco Estados" items={[
        "Nuevo: Proceso que acaba de ser creado, pero que aún no ha sido admitido por el sistema en el conjunto de procesos ejecutables.",
        "Listo: Proceso que se encuentra preparado para ejecutar y que espera la asignación del procesador.",
        "Ejecutado: Proceso que está siendo ejecutado actualmente por la CPU.",
        "Bloqueado: Proceso que no puede continuar su ejecución hasta que ocurra un evento específico, como la finalización de una operación de E/S. Un proceso puede pasar voluntariamente a este estado (por ejemplo, mediante sleep).",
        "Hecho: Proceso que ha sido retirado del conjunto de procesos ejecutables, ya sea porque finalizó su ejecución de forma normal o porque fue abortado."
      ]} />

      <div className="card" style={{ marginBottom: "3rem", padding: "2rem", borderRadius: "16px", background: "linear-gradient(135deg, rgba(155, 28, 46, 0.04) 0%, rgba(155, 28, 46, 0.01) 100%)", borderLeft: "4px solid var(--accent-primary)" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Estados Específicos en UNIX</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          En los sistemas UNIX, el diagrama de estados es más complejo debido a la distinción entre modos de ejecución y a la existencia de estados adicionales. Un proceso puede encontrarse en:
        </p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", margin: 0, padding: 0 }}>
          {[
            "Ejecutándose en modo usuario: cuando el proceso ejecuta código de aplicación.",
            "Ejecutándose en modo kernel: cuando el proceso atiende una llamada al sistema o interrupción.",
            "Listo para ejecutarse, pero no en ejecución: esperando a que el kernel le asigne el procesador.",
            "Dormido en memoria: cuando el proceso está bloqueado y cargado en memoria, a la espera de un evento.",
            "Listo para ejecutarse, pero suspendido: esperando a que el swapper lo cargue en memoria principal.",
            "En transición: proceso creado, pero aún no completamente preparado para ejecutar.",
            "Finalizando: cuando el proceso ejecuta la llamada al sistema exit.",
            "Zombi: proceso que ya ha terminado su ejecución, pero conserva una entrada en la tabla de procesos para que su padre recupere el código de salida y tiempos de ejecución."
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
              <span style={{ color: "var(--accent-primary)", marginTop: "2px" }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card" style={{ marginBottom: "3rem", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: "var(--accent-primary)" }}>●</span> Programa vs Proceso
        </h3>
        <SectionText>
          Un <strong style={{ color: "var(--accent-primary)" }}>programa</strong> es pasivo: un conjunto de instrucciones escritas en un archivo en el disco.
          En cambio, un <strong style={{ color: "var(--accent-primary)" }}>proceso</strong> es activo: es el programa cargado en la RAM, siendo ejecutado por la CPU y con recursos del sistema asignados a su disposición.
        </SectionText>
        <SectionText>
          El Sistema Operativo lleva la cuenta de todos los procesos mediante el <strong>PCB (Process Control Block)</strong>. En Linux, esta estructura se denomina <code style={{ background: "rgba(0,0,0,0.05)", padding: "0.2rem 0.4rem", borderRadius: "4px", fontSize: "0.9em" }}>task_struct</code>. El PCB almacena el estado actual del proceso, su ID único (PID), privilegios, y la información de la memoria que le ha sido asignada.
        </SectionText>

        <DidYouKnow>
          Un proceso <strong>Zombi</strong> no consume memoria ni CPU. Solo ocupa un espacio mínimo en la tabla de procesos del kernel esperando que su padre lea su estado de salida. Sin embargo, si un sistema genera miles de zombis, podría agotar los PIDs disponibles, impidiendo que se inicien nuevos programas.
        </DidYouKnow>
      </div>

      <InfoCard title="Segmentos de Memoria de un Proceso" items={[
        "Segmento de Texto: Código máquina puro e instrucciones.",
        "Segmento de Datos (Data / BSS): Variables globales y estáticas declaradas por el programador.",
        "Heap (Montículo): Memoria dinámica solicitada en tiempo de ejecución (malloc / free).",
        "Stack (Pila): Estructura LIFO que almacena variables locales, punteros de retorno de las funciones y parámetros pasados a estas."
      ]} />

      <MatchPairs
        title="Repaso: Transiciones de Estado"
        pairs={[
          { id: 1, left: "Nuevo → Listo", right: "Proceso creado", hint: "Es el momento del 'nacimiento' del proceso." },
          { id: 2, left: "Listo → Ejecutado", right: "Seleccionado para ejecución", hint: "El planificador (scheduler) le otorga la CPU." },
          { id: 3, left: "Ejecutado → Listo", right: "Tiempo terminado", hint: "Ocurre en sistemas de tiempo compartido por un timer." },
          { id: 4, left: "Ejecutado → Bloqueado", right: "Solicitud de E/S", hint: "El proceso necesita esperar algo externo (ej. teclado)." },
          { id: 5, left: "Bloqueado → Listo", right: "E/S completa", hint: "El recurso solicitado ya está disponible." },
          { id: 6, left: "Ejecutado → Hecho", right: "Terminación normal/anormal", hint: "El proceso ha llegado a su fin (exit)." },
        ]}
      />

      <Crossword
        title="Crucigrama: Gestión de Procesos"
        size={10}
        clues={[
          { number: 1, direction: "across", row: 8, col: 3, answer: "PCB", clue: "Bloque de Control de Proceso (siglas).", hint: "Process Control Block." },
          { number: 2, direction: "across", row: 3, col: 2, answer: "ZOMBI", clue: "Proceso que terminó pero sigue en la tabla.", hint: "No ha sido 'enterrado' por su padre con wait()." },
          { number: 3, direction: "down", row: 4, col: 7, answer: "READY", clue: "Estado en que el proceso espera la CPU.", hint: "Listo en inglés." },
          { number: 4, direction: "down", row: 2, col: 3, answer: "FORK", clue: "Llamada al sistema para crear procesos.", hint: "Suena a 'tenedor' en inglés." },
          { number: 5, direction: "across", row: 5, col: 3, answer: "KERNEL", clue: "Núcleo del sistema operativo.", hint: "El corazón del SO." },
          { number: 6, direction: "down", row: 5, col: 4, answer: "EXEC", clue: "Llamada para cargar un nuevo programa.", hint: "Abreviatura de ejecutar en inglés." }
        ]}
      />

    </section>
  );
}

export function Chapter2_2() {
  const codeEjemplo1 = `<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">int</span> x = <span class="code-num">0</span>;
    <span class="code-fn">fork</span>();
    x = <span class="code-num">1</span>;
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const codeEjemplo2 = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">int</span> x = <span class="code-num">0</span>;
    <span class="code-type">pid_t</span> pid;
    
    pid = <span class="code-fn">fork</span>();
    
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código ejecutado por el proceso hijo */</span>
        x = <span class="code-num">5</span>;
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo: PID=%ld, x=%d\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), x);
    } <span class="code-kw">else</span> {
        <span class="code-cmt">/* Código ejecutado por el proceso padre */</span>
        x = <span class="code-num">10</span>;
        <span class="code-fn">printf</span>(<span class="code-str">"Padre: PID=%ld, x=%d\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), x);
    }
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const outputEjemplo2 = `Padre: PID=1234, x=10\nHijo: PID=1235, x=5`;

  const codeIdentificar = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    hijo = <span class="code-fn">fork</span>();
    
    <span class="code-kw">if</span> (hijo == <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código ejecutado por el proceso hijo */</span>
        <span class="code-fn">fprintf</span>(stdout, <span class="code-str">"Soy el hijo, PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
    } <span class="code-kw">else if</span> (hijo &gt; <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código ejecutado por el proceso padre */</span>
        <span class="code-fn">fprintf</span>(stdout, <span class="code-str">"Soy el padre, PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
    } <span class="code-kw">else</span> {
        <span class="code-cmt">/* Error al crear el proceso */</span>
        <span class="code-fn">perror</span>(<span class="code-str">"fork"</span>);
        <span class="code-kw">return</span> EXIT_FAILURE;
    }
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const codeCadena = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> n = <span class="code-num">5</span>;
    
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; n; i++) {
        hijo = <span class="code-fn">fork</span>();
        <span class="code-kw">if</span> (hijo &gt; <span class="code-num">0</span>) {
            <span class="code-cmt">/* El padre deja de crear más procesos */</span>
            <span class="code-kw">break</span>;
        }
        <span class="code-fn">fprintf</span>(stderr,<span class="code-str">"Proceso PID=%ld, PPID=%ld\\n"</span>,(<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), (<span class="code-type">long</span>)<span class="code-fn">getppid</span>());
    }
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const codeAbanico = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> n = <span class="code-num">5</span>;
    
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; n; i++) {
        hijo = <span class="code-fn">fork</span>();
        <span class="code-kw">if</span> (hijo == <span class="code-num">0</span>) {
            <span class="code-cmt">/* El hijo no crea más procesos */</span>
            <span class="code-kw">break</span>;
        }
    }
    
    <span class="code-fn">fprintf</span>(stderr, <span class="code-str">"Proceso PID=%ld, PPID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), (<span class="code-type">long</span>)<span class="code-fn">getppid</span>());
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const outputIdentificar = `Soy el padre, PID=2000
Soy el hijo, PID=2001`;

  const outputCadena = `Proceso PID=2001, PPID=2000
Proceso PID=2002, PPID=2001
Proceso PID=2003, PPID=2002
Proceso PID=2004, PPID=2003
Proceso PID=2005, PPID=2004`;

  const outputAbanico = `Proceso PID=2001, PPID=2000
Proceso PID=2002, PPID=2000
Proceso PID=2003, PPID=2000
Proceso PID=2004, PPID=2000
Proceso PID=2005, PPID=2000
Proceso PID=2000, PPID=1999`;

  return (
    <section id="crear-procesos" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.2" title="Sistema de llamado para crear procesos" subtitle="Creación de procesos, fork() y mecanismo de Copy-On-Write." />

      <SectionText>
        Los procesos pueden ser creados por el sistema operativo desde el momento en que este se inicia, o conforme surge la necesidad de realizar distintas tareas internas. Por otra parte, el usuario también puede crear procesos, ya sea de forma directa mediante la ejecución de programas, o de forma indirecta cuando una aplicación en uso genera nuevos procesos durante su ejecución.
      </SectionText>

      <SectionText>
        En los sistemas GNU/Linux, la creación de procesos se realiza principalmente a través de la llamada al sistema <code style={{ background: "rgba(0,0,0,0.05)", padding: "0.2rem 0.4rem", borderRadius: "4px", fontSize: "0.9em" }}>fork()</code>. Esta llamada permite que un proceso existente, denominado <strong>proceso padre</strong>, cree un nuevo proceso llamado <strong>proceso hijo</strong>.
      </SectionText>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(155, 28, 46, 0.04) 0%, rgba(155, 28, 46, 0.01) 100%)", borderLeft: "4px solid var(--accent-primary)", marginBottom: "3rem", padding: "1.8rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
        <h4 style={{ fontWeight: 800, marginBottom: "1rem", fontSize: "1.15rem", color: "var(--text-primary)" }}>Copy-on-write (COW)</h4>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
          Tras la ejecución de fork(), el sistema operativo crea un nuevo descriptor de proceso y establece una relación de parentesco. Desde el punto de vista lógico, el proceso hijo recibe una copia del espacio de direcciones del proceso padre. Sin embargo, en implementaciones modernas de GNU/Linux esta copia se realiza utilizando la técnica de <strong>copy-on-write</strong>, lo que significa que las páginas de memoria no se duplican físicamente hasta que alguno de los procesos intenta modificarlas, optimizando así el uso de memoria y el rendimiento del sistema.
        </p>
        <DidYouKnow>
          La primera versión del Kernel Linux liberada por <strong>Linus Torvalds</strong> en 1991 tenía apenas <strong>10,239 líneas de código</strong>. Hoy en día, el kernel ha crecido exponencialmente superando las 30 millones de líneas, siendo el proyecto de software colaborativo más grande del mundo.
        </DidYouKnow>
      </div>

      <SectionText>
        Una característica fundamental de <code>fork()</code> es que ambos procesos continúan su ejecución a partir de la instrucción siguiente a la llamada, pero con diferentes valores de retorno, lo que permite distinguirlos dentro del programa. El prototipo de la llamada al sistema fork() es el siguiente:
      </SectionText>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;sys/types.h&gt;</div>
        <div style={{ color: "#569cd6", marginBottom: "1rem" }}>#include &lt;unistd.h&gt;</div>
        <div><span style={{ color: "#4ec9b0" }}>pid_t</span> <span style={{ color: "#dcdcaa" }}>fork</span>(<span style={{ color: "#569cd6" }}>void</span>);</div>
      </div>

      <SectionText>
        La creación de dos procesos que ejecuten exactamente el mismo código y sigan el mismo flujo de ejecución no resulta especialmente útil en la práctica. Por esta razón, el valor devuelto por la llamada al sistema fork() constituye el mecanismo fundamental que permite diferenciar el comportamiento del proceso padre y del proceso hijo.
      </SectionText>

      <ul style={{ marginBottom: "3rem", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", paddingLeft: "1.5rem" }}>
        <li style={{ marginBottom: "0.5rem" }}>En el proceso <strong>hijo</strong>, el valor devuelto es <code style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>0</code>.</li>
        <li style={{ marginBottom: "0.5rem" }}>En el proceso <strong>padre</strong>, el valor devuelto es un número entero mayor que cero, que corresponde al identificador del proceso hijo, conocido como <code style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>PID</code> (Process Identifier).</li>
        <li style={{ marginBottom: "0.5rem" }}>En caso de <strong>error</strong>, fork() devuelve <code style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>-1</code>, y no se crea ningún proceso hijo.</li>
      </ul>

      <SectionText>
        Este mecanismo es esencial para la programación concurrente, ya que permite controlar el flujo de ejecución y definir claramente las responsabilidades. En los sistemas UNIX, los PID se asignan de forma incremental hasta alcanzar un valor máximo. En GNU/Linux, este valor se consulta en <code>/proc/sys/kernel/pid_max</code>, que en 64 bits suele ser <strong>4,194,303</strong>, permitiendo millones de procesos simultáneos.
      </SectionText>

      <ForkDiagram />

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Ejemplo 1: Asignación tras fork()</h3>
      <SectionText>
        En el siguiente fragmento, tanto el padre como el hijo ejecutan la instrucción de asignación <code>x = 1</code> después del regreso de la llamada a fork().
      </SectionText>

      <CodeBlock title="ejemplo_asignacion.c" code={codeEjemplo1} explanation="Tras la ejecución, existen dos procesos independientes que ejecutan la asignación x = 1. Aunque el código es idéntico, cada proceso cuenta con su propio espacio de direcciones, por lo que la variable x en el padre es distinta de la variable x en el hijo." />

      <InfoCard title="Atributos Heredados y No Heredados" items={[
        "Heredados: El entorno de ejecución, privilegios y credenciales, descriptores de archivos y dispositivos abiertos, y la prioridad y atributos de planificación.",
        "No Heredados: El hijo recibe un PID distinto, sus tiempos de uso de CPU inician en cero, no hereda bloqueos del padre, no hereda alarmas establecidas por el padre, y comienza sin señales pendientes."
      ]} />

      <SectionText>
        Aunque el proceso hijo hereda ciertos parámetros, debe competir por el tiempo de CPU con el resto de los procesos del sistema, incluido su propio proceso padre.
      </SectionText>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Ejemplo 2: Modificación condicional (COW)</h3>
      <SectionText>
        A continuación se presenta una extensión del ejemplo anterior que permite relacionar explícitamente fork() con el mecanismo de copy-on-write, utilizando el valor de retorno para modificar la variable x de manera distinta, provocando la copia física de la página de memoria.
      </SectionText>

      <CodeBlock title="ejemplo_cow.c" code={codeEjemplo2} output={outputEjemplo2} explanation="Este ejemplo ilustra cómo fork() es eficiente en términos de memoria, ya que evita copias innecesarias hasta que realmente se produce una escritura." />
    </section>
  );
}

export function Chapter2_3() {
  const codeIdentificar = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    hijo = <span class="code-fn">fork</span>();
    
    <span class="code-kw">if</span> (hijo == <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código ejecutado por el proceso hijo */</span>
        <span class="code-fn">fprintf</span>(stdout, <span class="code-str">"Soy el hijo, PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
    } <span class="code-kw">else if</span> (hijo &gt; <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código ejecutado por el proceso padre */</span>
        <span class="code-fn">fprintf</span>(stdout, <span class="code-str">"Soy el padre, PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
    } <span class="code-kw">else</span> {
        <span class="code-cmt">/* Error al crear el proceso */</span>
        <span class="code-fn">perror</span>(<span class="code-str">"fork"</span>);
        <span class="code-kw">return</span> EXIT_FAILURE;
    }
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const codeCadena = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> n = <span class="code-num">5</span>;
    
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; n; i++) {
        hijo = <span class="code-fn">fork</span>();
        <span class="code-kw">if</span> (hijo &gt; <span class="code-num">0</span>) {
            <span class="code-cmt">/* El padre deja de crear más procesos */</span>
            <span class="code-kw">break</span>;
        }
        <span class="code-fn">fprintf</span>(stderr,<span class="code-str">"Proceso PID=%ld, PPID=%ld\\n"</span>,(<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), (<span class="code-type">long</span>)<span class="code-fn">getppid</span>());
    }
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const codeAbanico = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> n = <span class="code-num">5</span>;
    
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; n; i++) {
        hijo = <span class="code-fn">fork</span>();
        <span class="code-kw">if</span> (hijo == <span class="code-num">0</span>) {
            <span class="code-cmt">/* El hijo no crea más procesos */</span>
            <span class="code-kw">break</span>;
        }
    }
    
    <span class="code-fn">fprintf</span>(stderr, <span class="code-str">"Proceso PID=%ld, PPID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>(), (<span class="code-type">long</span>)<span class="code-fn">getppid</span>());
    
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const outputIdentificar = `Soy el padre, PID=2000
Soy el hijo, PID=2001`;

  const outputCadena = `Proceso PID=2001, PPID=2000
Proceso PID=2002, PPID=2001
Proceso PID=2003, PPID=2002
Proceso PID=2004, PPID=2003
Proceso PID=2005, PPID=2004`;

  const outputAbanico = `Proceso PID=2001, PPID=2000
Proceso PID=2002, PPID=2000
Proceso PID=2003, PPID=2000
Proceso PID=2004, PPID=2000
Proceso PID=2005, PPID=2000
Proceso PID=2000, PPID=1999`;

  return (
    <section id="identificar-procesos" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.4" title="Sistema de llamado para identificar procesos" subtitle="Gestión de PIDs, PPIDs y Jerarquía de Procesos." />
      <SectionText>
        Todo proceso en un sistema operativo tipo UNIX tiene asociado un identificador único denominado <strong>PID (Process Identifier)</strong>, el cual es un número entero positivo asignado por el kernel. Asimismo, cada proceso mantiene una referencia al proceso que lo creó, conocido como proceso padre, cuyo identificador es denominado <strong>PPID (Parent Process Identifier)</strong>. Para obtener estos valores, el sistema proporciona las siguientes llamadas:
      </SectionText>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace" }}>
          <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// Obtener PID</div>
          <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;sys/types.h&gt;</div>
          <div style={{ color: "#569cd6", marginBottom: "1rem" }}>#include &lt;unistd.h&gt;</div>
          <div><span style={{ color: "#4ec9b0" }}>pid_t</span> <span style={{ color: "#dcdcaa" }}>getpid</span>(<span style={{ color: "#569cd6" }}>void</span>);</div>
        </div>

        <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace" }}>
          <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// Obtener PPID</div>
          <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;sys/types.h&gt;</div>
          <div style={{ color: "#569cd6", marginBottom: "1rem" }}>#include &lt;unistd.h&gt;</div>
          <div><span style={{ color: "#4ec9b0" }}>pid_t</span> <span style={{ color: "#dcdcaa" }}>getppid</span>(<span style={{ color: "#569cd6" }}>void</span>);</div>
        </div>
      </div>

      <SectionText>
        El tipo de dato <code>pid_t</code> representa el identificador de un proceso. En la biblioteca GNU C, <code>pid_t</code> es un tipo entero con signo, cuyo tamaño depende de la arquitectura del sistema. La llamada <code>getpid()</code> devuelve el identificador del proceso que la invoca, mientras que <code>getppid()</code> retorna el identificador del proceso padre del proceso actual.
      </SectionText>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "2rem" }}>Grupos de Procesos y PGID</h3>
      <SectionText>
        Además de la relación padre–hijo, los procesos pueden organizarse en <strong>grupos de procesos</strong>, los cuales permiten al sistema operativo gestionar de forma conjunta conjuntos de procesos relacionados, por ejemplo, aquellos asociados a una misma sesión o terminal. Para identificar el grupo al que pertenece un proceso, se utiliza la llamada <code>pid_t getpgrp(void);</code> (devuelve el PGID). Para establecer un proceso como líder de un nuevo grupo, se utiliza <code>pid_t setpgrp(void);</code>, que internamente establece el PID del proceso como su PGID.
      </SectionText>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(245, 158, 11, 0.01) 100%)", borderLeft: "4px solid #f59e0b", marginBottom: "3rem", padding: "1.8rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
        <h4 style={{ fontWeight: 800, marginBottom: "0.5rem", fontSize: "1.1rem", color: "#92400e" }}>Procesos Huérfanos</h4>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
          Debe considerarse que si un proceso padre termina su ejecución antes que sus procesos hijos, estos no quedan sin control. En tal caso, el kernel reasigna automáticamente a los procesos huérfanos a un proceso especial con PID 1, que históricamente fue <code>init</code> y que en sistemas GNU/Linux modernos suele corresponder a <code>systemd</code>. Este proceso se encarga de adoptar a los hijos y recoger su estado de terminación.
        </p>
      </div>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "2rem" }}>Ejemplo 1: Uso de getpid() e impresión a stdout</h3>
      <SectionText>
        Tras la ejecución de la llamada al sistema fork(), tanto el proceso padre como el proceso hijo imprimen sus respectivos identificadores de proceso utilizando la salida estándar (<code>stdout</code>).
      </SectionText>
      <CodeBlock title="identificadores.c" code={codeIdentificar} output={outputIdentificar} explanation="Ambos procesos ejecutan fprintf() hacia stdout imprimiendo su propio PID. Si ejecutas este código, verás impresiones independientes, pero compartiendo la consola de salida." />

      <InfoCard title="Descriptores de Archivo Estándar" items={[
        "Entrada estándar (stdin): descriptor 0, asociado típicamente al teclado (STDIN_FILENO).",
        "Salida estándar (stdout): descriptor 1, asociado normalmente a la pantalla (STDOUT_FILENO).",
        "Error estándar (stderr): descriptor 2, asociado también a la pantalla, pero separado de la salida estándar (STDERR_FILENO)."
      ]} />

      <SectionText>
        Dichas constantes se encuentran definidas en <code>&lt;unistd.h&gt;</code>. Cuando se ejecuta <code>fork()</code>, el proceso hijo hereda los descriptores de archivo abiertos del padre, por lo que ambos procesos escriben inicialmente en el mismo destino de salida estándar.
      </SectionText>

      <div style={{ marginTop: "3.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Ejemplo 2: Cadena Lineal de Procesos</h3>
        <SectionText>
          En una cadena de procesos, cada proceso crea un solo hijo, y el padre deja de crear nuevos procesos. El resultado es una estructura lineal: <strong>P0 → P1 → P2 → P3 → ... → Pn</strong>
        </SectionText>
        <CodeBlock title="cadena_lineal.c" code={codeCadena} output={outputCadena} explanation="En cada iteración, solo el proceso hijo continúa el ciclo. El padre sale del ciclo con el 'break'. Esto genera una cadena lineal de procesos donde cada proceso tiene exactamente un hijo, excepto el último." />
      </div>

      <div style={{ marginTop: "3.5rem", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Ejemplo 3: Abanico (Estrella) de Procesos</h3>
        <SectionText>
          En un abanico de procesos, un único proceso padre crea varios hijos, pero los hijos no crean más procesos. El padre crea a <strong>P1, P2, P3... Pn</strong>.
        </SectionText>
        <CodeBlock title="abanico.c" code={codeAbanico} output={outputAbanico} explanation="Solo el proceso padre ejecuta el ciclo completo. Cada iteración crea un hijo nuevo. Cada hijo ejecuta el 'break' y no genera más procesos, obteniéndose una estructura en forma de abanico." />
      </div>
    </section>
  );
}

export function Chapter2_5() {
  return (
    <section id="wait" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.5" title="Sistema de llamada wait()" subtitle="Sincronización padre-hijo y gestión de estado de terminación." />

      <SectionText>
        ¿Qué sucede con el proceso padre después de crear un proceso hijo? Tras la ejecución de la llamada al sistema <code>fork()</code>, tanto el proceso padre como el proceso hijo continúan su ejecución de manera concurrente a partir de la instrucción siguiente a dicha llamada. Como consecuencia, el proceso padre puede terminar antes que el hijo, o bien el hijo puede finalizar primero.
      </SectionText>

      <SectionText>
        Si el proceso padre desea esperar a que uno de sus procesos hijos termine, debe invocar la llamada <code>wait()</code> o, de manera más general, <code>waitpid()</code>. Estas llamadas permiten al sistema operativo notificar al padre la finalización de sus hijos y recuperar su estado de terminación, evitando así la aparición de <strong>procesos zombi</strong>.
      </SectionText>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// PROTOTIPOS DE LAS FUNCIONES</div>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;sys/types.h&gt;</div>
        <div style={{ color: "#569cd6", marginBottom: "1rem" }}>#include &lt;sys/wait.h&gt;</div>
        <div style={{ marginBottom: "0.5rem" }}><span style={{ color: "#4ec9b0" }}>pid_t</span> <span style={{ color: "#dcdcaa" }}>wait</span>(<span style={{ color: "#569cd6" }}>int</span> *stat_loc);</div>
        <div><span style={{ color: "#4ec9b0" }}>pid_t</span> <span style={{ color: "#dcdcaa" }}>waitpid</span>(<span style={{ color: "#4ec9b0" }}>pid_t</span> pid, <span style={{ color: "#569cd6" }}>int</span> *wstatus, <span style={{ color: "#569cd6" }}>int</span> options);</div>
      </div>

      <div className="card" style={{ marginBottom: "3rem", padding: "2.5rem", borderRadius: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
        <h4 style={{ fontWeight: 800, marginBottom: "1.2rem", fontSize: "1.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{ color: "var(--accent-primary)" }}>⏳</span> Comportamiento de wait()
        </h4>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          La llamada <code>wait()</code> suspende la ejecución del proceso padre hasta que se cumple una de estas condiciones:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            "Un proceso hijo termina su ejecución de forma normal o anormal.",
            "Un proceso hijo es detenido por una señal de control.",
            "El proceso llamador recibe una señal que interrumpe la espera."
          ].map((text, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "10px", borderLeft: "3px solid var(--accent-primary)" }}>
              <span style={{ fontSize: "1.2rem" }}>✅</span>
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic", padding: "1rem", borderTop: "1px solid var(--border-color)", marginTop: "1rem" }}>
          <strong>Nota:</strong> Si el proceso no tiene hijos, retorna <code>-1</code> de inmediato. Si un hijo ya es <em>zombi</em>, la llamada libera sus recursos y retorna su PID al instante.
        </p>
      </div>

      <SectionText>
        Si wait() retorna debido a la terminación o detención de un hijo, el valor de retorno es positivo y corresponde al <strong>PID del proceso hijo</strong>. En caso de error, retorna <strong>-1</strong> y se establece un valor apropiado en la variable global <code>errno</code>. Algunos valores relevantes son:
      </SectionText>

      <ul style={{ marginBottom: "3rem", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", paddingLeft: "1.5rem" }}>
        <li style={{ marginBottom: "0.5rem" }}><code style={{ color: "#ef4444", fontWeight: "bold" }}>ECHILD</code>: El proceso no tiene hijos a los cuales esperar.</li>
        <li style={{ marginBottom: "0.5rem" }}><code style={{ color: "#f59e0b", fontWeight: "bold" }}>EINTR</code>: La llamada fue interrumpida por la recepción de una señal.</li>
      </ul>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Análisis del estado de terminación</h3>
      <SectionText>
        El parámetro <code>stat_loc</code> es un apuntador a una variable entera donde el kernel almacena información sobre el estado de terminación del proceso hijo. Este valor debe analizarse utilizando los <strong>macros</strong> definidos en <code>&lt;sys/wait.h&gt;</code>:
      </SectionText>

      <InfoCard title="Macros de Terminación" items={[
        "WIFEXITED(*stat_loc): Evalúa a verdadero si el proceso hijo terminó de forma normal.",
        "WEXITSTATUS(*stat_loc): Si el hijo terminó normalmente, obtiene los 8 bits menos significativos del valor pasado a exit(), _exit() o retornado desde main().",
        "WIFSIGNALED(*stat_loc): Evalúa a verdadero si el proceso hijo terminó debido a una señal no capturada.",
        "WTERMSIG(*stat_loc): Si el proceso hijo terminó por una señal, obtiene el número de dicha señal."
      ]} />

      <div id="waitpid" style={{ marginTop: "3rem", marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem", borderBottom: "2px solid rgba(155, 28, 46, 0.1)", paddingBottom: "0.5rem", display: "inline-block" }}>2.5.1 Uso de waitpid()</h3>
        <SectionText>
          Cuando se requiere esperar por un proceso hijo específico, o se necesita un control más fino del comportamiento de espera, se debe utilizar la función <code>waitpid()</code>. Esta llamada suspende la ejecución del proceso actual hasta que el proceso hijo especificado finaliza o hasta que ocurre un evento controlado por las opciones proporcionadas.
        </SectionText>

        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>El parámetro pid:</h4>
        <ul style={{ marginBottom: "2rem", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.05rem", paddingLeft: "1.5rem" }}>
          <li><code>-1</code>, espera por cualquier proceso hijo.</li>
          <li><code>&gt; 0</code>, espera por el hijo cuyo PID sea igual a pid.</li>
          <li><code>0</code>, espera por cualquier hijo cuyo grupo de procesos (PGID) sea igual al del proceso llamador.</li>
          <li><code>&lt; 0</code>, espera por cualquier hijo cuyo PGID sea igual al valor absoluto de pid.</li>
        </ul>

        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>El parámetro options (Banderas):</h4>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, margin: "0 0 1rem 0" }}>El parámetro *wstatus cumple la misma función que stat_loc en wait(). El parámetro options permite modificar el comportamiento de la llamada mediante una combinación de las siguientes banderas:</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { name: "WEXITED", desc: "Espera por hijos que hayan terminado." },
            { name: "WSTOPPED", desc: "Espera por hijos que hayan sido detenidos por una señal." },
            { name: "WNOHANG", desc: "Retorna inmediatamente si ningún hijo ha terminado (No bloqueante)." },
            { name: "WNOWAIT", desc: "No elimina al hijo de la tabla de procesos." },
            { name: "WUNTRACED", desc: "Retorna si un hijo se ha detenido." },
            { name: "WCONTINUED", desc: "Retorna si un hijo ha reanudado su ejecución tras recibir SIGCONT." }
          ].map(opt => (
            <div key={opt.name} style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", borderLeft: "3px solid var(--accent-primary)" }}>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>{opt.name}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{opt.desc}</div>
            </div>
          ))}
        </div>

        <SectionText>
          Las banderas WUNTRACED y WCONTINUED solo tienen efecto si la opción <code>SA_NOCLDSTOP</code> no ha sido establecida para la señal SIGCHLD.
        </SectionText>

        <div className="card" style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%)", borderLeft: "4px solid #10b981", marginBottom: "3rem", padding: "1.8rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
          <h4 style={{ fontWeight: 800, marginBottom: "0.5rem", fontSize: "1.1rem", color: "#065f46" }}>Importancia del uso correcto</h4>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
            El uso correcto de <code>wait()</code> y <code>waitpid()</code> es esencial para: sincronizar procesos padre e hijo, recuperar códigos de terminación, evitar la propagación de procesos zombi en la tabla del sistema, e implementar eficientemente servidores concurrentes y gestores de tareas.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <MiniQuiz
          title="Test: Análisis y Espera de Procesos"
          questions={[
            {
              question: "¿Qué sucede si se invoca wait() y el proceso no tiene procesos hijos?",
              options: [
                "Se bloquea infinitamente esperando a que se cree un proceso hijo.",
                "Retorna -1 inmediatamente y establece la variable errno en ECHILD.",
                "Retorna 0 y continúa la ejecución.",
                "Genera un error de segmentación (Segmentation fault)."
              ],
              correct: 1,
              explanation: "La llamada wait() verifica la existencia de hijos; si no hay procesos hijos (vivos ni zombis) a los cuales esperar, falla y retorna -1 inmediatamente indicando ECHILD.",
              hint: "Recuerda que el Kernel debe retornar un error si intentas esperar por algo que no existe."
            },
            {
              question: "¿Qué macro se utiliza para evaluar si un proceso hijo terminó de forma normal?",
              options: [
                "WEXITSTATUS",
                "WIFSIGNALED",
                "WTERMSIG",
                "WIFEXITED"
              ],
              correct: 3,
              explanation: "WIFEXITED evalúa a verdadero si la terminación fue voluntaria y normal. Si es verdadera, posteriormente se puede usar WEXITSTATUS para extraer el código de salida de 8 bits.",
              hint: "Busca la macro que suena a 'Si el proceso ha Salido' (If Exited)."
            },
            {
              question: "En la función waitpid(), ¿qué efecto tiene usar el valor -1 en el parámetro pid?",
              options: [
                "Espera a un hijo cuyo PID sea exactamente -1.",
                "Retorna un error si hay hijos huérfanos.",
                "Espera por cualquier proceso hijo, actuando igual que la función wait() clásica.",
                "Establece la opción WNOHANG para que sea no bloqueante."
              ],
              correct: 2,
              explanation: "Cuando el parámetro pid es -1, waitpid() se comporta de manera equivalente a wait(), esperando por la terminación de cualquier hijo sin importar su PID."
            }
          ]}
        />
      </div>


    </section>
  );
}

export function Chapter2_6() {
  const codeWait = `<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>()
{
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> estado;
    <span class="code-kw">if</span> ( (hijo=<span class="code-fn">fork</span>()) == <span class="code-num">-1</span>)
    {
        <span class="code-fn">perror</span> (<span class="code-str">"fallo el fork"</span>);
        <span class="code-fn">exit</span> (EXIT_FAILURE);
    }
    <span class="code-kw">else if</span> (hijo == <span class="code-num">0</span>)
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"soy el hijo con pid = %ld \\n"</span>, (<span class="code-type">long</span>) <span class="code-fn">getpid</span>());
    <span class="code-kw">else if</span> (<span class="code-fn">wait</span>(&amp;estado) != hijo)
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"una señal debio interrumpir la espera \\n"</span>);
    <span class="code-kw">else</span>
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"soy el padre con pid = %ld e hijo con pid = %ld\\n"</span>,
        (<span class="code-type">long</span>)<span class="code-fn">getpid</span>(),(<span class="code-type">long</span>)hijo);
    <span class="code-fn">exit</span>(EXIT_SUCCESS);
}`;

  const outputWait = `soy el hijo con pid = 3001 
soy el padre con pid = 3000 e hijo con pid = 3001`;

  const codeWaitPid = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">int</span> argc,<span class="code-type">char</span>*argv[])
{
    <span class="code-type">pid_t</span> hijo[<span class="code-num">5</span>];
    <span class="code-type">int</span> estado,i,j;
    <span class="code-type">long</span> factorial=<span class="code-num">1</span>;
    <span class="code-kw">for</span> (j=<span class="code-num">0</span>; j&lt;argc-<span class="code-num">1</span>; j++) {
        <span class="code-kw">if</span> ( (hijo[j]=<span class="code-fn">fork</span>())== <span class="code-num">-1</span>)
        {
            <span class="code-fn">perror</span> (<span class="code-str">"fallo el fork"</span>); <span class="code-fn">exit</span> (EXIT_FAILURE);
        }
        <span class="code-kw">else</span>
            <span class="code-kw">if</span> (hijo[j] == <span class="code-num">0</span>)
            {
                <span class="code-fn">fprintf</span> (stdout, <span class="code-str">"soy el hijo con pid = %ld \\n"</span>, (<span class="code-type">long</span>) <span class="code-fn">getpid</span>());
                <span class="code-kw">for</span> (i=<span class="code-fn">atol</span>(argv[j+<span class="code-num">1</span>]); i&gt;<span class="code-num">0</span>; i--) factorial=factorial*i;
                <span class="code-fn">fprintf</span>(stdout,<span class="code-str">"El factorial de 20 es:%ld\\n"</span>,factorial);
                <span class="code-fn">sleep</span>(<span class="code-num">2</span>);
                <span class="code-fn">exit</span>(EXIT_SUCCESS);
            }
    }<span class="code-cmt">//fin for</span>
    <span class="code-kw">for</span> (j=<span class="code-num">0</span>; j&lt;argc-<span class="code-num">1</span>; j++) {
        <span class="code-kw">if</span> ((<span class="code-fn">waitpid</span>(<span class="code-num">-1</span>,&amp;estado,<span class="code-num">0</span>)==<span class="code-num">-1</span>)) <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"una señal debio interrumpir la espera \\n"</span>);
        <span class="code-kw">else</span> <span class="code-fn">fprintf</span>(stdout,<span class="code-str">"el hijo:%d con pid %ld termino\\n"</span>,j,(<span class="code-type">long</span>)hijo[j]);
    }
    <span class="code-fn">exit</span>(EXIT_SUCCESS);
}`;

  const outputWaitPid = `$ ./ejemplo_waitpid 3
soy el hijo con pid = 3001 
El factorial de 20 es:6
el hijo:0 con pid 3001 termino`;

  return (
    <section id="exit" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.6" title="Sistema de llamada _exit() y exit()" subtitle="Gestión de finalización de procesos." />

      <SectionText>
        Como se ha visto, el proceso debe terminar de alguna manera, es decir, de forma normal o anormal. Lo que se desea es una terminación normal, en el mejor de los casos, para esto el proceso debe hacer un llamado al sistema <code>_exit()</code>.
      </SectionText>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// PROTOTIPO DE LA FUNCIÓN _exit()</div>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;unistd.h&gt;</div>
        <div><span style={{ color: "#569cd6" }}>void</span> <span style={{ color: "#dcdcaa" }}>_exit</span>(<span style={{ color: "#569cd6" }}>int</span> status);</div>
      </div>

      <SectionText>
        El argumento <code>status</code> define el estado de terminación del proceso, que está disponible para el padre de este proceso cuando invoca al llamado <code>wait()</code>. Aunque se define como un entero, <strong>solo los 8 bits finales del estado están disponibles</strong> para el padre. Por convención, un estado de terminación de <code>0</code> indica que un proceso se completó correctamente, y un valor distinto de cero indica que el proceso terminó con un código de error.
      </SectionText>

      <SectionText>
        Otra forma de terminar el programa es invocando a la función <code>exit()</code> que realiza varias acciones antes del llamado a <code>_exit()</code>. Esta función se encarga de retirar los recursos que está utilizando el proceso, así como dejarlo preparado para su eliminación, quitarlo del planificador e indicar su terminación a su padre por medio de la señal <code>SIGCHLD</code>.
      </SectionText>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(239, 68, 68, 0.01) 100%)", borderLeft: "4px solid #ef4444", marginBottom: "3rem", padding: "1.8rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
        <h4 style={{ fontWeight: 800, marginBottom: "0.5rem", fontSize: "1.1rem", color: "#b91c1c" }}>El estado Zombi y Procesos Huérfanos</h4>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
          Para pasar de un estado activo a la eliminación, se define un estado transitorio que en el sistema se le llama <strong>zombie</strong>. En GNU/Linux si el proceso que termina no tuviera padre, ya que este acabó antes que él, se eliminaría directamente del planificador por la llamada <code>exit()</code>, y sería adoptado por el proceso 1 o init.
        </p>
      </div>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// PROTOTIPO DE LA FUNCIÓN exit()</div>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;stdlib.h&gt;</div>
        <div><span style={{ color: "#569cd6" }}>void</span> <span style={{ color: "#dcdcaa" }}>exit</span>(<span style={{ color: "#569cd6" }}>int</span> status);</div>
      </div>

      <SectionText>
        El llamado a la función <code>exit()</code> termina la ejecución del proceso y devuelve el valor de la variable status al proceso padre. Desde la terminal del sistema GNU/Linux, se puede consultar lo que devuelve el último proceso que finalizó por medio de la variable de entorno <code>$?</code> (por ejemplo, ejecutando <code>echo $?</code>).
      </SectionText>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Ejemplo 1: Empleo de la llamada wait()</h3>

      <WaitDiagram />

      <SectionText>
        Programa que muestra el empleo de la llamada al sistema <code>wait()</code>.
      </SectionText>
      <CodeBlock title="ejemplo_wait.c" code={codeWait} output={outputWait} explanation="El proceso padre utiliza wait() para suspenderse y esperar el estado. Cuando el hijo termina, el padre continúa e imprime su propio PID y el PID del hijo recolectado." />

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Ejemplo 2: Empleo de la llamada waitpid()</h3>
      <SectionText>
        Programa que muestra el empleo de la llamada al sistema <code>waitpid()</code> para calcular factoriales a partir de argumentos pasados por terminal.
      </SectionText>
      <CodeBlock title="ejemplo_waitpid.c" code={codeWaitPid} output={outputWaitPid} explanation="Al pasar argumentos (por ejemplo, ./ejemplo_waitpid 3), el padre crea un hijo para calcular cada factorial y se duerme con sleep(2). Posteriormente, recolecta cada proceso que vaya finalizando utilizando waitpid() en un bucle." />


    </section>
  );
}

export function Chapter2_7() {
  const codeZombiSinWait = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> pid;
    pid = <span class="code-fn">fork</span>();
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) { <span class="code-cmt">/* Proceso hijo */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo terminado. PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
        <span class="code-fn">exit</span>(EXIT_SUCCESS);
    } <span class="code-kw">else</span> { <span class="code-cmt">/* Proceso padre */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Padre en ejecución. PID=%ld\\n"</span>,(<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
        <span class="code-fn">sleep</span>(<span class="code-num">30</span>); <span class="code-cmt">/* El padre NO llama a wait() */</span>
    }
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const outputZombiSinWait = `Padre en ejecución. PID=4000
Hijo terminado. PID=4001
[El padre duerme por 30s. Si ejecutas 'ps -el | grep Z' verás el zombi]`;

  const codeZombiConWait = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>(<span class="code-type">void</span>) {
    <span class="code-type">pid_t</span> pid;
    <span class="code-type">int</span> status;
    pid = <span class="code-fn">fork</span>();
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) { <span class="code-cmt">/* Proceso hijo */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo terminado. PID=%ld\\n"</span>, (<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
        <span class="code-fn">exit</span>(EXIT_SUCCESS);
    } <span class="code-kw">else</span> { <span class="code-cmt">/* Proceso padre */</span>
        <span class="code-fn">wait</span>(&amp;status); <span class="code-cmt">/* Recolecta al hijo */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Padre: hijo recolectado\\n"</span>);
    }
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`;

  const outputZombiConWait = `Hijo terminado. PID=4001
Padre: hijo recolectado`;

  return (
    <section id="zombi" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.7" title="Estado Zombi" subtitle="El proceso muerto que se rehúsa a desaparecer." />

      <SectionText>
        Un proceso zombi es un proceso que ya terminó su ejecución, pero su proceso padre no ha recogido su estado de salida mediante <code>wait()</code> o <code>waitpid()</code>. El proceso zombi no consume CPU ni memoria de usuario, pero sí ocupa una entrada en la tabla de procesos, conservando: PID, código de salida e información estadística mínima.
      </SectionText>

      <SectionText>
        A continuación se ilustra claramente el estado zombi, primero sin usar <code>wait()</code> y después usando <code>wait()</code>, conectando el comportamiento observable con el funcionamiento interno del sistema operativo.
      </SectionText>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Caso 1: Proceso zombi sin wait()</h3>
      <CodeBlock title="zombi_sin_wait.c" code={codeZombiSinWait} output={outputZombiSinWait} explanation="El hijo finaliza pero el padre no hace wait() y se queda durmiendo. El kernel marca al hijo como EXIT_ZOMBIE conservando su información. Durante esos 30 segundos, si desde otra terminal ejecutas 'ps -el | grep Z', verás al hijo en estado Zombi." />

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", marginTop: "3rem" }}>Caso 2: Proceso no zombi usando wait()</h3>
      <CodeBlock title="no_zombi_con_wait.c" code={codeZombiConWait} output={outputZombiConWait} explanation="El hijo finaliza y el kernel lo marca como terminado. El padre inmediatamente ejecuta wait(). El kernel entrega el estado de salida al padre y elimina completamente al hijo de la tabla de procesos. No queda estado zombi." />

      <div className="card" style={{ borderLeft: "4px solid #ef4444", marginTop: "3rem", background: "linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(239, 68, 68, 0.01) 100%)", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.05)" }}>
        <h4 style={{ fontWeight: 800, color: "#ef4444", marginBottom: "1rem", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>⚠️</span> ¿Y si el padre muere antes?
        </h4>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.7 }}>
          Si el proceso padre termina antes que el hijo, el hijo se vuelve <strong>huérfano</strong>. El kernel lo reasigna automáticamente al proceso con PID 1 (<code>init</code> o <code>systemd</code>). El PID 1 está programado para ejecutar <code>wait()</code> de forma automática continuamente, por lo que recolecta a cualquier huérfano sin permitir que quede como zombi.
        </p>
      </div>

      <ZombieActivity />


    </section>
  );
}

export function Chapter2_8() {
  return (
    <section id="hilos" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.8" title="Hilos (Threads)" subtitle="Mecanismo de ejecución concurrente." />

      <SectionText>
        Los hilos o <em>threads</em> representan un mecanismo de ejecución concurrente dentro de un mismo proceso, y constituyen una alternativa más ligera que la creación de procesos independientes. A diferencia de los procesos, los hilos no son entidades completamente aisladas, sino que comparten el mismo espacio de direcciones, los mismos archivos abiertos y otros recursos del proceso al que pertenecen.
      </SectionText>

      <SectionText>
        Aunque en ocasiones se les describe como una forma de trabajar con procesos no emparentados, conceptualmente los hilos deben entenderse como unidades de ejecución que coexisten dentro de un mismo proceso, cooperando de manera estrecha.
      </SectionText>

      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ color: "#3b82f6", fontSize: "1.5rem" }}>🧵</span> ¿Cuándo usar Hilos?
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem", marginBottom: "3.5rem" }}>
        {[
          { icon: "⚡", title: "Concurrencia", desc: "Ejecutar múltiples tareas de manera simultánea en un mismo proceso." },
          { icon: "🤝", title: "Datos Compartidos", desc: "Compartir información sin necesidad de costosos mecanismos de IPC." },
          { icon: "🍃", title: "Bajo Overhead", desc: "Creación y destrucción mucho más rápida que los procesos independientes." },
          { icon: "🎮", title: "Interactividad", desc: "Mantener la interfaz fluida mientras se realizan tareas en segundo plano." },
          { icon: "🧠", title: "Multinúcleo", desc: "Aprovechar al máximo la potencia de procesadores con varios núcleos." }
        ].map((item, idx) => (
          <div key={idx} style={{ padding: "1.5rem", borderRadius: "16px", background: "rgba(59, 130, 246, 0.03)", border: "1px solid rgba(59, 130, 246, 0.1)", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
            <div style={{ fontWeight: 800, color: "#1d4ed8", fontSize: "0.95rem" }}>{item.title}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Anatomía de un Hilo</h3>
      <ThreadDiagram />
      <InfoCard title="Compartido vs Privado" items={[
        "Recursos Compartidos (pertenecen al Proceso): Espacio de direcciones, variables globales, archivos abiertos y recursos del proceso.",
        "Recursos Privados (pertenecen a cada Hilo): Contador de programa (PC), conjunto de registros y pila de ejecución (Stack)."
      ]} />

      <div style={{ marginTop: "3rem" }}>
        <MiniQuiz
          title="Test: Procesos vs Hilos"
          questions={[
            {
              question: "A diferencia de los procesos independientes, los hilos...",
              options: [
                "Poseen su propia memoria aislada y protegida del resto.",
                "Comparten el mismo espacio de direcciones, archivos abiertos y otros recursos del proceso al que pertenecen.",
                "No pueden ejecutarse de manera concurrente en arquitecturas multinúcleo.",
                "Se crean y destruyen con un overhead mucho mayor que los procesos."
              ],
              correct: 1,
              explanation: "Los hilos viven dentro del mismo proceso, por lo que no son entidades completamente aisladas. Cooperan de manera estrecha y comparten el mismo espacio de direcciones y recursos para evitar el uso de costosos mecanismos de IPC.",
              hint: "Recuerda que los hilos son 'procesos ligeros' que viven bajo el mismo techo (proceso)."
            }
          ]}
        />
      </div>


    </section>
  );
}

export function Chapter2_8_1() {
  return (
    <section id="creacion-hilos" className="chapter-section animate-fadeInUp">
      <ChapterHeader num="2.8.1" title="Creación de hilos" subtitle="El estándar POSIX (pthreads)." />

      <SectionText>
        La función <code>pthread_create()</code> es usada para crear un hilo con ciertos atributos, y esté ejecutará una determinada función o subrutina con los argumentos que se le indique. El prototipo de la función es el siguiente:
      </SectionText>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// PROTOTIPO DE LA FUNCIÓN pthread_create()</div>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;pthread.h&gt;</div>
        <div>
          <span style={{ color: "#569cd6" }}>int</span> <span style={{ color: "#dcdcaa" }}>pthread_create</span>(<span style={{ color: "#4ec9b0" }}>pthread_t</span> *thread, <span style={{ color: "#569cd6" }}>const</span> <span style={{ color: "#4ec9b0" }}>pthread_attr_t</span> *attr, <span style={{ color: "#569cd6" }}>void</span>* (*start_routine) (<span style={{ color: "#569cd6" }}>void</span> *), <span style={{ color: "#569cd6" }}>void</span> *arg);
        </div>
      </div>

      <SectionText>
        Los atributos para un proceso son especificados dentro del parámetro <code>attr</code>, si attr es <code>NULL</code>, el atributo por omisión es usado. Si la función se realiza con éxito, se almacena el ID del hilo en la localidad referenciada por el apuntador <code>thread</code>. El hilo que está creado ejecuta la función o rutina <code>start_routine()</code> con <code>arg</code> como su argumento de entrada para la función. Si se necesita pasar o devolver más de un parámetro a la vez, se puede crear una estructura y colocar ahí los campos necesarios.
      </SectionText>

      <SectionText>
        Cuando finaliza la función <code>start_routine()</code> se llama implícitamente a <code>pthread_exit()</code> o su equivalente.
      </SectionText>

      <div className="card" style={{ borderLeft: "4px solid var(--accent-primary)", background: "linear-gradient(135deg, rgba(155, 28, 46, 0.03) 0%, rgba(155, 28, 46, 0.01) 100%)", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Estado de las señales</h4>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>El estado de las señales del nuevo hilo serán:</p>
        <ul style={{ color: "var(--text-secondary)", marginTop: "0.5rem", paddingLeft: "1.5rem", marginBottom: 0 }}>
          <li>La máscara de señales del hilo creador que le son heredadas, o</li>
          <li>Nulo para el conjunto de señales pendientes del nuevo hilo.</li>
        </ul>
      </div>

      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ color: "var(--accent-primary)", fontSize: "1.5rem" }}>🛑</span> Terminación de un hilo
      </h3>
      <SectionText>Un hilo puede finalizar su ciclo de vida por diversas causas:</SectionText>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem", marginTop: "1.5rem", marginBottom: "3rem" }}>
        {[
          { icon: "🚪", title: "pthread_exit()", desc: "Terminación explícita con estado final disponible para otros hilos mediante pthread_join()." },
          { icon: "🏁", title: "Retorno (return)", desc: "Finalizar la función start_routine es equivalente a invocar pthread_exit()." },
          { icon: "🚫", title: "Cancelación", desc: "El hilo es terminado externamente mediante una llamada a pthread_cancel()." },
          { icon: "💥", title: "Main Exit", desc: "Si el hilo principal retorna de main(), todos los hilos del proceso mueren inmediatamente." }
        ].map((item, idx) => (
          <div key={idx} className="card" style={{ padding: "1.5rem", borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--border-color)", transition: "transform 0.3s ease", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <div style={{ fontSize: "1.8rem" }}>{item.icon}</div>
            <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1.05rem" }}>{item.title}</div>
            <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ color: "var(--accent-primary)", fontSize: "1.5rem" }}>⚠️</span> Retornos y Códigos de Error
      </h3>
      <SectionText>
        <code>pthread_create()</code> retorna <strong>0</strong> en caso de éxito. En caso contrario, devuelve un número de error específico. A diferencia de otras funciones, no suele usar <code>errno</code> global directamente, sino que retorna el código:
      </SectionText>

      <div style={{ background: "var(--bg-secondary)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border-color)", marginBottom: "3rem" }}>
        {[
          { code: "EAGAIN", desc: "Recursos insuficientes (ver /proc/sys/kernel/threads-max)." },
          { code: "EINVAL", desc: "Atributos del hilo (attr) no válidos o incompatibles." },
          { code: "EPERM", desc: "Permisos insuficientes para la política de planificación solicitada." }
        ].map((err, idx) => (
          <div key={idx} style={{ padding: "1.2rem 1.8rem", borderBottom: idx === 2 ? "none" : "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <code style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "0.3rem 0.8rem", borderRadius: "6px", fontWeight: 700, fontSize: "0.9rem", minWidth: "80px", textAlign: "center" }}>
              {err.code}
            </code>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{err.desc}</span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", marginTop: "3.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <span style={{ color: "var(--accent-primary)", fontSize: "1.5rem" }}>🆔</span> Identificación del Hilo
      </h3>
      <SectionText>
        La función <code>pthread_self()</code> devuelve el identificador (ID) del hilo que la invoca. Este valor es idéntico al almacenado en el puntero <code>*thread</code> durante la creación:
      </SectionText>

      <div style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "1.5rem", borderRadius: "8px", fontFamily: "monospace", marginBottom: "2rem" }}>
        <div style={{ color: "#6a9955", marginBottom: "0.5rem" }}>// PROTOTIPO DE LA FUNCIÓN pthread_self()</div>
        <div style={{ color: "#569cd6", marginBottom: "0.5rem" }}>#include &lt;pthread.h&gt;</div>
        <div>
          <span style={{ color: "#4ec9b0" }}>pthread_t</span> <span style={{ color: "#dcdcaa" }}>pthread_self</span>(<span style={{ color: "#569cd6" }}>void</span>);
        </div>
      </div>

      <CodeBlock title="2_8_creacion_hilos.c" code={CODE.threads} explanation="Ejemplo de creación básica. Al compilar, recuerda añadir el flag -lpthread (gcc hilos.c -o hilos -lpthread)." output={CODE.threadsOut} />


    </section>
  );
}

"use client";
import React, { useState, useEffect } from "react";

interface SystemMonitorProps {
  isRoot?: boolean;
}

export default function SystemMonitor({ isRoot = false }: SystemMonitorProps) {
  const [cpu, setCpu] = useState(15);
  const [ram, setRam] = useState(2440);
  const [processes, setProcesses] = useState(124);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 20) + (isRoot ? 40 : 5));
      setRam(prev => {
        const diff = Math.floor(Math.random() * 50) - 25;
        const next = prev + diff;
        return next < 2000 ? 2000 : next > 8000 ? 8000 : next;
      });
      setProcesses(prev => {
        if (Math.random() > 0.8) return prev + (Math.random() > 0.5 ? 1 : -1);
        return prev;
      });
      setUptime(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRoot]);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: isRoot ? "rgba(155, 28, 46, 0.1)" : "rgba(30, 41, 59, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "1.5rem",
      color: isRoot ? "var(--accent-primary)" : "#94a3b8",
      fontFamily: "'JetBrains Mono', monospace",
      border: isRoot ? "2px solid var(--accent-primary)" : "1px solid rgba(255,255,255,0.1)",
      boxShadow: isRoot ? "0 0 30px rgba(155, 28, 46, 0.2)" : "0 20px 50px rgba(0,0,0,0.3)",
      marginTop: "2rem",
      transition: "all 0.5s ease"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: `1px solid ${isRoot ? "var(--accent-primary)" : "rgba(255,255,255,0.1)"}`, paddingBottom: "0.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: isRoot ? "#ef4444" : "#10b981", boxShadow: `0 0 10px ${isRoot ? "#ef4444" : "#10b981"}` }}></div>
          <span style={{ color: isRoot ? "var(--accent-primary)" : "#f8fafc", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1px" }}>
            {isRoot ? "KERNEL_ROOT_ACCESS_ENABLED" : "KERNEL_MONITOR_v1.0"}
          </span>
        </div>
        <div style={{ fontSize: "0.8rem" }}>UPTIME: {formatTime(uptime)}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem" }}>
        {/* CPU */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.75rem" }}>
            <span>{isRoot ? "CPU_OVERCLOCK" : "CPU USAGE"}</span>
            <span style={{ color: isRoot ? "#ef4444" : (cpu > 80 ? "#ef4444" : "#10b981") }}>{cpu}%</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${cpu}%`, height: "100%", background: isRoot ? "#ef4444" : (cpu > 80 ? "#ef4444" : "#10b981"), transition: "width 0.5s ease" }}></div>
          </div>
        </div>

        {/* RAM */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.75rem" }}>
            <span>{isRoot ? "PHYSICAL_MEM" : "MEMORY"}</span>
            <span style={{ color: isRoot ? "#ef4444" : "#3b82f6" }}>{(ram/1024).toFixed(2)} GB</span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${(ram/8192)*100}%`, height: "100%", background: isRoot ? "#ef4444" : "#3b82f6", transition: "width 0.5s ease" }}></div>
          </div>
        </div>

        {/* Processes */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", marginBottom: "0.2rem" }}>{isRoot ? "SYSTEM_PIDS" : "ACTIVE_TASKS"}</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: isRoot ? "#ef4444" : "#f8fafc" }}>{processes}</div>
        </div>

        {/* Load Avg */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.75rem", marginBottom: "0.2rem" }}>LOAD_AVG</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: isRoot ? "#ef4444" : "#f8fafc" }}>{isRoot ? "1.42 1.56 1.12" : "0.42 0.56 0.12"}</div>
        </div>
      </div>
      
      <div style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: isRoot ? "var(--accent-primary)" : "rgba(148, 163, 184, 0.5)", fontStyle: "italic", textAlign: "right", opacity: 0.6 }}>
        {isRoot ? "⚠️ Privileged kernel access active." : "Simulated live kernel telemetry..."}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

interface Props {
  title: string;
  language?: string;
  code: string;
  explanation: string;
  output?: string;
}

export default function CodeBlock({ title, language = "C", code, explanation, output }: Props) {
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code.replace(/<[^>]+>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div className="code-block">
        <div className="code-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="code-lang">⚡ {language}</span>
            <span style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 500 }}>{title}</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {output && (
              <button onClick={() => setShowOutput(!showOutput)} className="btn-secondary" style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}>
                {showOutput ? "📄 Código" : "▶ Ejecutar"}
              </button>
            )}
            <button onClick={copy} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: copied ? "#10b981" : "#94a3b8", padding: "0.3rem 0.6rem", cursor: "pointer", fontSize: "0.75rem" }}>
              {copied ? "✓ Copiado" : "📋 Copiar"}
            </button>
          </div>
        </div>
        <div className="code-body">
          {showOutput && output
            ? <pre style={{ color: "#a8d8a8", margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
            : <pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
          }
        </div>
      </div>
      <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "1rem 1.25rem" }}>
        <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
          <span style={{ color: "var(--accent-blue)", fontWeight: 700 }}>💡 Explicación: </span>{explanation}
        </span>
      </div>
    </div>
  );
}

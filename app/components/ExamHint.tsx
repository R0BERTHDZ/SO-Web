import React, { useState } from "react";

export default function ExamHint({ hint }: { hint: string }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <button 
        onClick={() => setShow(!show)}
        style={{ 
          background: show ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.05)", 
          color: "#d97706", 
          border: "1px solid rgba(245, 158, 11, 0.3)", 
          padding: "0.4rem 0.8rem", 
          borderRadius: "20px", 
          fontSize: "0.85rem", 
          fontWeight: "bold", 
          cursor: "pointer", 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.4rem",
          transition: "all 0.2s ease"
        }}
      >
        💡 {show ? "Ocultar Pista" : "Ver Pista"}
      </button>
      {show && (
        <div 
          className="animate-fadeInUp"
          style={{ 
            marginTop: "0.8rem", 
            padding: "1rem", 
            background: "rgba(245, 158, 11, 0.05)", 
            borderRadius: "8px", 
            borderLeft: "3px solid #f59e0b", 
            color: "var(--text-secondary)", 
            fontSize: "0.95rem" 
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

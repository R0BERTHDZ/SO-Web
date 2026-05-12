"use client";

export default function CreditsSection() {
  return (
    <section id="creditos" style={{ padding: "6rem 0 4rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }} className="animate-fadeInUp">
        <h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Información del Proyecto</h2>
        <p className="section-subtitle" style={{ fontSize: "1.1rem" }}>Sistemas Operativos — Portafolio de Evidencias</p>
      </div>

      {/* Hero card - UTM styled */}
      <div className="animate-fadeInUp" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", marginBottom: "4rem", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 20px 40px rgba(155, 28, 46, 0.15), 0 1px 3px rgba(0,0,0,0.05)", transform: "translateZ(0)" }}>
        {/* Background gradient/image placeholder resembling the red tech background in the image */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, #9b1c2e 0%, #68121f 100%)", zIndex: 0 }}>
          {/* Subtle tech pattern overlay */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
          {/* Light flare */}
          <div style={{ position: "absolute", top: "-50%", left: "-20%", width: "100%", height: "200%", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 50%)", transform: "rotate(30deg)" }}></div>
        </div>

        <div style={{ position: "relative", zIndex: 1, padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "280px", background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
          <h3 style={{ color: "white", fontSize: "2.8rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.02em", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            Ingeniería en Computación
          </h3>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.2rem", fontStyle: "italic", maxWidth: "600px", textShadow: "0 1px 5px rgba(0,0,0,0.3)", fontWeight: 500 }}>
            Sistemas Operativos impartidos por M.C. GABRIEL GERONIMO CASTILLO gracias por su atención, conocimiento y dedicación.
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {[
          { icon: "🏛️", title: "Universidad", desc: "Univ. Tecnológica de la Mixteca" },
          { icon: "📚", title: "Materia", desc: "Sistemas Operativos" },
          { icon: "👨‍🏫", title: "Profesor", desc: "M.C. GABRIEL GERONIMO CASTILLO" },
          { icon: "📅", title: "Semestre", desc: "6° Semestre · 2026" },
          { icon: "📘", title: "Referencia", desc: "Un Vistazo a los Sistemas Operativos" },
          { icon: "🗓️", title: "Entrega", desc: "15 de Mayo, 2026" },
        ].map((item, i) => (
          <div key={item.title} style={{
            textAlign: "center",
            padding: "2.5rem 1.5rem",
            background: "var(--bg-card)",
            borderRadius: "16px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animationDelay: `${i * 0.1}s`
          }}
            className="animate-fadeInUp hover:-translate-y-2 hover:shadow-xl"
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>{item.icon}</div>
            <div style={{ color: "var(--accent-primary)", fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.title}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.4 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(155, 28, 46, 0.2), transparent)", margin: "4rem 0" }} />

      {/* Footer */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2.5rem", padding: "0 1rem" }}>
        <div>
          <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "var(--accent-primary)", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
            Sistemas Operativos
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 600 }}>
            © 2026 Universidad Tecnológica de la Mixteca - Huajuapan de León, Oaxaca
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)" }}>
          <a href="#" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-primary)"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Información</a>
          <a href="#" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-primary)"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Guía de C</a>
          <a href="#" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-primary)"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>Repositorio</a>
          <a href="#" style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-primary)"} onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>UTM Portal</a>
        </div>
      </div>
    </section>
  );
}

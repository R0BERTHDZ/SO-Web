"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinkStyle = (path: string) => ({
    color: isActive(path) ? "var(--accent-primary)" : "var(--text-secondary)",
    borderBottom: isActive(path) ? "2px solid var(--accent-primary)" : "2px solid transparent",
    paddingBottom: "0.2rem",
    fontWeight: isActive(path) ? 700 : 500,
    textDecoration: "none"
  });

  return (
    <nav className="navbar" style={{ 
      background: scrolled ? "var(--bg-secondary)" : "transparent", 
      transition: "all 0.3s",
      borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.03)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Mobile View: Toggle + Title + ThemeToggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="mobile-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--accent-primary)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <button onClick={() => window.scrollTo({top:0, behavior:"smooth"})} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1rem, 4vw, 1.2rem)", color: "var(--accent-primary)", letterSpacing: "-0.5px" }}>
                Sistemas Operativos
              </div>
            </button>
          </div>

          <div style={{ display: "none" }} className="mobile-theme-toggle">
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="desktop-nav">
          <Link href="/" className="nav-link" style={navLinkStyle("/")}>Dashboard</Link>
          <Link href="/practicas" className="nav-link" style={navLinkStyle("/practicas")}>Prácticas</Link>
          <Link href="/creditos" className="nav-link" style={navLinkStyle("/creditos")}>Créditos</Link>
          
          <ThemeToggle />

          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{ 
          position: "absolute", top: "100%", left: 0, right: 0, 
          background: "var(--bg-secondary)", 
          borderBottom: "1px solid var(--border-color)", 
          padding: "1.5rem 2rem", 
          display: "flex", 
          flexDirection: "column", 
          gap: "1.2rem",
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)"
        }}>
          <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)} style={navLinkStyle("/")}>Dashboard</Link>
          <Link href="/practicas" className="nav-link" onClick={() => setMenuOpen(false)} style={navLinkStyle("/practicas")}>Prácticas</Link>
          <Link href="/creditos" className="nav-link" onClick={() => setMenuOpen(false)} style={navLinkStyle("/creditos")}>Créditos</Link>
          {/* We would also render the sidebar elements here for mobile navigation */}
          <div style={{ height: "1px", background: "var(--border-color)", margin: "0.5rem 0" }}></div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 800, letterSpacing: "1px" }}>CONTENIDO DEL CURSO</div>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textAlign: "left", background: "none", border: "none", color: "var(--text-secondary)", padding: "0.5rem 0", fontSize: "1rem", textDecoration: "none" }}>1. Introducción a Linux</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textAlign: "left", background: "none", border: "none", color: "var(--text-secondary)", padding: "0.5rem 0", fontSize: "1rem", textDecoration: "none" }}>2. Procesos e Hilos</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textAlign: "left", background: "none", border: "none", color: "var(--text-secondary)", padding: "0.5rem 0", fontSize: "1rem", textDecoration: "none" }}>3. IPC & Sincronización</Link>
        </div>
      )}

      <style>{`
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 2rem; }
        .nav-link { background: none; border: none; cursor: pointer; transition: color 0.2s; font-size: 0.95rem; border-bottom: 2px solid transparent; }
        .nav-link:hover { color: var(--accent-primary) !important; }
        @media (max-width: 768px) { 
          .desktop-nav { display: none !important; } 
          .mobile-menu-btn { display: block !important; }
          .mobile-theme-toggle { display: block !important; }
          .mobile-header { width: 100% !important; justify-content: space-between !important; }
        }
      `}</style>
    </nav>
  );
}

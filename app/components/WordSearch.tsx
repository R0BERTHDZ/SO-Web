"use client";
import React, { useState, useEffect } from "react";

interface WordSearchItem {
  word: string;
  meaning: string;
  importance: string;
  hint?: string;
}

interface WordSearchProps {
  title: string;
  items: WordSearchItem[];
  size?: number;
}

export default function WordSearch({ title, items, size = 10 }: WordSearchProps) {
  const targetWords = items.map(i => i.word);
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [foundWordsWithCells, setFoundWordsWithCells] = useState<{ word: string; cells: { r: number; c: number }[] }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeHints, setActiveHints] = useState<string[]>([]);
  const glosarioRef = React.useRef<HTMLDivElement>(null);

  const colors = [
    "var(--accent-blue)",
    "var(--accent-green)",
    "var(--accent-orange)",
    "var(--accent-primary)",
    "#8b5cf6", // Violeta
    "#ec4899", // Rosa
    "#06b6d4", // Cyan
  ];

  const getWordColor = (word: string) => {
    const index = targetWords.findIndex(w => w.toUpperCase() === word.toUpperCase());
    return colors[index % colors.length];
  };

  useEffect(() => {
    generateGrid();
  }, [items]);

  useEffect(() => {
    if (foundWords.length > 0) {
      setTimeout(() => {
        if (glosarioRef.current) {
          glosarioRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    }
  }, [foundWords]);

  const generateGrid = () => {
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(""));
    const words = [...targetWords].map(w => w.toUpperCase());

    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (canPlace(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c] === "") {
          newGrid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    setGrid(newGrid);
    setFoundWords([]);
    setFoundWordsWithCells([]);
  };

  const canPlace = (g: string[][], word: string, r: number, c: number, dir: number) => {
    if (dir === 0 && c + word.length > size) return false;
    if (dir === 1 && r + word.length > size) return false;
    if (dir === 2 && (r + word.length > size || c + word.length > size)) return false;

    for (let i = 0; i < word.length; i++) {
      const nr = dir === 1 || dir === 2 ? r + i : r;
      const nc = dir === 0 || dir === 2 ? c + i : c;
      if (g[nr][nc] !== "" && g[nr][nc] !== word[i]) return false;
    }
    return true;
  };

  const placeWord = (g: string[][], word: string, r: number, c: number, dir: number) => {
    for (let i = 0; i < word.length; i++) {
      const nr = dir === 1 || dir === 2 ? r + i : r;
      const nc = dir === 0 || dir === 2 ? c + i : c;
      g[nr][nc] = word[i];
    }
  };

  const handleMouseDown = (r: number, c: number) => {
    setIsSelecting(true);
    setSelectedCells([{ r, c }]);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (isSelecting) {
      const start = selectedCells[0];
      const newSelection = [];
      const dr = Math.sign(r - start.r);
      const dc = Math.sign(c - start.c);
      
      // Only allow horizontal, vertical, or 45-degree diagonal
      const isHorizontal = r === start.r;
      const isVertical = c === start.c;
      const isDiagonal = Math.abs(r - start.r) === Math.abs(c - start.c);

      if (isHorizontal || isVertical || isDiagonal) {
        let currR = start.r;
        let currC = start.c;
        while (true) {
          newSelection.push({ r: currR, c: currC });
          if (currR === r && currC === c) break;
          currR += dr;
          currC += dc;
        }
        setSelectedCells(newSelection);
      }
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const selectedWord = selectedCells.map(cell => grid[cell.r][cell.c]).join("");
    const reversedWord = selectedWord.split("").reverse().join("");
    
    const wordFound = targetWords.find(w => w.toUpperCase() === selectedWord || w.toUpperCase() === reversedWord);
    
    if (wordFound && !foundWords.includes(wordFound.toUpperCase())) {
      const upperWord = wordFound.toUpperCase();
      setFoundWords([...foundWords, upperWord]);
      setFoundWordsWithCells([...foundWordsWithCells, { word: upperWord, cells: [...selectedCells] }]);
    }
    setSelectedCells([]);
  };

  const handleTouchStart = (e: React.TouchEvent, r: number, c: number) => {
    setIsSelecting(true);
    setSelectedCells([{ r, c }]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSelecting) return;
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const dataCoords = element.getAttribute("data-coords");
    if (dataCoords) {
      const [r, c] = dataCoords.split("-").map(Number);
      handleMouseEnter(r, c);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const isCellSelected = (r: number, c: number) => 
    selectedCells.some(cell => cell.r === r && cell.c === c);

  const getCellFoundColor = (r: number, c: number) => {
    const foundData = foundWordsWithCells.find(data => data.cells.some(cell => cell.r === r && cell.c === c));
    return foundData ? getWordColor(foundData.word) : null;
  };

  return (
    <div className="card" style={{ padding: "1.5rem", marginBottom: "3rem", background: "var(--bg-card)", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid var(--border-color)" }}>
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1.5rem", textAlign: "center" }}>
        🔍 {title}
      </h3>
      
      <div className="game-container-flex">
        {/* Grid Container for Scrolling */}
        <div className="game-grid-scroll">
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: `repeat(${size}, clamp(36px, 9vw, 44px))`, 
              gap: "3px", 
              background: "var(--border-color)", 
              padding: "10px", 
              borderRadius: "12px",
              userSelect: "none",
              touchAction: "none",
              width: "max-content",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={() => { setIsSelecting(false); setSelectedCells([]); }}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {grid.map((row, r) => row.map((char, c) => {
              const foundColor = getCellFoundColor(r, c);
              const isSelected = isCellSelected(r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  data-coords={`${r}-${c}`}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  onMouseUp={handleMouseUp}
                  onTouchStart={(e) => handleTouchStart(e, r, c)}
                  style={{
                    width: "clamp(36px, 9vw, 44px)",
                    height: "clamp(36px, 9vw, 44px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isSelected 
                      ? "var(--accent-primary)" 
                      : foundColor 
                        ? `${foundColor}25` 
                        : "var(--bg-secondary)",
                    color: isSelected 
                      ? "white" 
                      : foundColor 
                        ? foundColor 
                        : "var(--text-primary)",
                    borderRadius: "6px",
                    fontSize: "clamp(1rem, 5vw, 1.2rem)",
                    fontWeight: 900,
                    cursor: "pointer",
                    transition: "all 0.1s ease",
                    border: foundColor ? `1px solid ${foundColor}` : "1px solid var(--border-color)",
                    boxShadow: foundColor ? `0 2px 8px ${foundColor}15` : "none"
                  }}
                >
                  {char}
                </div>
              );
            }))}
          </div>
        </div>

        {/* Word List (Right/Bottom) */}
        <div className="game-clues-container">
          <h4 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
            Palabras a encontrar:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.8rem" }}>
            {items.map(item => {
              const isFound = foundWords.includes(item.word.toUpperCase());
              const wordColor = getWordColor(item.word);
              const showHint = activeHints.includes(item.word);

              return (
                <div key={item.word} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <div 
                    style={{ 
                      padding: "0.8rem 1.2rem", 
                      borderRadius: "12px", 
                      fontSize: "0.95rem", 
                      fontWeight: 700,
                      background: isFound ? `${wordColor}10` : "var(--bg-secondary)",
                      color: isFound ? wordColor : "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      border: `1px solid ${isFound ? wordColor : "var(--border-color)"}`,
                      opacity: isFound ? 1 : 0.8,
                      transition: "all 0.3s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontSize: "1.2rem" }}>{isFound ? "✅" : "⭕"}</span>
                      <span style={{ textDecoration: isFound ? "line-through" : "none" }}>{item.word}</span>
                    </div>
                    
                    {!isFound && item.hint && (
                      <button 
                        onClick={() => setActiveHints(prev => prev.includes(item.word) ? prev.filter(w => w !== item.word) : [...prev, item.word])}
                        style={{
                          background: showHint ? "rgba(251, 191, 36, 0.2)" : "transparent",
                          border: `1px solid ${showHint ? "#f59e0b" : "transparent"}`,
                          borderRadius: "6px",
                          padding: "0.2rem 0.5rem",
                          fontSize: "0.7rem",
                          color: showHint ? "#b45309" : "var(--text-muted)",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        💡 Pista
                      </button>
                    )}
                  </div>
                  
                  {showHint && !isFound && (
                    <div style={{ 
                      padding: "0.6rem 1rem", 
                      background: "rgba(251, 191, 36, 0.05)", 
                      borderRadius: "8px", 
                      borderLeft: "3px solid #fbbf24", 
                      fontSize: "0.85rem", 
                      color: "#b45309",
                      animation: "fadeIn 0.3s ease",
                      marginLeft: "0.5rem"
                    }}>
                      {item.hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {foundWords.length === targetWords.length && (
            <div style={{ marginTop: "2rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(22, 163, 74, 0.15) 0%, rgba(22, 163, 74, 0.05) 100%)", borderRadius: "16px", textAlign: "center", color: "var(--accent-green)", border: "1px solid var(--accent-green)", fontWeight: 800, animation: "bounce 1s infinite" }}>
              ¡Misión Cumplida! Has identificado todos los conceptos clave. 🏆
            </div>
          )}
        </div>
      </div>
      
      {/* Meanings (Bottom) */}
      {foundWords.length > 0 && (
        <div ref={glosarioRef} id="glosario-conceptos" style={{ marginTop: "2rem", borderTop: "2px solid var(--border-color)", paddingTop: "2rem" }}>
          <h4 style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--accent-primary)", marginBottom: "1.5rem" }}>
            📚 Concepto Encontrado
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            {items.filter(i => i.word.toUpperCase() === foundWords[foundWords.length - 1]).map(item => {
              const wordColor = getWordColor(item.word);
              return (
                <div key={`meaning-${item.word}`} style={{ 
                  padding: "1.5rem", 
                  background: "var(--bg-secondary)", 
                  borderRadius: "16px", 
                  borderLeft: `4px solid ${wordColor}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  animation: "fadeIn 0.5s ease-out"
                }}>
                  <h5 style={{ margin: "0 0 0.8rem 0", color: wordColor, fontSize: "1.1rem", fontWeight: 800 }}>{item.word}</h5>
                  <div style={{ marginBottom: "0.8rem" }}>
                    <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Significado:</strong>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: "0.3rem 0 0 0" }}>{item.meaning}</p>
                  </div>
                  <div>
                    <strong style={{ color: "var(--text-primary)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Importancia:</strong>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: "0.3rem 0 0 0" }}>{item.importance}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center" }}>
        Haz clic y arrastra para seleccionar las palabras. Pueden estar en horizontal, vertical o diagonal.
      </p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

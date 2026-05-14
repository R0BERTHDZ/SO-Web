"use client";
import React from 'react';
import { ChapterHeader } from './Chapters12';
import FillInBlanks from './FillInBlanks';
import Crossword from './Crossword';
import WordSearch from './WordSearch';

const fillInBlanksItems = [
  {
    id: 1,
    textBefore: "Un",
    textAfter: "actúa como intermediario entre el hardware y el usuario.",
    answer: "Sistema Operativo",
    hint: "Es el software principal que gestiona los recursos de la computadora."
  },
  {
    id: 2,
    textBefore: "El",
    textAfter: "es el núcleo del SO y siempre reside en la memoria principal.",
    answer: "Kernel",
    hint: "Es la parte central que interactúa directamente con el hardware."
  },
  {
    id: 3,
    textBefore: "Un",
    textAfter: "es la abstracción de un programa en ejecución.",
    answer: "Proceso",
    hint: "Tiene su propio espacio de direcciones, pila y contador de programa."
  },
  {
    id: 4,
    textBefore: "La llamada al sistema",
    textAfter: "clona al proceso actual para crear un nuevo proceso hijo.",
    answer: "fork",
    hint: "Es la única forma de crear nuevos procesos en Unix."
  },
  {
    id: 5,
    textBefore: "Un proceso",
    textAfter: "es aquel que ha terminado pero su padre aún no ha leído su estado de salida con wait().",
    answer: "zombie",
    hint: "Sigue ocupando una entrada en la tabla de procesos."
  },
  {
    id: 6,
    textBefore: "La técnica de",
    textAfter: "permite compartir la misma memoria física entre procesos hasta que uno intenta escribir en ella.",
    answer: "Copy on Write",
    hint: "COW, optimiza enormemente el rendimiento de la función fork()."
  },
  {
    id: 7,
    textBefore: "El primer proceso creado en el arranque, con PID 1, se conoce tradicionalmente como",
    textAfter: ".",
    answer: "init",
    hint: "Es el ancestro de todos los demás procesos en el sistema."
  },
  {
    id: 8,
    textBefore: "La familia de llamadas",
    textAfter: "reemplaza el espacio de memoria del proceso actual por un programa nuevo.",
    answer: "exec",
    hint: "Generalmente se usa inmediatamente después de un fork()."
  },
  {
    id: 9,
    textBefore: "Una tubería sin nombre o",
    textAfter: "permite la comunicación unidireccional entre procesos emparentados.",
    answer: "pipe",
    hint: "Se crea con pipe() y devuelve dos descriptores de archivo."
  },
  {
    id: 10,
    textBefore: "Para generar una llave única en los mecanismos de IPC System V, se usa la función",
    textAfter: ".",
    answer: "ftok",
    hint: "File to Key."
  },
  {
    id: 11,
    textBefore: "La",
    textAfter: "es el mecanismo IPC más rápido porque evita copiar datos al kernel.",
    answer: "memoria compartida",
    hint: "Varios procesos pueden mapear la misma región de RAM."
  },
  {
    id: 12,
    textBefore: "Un",
    textAfter: "es una estructura del sistema de archivos de Unix que guarda los metadatos de un archivo.",
    answer: "inodo",
    hint: "Contiene el tamaño, propietario y permisos, pero NO el nombre del archivo."
  },
  {
    id: 13,
    textBefore: "El",
    textAfter: "o Bloque de Control de Proceso guarda el estado completo de un proceso durante un cambio de contexto.",
    answer: "PCB",
    hint: "Process Control Block."
  },
  {
    id: 14,
    textBefore: "En Linux, los dispositivos de hardware se exponen como",
    textAfter: "dentro del directorio /dev.",
    answer: "archivos",
    hint: "En Unix 'todo es un...'."
  },
  {
    id: 15,
    textBefore: "La llamada",
    textAfter: "se utiliza para obtener métricas generales del sistema, como la memoria RAM y Swap totales y libres.",
    answer: "sysinfo",
    hint: "Se encuentra en <sys/sysinfo.h>."
  }
];

const minishellCrosswordClues = [
  { number: 1, direction: "down" as const, row: 0, col: 3, answer: "UNLINK", clue: "Llamada al sistema para eliminar un archivo.", hint: "Quita el enlace duro (link) del inodo." },
  { number: 2, direction: "across" as const, row: 0, col: 10, answer: "LS", clue: "Lista el contenido de un directorio.", hint: "Usa internamente opendir() y readdir()." },
  { number: 3, direction: "down" as const, row: 0, col: 11, answer: "STATVFS", clue: "Llamada para obtener información de particiones (bloques libres).", hint: "Acrónimo de stat Virtual File System." },
  { number: 4, direction: "across" as const, row: 1, col: 1, answer: "RENAME", clue: "Llamada para cambiar el nombre o ruta de un archivo.", hint: "En la terminal usas 'mv', a bajo nivel es..." },
  { number: 5, direction: "down" as const, row: 1, col: 5, answer: "MAC", clue: "Dirección física de 48 bits del hardware de red.", hint: "Obtenida con la bandera SIOCGIFHWADDR." },
  { number: 6, direction: "across" as const, row: 2, col: 9, answer: "UNAME", clue: "Comando que devuelve info del Kernel (sysname, release).", hint: "Unix Name." },
  { number: 7, direction: "across" as const, row: 3, col: 5, answer: "CD", clue: "Comando para cambiar de directorio actual.", hint: "Usa internamente la llamada chdir()." },
  { number: 8, direction: "across" as const, row: 5, col: 2, answer: "MKDIR", clue: "Crea un nuevo directorio en el sistema de archivos.", hint: "Recibe el nombre y los permisos (ej. 0755)." },
  { number: 9, direction: "down" as const, row: 5, col: 5, answer: "IP", clue: "Protocolo lógico cuya dirección se lee iterando con getifaddrs().", hint: "Internet Protocol." },
  { number: 10, direction: "across" as const, row: 5, col: 11, answer: "FREE", clue: "Comando que muestra la memoria RAM total y disponible.", hint: "Usa sysinfo()." },
  { number: 11, direction: "down" as const, row: 5, col: 13, answer: "EXIT", clue: "Termina la ejecución del ciclo de la minishell.", hint: "Función homónima de la librería estándar." },
  { number: 12, direction: "across" as const, row: 8, col: 10, answer: "STAT", clue: "Extrae metadatos precisos de un archivo (inodo, tamaño, permisos).", hint: "Estructura de datos homónima." },
  { number: 13, direction: "down" as const, row: 9, col: 2, answer: "PWD", clue: "Imprime la ruta absoluta del directorio de trabajo actual.", hint: "Print Working Directory (usa getcwd)." },
  { number: 14, direction: "down" as const, row: 9, col: 4, answer: "CAT", clue: "Lee un archivo bloque por bloque y lo imprime en pantalla.", hint: "Abre con open(), lee con read()." },
  { number: 15, direction: "across" as const, row: 11, col: 2, answer: "DATE", clue: "Muestra la fecha y hora actual del sistema.", hint: "Usa time() y ctime()." },
  { number: 16, direction: "across" as const, row: 13, col: 8, answer: "WHO", clue: "Muestra los usuarios conectados actualmente.", hint: "Lee registros utmp con getutent()." }
];

const globalWordSearchWords = [
  { word: "KERNEL", meaning: "Núcleo del sistema operativo.", importance: "Gestiona memoria, procesos y hardware." },
  { word: "INODO", meaning: "Estructura de datos en ext4/ufs.", importance: "Almacena metadatos críticos de archivos (permisos, fechas)." },
  { word: "FTOK", meaning: "Función para generar claves IPC (File TO Key).", importance: "Permite a procesos no emparentados referenciar la misma memoria/cola." },
  { word: "ZOMBIE", meaning: "Estado de un proceso terminado.", importance: "Un proceso hijo esperando que su padre lea su código de salida." },
  { word: "PIPE", meaning: "Tubería anónima de comunicación IPC.", importance: "Comunica procesos relacionados (padre/hijo) unidireccionalmente." },
  { word: "EXEC", meaning: "Familia de llamadas al sistema.", importance: "Reemplaza el código del proceso actual con un nuevo programa." },
  { word: "WAIT", meaning: "Llamada para esperar a un hijo.", importance: "Recoge el estado de salida y limpia el proceso zombie." },
  { word: "READDIR", meaning: "Llamada POSIX para directorios.", importance: "Lee iterativamente el contenido de un directorio abierto." },
  { word: "STAT", meaning: "Llamada que obtiene info de un inodo.", importance: "Saca metadata exacta de un archivo." },
  { word: "SYSINFO", meaning: "Llamada que reporta métricas.", importance: "Indica uso de RAM y SWAP global del sistema." },
  { word: "IOCTL", meaning: "Input/Output Control.", importance: "Manipula parámetros de dispositivos a bajo nivel (ej. direcciones MAC)." },
  { word: "UNLINK", meaning: "Elimina una referencia a un archivo.", importance: "Cuando las referencias a un inodo llegan a 0, el archivo se borra." },
  { word: "FORK", meaning: "Crea un proceso clon.", importance: "Unica manera estándar de originar procesos en UNIX." }
];

export default function GlobalEvaluation() {
  return (
    <div className="review-page" style={{ paddingBottom: "5rem", opacity: 1, display: "block" }}>
      <ChapterHeader 
        num="REPASO GLOBAL" 
        title="Práctica Global de Sistemas Operativos" 
        subtitle="Consolida todos los conocimientos adquiridos a lo largo del curso mediante ejercicios interactivos." 
      />
      
      {/* Mobile Navigation Shortcuts */}
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto 3rem", 
        padding: "0 1rem", 
        display: "flex", 
        gap: "0.8rem", 
        flexWrap: "wrap", 
        justifyContent: "center" 
      }}>
        <button onClick={() => document.getElementById('crossword-sec')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ padding: "0.6rem 1.2rem", borderRadius: "12px", background: "var(--accent-primary)", color: "white", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 12px rgba(155, 28, 46, 0.2)" }}>
          🧩 Ir al Crucigrama
        </button>
        <button onClick={() => document.getElementById('wordsearch-sec')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ padding: "0.6rem 1.2rem", borderRadius: "12px", background: "var(--accent-primary)", color: "white", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 12px rgba(155, 28, 46, 0.2)" }}>
          🔍 Ir a la Sopa de Letras
        </button>
        <button onClick={() => document.getElementById('fill-blanks-sec')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ padding: "0.6rem 1.2rem", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          📝 Ir al Autocompletado
        </button>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 clamp(0.5rem, 3vw, 1rem)" }}>
        
        {/* Crucigrama Minishell - FIRST ON MOBILE TO ENSURE VISIBILITY */}
        <div id="crossword-sec" style={{ marginBottom: "4rem", minHeight: "300px" }}>
          <Crossword 
            title="Crucigrama: Comandos y Llamadas al Sistema"
            size={15}
            clues={minishellCrosswordClues}
          />
        </div>

        {/* Sopa de Letras */}
        <div id="wordsearch-sec" style={{ marginBottom: "4rem", minHeight: "300px" }}>
          <WordSearch 
            title="Sopa de Letras: Funciones IPC y Procesos"
            items={globalWordSearchWords}
            size={12}
          />
        </div>

        {/* Completar Frases */}
        <div id="fill-blanks-sec" style={{ marginBottom: "4rem" }}>
          <FillInBlanks 
            title="Autocompletado: Conceptos Fundamentales" 
            items={fillInBlanksItems} 
          />
        </div>
        
        <div style={{ 
          marginTop: "4rem", 
          padding: "2rem", 
          background: "rgba(155, 28, 46, 0.05)", 
          borderRadius: "20px", 
          border: "1px solid rgba(155, 28, 46, 0.1)",
          textAlign: "center"
        }}>
          <h4 style={{ color: "var(--accent-primary)", fontWeight: 900, marginBottom: "0.5rem" }}>¡Felicidades por llegar aquí!</h4>
          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.95rem" }}>
            Has completado el repaso global. Estos conceptos son la base para entender cualquier arquitectura de software moderna.
          </p>
        </div>
      </div>
    </div>
  );
}

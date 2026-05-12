"use client";
import React from 'react';
import MiniQuiz from './MiniQuiz';
import { ChapterHeader } from './Chapters12';

export default function UnitReviewMinishell() {
  const questions = [
    {
      question: "¿Qué función se utiliza en la minishell para cambiar el directorio de trabajo?",
      options: ["cd()", "chdir()", "setdir()", "getcwd()"],
      correct: 1,
      explanation: "chdir() es la llamada al sistema en C para cambiar el directorio de trabajo actual del proceso.",
      hint: "Busca el nombre que parece una abreviatura de 'Change Directory'."
    },
    {
      question: "¿Cuál es el propósito de la función strtok() en el bucle principal de la shell?",
      options: [
        "Ejecutar el comando en segundo plano",
        "Dividir la cadena de entrada en tokens (comando y argumentos)",
        "Copiar el comando en un buffer de seguridad",
        "Limpiar la pantalla de la terminal"
      ],
      correct: 1,
      explanation: "strtok() permite trocear la cadena ingresada por el usuario usando delimitadores (como el espacio) para separar el comando de sus parámetros.",
      hint: "La terminación 'tok' viene de 'Tokenize'."
    },
    {
      question: "¿Qué llamada al sistema permite obtener la dirección MAC de una interfaz de red?",
      options: ["getmac()", "ioctl() con SIOCGIFHWADDR", "socket(AF_PACKET)", "read(/proc/net/dev)"],
      correct: 1,
      explanation: "ioctl() con la constante SIOCGIFHWADDR se utiliza para consultar la dirección física (MAC) del hardware de red.",
      hint: "Es una función genérica de control de entrada/salida (I/O Control)."
    },
    {
      question: "¿Para qué sirve la llamada statvfs() implementada en el proyecto?",
      options: [
        "Para ver los permisos de un archivo",
        "Para obtener estadísticas del sistema de archivos (bloques totales/libres)",
        "Para listar los procesos activos",
        "Para verificar la versión del kernel"
      ],
      correct: 1,
      explanation: "statvfs() devuelve información sobre un sistema de archivos montado, permitiendo calcular el espacio total y disponible.",
      hint: "La terminación 'vfs' se refiere a Virtual File System."
    },
    {
      question: "Si el comando ingresado es 'cat hola.txt', ¿qué llamada al sistema se usa para abrir el archivo?",
      options: ["fopen()", "open()", "read()", "access()"],
      correct: 1,
      explanation: "open() es la llamada al sistema de bajo nivel utilizada por comandos como cat para obtener un descriptor de archivo y poder leer su contenido.",
      hint: "Es la operación básica opuesta a close()."
    }
  ];

  return (
    <div className="review-page animate-fadeInUp">
      <ChapterHeader 
        num="PROYECTO" 
        title="Evaluación Técnica: Minishell" 
        subtitle="Verifica tu comprensión sobre la implementación interna de los comandos de tu shell." 
      />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <MiniQuiz questions={questions} />
      </div>
    </div>
  );
}

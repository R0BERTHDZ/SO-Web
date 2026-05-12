"use client";
import React from 'react';
import MiniQuiz from './MiniQuiz';
import { ChapterHeader } from './Chapters12';

export default function UnitReview3() {
  const questions = [
    {
      question: "¿Cuál es la principal diferencia entre un pipe y un FIFO?",
      options: [
        "Los pipes son más rápidos que los FIFOs",
        "Los FIFOs tienen un nombre en el sistema de archivos, los pipes no",
        "Los pipes permiten comunicación entre procesos no emparentados",
        "No hay diferencia, son el mismo mecanismo"
      ],
      correct: 1,
      explanation: "Los FIFOs (Named Pipes) existen como archivos especiales en el disco, lo que permite que procesos sin relación de parentesco los abran por su nombre.",
      hint: "Piensa en cuál de los dos puedes ver usando el comando 'ls'."
    },
    {
      question: "¿Qué función se utiliza para generar una llave única (key_t) en mecanismos System V?",
      options: ["shmget()", "msgget()", "ftok()", "semget()"],
      correct: 2,
      explanation: "ftok() (File to Key) utiliza la identidad de un archivo existente y un identificador de proyecto para generar una llave numérica única.",
      hint: "La función utiliza la ruta de un archivo para generar el identificador."
    },
    {
      question: "¿Cuál es el mecanismo de IPC más rápido debido a que no requiere copiar datos al espacio del kernel?",
      options: ["Colas de Mensajes", "Tuberías", "Memoria Compartida", "Semáforos"],
      correct: 2,
      explanation: "La memoria compartida permite que dos procesos accedan al mismo espacio físico de RAM, evitando las llamadas al sistema read/write que implican copias al kernel.",
      hint: "Es el mecanismo que 'mapea' una región de RAM para múltiples procesos."
    },
    {
      question: "¿Qué comando de Linux permite visualizar los recursos IPC activos actualmente?",
      options: ["ps -ef", "ipcs", "lsipc", "ipcrm"],
      correct: 1,
      explanation: "El comando ipcs muestra información detallada sobre colas de mensajes, semáforos y segmentos de memoria compartida activos.",
      hint: "Abreviatura de IPC Status."
    },
    {
      question: "En un semáforo de System V, ¿qué estructura contiene los permisos y el UID del creador?",
      options: ["semid_ds", "ipc_perm", "msqid_ds", "shmid_ds"],
      correct: 1,
      explanation: "ipc_perm es una estructura común a todos los mecanismos IPC de System V que almacena los permisos de acceso y la propiedad del recurso.",
      hint: "Es la estructura de 'permisos' genérica para IPC."
    }
  ];

  return (
    <div className="review-page animate-fadeInUp">
      <ChapterHeader 
        num="REPASO" 
        title="Evaluación Unidad 3: Mecanismos IPC" 
        subtitle="Pon a prueba tus conocimientos sobre comunicación entre procesos en Linux." 
      />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <MiniQuiz questions={questions} />
      </div>
    </div>
  );
}

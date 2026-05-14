"use client";
import React from 'react';
import { ChapterHeader } from './Chapters12';
import FillInBlanks from './FillInBlanks';
import Crossword from './Crossword';
import WordSearch from './WordSearch';

export default function UnitReview3() {
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
    { number: 1, direction: "across" as const, row: 0, col: 0, answer: "FORK", clue: "Crea un clon exacto del proceso actual.", hint: "Devuelve 0 al hijo y el PID del hijo al padre." },
    { number: 2, direction: "down" as const, row: 0, col: 1, answer: "OPEN", clue: "Llamada para obtener un descriptor de archivo.", hint: "Se usa antes de read o write." },
    { number: 3, direction: "across" as const, row: 1, col: 1, answer: "PIPE", clue: "Mecanismo de comunicación unidireccional (tubería).", hint: "Se crea enviando un array de 2 enteros." },
    { number: 4, direction: "down" as const, row: 1, col: 4, answer: "EXEC", clue: "Sustituye la imagen del proceso por un nuevo programa.", hint: "Si tiene éxito, nunca regresa al código original." },
    { number: 5, direction: "across" as const, row: 5, col: 0, answer: "READ", clue: "Obtiene información desde un descriptor de archivo.", hint: "Se bloquea si el pipe está vacío." },
    { number: 6, direction: "down" as const, row: 4, col: 0, answer: "WRITE", clue: "Envía información a un descriptor de archivo.", hint: "Es la contraparte de read()." },
    { number: 7, direction: "across" as const, row: 8, col: 0, answer: "EXIT", clue: "Finaliza la ejecución de un proceso.", hint: "Envía un código de estado al padre." },
    { number: 8, direction: "down" as const, row: 6, col: 2, answer: "WAIT", clue: "El padre se bloquea hasta que un hijo termina.", hint: "Evita la creación de procesos zombies." }
  ];

  const globalWordSearchWords = [
    { 
      word: "KERNEL", 
      meaning: "El corazón del sistema operativo que se carga al arrancar y reside permanentemente en la memoria principal.", 
      importance: "Es el encargado de la gestión de recursos, el despacho de procesos, la administración de memoria y la interfaz de bajo nivel con el hardware." 
    },
    { 
      word: "INODO", 
      meaning: "Estructura de datos que contiene la descripción de un archivo, incluyendo su tamaño, permisos, propietario y ubicación física en el disco.", 
      importance: "Permite al sistema operativo localizar y gestionar archivos de manera eficiente sin depender del nombre del archivo, que es solo un enlace al inodo." 
    },
    { 
      word: "FTOK", 
      meaning: "Función (File To Key) utilizada para convertir la ruta de un archivo y un ID de proyecto en una clave única de tipo key_t.", 
      importance: "Es fundamental en System V IPC para que procesos independientes puedan 'acordar' una misma clave para acceder a una memoria compartida o cola de mensajes." 
    },
    { 
      word: "ZOMBIE", 
      meaning: "Estado de un proceso que ha finalizado su ejecución pero que aún permanece en la tabla de procesos del sistema.", 
      importance: "Indica que el proceso padre aún no ha ejecutado la llamada wait() para recolectar el estado de salida de su hijo, manteniendo ocupados recursos limitados del kernel." 
    },
    { 
      word: "PIPE", 
      meaning: "Mecanismo de comunicación unidireccional que conecta la salida estándar de un proceso con la entrada estándar de otro.", 
      importance: "Es la base de la filosofía Unix ('hacer una cosa y hacerla bien'), permitiendo encadenar comandos simples para realizar tareas complejas mediante el flujo de datos." 
    },
    { 
      word: "EXEC", 
      meaning: "Familia de funciones que cargan un nuevo programa binario en el espacio de memoria del proceso actual, reemplazando su código y datos.", 
      importance: "Permite que un proceso 'evolucione' a otro programa totalmente distinto después de haber sido creado mediante fork(), manteniendo el mismo PID." 
    },
    { 
      word: "WAIT", 
      meaning: "Llamada al sistema que suspende la ejecución del proceso padre hasta que uno de sus procesos hijos termine o cambie de estado.", 
      importance: "Es crucial para la sincronización de procesos y para la limpieza de recursos, evitando que el sistema se llene de procesos en estado zombie." 
    },
    { 
      word: "READDIR", 
      meaning: "Función de la librería dirent.h que lee la siguiente entrada de un flujo de directorio abierto previamente con opendir().", 
      importance: "Es la herramienta principal para implementar comandos como 'ls', permitiendo iterar sobre los nombres de archivos e inodos contenidos en una carpeta." 
    },
    { 
      word: "STAT", 
      meaning: "Llamada al sistema que devuelve información detallada sobre el estado de un archivo consultando directamente su inodo.", 
      importance: "Proporciona metadatos exactos como marcas de tiempo de acceso/modificación, tamaño en bytes y tipo de archivo (directorio, socket, etc.)." 
    },
    { 
      word: "SYSINFO", 
      meaning: "Función específica de Linux que devuelve estadísticas globales sobre el uso de recursos del sistema.", 
      importance: "Permite monitorear la carga del sistema, la cantidad de memoria RAM libre/total y el número de procesos activos en un momento dado." 
    },
    { 
      word: "IOCTL", 
      meaning: "Input/Output Control; una llamada al sistema para manipular los parámetros de dispositivos de caracteres y bloques.", 
      importance: "Se utiliza para operaciones que no encajan en el modelo estándar de lectura/escritura, como configurar tarjetas de red o interactuar con drivers específicos." 
    },
    { 
      word: "UNLINK", 
      meaning: "Llamada al sistema que elimina un nombre del sistema de archivos y decrementa el contador de enlaces del inodo correspondiente.", 
      importance: "Es la forma real en que se 'borra' un archivo; cuando el contador llega a cero y ningún proceso tiene el archivo abierto, el espacio en disco se libera." 
    },
    { 
      word: "FORK", 
      meaning: "Llamada al sistema que crea un nuevo proceso (hijo) que es una copia exacta del proceso llamador (padre).", 
      importance: "Es el único mecanismo en sistemas tipo Unix para iniciar nuevos procesos, permitiendo la multitarea y el paralelismo de forma robusta." 
    }
  ];

  return (
    <div className="review-page animate-fadeInUp">
      <ChapterHeader 
        num="REPASO GLOBAL" 
        title="Práctica Global de Sistemas Operativos" 
        subtitle="Consolida todos los conocimientos adquiridos a lo largo del curso mediante ejercicios interactivos." 
      />
      
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1rem" }}>
        {/* Completar Frases */}
        <FillInBlanks 
          title="Autocompletado: Conceptos Fundamentales" 
          items={fillInBlanksItems} 
        />

        <div style={{ margin: "4rem 0" }}></div>

        {/* Crucigrama Minishell */}
        <Crossword 
          title="Crucigrama: Llamadas al Sistema (Variación)"
          size={10}
          clues={minishellCrosswordClues}
        />

        <div style={{ margin: "4rem 0" }}></div>

        {/* Sopa de Letras */}
        <WordSearch 
          title="Sopa de Letras: Funciones IPC y Procesos"
          items={globalWordSearchWords}
        />
        
        <div style={{ margin: "4rem 0" }}></div>
      </div>
    </div>
  );
}

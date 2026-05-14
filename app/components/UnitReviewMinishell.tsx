"use client";
import React from 'react';
import FillInBlanks from './FillInBlanks';
import { ChapterHeader } from './Chapters12';

export default function UnitReviewMinishell() {
  return (
    <div className="review-page animate-fadeInUp">
      <ChapterHeader 
        num="PROYECTO" 
        title="Evaluación Técnica: Minishell" 
        subtitle="Verifica tu comprensión sobre la implementación interna de los comandos de tu shell." 
      />
      <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "3rem" }}>
        <FillInBlanks 
          title="Completar Llamadas al Sistema"
          items={[
            {
              id: 1,
              textBefore: "Para leer el contenido de un directorio con el comando ls, se usan las funciones opendir() y",
              textAfter: ".",
              answer: "readdir()",
              hint: "Lee la siguiente entrada de directorio."
            },
            {
              id: 2,
              textBefore: "Al ejecutar cd, la minishell cambia el directorio de trabajo actual invocando la llamada al sistema",
              textAfter: "() internamente.",
              answer: "chdir",
              hint: "CHange DIRectory."
            },
            {
              id: 3,
              textBefore: "Para extraer la memoria RAM libre del sistema (comando free), se utiliza la función y estructura",
              textAfter: "().",
              answer: "sysinfo",
              hint: "System Info."
            },
            {
              id: 4,
              textBefore: "Borrar un archivo a bajo nivel significa quitar el enlace duro de su inodo, para lo cual se invoca",
              textAfter: "().",
              answer: "unlink",
              hint: "Quitar el link (desvincular)."
            },
            {
              id: 5,
              textBefore: "El comando stat extrae los metadatos de un archivo (como tamaño y permisos) desde su respectivo",
              textAfter: "en el disco duro.",
              answer: "inodo",
              hint: "La estructura de datos principal de Unix para archivos."
            },
            {
              id: 6,
              textBefore: "Para imprimir el directorio de trabajo actual (pwd), la llamada correcta es",
              textAfter: "().",
              answer: "getcwd",
              hint: "Get Current Working Directory."
            },
            {
              id: 7,
              textBefore: "El comando who lee las sesiones de usuario iterando sobre los registros con la función",
              textAfter: "().",
              answer: "getutent",
              hint: "Get UTmp ENTry."
            },
            {
              id: 8,
              textBefore: "Para cambiar el nombre de un archivo o moverlo a otra ubicación (equivalente al comando mv), la shell invoca",
              textAfter: "().",
              answer: "rename",
              hint: "Renombrar en inglés."
            },
            {
              id: 9,
              textBefore: "El comando uname permite obtener información sobre el sistema (como Linux x86_64) utilizando la estructura llamada",
              textAfter: ".",
              answer: "utsname",
              hint: "Unix Time-Sharing Name."
            },
            {
              id: 10,
              textBefore: "La función que permite crear un nuevo directorio en el sistema de archivos recibiendo la ruta y los permisos numéricos es",
              textAfter: "().",
              answer: "mkdir",
              hint: "MaKe DIRectory."
            },
            {
              id: 11,
              textBefore: "Para leer un archivo en el comando cat, primero se debe obtener su descriptor de archivo usando la llamada",
              textAfter: "().",
              answer: "open",
              hint: "Lo contrario de close()."
            },
            {
              id: 12,
              textBefore: "El comando statvfs extrae la cantidad de bloques libres. Las siglas VFS significan",
              textAfter: ".",
              answer: "Virtual File System",
              hint: "Sistema de archivos abstracto del núcleo."
            },
            {
              id: 13,
              textBefore: "Para finalizar de forma limpia el ciclo principal de nuestra minishell y regresar el estado al SO, usamos",
              textAfter: "().",
              answer: "exit",
              hint: "Salida."
            },
            {
              id: 14,
              textBefore: "Al interpretar los comandos, la cadena de texto ingresada por el usuario es separada en múltiples tokens usando",
              textAfter: "().",
              answer: "strtok",
              hint: "STRing TOKenize."
            },
            {
              id: 15,
              textBefore: "Para obtener la dirección MAC de la tarjeta de red, la shell envía la solicitud SIOCGIFHWADDR mediante la llamada",
              textAfter: "().",
              answer: "ioctl",
              hint: "Input/Output ConTroL."
            }
          ]}
        />
      </div>
    </div>
  );
}

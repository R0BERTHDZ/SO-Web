"use client";
import React, { useState } from "react";
import ExamHint from "./ExamHint";

const QuestionBlock = ({ question, children, answer, hint }: { question?: React.ReactNode, children?: React.ReactNode, answer: React.ReactNode, hint?: string }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
      {question && <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>{question}</p>}
      {children}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginTop: "1rem" }}>
        <button 
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: showAnswer ? "var(--bg-secondary)" : "var(--accent-primary)", color: showAnswer ? "var(--text-primary)" : "white", border: "1px solid var(--border-color)", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
        >
          {showAnswer ? "Ocultar Respuesta Correcta" : "Ver Respuesta Correcta"}
        </button>
        {hint && <ExamHint hint={hint} />}
      </div>
      {showAnswer && (
         <div style={{ marginTop: "1rem", padding: "1.5rem", background: "rgba(239, 68, 68, 0.05)", borderLeft: "4px solid #ef4444", borderRadius: "8px", animation: "fadeIn 0.3s ease" }}>
           <h4 style={{ color: "#ef4444", margin: "0 0 0.5rem 0", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Respuesta Correcta</h4>
           <div style={{ color: "#ef4444", fontWeight: 600, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
             {answer}
           </div>
         </div>
      )}
    </div>
  )
}

export default function PartialExam3() {
  return (
    <section id="examen-parcial3" className="chapter-section animate-fadeInUp">
      <div style={{
        textAlign: "center",
        marginBottom: "3rem",
        padding: "2rem",
        background: "var(--bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        fontFamily: "'Times New Roman', Times, serif"
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <img src="https://pbs.twimg.com/profile_images/1846249200427978755/UzRncbfZ_400x400.png" alt="UTM Logo" style={{ height: "80px" }} />
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--accent-primary)", margin: "0" }}>UNIVERSIDAD TECNOLÓGICA DE LA MIXTECA</h2>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "var(--text-secondary)", margin: "0.2rem 0 0 0" }}>INGENIERÍA EN COMPUTACIÓN.</h3>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "var(--text-secondary)", margin: "0 0 1.5rem 0" }}>SISTEMAS OPERATIVOS 602-B.<br />300426</h3>

        <div style={{ textAlign: "left", marginTop: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
          <strong>Nombre:</strong>
        </div>
        <div style={{ textAlign: "left", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", color: "var(--text-secondary)" }}>
          <span><em>Examen (60%):</em> ____________________</span>
          <span><em>Tareas/programas (40%):</em> ____________________</span>
          <span><em>Final de la evaluación:</em> ____________________</span>
        </div>
        <div style={{ textAlign: "left", marginTop: "1.5rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
          Responda los siguientes ejercicios. Presiona "Ver Respuesta Correcta" para comprobar tus aciertos y comparar tu código. Sólo se permite consultar sus fichas con las sinopsis de funciones y estructuras respectivas.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)", borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "0" }}>
          I. TEORÍA
        </h3>

        <QuestionBlock
          question="1. (1 punto). Subraya el comando que despliega el estado del sistema de archivo"
          hint="¿Qué llamada al sistema o comando te proporciona la información completa de los inodos, permisos y tamaño de un archivo o directorio?"
          answer={<p>b) stat</p>}
        >
          <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", marginBottom: "1rem" }}>
            <span>a) ls -i</span>
            <span>b) stat</span>
            <span>c) statvfs</span>
            <span>d) statfs</span>
          </div>
        </QuestionBlock>

        <QuestionBlock
          question="2. (1 punto). Explica brevemente que hace el siguiente conjunto de comandos"
          hint="En Linux, todo es un archivo. El directorio /dev/ contiene archivos de dispositivos. tty1 es la primera consola virtual."
          answer={
            <p>Si estamos como privilegios de super usuario la línea anterior escribe el mensaje "hola mundo" a la terminar virtual 1.</p>
          }
        >
          <pre style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "1rem" }}>
            echo "hola mundo!" &gt; /dev/tty1
          </pre>
        </QuestionBlock>

        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)", borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem", marginTop: "1.5rem", marginBottom: "0" }}>
          II. PRACTICA. Programación en lenguaje C.
        </h3>

        <QuestionBlock
          question="Problema 1. (1 punto). Dada una ruta desde línea de comandos, muestre los respectivos inodos de los archivos que se encuentran dentro de ella."
          hint="Para recorrer el contenido de un directorio se utiliza la familia de funciones de dirent.h: opendir() para abrirlo, y readdir() en un bucle para leer cada entrada (struct dirent). El campo d_ino contiene el inodo."
          answer={
            <pre style={{ background: "none", padding: "0", color: "#ef4444", margin: "0", fontFamily: "monospace", fontSize: "0.95rem", overflowX: "auto" }}>
              #include &lt;stdio.h&gt;{"\n"}
              #include &lt;stdlib.h&gt;{"\n"}
              #include &lt;string.h&gt;{"\n"}
              #include &lt;dirent.h&gt;{"\n"}
              #include &lt;errno.h&gt;{"\n"}
              int main (int argc, char *argv[ ]){"{\n"}
              {"  "}DIR *directorio;{"\n"}
              {"  "}struct dirent *entradadir;{"\n"}
              {"  "}if (argc !=2 ){"{\n"}
              {"    "}fprintf (stderr, "Use: %s nombre_directorio \\n", argv[0]);{"\n"}
              {"    "}exit (EXIT_FAILURE);{"\n"}
              {"  }\n"}
              {"\n"}
              {"  "}if ( (directorio = opendir (argv[1]) )== NULL){"{\n"}
              {"    "}fprintf (stderr, "No puedo abrir el directorio %s. Error %s\\n", argv[1], strerror(errno));{"\n"}
              {"    "}exit(EXIT_FAILURE);{"\n"}
              {"  }\n"}
              {"  "}while ( (entradadir = readdir (directorio) ) != NULL){"\n"}
              {"    "}printf ("inodo: %d \\t%s\\n", (int)entradadir -&gt;d_ino, entradadir -&gt;d_name);{"\n"}
              {"  "}closedir (directorio);{"\n"}
              {"  "}return EXIT_SUCCESS;{"\n"}
              {"}"}
            </pre>
          }
        />

        <QuestionBlock
          question="Problema 2. (1 punto). Muestre el total de memoria ram y swap que tiene su sistema."
          hint="La biblioteca <sys/sysinfo.h> provee la función sysinfo() que llena una estructura con métricas del sistema. Los campos totalram y totalswap están en bytes, por lo que es útil dividirlos entre 1024 para pasarlos a KB."
          answer={
            <pre style={{ background: "none", padding: "0", color: "#ef4444", margin: "0", fontFamily: "monospace", fontSize: "0.95rem", overflowX: "auto" }}>
              #include &lt;stdio.h&gt;{"\n"}
              #include &lt;stdlib.h&gt;{"\n"}
              #include &lt;sys/sysinfo.h&gt;{"\n"}
              #define KB 1024{"\n"}
              int main (){"{\n"}
              {"  "}struct sysinfo si;{"\n"}
              {"  "}sysinfo (&si);{"\n"}
              {"  "}printf ("Total RAM:%ld \\n", si.totalram/KB);{"\n"}
              {"  "}printf ("Swap:%ld\\n",si.totalswap/KB);{"\n"}
              {"  "}return EXIT_SUCCESS;{"\n"}
              {"}"}
            </pre>
          }
        />

        <QuestionBlock
          question="Problema 3. (1 punto). Dado desde linea de comando el nombre de un dispositivo muestre su número mayo y menor"
          hint="Primero necesitas obtener la información del archivo con stat(). Si el archivo es un dispositivo, su campo st_rdev contiene la ID del dispositivo. Las macros major() y minor() de <sys/sysmacros.h> separan ese valor."
          answer={
            <pre style={{ background: "none", padding: "0", color: "#ef4444", margin: "0", fontFamily: "monospace", fontSize: "0.95rem", overflowX: "auto" }}>
              #include &lt;stdio.h&gt;{"\n"}
              #include &lt;stdlib.h&gt;{"\n"}
              #include &lt;sys/types.h&gt;{"\n"}
              #include &lt;sys/stat.h&gt;{"\n"}
              #include &lt;unistd.h&gt;{"\n"}
              #include &lt;sys/sysmacros.h&gt;{"\n"}
              {"\n"}
              int main(int argc, char *argv[]) {"{\n"}
              {"  "}struct stat sb;{"\n"}
              {"\n"}
              {"  "}if (argc != 2) {"{\n"}
              {"    "}fprintf(stderr, "Uso: %s &lt;ruta_dispositivo&gt;\\n", argv[0]); exit(EXIT_FAILURE);{"\n"}
              {"  }\n"}
              {"  "}// stat obtiene información sobre el archivo de dispositivo{"\n"}
              {"  "}if (stat(argv[1], &sb) == -1) {"{\n"}
              {"    "}perror("stat"); exit(EXIT_FAILURE);{"\n"}
              {"  }\n"}
              {"\n"}
              {"  "}// major() y minor() extraen los números correspondientes{"\n"}
              {"  "}printf("Número Mayor (Major): %u\\n", major(sb.st_rdev));{"\n"}
              {"  "}printf("Número Menor (Minor): %u\\n", minor(sb.st_rdev));{"\n"}
              {"\n"}
              {"  "}return EXIT_SUCCESS;{"\n"}
              {"}"}
            </pre>
          }
        />

        <QuestionBlock
          question="Problema 4. (1 punto). Explique en forma breve que realiza el siguiente fragmento de código"
          hint="La función getutent() lee secuencialmente registros del archivo utmp, que contiene información sobre los usuarios conectados actualmente al sistema. El bucle avanza hasta que encuentra al usuario pasado como argv[1]."
          answer={
            <p>Se obtiene y verifica linea por linea el archivo utmp para buscar la coincidencia con el parámetro de entrada de la posición 2, en caso de no encontrar la coinciencia termina sino se concatena a /dev/ la terminal virtual donde se encontró</p>
          }
        >
          <pre style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
            while (( utmp=getutent ( ))!=NULL && strncmp(utmp-&gt;ut_user,argv[1],8)!= 0);{"\n"}
            if (utmp == NULL) {"{\n"}
            {"  "}exit (0);{"\n"}
            {"}\n"}
            sprintf (terminal, "/dev/%s", utmp-&gt;ut_line);
          </pre>
        </QuestionBlock>

      </div>
    </section>
  );
}

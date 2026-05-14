import sys

partial2_content = """\
"use client";
import React, { useState } from "react";
import ExamHint from "./ExamHint";

const QuestionBlock = ({ question, children, answer, hint }: { question?: React.ReactNode, children?: React.ReactNode, answer: React.ReactNode, hint?: string }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  return (
    <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
      {question && <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>{question}</p>}
      {children}
      <textarea 
        placeholder="Escribe tu respuesta o razonamiento aquí..." 
        value={userAnswer}
        onChange={e => setUserAnswer(e.target.value)}
        style={{ width: "100%", minHeight: "80px", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "inherit", resize: "vertical" }}
        spellCheck={false}
      />
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
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

export default function PartialExam2() {
  return (
    <section id="examen-parcial2" className="chapter-section animate-fadeInUp">
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
        <h3 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "var(--text-secondary)", margin: "0.2rem 0 1.5rem 0" }}>INGENIERÍA EN COMPUTACIÓN. SISTEMAS OPERATIVOS 602-B. 200326</h3>

        <div style={{ textAlign: "left", marginTop: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
          <strong>Nombre:</strong>
        </div>
        <div style={{ textAlign: "left", marginTop: "0.5rem", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", color: "var(--text-secondary)" }}>
          <span><em>Examen (60%):</em> ____________________</span>
          <span><em>Tareas/programas (40%):</em> ____________________</span>
          <span><em>Final de la evaluación:</em> ____________________</span>
        </div>
        <div style={{ textAlign: "left", marginTop: "1.5rem", color: "var(--text-primary)" }}>
          Responda los siguientes cuestionamientos. Presiona "Ver Respuesta Correcta" para comprobar tus aciertos.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <QuestionBlock
          question="1. Responda sí/no y proporcione una breve explicación."
          hint="Recuerda qué sucede con la memoria cuando ejecutas fork() y qué significa Copy-on-Write (COW)."
          answer={
            <>
              <p>(a) Sí, dos procesos pueden ejecutar el mismo programa (ejecutar múltiples instancias de una aplicación).</p>
              <p>(b) No, en general. (Esto solo es posible con la técnica de copia en escritura -Copy-on-Write- durante la creación de un proceso hijo, y antes de que se haya realizado cualquier escritura)</p>
            </>
          }
        >
          <div style={{ marginBottom: "1rem" }}>
            <p>(a) ¿Pueden dos procesos ejecutar simultáneamente el mismo programa ejecutable?</p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>(b) ¿Pueden dos procesos en ejecución compartir la imagen completa del proceso en la memoria física (no solo partes de ella)?</p>
          </div>
        </QuestionBlock>

        <QuestionBlock
          question="2. Consideremos un proceso padre P que ha creado un proceso hijo C. Ahora, P finaliza mientras C sigue en ejecución. Responda sí/no y proporcione una breve explicación."
          hint="¿Qué pasa en la tabla de procesos de UNIX cuando cualquier proceso muere y su padre aún no ha hecho un wait()?"
          answer={
            <>
              <p>(a) No, será adoptado por init.</p>
              <p>(b) Sí, se convertirá en zombie hasta que el sistema (init) limpie su estado.</p>
            </>
          }
        >
          <div style={{ marginBottom: "1rem" }}>
            <p>(a) ¿Se convertirá C inmediatamente en un proceso zombie?</p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>(b) ¿Se convertirá P inmediatamente en un proceso zombie hasta que su proceso padre lo elimine?</p>
          </div>
        </QuestionBlock>

        <QuestionBlock
          question="3. Un proceso en modo usuario no puede ejecutar ciertas instrucciones de hardware privilegiadas. Responda Verdadero/Falso y proporcione una breve explicación."
          hint="Piensa en la seguridad del sistema: ¿debería cualquier programa de usuario poder acceder directamente al hardware o deshabilitar interrupciones?"
          answer={
            <p>Verdadero, algunas instrucciones en la arquitectura del conjunto de instrucciones de cada CPU solo se pueden ejecutar cuando la CPU está funcionando en modo privilegiado (por ejemplo, en el anillo 0 de las CPU Intel).</p>
          }
        />

        <QuestionBlock
          question="4. ¿Cuáles de las siguientes funciones de la biblioteca C NO corresponden directamente a llamadas al sistema (con nombres similares)? Es decir, ¿las implementaciones de cuáles de estas funciones de la biblioteca C NO son invocaciones directas de la llamada al sistema subyacente?"
          hint="Una llamada al sistema implica cambiar de modo usuario a modo kernel. ¿Medir la longitud de una cadena o invocar una shell requiere pedirle un servicio directo al núcleo?"
          answer={
            <>
              <p>(a) system, que ejecuta un comando de la shell bash.</p>
              <p>(d) strlen, que devuelve la longitud de una cadena.</p>
            </>
          }
        >
          <p>(a) system, que ejecuta un comando de la shell bash.</p>
          <p>(b) fork, que crea un nuevo proceso hijo.</p>
          <p>(c) exit, que finaliza el proceso actual.</p>
          <p>(d) strlen, que devuelve la longitud de una cadena.</p>
        </QuestionBlock>

        <QuestionBlock
          question="5. Consideremos un proceso P que ejecuta la llamada al sistema 'fork' dos veces. Es decir, ejecuta el siguiente código: int ret1 = fork(); int ret2 = fork(); ¿Cuántos hijos directos de P (es decir, procesos cuyo padre es P) y cuántos otros descendientes de P (es decir, procesos que no son hijos directos de P, pero cuyo abuelo, bisabuelo o algún otro ancestro es P) se crean con las líneas de código anteriores? Puede asumirse que todas las llamadas al sistema 'fork' se realizan correctamente."
          hint="Dibuja el árbol: P ejecuta el primer fork, lo que crea al hijo H1. Ahora, tanto P como H1 ejecutan el segundo fork de manera independiente. ¿Cuántos procesos nuevos se generaron?"
          answer={
            <>
              <p>(a) Se crean dos hijos directos de P.</p>
              <p>(d) Se crea un descendiente de P.</p>
            </>
          }
        >
          <p>(a) Se crean dos hijos directos de P.</p>
          <p>(b) Se crean cuatro hijos directos de P.</p>
          <p>(c) No se crea ningún otro descendiente de P.</p>
          <p>(d) Se crea un descendiente de P.</p>
        </QuestionBlock>

        <QuestionBlock
          question="6. Considere el siguiente programa en C. Suponga que no hay errores de sintaxis y que el programa se ejecuta correctamente. Suponga que las llamadas al sistema 'fork' se ejecutan correctamente. ¿Cuál es la salida que se imprime en pantalla cuando ejecutamos el siguiente programa?"
          hint="Para i=0 hay 1 proceso que hace fork y se crea 1 hijo. Para i=1, los 2 procesos anteriores hacen fork creando 2 hijos más. Observa cómo la cantidad de procesos se duplica en cada iteración."
          answer={
             <p>"hijo i" es impreso 2^i veces desde i=0 a 3</p>
          }
        >
          <pre style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
            void main(argc, argv){"{\n"}
            {"    "}for(int i = 0; i &lt; 4; i++) {"{\n"}
            {"        "}int ret = fork();{"\n"}
            {"        "}if(ret == 0){"{\n"}
            {"            "}printf("hijo %d\\n", i);{"\n"}
            {"        }\n"}
            {"    }\n"}
            {"}"}
          </pre>
        </QuestionBlock>

        <QuestionBlock
          question="7. Considere el siguiente pseudocódigo. Suponga que todas las llamadas al sistema se ejecutan correctamente y que no hay otros errores en el código."
          hint="El primer fork crea 1 proceso nuevo. En la segunda línea, 2 procesos ejecutan fork creando 2 nuevos. En la tercera línea, 4 procesos ejecutan fork creando 4 nuevos. En total habrá 8 procesos (P + 7 descendientes)."
          answer={
            <p>P tiene tres hijos, uno en cada instrucción 'fork': C11, C21 y C31. C11 tiene dos hijos en las instrucciones fork segunda y tercera respectivamente: C22 y C32. C21 y C22 también tienen un hijo cada uno en la tercera instrucción fork : C33 y C34.</p>
          }
        >
          <pre style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
            int ret1 = fork(); //fork1{"\n"}
            int ret2 = fork(); //fork2{"\n"}
            int ret3 = fork(); //fork3{"\n"}
            wait();{"\n"}
            wait();{"\n"}
            wait();
          </pre>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Llamemos P al proceso padre original de este programa. Dibuje o describa un árbol genealógico de P y todos sus descendientes (hijos, nietos, etc.) que se generan durante la ejecución de este programa. Su árbol debe tener como raíz P. Muestre los descendientes generados como nodos en el árbol y conecte los procesos relacionados por la relación padre-hijo con una flecha del padre al hijo. Asigne nombres del tipo C[número] a los descendientes, donde los procesos hijos creados por la instrucción 'fork' "i" deben tener números como "i1", "i2", etc.
          </p>
        </QuestionBlock>

        <QuestionBlock
          question="8. ¿Cuál es la salida que imprime el siguiente fragmento de pseudocódigo? Si cree que hay más de una respuesta posible dependiendo del orden de ejecución de los procesos, debe enumerar todas las posibles salidas."
          hint="Recuerda que la operación de lectura read() en una tubería se bloquea si no hay datos. Por lo tanto, el 'hijo2' no puede imprimirse hasta que el padre haya ejecutado write() enviando datos al pipe."
          answer={
            <ul>
              <li>Si el hijo se ejecuta antes que el padre: hijo1, padre1, hijo2, padre2.</li>
              <li>Si el padre se ejecuta antes que el hijo: padre1, hijo1, hijo2, padre2.</li>
            </ul>
          }
        >
          <pre style={{ background: "rgba(0,0,0,0.03)", padding: "1rem", borderRadius: "8px", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
            int fd[2];{"\n"}
            pipe(fd);{"\n"}
            int rc = fork();{"\n"}
            if(rc == 0) {"{"} //child{"\n"}
            {"  "}close(fd[1]);{"\n"}
            {"  "}printf("hijo1\\n");{"\n"}
            {"  "}read(fd[0], bufc, bufc_size);{"\n"}
            {"  "}printf("hijo2\\n");{"\n"}
            {"}\n"}
            else {"{"}//parent{"\n"}
            {"  "}close(fd[0]);{"\n"}
            {"  "}printf("padre1\\n");{"\n"}
            {"  "}write(fd[1], bufp, bufp_size);{"\n"}
            {"  "}wait();{"\n"}
            {"  "}printf("padre2\\n");{"\n"}
            {"}"}
          </pre>
        </QuestionBlock>

        <QuestionBlock
          question={<span>9. Indique cuales de las siguientes afirmaciones son correctas. <br/>La creación de una llave en los IPCs es importante debido a:</span>}
          hint="En System V IPC, procesos completamente independientes (que no son padre/hijo) necesitan una forma de 'encontrarse' y referenciar el mismo segmento de memoria o cola de mensajes. La llave generada por ftok() permite esto."
          answer={
            <>
              <p>(a) Identificar y localizar un recurso compartido de manera única y común entre múltiples procesos</p>
              <p>(c) Para que el kernel pueda vincularlo con procesos distintos al mismo recurso de comunicación.</p>
            </>
          }
        >
          <p>(a) Identificar y localizar un recurso compartido de manera única y común entre múltiples procesos</p>
          <p>(b) Darle un identificador a un archivo</p>
          <p>(c) Para que el kernel pueda vincularlo con procesos distintos al mismo recurso de comunicación.</p>
          <p>(d) El sistema operativo pueda conocer el ID del propietario del proceso</p>
        </QuestionBlock>

        <QuestionBlock
          question="10. Indique cuales de las siguientes afirmaciones son correctas. Una tubería con nombre:"
          hint="Recuerda que una tubería con nombre (FIFO) se crea con mkfifo() y aparece listada si haces un 'ls'. Además, por diseño, requiere que ambos extremos (lectura y escritura) estén conectados para comenzar a transmitir datos."
          answer={
            <>
              <p>(c) Ocupa una entrada en el directorio</p>
              <p>(d) Si un proceso la abre como escritura se bloquea hasta que otro abra como lectura y viceversa</p>
            </>
          }
        >
          <p>(a) Necesita que antes de usarla se genere una llave con ftok</p>
          <p>(b) Necesita que los procesos estén relacionados entre sí</p>
          <p>(c) Ocupa una entrada en el directorio</p>
          <p>(d) Si un proceso la abre como escritura se bloquea hasta que otro abra como lectura y viceversa</p>
        </QuestionBlock>

      </div>
    </section>
  );
}
"""

with open("/home/usuario/Documentos/sistemas_operativos_website/app/components/PartialExam2.tsx", "w") as f:
    f.write(partial2_content)

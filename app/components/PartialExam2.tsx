"use client";
import React from "react";
import ExamHint from "./ExamHint";

export default function PartialExam2() {
  return (
    <section id="examen-parcial2" className="chapter-section animate-fadeInUp">
      {/* Encabezado Institucional */}
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Escudo_UTM.png/220px-Escudo_UTM.png" alt="UTM Logo" style={{ height: "80px" }} />
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
          Responda los siguientes cuestionamientos sobre la misma hoja, utilizando lapicero azul o negro.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Pregunta 1 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            1. Responda sí/no y proporcione una breve explicación.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <p>(a) ¿Pueden dos procesos ejecutar simultáneamente el mismo programa ejecutable?</p>
            <p style={{ color: "#ef4444", fontWeight: 600 }}>
              (a) Sí, dos procesos pueden ejecutar el mismo programa (ejecutar múltiples instancias de una aplicación).
            </p>
          </div>
          <div>
            <p>(b) ¿Pueden dos procesos en ejecución compartir la imagen completa del proceso en la memoria física (no solo partes de ella)?</p>
            <p style={{ color: "#ef4444", fontWeight: 600 }}>
              (b) No, en general. (Esto solo es posible con la técnica de copia en escritura -Copy-on-Write- durante la creación de un proceso hijo, y antes de que se haya realizado cualquier escritura)
            </p>
          </div>
          <ExamHint hint="Recuerda qué sucede con la memoria cuando ejecutas fork() y qué significa Copy-on-Write (COW)." />
        </div>

        {/* Pregunta 2 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            2. Consideremos un proceso padre P que ha creado un proceso hijo C. Ahora, P finaliza mientras C sigue en ejecución. Responda sí/no y proporcione una breve explicación.
          </p>
          <div style={{ marginBottom: "1rem" }}>
            <p>(a) ¿Se convertirá C inmediatamente en un proceso zombie?</p>
            <p style={{ color: "#ef4444", fontWeight: 600 }}>No, será adoptado por init.</p>
          </div>
          <div>
            <p>(b) ¿Se convertirá P inmediatamente en un proceso zombie hasta que su proceso padre lo elimine?</p>
            <p style={{ color: "#ef4444", fontWeight: 600 }}>Sí</p>
          </div>
          <ExamHint hint="¿Qué pasa en la tabla de procesos de UNIX cuando cualquier proceso muere y su padre aún no ha hecho un wait()?" />
        </div>

        {/* Pregunta 3 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            3. Un proceso en modo usuario no puede ejecutar ciertas instrucciones de hardware privilegiadas. Responda Verdadero/Falso y proporcione una breve explicación.
          </p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>
            Verdadero, algunas instrucciones en la arquitectura del conjunto de instrucciones de cada CPU solo se pueden ejecutar cuando la CPU está funcionando en modo privilegiado (por ejemplo, en el anillo 0 de las CPU Intel).
          </p>
          <ExamHint hint="Piensa en la seguridad del sistema: ¿debería cualquier programa de usuario poder acceder directamente al hardware o deshabilitar interrupciones?" />
        </div>

        {/* Pregunta 4 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            4. ¿Cuáles de las siguientes funciones de la biblioteca C NO corresponden directamente a llamadas al sistema (con nombres similares)? Es decir, ¿las implementaciones de cuáles de estas funciones de la biblioteca C NO son invocaciones directas de la llamada al sistema subyacente?
          </p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(a) system, que ejecuta un comando de la shell bash.</p>
          <p>(b) fork, que crea un nuevo proceso hijo.</p>
          <p>(c) exit, que finaliza el proceso actual.</p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(d) strlen, que devuelve la longitud de una cadena.</p>
          <ExamHint hint="Una llamada al sistema implica cambiar de modo usuario a modo kernel. ¿Medir la longitud de una cadena o invocar una shell requiere pedirle un servicio directo al núcleo?" />
        </div>

        {/* Pregunta 5 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            5. Consideremos un proceso P que ejecuta la llamada al sistema 'fork' dos veces. Es decir, ejecuta el siguiente código: int ret1 = fork(); int ret2 = fork(); ¿Cuántos hijos directos de P (es decir, procesos cuyo padre es P) y cuántos otros descendientes de P (es decir, procesos que no son hijos directos de P, pero cuyo abuelo, bisabuelo o algún otro ancestro es P) se crean con las líneas de código anteriores? Puede asumirse que todas las llamadas al sistema 'fork' se realizan correctamente.
          </p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(a) Se crean dos hijos directos de P.</p>
          <p>(b) Se crean cuatro hijos directos de P.</p>
          <p>(c) No se crea ningún otro descendiente de P.</p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(d) Se crea un descendiente de P.</p>
          <ExamHint hint="Dibuja el árbol: P ejecuta el primer fork, lo que crea al hijo H1. Ahora, tanto P como H1 ejecutan el segundo fork de manera independiente. ¿Cuántos procesos nuevos se generaron?" />
        </div>

        {/* Pregunta 6 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            6. Considere el siguiente programa en C. Suponga que no hay errores de sintaxis y que el programa se ejecuta correctamente. Suponga que las llamadas al sistema 'fork' se ejecutan correctamente. ¿Cuál es la salida que se imprime en pantalla cuando ejecutamos el siguiente programa?
          </p>
          <pre style={{ background: "none", padding: "0", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
void main(argc, argv){"\n"}
{"{"}{"\n"}
{"    "}for(int i = 0; i &lt; 4; i++) {"{"}{"\n"}
{"        "}int ret = fork();{"\n"}
{"        "}if(ret == 0){"\n"}
{"            "}printf("hijo %d\n", i);{"\n"}
{"    "}{"}"}{"\n"}
{"}"}
          </pre>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>"hijo i" is impreso 2^i veces desde i=0 a 3</p>
          <ExamHint hint="Para i=0 hay 1 proceso que hace fork y se crea 1 hijo. Para i=1, los 2 procesos anteriores hacen fork creando 2 hijos más. Observa cómo la cantidad de procesos se duplica en cada iteración." />
        </div>

        {/* Pregunta 7 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            7. Considere el siguiente pseudocódigo. Suponga que todas las llamadas al sistema se ejecutan correctamente y que no hay otros errores en el código.
          </p>
          <pre style={{ background: "none", padding: "0", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
int ret1 = fork(); //fork1{"\n"}
int ret2 = fork(); //fork2{"\n"}
int ret3 = fork(); //fork3{"\n"}
wait();{"\n"}
wait();{"\n"}
wait();
          </pre>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            Llamemos P al proceso padre original de este programa. Dibuje o describa un árbol genealógico de P y todos sus descendientes (hijos, nietos, etc.) que se generan durante la ejecución de este programa. Su árbol debe tener como raíz P. Muestre los descendientes generados como nodos en el árbol y conecte los procesos relacionados por la relación padre-hijo con una flecha del padre al hijo. Asigne nombres del tipo C[número] a los descendientes, donde los procesos hijos creados por la instrucción 'fork' "i" deben tener números como "i1", "i2", etc. Por ejemplo, los procesos hijos creados por la instrucción `fork3` deben tener los nombres C31, C32, etc.
          </p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>
            P tiene tres hijos, uno en cada instrucción 'fork': C11, C21 y C31. C11 tiene dos hijos en las instrucciones fork segunda y tercera respectivamente: C22 y C32. C21 y C22 también tienen un hijo cada uno en la tercera instrucción fork : C33 y C34.
          </p>
          <ExamHint hint="El primer fork crea 1 proceso nuevo. En la segunda línea, 2 procesos ejecutan fork creando 2 nuevos. En la tercera línea, 4 procesos ejecutan fork creando 4 nuevos. En total habrá 8 procesos (P + 7 descendientes)." />
        </div>

        {/* Pregunta 8 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            8. ¿Cuál es la salida que imprime el siguiente fragmento de pseudocódigo? Si cree que hay más de una respuesta posible dependiendo del orden de ejecución de los procesos, debe enumerar todas las posibles salidas.
          </p>
          <pre style={{ background: "none", padding: "0", color: "var(--text-primary)", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.95rem" }}>
int fd[2];{"\n"}
pipe(fd);{"\n"}
int rc = fork();{"\n"}
if(rc == 0) {"{"} //child{"\n"}
close(fd[1]);{"\n"}
printf("hijo1\n");{"\n"}
read(fd[0], bufc, bufc_size);{"\n"}
printf("hijo2\n");{"\n"}
{"}"}{"\n"}
else {"{"}//parent{"\n"}
close(fd[0]);{"\n"}
printf("padre1\n");{"\n"}
write(fd[1], bufp, bufp_size);{"\n"}
wait();{"\n"}
printf("padre2\n");{"\n"}
{"}"}
          </pre>
          <ul style={{ color: "#ef4444", fontWeight: 600, margin: 0, paddingLeft: "1.5rem" }}>
            <li>Si el hijo se ejecuta antes que el padre: hijo1, padre1, hijo2, padre2.</li>
            <li>Si el padre se ejecuta antes que el hijo: padre1, hijo1, hijo2, padre2.</li>
          </ul>
          <ExamHint hint="Recuerda que la operación de lectura read() en una tubería se bloquea si no hay datos. Por lo tanto, el 'hijo2' no puede imprimirse hasta que el padre haya ejecutado write() enviando datos al pipe." />
        </div>

        {/* Pregunta 9 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            9. Indique cuales de las siguientes afirmaciones son correctas. <br/>
            La creación de una llave en los IPCs es importante debido a:
          </p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(a) Identificar y localizar un recurso compartido de manera única y común entre múltiples procesos</p>
          <p>(b) Darle un identificador a un archivo</p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(c) Para que el kernel pueda vincularlo con procesos distintos al mismo recurso de comunicación.</p>
          <p>(d) El sistema operativo pueda conocer el ID del propietario del proceso</p>
          <ExamHint hint="En System V IPC, procesos completamente independientes (que no son padre/hijo) necesitan una forma de 'encontrarse' y referenciar el mismo segmento de memoria o cola de mensajes. La llave generada por ftok() permite esto." />
        </div>

        {/* Pregunta 10 */}
        <div className="card" style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <p style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>
            10. Indique cuales de las siguientes afirmaciones son correctas. Una tubería con nombre
          </p>
          <p>(a) Necesita que antes de usarla se genere una llave con ftok</p>
          <p>(b) Necesita que los procesos estén relacionados entre sí</p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(c) Ocupa una entrada en el directorio</p>
          <p style={{ color: "#ef4444", fontWeight: 600 }}>(d) Si un proceso la abre como escritura se bloquea hasta que otro abra como lectura y viceversa</p>
          <ExamHint hint="Recuerda que una tubería con nombre (FIFO) se crea con mkfifo() y aparece listada si haces un 'ls'. Además, por diseño, requiere que ambos extremos (lectura y escritura) estén conectados para comenzar a transmitir datos." />
        </div>

      </div>
    </section>
  );
}

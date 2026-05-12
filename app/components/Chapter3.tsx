"use client";
import CodeBlock from "./CodeBlock";
import { CODE } from "./codeSnippets";
import MatchPairs from "./MatchPairs";
import MiniQuiz from "./MiniQuiz";
import WordSearch from "./WordSearch";
import Crossword from "./Crossword";

function InfoCard({ title, items }: { title: string; items: string[] }) {
  const themeColor = "var(--accent-primary)";
  return (
    <div className="card" style={{ borderColor: "rgba(0,0,0,0.08)", marginBottom: "1.5rem" }}>
      <h4 style={{ color: themeColor, fontWeight: 700, marginBottom: "0.75rem", fontSize: "1rem" }}>{title}</h4>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item, i) => (
          <li key={i} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", display: "flex", gap: "0.5rem", lineHeight: 1.5 }}>
            <span style={{ color: themeColor, flexShrink: 0 }}>▸</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: "2.5rem", border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", background: "var(--bg-card)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
      <div style={{ background: "rgba(155, 28, 46, 0.05)", padding: "1.8rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ width: "fit-content", padding: "0.2rem 0.8rem", height: "36px", minWidth: "36px", borderRadius: "18px", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", flexShrink: 0 }}>
          {num}
        </div>
        <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 900, color: "var(--accent-primary)", letterSpacing: "-0.02em" }}>{title}</h2>
      </div>
      <div style={{ padding: "1.5rem", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
        {subtitle}
      </div>
    </div>
  );
}

function SectionText({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>{children}</p>;
}
function DidYouKnow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      gap: "1.2rem",
      background: "rgba(245, 158, 11, 0.08)",
      border: "1px solid rgba(245, 158, 11, 0.2)",
      borderRadius: "16px",
      padding: "1.5rem 2rem",
      margin: "2.5rem 0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
      alignItems: "flex-start",
      animation: "fadeInUp 0.6s ease-out"
    }}>
      <div style={{ fontSize: "2.2rem", color: "#f59e0b", lineHeight: 1, filter: "drop-shadow(0 4px 10px rgba(245,158,11,0.2))" }}>
        💡
      </div>
      <div>
        <h4 style={{ color: "#f59e0b", fontWeight: 900, margin: "0 0 0.5rem 0", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>¿Sabías que...?</h4>
        <p style={{ color: "var(--text-primary)", margin: 0, fontSize: "1rem", lineHeight: 1.7, fontWeight: 500 }}>{children}</p>
      </div>
    </div>
  );
}

// 3.0 Introducción IPC
export function Chapter3_Intro() {
  return (
    <section id="ipc-intro" className="chapter-section animate-fadeInUp">
      <ChapterHeader 
        num="3" 
        title="Mecanismos de comunicación entre procesos (IPC)" 
        subtitle="Todos los procesos, parientes o no, necesitan en ocasiones comunicarse entre sí para cooperar y compartir información." 
      />

      <div className="card" style={{ marginBottom: "2.5rem", padding: "2.5rem", borderRadius: "20px", background: "rgba(16, 185, 129, 0.03)", borderLeft: "6px solid #10b981", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
        <SectionText>
          El sistema operativo brinda formas básicas de comunicación que se dividen principalmente en dos tipos:
        </SectionText>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1rem" }}>
          <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
            <h4 style={{ color: "#10b981", fontWeight: 900, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem" }}>
              <span style={{ fontSize: "1.4rem" }}>🌊</span> Streams (Flujos)
            </h4>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Comunicación continua y secuencial. Incluye <strong>pipes</strong>, <strong>FIFOs</strong> y <strong>sockets de flujo</strong>.
            </p>
          </div>
          <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", border: "1px solid var(--border-color)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
            <h4 style={{ color: "#3b82f6", fontWeight: 900, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.1rem" }}>
              <span style={{ fontSize: "1.4rem" }}>✉️</span> Mensajes
            </h4>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Comunicación por bloques discretos. Incluye <strong>colas de mensajes</strong> y <strong>sockets de datagramas</strong>.
            </p>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <SectionText>
            Si los procesos son parientes, la comunicación se puede realizar por medio de una <strong>tubería o pipe</strong>. Para proteger el medio de comunicación, se utilizan mecanismos de sincronización:
          </SectionText>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li style={{ display: "flex", gap: "0.8rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#10b981" }}>✔</span> <strong>System V:</strong> Requieren una <em>llave</em> para acceder a los recursos compartidos.
            </li>
            <li style={{ display: "flex", gap: "0.8rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#10b981" }}>✔</span> <strong>POSIX:</strong> Sincronización mediante llamados a funciones estándar sin necesidad de llaves.
            </li>
          </ul>
        </div>
      </div>

      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ color: "var(--accent-primary)" }}>●</span> 3.1 Comunicación mediante tuberías
      </h3>

      <SectionText>
        La comunicación entre procesos es fundamental para que intercambien datos. Para llevar a cabo dicha comunicación, hay que tener en consideración, en primer lugar, <strong>si los procesos se van a comunicar en la misma máquina y si están emparentados</strong>, y segundo, si estos se van a comunicar desde <strong>máquinas diferentes</strong>.
      </SectionText>

      <div style={{ background: "rgba(0,0,0,0.02)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
        <SectionText>
          Las tuberías son mecanismos clásicos de comunicación entre dos o más procesos <strong>emparentados y en la misma máquina</strong>. La teoría que se muestra a continuación está basada en las facilidades de comunicación entre procesos de los sistemas <strong>UNIX System V</strong> y derivados. Para iniciar este recorrido, se presentan las tuberías como las formas más básicas de comunicación entre procesos.
        </SectionText>
      </div>
    </section>
  );
}

// 3.1.1 Tuberías sin nombre
export function Chapter3_1_1() {
  return (
    <section id="pipe" className="chapter-section animate-fadeInUp">
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>3.1.1 Tuberías sin nombre - pipe</h3>
      
      <SectionText>
        Las tuberías sin nombre, también llamadas <strong>pipe</strong>, son una de las formas más antiguas de IPC y son proporcionadas por todos los sistemas UNIX y derivados. Su facilidad de uso permite una implementación sencilla, aunque presentan dos limitaciones fundamentales:
      </SectionText>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { id: 1, text: "Los datos fluyen en una sola dirección (unidireccionales)." },
          { id: 2, text: "Solo pueden usarse entre procesos que tienen un ancestro común (parentesco)." }
        ].map(item => (
          <div key={item.id} style={{ flex: 1, minWidth: "250px", padding: "1rem 1.5rem", background: "var(--bg-card)", border: "1px solid rgba(155, 28, 46, 0.15)", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", display: "flex", gap: "0.8rem", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold", flexShrink: 0 }}>{item.id}</div>
            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 500 }}>{item.text}</span>
          </div>
        ))}
      </div>

      <SectionText>
        Normalmente, una tubería es creada por un proceso que invoca a la función <code>fork()</code>, utilizándose entre el proceso creador y su descendiente. Se crea llamando a la función <code>pipe()</code> o <code>pipe2()</code> (específica de GNU/Linux desde v2.6.27).
      </SectionText>

      <DidYouKnow>
        Las tuberías (pipes) fueron inventadas por <strong>Douglas McIlroy</strong> en 1972. Su idea era que los programas deberían ser como piezas de una tubería de jardín: podías conectar la salida de uno a la entrada de otro para crear herramientas complejas a partir de componentes simples.
      </DidYouKnow>

      <div style={{ margin: "2rem 0", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ background: "rgba(155, 28, 46, 0.08)", color: "var(--accent-primary)", padding: "1rem 1.5rem", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border-color)" }}>
          Prototipos de las Funciones
        </div>
        <div style={{ padding: "1.5rem" }}>
          <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
            <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;unistd.h&gt;</span><br/><br/>
            <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>pipe</span> (<span style={{ color: "#059669" }}>int</span> filedes[<span style={{ color: "#be123c" }}>2</span>]);<br/>
            <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>pipe2</span> (<span style={{ color: "#059669" }}>int</span> filedes[<span style={{ color: "#be123c" }}>2</span>], <span style={{ color: "#059669" }}>int</span> flags);
          </pre>
        </div>
      </div>

      <SectionText>
        El valor retornado es <strong>0</strong> si la operación es exitosa y <strong>-1</strong> en caso de error. Los descriptores se retornan en <code>filedes</code>:<br/>
        • <code>filedes[0]</code>: Tubería abierta para <strong>LECTURA</strong>.<br/>
        • <code>filedes[1]</code>: Tubería abierta para <strong>ESCRITURA</strong>.
      </SectionText>

      <div style={{ background: "rgba(59,130,246,0.03)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(59,130,246,0.1)", marginBottom: "2.5rem" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2563eb", marginBottom: "1rem" }}>Banderas (flags) en pipe2()</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>O_CLOEXEC:</strong> Establece el indicador de cierre al ejecutar (FD_CLOEXEC).
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>O_DIRECT:</strong> Crea una tubería en modo "paquete" (GNU/Linux 3.4+). Consideraciones importantes:
            <ul style={{ fontSize: "0.85rem", marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>Escrituras mayores a <code>PIPE_BUF</code> bytes se dividen en varios paquetes.</li>
              <li>Si <code>read</code> usa un búfer menor al paquete, se lee lo solicitado y el resto se descarta.</li>
              <li>No se admiten paquetes de longitud cero.</li>
            </ul>
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>O_NONBLOCK:</strong> Establece el indicador de no bloqueo para los descriptores de archivo.
          </li>
        </ul>
      </div>

      <CodeBlock 
        title="pipe_padre_hijo.c" 
        code={`<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-kw">#define</span> MAXLINEA <span class="code-num">80</span>

<span class="code-type">int</span> <span class="code-fn">main</span> ()
{
    <span class="code-type">int</span> n, fd[<span class="code-num">2</span>];
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">char</span> linea [MAXLINEA];
    
    <span class="code-kw">if</span> (<span class="code-fn">pipe</span>(fd) &lt; <span class="code-num">0</span>) {
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"error de pipe"</span>);
        <span class="code-fn">exit</span>(<span class="code-num">0</span>);
    }
    
    <span class="code-kw">if</span> ( (hijo = <span class="code-fn">fork</span>() ) &lt; <span class="code-num">0</span>) {
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"error de fork"</span>);
        <span class="code-fn">exit</span>(EXIT_FAILURE);
    }
    <span class="code-kw">else if</span> (hijo &gt; <span class="code-num">0</span>) { <span class="code-cmt">/* proceso padre */</span>
        <span class="code-fn">close</span> (fd[<span class="code-num">0</span>]);
        <span class="code-fn">write</span> (fd[<span class="code-num">1</span>], <span class="code-str">"hola mundo\\n"</span>, <span class="code-num">12</span>);
    }
    <span class="code-kw">else</span> { <span class="code-cmt">/* proceso hijo */</span>
        <span class="code-fn">close</span> (fd[<span class="code-num">1</span>]);
        n = <span class="code-fn">read</span> (fd[<span class="code-num">0</span>], linea, MAXLINEA);
        <span class="code-fn">write</span> (STDOUT_FILENO, linea, n);
    }
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`} 
        explanation="Esquema básico donde el padre crea la tubería, cierra el extremo de lectura y escribe datos que el hijo recibe cerrando su extremo de escritura."
      />

      <SectionText>
        En ocasiones el padre se ejecuta más rápido que el hijo, lo que permite intercambiar el orden de las operaciones para asegurar la recepción:
      </SectionText>

      <CodeBlock 
        title="pipe_hijo_padre.c" 
        code={`<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-kw">#define</span> MAXLINE <span class="code-num">80</span>

<span class="code-type">int</span> <span class="code-fn">main</span> ()
{
    <span class="code-type">int</span> n, fd[<span class="code-num">2</span>];
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">char</span> linea[MAXLINE];
    
    <span class="code-kw">if</span> (<span class="code-fn">pipe</span>(fd) &lt; <span class="code-num">0</span>) { 
        <span class="code-fn">fprintf</span> (stderr, <span class="code-str">"error de tubería"</span>); 
        <span class="code-fn">exit</span>(EXIT_FAILURE); 
    }
    
    <span class="code-kw">if</span> ( (hijo=<span class="code-fn">fork</span>()) == <span class="code-num">0</span>) { <span class="code-cmt">/* hijo escribe */</span>
        <span class="code-fn">close</span> (fd[<span class="code-num">0</span>]);
        <span class="code-fn">write</span> (fd[<span class="code-num">1</span>], <span class="code-str">"hola mundo \\n"</span>, <span class="code-num">12</span>);
    }
    <span class="code-kw">else</span> { <span class="code-cmt">/* padre lee */</span>
        <span class="code-fn">close</span> (fd[<span class="code-num">1</span>]);
        n = <span class="code-fn">read</span> (fd[<span class="code-num">0</span>], linea, MAXLINE);
        <span class="code-fn">write</span> (STDOUT_FILENO, linea, n);
        <span class="code-fn">printf</span>(<span class="code-str">"numero de lineas %d \\n"</span>, n);
    }
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`} 
        explanation="Variante donde el hijo es quien envía el mensaje al padre."
      />

      <WordSearch 
        title="Sopa de Letras: Comunicación (IPC)" 
        items={[
            { 
              word: "PIPE", 
              meaning: "Es un mecanismo de comunicación unidireccional que conecta la salida estándar de un proceso con la entrada estándar de otro. En Linux, se implementa como un búfer en el Kernel de tamaño limitado.", 
              importance: "Es la base de la filosofía Unix de construir herramientas simples que trabajen juntas. Permite el encadenamiento de comandos complejos (como 'ls | grep txt') de manera extremadamente eficiente y sin archivos temporales.",
              hint: "Tubería simple unidireccional."
            },
            { 
              word: "FIFO", 
              meaning: "También conocida como tubería con nombre (named pipe), es una extensión del concepto de pipe que aparece como un archivo en el sistema de archivos pero funciona como un canal de comunicación.", 
              importance: "A diferencia de los pipes tradicionales que requieren procesos con ancestros comunes (padre-hijo), las FIFOs permiten que procesos totalmente independientes se comuniquen simplemente abriendo el archivo especial.",
              hint: "Tubería con nombre (First In, First Out)."
            },
            { 
              word: "SOCKET", 
              meaning: "Es una abstracción que representa un punto final (endpoint) de comunicación bidireccional. Puede usarse tanto para comunicación local en el mismo host como para comunicación a través de redes IP.", 
              importance: "Es la tecnología fundamental de Internet. Permite que aplicaciones como navegadores web o servidores de bases de datos intercambien información de manera estandarizada independientemente del sistema operativo.",
              hint: "Punto final de comunicación (redes)."
            },
            { 
              word: "MENSAJE", 
              meaning: "Representa una unidad discreta de información que se envía a una cola de mensajes gestionada por el SO. Cada mensaje puede tener un tipo asociado para permitir lecturas selectivas por prioridad.", 
              importance: "Facilita la comunicación asíncrona: el emisor no necesita esperar a que el receptor esté listo. Esto desacopla los componentes del sistema, permitiendo que cada proceso trabaje a su propio ritmo sin bloquearse.",
              hint: "Unidad de información en una cola (IPC)."
            },
            { 
              word: "BUFFER", 
              meaning: "Es un área de almacenamiento temporal (memoria intermedia) que se utiliza para guardar datos mientras se transfieren entre dos ubicaciones, como un proceso emisor y un proceso receptor.", 
              importance: "Sincroniza procesos que operan a diferentes velocidades. Sin búferes, un emisor rápido se vería obligado a detenerse constantemente para esperar a un receptor lento, degradando significativamente el rendimiento del sistema.",
              hint: "Espacio de memoria temporal para datos."
            },
            { 
              word: "STREAM", 
              meaning: "Representa un flujo continuo y secuencial de bytes de datos. A diferencia de los mensajes, el stream no conserva los límites de los datos originales; es como leer o escribir en un archivo infinito.", 
              importance: "Es el modelo de datos más flexible. Permite procesar grandes volúmenes de información en tiempo real sin necesidad de cargar todo el contenido en memoria de una sola vez, ideal para multimedia o logs masivos.",
              hint: "Flujo continuo de datos."
            },
            { 
              word: "LECTURA", 
              meaning: "Es la operación fundamental del sistema mediante la cual un proceso solicita datos desde un descriptor de archivo, una tubería o un socket. Es una operación que puede ser bloqueante o no bloqueante.", 
              importance: "Es el punto donde el flujo de datos se convierte en información útil para el programa. La correcta gestión de lecturas (evitando lecturas parciales o bloqueos infinitos) es crítica para la robustez del software de sistema.",
              hint: "Operación 'read' del sistema."
            },
            { 
              word: "FLUJO", 
              meaning: "Se refiere a la trayectoria y el control del movimiento de los datos a través del sistema. El flujo puede ser de entrada (input), salida (output) o error estándar, y puede ser redirigido dinámicamente.", 
              importance: "Controlar el flujo es controlar la lógica del sistema multiproceso. Permite la redirección de resultados, el registro de errores en archivos y la orquestación de complejas tuberías de procesamiento de datos en paralelo.",
              hint: "Camino de los datos (Input/Output)."
            }
        ]} 
        size={10} 
      />
    </section>
  );
}

// 3.1.2 Tuberías con nombre
export function Chapter3_1_2() {
  return (
    <section id="fifo" className="chapter-section animate-fadeInUp">
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>3.1.2 Tuberías con nombre - fifo</h3>
      
      <SectionText>
        El sistema de llamado <code>mkfifo()</code> permite crear un archivo especial llamado <strong>FIFO</strong>, el cual es una tubería con un nombre asociado en el sistema de archivos. A diferencia de las tuberías anónimas (que son efímeras y solo para procesos emparentados), un FIFO tiene una ruta física (path) y puede comunicar procesos completamente independientes.
      </SectionText>

      <div style={{ margin: "2rem 0", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ background: "rgba(155, 28, 46, 0.08)", color: "var(--accent-primary)", padding: "1rem 1.5rem", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border-color)" }}>
          Prototipo de la Función
        </div>
        <div style={{ padding: "1.5rem" }}>
          <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
            <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;sys/types.h&gt;</span><br/>
            <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;sys/stat.h&gt;</span><br/><br/>
            <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>mkfifo</span>(<span style={{ color: "#059669" }}>const char</span> *pathname, <span style={{ color: "#059669" }}>mode_t</span> mode);
          </pre>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "2.5rem", borderLeft: "4px solid #f59e0b" }}>
        <h4 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Parámetros y Retorno</h4>
        <SectionText>
          • <code>pathname</code>: Nombre y ruta donde se creará el archivo FIFO.<br/>
          • <code>mode</code>: Permisos (atributos) del archivo.<br/>
          • <strong>Retorno</strong>: 0 en éxito, -1 en error (estableciendo <code>errno</code>).
        </SectionText>
      </div>

      <div style={{ background: "rgba(245, 158, 11, 0.05)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(245, 158, 11, 0.2)", marginBottom: "2.5rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#b45309", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ⚠️ Comportamiento de Bloqueo
        </h4>
        <p style={{ margin: 0, fontSize: "0.95rem", color: "#92400e", lineHeight: 1.6 }}>
          Un FIFO debe estar <strong>abierto en ambos extremos simultáneamente</strong> antes de que pueda realizarse cualquier operación de E/S. Abrir un FIFO para lectura normalmente <strong>bloquea</strong> el proceso hasta que otro proceso abre el mismo FIFO para escritura, y viceversa.
        </p>
      </div>

      <CodeBlock 
        title="mkfifo_comunicacion.c" 
        code={`<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/stat.h&gt;</span>
<span class="code-inc">#include &lt;fcntl.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span> (<span class="code-type">void</span>)
{
    <span class="code-type">pid_t</span> hijo;
    <span class="code-type">int</span> file;
    <span class="code-type">char</span> mensaje[<span class="code-num">20</span>];
    
    <span class="code-fn">unlink</span>(<span class="code-str">"namepipe"</span>); <span class="code-cmt">// borra el archivo si ya existe</span>
    <span class="code-fn">umask</span>(~<span class="code-num">0666</span>); <span class="code-cmt">// ajusta máscara de permisos</span>
    
    <span class="code-kw">if</span>(<span class="code-fn">mkfifo</span>(<span class="code-str">"namepipe"</span>,<span class="code-num">0666</span>)==-<span class="code-num">1</span>) {
        <span class="code-fn">perror</span>(<span class="code-str">"error en mkfifo"</span>);
        <span class="code-fn">exit</span>(EXIT_FAILURE);
    }
    
    <span class="code-kw">if</span> ( (hijo=<span class="code-fn">fork</span> ( ))== <span class="code-num">0</span>) { <span class="code-cmt">/* proceso hijo */</span>
        <span class="code-fn">fprintf</span> (stdout,<span class="code-str">"soy el hijo, ID=%ld\\n"</span>,(<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
        <span class="code-kw">if</span>( (file=<span class="code-fn">open</span>(<span class="code-str">"namepipe"</span>,O_WRONLY) ) ==-<span class="code-num">1</span>) {
            <span class="code-fn">perror</span>(<span class="code-str">"error en open O_WRONLY"</span>);
            <span class="code-fn">exit</span>(EXIT_FAILURE);
        }
        <span class="code-fn">write</span> (file,<span class="code-str">"soy el hijo,ID...\\n"</span>,<span class="code-num">20</span>);
        <span class="code-fn">close</span>(file);
        <span class="code-kw">return</span> EXIT_SUCCESS;
    }
    
    <span class="code-kw">if</span> (hijo &gt; <span class="code-num">0</span>) { <span class="code-cmt">/* proceso padre */</span>
        <span class="code-fn">fprintf</span> (stdout,<span class="code-str">"soy el padre, ID = %ld\\n"</span>,(<span class="code-type">long</span>)<span class="code-fn">getpid</span>());
        <span class="code-kw">if</span>((file=<span class="code-fn">open</span>(<span class="code-str">"namepipe"</span>,O_RDONLY))==-1) {
            <span class="code-fn">perror</span>(<span class="code-str">"error en open O_RDONLY"</span>);
            <span class="code-fn">exit</span>(EXIT_FAILURE);
        }
        <span class="code-fn">read</span>(file,mensaje,<span class="code-num">20</span>);
        <span class="code-fn">fprintf</span>(stdout,<span class="code-str">"%s\\n"</span>,mensaje );
        <span class="code-fn">close</span>(file);
    }
    <span class="code-kw">return</span> EXIT_SUCCESS;
}`} 
        explanation="El padre crea el FIFO y espera a que el hijo lo abra para escritura. La función open() bloquea hasta que ambos extremos están listos."
      />

      <MiniQuiz 
        title="Evaluación: Pipes vs Fifos"
        questions={[
          {
            question: "¿Por qué el Kernel bloquea automáticamente el proceso que intenta leer (read) de una tubería vacía?",
            options: [
              "Por un bug en el diseño de UNIX.",
              "Para sincronizar implícitamente a los procesos: el lector duerme sin gastar CPU hasta que el escritor deposite datos.",
              "Para evitar que el disco duro se sature de lecturas nulas.",
              "Para lanzar una señal SIGKILL al proceso."
            ],
            correct: 1,
            explanation: "Las tuberías ofrecen Sincronización Automática. Si llamas read() y no hay datos, el proceso se suspende, cediendo la CPU a otros procesos, hasta que se escriba algo. Esto evita gastar el 100% de la CPU en un bucle infinito (busy waiting)."
          }
        ]}
      />
    </section>
  );
}

// 3.2.1 Mecanismos IPC derivados de System V (Intro)
export function Chapter3_2_1() {
  return (
    <section id="llaves" className="chapter-section animate-fadeInUp">
      <ChapterHeader 
        num="3.2" 
        title="Mecanismos IPC derivados de System V" 
        subtitle="El paquete de comunicación entre procesos de los sistemas UNIX System V y derivados, como GNU/Linux, se compone de tres mecanismos fundamentales." 
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", border: "1px solid var(--border-color)" }}>
          <h4 style={{ color: "var(--accent-primary)", fontWeight: 800, marginBottom: "0.8rem" }}>1. Semáforos</h4>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Permiten sincronizar procesos y proteger secciones críticas.
          </p>
        </div>
        <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", border: "1px solid var(--border-color)" }}>
          <h4 style={{ color: "var(--accent-primary)", fontWeight: 800, marginBottom: "0.8rem" }}>2. Memoria Compartida</h4>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Permite que los procesos compartan su espacio de direcciones virtuales.
          </p>
        </div>
        <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.02)", border: "1px solid var(--border-color)" }}>
          <h4 style={{ color: "var(--accent-primary)", fontWeight: 800, marginBottom: "0.8rem" }}>3. Colas de Mensajes</h4>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Posibilitan el intercambio de datos con un formato determinado.
          </p>
        </div>
      </div>

      <SectionText>
        Estos mecanismos están implementados como una unidad y comparten características comunes fundamentales:
      </SectionText>

      <div className="card" style={{ marginBottom: "2.5rem", padding: "2rem", borderLeft: "4px solid #10b981", background: "rgba(16, 185, 129, 0.02)" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            "Una tabla con entradas que describen el uso del mecanismo.",
            "Una llave numérica (key_t) elegida por el usuario para cada entrada de la tabla.",
            "Llamada “get” para crear o recuperar entradas. Incluye una llave y una máscara de indicadores. El núcleo busca la entrada que se ajuste a la llave suministrada.",
            "Registro de permisos en cada entrada: ID del usuario y grupo del proceso que reservó la entrada.",
            "Información de estado: incluye el identificador del último proceso que ha utilizado la entrada.",
            "Llamada de “control” para leer, modificar el estado de una entrada reservada o liberarla."
          ].map((feature, i) => (
            <li key={i} style={{ display: "flex", gap: "0.8rem", fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              <span style={{ color: "#10b981", fontWeight: "bold" }}>●</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Tabla 3-1: Resumen de mecanismos IPC System V</h3>
      
      <div style={{ overflowX: "auto", marginBottom: "3rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-card)", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ background: "rgba(155, 28, 46, 0.1)", color: "var(--accent-primary)" }}>
              <th style={{ padding: "1.2rem", textAlign: "left", fontWeight: 900, borderBottom: "2px solid var(--accent-primary)" }}>Característica</th>
              <th style={{ padding: "1.2rem", textAlign: "center", fontWeight: 900, borderBottom: "2px solid var(--accent-primary)" }}>Semáforos</th>
              <th style={{ padding: "1.2rem", textAlign: "center", fontWeight: 900, borderBottom: "2px solid var(--accent-primary)" }}>Memoria compartida</th>
              <th style={{ padding: "1.2rem", textAlign: "center", fontWeight: 900, borderBottom: "2px solid var(--accent-primary)" }}>Cola de mensajes</th>
            </tr>
          </thead>
          <tbody style={{ color: "var(--text-secondary)" }}>
            <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
              <td style={{ padding: "1.2rem", fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Bibliotecas Comunes</td>
              <td colSpan={3} style={{ padding: "1.2rem", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>&lt;sys/types.h&gt;, &lt;sys/ipc.h&gt;</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
              <td style={{ padding: "1.2rem", fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Biblioteca Específica</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>&lt;sys/sem.h&gt;</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>&lt;sys/shm.h&gt;</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>&lt;sys/msg.h&gt;</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
              <td style={{ padding: "1.2rem", fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Crear o abrir (get)</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--accent-primary)" }}>semget</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--accent-primary)" }}>shmget</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--accent-primary)" }}>msgget</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
              <td style={{ padding: "1.2rem", fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Control (ctl)</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>semctl</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>shmctl</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>msgctl</td>
            </tr>
            <tr>
              <td style={{ padding: "1.2rem", fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)" }}>Operaciones</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>semop</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>shmat, shmdt</td>
              <td style={{ padding: "1.2rem", textAlign: "center", fontWeight: 700, color: "var(--text-secondary)" }}>msgsnd, msgrcv</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="ftok-details" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: "var(--accent-primary)" }}>●</span> 3.2.1 Llaves (ftok)
        </h3>
        
        <SectionText>
          Todas las formas de IPC, excepto las tuberías sin nombre, tienen asociado un <strong>espacio de nombres</strong> para llevar a cabo el intercambio de mensajes. Dentro del conjunto de posibles nombres otorgados al IPC se encuentra el identificador que tienen los procesos, que se puede utilizar para entablar un diálogo.
        </SectionText>

        <div className="card" style={{ marginBottom: "2.5rem", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.05)" }}>
          <SectionText>
            Una <strong>llave</strong> es una variable o constante del tipo <code>key_t</code> que se usa para acceder a los mecanismos IPC previamente reservados o nuevos; típicamente es un entero de 32 bits. En GNU C, se crean las llaves utilizando la función <code>ftok()</code>, la cual utiliza el nombre de una ruta y un identificador para crear un mecanismo de acceso único.
          </SectionText>
        </div>

        {/* PROTOTIPO FTOK */}
        <div style={{ margin: "2rem 0", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ background: "rgba(155, 28, 46, 0.08)", color: "var(--accent-primary)", padding: "1rem 1.5rem", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border-color)" }}>
            Prototipo de la Función ftok()
          </div>
          <div style={{ padding: "1.5rem" }}>
            <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
              <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;sys/types.h&gt;</span><br/>
              <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;sys/ipc.h&gt;</span><br/><br/>
              <span style={{ color: "#4ec9b0" }}>key_t</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>ftok</span>(<span style={{ color: "#059669" }}>const char</span> *pathname, <span style={{ color: "#059669" }}>int</span> proj_id);
            </pre>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)" }}>
            <h4 style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem", marginBottom: "0.5rem" }}>pathname</h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Nombre de un archivo ordinario existente y accesible. El sistema utiliza su <strong>i-nodo</strong> para generar la clave.
            </p>
          </div>
          <div style={{ padding: "1.5rem", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)" }}>
            <h4 style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem", marginBottom: "0.5rem" }}>proj_id</h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Entero (usualmente un caracter como 'A') que se combina con el archivo para generar la llave. Evita colisiones en un mismo proyecto.
            </p>
          </div>
        </div>

        <div style={{ background: "rgba(59, 130, 246, 0.05)", padding: "1.5rem", borderRadius: "12px", borderLeft: "4px solid #3b82f6" }}>
          <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#1e40af", marginBottom: "0.8rem" }}>¿Cómo se genera la llave internamente?</h4>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#1e3a8a", lineHeight: 1.6 }}>
            La función <code>ftok()</code> combina tres valores para producir una llave única de 32 bits:<br/>
            1. Los <strong>8 bits menos significativos</strong> de <code>proj_id</code>.<br/>
            2. El número de <strong>i-nodo</strong> del archivo especificado.<br/>
            3. El número menor del dispositivo (minor device number) del sistema de archivos.<br/><br/>
            Esta llave resultante es la que consumen los llamados a <code>semget()</code>, <code>shmget()</code> y <code>msgget()</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

// 3.2.2 Semáforos System V
export function Chapter3_2_2() {
  return (
    <section id="semaforos-sysv" className="chapter-section animate-fadeInUp">
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ color: "var(--accent-primary)" }}>●</span> 3.2.2 Semáforos en derivados de System V
      </h3>

      <SectionText>
        Los semáforos son mecanismos utilizados para sincronizar los accesos a recursos compartidos. La dificultad fundamental es garantizar que la operación de incremento o decremento sea <strong>atómica</strong>. Los sistemas derivados de System V resuelven esto implementándolos directamente en el kernel, asegurando que las operaciones se realicen sin interrupciones.
      </SectionText>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", borderLeft: "5px solid var(--accent-primary)", borderRight: "1px solid var(--border-color)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
          <SectionText>
            En System V, un semáforo no es un simple valor, sino un <strong>conjunto de valores enteros no negativos</strong>.
          </SectionText>
        </div>
        <div style={{ background: "var(--bg-card)", padding: "1.8rem", borderRadius: "16px", borderLeft: "5px solid var(--accent-primary)", borderRight: "1px solid var(--border-color)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
          <SectionText>
            Cada valor en el conjunto puede asumir cualquier valor no negativo, hasta un máximo definido por el sistema.
          </SectionText>
        </div>
      </div>

      <div style={{ background: "rgba(0,0,0,0.02)", padding: "1.5rem", borderRadius: "12px", marginBottom: "2.5rem" }}>
        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Estructuras Internas del Kernel</h4>
        <SectionText>
          El kernel mantiene información detallada de cada conjunto de semáforos. Históricamente se definían en <code>&lt;sys/ipc.h&gt;</code>, pero en sistemas modernos como Linux basta con incluir <code>&lt;sys/sem.h&gt;</code>.
        </SectionText>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          <CodeBlock 
            title="struct semid_ds (Linux Actual)" 
            code={`struct semid_ds {
    struct ipc_perm sem_perm;  // Permisos y propietarios
    time_t          sem_otime; // Tiempo última operación
    time_t          sem_ctime; // Tiempo último cambio
    unsigned long   sem_nsems; // Número de semáforos en el conjunto
};`} 
          />
          <CodeBlock 
            title="struct sem (Estructura de valor)" 
            code={`struct sem {
    unsigned short semval;  // Valor actual (no negativo)
    short          sempid;  // PID del último proceso que lo usó
    ushort         semncnt; // Procesos esperando que semval aumente
    ushort         semzct;  // Procesos esperando que semval sea cero
};`} 
          />
        </div>
      </div>

      <div style={{ background: "var(--bg-card)", padding: "2.5rem", borderRadius: "20px", border: "1px solid var(--border-color)", marginBottom: "3rem", boxShadow: "0 15px 40px rgba(0,0,0,0.03)" }}>
        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "1.5rem", textAlign: "center" }}>Relación de Estructuras en el Kernel</h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg width="600" height="300" viewBox="0 0 600 300" style={{ maxWidth: "100%", height: "auto", fontFamily: "monospace" }}>
            {/* semid pointer */}
            <text x="10" y="50" fontSize="14" fill="var(--text-primary)">semid ──▶</text>
            
            {/* semid_ds box */}
            <rect x="100" y="20" width="160" height="180" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
            <text x="110" y="45" fontSize="12" fontWeight="bold" fill="#475569">struct semid_ds</text>
            <line x1="100" y1="55" x2="260" y2="55" stroke="#cbd5e1" />
            <text x="110" y="75" fontSize="11" fill="var(--text-secondary)">sem_perm</text>
            <rect x="110" y="85" width="140" height="40" rx="4" fill="#fff" stroke="#94a3b8" />
            <text x="115" y="100" fontSize="10" fill="#64748b">sem_base ──▶</text>
            <text x="110" y="145" fontSize="11" fill="var(--text-secondary)">sem_nsems</text>
            <text x="110" y="165" fontSize="11" fill="var(--text-secondary)">sem_otime</text>
            <text x="110" y="185" fontSize="11" fill="var(--text-secondary)">sem_ctime</text>

            {/* sem array box */}
            <rect x="350" y="20" width="160" height="240" rx="8" fill="#f0f9ff" stroke="#0369a1" strokeWidth="2" />
            <text x="360" y="45" fontSize="12" fontWeight="bold" fill="#0369a1">Array de struct sem</text>
            <line x1="350" y1="55" x2="510" y2="55" stroke="#bae6fd" />
            
            {/* Element 0 */}
            <rect x="360" y="65" width="140" height="80" rx="4" fill="#fff" stroke="#7dd3fc" />
            <text x="365" y="80" fontSize="10" fill="#0369a1">semval [0]</text>
            <text x="365" y="95" fontSize="10" fill="#0369a1">sempid [0]</text>
            <text x="365" y="110" fontSize="10" fill="#0369a1">semncnt [0]</text>
            <text x="365" y="125" fontSize="10" fill="#0369a1">semzcnt [0]</text>

            {/* Element 1 */}
            <rect x="360" y="155" width="140" height="80" rx="4" fill="#fff" stroke="#7dd3fc" />
            <text x="365" y="170" fontSize="10" fill="#0369a1">semval [1]</text>
            <text x="365" y="185" fontSize="10" fill="#0369a1">sempid [1]</text>
            <text x="365" y="200" fontSize="10" fill="#0369a1">semncnt [1]</text>
            <text x="365" y="215" fontSize="10" fill="#0369a1">semzcnt [1]</text>

            {/* Connection line */}
            <path d="M 230 100 L 350 100" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-primary)" />
              </marker>
            </defs>
          </svg>
        </div>
        <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
          Figura 3-4: Relación entre el ID de semáforo y las estructuras internas del Kernel.
        </p>
      </div>

      <div className="card" style={{ marginBottom: "3rem", background: "rgba(155, 28, 46, 0.02)", border: "1px solid rgba(155, 28, 46, 0.1)" }}>
        <h4 style={{ fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem" }}>Estructura de Permisos (ipc_perm)</h4>
        <CodeBlock 
          title="struct ipc_perm" 
          code={`struct ipc_perm {
    key_t  __key;   // Llave suministrada a semget
    uid_t  uid;     // UID efectivo del propietario
    gid_t  gid;     // GID efectivo del propietario
    uid_t  cuid;    // UID efectivo del creador
    gid_t  cgid;    // GID efectivo del creador
    unsigned short mode; // Permisos (ej. 0666)
    unsigned short __seq; // Número secuencial
};`} 
        />
      </div>

      <InfoCard title="Operaciones Atómicas" items={[
        "P() (Wait / semop -1): Intentar adquirir el semáforo. Si vale 0, el proceso se DUERME hasta que alguien lo libere. Si vale 1, se decrementa a 0 y el proceso avanza a la Sección Crítica.",
        "V() (Signal / semop +1): Liberar el semáforo. Se incrementa a 1. Si había procesos dormidos esperando este semáforo, el kernel despierta a uno de ellos."
      ]} />

      <CodeBlock title="3_2_semaforo.c" code={CODE.semaphore} explanation="En System V, es más complejo porque se agrupan en arreglos de semáforos. Usamos semget para obtener el ID, semctl para inicializarlo en 1, y semop para hacer P() o V()." output={CODE.semaphoreOut} />

      <Crossword 
        title="Crucigrama: Mecanismos IPC"
        size={10}
        clues={[
          { number: 1, direction: "across", row: 1, col: 1, answer: "SHMGET", clue: "Llamada para crear memoria compartida." },
          { number: 2, direction: "across", row: 3, col: 0, answer: "SEMOP", clue: "Operación atómica sobre semáforos." },
          { number: 3, direction: "down", row: 0, col: 5, answer: "FTOK", clue: "Genera una llave única (key_t)." },
          { number: 4, direction: "down", row: 2, col: 7, answer: "ATAR", clue: "Acción de shmat (unir memoria)." },
          { number: 5, direction: "across", row: 6, col: 2, answer: "FIFO", clue: "Tubería con nombre en disco." }
        ]}
      />
    </section>
  );
}

// 3.3.1 Memoria Compartida
export function Chapter3_3_1() {
  return (
    <section id="memoria-compartida" className="chapter-section animate-fadeInUp">
      <ChapterHeader 
        num="3.3" 
        title="Memoria Compartida" 
        subtitle="Es la forma más rápida de comunicación entre procesos, permitiendo que compartan una zona de memoria física directamente en sus espacios de direcciones virtuales." 
      />
      
      <SectionText>
        La memoria compartida evita las copias de datos entre el kernel y el usuario que ocurren en pipes o FIFOs. Una vez mapeada, los procesos leen y escriben en ella como si fuera memoria local.
      </SectionText>

      <DidYouKnow>
        La <strong>Memoria Compartida</strong> es el mecanismo IPC más rápido que existe. ¿Por qué? Porque una vez establecida la zona común, el Kernel ya no interviene en la comunicación. Los datos fluyen a la velocidad máxima que permita el bus de datos de tu procesador y la memoria RAM.
      </DidYouKnow>

      <div id="shmget" style={{ marginTop: "2.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>1. Creación: shmget()</h3>
        <SectionText>
          La función <code>shmget()</code> crea una zona de memoria compartida o habilita el acceso a una ya existente.
        </SectionText>

        <div style={{ margin: "1.5rem 0", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ background: "#475569", color: "white", padding: "0.8rem 1.5rem", fontSize: "0.9rem", fontWeight: 700 }}>PROTOTIPO</div>
          <div style={{ padding: "1.5rem" }}>
            <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
              <span style={{ color: "#0891b2" }}>#include</span> <span style={{ color: "#be123c" }}>&lt;sys/shm.h&gt;</span><br/><br/>
              <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>shmget</span>(<span style={{ color: "#4ec9b0" }}>key_t</span> key, <span style={{ color: "#4ec9b0" }}>size_t</span> size, <span style={{ color: "#059669" }}>int</span> shmflg);
            </pre>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "key", desc: "Llave obtenida con ftok() o IPC_PRIVATE." },
            { label: "size", desc: "Tamaño en bytes del segmento a crear." },
            { label: "shmflg", desc: "Banderas (IPC_CREAT, IPC_EXCL) y permisos (0600)." }
          ].map((param, i) => (
            <div key={i} style={{ padding: "1rem", background: "var(--bg-card)", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <span style={{ fontWeight: 800, color: "var(--accent-primary)", display: "block", marginBottom: "0.3rem" }}>{param.label}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{param.desc}</span>
            </div>
          ))}
        </div>

        <CodeBlock 
          title="Ejemplo de reserva" 
          code={`<span class="code-kw">if</span> ( ( shmid = <span class="code-fn">shmget</span> (IPC_PRIVATE, <span class="code-num">4096</span>, IPC_CREAT | <span class="code-num">0600</span>)) == -<span class="code-num">1</span>) {
    <span class="code-fn">perror</span>(<span class="code-str">"shmget"</span>);
}`} 
        />
      </div>

      <div id="shmctl" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>2. Control: shmctl()</h3>
        <SectionText>
          Permite realizar operaciones de control, como leer el estado o borrar el segmento.
        </SectionText>

        <div style={{ background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.5rem" }}>
            <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
              <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>shmctl</span> (<span style={{ color: "#059669" }}>int</span> shmid, <span style={{ color: "#059669" }}>int</span> cmd, <span style={{ color: "#569cd6" }}>struct</span> shmid_ds *buf);
            </pre>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "2rem" }}>
          <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.8rem", fontSize: "1rem" }}>Comandos (cmd) principales:</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li><code style={{ color: "var(--accent-primary)", fontWeight: 700 }}>IPC_STAT</code>: Lee la estructura de control y la copia en <code>buf</code>.</li>
            <li><code style={{ color: "var(--accent-primary)", fontWeight: 700 }}>IPC_SET</code>: Inicializa campos de control desde <code>buf</code>.</li>
            <li><code style={{ color: "#ef4444", fontWeight: 700 }}>IPC_RMID</code>: Marca el segmento para ser borrado del sistema.</li>
            <li><code style={{ color: "#3b82f6", fontWeight: 700 }}>SHM_LOCK/UNLOCK</code>: Bloquea o desbloquea el segmento en RAM física.</li>
          </ul>
        </div>

        <CodeBlock 
          title="Borrar memoria" 
          code={`<span class="code-fn">shmctl</span> (shmid, IPC_RMID, <span class="code-num">0</span>);`} 
          explanation="Importante: El segmento no se borra físicamente hasta que el último proceso se desata (shmdt)."
        />
      </div>

      <div style={{ background: "rgba(0,0,0,0.02)", padding: "1.5rem", borderRadius: "12px", marginTop: "3rem" }}>
        <h4 style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>Estructura de Control (shmid_ds)</h4>
        <CodeBlock 
          title="struct shmid_ds" 
          code={`struct shmid_ds {
    struct ipc_perm shm_perm;   // Permisos y propietarios
    size_t          shm_segsz;  // Tamaño del segmento
    pid_t           shm_lpid;   // PID última operación
    pid_t           shm_cpid;   // PID creador
    shmatt_t        shm_nattach;// Número de procesos unidos actualmente
    time_t          shm_atime;  // Fecha última unión (shmat)
    time_t          shm_dtime;  // Fecha última separación (shmdt)
    time_t          shm_ctime;  // Fecha último cambio
};`} 
        />
      </div>

      <div id="shmat" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>3. Atar y Desatar: shmat() y shmdt()</h3>
        <SectionText>
          Una vez creado el segmento con <code>shmget</code>, el proceso debe "atarse" a él para que aparezca en su mapa de memoria virtual.
        </SectionText>

        <div style={{ background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{ padding: "1.5rem" }}>
            <pre style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontFamily: "'Fira Code', monospace" }}>
              <span style={{ color: "#059669" }}>void</span> *<span style={{ color: "#2563eb", fontWeight: 700 }}>shmat</span> (<span style={{ color: "#059669" }}>int</span> shmid, <span style={{ color: "#569cd6" }}>const void</span> *shmaddr, <span style={{ color: "#059669" }}>int</span> shmflg);<br/>
              <span style={{ color: "#059669" }}>int</span> <span style={{ color: "#2563eb", fontWeight: 700 }}>shmdt</span> (<span style={{ color: "#569cd6" }}>const void</span> *shmaddr);
            </pre>
          </div>
        </div>

        <div className="card" style={{ borderLeft: "4px solid #f59e0b", background: "rgba(245, 158, 11, 0.02)" }}>
          <h4 style={{ fontWeight: 800, color: "#b45309", marginBottom: "0.8rem", fontSize: "1rem" }}>Reglas de Dirección (shmaddr):</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#b45309", fontWeight: "bold" }}>●</span> Si <code>shmaddr</code> es <strong>0 (NULL)</strong>, el sistema selecciona automáticamente la dirección óptima. <strong>(Recomendado)</strong>.
            </li>
            <li style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#b45309", fontWeight: "bold" }}>●</span> Si no es cero y no se usa <code>SHM_RND</code>, se une exactamente a esa dirección.
            </li>
            <li style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#b45309", fontWeight: "bold" }}>●</span> Si se usa <code>SHM_RND</code>, la dirección se redondea hacia abajo al múltiplo más cercano de <code>SHMLBA</code> (Lower Boundary Address).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// 3.4 Colas de Mensajes
export function Chapter3_3_2() {
  const codeMCola = `/* compilar: gcc -Wall mcola.c -o mcola */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <errno.h>
#include <sys/msg.h>

struct msgbuf {
    long mtype;       /* Tipo de mensaje (> 0) */
    char mtext[80];   /* Datos */
};

void send_msg(int qid, int msgtype) {
    struct msgbuf msg;
    time_t t;
    msg.mtype = msgtype;
    time(&t);
    snprintf(msg.mtext, sizeof(msg.mtext), "El mensaje salió el: %s", ctime(&t));
    if (msgsnd(qid, (void *) &msg, sizeof(msg.mtext), IPC_NOWAIT) == -1) {
        perror("ERROR en msgsnd");
        exit(EXIT_FAILURE);
    }
    printf("Mensaje enviado: %s\\n", msg.mtext);
}

void get_msg(int qid, int msgtype) {
    struct msgbuf msg;
    if (msgrcv(qid, (void*)&msg, sizeof(msg.mtext), msgtype, MSG_NOERROR | IPC_NOWAIT) == -1) {
        if (errno != ENOMSG) {
            perror("ERROR en msgrcv");
            exit(EXIT_FAILURE);
        }
        printf("No hay mensajes disponibles.\\n");
    } else printf("Mensaje recibido: %s\\n", msg.mtext);
}

int main(int argc, char *argv[]) {
    int qid, modo, llave;
    llave = ftok(argv[0], 'a');
    if (argc < 2) { printf("Use: ./mcola s|r\\n"); exit(1); }
    modo = (strcmp(argv[1], "s") == 0) ? 1 : 2;

    if ((qid = msgget(llave, IPC_CREAT | 0666)) == -1) {
        perror("msgget"); exit(1);
    }
    if (modo == 2) get_msg(qid, 1);
    else send_msg(qid, 1);
    return 0;
}`;

  return (
    <section id="cola-mensajes" className="chapter-section animate-fadeInUp">
      <ChapterHeader 
        num="3.4" 
        title="Colas de Mensajes" 
        subtitle="Comunicación mediante buzones estructurados gestionados por el kernel." 
      />

      <SectionText>
        Las colas de mensajes permiten el intercambio de datos estructurados (mensajes) entre procesos. A diferencia de las tuberías, no son flujos continuos, sino colecciones de bloques discretos, cada uno con un <strong>Tipo de Mensaje (mtype)</strong> que permite lectura selectiva.
      </SectionText>

      {/* BLOQUE 1: msgget */}
      <div id="msgget-deep" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem", borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem" }}>
          1. Identificación: msgget()
        </h3>
        <SectionText>
          Retorna un identificador asociado al valor del argumento <code>key</code>.
        </SectionText>
        <div style={{ background: "#1e1e1e", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <pre style={{ margin: 0, color: "#d4d4d4", fontFamily: "monospace" }}>
            <span style={{ color: "#569cd6" }}>int</span> <span style={{ color: "#dcdcaa" }}>msgget</span> (<span style={{ color: "#4ec9b0" }}>key_t</span> key, <span style={{ color: "#569cd6" }}>int</span> msgflg);
          </pre>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          <div className="card" style={{ padding: "1.2rem", background: "var(--bg-card)" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.5rem" }}>Llave (key)</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
              Usa <code>IPC_PRIVATE</code> para una cola nueva, o una llave de <code>ftok()</code> con <code>IPC_CREAT</code> para acceso compartido.
            </p>
          </div>
          <div className="card" style={{ padding: "1.2rem", background: "var(--bg-card)" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.5rem" }}>Banderas (msgflg)</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
              Máscara de bits para permisos (ej. 0666) y control de creación (IPC_CREAT | IPC_EXCL).
            </p>
          </div>
        </div>
      </div>

      {/* BLOQUE 2: msgctl */}
      <div id="msgctl-deep" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem", borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem" }}>
          2. Administración: msgctl()
        </h3>
        <div style={{ background: "#1e1e1e", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <pre style={{ margin: 0, color: "#d4d4d4", fontFamily: "monospace" }}>
            <span style={{ color: "#569cd6" }}>int</span> <span style={{ color: "#dcdcaa" }}>msgctl</span> (<span style={{ color: "#569cd6" }}>int</span> msqid, <span style={{ color: "#569cd6" }}>int</span> cmd, <span style={{ color: "#569cd6" }}>struct</span> msqid_ds *buf);
          </pre>
        </div>

        <div style={{ background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)", padding: "2rem", marginBottom: "2.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
          <h4 style={{ fontWeight: 800, marginBottom: "1rem" }}>Comandos principales:</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li>
              <code style={{ color: "var(--accent-primary)", fontWeight: 700 }}>IPC_STAT</code>: 
              Copia la estructura del kernel en <code>buf</code>. Requiere permisos de lectura.
            </li>
            <li>
              <code style={{ color: "var(--accent-primary)", fontWeight: 700 }}>IPC_SET</code>: 
              Actualiza <code>msg_qbytes</code>, UID, GID y modo. Solo el propietario o creador pueden hacerlo.
            </li>
            <li>
              <code style={{ color: "#ef4444", fontWeight: 700 }}>IPC_RMID</code>: 
              <strong>Elimina</strong> la cola inmediatamente. Ejemplo: <code>msgctl(id, IPC_RMID, NULL);</code>
            </li>
          </ul>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
          <CodeBlock title="struct msqid_ds" code={`struct msqid_ds {
    struct ipc_perm msg_perm;  
    time_t msg_stime;  // Último envío
    time_t msg_rtime;  // Última recepción
    time_t msg_ctime;  // Último cambio
    unsigned long __msg_cbytes; // Bytes actuales
    msgqnum_t msg_qnum;  // Mensajes actuales
    msglen_t msg_qbytes; // Límite de bytes
    pid_t msg_lspid;     // PID último envío
    pid_t msg_lrpid;     // PID último recepción
};`} />
          <CodeBlock title="struct ipc_perm" code={`struct ipc_perm {
    key_t __key;     // Llave
    uid_t uid, gid;  // Propietario
    uid_t cuid, cgid;// Creador
    unsigned short mode; // Permisos
    unsigned short __seq; // Secuencia
};`} />
        </div>
      </div>

      {/* BLOQUE 3: I/O */}
      <div id="msg-io-deep" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "1rem", borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem" }}>
          3. Enviar y Recibir: msgsnd() y msgrcv()
        </h3>
        <SectionText>
          El buffer de mensaje debe definirse como una estructura con un <code>long mtype</code> (&gt; 0) inicial.
        </SectionText>

        <div className="card" style={{ background: "var(--bg-secondary)", marginBottom: "2.5rem", padding: "2rem", border: "1px solid var(--border-color)", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
          <h4 style={{ fontWeight: 900, marginBottom: "1.5rem", color: "var(--text-primary)", fontSize: "1.1rem" }}>Lógica de msgtyp (msgrcv):</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 800, color: "var(--accent-blue)", minWidth: "120px", background: "rgba(59, 130, 246, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "6px", textAlign: "center" }}>msgtyp = 0</span>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Recupera el primer mensaje disponible en la cola (comportamiento FIFO).</p>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 800, color: "var(--accent-green)", minWidth: "120px", background: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "6px", textAlign: "center" }}>msgtyp &gt; 0</span>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Recupera el primer mensaje que coincida exactamente con el tipo especificado.</p>
            </div>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 800, color: "var(--accent-orange)", minWidth: "120px", background: "rgba(245, 158, 11, 0.1)", padding: "0.2rem 0.6rem", borderRadius: "6px", textAlign: "center" }}>msgtyp &lt; 0</span>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Recupera el mensaje con el tipo más pequeño que sea menor o igual al valor absoluto de msgtyp.</p>
            </div>
          </div>
        </div>

        <div style={{ background: "rgba(59, 130, 246, 0.08)", padding: "2rem", borderRadius: "16px", marginBottom: "3rem", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
          <h4 style={{ fontWeight: 900, color: "var(--accent-blue)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.9rem" }}>Banderas de Control (msgflg):</h4>
          <ul style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.7, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <li><strong style={{ color: "var(--accent-blue)" }}>IPC_NOWAIT</strong>: Retorna error inmediatamente si no hay mensajes o no hay espacio suficiente.</li>
            <li><strong style={{ color: "var(--accent-blue)" }}>MSG_NOERROR</strong>: Trunca el mensaje automáticamente si su tamaño excede el del buffer.</li>
            <li><strong style={{ color: "var(--accent-blue)" }}>MSG_EXCEPT</strong>: Se usa con msgtyp &gt; 0 para leer cualquier mensaje cuyo tipo NO sea el especificado.</li>
          </ul>
        </div>
      </div>

      <CodeBlock 
        title="mcola.c - Código Completo" 
        code={codeMCola} 
        explanation="Este ejemplo ilustra el uso de buzones para enviar la hora del sistema a otros procesos." 
      />
    </section>
  );
}

// 3.5 Comandos ipcs y /proc
export function Chapter3_3_3() {
  const outputIpcs = `------ Colas de mensajes -----
key        msqid      propietario perms      bytes utilizados mensajes

---- Segmentos memoria compartida ----
key        shmid      propietario perms      bytes      nattch     estado
0x00000000 884743     gcgero      600        1048576    2          dest
0x00000000 819208     gcgero      600        524288     2          dest
0x00000000 622606     gcgero      600        524288     2          dest

------ Matrices semáforo -------
key        semid      propietario perms      nsems
0x6100050e 1          gcgero      600        2
0x61000c49 2          gcgero      600        2`;

  const outputProc = `gcgero@linux:/proc/sysvipc$ ls -la
total 0
-r--r--r-- 1 root root 0 mar 4 10:10 msg
-r--r--r-- 1 root root 0 mar 4 10:10 sem
-r--r--r-- 1 root root 0 mar 4 10:10 shm

gcgero@linux:/proc/sysvipc$ cat sem
key        semid perms  nsems uid  gid  cuid cgid otime      ctime
1627391246 1     600    2     1000 1000 1000 1000 1772583562 1772583561
1627393097 2     600    2     1000 1000 1000 1000 1772585631 1772585624`;

  return (
    <section id="info-ipc" className="chapter-section animate-fadeInUp">
      <ChapterHeader 
        num="3.5" 
        title="Información de IPC por medio de comandos" 
        subtitle="Monitoreo y administración de recursos IPC desde la terminal y el sistema de archivos /proc." 
      />

      <SectionText>
        En GNU/Linux, se puede obtener información detallada de los objetos IPC persistentes en el kernel mediante comandos de usuario y el sistema de archivos virtual.
      </SectionText>

      {/* BLOQUE 1: IPCS */}
      <div id="ipcs-cmd" style={{ marginTop: "2.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>1. El comando ipcs</h3>
        <SectionText>
          Por defecto, el comando <code>ipcs</code> muestra información acerca de los tres tipos de mecanismos System V: segmentos de memoria compartida, colas de mensajes y arreglos de semáforos.
        </SectionText>
        <CodeBlock 
          title="Salida del comando ipcs" 
          code={outputIpcs} 
          explanation="Muestra IDs, propietarios, permisos y estadísticas de uso. El estado 'dest' indica que el recurso ha sido marcado para borrado."
        />
      </div>

      {/* BLOQUE 2: /PROC/SYSVIPC */}
      <div id="proc-sysvipc" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>2. Directorio /proc/sysvipc</h3>
        <SectionText>
          Los objetos IPC también se pueden localizar en <code>/proc/sysvipc</code>, que contiene tres archivos virtuales con información cruda sobre el estado actual de los mecanismos.
        </SectionText>
        <CodeBlock 
          title="Listado y contenido de /proc/sysvipc" 
          code={outputProc} 
          explanation="Consultar estos archivos permite ver detalles internos como el creador (cuid/cgid) y los tiempos de operación en formato epoch."
        />
      </div>

      {/* BLOQUE 3: LÍMITES */}
      <div id="ipc-limits" style={{ marginTop: "3rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>3. Límites del Sistema</h3>
        <SectionText>
          El sistema tiene límites asociados a cada mecanismo para prevenir la creación arbitraria de IPCs que saturen el kernel. Esta información se encuentra en <code>/proc/sys/kernel</code>.
        </SectionText>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div className="card" style={{ borderLeft: "5px solid #ef4444", background: "var(--bg-card)", borderRadius: "14px", borderTop: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.5rem", fontFamily: "monospace" }}>shmmax</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>Tamaño máximo en bytes de un segmento de memoria compartida.</p>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #f59e0b", background: "var(--bg-card)", borderRadius: "14px", borderTop: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.5rem", fontFamily: "monospace" }}>msgmax</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>Tamaño máximo en bytes de un solo mensaje en una cola.</p>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #3b82f6", background: "var(--bg-card)", borderRadius: "14px", borderTop: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
            <h4 style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.5rem", fontFamily: "monospace" }}>sem</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>Archivo que define límites de semáforos por set, totales y por operación.</p>
          </div>
        </div>
      </div>

      <MatchPairs 
        title="Repaso: Herramientas System V IPC"
        pairs={[
          { id: 1, left: "ipcs", right: "Comando para listar recursos activos", hint: "Abreviatura de 'IPC Status'." },
          { id: 2, left: "/proc/sysvipc", right: "Ruta del sistema de archivos con info IPC", hint: "Es un archivo virtual que refleja el estado del kernel." },
          { id: 3, left: "shmmax", right: "Límite de tamaño de memoria compartida", hint: "Shared Memory Maximum." },
          { id: 4, left: "IPC_RMID", right: "Comando de control para borrar un recurso", hint: "RMID significa 'Remove ID'." },
          { id: 5, left: "ftok()", right: "Función para generar llaves únicas", hint: "File to Key." }
        ]} 
      />
    </section>
  );
}

export function Chapter3_4() { return null; }

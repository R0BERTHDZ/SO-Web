"use client";
import { useState } from "react";

const C_COLORS: Record<string, string> = {
  "#include": "#c3e88d",
  "int": "#82aaff",
  "void": "#82aaff",
  "pid_t": "#82aaff",
  "char": "#82aaff",
  "return": "#c792ea",
  "if": "#c792ea",
  "else": "#c792ea",
  "while": "#c792ea",
  "for": "#c792ea",
  "printf": "#82aaff",
  "fork": "#ffcb6b",
  "wait": "#ffcb6b",
  "exec": "#ffcb6b",
  "exit": "#ffcb6b",
  "getpid": "#ffcb6b",
  "getppid": "#ffcb6b",
};

interface CodeBlockProps {
  title: string;
  language?: string;
  code: string;
  explanation: string;
  output?: string;
}

function CodeBlock({ title, language = "C", code, explanation, output }: CodeBlockProps) {
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="code-block">
        <div className="code-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="code-lang">📄 {language}</span>
            <span style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 500 }}>{title}</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {output && (
              <button
                onClick={() => setShowOutput(!showOutput)}
                className="btn-secondary"
                style={{ padding: "0.3rem 0.75rem", fontSize: "0.75rem" }}
              >
                {showOutput ? "📄 Código" : "▶ Ejecutar"}
              </button>
            )}
            <button
              onClick={copy}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                color: copied ? "#10b981" : "#94a3b8",
                padding: "0.3rem 0.6rem",
                cursor: "pointer",
                fontSize: "0.75rem",
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ Copiado" : "📋 Copiar"}
            </button>
          </div>
        </div>
        <div className="code-body">
          {showOutput && output ? (
            <pre style={{ color: "#a8d8a8", margin: 0 }}>{output}</pre>
          ) : (
            <pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html: code }} /></pre>
          )}
        </div>
      </div>
      {/* Explanation */}
      <div style={{
        background: "rgba(59,130,246,0.06)",
        border: "1px solid rgba(59,130,246,0.2)",
        borderTop: "none",
        borderRadius: "0 0 12px 12px",
        padding: "1rem 1.25rem",
      }}>
        <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
          <span style={{ color: "#3b82f6", fontWeight: 600 }}>💡 Explicación: </span>
          {explanation}
        </span>
      </div>
    </div>
  );
}

// ---- PROCESSES SECTION ----
const forkCode = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">pid_t</span> pid;

    <span class="code-cmt">/* Crear un proceso hijo */</span>
    pid = <span class="code-fn">fork</span>();

    <span class="code-kw">if</span> (pid &lt; <span class="code-num">0</span>) {
        <span class="code-cmt">/* Error al crear el proceso */</span>
        <span class="code-fn">perror</span>(<span class="code-str">"Error en fork"</span>);
        <span class="code-kw">return</span> <span class="code-num">1</span>;
    }
    <span class="code-kw">else if</span> (pid == <span class="code-num">0</span>) {
        <span class="code-cmt">/* Código del proceso HIJO */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo: PID=%d, PPID=%d\\n"</span>,
               <span class="code-fn">getpid</span>(), <span class="code-fn">getppid</span>());
        <span class="code-fn">exit</span>(<span class="code-num">0</span>);
    }
    <span class="code-kw">else</span> {
        <span class="code-cmt">/* Código del proceso PADRE */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Padre: PID=%d, Hijo PID=%d\\n"</span>,
               <span class="code-fn">getpid</span>(), pid);
        <span class="code-fn">wait</span>(NULL); <span class="code-cmt">/* Esperar al hijo */</span>
        <span class="code-fn">printf</span>(<span class="code-str">"Padre: hijo terminó\\n"</span>);
    }
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`;

const forkOutput = `Padre: PID=1024, Hijo PID=1025
Hijo:  PID=1025, PPID=1024
Padre: hijo terminó

[Proceso terminado con código 0]`;

const semaphoreCode = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;pthread.h&gt;</span>
<span class="code-inc">#include &lt;semaphore.h&gt;</span>

<span class="code-type">sem_t</span> semaforo;
<span class="code-type">int</span> recurso_compartido = <span class="code-num">0</span>;

<span class="code-type">void</span>* <span class="code-fn">productor</span>(<span class="code-type">void</span>* arg) {
    <span class="code-fn">sem_wait</span>(&amp;semaforo); <span class="code-cmt">/* P() - bloquea */</span>
    recurso_compartido++;
    <span class="code-fn">printf</span>(<span class="code-str">"Productor: recurso = %d\\n"</span>, recurso_compartido);
    <span class="code-fn">sem_post</span>(&amp;semaforo); <span class="code-cmt">/* V() - libera */</span>
    <span class="code-kw">return</span> NULL;
}

<span class="code-type">void</span>* <span class="code-fn">consumidor</span>(<span class="code-type">void</span>* arg) {
    <span class="code-fn">sem_wait</span>(&amp;semaforo);
    recurso_compartido--;
    <span class="code-fn">printf</span>(<span class="code-str">"Consumidor: recurso = %d\\n"</span>, recurso_compartido);
    <span class="code-fn">sem_post</span>(&amp;semaforo);
    <span class="code-kw">return</span> NULL;
}

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-fn">sem_init</span>(&amp;semaforo, <span class="code-num">0</span>, <span class="code-num">1</span>);
    <span class="code-type">pthread_t</span> t1, t2;
    <span class="code-fn">pthread_create</span>(&amp;t1, NULL, productor, NULL);
    <span class="code-fn">pthread_create</span>(&amp;t2, NULL, consumidor, NULL);
    <span class="code-fn">pthread_join</span>(t1, NULL);
    <span class="code-fn">pthread_join</span>(t2, NULL);
    <span class="code-fn">sem_destroy</span>(&amp;semaforo);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`;

const semaphoreOutput = `Productor: recurso = 1
Consumidor: recurso = 0

[Semáforo liberado correctamente]`;

const memoryCode = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">int</span> n = <span class="code-num">5</span>;
    <span class="code-type">int</span> *arr;

    <span class="code-cmt">/* Asignación dinámica con malloc */</span>
    arr = (<span class="code-type">int</span>*) <span class="code-fn">malloc</span>(n * <span class="code-kw">sizeof</span>(<span class="code-type">int</span>));

    <span class="code-kw">if</span> (arr == NULL) {
        <span class="code-fn">printf</span>(<span class="code-str">"Error: sin memoria\\n"</span>);
        <span class="code-kw">return</span> <span class="code-num">1</span>;
    }

    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; n; i++) {
        arr[i] = i * i;
        <span class="code-fn">printf</span>(<span class="code-str">"arr[%d] = %d (dir: %p)\\n"</span>,
               i, arr[i], &amp;arr[i]);
    }

    <span class="code-fn">free</span>(arr); <span class="code-cmt">/* Liberar memoria del heap */</span>
    <span class="code-fn">printf</span>(<span class="code-str">"Memoria liberada correctamente\\n"</span>);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`;

const memoryOutput = `arr[0] = 0  (dir: 0x5641a2b6c2a0)
arr[1] = 1  (dir: 0x5641a2b6c2a4)
arr[2] = 4  (dir: 0x5641a2b6c2a8)
arr[3] = 9  (dir: 0x5641a2b6c2ac)
arr[4] = 16 (dir: 0x5641a2b6c2b0)
Memoria liberada correctamente`;

const topics = [
  {
    id: "procesos",
    label: "⚙️ Procesos",
    color: "#8b5cf6",
    sectionId: "procesos",
    content: (
      <>
        <div className="divider" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { state: "Nuevo", desc: "El proceso es creado", color: "#3b82f6", icon: "🆕" },
            { state: "Listo", desc: "Espera turno de CPU", color: "#f59e0b", icon: "⏳" },
            { state: "Ejecutado", desc: "Ocupa la CPU", color: "#10b981", icon: "▶️" },
            { state: "Bloqueado", desc: "Espera E/S o evento", color: "#ef4444", icon: "🔒" },
            { state: "Hecho", desc: "Finaliza su ejecución", color: "#64748b", icon: "✅" },
          ].map((s) => (
            <div key={s.state} className="card" style={{ borderColor: `${s.color}30`, textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: s.color, marginBottom: "0.3rem" }}>{s.state}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <CodeBlock
          title="fork() y wait() — Procesos en C"
          code={forkCode}
          explanation="fork() duplica el proceso actual. El hijo recibe PID=0, el padre recibe el PID real del hijo. wait(NULL) suspende al padre hasta que el hijo termine."
          output={forkOutput}
        />
      </>
    ),
  },
  {
    id: "sincronizacion",
    label: "🚦 Sincronización",
    color: "#ef4444",
    sectionId: "sincronizacion",
    content: (
      <>
        <div className="divider" />
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="card" style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}>
            <h4 style={{ color: "#ef4444", marginBottom: "0.5rem", fontWeight: 700 }}>⚠️ Condición de Carrera</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Ocurre cuando dos o más procesos acceden a datos compartidos concurrentemente y el resultado depende del orden de ejecución.
              Los semáforos, mutexes y monitores son mecanismos para evitarla.
            </p>
          </div>
        </div>
        <CodeBlock
          title="Semáforos POSIX — Sincronización"
          code={semaphoreCode}
          explanation="sem_wait() (P) decrementa el semáforo; si es 0, bloquea el proceso. sem_post() (V) incrementa el semáforo y despierta un proceso bloqueado."
          output={semaphoreOutput}
        />
      </>
    ),
  },
  {
    id: "memoria",
    label: "🧠 Memoria",
    color: "#f59e0b",
    sectionId: "memoria",
    content: (
      <>
        <div className="divider" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { title: "Stack (Pila)", desc: "Variables locales, parámetros de función. Gestión automática LIFO.", color: "#8b5cf6" },
            { title: "Heap (Montón)", desc: "Memoria dinámica con malloc/free. El programador la gestiona.", color: "#f59e0b" },
            { title: "Segmento de Código", desc: "Instrucciones del programa. Sólo lectura.", color: "#3b82f6" },
            { title: "Segmento de Datos", desc: "Variables globales e inicializadas. BSS para variables no inicializadas.", color: "#10b981" },
          ].map((s) => (
            <div key={s.title} className="card" style={{ borderColor: `${s.color}30` }}>
              <div style={{ color: s.color, fontWeight: 700, marginBottom: "0.3rem", fontSize: "0.9rem" }}>{s.title}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <CodeBlock
          title="malloc() y free() — Memoria Dinámica"
          code={memoryCode}
          explanation="malloc() reserva bloques del heap. Siempre verifica que no sea NULL. free() libera la memoria; olvidarlo causa memory leaks."
          output={memoryOutput}
        />
      </>
    ),
  },
];

export default function ProcessesSection() {
  const [activeTab, setActiveTab] = useState("procesos");

  const active = topics.find((t) => t.id === activeTab)!;

  return (
    <>
      {/* Processes section anchor */}
      <div id="procesos" />
      <div id="memoria" />
      <div id="sincronizacion" />

      <section style={{
        padding: "6rem 2rem",
        background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-cyan" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              ⚙️ Temas Técnicos con Código
            </span>
            <h2 className="section-title">Código en C con Explicaciones</h2>
            <p className="section-subtitle">
              Cada ejemplo tiene botón de &quot;Ejecutar&quot; para ver la salida del programa
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            {topics.map((t) => (
              <button
                key={t.id}
                className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.9rem",
                  ...(activeTab === t.id ? {
                    background: `${t.color}15`,
                    borderColor: `${t.color}50`,
                    color: t.color,
                  } : {}),
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div key={activeTab} className="animate-fadeInUp">
            {active.content}
          </div>
        </div>
      </section>
    </>
  );
}

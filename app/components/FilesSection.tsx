"use client";

const filesTopics = [
  {
    title: "Estructura del Sistema de Archivos",
    icon: "🗂️",
    color: "#3b82f6",
    items: [
      { term: "Inodo", desc: "Estructura de datos que almacena metadatos de un archivo: permisos, tamaño, timestamps y punteros a bloques de datos. No incluye el nombre del archivo." },
      { term: "Directorio", desc: "Archivo especial que mapea nombres de archivos a inodos. Permite la estructura jerárquica del sistema de archivos." },
      { term: "Bloque de datos", desc: "Unidad mínima de almacenamiento en disco. Tamaño típico: 4KB. Los archivos ocupan uno o más bloques." },
      { term: "Superbloque", desc: "Contiene información sobre el sistema de archivos: tamaño, número de bloques libres, número de inodos libres, etc." },
    ],
  },
  {
    title: "Llamadas al Sistema de Archivos",
    icon: "⚙️",
    color: "#8b5cf6",
    items: [
      { term: "open()", desc: "Abre o crea un archivo. Retorna un descriptor de archivo (fd). Flags: O_RDONLY, O_WRONLY, O_RDWR, O_CREAT." },
      { term: "read()", desc: "Lee bytes del archivo en el buffer. Retorna los bytes leídos o 0 al llegar al EOF." },
      { term: "write()", desc: "Escribe bytes al archivo. Retorna bytes escritos. Los datos pueden quedar en buffer hasta close() o fflush()." },
      { term: "close()", desc: "Cierra el descriptor de archivo, liberando el recurso. Importante para evitar resource leaks." },
    ],
  },
];

const fileCode = `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;fcntl.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">int</span> fd;
    <span class="code-type">char</span> buffer[<span class="code-num">128</span>];
    <span class="code-type">char</span>* msg = <span class="code-str">"Hola, Sistema de Archivos!\\n"</span>;

    <span class="code-cmt">/* Crear/abrir archivo para escritura */</span>
    fd = <span class="code-fn">open</span>(<span class="code-str">"archivo.txt"</span>, O_WRONLY | O_CREAT | O_TRUNC, <span class="code-num">0644</span>);
    <span class="code-kw">if</span> (fd &lt; <span class="code-num">0</span>) { <span class="code-fn">perror</span>(<span class="code-str">"open"</span>); <span class="code-kw">return</span> <span class="code-num">1</span>; }

    <span class="code-fn">write</span>(fd, msg, <span class="code-fn">strlen</span>(msg));
    <span class="code-fn">close</span>(fd);

    <span class="code-cmt">/* Abrir para lectura */</span>
    fd = <span class="code-fn">open</span>(<span class="code-str">"archivo.txt"</span>, O_RDONLY);
    <span class="code-type">int</span> n = <span class="code-fn">read</span>(fd, buffer, <span class="code-kw">sizeof</span>(buffer) - <span class="code-num">1</span>);
    buffer[n] = <span class="code-str">'\\0'</span>;
    <span class="code-fn">printf</span>(<span class="code-str">"Leído: %s"</span>, buffer);
    <span class="code-fn">close</span>(fd);

    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`;

export default function FilesSection() {
  return (
    <section id="archivos" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="badge badge-blue" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            📁 Sistema de Archivos
          </span>
          <h2 className="section-title">Gestión de Archivos</h2>
          <p className="section-subtitle">
            Cómo el SO organiza y accede a los datos en disco
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {filesTopics.map((topic) => (
            <div key={topic.title} className="card" style={{ borderColor: `${topic.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{topic.icon}</span>
                <h3 style={{ fontWeight: 700, color: topic.color, fontSize: "1rem" }}>{topic.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {topic.items.map((item) => (
                  <div key={item.term} style={{
                    padding: "0.75rem",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "10px",
                    border: `1px solid ${topic.color}15`,
                  }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600, color: topic.color, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      {item.term}
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Filesystem hierarchy visualization */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: 700, color: "#3b82f6", marginBottom: "1.25rem" }}>🌳 Jerarquía de Directorios Linux</h3>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 2 }}>
            <div style={{ color: "#3b82f6" }}>/  <span style={{ color: "#64748b" }}>(raíz)</span></div>
            {[
              { path: "├── bin/", color: "#10b981", desc: "Binarios esenciales (ls, cp, mv)" },
              { path: "├── etc/", color: "#8b5cf6", desc: "Archivos de configuración" },
              { path: "├── home/", color: "#f59e0b", desc: "Directorios de usuarios" },
              { path: "│   └── usuario/", color: "#f59e0b", desc: "" },
              { path: "├── proc/", color: "#06b6d4", desc: "Sistema de archivos virtual (procesos)" },
              { path: "├── var/", color: "#ec4899", desc: "Datos variables (logs, spools)" },
              { path: "├── tmp/", color: "#64748b", desc: "Archivos temporales" },
              { path: "├── usr/", color: "#3b82f6", desc: "Programas de usuario" },
              { path: "└── dev/", color: "#ef4444", desc: "Dispositivos como archivos" },
            ].map((item) => (
              <div key={item.path} style={{ display: "flex", gap: "1rem" }}>
                <span style={{ color: item.color }}>{item.path}</span>
                {item.desc && <span style={{ color: "#64748b", fontSize: "0.75rem" }}># {item.desc}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div className="code-block">
          <div className="code-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span className="code-lang">📄 C</span>
              <span style={{ color: "#e2e8f0", fontSize: "0.85rem" }}>open(), read(), write(), close()</span>
            </div>
            <span className="badge badge-green" style={{ fontSize: "0.65rem" }}>Ejemplo completo</span>
          </div>
          <div className="code-body">
            <pre style={{ margin: 0 }}><code dangerouslySetInnerHTML={{ __html: fileCode }} /></pre>
          </div>
        </div>
        <div style={{
          background: "rgba(59,130,246,0.06)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          padding: "1rem 1.25rem",
        }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
            <span style={{ color: "#3b82f6", fontWeight: 600 }}>💡 Nota: </span>
            En Linux, &quot;todo es un archivo&quot; — dispositivos, sockets y pipes usan las mismas llamadas al sistema.
          </span>
        </div>

        {/* Terminal commands */}
        <div className="terminal" style={{ marginTop: "2rem" }}>
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ef4444" }} />
            <div className="terminal-dot" style={{ background: "#f59e0b" }} />
            <div className="terminal-dot" style={{ background: "#10b981" }} />
            <span style={{ marginLeft: "0.5rem", color: "#64748b", fontSize: "0.75rem" }}>bash — Comandos de archivos</span>
          </div>
          <div className="terminal-body">
            {[
              { cmd: "ls -la /home/usuario", out: "drwxr-xr-x  usuario usuario  4096 May 08 archivos/\n-rw-r--r--  usuario usuario   512 May 08 archivo.txt" },
              { cmd: "stat archivo.txt", out: "Archivo: archivo.txt\n  Tamaño: 27\tBloques: 8\tBloque E/S: 4096\nInodo: 1234567\tEnlaces: 1\nAcceso: 2026-05-08 22:15  Modificado: 2026-05-08 22:15" },
              { cmd: "cat /proc/1/status | grep Pid", out: "Pid:\t1\nPPid:\t0\nTracerPid:\t0" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <div><span className="terminal-prompt">$</span> <span style={{ color: "#e2e8f0" }}>{item.cmd}</span></div>
                <div className="terminal-output" style={{ whiteSpace: "pre", fontSize: "0.8rem" }}>{item.out}</div>
              </div>
            ))}
            <div><span className="terminal-prompt">$ </span><span className="animate-blink" style={{ color: "#3b82f6" }}>█</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

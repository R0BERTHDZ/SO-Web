import React from 'react';
import { ChapterHeader, SectionText, InfoCard } from './Chapters12';
import CodeBlock from './CodeBlock';
import Crossword from './Crossword';

function CommandDetail({ cmd, desc, params, sysCalls, code, category, context, output, hint }: { cmd: string, desc: string, params: string, sysCalls: string[], code: string, category: string, context: string, output: string, hint: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className={`command-card ${isOpen ? 'expanded' : ''}`} 
      onClick={() => setIsOpen(!isOpen)}
      style={{ 
        padding: "0", 
        background: "var(--bg-card)", 
        borderRadius: "24px", 
        boxShadow: isOpen ? "0 25px 60px rgba(0, 0, 0, 0.2)" : "0 10px 30px rgba(0,0,0,0.03)", 
        border: isOpen ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)",
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        marginBottom: "1.2rem"
      }}
    >
      {/* Category Badge */}
      {!isOpen && (
        <div style={{ 
          position: "absolute", 
          top: "12px", 
          right: "12px", 
          padding: "0.4rem 0.9rem", 
          background: "rgba(155,28,46,0.08)", 
          color: "var(--accent-primary)", 
          fontSize: "0.6rem", 
          fontWeight: 900, 
          letterSpacing: "1.2px",
          borderRadius: "30px",
          textTransform: "uppercase"
        }}>
          {category}
        </div>
      )}

      <div style={{ padding: "1.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ 
            width: "56px", 
            height: "56px", 
            borderRadius: "16px", 
            background: isOpen ? "linear-gradient(135deg, var(--accent-primary) 0%, #d32f2f 100%)" : "var(--bg-secondary)", 
            color: isOpen ? "white" : "var(--accent-primary)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: 900,
            fontSize: "1.6rem",
            boxShadow: isOpen ? "0 8px 20px rgba(155,28,46,0.3)" : "none",
            transition: "all 0.4s",
            fontFamily: "'JetBrains Mono', monospace",
            border: isOpen ? "none" : "1px solid var(--border-color)"
          }}>
            {cmd[0].toUpperCase()}
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>{cmd}</h4>
            {!isOpen && <p style={{ margin: "0.3rem 0 0", fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500 }}>{context}</p>}
          </div>
        </div>
        
        <div style={{ 
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: isOpen ? "var(--accent-primary)" : "var(--bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
          transition: "all 0.4s",
          color: isOpen ? "white" : "var(--accent-primary)"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      <div style={{ 
        maxHeight: isOpen ? "2000px" : "0", 
        opacity: isOpen ? 1 : 0, 
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", 
        padding: isOpen ? "0 1.8rem 1.8rem" : "0 1.8rem",
        overflow: "hidden"
      }}>
        <div style={{ 
          padding: "1.8rem", 
          background: "var(--bg-secondary)", 
          borderRadius: "20px", 
          border: "1px solid var(--border-color)",
          boxShadow: "inset 0 2px 15px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.75rem", background: "var(--accent-primary)", color: "white", padding: "0.3rem 0.9rem", borderRadius: "30px", fontWeight: 900, letterSpacing: "0.5px" }}>{category.toUpperCase()}</span>
            <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(155,28,46,0.2) 0%, transparent 100%)" }}></div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h5 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.6rem" }}>Descripción Pedagógica</h5>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
              {desc}
            </p>
          </div>

          <div style={{ padding: "1.2rem", background: "rgba(251, 191, 36, 0.08)", borderRadius: "16px", border: "1px solid rgba(251, 191, 36, 0.3)", marginBottom: "2rem" }}>
            <h5 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#b45309", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>💡</span> Pista de Implementación
            </h5>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
              {hint}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <h6 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "0.8rem", textTransform: "uppercase" }}>Llamadas al Sistema</h6>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {sysCalls.map((call, i) => (
                  <code key={i} style={{ fontSize: "0.8rem", background: "rgba(155,28,46,0.05)", color: "var(--accent-primary)", padding: "0.3rem 0.7rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontWeight: 700 }}>{call}</code>
                ))}
              </div>
            </div>
            <div style={{ padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <h6 style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "0.8rem", textTransform: "uppercase" }}>Parámetros de Entrada</h6>
              <div style={{ background: "var(--bg-secondary)", color: "var(--accent-blue)", padding: "0.6rem 1rem", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "'JetBrains Mono', monospace", border: "1px solid var(--border-color)" }}>
                {params}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <h5 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>🖥️</span> Salida Esperada en Consola
            </h5>
            <div style={{ 
              background: "#1a1a1a", 
              borderRadius: "12px", 
              padding: "1.5rem", 
              border: "1px solid #333",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.9rem",
              color: "#a8d8a8",
              position: "relative",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}>
              <div style={{ position: "absolute", top: "10px", right: "15px", display: "flex", gap: "5px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></div>
              </div>
              <div style={{ color: "#888", marginBottom: "0.5rem" }}># shell:~/SO $ {cmd} {params !== "Ninguno" ? params : ""}</div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
            </div>
          </div>

          <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 15px 35px rgba(0,0,0,0.25)" }}>
            <div style={{ 
              position: "absolute", 
              top: "0", 
              right: "0", 
              padding: "0.5rem 1.2rem", 
              background: "rgba(255,255,255,0.1)", 
              color: "white", 
              fontSize: "0.7rem", 
              fontWeight: 800, 
              borderRadius: "0 0 0 16px",
              zIndex: 1,
              backdropFilter: "blur(4px)"
            }}>IMPLEMENTACIÓN EN C</div>
            <pre style={{ 
              margin: 0, 
              background: "#0f172a", 
              color: "#f8fafc", 
              padding: "3rem 1.5rem 1.5rem", 
              fontSize: "0.9rem", 
              overflowX: "auto", 
              fontFamily: "'Fira Code', monospace",
              lineHeight: 1.6
            }}>
              {code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MinishellProject() {
  const fullCode = `#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;unistd.h&gt;
#include &lt;errno.h&gt;
#include &lt;dirent.h&gt;
#include &lt;sys/stat.h&gt;
#include &lt;fcntl.h&gt;
#include &lt;time.h&gt;
#include &lt;sys/statfs.h&gt;
#include &lt;sys/statvfs.h&gt;
#include &lt;sys/sysmacros.h&gt;
#include &lt;utmp.h&gt;
#include &lt;pwd.h&gt;
#include &lt;grp.h&gt;
#include &lt;sys/utsname.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;sys/ioctl.h&gt;
#include &lt;net/if.h&gt;
#include &lt;arpa/inet.h&gt;
#include &lt;ifaddrs.h&gt;
#include &lt;sys/sysinfo.h&gt;

#define MAX_PATH  512
#define MAX_BUF   1024
#define MAX_IN    512

#define COLOR_OK   "\\033[0;32m"
#define COLOR_DIR  "\\033[0;34m"
#define COLOR_LNK  "\\033[0;36m"
#define COLOR_DEV  "\\033[0;33m"
#define COLOR_SOCK "\\033[0;35m"
#define COLOR_EXE  "\\033[0;32m"
#define NC         "\\033[0m"

static char cwd_buf[MAX_PATH];

/* ── Utilidad de error ── */
static void print_err(const char *ctx) {
    fprintf(stderr, "[!] %s: %s\\n", ctx, strerror(errno));
}

/* ── Comandos de Archivos y Directorios ── */
void cmd_pwd(void) {
    if (getcwd(cwd_buf, sizeof(cwd_buf))) printf("%s\\n", cwd_buf);
    else print_err("pwd");
}

void cmd_cd(const char *dir) {
    if (!dir) dir = getenv("HOME");
    if (chdir(dir != NULL ? dir : "/") != 0) print_err("cd");
}

void cmd_mkdir(const char *nombre) {
    if (!nombre) { puts("mkdir: falta el nombre"); return; }
    if (mkdir(nombre, 0755) != 0) print_err("mkdir");
}

void cmd_cat(const char *archivo) {
    if (!archivo) return;
    int fd = open(archivo, O_RDONLY);
    if (fd == -1) { print_err("cat"); return; }
    char buf[MAX_BUF];
    ssize_t n;
    while ((n = read(fd, buf, sizeof(buf))) > 0) write(STDOUT_FILENO, buf, n);
    close(fd);
    printf("\\n");
}

void cmd_rename(const char *viejo, const char *nuevo) {
    if (!viejo || !nuevo) { puts("rename: faltan argumentos"); return; }
    if (rename(viejo, nuevo) != 0) print_err("rename");
}

void cmd_unlink(const char *archivo) {
    if (!archivo) { puts("unlink: falta archivo"); return; }
    if (unlink(archivo) != 0) print_err("unlink");
}

/* ── Información de Sistema y Disco ── */
void cmd_stat(const char *ruta) {
    if (!ruta) return;
    struct stat st;
    if (stat(ruta, &st) != 0) { print_err("stat"); return; }
    printf("Archivo: %s | Inodo: %lu | Tamaño: %ld bytes | Permisos: %o\\n", 
            ruta, (unsigned long)st.st_ino, (long)st.st_size, st.st_mode & 0777);
}

void cmd_statvfs(const char *ruta) {
    if (!ruta) ruta = "/";
    struct statvfs vfs;
    if (statvfs(ruta, &vfs) != 0) { print_err("statvfs"); return; }
    printf("ID de bloque: %lu | Bloques totales: %lu\\n", vfs.f_bsize, vfs.f_blocks);
}

/* ── Red ── */
void cmd_ip(void) {
    struct ifaddrs *ifs, *p;
    getifaddrs(&ifs);
    for (p = ifs; p; p = p->ifa_next) {
        if (!p->ifa_addr || p->ifa_addr->sa_family != AF_INET) continue;
        printf("%-10s %s\\n", p->ifa_name, inet_ntoa(((struct sockaddr_in *)p->ifa_addr)->sin_addr));
    }
    freeifaddrs(ifs);
}

void cmd_mac(void) {
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct ifreq ifr;
    DIR *d = opendir("/sys/class/net");
    struct dirent *e;
    while ((e = readdir(d))) {
        if (e->d_name[0] == '.') continue;
        strncpy(ifr.ifr_name, e->d_name, IFNAMSIZ);
        if (ioctl(sock, SIOCGIFHWADDR, &ifr) == 0) {
            unsigned char *m = (unsigned char *)ifr.ifr_hwaddr.sa_data;
            printf("%-10s %02x:%02x:%02x:%02x:%02x:%02x\\n", e->d_name, m[0],m[1],m[2],m[3],m[4],m[5]);
        }
    }
    closedir(d); close(sock);
}

/* ── Usuarios ── */
void cmd_who(void) {
    struct utmp *u;
    setutent();
    while ((u = getutent())) {
        if (u->ut_type == USER_PROCESS) printf("%-10s %-12s (%s)\\n", u->ut_user, u->ut_line, u->ut_host);
    }
    endutent();
}

void cmd_uname(char **args) {
    struct utsname u;
    uname(&u);
    if (args[1] && strcmp(args[1], "-a") == 0) printf("%s %s %s\\n", u.sysname, u.release, u.machine);
    else printf("%s\\n", u.sysname);
}

void cmd_free(void) {
    struct sysinfo si;
    sysinfo(&si);
    printf("RAM Total: %lu MB | Libre: %lu MB\\n", si.totalram / 1024 / 1024, si.freeram / 1024 / 1024);
}

/* ── Otros ── */
void cmd_ls(const char *f, const char *r) {
    DIR *d = opendir(r ? r : (f && f[0] != '-' ? f : "."));
    if (!d) return;
    struct dirent *e;
    while ((e = readdir(d))) printf("%s  ", e->d_name);
    printf("\\n"); closedir(d);
}

/* ════════════════════════════════ MAIN ════════════════════════════════ */
int main(void) {
    char input[MAX_IN], input_copia[MAX_IN];
    char *tok[6];

    while (1) {
        if (!getcwd(cwd_buf, sizeof(cwd_buf))) strcpy(cwd_buf, "?");
        printf(COLOR_OK "shell" NC ":" COLOR_DIR "%s" NC " $ ", cwd_buf);
        fflush(stdout);

        if (!fgets(input, sizeof(input), stdin)) break;
        input[strcspn(input, "\\n")] = '\\0';
        if (!input[0]) continue;

        tok[0] = strtok(input, " ");
        for (int i = 1; i < 5; i++) tok[i] = strtok(NULL, " ");
        tok[5] = NULL;

        if (!tok[0]) continue;

        if      (!strcmp(tok[0], "pwd"))         cmd_pwd();
        else if (!strcmp(tok[0], "cd"))          cmd_cd(tok[1]);
        else if (!strcmp(tok[0], "mkdir"))       cmd_mkdir(tok[1]);
        else if (!strcmp(tok[0], "ls"))          cmd_ls(tok[1], tok[2]);
        else if (!strcmp(tok[0], "cat"))         cmd_cat(tok[1]);
        else if (!strcmp(tok[0], "stat"))        cmd_stat(tok[1]);
        else if (!strcmp(tok[0], "statvfs"))     cmd_statvfs(tok[1]);
        else if (!strcmp(tok[0], "unlink"))      cmd_unlink(tok[1]);
        else if (!strcmp(tok[0], "rename") || 
                 !strcmp(tok[0], "mv"))          cmd_rename(tok[1], tok[2]);
        else if (!strcmp(tok[0], "who"))         cmd_who();
        else if (!strcmp(tok[0], "uname"))       cmd_uname(tok);
        else if (!strcmp(tok[0], "date"))        { time_t t = time(NULL); printf("%s", ctime(&t)); }
        else if (!strcmp(tok[0], "ip"))          cmd_ip();
        else if (!strcmp(tok[0], "mac"))         cmd_mac();
        else if (!strcmp(tok[0], "free"))        cmd_free();
        else if (!strcmp(tok[0], "exit"))        { puts("Hasta luego."); exit(0); }
        else printf("comando no reconocido: '%s'\\n", tok[0]);
    }
    return 0;
}
`;

  return (
    <div className="project-page animate-fadeInUp">
      <ChapterHeader 
        num="PROYECTO" 
        title="Minishell: Proyecto Final 3er Parcial" 
        subtitle="Una mini terminal propia hecha en C que permite manejar archivos, ver información del sistema y más." 
      />

      <SectionText>
        Este es el proyecto final del curso. Construimos nuestra propia terminal (como la que usas en Linux) desde cero en lenguaje C. Puede listar archivos, moverse entre carpetas, mostrar la memoria del equipo, ver quién está conectado y mucho más.
      </SectionText>

      {/* CATEGORÍA 1: ARCHIVOS */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>📂</span>
        Gestión de Archivos y Directorios
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="ls" 
          context="Muestra los archivos y carpetas del directorio actual."
          desc="Es como abrir una carpeta para ver qué hay dentro. El programa abre el directorio y lee uno por uno los nombres de los archivos que contiene." 
          params="."
          output={".  ..  minishell.c  shell  test_folder  documento.txt"}
          sysCalls={["opendir()", "readdir()", "closedir()", "struct dirent"]}
          hint="Primero hay que abrir la carpeta con opendir(), luego leer cada elemento con readdir() en un ciclo, y al final cerrar con closedir()."
          code={`void cmd_ls(const char *r) {
    DIR *d = opendir(r ? r : ".");
    struct dirent *e;
    while ((e = readdir(d))) 
        printf("%s  ", e->d_name);
    closedir(d);
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="cat" 
          context="Muestra el contenido de un archivo en pantalla."
          desc="Abre un archivo y lo imprime en pantalla, igual que cuando abres un documento de texto. Lee el archivo en pedazos y los va mostrando uno a uno." 
          params="hola.txt"
          output={"Hola mundo!\\nEste es un archivo de prueba\\nleído desde mi minishell."}
          sysCalls={["open()", "read()", "write()", "close()"]}
          hint="Lee el archivo en bloques de 1024 letras a la vez. El ciclo termina cuando ya no hay más contenido que leer."
          code={`void cmd_cat(const char *archivo) {
    int fd = open(archivo, O_RDONLY);
    char buf[1024]; ssize_t n;
    while ((n = read(fd, buf, sizeof(buf))) > 0) 
        write(STDOUT_FILENO, buf, n);
    close(fd);
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="pwd" 
          context="Muestra en qué carpeta estás actualmente."
          desc="Te dice exactamente en qué parte del sistema de archivos estás parado, mostrando la ruta completa desde la raíz hasta tu carpeta actual." 
          params="Ninguno"
          output={"/home/usuario/Documentos/proyecto_minishell"}
          sysCalls={["getcwd()"]}
          hint="Se necesita un espacio de memoria (buffer) donde guardar la ruta. Si la ruta es muy larga y el espacio es insuficiente, la función fallará."
          code={`void cmd_pwd(void) {
    if (getcwd(cwd_buf, sizeof(cwd_buf))) printf("%s\\n", cwd_buf);
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="cd" 
          context="Cambia la carpeta en la que estás trabajando."
          desc="Te mueve a otra carpeta, como cuando navegas entre directorios en tu computadora. Si no escribes a dónde ir, te lleva a tu carpeta personal (HOME)." 
          params="/home/usuario"
          output={"# Directorio cambiado"}
          sysCalls={["chdir()", "getenv()"]}
          hint="Este cambio solo afecta a tu terminal actual, no a otras ventanas o procesos abiertos al mismo tiempo."
          code={`void cmd_cd(const char *dir) {
    if (!dir) dir = getenv("HOME");
    if (chdir(dir != NULL ? dir : "/") != 0) 
        fprintf(stderr, "cd: error al cambiar de directorio\\n");
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="mkdir" 
          context="Crea una nueva carpeta."
          desc="Crea una carpeta nueva en la ubicación que le indiques. Al crearla, se le asignan permisos estándar para que tú puedas usarla y otros puedan verla." 
          params="nuevo_directorio"
          output={"# Directorio creado exitosamente"}
          sysCalls={["mkdir()"]}
          hint="El número 0755 define quién puede entrar y leer la carpeta: el dueño tiene acceso total, los demás solo pueden verla."
          code={`void cmd_mkdir(const char *nombre) {
    if (!nombre) { puts("mkdir: falta el nombre"); return; }
    if (mkdir(nombre, 0755) != 0) 
        fprintf(stderr, "mkdir: no se pudo crear\\n");
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="unlink" 
          context="Borra un archivo del sistema."
          desc="Elimina un archivo. En Linux, borrar un archivo significa quitarle su nombre; si nadie más lo está usando en ese momento, el contenido también desaparece del disco." 
          params="documento.txt"
          output={"# Archivo eliminado"}
          sysCalls={["unlink()"]}
          hint="Un archivo puede tener varios nombres (accesos directos). unlink() solo elimina uno de esos nombres, no necesariamente el contenido."
          code={`void cmd_unlink(const char *archivo) {
    if (!archivo) { puts("unlink: falta archivo"); return; }
    if (unlink(archivo) != 0) 
        fprintf(stderr, "unlink: error al eliminar\\n");
}`}
        />
        <CommandDetail 
          category="Sistema de Archivos"
          cmd="rename" 
          context="Renombra o mueve un archivo."
          desc="Cambia el nombre de un archivo o lo mueve a otra ubicación, igual que cuando le das clic derecho y eliges 'Renombrar'. También funciona como el comando 'mv' de Linux." 
          params="viejo.txt nuevo.txt"
          output={"# Archivo renombrado exitosamente"}
          sysCalls={["rename()"]}
          hint="Esta operación es segura: el archivo siempre existe durante el proceso, nunca se pierde a mitad del cambio."
          code={`void cmd_rename(const char *viejo, const char *nuevo) {
    if (!viejo || !nuevo) { puts("rename: faltan argumentos"); return; }
    if (rename(viejo, nuevo) != 0) 
        fprintf(stderr, "rename: error al renombrar\\n");
}`}
        />
      </div>

      {/* CATEGORÍA 2: SISTEMA */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>⚙️</span>
        Información del Sistema y Hardware
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommandDetail 
          category="Kernel"
          cmd="stat" 
          context="Muestra información detallada de un archivo."
          desc="Muestra los detalles de un archivo: cuánto pesa, cuándo fue creado, quién puede abrirlo y un número único que lo identifica dentro del sistema." 
          params="shell"
          output={"Archivo: shell | Inodo: 1452637 | Tamaño: 16840 bytes | Permisos: 755"}
          sysCalls={["stat()", "struct stat"]}
          hint="La información viene empacada en una estructura. Hay que acceder a cada campo por separado para mostrar el tamaño, los permisos, etc."
          code={`void cmd_stat(const char *ruta) {
    struct stat st;
    if (stat(ruta, &st) == 0)
        printf("Inodo: %lu | Tamaño: %ld bytes", st.st_ino, st.st_size);
}`}
        />
        <CommandDetail 
          category="Hardware"
          cmd="free" 
          context="Muestra cuánta memoria RAM tiene el equipo."
          desc="Te dice cuánta memoria RAM tiene tu computadora en total y cuánta tiene disponible en este momento, como el administrador de tareas pero desde la terminal." 
          params="Ninguno"
          output={"RAM Total: 16384 MB | Libre: 4210 MB"}
          sysCalls={["sysinfo()", "struct sysinfo"]}
          hint="Los valores vienen en bytes, así que hay que dividir dos veces entre 1024 para convertirlos a megabytes (MB) y que sean más fáciles de leer."
          code={`void cmd_free(void) {
    struct sysinfo si;
    sysinfo(&si);
    printf("RAM Total: %lu MB", si.totalram / 1024 / 1024);
}`}
        />
        <CommandDetail 
          category="Sistema"
          cmd="uname" 
          context="Muestra el nombre y versión del sistema operativo."
          desc="Te dice qué sistema operativo estás usando y qué versión del kernel tiene instalada tu equipo, junto con el tipo de procesador (32 o 64 bits)." 
          params="-a"
          output={"Linux 5.15.0-76-generic x86_64"}
          sysCalls={["uname()", "struct utsname"]}
          hint="La información del sistema viene en una estructura ya lista. Solo hay que leerla e imprimirla, no hace falta liberar nada al terminar."
          code={`void cmd_uname(char **args) {
    struct utsname u; uname(&u);
    printf("%s %s %s", u.sysname, u.release, u.machine);
}`}
        />
        <CommandDetail 
          category="Kernel"
          cmd="statvfs" 
          context="Muestra información del espacio en disco."
          desc="Te dice cuánto espacio tiene en total tu disco duro y cómo está organizado internamente. Es útil para saber si te estás quedando sin espacio de almacenamiento." 
          params="/"
          output={"ID de bloque: 4096 | Bloques totales: 61049511"}
          sysCalls={["statvfs()", "struct statvfs"]}
          hint="El disco no guarda byte por byte; usa bloques (grupos de bytes). Multiplicando el tamaño de bloque por el número de bloques obtienes el total del disco."
          code={`void cmd_statvfs(const char *ruta) {
    if (!ruta) ruta = "/";
    struct statvfs vfs;
    if (statvfs(ruta, &vfs) == 0) {
        printf("ID de bloque: %lu | Bloques totales: %lu\\n", 
               vfs.f_bsize, vfs.f_blocks);
    }
}`}
        />
        <CommandDetail 
          category="Sistema"
          cmd="date" 
          context="Muestra la fecha y hora actual del sistema."
          desc="Imprime la fecha y hora exacta en que ejecutas el comando. El sistema guarda el tiempo como un número gigante de segundos y luego lo convierte a un formato legible." 
          params="Ninguno"
          output={"Wed May 13 14:02:45 2026"}
          sysCalls={["time()", "ctime()"]}
          hint="El sistema cuenta los segundos desde el 1 de enero de 1970. La función ctime() se encarga de convertir ese número a una fecha normal que todos entendemos."
          code={`void cmd_date(void) {
    time_t t = time(NULL);
    printf("%s", ctime(&t));
}`}
        />
      </div>

      {/* CATEGORÍA 3: RED */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>🌐</span>
        Red e Interfaces Físicas
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommandDetail 
          category="Networking"
          cmd="ip" 
          context="Muestra las direcciones IP de tu equipo."
          desc="Lista las tarjetas de red de tu computadora (WiFi, cable, etc.) y la dirección IP que tiene asignada cada una. Es como ver la 'identidad' de tu equipo en la red." 
          params="Ninguno"
          output={"lo         127.0.0.1\\nenp3s0     192.168.1.75\\nwlan0      192.168.1.80"}
          sysCalls={["getifaddrs()", "inet_ntoa()"]}
          hint="Las interfaces de red se devuelven en una lista. Hay que recorrerla completa y al final liberar la memoria que se usó para no desperdiciarla."
          code={`void cmd_ip(void) {
    struct ifaddrs *ifs, *p;
    getifaddrs(&ifs);
    for (p = ifs; p; p = p->ifa_next) {
        if (p->ifa_addr->sa_family == AF_INET)
            printf("%s: %s", p->ifa_name, inet_ntoa(...));
    }
    freeifaddrs(ifs);
}`}
        />
        <CommandDetail 
          category="Networking"
          cmd="mac" 
          context="Muestra la dirección física de tus tarjetas de red."
          desc="Cada tarjeta de red (WiFi o cable) tiene una dirección única grabada en el hardware desde fábrica, llamada dirección MAC. Este comando la muestra para cada interfaz." 
          params="Ninguno"
          output={"enp3s0     00:1a:2b:3c:4d:5e\\nwlan0      a4:b2:c1:d3:e4:f5"}
          sysCalls={["socket()", "ioctl()", "SIOCGIFHWADDR"]}
          hint="Para leer esta información se necesita abrir una conexión de red temporal (socket) y pedirle al sistema el identificador físico de cada interfaz."
          code={`void cmd_mac(void) {
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct ifreq ifr;
    ioctl(sock, SIOCGIFHWADDR, &ifr);
}`}
        />
      </div>

      {/* CATEGORÍA 4: USUARIOS */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>👥</span>
        Usuarios y Sesiones
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommandDetail 
          category="Sesiones"
          cmd="who" 
          context="Muestra quién está conectado al sistema."
          desc="Lista los usuarios que tienen una sesión activa en este momento, junto con la terminal desde donde están conectados. Útil para saber si hay más personas usando el equipo." 
          params="Ninguno"
          output={"usuario    tty7         (:0)"}
          sysCalls={["setutent()", "getutent()", "endutent()", "struct utmp"]}
          hint="Linux guarda un registro de las sesiones activas en un archivo especial. Hay que abrirlo, leer cada registro uno a uno, y cerrarlo al terminar."
          code={`void cmd_who(void) {
    struct utmp *u;
    setutent();
    while ((u = getutent())) {
        if (u->ut_type == USER_PROCESS) 
            printf("%-10s %-12s (%s)\\n", u->ut_user, u->ut_line, u->ut_host);
    }
    endutent();
}`}
        />
      </div>

      {/* CATEGORÍA 5: CONTROL */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>🛑</span>
        Control de la Shell
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CommandDetail 
          category="Control"
          cmd="exit" 
          context="Cierra la minishell."
          desc="Termina el programa de forma ordenada, despidiéndose con un mensaje. Le avisa al sistema que todo terminó bien antes de cerrar." 
          params="Ninguno"
          output={"Hasta luego."}
          sysCalls={["exit()"]}
          hint="Salir con el número 0 le indica al sistema que todo fue exitoso. Si saliera con otro número, significaría que algo salió mal."
          code={`void cmd_exit(void) {
    puts("Hasta luego.");
    exit(0);
}`}
        />
      </div>

      {/* CRUCIGRAMA MINISHELL */}
      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", marginTop: "4rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ background: "var(--accent-primary)", color: "white", width: "45px", height: "45px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>🧩</span>
        Repaso: Comandos y Funciones
      </h3>
      <Crossword 
        title="Crucigrama: Proyecto Minishell"
        size={15}
        clues={[
          { number: 1, direction: "down", row: 0, col: 3, answer: "UNLINK", clue: "Llamada al sistema para eliminar un archivo.", hint: "Quita el enlace duro (link) del inodo." },
          { number: 2, direction: "across", row: 0, col: 10, answer: "LS", clue: "Lista el contenido de un directorio.", hint: "Usa internamente opendir() y readdir()." },
          { number: 3, direction: "down", row: 0, col: 11, answer: "STATVFS", clue: "Llamada para obtener información de particiones (bloques libres).", hint: "Acrónimo de stat Virtual File System." },
          { number: 4, direction: "across", row: 1, col: 1, answer: "RENAME", clue: "Llamada para cambiar el nombre o ruta de un archivo.", hint: "En la terminal usas 'mv', a bajo nivel es..." },
          { number: 5, direction: "down", row: 1, col: 5, answer: "MAC", clue: "Dirección física de 48 bits del hardware de red.", hint: "Obtenida con la bandera SIOCGIFHWADDR." },
          { number: 6, direction: "across", row: 2, col: 9, answer: "UNAME", clue: "Comando que devuelve info del Kernel (sysname, release).", hint: "Unix Name." },
          { number: 7, direction: "across", row: 3, col: 5, answer: "CD", clue: "Comando para cambiar de directorio actual.", hint: "Usa internamente la llamada chdir()." },
          { number: 8, direction: "across", row: 5, col: 2, answer: "MKDIR", clue: "Crea un nuevo directorio en el sistema de archivos.", hint: "Recibe el nombre y los permisos (ej. 0755)." },
          { number: 9, direction: "down", row: 5, col: 5, answer: "IP", clue: "Protocolo lógico cuya dirección se lee iterando con getifaddrs().", hint: "Internet Protocol." },
          { number: 10, direction: "across", row: 5, col: 11, answer: "FREE", clue: "Comando que muestra la memoria RAM total y disponible.", hint: "Usa sysinfo()." },
          { number: 11, direction: "down", row: 5, col: 13, answer: "EXIT", clue: "Termina la ejecución del ciclo de la minishell.", hint: "Función homónima de la librería estándar." },
          { number: 12, direction: "across", row: 8, col: 10, answer: "STAT", clue: "Extrae metadatos precisos de un archivo (inodo, tamaño, permisos).", hint: "Estructura de datos homónima." },
          { number: 13, direction: "down", row: 9, col: 2, answer: "PWD", clue: "Imprime la ruta absoluta del directorio de trabajo actual.", hint: "Print Working Directory (usa getcwd)." },
          { number: 14, direction: "down", row: 9, col: 4, answer: "CAT", clue: "Lee un archivo bloque por bloque y lo imprime en pantalla.", hint: "Abre con open(), lee con read()." },
          { number: 15, direction: "across", row: 11, col: 2, answer: "DATE", clue: "Muestra la fecha y hora actual del sistema.", hint: "Usa time() y ctime()." },
          { number: 16, direction: "across", row: 13, col: 8, answer: "WHO", clue: "Muestra los usuarios conectados actualmente.", hint: "Lee registros utmp con getutent()." }
        ]}
      />

      <div style={{ marginTop: "6rem", padding: "4rem", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderRadius: "32px", color: "white", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "150px", height: "150px", background: "var(--accent-primary)", opacity: 0.1, borderRadius: "50%" }}></div>
        <h3 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "1.5rem", color: "white", letterSpacing: "-0.04em" }}>Código Fuente de la Minishell</h3>
        <CodeBlock 
          title="minishell.c" 
          code={fullCode} 
          explanation="Compila con: gcc minishell.c -o shell. El programa incluye colores ANSI para una experiencia de usuario similar a Bash." 
        />
      </div>
    </div>
  );
}

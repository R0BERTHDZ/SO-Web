import React from 'react';
import { ChapterHeader, SectionText, InfoCard } from './Chapters12';
import CodeBlock from './CodeBlock';

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
  const fullCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <dirent.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <time.h>
#include <sys/statfs.h>
#include <sys/statvfs.h>
#include <sys/sysmacros.h>
#include <utmp.h>
#include <pwd.h>
#include <grp.h>
#include <sys/utsname.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <arpa/inet.h>
#include <ifaddrs.h>
#include <sys/sysinfo.h>

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
        subtitle="Un intérprete de comandos robusto que utiliza el API nativo de Linux para gestionar el sistema." 
      />

      <SectionText>
        Este proyecto representa la culminación del curso de Sistemas Operativos, integrando la gestión de procesos, manipulación de archivos a bajo nivel, inspección del hardware y protocolos de red en una aplicación de consola profesional.
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
          context="Listado de directorios mediante flujos de datos."
          desc="Este comando es vital para la navegación. Internamente, abre un 'stream' de directorio usando opendir() y recorre cada entrada del i-nodo mediante readdir()." 
          params="."
          output={".  ..  minishell.c  shell  test_folder  documento.txt"}
          sysCalls={["opendir()", "readdir()", "closedir()", "struct dirent"]}
          hint="No olvides verificar si opendir() retorna NULL antes de intentar leer. Cada entrada del directorio tiene un campo d_name que contiene el nombre del archivo."
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
          context="Lectura de archivos a bajo nivel mediante descriptores."
          desc="Utiliza la llamada open() para obtener un descriptor de archivo y transfiere bloques de datos hacia la salida estándar." 
          params="hola.txt"
          output={"Hola mundo!\\nEste es un archivo de prueba\\nleído desde mi minishell."}
          sysCalls={["open()", "read()", "write()", "close()"]}
          hint="Usa un buffer de tamaño fijo (ej. 1024 bytes) para leer el contenido. El ciclo while debe continuar mientras read() devuelva un valor mayor a 0."
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
          context="Ruta absoluta del directorio actual."
          desc="Recupera la ruta completa desde la raíz hasta el directorio actual de trabajo." 
          params="Ninguno"
          output={"/home/usuario/Documentos/proyecto_minishell"}
          sysCalls={["getcwd()"]}
          hint="getcwd() requiere un buffer y su tamaño. Si el buffer es muy pequeño, la función fallará. Asegúrate de que el buffer tenga al menos MAX_PATH bytes."
          code={`void cmd_pwd(void) {
    if (getcwd(cwd_buf, sizeof(cwd_buf))) printf("%s\\n", cwd_buf);
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
          context="Inspección detallada de metadatos de i-nodos."
          desc="Recupera la estructura stat del kernel con detalles físicos del archivo." 
          params="shell"
          output={"Archivo: shell | Inodo: 1452637 | Tamaño: 16840 bytes | Permisos: 755"}
          sysCalls={["stat()", "struct stat"]}
          hint="La estructura stat contiene campos como st_mode para permisos y st_size para el tamaño. Usa operadores de bits para extraer permisos específicos."
          code={`void cmd_stat(const char *ruta) {
    struct stat st;
    if (stat(ruta, &st) == 0)
        printf("Inodo: %lu | Tamaño: %ld bytes", st.st_ino, st.st_size);
}`}
        />
        <CommandDetail 
          category="Hardware"
          cmd="free" 
          context="Monitoreo de recursos de memoria RAM."
          desc="Extrae la cantidad de bytes totales y libres del sistema mediante sysinfo()." 
          params="Ninguno"
          output={"RAM Total: 16384 MB | Libre: 4210 MB"}
          sysCalls={["sysinfo()", "struct sysinfo"]}
          hint="sysinfo() devuelve valores en bytes o unidades de bloque. Divide por 1024 dos veces para obtener el valor en Megabytes (MB) para que sea más legible."
          code={`void cmd_free(void) {
    struct sysinfo si;
    sysinfo(&si);
    printf("RAM Total: %lu MB", si.totalram / 1024 / 1024);
}`}
        />
        <CommandDetail 
          category="Sistema"
          cmd="uname" 
          context="Información del Kernel y arquitectura."
          desc="Identifica el SO y el hardware subyacente." 
          params="-a"
          output={"Linux 5.15.0-76-generic x86_64"}
          sysCalls={["uname()", "struct utsname"]}
          hint="La estructura utsname tiene campos fijos para el nombre del sistema, la versión y la máquina. No necesitas liberar esta memoria manualmente."
          code={`void cmd_uname(char **args) {
    struct utsname u; uname(&u);
    printf("%s %s %s", u.sysname, u.release, u.machine);
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
          context="Resolución de direcciones IPv4 por interfaz."
          desc="Escanea la pila de red para mostrar las direcciones IPv4 asignadas." 
          params="Ninguno"
          output={"lo         127.0.0.1\\nenp3s0     192.168.1.75\\nwlan0      192.168.1.80"}
          sysCalls={["getifaddrs()", "inet_ntoa()"]}
          hint="getifaddrs() crea una lista enlazada. Debes usar freeifaddrs() al final para evitar fugas de memoria (memory leaks)."
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
          context="Extracción de identificadores físicos."
          desc="Recupera la dirección MAC de 48 bits de cada interfaz física." 
          params="Ninguno"
          output={"enp3s0     00:1a:2b:3c:4d:5e\\nwlan0      a4:b2:c1:d3:e4:f5"}
          sysCalls={["socket()", "ioctl()", "SIOCGIFHWADDR"]}
          hint="Usa ioctl() con la bandera SIOCGIFHWADDR. El resultado se guarda en el campo sa_data de la estructura sockaddr, que debes castear a unsigned char*."
          code={`void cmd_mac(void) {
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct ifreq ifr;
    ioctl(sock, SIOCGIFHWADDR, &ifr);
}`}
        />
      </div>

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

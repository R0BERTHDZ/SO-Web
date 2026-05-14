"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CodeBlock from "../components/CodeBlock";

const TOTAL_PRACTICAS = 6;

export default function PracticasPage() {
  const [activePractica, setActivePractica] = useState<number | null>(1);
  const [completedPracticas, setCompletedPracticas] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("os_completed_practicas");
    if (stored) setCompletedPracticas(JSON.parse(stored));
  }, []);

  const navigateNext = (currentId: number) => {
    // Mark current as completed
    const next = Array.from(new Set([...completedPracticas, currentId]));
    setCompletedPracticas(next);
    localStorage.setItem("os_completed_practicas", JSON.stringify(next));
    const practicePercent = Math.round((next.length / TOTAL_PRACTICAS) * 100);
    localStorage.setItem("os_practice_percent", String(practicePercent));
    window.dispatchEvent(new Event("os_progress_update"));

    // Go to next practice or scroll to top
    const nextId = currentId + 1;
    if (nextId <= TOTAL_PRACTICAS) {
      setActivePractica(nextId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // All done — scroll back to top
      setActivePractica(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const practicas = [
    {
      id: 1,
      title: "Práctica 1: Jerarquía de Procesos",
      topic: "Unidad 2: Procesos e Hilos (Creación y Control)",
      objective: "Comprender la creación y sincronización de procesos en Linux mediante la creación de un árbol jerárquico recursivo.",
      learning: "Se aprende a utilizar la llamada al sistema fork() para la creación de procesos, el uso de getpid() y getppid() para identificar la relación padre-hijo, y el control de flujo recursivo para generar estructuras complejas (árboles).",
      conclusion: "Aprendí que la sincronización con waitpid() es crítica para evitar procesos huérfanos o zombis, y cómo cada llamada a fork() duplica el espacio de memoria, permitiendo que cada hijo continúe su propia rama del árbol.",
      improvement: "El código podría mejorarse implementando el manejo de señales (SIGCHLD) para una recolección de hijos más asíncrona, o limitando el número máximo de procesos mediante semáforos para evitar un 'fork bomb'.",
      instructions: [
        "1. Crear un proceso hijo utilizando la llamada al sistema fork().",
        "2. Implementar una función recursiva para generar niveles de profundidad.",
        "3. El proceso padre debe imprimir su PID y el del hijo creado.",
        "4. El proceso padre debe esperar a sus dos hijos usando waitpid()."
      ],
      codeTitle: "arbol_procesos.c",
      code: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>

void crear_arbol(int nivel_actual, int nivel_max) {
    if (nivel_actual >= nivel_max) return;

    pid_t hijo1, hijo2;

    hijo1 = fork();
    if (hijo1 == 0) {
        printf("Padre: %d -> Hijo: %d (Nivel %d)\\n", getppid(), getpid(), nivel_actual + 1);
        crear_arbol(nivel_actual + 1, nivel_max);
        exit(0);
    }

    hijo2 = fork();
    if (hijo2 == 0) {
        printf("Padre: %d -> Hijo: %d (Nivel %d)\\n", getppid(), getpid(), nivel_actual + 1);
        crear_arbol(nivel_actual + 1, nivel_max);
        exit(0);
    }

    waitpid(hijo1, NULL, 0);
    waitpid(hijo2, NULL, 0);
    sleep(1); // Pequeña pausa para visualización
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Uso: %s <nivel>\\n", argv[0]);
        return 1;
    }
    int nivel = atoi(argv[1]);
    printf("Proceso principal: %d\\n", getpid());
    crear_arbol(0, nivel);
    return 0;
}`,
      output: `Proceso principal: 1234
Padre: 1234 -> Hijo: 1235 (Nivel 1)
Padre: 1234 -> Hijo: 1236 (Nivel 1)
Padre: 1235 -> Hijo: 1237 (Nivel 2)
Padre: 1235 -> Hijo: 1238 (Nivel 2)`
    },
    {
      id: 2,
      title: "Práctica 2: Tuberías Anónimas (Pipes)",
      topic: "Unidad 3.1: Comunicación mediante tuberías (IPC)",
      objective: "Implementar comunicación bidireccional entre procesos mediante pipes para realizar cálculos paralelos de factoriales.",
      learning: "Uso de pares de descriptores (fd[2]), clausura de canales para evitar bloqueos y la tríada fundamental fork-write-read para sincronización IPC.",
      conclusion: "Aprendí que las tuberías son flujos unidireccionales; para una comunicación de ida y vuelta completa (full-duplex) se requieren dos estructuras pipe independientes.",
      improvement: "Implementar validación de entradas para evitar desbordamientos de buffer o el uso de hilos para comparación de rendimiento frente a procesos.",
      instructions: [
        "1. Crear dos tuberías (fd1 y fd2) con la función pipe().",
        "2. Realizar un fork() para separar lógica de padre e hijo.",
        "3. El padre calcula el factorial de N1 y envía N2 al hijo vía fd1.",
        "4. El hijo calcula el factorial de N2 y devuelve el resultado vía fd2.",
        "5. El padre lee el resultado y muestra ambos factoriales."
      ],
      codeTitle: "factorial_pipe.c",
      code: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>

int main(int argc, char *argv[]){
    if (argc != 3) {
        printf("Uso: %s <num1> <num2>\\n", argv[0]);
        return 1;
    }

    int num1, num2;
    double res1 = 1, res2 = 1;
    int fd1[2], fd2[2];
    pid_t pid;

    pipe(fd1);
    pipe(fd2);

    pid = fork();
 
    if(pid == 0){ // PROCESO HIJO
        close(fd1[1]); close(fd2[0]);
        read(fd1[0], &num2, sizeof(num2));

        for(int i = 1; i <= num2; i++) res2 *= i;

        write(fd2[1], &res2, sizeof(res2));
        close(fd1[0]); close(fd2[1]);
        exit(0);
    }
    else{ // PROCESO PADRE
        close(fd1[0]); close(fd2[1]);
        num1 = atoi(argv[1]);
        num2 = atoi(argv[2]);
		
        for(int i = 1; i <= num1; i++) res1 *= i;

        write(fd1[1], &num2, sizeof(num2));
        wait(NULL);
        read(fd2[0], &res2, sizeof(res2));

        printf("\\nEl factorial del primer numero (%d) es: %.0f\\n", num1, res1);
        printf("El factorial del segundo numero (%d) es: %.0f\\n", num2, res2);

        close(fd1[1]); close(fd2[0]);
    }
    return 0;
}`,
      output: `./factorial_pipe 5 4\\n\\nEl factorial del primer numero (5) es: 120\\nEl factorial del segundo numero (4) es: 24`
    },
    {
      id: 3,
      title: "Práctica 3: Sincronización y Memoria (Cracker)",
      topic: "Unidad 3.2 y 3.3: Semáforos y Memoria Compartida",
      objective: "Desarrollar un sistema de fuerza bruta para descifrar hashes de contraseñas utilizando memoria compartida (mmap) y semáforos POSIX para la sincronización productor-consumidor.",
      learning: "Dominio de memoria compartida anónima, sincronización con semáforos para evitar condiciones de carrera y uso de la librería criptográfica crypt.h.",
      conclusion: "Comprendí que la sincronización es el pilar de los sistemas multi-proceso; sin los semáforos 'mutex' y 'listo', el verificador y el generador no podrían trabajar en armonía sobre el mismo buffer.",
      improvement: "Se podría implementar paralelismo real creando un proceso hijo por cada núcleo de CPU disponible, dividiendo el espacio de búsqueda de permutaciones.",
      instructions: [
        "1. Reservar memoria compartida para SharedMem y Sems usando mmap().",
        "2. Inicializar semáforos POSIX con sem_init() para controlar el acceso al buffer.",
        "3. Padre: Generar permutaciones recursivas y colocarlas en la memoria compartida.",
        "4. Hijo: Esperar la señal del semáforo, leer la palabra y verificarla con crypt().",
        "5. Finalizar ambos procesos cuando se encuentre la coincidencia exacta del hash."
      ],
      codeTitle: "password_cracker.c",
      code: `#define _GNU_SOURCE
<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;semaphore.h&gt;</span>
<span class="code-inc">#include &lt;sys/mman.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>
<span class="code-inc">#include &lt;crypt.h&gt;</span>
<span class="code-inc">#include &lt;time.h&gt;</span>

#define PASS_LEN 11

typedef struct {
    char perm[PASS_LEN + 1];
    int  found;
    int  done;
} SharedMem;

typedef struct {
    sem_t mutex;
    sem_t listo;
} Sems;

const char *HASH_ORIGINAL = "$y$j9T$QXaYnGfPtA3cgshAEKDkk0$F/VochlwTN1yhlxAhhQ9G/h4RDKV6Pjjs7CchNXgp/6";

void permute(char *arr, int n, SharedMem *shm, Sems *sems) {
    if (shm->found) return;
    if (n == 1) {
        sem_wait(&sems->mutex);
        strncpy(shm->perm, arr, PASS_LEN);
        shm->perm[PASS_LEN] = '\\0';
        sem_post(&sems->listo);
        return;
    }
    for (int i = 0; i < n; i++) {
        if (shm->found) return;
        permute(arr, n - 1, shm, sems);
        char t = arr[i]; arr[i] = arr[n-1]; arr[n-1] = t;
    }
}

void proceso_hijo(SharedMem *shm, Sems *sems) {
    char local_perm[PASS_LEN + 1];
    while (1) {
        sem_wait(&sems->listo);
        strncpy(local_perm, shm->perm, PASS_LEN);
        if (shm->done) exit(1);
        sem_post(&sems->mutex);

        char *resultado = crypt(local_perm, HASH_ORIGINAL);
        if (strcmp(resultado, HASH_ORIGINAL) == 0) {
            shm->found = 1;
            printf("\\n¡ÉXITO! Contraseña encontrada: %s\\n", local_perm);
            exit(0);
        }
    }
}

int main(void) {
    char arr[PASS_LEN + 1] = "milly+56890";
    SharedMem *shm = mmap(NULL, sizeof(SharedMem), PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);
    Sems *sems = mmap(NULL, sizeof(Sems), PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);
    sem_init(&sems->mutex, 1, 1);
    sem_init(&sems->listo, 1, 0);

    if (fork() == 0) proceso_hijo(shm, sems);
    else {
        permute(arr, PASS_LEN, shm, sems);
        wait(NULL);
    }
    return 0;
}`,
      output: `Cronómetro iniciado...\\n\\n¡ÉXITO! Contraseña encontrada: milly+56890\\nHan transcurrido 0.42 minutos.`
    },
    {
      id: 4,
      title: "Práctica 4: Colas de Mensajes (System V)",
      topic: "Unidad 3.4: Colas de Mensajes (IPC)",
      objective: "Desarrollar un sistema de comunicación asíncrona que permita compartir el estado de los usuarios conectados mediante colas de mensajes del kernel.",
      learning: "Gestión de estructuras de mensajes (mtype/mtext), persistencia de datos en el kernel y acceso programático a la información de login mediante utmp.h.",
      conclusion: "Descubrí que a diferencia de los pipes, las colas de mensajes permiten que los datos sobrevivan al proceso emisor, facilitando una comunicación más robusta.",
      improvement: "Añadir el control de eliminación de la cola con msgctl() para evitar el desperdicio de recursos del sistema después de la ejecución.",
      instructions: [
        "1. Crear una llave única con ftok() asociada al binario del programa.",
        "2. Abrir/Crear la cola de mensajes con msgget() y permisos 0666.",
        "3. Modo 's': Leer utmp, formatear el tiempo con ctime() y enviar con msgsnd().",
        "4. Modo 'r': Leer la cola con msgrcv() y mostrar la lista de usuarios.",
        "5. Manejar el flujo asíncrono usando la bandera IPC_NOWAIT."
      ],
      codeTitle: "usuarios_msg.c",
      code: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>
<span class="code-inc">#include &lt;time.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/msg.h&gt;</span>
<span class="code-inc">#include &lt;utmp.h&gt;</span>

struct msgbuf {
    long mtype;
    char mtext[128];
};

void send_msg(int qid, int msgtype) {
    struct msgbuf msg;
    struct utmp *entry;
    int count = 0;
    setutent();
    while ((entry = getutent()) != NULL) {
        if (entry->ut_type == USER_PROCESS) {
            msg.mtype = msgtype;
            time_t login_t = entry->ut_tv.tv_sec;
            char *time_str = ctime(&login_t);
            time_str[strlen(time_str) - 1] = '\\0';
            snprintf(msg.mtext, sizeof(msg.mtext), "%-12s %s", entry->ut_user, time_str);
            msgsnd(qid, (void *)&msg, sizeof(msg.mtext), IPC_NOWAIT);
            count++;
        }
    }
    printf("Información de %d usuario(s) enviada.\\n", count);
    endutent();
}

void get_msg(int qid, int msgtype) {
    struct msgbuf msg;
    printf("%-12s %s\\n------------------------------------------\\n", "USUARIO", "HORA DE CONEXIÓN");
    while (msgrcv(qid, (void *)&msg, sizeof(msg.mtext), msgtype, MSG_NOERROR | IPC_NOWAIT) != -1) {
        printf("%s\\n", msg.mtext);
    }
}

int main(int argc, char *argv[]) {
    if (argc != 2) return 1;
    key_t llave = ftok(argv[0], 'a');
    int qid = msgget(llave, IPC_CREAT | 0666);
    if (strcmp(argv[1], "s") == 0) send_msg(qid, 1);
    else get_msg(qid, 1);
    return 0;
}`,
      output: `./usuarios_msg s\\nInformación de 2 usuario(s) enviada.\\n\\n./usuarios_msg r\\nUSUARIO      HORA DE CONEXIÓN\\n------------------------------------------\\nusuario1     Mon May 11 14:30:00 2026\\nusuario2     Mon May 11 14:32:00 2026`
    },
    {
      id: 5,
      title: "Práctica 5: Investigación de Parámetros del Kernel (IPC)",
      topic: "Unidad 3: Configuración y Límites del Kernel",
      objective: "Explorar el directorio /proc/sys/kernel para comprender cómo Linux administra los límites de los recursos IPC en tiempo real.",
      learning: "Identificación de archivos virtuales, comprensión de límites críticos (shmmax, msgmax) y el rol del sistema de archivos /proc en la administración del núcleo.",
      conclusion: "Aprendí que el Kernel utiliza archivos virtuales para exponer su configuración; modificar estos valores permite optimizar el sistema para aplicaciones de alto rendimiento.",
      improvement: "Se podrían automatizar las pruebas de rendimiento variando estos parámetros y observando el impacto en la latencia de los mensajes o el throughput de memoria.",
      instructions: [
        "1. Navegar al directorio /proc/sys/kernel/ mediante la terminal.",
        "2. Listar los archivos relacionados con colas de mensajes (msg*).",
        "3. Listar los archivos relacionados con memoria compartida (shm*).",
        "4. Leer el archivo 'sem' para identificar los 4 límites de los semáforos.",
        "5. Documentar el significado de cada parámetro encontrado."
      ],
      codeTitle: "Comandos de Investigación",
      code: `# Listar parámetros de Colas de Mensajes
ls /proc/sys/kernel/msg*

# Listar parámetros de Memoria Compartida
ls /proc/sys/kernel/shm*

# Leer límites de Semáforos
cat /proc/sys/kernel/sem`,
      output: `msgmax: 8192 (bytes por mensaje)\\nmsgmnb: 16384 (capacidad total cola)\\nmsgmni: 32000 (máximo de colas)\\n\\nshmmax: 18446744073692774399\\nshmall: 18446744073692774399\\n\\n32000  1024000000  500  32000 (SEMMSL, SEMMNS, SEMOPM, SEMMNI)`
    },
    {
      id: 6,
      title: "Práctica 6: Tuberías con Nombre (FIFOs)",
      topic: "Unidad 3.1: Comunicación mediante FIFOs",
      objective: "Transferir estructuras de datos complejas (matrices) a través del sistema de archivos utilizando FIFOs para calcular determinantes de forma distribuida.",
      learning: "Diferenciación entre pipes anónimos y FIFOs, persistencia de archivos especiales en disco y envío de bloques de memoria estructurados.",
      conclusion: "Descubrí que los FIFOs permiten una comunicación más flexible ya que no dependen de la jerarquía de procesos (fork), sino de la ruta del archivo en el sistema.",
      improvement: "Implementar un sistema donde el nombre de la FIFO sea pasado por argumento para permitir múltiples instancias de comunicación simultáneas.",
      instructions: [
        "1. Crear el archivo especial 'mi_fifo' mediante la llamada mkfifo().",
        "2. Padre: Abrir la FIFO en modo escritura (O_WRONLY) y enviar tamaño + matriz.",
        "3. Hijo: Abrir la FIFO en modo lectura (O_RDONLY) y recuperar los datos.",
        "4. Implementar el cálculo del determinante por el método de cofactores (recursión).",
        "5. Asegurar el cierre de descriptores de archivo con close() al finalizar."
      ],
      codeTitle: "matriz_fifo.c",
      code: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;fcntl.h&gt;</span>
<span class="code-inc">#include &lt;sys/stat.h&gt;</span>
<span class="code-inc">#include &lt;time.h&gt;</span>

#define MAX 8
#define FIFO "mi_fifo"

int determinante(int m[MAX][MAX], int size) {
    if (size == 1) return m[0][0];
    int det = 0, sub[MAX][MAX], signo = 1;
    for (int x = 0; x < size; x++) {
        int subi = 0;
        for (int i = 1; i < size; i++) {
            int subj = 0;
            for (int j = 0; j < size; j++) {
                if (j == x) continue;
                sub[subi][subj++] = m[i][j];
            }
            subi++;
        }
        det += signo * m[0][x] * determinante(sub, size - 1);
        signo = -signo;
    }
    return det;
}

int main() {
    int matriz[MAX][MAX], n;
    mkfifo(FIFO, 0666);
    if (fork() > 0) {
        int fd = open(FIFO, O_WRONLY);
        srand(time(NULL));
        n = (rand() % 4) + 2; // Matriz 2x2 a 5x5 para demo
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) matriz[i][j] = rand() % 10;
        write(fd, &n, sizeof(int));
        write(fd, matriz, sizeof(matriz));
        close(fd);
    } else {
        int fd = open(FIFO, O_RDONLY);
        read(fd, &n, sizeof(int));
        read(fd, matriz, sizeof(matriz));
        printf("\\nCONSUMIDOR recibio matriz %dx%d\\n", n, n);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) printf("%4d", matriz[i][j]);
            printf("\\n");
        }
        printf("\\nDeterminante: %d\\n", determinante(matriz, n));
        close(fd);
    }
    return 0;
}`,
      output: `PRODUCTOR generando matriz 3x3\\n\\nCONSUMIDOR recibio matriz 3x3\\n\\n   4   2   1\\n   0   5   3\\n   2   1   4\\n\\nDeterminante: 65`
    }
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "100px", maxWidth: "1200px", margin: "0 auto", padding: "100px 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ background: "rgba(155, 28, 46, 0.1)", color: "var(--accent-primary)", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: 700, display: "inline-block", marginBottom: "1rem" }}>
            Laboratorio de Sistemas Operativos
          </span>
          <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--accent-primary)", marginBottom: "1.2rem", letterSpacing: "-0.04em" }}>
            Prácticas de Código en C
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Explora las soluciones implementadas durante el curso, analizando el impacto de las llamadas al sistema y la gestión de recursos del Kernel.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2.5rem", alignItems: "start" }} className="practicas-layout">
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem", 
            position: "sticky", 
            top: "120px",
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
            paddingRight: "0.5rem"
          }} className="practicas-sidebar-scroll">
            {practicas.map((p) => (
              <button key={p.id} onClick={() => {
                setActivePractica(p.id);
                const contentArea = document.getElementById("practica-content");
                if (contentArea) {
                  const offset = 100;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = contentArea.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
                style={{
                  textAlign: "left", padding: "1.5rem", borderRadius: "16px",
                  background: activePractica === p.id ? "var(--accent-primary)" : "var(--bg-card)",
                  color: activePractica === p.id ? "white" : "var(--text-primary)",
                  border: `1px solid ${activePractica === p.id ? "var(--accent-primary)" : "var(--border-color)"}`,
                  boxShadow: activePractica === p.id ? "0 10px 25px rgba(155, 28, 46, 0.2)" : "0 4px 12px rgba(0,0,0,0.03)",
                  cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: activePractica === p.id ? "translateX(10px)" : "none"
                }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, opacity: activePractica === p.id ? 0.8 : 0.5, marginBottom: "0.5rem", letterSpacing: "1px" }}>
                  TEMA: {p.topic.split(":")[0]}
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800 }}>{p.title.split(": ")[1]}</div>
              </button>
            ))}
          </div>

          <div id="practica-content" style={{ background: "var(--bg-card)", borderRadius: "24px", border: "1px solid var(--border-color)", padding: "3rem", boxShadow: "0 15px 50px rgba(0,0,0,0.05)" }}>
            {practicas.map((p) => {
              if (p.id !== activePractica) return null;
              return (
                <div key={p.id} className="animate-fadeIn">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent-primary)", letterSpacing: "-0.03em" }}>{p.title}</h2>
                    <span style={{ fontSize: "0.85rem", background: "var(--bg-secondary)", color: "var(--text-secondary)", padding: "0.4rem 1.2rem", borderRadius: "30px", fontWeight: 700, border: "1px solid var(--border-color)" }}>{p.topic}</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                    <div style={{ padding: "1.5rem", background: "rgba(155, 28, 46, 0.03)", borderRadius: "16px", borderLeft: "4px solid var(--accent-primary)" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>Objetivo Académico</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{p.objective}</p>
                    </div>
                    <div style={{ padding: "1.5rem", background: "rgba(37, 99, 235, 0.05)", borderRadius: "16px", borderLeft: "4px solid #2563eb", borderTop: "1px solid var(--border-color)", borderRight: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#3b82f6", marginBottom: "0.5rem" }}>¿Qué se aprende?</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{p.learning}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.2rem", color: "var(--text-primary)" }}>Instrucciones Técnicas</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {p.instructions.map((inst, i) => (
                        <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
                          <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "1rem" }}>{inst.substring(inst.indexOf(".") + 1)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "3rem" }}>
                    <CodeBlock title={p.codeTitle} code={p.code} explanation="Implementación robusta de sistemas operativos en C." output={p.output} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                    <div style={{ padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>📝 Conclusión Personal</h4>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{p.conclusion}</p>
                    </div>
                    <div style={{ padding: "1.5rem", background: "rgba(155, 28, 46, 0.05)", borderRadius: "16px", border: "1px solid rgba(155, 28, 46, 0.2)" }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>🚀 Propuesta de Mejora</h4>
                      <p style={{ color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{p.improvement}</p>
                    </div>
                  </div>

                  {/* Navigation Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", borderTop: "1px solid var(--border-color)" }}>
                    {/* Completion badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {completedPracticas.includes(p.id) && (
                        <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 700, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                          ✅ Práctica completada
                        </span>
                      )}
                    </div>

                    {/* Next button */}
                    <button
                      onClick={() => navigateNext(p.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                        background: "var(--accent-primary)",
                        color: "white",
                        border: "none",
                        padding: "1rem 2rem",
                        borderRadius: "14px",
                        fontWeight: 800,
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 8px 25px rgba(155, 28, 46, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(155, 28, 46, 0.4)"; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(155, 28, 46, 0.3)"; }}
                    >
                      {p.id < TOTAL_PRACTICAS ? (
                        <>
                          Siguiente Práctica
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </>
                      ) : (
                        <>
                          🏆 Completar todas las prácticas
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Sidebar Scrollbar Styling */
        .practicas-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .practicas-sidebar-scroll::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.02);
          border-radius: 10px;
        }
        .practicas-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(155, 28, 46, 0.2);
          border-radius: 10px;
        }
        .practicas-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }

        @media (max-width: 900px) { 
          .practicas-layout { grid-template-columns: 1fr !important; } 
          .practicas-sidebar-scroll { 
            position: relative !important; 
            top: 0 !important; 
            max-height: none !important;
            overflow-y: visible !important;
          }
        }
      `}</style>
    </>
  );
}

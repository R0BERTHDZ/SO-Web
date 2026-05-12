// Syntax-highlighted C code snippets
export const CODE = {

  fork: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/types.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">pid_t</span> pid = <span class="code-fn">fork</span>();   <span class="code-cmt">/* duplicar proceso */</span>

    <span class="code-kw">if</span> (pid &lt; <span class="code-num">0</span>)  { <span class="code-fn">perror</span>(<span class="code-str">"fork"</span>); <span class="code-kw">return</span> <span class="code-num">1</span>; }
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) {
        <span class="code-fn">printf</span>(<span class="code-str">"HIJO  PID=%d  PPID=%d\\n"</span>, <span class="code-fn">getpid</span>(), <span class="code-fn">getppid</span>());
    } <span class="code-kw">else</span> {
        <span class="code-fn">printf</span>(<span class="code-str">"PADRE PID=%d  hijo=%d\\n"</span>, <span class="code-fn">getpid</span>(), pid);
    }
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  forkOut: `PADRE PID=1024  hijo=1025
HIJO  PID=1025  PPID=1024`,

  wait: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;sys/wait.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">pid_t</span> pid = <span class="code-fn">fork</span>();
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) {
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo trabajando...\\n"</span>);
        <span class="code-fn">sleep</span>(<span class="code-num">2</span>);
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo terminando\\n"</span>);
        <span class="code-fn">_exit</span>(<span class="code-num">42</span>);        <span class="code-cmt">/* código de salida */</span>
    }
    <span class="code-type">int</span> status;
    <span class="code-fn">waitpid</span>(pid, &amp;status, <span class="code-num">0</span>);  <span class="code-cmt">/* esperar hijo específico */</span>
    <span class="code-kw">if</span> (<span class="code-fn">WIFEXITED</span>(status))
        <span class="code-fn">printf</span>(<span class="code-str">"Padre: hijo salió con %d\\n"</span>, <span class="code-fn">WEXITSTATUS</span>(status));
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  waitOut: `Hijo trabajando...
Hijo terminando
Padre: hijo salió con 42`,

  zombi: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;stdlib.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">pid_t</span> pid = <span class="code-fn">fork</span>();
    <span class="code-kw">if</span> (pid == <span class="code-num">0</span>) {
        <span class="code-fn">printf</span>(<span class="code-str">"Hijo PID=%d saliendo...\\n"</span>, <span class="code-fn">getpid</span>());
        <span class="code-fn">exit</span>(<span class="code-num">0</span>);   <span class="code-cmt">/* hijo termina → queda zombi si padre no llama wait */</span>
    }
    <span class="code-fn">printf</span>(<span class="code-str">"Padre duerme 10s (hijo es ZOMBI)\\n"</span>);
    <span class="code-fn">sleep</span>(<span class="code-num">10</span>);   <span class="code-cmt">/* ver: ps aux | grep Z */</span>
    <span class="code-fn">wait</span>(NULL); <span class="code-cmt">/* recoge al hijo → desaparece el zombi */</span>
    <span class="code-fn">printf</span>(<span class="code-str">"Padre recogió al hijo\\n"</span>);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  zombiOut: `Hijo PID=1026 saliendo...
Padre duerme 10s (hijo es ZOMBI)
# Durante 10s: ps aux | grep defunct
usuario   1026  0.0  0.0  0  0  Z  <defunct>
Padre recogió al hijo`,

  threads: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;pthread.h&gt;</span>

<span class="code-type">void</span>* <span class="code-fn">mi_hilo</span>(<span class="code-type">void</span>* arg) {
    <span class="code-type">int</span> id = *(<span class="code-type">int</span>*)arg;
    <span class="code-fn">printf</span>(<span class="code-str">"Hilo %d ejecutando\\n"</span>, id);
    <span class="code-kw">return</span> NULL;
}

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">pthread_t</span> hilos[<span class="code-num">3</span>];
    <span class="code-type">int</span> ids[<span class="code-num">3</span>] = {<span class="code-num">1</span>, <span class="code-num">2</span>, <span class="code-num">3</span>};
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; <span class="code-num">3</span>; i++)
        <span class="code-fn">pthread_create</span>(&amp;hilos[i], NULL, mi_hilo, &amp;ids[i]);
    <span class="code-kw">for</span> (<span class="code-type">int</span> i = <span class="code-num">0</span>; i &lt; <span class="code-num">3</span>; i++)
        <span class="code-fn">pthread_join</span>(hilos[i], NULL);
    <span class="code-fn">printf</span>(<span class="code-str">"Todos los hilos terminaron\\n"</span>);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  threadsOut: `Hilo 1 ejecutando
Hilo 3 ejecutando
Hilo 2 ejecutando
Todos los hilos terminaron`,

  pipe: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">int</span> fd[<span class="code-num">2</span>];           <span class="code-cmt">/* fd[0]=lectura  fd[1]=escritura */</span>
    <span class="code-fn">pipe</span>(fd);

    <span class="code-kw">if</span> (<span class="code-fn">fork</span>() == <span class="code-num">0</span>) {  <span class="code-cmt">/* HIJO: escribe */</span>
        <span class="code-fn">close</span>(fd[<span class="code-num">0</span>]);
        <span class="code-type">char</span>* msg = <span class="code-str">"Hola desde el hijo"</span>;
        <span class="code-fn">write</span>(fd[<span class="code-num">1</span>], msg, <span class="code-fn">strlen</span>(msg));
        <span class="code-fn">close</span>(fd[<span class="code-num">1</span>]);
    } <span class="code-kw">else</span> {            <span class="code-cmt">/* PADRE: lee */</span>
        <span class="code-fn">close</span>(fd[<span class="code-num">1</span>]);
        <span class="code-type">char</span> buf[<span class="code-num">64</span>] = {<span class="code-num">0</span>};
        <span class="code-fn">read</span>(fd[<span class="code-num">0</span>], buf, <span class="code-kw">sizeof</span>(buf));
        <span class="code-fn">printf</span>(<span class="code-str">"Padre recibió: %s\\n"</span>, buf);
        <span class="code-fn">close</span>(fd[<span class="code-num">0</span>]);
        <span class="code-fn">wait</span>(NULL);
    }
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  pipeOut: `Padre recibió: Hola desde el hijo`,

  fifo: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;fcntl.h&gt;</span>
<span class="code-inc">#include &lt;sys/stat.h&gt;</span>
<span class="code-inc">#include &lt;unistd.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>

<span class="code-cmt">/* Escritor */</span>
<span class="code-type">int</span> <span class="code-fn">escritor</span>() {
    <span class="code-fn">mkfifo</span>(<span class="code-str">"/tmp/mififo"</span>, <span class="code-num">0666</span>);
    <span class="code-type">int</span> fd = <span class="code-fn">open</span>(<span class="code-str">"/tmp/mififo"</span>, O_WRONLY);
    <span class="code-type">char</span>* msg = <span class="code-str">"Mensaje por FIFO"</span>;
    <span class="code-fn">write</span>(fd, msg, <span class="code-fn">strlen</span>(msg));
    <span class="code-fn">close</span>(fd);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}

<span class="code-cmt">/* Lector (proceso diferente) */</span>
<span class="code-type">int</span> <span class="code-fn">lector</span>() {
    <span class="code-type">int</span> fd = <span class="code-fn">open</span>(<span class="code-str">"/tmp/mififo"</span>, O_RDONLY);
    <span class="code-type">char</span> buf[<span class="code-num">64</span>] = {<span class="code-num">0</span>};
    <span class="code-fn">read</span>(fd, buf, <span class="code-kw">sizeof</span>(buf));
    <span class="code-fn">printf</span>(<span class="code-str">"Lector: %s\\n"</span>, buf);
    <span class="code-fn">close</span>(fd);
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  fifoOut: `# Terminal 1 (escritor)
$ ./escritor
# Terminal 2 (lector)
Lector: Mensaje por FIFO`,

  semaphore: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;sys/ipc.h&gt;</span>
<span class="code-inc">#include &lt;sys/sem.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">key_t</span> llave = <span class="code-fn">ftok</span>(<span class="code-str">"."</span>, <span class="code-num">65</span>);   <span class="code-cmt">/* generar llave */</span>
    <span class="code-type">int</span>   semid = <span class="code-fn">semget</span>(llave, <span class="code-num">1</span>, <span class="code-num">0666</span>|IPC_CREAT);

    <span class="code-cmt">/* Inicializar semáforo en 1 */</span>
    <span class="code-fn">semctl</span>(semid, <span class="code-num">0</span>, SETVAL, <span class="code-num">1</span>);

    <span class="code-type">struct</span> sembuf op_p = {<span class="code-num">0</span>, -<span class="code-num">1</span>, <span class="code-num">0</span>}; <span class="code-cmt">/* P() wait  */</span>
    <span class="code-type">struct</span> sembuf op_v = {<span class="code-num">0</span>, +<span class="code-num">1</span>, <span class="code-num">0</span>}; <span class="code-cmt">/* V() signal */</span>

    <span class="code-fn">semop</span>(semid, &amp;op_p, <span class="code-num">1</span>);   <span class="code-cmt">/* entrar a sección crítica */</span>
    <span class="code-fn">printf</span>(<span class="code-str">"Sección crítica...\\n"</span>);
    <span class="code-fn">sleep</span>(<span class="code-num">1</span>);
    <span class="code-fn">semop</span>(semid, &amp;op_v, <span class="code-num">1</span>);   <span class="code-cmt">/* salir de sección crítica */</span>

    <span class="code-fn">semctl</span>(semid, <span class="code-num">0</span>, IPC_RMID); <span class="code-cmt">/* eliminar semáforo */</span>
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  semaphoreOut: `Sección crítica...
# ipcs -s  (ver semáforos del sistema)
------ Semaphore Arrays --------
key        semid  owner  perms  nsems`,

  sharedMem: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;sys/ipc.h&gt;</span>
<span class="code-inc">#include &lt;sys/shm.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">key_t</span> llave = <span class="code-fn">ftok</span>(<span class="code-str">"."</span>, <span class="code-num">1</span>);
    <span class="code-type">int</span> shmid = <span class="code-fn">shmget</span>(llave, <span class="code-num">1024</span>, <span class="code-num">0666</span>|IPC_CREAT);

    <span class="code-kw">if</span> (<span class="code-fn">fork</span>() == <span class="code-num">0</span>) {         <span class="code-cmt">/* ESCRITOR */</span>
        <span class="code-type">char</span>* shm = (<span class="code-type">char</span>*)<span class="code-fn">shmat</span>(shmid, NULL, <span class="code-num">0</span>);
        <span class="code-fn">strcpy</span>(shm, <span class="code-str">"Dato compartido"</span>);
        <span class="code-fn">shmdt</span>(shm);
    } <span class="code-kw">else</span> {                   <span class="code-cmt">/* LECTOR */</span>
        <span class="code-fn">sleep</span>(<span class="code-num">1</span>);
        <span class="code-type">char</span>* shm = (<span class="code-type">char</span>*)<span class="code-fn">shmat</span>(shmid, NULL, <span class="code-num">0</span>);
        <span class="code-fn">printf</span>(<span class="code-str">"Leído: %s\\n"</span>, shm);
        <span class="code-fn">shmdt</span>(shm);
        <span class="code-fn">shmctl</span>(shmid, IPC_RMID, NULL);
        <span class="code-fn">wait</span>(NULL);
    }
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  sharedMemOut: `Leído: Dato compartido`,

  msgQueue: `<span class="code-inc">#include &lt;stdio.h&gt;</span>
<span class="code-inc">#include &lt;sys/ipc.h&gt;</span>
<span class="code-inc">#include &lt;sys/msg.h&gt;</span>
<span class="code-inc">#include &lt;string.h&gt;</span>

<span class="code-type">struct</span> mensaje {
    <span class="code-type">long</span> tipo;
    <span class="code-type">char</span> texto[<span class="code-num">64</span>];
};

<span class="code-type">int</span> <span class="code-fn">main</span>() {
    <span class="code-type">key_t</span> llave = <span class="code-fn">ftok</span>(<span class="code-str">"."</span>, <span class="code-num">2</span>);
    <span class="code-type">int</span>   msqid = <span class="code-fn">msgget</span>(llave, <span class="code-num">0666</span>|IPC_CREAT);

    <span class="code-kw">if</span> (<span class="code-fn">fork</span>() == <span class="code-num">0</span>) {         <span class="code-cmt">/* EMISOR */</span>
        <span class="code-type">struct</span> mensaje m = {<span class="code-num">1</span>, <span class="code-str">"Hola cola de mensajes"</span>};
        <span class="code-fn">msgsnd</span>(msqid, &amp;m, <span class="code-kw">sizeof</span>(m.texto), <span class="code-num">0</span>);
    } <span class="code-kw">else</span> {                   <span class="code-cmt">/* RECEPTOR */</span>
        <span class="code-type">struct</span> mensaje m;
        <span class="code-fn">msgrcv</span>(msqid, &amp;m, <span class="code-kw">sizeof</span>(m.texto), <span class="code-num">1</span>, <span class="code-num">0</span>);
        <span class="code-fn">printf</span>(<span class="code-str">"Recibido: %s\\n"</span>, m.texto);
        <span class="code-fn">msgctl</span>(msqid, IPC_RMID, NULL);
        <span class="code-fn">wait</span>(NULL);
    }
    <span class="code-kw">return</span> <span class="code-num">0</span>;
}`,
  msgQueueOut: `Recibido: Hola cola de mensajes`,

  ftok: `<span class="code-type">key_t</span> llave = <span class="code-fn">ftok</span>(<span class="code-str">"./archivo_comun"</span>, <span class="code-num">65</span>);
<span class="code-cmt">/* Todos los procesos con misma ruta+id obtendrán la misma llave */</span>
<span class="code-fn">printf</span>(<span class="code-str">"Llave generada: %d\\n"</span>, llave);`,
  ftokOut: `Llave generada: 1234567`,
};

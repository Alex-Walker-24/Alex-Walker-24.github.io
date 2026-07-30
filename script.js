/* ─────────────────────────────────────────────────
       1. NETWORK BACKGROUND CANVAS
    ───────────────────────────────────────────────── */
  /* ─────────────────────────────────────────────────
       1. NETWORK BACKGROUND CANVAS WITH GLOW EFFECT
    ───────────────────────────────────────────────── */
    (function initNetwork() {
      const canvas = document.getElementById('network-canvas');
      const hero   = document.getElementById('hero');
      const ctx    = canvas.getContext('2d');
      let W, H;

      function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const pts = Array.from({ length: 500 }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * 2,
        vy: (Math.random() - .5) * 2,
      }));

      function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d  = Math.hypot(dx, dy);
            if (d < 130) {
              ctx.beginPath();
              
              // Desactivamos la sombra para las líneas de red (así el rendimiento no cae)
              ctx.shadowBlur = 0; 
              
              ctx.strokeStyle = `rgba(240,180,41,${.22 * (1 - d / 130)})`;
              ctx.lineWidth   = .8;
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }

        pts.forEach(p => {
          ctx.beginPath();
          
          /* 💡 NUEVO: Configuración del Aura de Luz (Glow Effect) */
          ctx.shadowBlur = 30;                // Qué tan grande y difuminada es la luz externa
          ctx.shadowColor = 'rgba(240,180,41,0.8)'; // El color del resplandor (dorado brillante)
          
          /* Dibujo de la partícula */
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(240,180,41,.9)'; // Un punto central más sólido para que destaque
          ctx.fill();
          
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        });

        requestAnimationFrame(draw);
      }
      draw();
    })();


    /* ─────────────────────────────────────────────────
       2. TYPEWRITER CODE EDITOR
    ───────────────────────────────────────────────── */
    (function initEditor() {
      const container = document.getElementById('ed-lines');

      // [lineNumber, htmlContent]  —  '' = línea en blanco
      const LINES = [
        [1,  `<span class="kw">class</span> <span class="cls">Developer</span> <span class="pu">{</span>`],
        [2,  ``],
        [3,  `  <span class="fn">nombre</span>     <span class="pu">=</span> <span class="st">'Alejandro Alejo Martínez'</span><span class="pu">;</span>`],
        [4,  `  <span class="fn">dirección</span> <span class="pu">=</span> <span class="st">'Ciudad de México, GAM'</span><span class="pu">;</span>`],
        [5,  ``],
        [6,  `  <span class="fn">roles</span>    <span class="pu">= [</span>`],
        [7,  `    <span class="st">'Desarrollo de software'</span><span class="pu">,</span>`],
        [8,  `    <span class="st">'Analista de datos'</span><span class="pu">,</span>`],
        [9,  `    <span class="st">'Docente'</span>`],
        [10, `  <span class="pu">];</span>`],
        [11, ``],
        [12, `  <span class="fn">Habilidades Técnicas</span>    <span class="pu">= {</span>`],
        [13, `    frontend<span class="pu">:</span> <span class="pu">[</span><span class="st">'HTML'</span><span class="pu">,</span> <span class="st">'CSS'</span><span class="pu">,</span> <span class="st">'JS'</span><span class="pu">],</span>`],
        [14, `    backend<span class="pu">:</span>  <span class="pu">[</span><span class="st">'PHP'</span><span class="pu">,</span> <span class="st">'Laravel'</span><span class="pu">,</span> <span class="st">'Python'</span><span class="pu">],</span>`],
        [15, `    data<span class="pu">:</span>     <span class="pu">[</span><span class="st">'Power BI'</span><span class="pu">,</span> <span class="st">'SQL'</span><span class="pu">,</span> <span class="st">'Excel'</span><span class="pu">]</span>`],
        [16, `  <span class="pu">};</span>`],
        [17, ``],
        [18, `  Pasiones  <span class="pu">=</span> <span class="st">'Construir, analizar y enseñar'</span><span class="pu">;</span>`],
        [19, `<span class="pu">}</span>`],
        [20, ``],
        [21, `<span class="cm">// Siempre aprendiendo, siempre construyendo...</span>`],
      ];

      function textLen(html) {
        return html.replace(/<[^>]*>/g, '').length;
      }

      function addLine(idx) {
        // Quitar el caret de la línea anterior
        const prev = container.querySelector('.caret');
        if (prev) prev.remove();

        if (idx >= LINES.length) return;

        const [num, html] = LINES[idx];

        const row    = document.createElement('div');
        row.className = 'ed-line';

        const numEl  = document.createElement('span');
        numEl.className   = 'ed-num';
        numEl.textContent = num;

        const codeEl = document.createElement('span');
        codeEl.className = 'ed-code';
        codeEl.innerHTML = html + '<span class="caret"></span>';

        row.appendChild(numEl);
        row.appendChild(codeEl);
        container.appendChild(row);

        // Delay proporcional a la longitud visible del texto
        const len   = textLen(html);
        const delay = len === 0 ? 55 : Math.min(Math.max(len * 3.8, 70), 250);
        setTimeout(() => addLine(idx + 1), delay);
      }

      // Arrancar después de que las animaciones del hero se asienten
      setTimeout(() => addLine(0), 950);
    })();


    /* ─────────────────────────────────────────────────
       3. ACTIVE NAV LINK ON SCROLL
    ───────────────────────────────────────────────── */
    (function initNavScroll() {
      const links    = document.querySelectorAll('.nav-links a');
      const sections = Array.from(links)
        .map(l => document.querySelector(l.getAttribute('href')))
        .filter(Boolean);

      if (!sections.length) return;

      window.addEventListener('scroll', () => {
        const y = window.scrollY + 120;
        let active = sections[0];
        sections.forEach(s => { if (y >= s.offsetTop) active = s; });
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + active.id);
        });
      }, { passive: true });
    })();









    
/* ─────────────────────────────────────────────────
   1. EXPERIENCIA CANVAS PARTICLES
───────────────────────────────────────────────── */
(function initExpCanvas() {
  const canvas = document.getElementById('exp-canvas');
  const section = document.getElementById('experiencia');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize(){

    W = canvas.width = section.clientWidth;
    H = canvas.height = section.scrollHeight;

}

new ResizeObserver(resize).observe(section);

window.addEventListener("resize", resize);

resize();
  window.addEventListener('resize', resize);

  // Más partículas para formar una red más densa
  const pts = Array.from({ length: 300 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - .5) * 2,
    vy: (Math.random() - .5) * 2,
  }));

  function draw() {

    ctx.clearRect(0, 0, W, H);

    // ==========================
    // Dibujar conexiones
    // ==========================
    for (let i = 0; i < pts.length; i++) {

      for (let j = i + 1; j < pts.length; j++) {

        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);

        if (d < 130) {

          ctx.beginPath();

          // Sin glow para mejorar rendimiento
          ctx.shadowBlur = 0;

          ctx.strokeStyle = `rgba(240,180,41,${.22 * (1 - d / 130)})`;
          ctx.lineWidth = .8;

          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);

          ctx.stroke();

        }

      }

    }

    // ==========================
    // Dibujar partículas
    // ==========================
    pts.forEach(p => {

      ctx.beginPath();

      // Glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(240,180,41,0.8)';

      ctx.arc(
        p.x,
        p.y,
        1.5,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = 'rgba(240,180,41,.9)';
      ctx.fill();

      // Reiniciamos el glow
      ctx.shadowBlur = 0;

      // Movimiento
      p.x += p.vx;
      p.y += p.vy;

      // Rebote en bordes
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

    });

    requestAnimationFrame(draw);

  }

  draw();

})();





/* ─────────────────────────────────────────────────
   2. Experincia Modal Logic
───────────────────────────────────────────────── */
const JOBS_DATA = [
  {
    icon: '🚌',
    title: 'Secretaría de Movilidad',
    date: 'Oct. 2019 - Mar. 2020',
    role: 'Desarrollador Web Full Stack',
    desc: 'Participé en el desarrollo de un sistema de gestión de licencias enfocado en la administración y control de información. Colaboré en la visualización, actualización, eliminación y registro de usuarios, contribuyendo a optimizar los procesos administrativos mediante soluciones web eficientes.',

    responsabilities: [
      'Desarrollo de aplicaciones web utilizando PHP y Laravel.',
      'Diseño y administración de bases de datos relacionales con MySQL.',
      'Implementación de módulos para registro, consulta y actualización de información.',
      'Optimización del rendimiento de consultas SQL y estructura de bases de datos.',
      'Mantenimiento y mejora continua de funcionalidades del sistema.'
    ],

    tech: [
      'Laravel',
      'PHP',
      'MySQL',
      'Bootstrap',
      'JavaScript',
      'HTML/CSS',
      'Xampp'
    ]
  },

  {
    icon: '📚',
    title: 'CEB 4/2 "Jesús Reyes Heroles"',
    date: 'Ago. 2020 - Ene. 2021',
    role: 'Analista Programador',
    desc: 'Desarrollé e implemente un sistema de control de becas para estudiantes, permitiendo la gestión eficiente de solicitudes, aprobaciones y seguimiento de beneficios. Además, brindé soporte técnico y capacitación a los usuarios del sistema, asegurando su correcta utilización y optimización de procesos administrativos.',

    responsabilities: [
      'Desarrollo de un sistema de control de becas utilizando PHP y Laravel.',
      'Diseño y administración de bases de datos MySQL para el almacenamiento de información.',
      'Implementación de funcionalidades para registro, seguimiento y aprobación de becas.',
      'Capacitación a usuarios internos sobre el uso del sistema.',
      'Mantenimiento y actualización del sistema según requerimientos institucionales.'
    ],

    tech: [
      'Laravel',
      'PHP',
      'MySQL',
      'Bootstrap',
      'JavaScript',
      'HTML/CSS',
      'Xampp'
    ]
  },

  {
    icon: '⚖️',
    title: 'Fiscalía General de Justicia CDMX',
    date: 'Jul. 2020 - Ene. 2021',
    role: 'Analista Programador',
    desc: 'Participé en el desarrollo y mantenimiento de sistemas administrativos internos para la gestión de procesos judiciales. Además, apoyé en el análisis y optimización de bases de datos, así como en la generación de reportes para distintas áreas de la institución.',

    responsabilities: [
      'Desarrollo de sistemas administrativos utilizando PHP.',
      'Administración y optimización de bases de datos Oracle.',
      'Creación de consultas SQL y procedimientos almacenados.',
      'Corrección de incidencias y mantenimiento de aplicaciones existentes.',
      'Soporte técnico a usuarios internos.'
    ],

    tech: [
      'Laravel',
      'PHP',
      'MySQL',
      'Bootstrap',
      'JavaScript',
      'HTML/CSS',
      'Xampp'
    ]
  },

  {
    icon: '💼',
    title: 'Stefanini México S.A. de C.V.',
    date: 'Ene. 2021 - Ago. 2021',
    role: 'Analista de Soporte IT',
    desc: 'Brindé soporte técnico especializado para usuarios corporativos de Volkswagen México. Gestioné incidentes, realicé seguimiento de tickets y aseguré el cumplimiento de los tiempos de atención establecidos por los acuerdos de nivel de servicio (SLA).',

    responsabilities: [
      'Atención y seguimiento de incidencias mediante herramientas ITSM.',
      'Soporte remoto a usuarios finales.',
      'Escalamiento de incidentes a equipos especializados.',
      'Monitoreo y cumplimiento de indicadores de servicio (SLA).',
      'Documentación de soluciones y procedimientos técnicos.'
    ],

    tech: [
      'Microsoft Teams',
      'Software Móvil',
      'Windows',
      'Office 365',
      'Soporte Técnico'
    ]
  },

  {
    icon: '🎓',
    title: 'La Salle - Escuela Cristóbal Colón',
    date: 'Ago. 2021 - Oct. 2024',
    role: 'Profesor • Analista de Datos JR • Programador',
    desc: 'Combino la docencia con el análisis de datos para fortalecer la toma de decisiones académicas. Diseño estrategias de evaluación, desarrollo dashboards en Power BI y aplico herramientas de análisis para medir el desempeño estudiantil.',

    responsabilities: [
      'Impartición de Matemáticas, Física y Programación.',
      'Desarrollo de dashboards interactivos con Power BI.',
      'Análisis estadístico del desempeño académico.',
      'Diseño de estrategias de mejora basadas en indicadores.',
      'Implementación de proyectos tecnológicos con estudiantes.'
    ],

    tech: [
      'Google Class Room',
      'Microsoft Office',
      'Labster',
      'Power BI',
      'Excel',
      'SQL',
      'Python',
      'Geogebra',
      'Elementor',
      'Cpanel'
    ]
  },

  {
    icon: '🏫',
    title: 'Justo Sierra - Bachillerato Tecnológico',
    date: 'Feb. 2025 - Feb. 2026',
    role: 'Profesor • Analista de Datos JR',
    desc: 'Imparto asignaturas de Matemáticas, Programación, Computación e Informática en nivel bachillerato tecnológico. Desarrollo estrategias didácticas centradas en competencias, aprendizaje activo y el uso de herramientas digitales para fortalecer el perfil profesional de los estudiantes.',

    responsabilities: [
      'Impartición de Matemáticas I, II, III, IV y V.',
      'Enseñanza de Programación, Informática y Computación.',
      'Implementación de proyectos tecnológicos interdisciplinarios.',
      'Uso de Power BI, Excel y herramientas digitales en el aula.',
      'Seguimiento académico y acompañamiento estudiantil.'
    ],

    tech: [
      'Python',
      'Power BI',
      'Excel',
      'SQL',
      'Programación',
      'Matemáticas',
      'Pedagogía'
    ]
  }
];

const modal = document.getElementById('jobModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');

document.querySelectorAll('.timeline-node').forEach(node => {
  node.addEventListener('click', (e) => {
    const jobIndex = parseInt(node.dataset.job);
    const job = JOBS_DATA[jobIndex];
    
    document.getElementById('modalIcon').textContent = job.icon;
    document.getElementById('modalTitle').textContent = job.title;
    document.getElementById('modalDate').textContent = job.date;
    document.getElementById('modalRole').textContent = job.role;
    document.getElementById('modalDesc').textContent = job.desc;
    
    const respList = document.getElementById('modalRespons');
    respList.innerHTML = '';
    job.responsabilities.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r;
      respList.appendChild(li);
    });
    
    const techDiv = document.getElementById('modalTech');
    techDiv.innerHTML = '';
    job.tech.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      techDiv.appendChild(span);
    });
    
    modal.classList.add('active');
  });
});

modalClose.addEventListener('click', () => modal.classList.remove('active'));
modalOverlay.addEventListener('click', () => modal.classList.remove('active'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('active');
});






/* ─────────────────────────────────────────────────
   PROYECTOS WEB - PARTICLES
───────────────────────────────────────────────── */

(function initProjectsCanvas() {

    const canvas = document.getElementById("projects-canvas");
    const section = document.getElementById("proyectos-web");
    const ctx = canvas.getContext("2d");

    let W, H;

    function resize() {

        W = canvas.width = section.offsetWidth;
        H = canvas.height = section.offsetHeight;

    }

    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 500 }, () => ({

        x: Math.random() * W,
        y: Math.random() * H,

        vx: (Math.random() - .5) * 3,
        vy: (Math.random() - .5) * 3

    }));

    function draw() {

        ctx.clearRect(0,0,W,H);

        /* Líneas */

        for(let i=0;i<pts.length;i++){

            for(let j=i+1;j<pts.length;j++){

                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;

                const d = Math.hypot(dx,dy);

                if(d<130){

                    ctx.beginPath();

                    ctx.shadowBlur = 0;

                    ctx.strokeStyle =
                    `rgba(240,180,41,${.22*(1-d/130)})`;

                    ctx.lineWidth = .8;

                    ctx.moveTo(pts[i].x,pts[i].y);
                    ctx.lineTo(pts[j].x,pts[j].y);

                    ctx.stroke();

                }

            }

        }

        /* Partículas */

        pts.forEach(p=>{

            ctx.beginPath();

            ctx.shadowBlur = 30;
            ctx.shadowColor = "rgba(240,180,41,.8)";

            ctx.arc(p.x,p.y,1.5,0,Math.PI*2);

            ctx.fillStyle = "rgba(240,180,41,.9)";
            ctx.fill();

            ctx.shadowBlur = 0;

            p.x += p.vx;
            p.y += p.vy;

            if(p.x<0||p.x>W) p.vx*=-1;
            if(p.y<0||p.y>H) p.vy*=-1;

        });

        requestAnimationFrame(draw);

    }

    draw();

})();




/* ══════════════════════════════════════════════════════════
   SCRIPT PARA ACTUALIZAR EL ICONO ACTIVO SEGÚN EL SCROLL
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.mobile-floating-nav .mobile-nav-link');

  function changeNavOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Ejecutar al hacer scroll
  window.addEventListener('scroll', changeNavOnScroll);

  // También marcar como activo inmediatamente al hacer clic en un icono
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
<script>
  document.querySelectorAll('.ramo').forEach(ramo => {
    ramo.addEventListener('click', () => {
      const id = ramo.dataset.id;
      const prerreq = ramo.dataset.prerreq;
      
      if (prerreq) {
        const preReqElement = document.querySelector(`.ramo[data-id="${prerreq}"]`);
        if (!preReqElement.classList.contains('aprobado')) {
          alert(`Debes aprobar primero: ${prerreq}`);
          return;
        }
      }

      ramo.classList.toggle('aprobado');
    });
  });
</script>
const ramos = [
  {
    nombre: "introduccion a las matematicas",
    semestre: "1-1",
  },
  {
    nombre: "tecnología de información para la gestión 1",
    semestre: "1-1",
  },
  {
    nombre: "Administración 1",
    semestre: "1-1",
  },
  {
    nombre: "Desafios de la ingenieria comercial",
    semestre: "1-1",
  },
  {
    nombre: "contabilidad",
    semestre: "1-1",
  },
  {
    nombre: "electivo de comunicación",
    semestre: "1-1",
  },
  {
    nombre: "Algebra",
    semestre: "1-2",
    requisitos: ["introduccion a las matematicas"],
  },
  {
    nombre: "Tecnología de la información para la gestión 2",
    semestre: "1-2",
    requisitos: ["tecnología de información para la gestión 1"],
  },
  {
    nombre: "Introducción a la economia",
    semestre: "1-2",
    requisitos: ["introduccion a las matematicas"],
  },
  {
    nombre: "Administración 2",
    semestre: "1-2",
    requisitos: ["Administración 1"],
  },
  {
    nombre: "Contabilidad 2",
    semestre: "1-2",
    requisitos: ["contabilidad"],
  },
  {
    nombre: "Electivo de comunicación",
    semestre: "1-2",
  },
  // Continúa ingresando los ramos según la malla PDF...
];

const estadoRamos = {};

function crearMalla() {
  const mallaDiv = document.getElementById("malla");

  const semestresUnicos = [...new Set(ramos.map(r => r.semestre))];

  semestresUnicos.forEach(semestre => {
    const contenedor = document.createElement("div");
    contenedor.classList.add("semestre");
    contenedor.innerHTML = `<h2>Semestre ${semestre}</h2>`;
    
    ramos
      .filter(r => r.semestre === semestre)
      .forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";
        div.textContent = ramo.nombre;
        div.dataset.nombre = ramo.nombre;
        div.dataset.requisitos = JSON.stringify(ramo.requisitos || []);
        actualizarEstado(div);
        div.addEventListener("click", () => aprobarRamo(div));
        contenedor.appendChild(div);
      });

    mallaDiv.appendChild(contenedor);
  });
}

function aprobarRamo(div) {
  const nombre = div.dataset.nombre;
  const requisitos = JSON.parse(div.dataset.requisitos);

  if (requisitos.some(req => !estadoRamos[req])) return;

  estadoRamos[nombre] = !estadoRamos[nombre];
  actualizarMalla();
}

function actualizarMalla() {
  document.querySelectorAll(".ramo").forEach(div => {
    actualizarEstado(div);
  });
}

function actualizarEstado(div) {
  const nombre = div.dataset.nombre;
  const requisitos = JSON.parse(div.dataset.requisitos);

  if (estadoRamos[nombre]) {
    div.classList.add("aprobado");
    div.classList.remove("bloqueado");
  } else if (requisitos.some(req => !estadoRamos[req])) {
    div.classList.add("bloqueado");
    div.classList.remove("aprobado");
  } else {
    div.classList.remove("aprobado", "bloqueado");
  }
}

crearMalla();

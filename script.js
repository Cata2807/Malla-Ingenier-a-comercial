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

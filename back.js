  // ===== ENVELOPE INTERACTION =====
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  let isOpened = false;

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;
    waxSeal.classList.add('seal-breaking');
    setTimeout(() => {
      envelope.classList.add('opened');
      waxSeal.style.display = 'none';
      document.getElementById('letterCard').classList.add('shimmer');
    }, 600);
  }

  waxSeal.addEventListener('click', openEnvelope);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openEnvelope();
  });

  // ===== RSVP FORM =====
  const rsvpBtn = document.getElementById('rsvpBtn');
  const rsvpOverlay = document.getElementById('rsvpOverlay');
  const rsvpClose = document.getElementById('rsvpClose');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpFormFields = document.getElementById('rsvpFormFields');
  const rsvpSuccess = document.getElementById('rsvpSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  rsvpBtn.addEventListener('click', () => {
    rsvpOverlay.classList.add('active');
  });

  rsvpClose.addEventListener('click', () => {
    rsvpOverlay.classList.remove('active');
  });

  rsvpOverlay.addEventListener('click', (e) => {
    if (e.target === rsvpOverlay) {
      rsvpOverlay.classList.remove('active');
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== FORM SUBMIT (SEM SDK) =====
 rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('guestNameInput').value.trim();
  if (!name) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span>Enviando...';

  fetch("https://script.google.com/macros/s/AKfycbz9PXy-ii-rtQ-ajnWWSJFshs7FtTYLkyWvltNMbY1oCGEmaH4oU_hcJUJ5Eo3ik5SA/exec", {
    method: "POST",
    body: new URLSearchParams({
      nome: name
    })
  })
  .then(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Confirmar';

    rsvpFormFields.classList.add('hidden');
    rsvpSuccess.classList.add('show');
  })
  .catch(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Confirmar';
    showToast("Erro ao enviar.");
  });
});

  // ===== ICONS =====
  lucide.createIcons();
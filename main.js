// Menu mobile
(function () {
  const btn = document.querySelector("[data-menu-btn]");
  const nav = document.querySelector("[data-mobile-nav]");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }
})();

// Formulário (Formspree) — português + redirect
(function () {
  const form = document.querySelector("[data-formspree]");
  if (!form) return;

  const endpoint = form.getAttribute("action");
  const notice = document.querySelector("[data-form-notice]");
  const btn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!endpoint) return;

    if (notice) {
      notice.className = "notice";
      notice.textContent = "";
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Enviando…";
    }

    try {
      const formData = new FormData(form);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        // sucesso
        window.location.href = "obrigado.html";
        return;
      }

      // erro do Formspree
      if (notice) {
        notice.className = "notice err";
        notice.textContent = "Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.";
      }
    } catch (err) {
      if (notice) {
        notice.className = "notice err";
        notice.textContent = "Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.";
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Enviar mensagem";
      }
    }
  });
})();

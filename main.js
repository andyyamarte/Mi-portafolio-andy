const form = document.getElementById("contact-form");
const result = form.querySelector(".form-result");
const submitBtn = form.querySelector(".boton-enviar");

const fields = {
  nombre: {
    input: document.getElementById("nombre"),
    group: document.getElementById("nombre").closest(".form-group"),
    validate: (value) => value.trim().length > 0,
    message: "Escribe tu nombre",
  },
  correo: {
    input: document.getElementById("correo"),
    group: document.getElementById("correo").closest(".form-group"),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: "Escribe un correo válido",
  },
  mensaje: {
    input: document.getElementById("mensaje"),
    group: document.getElementById("mensaje").closest(".form-group"),
    validate: (value) => value.trim().length > 0,
    message: "Escribe un mensaje",
  },
};

function clearError(field) {
  field.group.classList.remove("invalid");
  field.group.querySelector(".error-msg").textContent = "";
}

function showError(field) {
  field.group.classList.add("invalid");
  field.group.querySelector(".error-msg").textContent = field.message;
}

Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => {
    if (field.validate(field.input.value)) {
      clearError(field);
    }
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;
  Object.values(fields).forEach((field) => {
    if (field.validate(field.input.value)) {
      clearError(field);
    } else {
      showError(field);
      isValid = false;
    }
  });

  if (!isValid) {
    result.textContent = "Revisa los campos marcados antes de enviar.";
    result.className = "form-result error";
    return;
  }

  const accessKey = form.querySelector('[name="access_key"]').value;
  if (accessKey === "TU_ACCESS_KEY_DE_WEB3FORMS") {
    result.textContent =
      "Falta configurar la Access Key de Web3Forms para poder enviar el correo.";
    result.className = "form-result error";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";
  result.textContent = "";
  result.className = "form-result";

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      result.textContent = "¡Mensaje enviado! Te responderé pronto.";
      result.className = "form-result success";
      form.reset();
    } else {
      result.textContent = "No se pudo enviar el mensaje. Intenta de nuevo.";
      result.className = "form-result error";
    }
  } catch (error) {
    result.textContent = "Ocurrió un error de conexión. Intenta de nuevo.";
    result.className = "form-result error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar mensaje";
  }
});

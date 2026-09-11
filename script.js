/* ═══════════════════════════════════════════════════════════════
   NOVAMETABOLIC™ - Interactive Logic & GSAP System
   ═══════════════════════════════════════════════════════════════ */

// Global state for patient calculator profile
let calculatedProfileData = {
  bmi: 31.5,
  bmiLabel: "Obesidad Grado I",
  estimatedLoss: 19,
  gender: "f",
  age: 38,
  weightKg: 89,
  heightCm: 168,
  symptomsCount: 3
};

(function () {
  // ─── 1. GSAP INITIALIZATIONS & ANIMATIONS ───
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initial hidden states
    gsap.set(".header > *", { y: -20, opacity: 0 });
    gsap.set(".eyebrow", { y: 12, opacity: 0 });
    gsap.set(".title .word", { yPercent: 110, opacity: 0 });
    gsap.set(".title-desc", { opacity: 0, x: -10 });
    gsap.set(".paren-group .paren", { scale: 0, opacity: 0 });
    gsap.set(".avatar-group", { scale: 0, opacity: 0 });
    gsap.set(".dna-icon", { scale: 0, rotation: -45, opacity: 0 });
    gsap.set(".future-tag", { opacity: 0, x: -10 });
    gsap.set(".badge", { scale: 0, rotation: -90, opacity: 0 });
    gsap.set(".res-item", { y: 16, opacity: 0 });
    gsap.set(".wave-wrap", { x: 120, opacity: 0 });
    gsap.set(".wave-glow", { opacity: 0 });
    gsap.set(".bg-text", { opacity: 0, scale: 1.1 });

    // Master Hero Timeline on load
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.15
    });

    tl.to(".header > *", { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 })
      .to(".wave-glow", { opacity: 1, duration: 1.2 }, "-=.5")
      .to(".wave-wrap", { x: 0, opacity: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
      .to(".bg-text", { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }, "-=1.2")
      .to(".eyebrow", { y: 0, opacity: 1, duration: 0.5 }, "-=1")
      .to(".title .word", { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: "power4.out" }, "-=.8")
      .to(".title-desc", { x: 0, opacity: 1, duration: 0.6 }, "-=.5")
      .to(".paren-group .paren", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=.45")
      .to(".avatar-group", { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.3")
      .to(".dna-icon", { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=.4")
      .to(".future-tag", { x: 0, opacity: 1, duration: 0.5 }, "-=.3")
      .to(".badge", { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=.5")
      .to(".res-item", { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=.4");

    // Continuous floating oscillations
    gsap.to(".wave-wrap", {
      y: -18,
      rotation: -1.2,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".wave-glow", {
      y: 12,
      scale: 1.05,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".wave-glow.b", {
      y: -16,
      x: -10,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".badge", {
      y: "+=8",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".dna-icon svg", {
      rotation: 12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%"
    });

    // Scroll Parallax
    gsap.to(".wave-wrap", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=1200",
        scrub: 1.2
      },
      y: -240,
      rotation: 6,
      scale: 1.08
    });

    gsap.to(".bg-text", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=1000",
        scrub: 1.2
      },
      xPercent: -8,
      opacity: 0.4
    });

    // Scroll reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    });

    // Mouse parallax for cursor devices
    if (!window.matchMedia("(pointer: coarse)").matches) {
      document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        gsap.to(".wave-wrap", { x: x * 30, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        gsap.to(".wave-glow", { x: x * 60, y: y * 40, duration: 1.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(".bg-text", { x: x * -20, duration: 1.4, ease: "power3.out", overwrite: "auto" });
      });
    }

    // 3D Card Hover Perspective
    document.querySelectorAll(".clay-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotateY: x * 4,
          rotateX: -y * 4,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 900
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "elastic.out(1,.6)"
        });
      });
    });

    // Magnetic CTA Button
    document.querySelectorAll(".header-cta").forEach((cta) => {
      if (!window.matchMedia("(pointer: coarse)").matches) {
        cta.addEventListener("mousemove", (e) => {
          const r = cta.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / r.width;
          const y = (e.clientY - r.top - r.height / 2) / r.height;
          gsap.to(cta, { x: x * 6, y: y * 6, duration: 0.4, ease: "power2.out" });
        });
        cta.addEventListener("mouseleave", () => {
          gsap.to(cta, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.5)" });
        });
      }
    });
  }

  // Active navigation highlight
  const navPills = document.querySelectorAll(".nav-pill");
  navPills.forEach((p) => {
    p.addEventListener("click", () => {
      navPills.forEach((x) => x.classList.remove("active"));
      p.classList.add("active");
    });
  });

  const resItems = document.querySelectorAll(".res-item");
  resItems.forEach((item) => {
    item.addEventListener("click", () => {
      resItems.forEach((r) => r.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Init Date picker
  initDateInputDefault();
})();

/* ═══════════════════════════════════════════════════════════════
   2. CALCULADORA DE SALUD METABÓLICA (4 PASOS)
   ═══════════════════════════════════════════════════════════════ */

function updateGender(radio) {
  document.querySelectorAll('input[name="gender"]').forEach(el => {
    el.closest('.seg-btn').classList.remove('active');
  });
  radio.closest('.seg-btn').classList.add('active');
  calculateLiveBMI();
}

function calculateLiveBMI() {
  const heightInput = document.getElementById("cHeight");
  const weightInput = document.getElementById("cWeight");
  const liveVal = document.getElementById("liveBMIVal");
  const liveLbl = document.getElementById("liveBMILabel");

  if (!heightInput || !weightInput || !liveVal || !liveLbl) return;

  const heightM = parseFloat(heightInput.value) / 100;
  const weightKg = parseFloat(weightInput.value);

  if (heightM > 0 && weightKg > 0) {
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    liveVal.innerText = bmi;

    let label = "Normopeso";
    if (bmi < 18.5) label = "Bajo Peso";
    else if (bmi < 25) label = "Peso Normal";
    else if (bmi < 30) label = "Sobrepeso";
    else if (bmi < 35) label = "Obesidad Grado I";
    else if (bmi < 40) label = "Obesidad Grado II";
    else label = "Obesidad Severa (Grado III)";

    liveLbl.innerText = label;
  }
}

function nextCalcStep(stepNumber) {
  // Update step indicator
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (dot) {
      if (i <= stepNumber) dot.classList.add("active");
      else dot.classList.remove("active");
    }
  }

  // Hide all panels
  document.querySelectorAll(".calc-step-panel").forEach(p => p.classList.remove("active"));

  // Show target panel
  const target = document.getElementById(`calcStep${stepNumber}`);
  if (target) {
    target.classList.add("active");
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function processCalcResults() {
  const age = parseInt(document.getElementById("cAge")?.value || "38");
  const heightCm = parseFloat(document.getElementById("cHeight")?.value || "168");
  const weightKg = parseFloat(document.getElementById("cWeight")?.value || "89");
  const goalKg = parseFloat(document.getElementById("cGoalWeight")?.value || "70");
  const gender = document.querySelector('input[name="gender"]:checked')?.value || "f";
  const symptoms = document.querySelectorAll('input[name="symptom"]:checked').length;

  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);

  let bmiLabel = "Sobrepeso";
  let projectedLossPercent = 0.18; // 18% average reduction

  if (bmi >= 35) {
    bmiLabel = "Obesidad Grado II+";
    projectedLossPercent = 0.22;
  } else if (bmi >= 30) {
    bmiLabel = "Obesidad Grado I";
    projectedLossPercent = 0.20;
  } else if (bmi >= 27) {
    bmiLabel = "Sobrepeso con Riesgo";
    projectedLossPercent = 0.16;
  } else {
    bmiLabel = "Normopeso / Leve";
    projectedLossPercent = 0.12;
  }

  let estimatedLoss = Math.round(weightKg * projectedLossPercent);
  if (weightKg - estimatedLoss < goalKg) {
    estimatedLoss = Math.round(weightKg - goalKg);
  }
  if (estimatedLoss <= 0) estimatedLoss = 6;

  let successRate = 95.4;
  if (symptoms >= 2) successRate = 96.8;

  let recText = `Con un IMC de <strong>${bmi}</strong> (${bmiLabel}) y la presencia de síntomas de desbalance neuroendocrino, tu organismo presenta resistencia biológica al déficit calórico convencional. `;
  recText += `Tu perfil califica de manera prioritaria para nuestro <strong>Protocolo Farmacológico Dual GLP-1/GIP</strong> con telemetría continua de glucosa y reseteo del set-point metabólico para una reducción proyectada de <strong>-${estimatedLoss} kg</strong> sin efecto rebote.`;

  document.getElementById("resBMI").innerText = bmi;
  document.getElementById("resBMILabel").innerText = bmiLabel;
  document.getElementById("resWeightLoss").innerText = `-${estimatedLoss} kg`;
  document.getElementById("resSuccessRate").innerText = `${successRate}%`;
  document.getElementById("resRecommendationText").innerHTML = recText;

  calculatedProfileData = {
    bmi,
    bmiLabel,
    estimatedLoss,
    gender,
    age,
    weightKg,
    heightCm,
    symptomsCount: symptoms
  };

  nextCalcStep(4);
}

/* ═══════════════════════════════════════════════════════════════
   3. FAQ ACCORDION
   ═══════════════════════════════════════════════════════════════ */

function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  const isActive = item.classList.contains("active");

  // Close other open FAQ items
  document.querySelectorAll(".faq-item").forEach((other) => {
    if (other !== item) {
      other.classList.remove("active");
      const otherAnswer = other.querySelector(".faq-answer");
      if (otherAnswer) otherAnswer.style.maxHeight = null;
    }
  });

  if (!isActive) {
    item.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    item.classList.remove("active");
    answer.style.maxHeight = null;
  }
}

/* ═══════════════════════════════════════════════════════════════
   4. MODAL DE AGENDAMIENTO & WHATSAPP
   ═══════════════════════════════════════════════════════════════ */

function openBookingModal(source = "General") {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    const notesField = document.getElementById("bNotes");
    if (calculatedProfileData.bmi && notesField && !notesField.value) {
      notesField.value = `[Diagnóstico Calculadora] IMC: ${calculatedProfileData.bmi} (${calculatedProfileData.bmiLabel}), Meta: -${calculatedProfileData.estimatedLoss} kg, Peso: ${calculatedProfileData.weightKg} kg (Origen: ${source})`;
    }
  }
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Close on backdrop click or Escape
window.addEventListener("click", (e) => {
  const modal = document.getElementById("bookingModal");
  if (e.target === modal) closeBookingModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBookingModal();
});

function initDateInputDefault() {
  const dateInput = document.getElementById("bDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("bName")?.value.trim();
  const phone = document.getElementById("bPhone")?.value.trim();
  const email = document.getElementById("bEmail")?.value.trim();
  const date = document.getElementById("bDate")?.value;
  const time = document.getElementById("bTime")?.value;
  const modality = document.querySelector('input[name="modality"]:checked')?.value || "Telemedicina";
  const notes = document.getElementById("bNotes")?.value.trim();

  if (!name || !phone || !email || !date) {
    alert("Por favor completa los campos obligatorios (*).");
    return;
  }

  closeBookingModal();
  showToast(`¡Solicitud enviada, ${name}!`, `Un especialista coordinará tu cita para el ${date} (${time}) vía WhatsApp.`);

  // WhatsApp formatted direct link
  const waText = encodeURIComponent(
    `Hola NovaMetabolic™, he solicitado una cita médica:\n` +
    `👤 Nombre: ${name}\n` +
    `📱 Teléfono: ${phone}\n` +
    `✉️ Email: ${email}\n` +
    `🏥 Modalidad: ${modality}\n` +
    `📅 Fecha preferida: ${date} (${time})\n` +
    (notes ? `📋 Nota: ${notes}` : "")
  );

  setTimeout(() => {
    window.open(`https://wa.me/5491100000000?text=${waText}`, "_blank");
  }, 900);
}

function showToast(title, message) {
  const toast = document.getElementById("toastNotification");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  if (toast && toastTitle && toastMessage) {
    toastTitle.innerText = title;
    toastMessage.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 6000);
  }
}

/**
 * NovaMetabolic™ - Application Logic & Interactivity
 * High precision metabolic clinic landing page scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initAnimatedCounters();
    initModalModalitySelector();
    initDateInputDefault();
    initIntersectionObservers();
});

/* ==========================================================================
   1. Navbar & Navigation
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu on click link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }
}

/* ==========================================================================
   2. Number Counters Animation
   ========================================================================== */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-count'));
                    const duration = 1800; // ms
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentVal = (easeOut * target).toFixed(1);
                        
                        counter.innerText = currentVal + '%';

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target + '%';
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.hero-stats');
    if (statsBar) observer.observe(statsBar);
}

/* ==========================================================================
   3. Interactive Metabolic Assessment Calculator
   ========================================================================== */
let currentCalcStep = 1;
let calculatedProfileData = {};

function nextCalcStep(step) {
    // Validate current step before proceeding
    if (currentCalcStep === 1) {
        const age = document.getElementById('calcAge').value;
        const height = document.getElementById('calcHeight').value;
        const weight = document.getElementById('calcWeight').value;

        if (!age || age < 18 || age > 95) {
            alert('Por favor, ingresa una edad válida (mayor a 18 años).');
            return;
        }
        if (!height || height < 120 || height > 230) {
            alert('Por favor, ingresa una estatura en centímetros válida (ej. 168).');
            return;
        }
        if (!weight || weight < 40 || weight > 250) {
            alert('Por favor, ingresa un peso actual válido en kilogramos.');
            return;
        }
    }

    // Hide all steps
    document.querySelectorAll('.calc-step').forEach(el => el.classList.remove('active'));
    
    // Show target step
    const targetEl = document.getElementById(`calcStep${step}`);
    if (targetEl) {
        targetEl.classList.add('active');
        currentCalcStep = step;
        updateCalcProgress(step);
    }
}

function prevCalcStep(step) {
    document.querySelectorAll('.calc-step').forEach(el => el.classList.remove('active'));
    const targetEl = document.getElementById(`calcStep${step}`);
    if (targetEl) {
        targetEl.classList.add('active');
        currentCalcStep = step;
        updateCalcProgress(step);
    }
}

function updateCalcProgress(step) {
    const progressBar = document.getElementById('calcProgressBar');
    const percent = (step / 4) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;

    for (let i = 1; i <= 4; i++) {
        const ind = document.getElementById(`stepIndicator${i}`);
        if (ind) {
            if (i <= step) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        }
    }
}

function calculateMetabolicProfile() {
    const age = parseFloat(document.getElementById('calcAge').value) || 35;
    const heightCm = parseFloat(document.getElementById('calcHeight').value) || 170;
    const weightKg = parseFloat(document.getElementById('calcWeight').value) || 85;
    const targetLoss = parseFloat(document.getElementById('calcTargetLoss').value) || 15;
    const gender = document.getElementById('calcGender').value;

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    // BMI Classification
    let bmiLabel = 'Normopeso / Peso Saludable';
    let bmiClass = 'status-success';
    if (bmi >= 25 && bmi < 30) {
        bmiLabel = 'Sobrepeso Grado II';
        bmiClass = 'status-alert';
    } else if (bmi >= 30 && bmi < 35) {
        bmiLabel = 'Obesidad Grado I';
        bmiClass = 'status-alert';
    } else if (bmi >= 35 && bmi < 40) {
        bmiLabel = 'Obesidad Grado II (Severa)';
        bmiClass = 'status-alert';
    } else if (bmi >= 40) {
        bmiLabel = 'Obesidad Grado III (Mórbida)';
        bmiClass = 'status-alert';
    }

    // Estimate weight loss realistic timeline
    const estimatedLoss = Math.min(targetLoss, (weightKg * 0.22)).toFixed(1);

    // Success rate calculation
    let successRate = 94.5;
    const symptoms = [
        document.getElementById('symp1')?.checked,
        document.getElementById('symp2')?.checked,
        document.getElementById('symp3')?.checked,
        document.getElementById('symp4')?.checked,
        document.getElementById('symp5')?.checked,
        document.getElementById('symp6')?.checked
    ].filter(Boolean).length;

    if (symptoms >= 3) {
        successRate = 96.8;
    }

    // Tailored recommendation
    let recText = `Con un IMC de <strong>${bmi}</strong> (${bmiLabel}) y presencia de síntomas de desbalance neuroendocrino, tu organismo presenta resistencia biológica al déficit calórico convencional. `;
    recText += `Tu perfil califica de manera prioritaria para nuestro <strong>Protocolo Médico de Farmacoterapia Dual (GLP-1/GIP)</strong> con modulación del apetito central, monitorización continua y conservación de masa muscular para una pérdida proyectada de <strong>${estimatedLoss} kg</strong> sin efecto rebote.`;

    // Render results
    document.getElementById('resBMI').innerText = bmi;
    const resBMILabel = document.getElementById('resBMILabel');
    resBMILabel.innerText = bmiLabel;
    resBMILabel.className = `status-tag ${bmiClass}`;

    document.getElementById('resWeightLoss').innerText = `-${estimatedLoss} kg`;
    document.getElementById('resSuccessRate').innerText = `${successRate}%`;
    document.getElementById('resRecommendationText').innerHTML = recText;

    // Save state for booking
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

/* ==========================================================================
   4. FAQ Accordion Toggle
   ========================================================================== */
function toggleFaq(button) {
    const item = button.parentElement;
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = null;
        }
    });

    if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        item.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
    }
}

/* ==========================================================================
   5. Booking Modal Logic
   ========================================================================== */
function openBookingModal(source = 'General') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Auto pre-fill if calculator was run
        const notesField = document.getElementById('bNotes');
        if (calculatedProfileData.bmi && notesField && !notesField.value) {
            notesField.value = `[Perfil Calculadora] IMC: ${calculatedProfileData.bmi} (${calculatedProfileData.bmiLabel}), Meta: -${calculatedProfileData.estimatedLoss} kg, Peso actual: ${calculatedProfileData.weightKg} kg.`;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close on backdrop click or ESC
window.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

function initModalModalitySelector() {
    const pills = document.querySelectorAll('.mode-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const radio = pill.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
}

function initDateInputDefault() {
    const dateInput = document.getElementById('bDate');
    if (dateInput) {
        // Set min date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('bName').value.trim();
    const phone = document.getElementById('bPhone').value.trim();
    const email = document.getElementById('bEmail').value.trim();
    const date = document.getElementById('bDate').value;
    const time = document.getElementById('bTime').value;
    const modality = document.querySelector('input[name="modality"]:checked')?.value || 'Presencial';
    const notes = document.getElementById('bNotes').value.trim();

    if (!name || !phone || !email || !date) {
        alert('Por favor, completa todos los campos obligatorios marcados con *.');
        return;
    }

    // Close modal
    closeBookingModal();

    // Trigger Toast Notification
    showToast(`¡Solicitud enviada, ${name}!`, `Un especialista médico coordinará tu cita para el ${date} (${time}) vía WhatsApp.`);

    // Reset Form
    document.getElementById('bookingForm').reset();
    initDateInputDefault();

    // Construct WhatsApp message URL to give immediate option
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
        `Hola NovaMetabolic, he solicitado una cita médica:\n` +
        `👤 Nombre: ${name}\n` +
        `📱 Teléfono: ${phone}\n` +
        `🏥 Modalidad: ${modality}\n` +
        `📅 Fecha preferida: ${date} (${time})\n` +
        (notes ? `📋 Nota: ${notes}` : '')
    );

    // Optional: Ask if user wants to fast-track via WhatsApp directly
    setTimeout(() => {
        const directWa = confirm('¿Deseas enviar un mensaje directo por WhatsApp a nuestro equipo médico ahora mismo para agilizar la confirmación?');
        if (directWa) {
            window.open(`https://wa.me/5491100000000?text=${waText}`, '_blank');
        }
    }, 800);
}

/* ==========================================================================
   6. Toast Notification Helper
   ========================================================================== */
function showToast(title, message) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastTitle && toastMessage) {
        toastTitle.innerText = title;
        toastMessage.innerText = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5500);
    }
}

/* ==========================================================================
   7. Intersection Observers for Scroll Reveals
   ========================================================================== */
function initIntersectionObservers() {
    const animatedElements = document.querySelectorAll('.feature-card, .patient-card, .doctor-card, .timeline-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`;
        observer.observe(el);
    });
}

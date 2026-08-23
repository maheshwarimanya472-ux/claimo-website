/**
 * CLAIMO — Interactive Script, Animated Background Canvas & Avatar Guide Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initHeader();
  initHeroVideoAndCanvas();
  initJourneyStepper();
  initProblemsCarousel();
  initKineticChaos();
  initAvatarGuide();
  initModal();
});

/* --------------------------------------------------------------------------
   1. Cursor Ambient Spotlight
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX + window.scrollX}px`;
    spotlight.style.top = `${e.clientY + window.scrollY}px`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Header & Mobile Menu
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Animated Hero Canvas & Background Video Engine
   -------------------------------------------------------------------------- */
function initHeroVideoAndCanvas() {
  const video = document.getElementById('heroBgVideo');
  const phoneVideo = document.getElementById('heroVideo');

  if (video) {
    video.addEventListener('loadeddata', () => {
      video.style.opacity = '0.65';
    });
    video.addEventListener('error', () => {
      video.style.display = 'none';
    });
  }

  if (phoneVideo) {
    phoneVideo.addEventListener('loadeddata', () => {
      phoneVideo.style.opacity = '0.85';
    });
  }

  // Dynamic Animated Canvas: Glowing Waves & Digital Dispute Orbs
  const canvas = document.getElementById('heroVisualCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(width > 768 ? 45 : 20, 50);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1.2,
      color: i % 3 === 0 ? 'rgba(0, 255, 135, ' : 'rgba(212, 255, 50, ',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let time = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.015;

    // Draw Cyber Glow Sine Wave Line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 255, 135, 0.15)';
    for (let x = 0; x < width; x += 15) {
      const y = height * 0.55 + Math.sin(x * 0.004 + time) * 45 + Math.cos(x * 0.008 - time) * 25;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Secondary Electric Yellow Wave
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(212, 255, 50, 0.12)';
    for (let x = 0; x < width; x += 15) {
      const y = height * 0.65 + Math.sin(x * 0.003 - time) * 55 + Math.sin(x * 0.006 + time) * 20;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Particles and Connecting Lines
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00FF87';
      ctx.fill();

      // Connect near neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 255, 135, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. Interactive Animated Moving AI Avatar Guide ("Maya")
   -------------------------------------------------------------------------- */
function initAvatarGuide() {
  const triggerBtn = document.getElementById('avatarTriggerBtn');
  const speechBubble = document.getElementById('avatarSpeechBubble');
  const speechText = document.getElementById('avatarSpeechText');
  const drawer = document.getElementById('avatarChatDrawer');
  const closeBtn = document.getElementById('closeAvatarDrawer');
  const chatStream = document.getElementById('avatarChatStream');
  const quickBtns = document.querySelectorAll('.avatar-quick-btn');
  const avatarImgLayer = document.getElementById('avatarImgLayer');
  const avatarWidget = document.getElementById('avatarGuideWidget');

  // Mouse Tracking 3D Parallax on Avatar Face
  window.addEventListener('mousemove', (e) => {
    if (!avatarImgLayer) return;
    const rect = avatarWidget.getBoundingClientRect();
    const avatarCenterX = rect.left + rect.width / 2;
    const avatarCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - avatarCenterX) / window.innerWidth;
    const deltaY = (e.clientY - avatarCenterY) / window.innerHeight;

    // Subtle 3D tilt & shift towards cursor
    const rotateX = -deltaY * 25;
    const rotateY = deltaX * 25;
    avatarImgLayer.style.transform = `scale(1.15) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${deltaX * 8}px, ${deltaY * 8}px)`;
  }, { passive: true });

  // Scroll-reactive Contextual Speech Prompts
  const scrollPrompts = [
    { id: 'hero', text: "Stuck with a refund or rejected return? Click me to resolve it!" },
    { id: 'shopping-wrong', text: "Refund marked as rejected? Don't accept closed tickets!" },
    { id: 'problems', text: "Pick your exact grievance above — I'll route it directly." },
    { id: 'how-it-works', text: "See how Claimo organizes your invoice & chats into evidence!" },
    { id: 'no-more-chasing', text: "Stop waiting 48 hours in loop. Let's escalate now." },
    { id: 'pricing', text: "Early-access case checks start at just ₹99." }
  ];

  if ('IntersectionObserver' in window && speechText) {
    scrollPrompts.forEach(item => {
      const sectionEl = document.getElementById(item.id);
      if (sectionEl) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && (!drawer || !drawer.classList.contains('active'))) {
              if (speechBubble) speechBubble.style.display = 'block';
              speechText.textContent = item.text;
            }
          });
        }, { threshold: 0.35 });
        observer.observe(sectionEl);
      }
    });
  }

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (speechBubble) speechBubble.style.display = 'none';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', () => {
    if (drawer && drawer.classList.contains('active')) closeDrawer();
    else openDrawer();
  });

  if (speechBubble) speechBubble.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt');
      handleAvatarQuery(promptText);
    });
  });

  function handleAvatarQuery(query) {
    const userMsg = document.createElement('div');
    userMsg.className = 'ml-auto max-w-[85%] p-2.5 rounded-xl bg-accent text-black font-bold text-xs shadow-md animate-pop-in-1';
    userMsg.textContent = query;
    chatStream.appendChild(userMsg);
    chatStream.scrollTop = chatStream.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'mr-auto max-w-[92%] p-3.5 rounded-xl bg-white/10 border border-accent/50 text-white text-xs space-y-2.5 shadow-xl';

      let responseText = '';
      let targetCategory = 'Refund not received';

      if (query.toLowerCase().includes('refund')) {
        responseText = "Understood! When an e-commerce platform delays or rejects a refund, standard chat support often gets stuck in loops. Claimo prepares a structured dispute packet with invoice facts to route directly to Nodal authorities.";
        targetCategory = 'Refund not received';
      } else if (query.toLowerCase().includes('return')) {
        responseText = "Seller rejections on return windows are frequently disputable under consumer protection rules. Let's record the rejection timestamp and evidence photos.";
        targetCategory = 'Return rejected';
      } else if (query.toLowerCase().includes('damaged') || query.toLowerCase().includes('defective')) {
        responseText = "For damaged deliveries, we compile packaging photos, courier receipts, and unboxing logs into an incontestable dossier.";
        targetCategory = 'Damaged / Defective item';
      } else {
        responseText = "You can connect directly with our grievance team on WhatsApp at +91 8368631300 or file your case below.";
        targetCategory = 'Customer Care refused resolution';
      }

      botMsg.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span class="font-black text-accent text-[11px] tracking-wider uppercase">Maya's Resolution Direction:</span>
          <div class="avatar-soundbars"><span></span><span></span><span></span></div>
        </div>
        <p class="leading-relaxed text-white/90">${responseText}</p>
        <div class="pt-1 flex flex-col gap-2">
          <button class="btn-cta-primary open-case-modal py-2.5 text-[11px] font-black justify-center shadow-lg shadow-accent/20" data-category="${targetCategory}">
            Start Dispute for "${targetCategory}" →
          </button>
          <a href="https://wa.me/918368631300?text=Hi%20Maya%2C%20I%20have%20an%20issue%3A%20${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer" class="p-2.5 text-center rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] font-extrabold text-[11px] hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center gap-1.5">
            <span>💬 Direct WhatsApp Assist (+91 8368631300)</span>
          </a>
        </div>
      `;

      chatStream.appendChild(botMsg);
      chatStream.scrollTop = chatStream.scrollHeight;

      botMsg.querySelectorAll('.open-case-modal').forEach(b => {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          closeDrawer();
          const cat = b.getAttribute('data-category');
          const issueSelect = document.getElementById('issueSelect');
          if (issueSelect && cat) issueSelect.value = cat;
          const modal = document.getElementById('caseModal');
          if (modal) modal.classList.add('active');
        });
      });

    }, 450);
  }
}

/* --------------------------------------------------------------------------
   5. How Claimo Works: Interactive Phone Journey Engine
   -------------------------------------------------------------------------- */
let currentJourneyState = 1;
let journeyAutoInterval = null;

function initJourneyStepper() {
  const stepBtns = document.querySelectorAll('.journey-step-btn');
  const chatMsg2 = document.getElementById('chatMsg2');
  const chatFilesRow = document.getElementById('chatFilesRow');
  const chatSynthesisCard = document.getElementById('chatSynthesisCard');
  const journeyProgressFooter = document.getElementById('journeyProgressFooter');

  function renderState(state) {
    currentJourneyState = state;

    stepBtns.forEach(btn => {
      const btnState = parseInt(btn.getAttribute('data-state'), 10);
      if (btnState === state) {
        btn.classList.add('active');
        btn.querySelector('.step-num').className = 'step-num w-7 h-7 rounded-full bg-accent text-black font-extrabold text-xs flex items-center justify-center shrink-0';
      } else {
        btn.classList.remove('active');
        btn.querySelector('.step-num').className = 'step-num w-7 h-7 rounded-full bg-white/10 text-white/70 font-extrabold text-xs flex items-center justify-center shrink-0';
      }
    });

    if (chatMsg2) chatMsg2.style.display = state >= 2 ? 'block' : 'none';
    if (chatFilesRow) chatFilesRow.style.display = state >= 3 ? 'grid' : 'none';
    if (chatSynthesisCard) chatSynthesisCard.style.display = state >= 4 ? 'block' : 'none';
    if (journeyProgressFooter) journeyProgressFooter.style.opacity = state >= 5 ? '1' : '0.4';
  }

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetState = parseInt(btn.getAttribute('data-state'), 10);
      renderState(targetState);
      clearInterval(journeyAutoInterval);
    });
  });

  renderState(1);

  const howSection = document.getElementById('how-it-works');
  if (howSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoJourney();
        } else {
          clearInterval(journeyAutoInterval);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(howSection);
  }

  function startAutoJourney() {
    clearInterval(journeyAutoInterval);
    journeyAutoInterval = setInterval(() => {
      let nextState = currentJourneyState + 1;
      if (nextState > 5) nextState = 1;
      renderState(nextState);
    }, 3800);
  }
}

/* --------------------------------------------------------------------------
   6. Problems Category Interactivity
   -------------------------------------------------------------------------- */
function initProblemsCarousel() {
  const cards = document.querySelectorAll('.problem-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        const categoryBtn = card.querySelector('button[data-category]');
        if (categoryBtn) categoryBtn.click();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Kinetic Chaos to One Word "CLAIMO."
   -------------------------------------------------------------------------- */
function initKineticChaos() {
  const arena = document.getElementById('kineticArena');
  const section = document.getElementById('why-claimo');
  if (!arena || !section) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            arena.classList.add('collapsed');
          }, 800);
        } else {
          arena.classList.remove('collapsed');
        }
      });
    }, { threshold: 0.4 });
    observer.observe(section);
  }
}

/* --------------------------------------------------------------------------
   8. Direct Case Intake Modal Flow & WhatsApp + Email Routing
   -------------------------------------------------------------------------- */
const TARGET_WHATSAPP = '918368631300';
const TARGET_EMAIL = 'maheshwarimanya472@gmail.com';

function initModal() {
  const modal = document.getElementById('caseModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('caseIntakeForm');
  const successView = document.getElementById('caseSuccessView');
  const issueSelect = document.getElementById('issueSelect');
  const dropZone = document.getElementById('dropZone');

  document.querySelectorAll('.open-case-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const preCategory = btn.getAttribute('data-category');
      const prePlan = btn.getAttribute('data-plan');

      if (preCategory && issueSelect) {
        issueSelect.value = preCategory;
      }
      if (prePlan) {
        const noteInput = document.getElementById('noteInput');
        if (noteInput && !noteInput.value) {
          noteInput.value = `Selected tier: ${prePlan}`;
        }
      }

      openModal();
    });
  });

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (dropZone) {
    dropZone.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'image/*,.pdf';
      input.onchange = (e) => {
        if (e.target.files.length > 0) {
          dropZone.innerHTML = `<span class="text-accent font-bold text-xs">✓ ${e.target.files.length} file(s) attached</span>`;
          dropZone.classList.add('border-accent');
        }
      };
      input.click();
    });
  }

  // Handle Form Submit & Send to WhatsApp + Email
  window.handleCaseSubmit = function() {
    const issue = document.getElementById('issueSelect')?.value || 'Refund not received';
    const platform = document.getElementById('platformInput')?.value || 'E-Commerce';
    const amount = document.getElementById('amountInput')?.value || '0';
    const note = document.getElementById('noteInput')?.value || 'No additional note.';
    const contact = document.getElementById('contactInput')?.value || 'Anonymous';

    const formattedMsg = `*🚨 NEW CLAIMO CASE INTAKE*\n\n` +
      `• *Issue:* ${issue}\n` +
      `• *Platform:* ${platform}\n` +
      `• *Disputed Amount:* ₹${Number(amount).toLocaleString('en-IN')}\n` +
      `• *Consumer Contact:* ${contact}\n` +
      `• *Case Details:* ${note}\n\n` +
      `_Sent via Claimo Grievance Portal_`;

    const encodedWhatsAppMsg = encodeURIComponent(formattedMsg);
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP}?text=${encodedWhatsAppMsg}`;

    const emailSubject = encodeURIComponent(`Claimo Case: ${issue} on ${platform} (₹${amount})`);
    const emailBody = encodeURIComponent(
      `Hello Claimo Team,\n\nI have submitted a consumer grievance:\n\n` +
      `Issue: ${issue}\n` +
      `Platform: ${platform}\n` +
      `Disputed Amount: ₹${amount}\n` +
      `Contact Name/Number: ${contact}\n` +
      `Details: ${note}\n\n` +
      `Please help take this forward.`
    );
    const emailUrl = `mailto:${TARGET_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    const waBtn = document.getElementById('whatsappDirectLink');
    if (waBtn) waBtn.href = whatsappUrl;

    const emailBtn = document.getElementById('emailDirectLink');
    if (emailBtn) emailBtn.href = emailUrl;

    const summaryEl = document.getElementById('caseSummaryText');
    if (summaryEl) {
      summaryEl.textContent = `Dispute recorded for ₹${Number(amount).toLocaleString('en-IN')} on ${platform} (${issue}).`;
    }

    if (form) form.classList.add('hidden');
    if (successView) successView.classList.remove('hidden');

    window.open(whatsappUrl, '_blank');
  };

  window.resetModal = function() {
    if (form) {
      form.reset();
      form.classList.remove('hidden');
    }
    if (successView) successView.classList.add('hidden');
    if (dropZone) {
      dropZone.innerHTML = `
        <span class="text-base">📎</span>
        <div class="text-xs text-white/70 font-medium mt-0.5">Click to select files (Invoices, chats, photos)</div>
      `;
      dropZone.classList.remove('border-accent');
    }
    closeModal();
  };
}
/* CLAIMO GOOGLE SHEETS CONNECTION */
(() => {
  const CLAIMO_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyOyLiUNIzZtVGBzGQA_mZFOb0-aaraDQCGOB7zcbXJpGs7VzKbHaLWUjbSpB9b96FB/exec';
  document.addEventListener('DOMContentLoaded', () => {
    const originalSubmit = window.handleCaseSubmit;
    if (typeof originalSubmit !== 'function') return;
    window.handleCaseSubmit = async function () {
      const name = document.getElementById('claimoNameInput')?.value.trim() || '';
      const phone = document.getElementById('claimoPhoneInput')?.value.trim() || '';
      const email = document.getElementById('claimoEmailInput')?.value.trim() || '';
      const issue = document.getElementById('issueSelect')?.value || '';
      const platform = document.getElementById('platformInput')?.value || '';
      const amount = document.getElementById('amountInput')?.value || '';
      const note = document.getElementById('noteInput')?.value || '';
      const params = new URLSearchParams({ name, phone, email, complaintType: issue, message: `Platform: ${platform}; Disputed Amount: ₹${amount}; ${note}`, source: 'Claimo Website' });
      try {
        await fetch(CLAIMO_SHEETS_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: params.toString() });
      } catch (error) { console.warn('Claimo Google Sheets submission failed:', error); }
      return originalSubmit();
    };
  });
})();

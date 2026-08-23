from pathlib import Path
import re

index_path = Path('index.html')
script_path = Path('script.js')
index = index_path.read_text(encoding='utf-8')
script = script_path.read_text(encoding='utf-8')

if 'id="claimoNameInput"' not in index:
    pattern = re.compile(r'\s*<!-- Step 4: Your Name / Contact -->.*?\n\s*</div>\s*<!-- Drag & Drop Evidence Mockup -->', re.S)
    replacement = '''
        <!-- Step 4: Your Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-white/90 mb-1.5">5. Your Name</label>
            <input type="text" id="claimoNameInput" placeholder="Your full name" autocomplete="name" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-accent placeholder-white/30" required>
          </div>
          <div>
            <label class="block text-xs font-bold text-white/90 mb-1.5">6. Mobile Number</label>
            <input type="tel" id="claimoPhoneInput" placeholder="10-digit mobile number" autocomplete="tel" inputmode="tel" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-accent placeholder-white/30" required>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-white/90 mb-1.5">7. Email Address</label>
          <input type="email" id="claimoEmailInput" placeholder="you@example.com" autocomplete="email" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-accent placeholder-white/30" required>
        </div>

        <!-- Drag & Drop Evidence Mockup -->'''
    index, count = pattern.subn(replacement, index, count=1)
    if count != 1:
        raise RuntimeError('Could not find the existing contact field block')

index = index.replace('<span>+91 8368631300</span>', '<span>WhatsApp Help</span>')
index = index.replace('Chat directly with specialist (+91 8368631300)', 'Chat directly with specialist')
index = index.replace('Direct WhatsApp Assist (+91 8368631300)', 'Direct WhatsApp Assist')
index = index.replace('maheshwarimanya472@gmail.com', 'Claimo email support')

marker = '/* CLAIMO GOOGLE SHEETS CONNECTION */'
if marker not in script:
    connection = '''
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
'''
    script = script.rstrip() + connection

index_path.write_text(index, encoding='utf-8')
script_path.write_text(script, encoding='utf-8')
print('Claimo files patched')

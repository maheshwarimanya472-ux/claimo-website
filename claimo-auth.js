/* CLAIMO AUTH — Supabase email/password authentication */
(function () {
  const SUPABASE_URL = 'https://trieghfscdoprrspqows.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Mo6K2M9MzcF1kqkxDreq7w_kKklUvir';
  const CLAIMO_SITE_URL = 'https://claimo-website.vercel.app/';

  function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}

  function injectStyles(){
    const style=document.createElement('style');
    style.textContent=`
      .claimo-auth-btn{display:inline-flex;align-items:center;justify-content:center;padding:.55rem .95rem;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.06);color:#fff;font-size:.75rem;font-weight:800;cursor:pointer;transition:.2s}
      .claimo-auth-btn:hover{border-color:#00ff87;color:#00ff87}
      .claimo-auth-modal{position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;padding:1.25rem;background:rgba(0,0,0,.72);backdrop-filter:blur(12px)}
      .claimo-auth-modal.active{display:flex}
      .claimo-auth-card{width:min(430px,100%);background:#101419;border:1px solid rgba(255,255,255,.14);border-radius:24px;padding:28px;box-shadow:0 25px 80px rgba(0,0,0,.55)}
      .claimo-auth-card h3{margin:0;color:#fff;font-size:25px;font-weight:900}
      .claimo-auth-card p{color:rgba(255,255,255,.62);font-size:13px;margin:7px 0 20px}
      .claimo-auth-card label{display:block;color:rgba(255,255,255,.72);font-size:11px;font-weight:800;margin:13px 0 6px;text-transform:uppercase;letter-spacing:.06em}
      .claimo-auth-card input{width:100%;box-sizing:border-box;padding:12px 13px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:#080b0e;color:#fff;outline:none}
      .claimo-auth-card input:focus{border-color:#00ff87}
      .claimo-auth-submit{width:100%;margin-top:18px;padding:13px;border:0;border-radius:12px;background:#00ff87;color:#000;font-weight:900;cursor:pointer}
      .claimo-auth-switch{margin-top:15px;text-align:center;color:rgba(255,255,255,.6);font-size:12px}
      .claimo-auth-switch button,.claimo-auth-close{background:none;border:0;color:#00ff87;font-weight:800;cursor:pointer}
      .claimo-auth-close{position:absolute;right:18px;top:15px;font-size:20px;color:rgba(255,255,255,.6)}
      .claimo-auth-status{min-height:18px;margin-top:12px;color:#00ff87;font-size:12px;text-align:center}
      .claimo-auth-welcome{margin:-8px 0 18px;padding:10px 12px;border:1px solid rgba(0,255,135,.2);border-radius:12px;background:rgba(0,255,135,.06);color:rgba(255,255,255,.78);font-size:12px;line-height:1.5}
      .claimo-access-gate{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(7,9,11,.96);backdrop-filter:blur(18px)}
      .claimo-access-gate.active{display:flex}
      .claimo-access-card{width:min(470px,100%);padding:34px 28px;text-align:center;background:#101419;border:1px solid rgba(255,255,255,.12);border-radius:26px;box-shadow:0 25px 80px rgba(0,0,0,.55)}
      .claimo-access-card h2{margin:0 0 8px;color:#fff;font-size:30px;font-weight:900;letter-spacing:-.02em}
      .claimo-access-card p{margin:0 auto 22px;max-width:380px;color:rgba(255,255,255,.65);font-size:13px;line-height:1.6}
      .claimo-access-login{width:100%;padding:14px;border:0;border-radius:13px;background:#00ff87;color:#000;font-weight:900;cursor:pointer}
      .claimo-access-note{margin-top:13px;color:rgba(255,255,255,.42);font-size:11px}
      .case-modal-backdrop.active{opacity:1 !important;pointer-events:auto !important;}
      .case-modal-backdrop.active .case-modal-container{transform:scale(1) !important;}
    `;
    document.head.appendChild(style);
  }

  let mode='login',supabase;

  function openAuth(next){
    mode=next;
    const modal=document.getElementById('claimoAuthModal'),nameWrap=document.getElementById('claimoNameWrap'),title=document.getElementById('claimoAuthTitle'),sub=document.getElementById('claimoAuthSubtitle'),submit=document.getElementById('claimoAuthSubmit'),sw=document.getElementById('claimoAuthSwitch'),status=document.getElementById('claimoAuthStatus');
    if(!modal)return;
    status.textContent='';
    nameWrap.style.display=mode==='signup'?'block':'none';
    title.textContent=mode==='signup'?'Create your Claimo account':'Welcome to Claimo';
    sub.textContent=mode==='signup'?'Create an account to submit and track your grievance.':'Log in to continue with your grievance.';
    submit.textContent=mode==='signup'?'Create Account':'Login';
    sw.innerHTML=mode==='signup'?'Already have an account? <button type="button">Log in</button>':'New to Claimo? <button type="button">Create an account</button>';
    sw.querySelector('button').onclick=()=>openAuth(mode==='signup'?'login':'signup');
    modal.classList.add('active');
  }

  function closeAuth(){document.getElementById('claimoAuthModal')?.classList.remove('active');}

  function createUI(){
    const headerCta=document.querySelector('#siteHeader .flex.items-center.gap-3');
    if(headerCta&&!document.getElementById('claimoAuthOpenBtn')){
      const btn=document.createElement('button');
      btn.id='claimoAuthOpenBtn';
      btn.className='claimo-auth-btn';
      btn.textContent='Login';
      btn.onclick=()=>openAuth('login');
      headerCta.insertBefore(btn,headerCta.firstChild);
    }
    const modal=document.createElement('div');
    modal.className='claimo-auth-modal';
    modal.id='claimoAuthModal';
    modal.innerHTML=`<div class="claimo-auth-card" role="dialog" aria-modal="true" style="position:relative"><button class="claimo-auth-close" id="claimoAuthClose" aria-label="Close">×</button><h3 id="claimoAuthTitle">Welcome to Claimo</h3><p id="claimoAuthSubtitle">Log in to continue with your grievance.</p><div class="claimo-auth-welcome">Welcome to Claimo. We're here to help you take your consumer grievance forward, without the usual back-and-forth.</div><form id="claimoAuthForm"><div id="claimoNameWrap" style="display:none"><label>Name</label><input id="claimoName" autocomplete="name"></div><label>Email</label><input id="claimoEmail" type="email" autocomplete="email" required><label>Password</label><input id="claimoPassword" type="password" autocomplete="current-password" minlength="6" required><button class="claimo-auth-submit" id="claimoAuthSubmit" type="submit">Login</button><div class="claimo-auth-status" id="claimoAuthStatus"></div></form><div class="claimo-auth-switch" id="claimoAuthSwitch">New to Claimo? <button type="button">Create an account</button></div></div>`;
    document.body.appendChild(modal);
    const gate=document.createElement('div');
    gate.className='claimo-access-gate';
    gate.id='claimoAccessGate';
    gate.innerHTML=`<div class="claimo-access-card"><h2>Welcome to Claimo</h2><p>Log in to access your Claimo account, submit a grievance and view your complaints securely.</p><button class="claimo-access-login" id="claimoAccessLogin">Login / Create Account</button><div class="claimo-access-note">Your password is securely handled by Supabase.</div></div>`;
    document.body.appendChild(gate);
    document.getElementById('claimoAuthClose').onclick=closeAuth;
    modal.addEventListener('click',e=>{if(e.target===modal)closeAuth();});
    document.getElementById('claimoAuthSwitch').querySelector('button').onclick=()=>openAuth('signup');
    document.getElementById('claimoAuthForm').addEventListener('submit',submitAuth);
    document.getElementById('claimoAccessLogin').onclick=()=>openAuth('login');
  }

  function setGate(visible){
    const gate=document.getElementById('claimoAccessGate');
    if(gate)gate.classList.toggle('active',visible);
    document.body.style.overflow=visible?'hidden':'';
  }

  async function submitAuth(e){
    e.preventDefault();
    const email=document.getElementById('claimoEmail').value.trim(),password=document.getElementById('claimoPassword').value,name=document.getElementById('claimoName').value.trim(),status=document.getElementById('claimoAuthStatus'),submit=document.getElementById('claimoAuthSubmit');
    submit.disabled=true;
    status.textContent='Please wait…';
    try{
      let result;
      if(mode==='signup'){
        result=await supabase.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:CLAIMO_SITE_URL}});
        if(result.error)throw result.error;
        if(result.data?.session){
          status.textContent='Account created. You can now use Claimo.';
          setGate(false);
          setTimeout(closeAuth,500);
        }else{
          status.textContent='Account created. Check your email to confirm your Claimo account, then return here and log in.';
        }
      }else{
        result=await supabase.auth.signInWithPassword({email,password});
        if(result.error)throw result.error;
        status.textContent='Logged in successfully.';
        setGate(false);
        setTimeout(closeAuth,500);
      }
    }catch(err){status.textContent=err?.message||'Something went wrong. Please try again.';}
    finally{submit.disabled=false;}
  }

  function updateAccountButton(user){
    const btn=document.getElementById('claimoAuthOpenBtn');
    if(!btn)return;
    if(user){
      const name=user.user_metadata?.full_name||user.email?.split('@')[0]||'Account';
      btn.textContent=name.length>16?name.slice(0,16)+'…':name;
      btn.title=user.email||'';
      btn.onclick=async()=>{await supabase.auth.signOut();};
    }else{
      btn.textContent='Login';
      btn.title='Login to Claimo';
      btn.onclick=()=>openAuth('login');
    }
  }

  function protectComplaintActions(){
    document.addEventListener('click',async(e)=>{
      const trigger=e.target.closest('.open-case-modal');
      if(!trigger)return;
      const{data}=await supabase.auth.getSession();
      if(!data.session){
        e.preventDefault();
        e.stopImmediatePropagation();
        openAuth('login');
      }
    },true);
  }

  async function init(){
    injectStyles();
    createUI();
    loadScript('maya-fix.js').catch(()=>{});
    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
    protectComplaintActions();
    const{data}=await supabase.auth.getSession();
    const user=data.session?.user||null;
    updateAccountButton(user);
    setGate(!user);
    supabase.auth.onAuthStateChange((_event,session)=>{
      updateAccountButton(session?.user||null);
      setGate(!session?.user);
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(){
  function boot(){
    const trigger=document.getElementById('avatarTriggerBtn');
    if(!trigger) return;
    let drawer=document.getElementById('avatarChatDrawer');
    if(!drawer){
      drawer=document.createElement('aside');
      drawer.id='avatarChatDrawer';
      drawer.setAttribute('aria-label','Maya AI chat');
      drawer.innerHTML=`
        <div class="maya-fix-head">
          <div class="maya-fix-profile">
            <img src="avatar-guide.jpg" alt="Maya" class="maya-fix-avatar">
            <div><div class="maya-fix-title">Maya <span>• LIVE AI</span></div><div class="maya-fix-status">Online · Claimo Resolution Guide</div></div>
          </div>
          <button id="closeAvatarDrawer" class="maya-fix-close" type="button" aria-label="Close Maya">×</button>
        </div>
        <div id="avatarChatStream" class="maya-fix-stream">
          <div class="maya-fix-bot">Hi, I'm Maya. Tell me what went wrong with your order, refund, return, delivery or seller response. I'll help you figure out the next step.</div>
        </div>
        <div class="maya-fix-quick">
          <button class="avatar-quick-btn" data-prompt="My refund hasn't arrived">Refund not received</button>
          <button class="avatar-quick-btn" data-prompt="My return was rejected">Return rejected</button>
          <button class="avatar-quick-btn" data-prompt="My item arrived damaged">Damaged item</button>
          <button class="avatar-quick-btn" data-prompt="My order never arrived">Order not delivered</button>
        </div>
        <form id="mayaFixForm" class="maya-fix-input"><input id="mayaFixInput" placeholder="Tell Maya what happened…" autocomplete="off"><button type="submit">→</button></form>`;
      document.body.appendChild(drawer);
    }
    if(!document.getElementById('mayaFixStyles')){
      const style=document.createElement('style');style.id='mayaFixStyles';style.textContent=`
        #avatarChatDrawer{position:fixed;left:24px;bottom:96px;width:min(410px,calc(100vw - 32px));height:min(580px,calc(100vh - 130px));z-index:9999;display:none;flex-direction:column;overflow:hidden;background:#0b0e12;border:1px solid rgba(0,255,135,.4);border-radius:24px;box-shadow:0 25px 90px rgba(0,0,0,.75),0 0 35px rgba(0,255,135,.12);font-family:inherit}
        #avatarChatDrawer.active{display:flex}
        .maya-fix-head{display:flex;align-items:center;justify-content:space-between;padding:15px 17px;border-bottom:1px solid rgba(255,255,255,.1);background:#101419}
        .maya-fix-profile{display:flex;align-items:center;gap:10px}.maya-fix-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #00ff87}.maya-fix-title{font-size:13px;font-weight:900;color:#fff}.maya-fix-title span,.maya-fix-status{color:#00ff87}.maya-fix-status{font-size:10px;font-weight:700;margin-top:3px}.maya-fix-close{border:0;background:none;color:#aaa;font-size:25px;cursor:pointer;padding:3px 7px}.maya-fix-stream{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}.maya-fix-bot,.maya-fix-user{max-width:90%;padding:11px 13px;border-radius:15px;font-size:12px;line-height:1.55}.maya-fix-bot{align-self:flex-start;background:rgba(255,255,255,.07);border:1px solid rgba(0,255,135,.22);color:#eee}.maya-fix-user{align-self:flex-end;background:#00ff87;color:#050706;font-weight:800}.maya-fix-quick{display:flex;flex-wrap:wrap;gap:7px;padding:0 15px 10px}.avatar-quick-btn{border:1px solid rgba(0,255,135,.3);background:rgba(0,255,135,.07);color:#00ff87;border-radius:999px;padding:7px 9px;font-size:10px;font-weight:800;cursor:pointer}.maya-fix-input{display:flex;gap:7px;padding:12px;border-top:1px solid rgba(255,255,255,.1)}.maya-fix-input input{flex:1;min-width:0;background:#07090b;border:1px solid rgba(255,255,255,.14);border-radius:12px;color:#fff;padding:11px;font-size:12px;outline:none}.maya-fix-input input:focus{border-color:#00ff87}.maya-fix-input button{width:44px;border:0;border-radius:12px;background:#00ff87;color:#000;font-weight:900;font-size:17px;cursor:pointer}@media(max-width:640px){#avatarChatDrawer{left:16px;bottom:88px;width:calc(100vw - 32px);height:min(580px,calc(100vh - 110px))}}
      `;document.head.appendChild(style);
    }
    const stream=document.getElementById('avatarChatStream'),input=document.getElementById('mayaFixInput'),form=document.getElementById('mayaFixForm');
    function add(text,kind){const el=document.createElement('div');el.className=kind==='user'?'maya-fix-user':'maya-fix-bot';el.textContent=text;stream.appendChild(el);stream.scrollTop=stream.scrollHeight}
    function reply(q){const t=q.toLowerCase();if(t.includes('refund')||t.includes('money'))return 'For a delayed or rejected refund, keep your order ID, payment proof, refund promise and the complete support conversation. Those details help Claimo structure the grievance.';if(t.includes('return'))return 'For a rejected return, keep the rejection message, return-request date, product photos and order details.';if(t.includes('damage')||t.includes('defect')||t.includes('broken'))return 'For a damaged or defective item, keep clear photos of the product and packaging, delivery date, invoice and your complaint to the seller.';if(t.includes('deliver')||t.includes('arriv')||t.includes('missing'))return 'For an order that never arrived, keep the order confirmation, promised delivery date, tracking history and delivery-status messages.';if(t.includes('seller')||t.includes('support')||t.includes('customer care'))return 'Keep the complete chat or email trail, especially any refusal, closure or ticket number. Claimo can use those facts to organize the grievance.';return 'Tell me what you ordered, what went wrong, and what the seller or platform told you. I can help identify the grievance category and what evidence to keep.'}
    function send(q){q=(q||'').trim();if(!q)return;add(q,'user');input.value='';setTimeout(()=>add(reply(q),'bot'),350)}
    if(!trigger.dataset.mayaFixBound){trigger.dataset.mayaFixBound='1';trigger.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();drawer.classList.toggle('active');if(drawer.classList.contains('active'))setTimeout(()=>input.focus(),100)})}
    const close=document.getElementById('closeAvatarDrawer');if(close&&!close.dataset.bound){close.dataset.bound='1';close.addEventListener('click',()=>drawer.classList.remove('active'))}
    if(form&&!form.dataset.bound){form.dataset.bound='1';form.addEventListener('submit',e=>{e.preventDefault();send(input.value)})}
    drawer.querySelectorAll('.avatar-quick-btn').forEach(btn=>{if(!btn.dataset.bound){btn.dataset.bound='1';btn.addEventListener('click',()=>send(btn.dataset.prompt))}})
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
(function(){
  function cleanNav(){
    const nav=document.querySelector('#siteHeader nav[aria-label="Primary Navigation"]');
    if(!nav)return;
    const links=[...nav.querySelectorAll('a')];
    const labels=['Problem','What We Handle','How It Works','Pricing','Why Claimo'];
    links.forEach((a,i)=>{if(labels[i])a.textContent=labels[i];});
    nav.style.gap='1.5rem';
    nav.style.fontSize='.78rem';
    nav.style.fontWeight='600';
    const headerCta=document.querySelector('#siteHeader > div > div:last-child');
    if(headerCta){
      const wa=headerCta.querySelector('a[href*="wa.me"]');
      if(wa)wa.style.display='none';
    }
    const inner=document.querySelector('#siteHeader > div:first-child');
    if(inner)inner.style.columnGap='1.5rem';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',cleanNav);else cleanNav();
})();
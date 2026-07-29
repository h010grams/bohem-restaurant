
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const navToggle=$('.nav-toggle'), nav=$('.site-nav');
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',open)});
$$('.site-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
$('[data-year]')?.replaceChildren(document.createTextNode(new Date().getFullYear()));

// Restrict past dates on reservation.
const dateInput=$('input[type="date"]'); if(dateInput){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());dateInput.min=d.toISOString().split('T')[0];}

// Menu filtering and search.
const menuSearch=$('#menu-search'), tabButtons=$$('.group-tabs button'), menuSections=$$('.menu-section'), menuEmpty=$('#menu-empty');
let activeGroup='all';
function filterMenu(){if(!menuSections.length)return; const q=(menuSearch?.value||'').trim().toLowerCase();let visible=0;menuSections.forEach(sec=>{const groupOK=activeGroup==='all'||sec.dataset.group===activeGroup;let itemsVisible=0;$$('.menu-item',sec).forEach(item=>{const ok=groupOK&&(!q||item.dataset.search.includes(q));item.hidden=!ok;if(ok)itemsVisible++});sec.hidden=itemsVisible===0;visible+=itemsVisible});if(menuEmpty)menuEmpty.hidden=visible>0;}
tabButtons.forEach(btn=>btn.addEventListener('click',()=>{tabButtons.forEach(x=>x.classList.remove('active'));btn.classList.add('active');activeGroup=btn.dataset.filter;filterMenu()}));menuSearch?.addEventListener('input',filterMenu);

// Gallery filters and lightbox.
const gf=$$('.gallery-filters button'), cards=$$('.gallery-card');
gf.forEach(btn=>btn.addEventListener('click',()=>{gf.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.gallery;cards.forEach(c=>c.hidden=!(f==='all'||c.dataset.galleryItem===f))}));
const lb=$('#lightbox');cards.forEach(c=>c.addEventListener('click',()=>{if(!lb)return;lb.hidden=false;$('img',lb).src=c.dataset.full;$('p',lb).textContent=$('span',c)?.textContent||'';document.body.style.overflow='hidden'}));
function closeLB(){if(!lb)return;lb.hidden=true;document.body.style.overflow=''}$('.lightbox-close')?.addEventListener('click',closeLB);lb?.addEventListener('click',e=>{if(e.target===lb)closeLB()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});

// Gentle reveal, disabled for reduced motion.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const nodes=$$('.section-head,.terrace-mosaic,.featured-menu,.spritz-grid,.wine-grid,.gallery-preview,.promo-card,.home-offer-card,.offer-feature,.reviews-inner,.menu-section,.reservation-layout,.contact-grid');nodes.forEach(n=>n.classList.add('reveal'));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});nodes.forEach(n=>io.observe(n));}

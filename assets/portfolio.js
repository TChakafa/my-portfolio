document.documentElement.classList.add('js');
window.addEventListener('load',()=>document.body.classList.add('loaded'));
const header=document.querySelector('.site-header'),topBtn=document.querySelector('.to-top');
function onScroll(){header.classList.toggle('scrolled',scrollY>40);topBtn.classList.toggle('show',scrollY>650)}
addEventListener('scroll',onScroll,{passive:true});onScroll();topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
function toggleMenu(open){menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)}
menu.onclick=()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true');nav.querySelectorAll('a').forEach(a=>a.onclick=()=>toggleMenu(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){toggleMenu(false);menu.focus()}});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.14,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*60}ms`;revealObserver.observe(el)});
document.querySelectorAll('.filter').forEach(btn=>btn.onclick=()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');document.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('hidden',btn.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(btn.dataset.filter)))});
document.querySelectorAll('.details-toggle').forEach(btn=>btn.onclick=()=>{const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));btn.nextElementSibling.classList.toggle('open',!open)});
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=+el.dataset.count;let n=0;(function tick(){el.textContent=`${++n}+`;if(n<target)setTimeout(tick,90)})();countObserver.unobserve(el)}),{threshold:.8});document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));
const modal=document.querySelector('.pdf-modal'),frame=modal.querySelector('iframe'),title=modal.querySelector('strong');document.querySelectorAll('.cert-actions button').forEach(btn=>btn.onclick=()=>{title.textContent=btn.dataset.title;frame.src=btn.dataset.pdf;modal.showModal()});modal.querySelector('button').onclick=()=>modal.close();modal.onclick=e=>{if(e.target===modal)modal.close()};modal.onclose=()=>frame.src='';
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&matchMedia('(pointer:fine)').matches){const glow=document.querySelector('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`});const card=document.querySelector('.tilt');card.onpointermove=e=>{const b=card.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;card.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${y*-7}deg)`};card.onpointerleave=()=>card.style.transform=''}
document.querySelector('#year').textContent=new Date().getFullYear();

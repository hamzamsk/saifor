const slides=[...document.querySelectorAll('.hero-slide')];
const dots=[...document.querySelectorAll('.dot')];
let current=0;
function showSlide(i){
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===current));
  dots.forEach((d,n)=>d.classList.toggle('active',n===current));
}
document.querySelector('.next').addEventListener('click',()=>showSlide(current+1));
document.querySelector('.prev').addEventListener('click',()=>showSlide(current-1));
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
setInterval(()=>showSlide(current+1),6000);

const menu=document.getElementById('menu');
const nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelectorAll('.product-btn:not(.perfume-btn)').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const product=btn.dataset.product;
    const msg=`Bonjour SAIFOR PARFUMS, je souhaite commander : ${product}. Merci de m'indiquer le prix et les modalités de livraison.`;
    window.open(`https://wa.me/212690989209?text=${encodeURIComponent(msg)}`,'_blank');
  });
});

// Catalogue Homme & Femme : une seule page avec deux collections affichées via des boutons
const searchInput = document.getElementById('perfumeSearch');
const switchButtons = [...document.querySelectorAll('.switch-btn')];
const collectionPanels = [...document.querySelectorAll('.collection-panel')];
const perfumeCards = [...document.querySelectorAll('.perfume-card')];

function showCollection(type, scroll=true) {
  collectionPanels.forEach(panel => {
    const active = panel.dataset.collection === type;
    panel.classList.toggle('active-panel', active);
    if (!active) panel.style.display = 'none';
    else panel.style.display = '';
  });
  switchButtons.forEach(button => {
    const active = button.dataset.show === type;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  // Keep the search scoped to the selected collection.
  perfumeCards.forEach(card => {
    const isSelected = card.classList.contains(type);
    card.classList.toggle('hidden', !isSelected);
  });
  if (scroll) document.getElementById(type)?.scrollIntoView({behavior:'smooth', block:'start'});
}

switchButtons.forEach(button => {
  button.addEventListener('click', () => showCollection(button.dataset.show));
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const activeType = document.querySelector('.switch-btn.active')?.dataset.show || 'homme';
    const q = searchInput.value.trim().toLowerCase();
    perfumeCards.forEach(card => {
      const isSelected = card.classList.contains(activeType);
      const text = `${card.dataset.name} ${card.dataset.notes}`.toLowerCase();
      card.classList.toggle('hidden', !(isSelected && (!q || text.includes(q))));
    });
  });
}

// Navigation Homme/Femme : même page, on bascule simplement la collection visible.
document.querySelectorAll('.nav a[href="#homme"], .nav a[href="#femme"]').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showCollection(link.getAttribute('href').slice(1));
  });
});

showCollection('homme', false);

// Commandes WhatsApp pour tous les parfums
 document.querySelectorAll('.perfume-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product;
    const category = btn.dataset.category;
    const msg = `Bonjour SAIFOR PARFUMS, je souhaite commander le parfum ${product} (${category}), 50 ML à 70 DH. Merci de confirmer la disponibilité et la livraison.`;
    window.open(`https://wa.me/212690989209?text=${encodeURIComponent(msg)}`, '_blank');
  });
});

// Mobile menu
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (burgerBtn){
  burgerBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Countdown (urgência honesta: apenas visual até integrar o checkout)
function startCountdown(seconds, elIds){
  let remaining = seconds;
  const tick = () => {
    remaining = Math.max(remaining - 1, 0);
    const h = String(Math.floor(remaining/3600)).padStart(2,'0');
    const m = String(Math.floor((remaining%3600)/60)).padStart(2,'0');
    const s = String(remaining%60).padStart(2,'0');
    elIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = `${h}:${m}:${s}`;
    });
    if (remaining > 0) requestAnimationFrameTimer = setTimeout(tick, 1000);
  };
  let requestAnimationFrameTimer = setTimeout(tick, 1000);
}
// 45 min
startCountdown(15*60, ['countdown','countdown2']);

// Lead capture (simulado: salva no localStorage)
function handleLeadForm(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = (fd.get('email') || '').toString().trim();
    if(!email || !/^\S+@\S+\.\S+$/.test(email)){
      alert('Informe um e-mail válido.'); 
      return;
    }
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push({ email, ts: Date.now(), source: formId });
    localStorage.setItem('leads', JSON.stringify(leads));
    form.reset();
    alert('Amostra enviada! (simulação) — Integração de e-mail entra na próxima etapa.');
  });
}
handleLeadForm('leadForm');
handleLeadForm('exitLeadForm');

// Carousel
(function(){
  const container = document.getElementById('carousel');
  const prev = document.querySelector('.ctrl[data-dir="prev"]');
  const next = document.querySelector('.ctrl[data-dir="next"]');
  if(!container || !prev || !next) return;
  const step = () => container.clientWidth * 0.85;
  prev.addEventListener('click', ()=> container.scrollBy({left: -step(), behavior:'smooth'}));
  next.addEventListener('click', ()=> container.scrollBy({left: step(), behavior:'smooth'}));
})();

// Accordion
document.querySelectorAll('.acc-header').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const item = btn.closest('.acc-item');
    item.classList.toggle('open');
  });
});



// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 120, behavior:'smooth' });
      }
    }
  });
});

// Tiny analytics stub (para depois plugar gtag/fbq)
window.__lp = {
  log(event, payload={}) {
    const data = JSON.parse(localStorage.getItem('__lp_events') || '[]');
    data.push({event, payload, at: new Date().toISOString()});
    localStorage.setItem('__lp_events', JSON.stringify(data));
  }
};
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('click', ()=> window.__lp.log('btn_click', {text:b.textContent?.trim()}));
});

const people = [
  "Mariana Silva", "Ana Costa", "Fernanda Souza", "Jéssica Oliveira", "Luana Almeida",
  "Carolina Pereira", "Beatriz Lima", "Patrícia Gomes", "Amanda Rocha", "Sofia Martins",
  "Larissa Fernandes", "Camila Ribeiro", "Gabriela Carvalho", "Letícia Alves", "Isabela Santos",
  "Renata Mendes", "Marcela Pinto", "Aline Barbosa", "Juliana Costa", "Tatiane Dias",
  "Rafaela Moreira", "Bianca Rodrigues", "Vanessa Nunes", "Priscila Monteiro", "Daniela Vieira",
  "Eliane Cardoso", "Viviane Araújo", "Michele Farias", "Carla Correia", "Natália Tavares",
  "Patrícia Lima", "Bruna Machado", "Elaine Barbosa", "Amanda Costa", "Juliana Castro",
  "Fernanda Pires", "Camila Santos", "Larissa Rodrigues", "Carolina Figueiredo", "Beatriz Teixeira",
  "Renata Moraes", "Mariana Cunha", "Tatiane Almeida", "Jéssica Fernandes", "Sofia Rocha",
  "Isabela Oliveira", "Vanessa Silva", "Rafaela Martins", "Gabriela Pinto", "Aline Nunes",
  "Marcela Moreira", "Letícia Ribeiro", "Bianca Gomes", "Daniela Costa", "Natália Lima",
  "Carla Souza", "Camila Araújo", "Juliana Carvalho", "Mariana Barbosa", "Patrícia Dias",
  "Ana Mendes", "Fernanda Rocha", "Jéssica Alves", "Luana Martins", "Carolina Nunes",
  "Beatriz Pinto", "Amanda Teixeira", "Sofia Farias", "Larissa Vieira", "Gabriela Cardoso",
  "Letícia Correia", "Isabela Tavares", "Renata Lima", "Marcela Costa", "Aline Souza",
  "Juliana Araújo", "Tatiane Carvalho", "Rafaela Barbosa", "Bianca Dias", "Vanessa Mendes",
  "Daniela Rocha", "Eliane Alves", "Viviane Martins", "Michele Nunes", "Carla Pinto",
  "Natália Teixeira", "Mariana Farias", "Patrícia Vieira", "Bruna Cardoso", "Elaine Correia",
  "Amanda Tavares", "Juliana Lima", "Fernanda Costa", "Camila Souza", "Larissa Araújo",
  "Carolina Carvalho", "Beatriz Barbosa", "Renata Dias", "Mariana Mendes", "Tatiane Rocha",
  "Jéssica Alves", "Sofia Martins", "Isabela Nunes", "Vanessa Pinto", "Rafaela Teixeira"
];

const popup = document.getElementById('socialPopup');

function showPopup() {
  const name = people[Math.floor(Math.random() * people.length)];
  popup.textContent = `${name} comprou!`;

  popup.classList.add('show');

  // Esconde depois de 5 segundos
  setTimeout(() => {
    popup.classList.remove('show');

    // Próximo popup entre 2 e 4 segundos
    const nextDelay = Math.random() * 2000 + 2000;
    setTimeout(showPopup, nextDelay);
  }, 5000);
}

// Inicia o primeiro popup após 5 segundos
setTimeout(showPopup, 5000);



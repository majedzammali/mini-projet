(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const open = menu.style.display === 'flex';
      menu.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Theme toggle with localStorage
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if(stored === 'light') root.classList.add('light');
  if(themeBtn){
    themeBtn.addEventListener('click',()=>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }

  // Light theme overrides
  const style = document.createElement('style');
  style.textContent = `
    :root.light{--bg:#f8fafc;--surface:#ffffff;--text:#0f172a;--muted:#475569;--accent:#0891b2;--accent-2:#7c3aed;--card:#ffffff;--border:#e2e8f0}
    :root.light .button:hover{color:#fff}
  `;
  document.head.appendChild(style);

  // Year in footer
  const year = document.getElementById('year');
  if(year){year.textContent = new Date().getFullYear();}

  // Filters
  (function(){
    const buttons = document.querySelectorAll('.filters [data-filter]');
    const cards = document.querySelectorAll('#project-grid .card');
    if(!buttons.length || !cards.length) return;
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        buttons.forEach(b=>b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        cards.forEach(card=>{
          const tags = card.getAttribute('data-tags')||'';
          const show = f==='all' || tags.includes(f);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  })();

  // Reveal on scroll
  (function(){
    const els = document.querySelectorAll('.card, .t-item, .section h2');
    els.forEach(el=>el.classList.add('reveal'));
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, {threshold: 0.1}) : null;
    els.forEach(el=> io ? io.observe(el) : el.classList.add('is-visible'));
  })();
})();

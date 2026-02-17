
  (function(){

    /* --- Cursor --- */
    const cursor     = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let rx=0, ry=0;
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      rx += (e.clientX - rx) * .12;
      ry += (e.clientY - ry) * .12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
    });
    function animRing(){ 
      rx += (parseFloat(cursor.style.left||0) - rx) * .12;
      ry += (parseFloat(cursor.style.top||0)  - ry) * .12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    /* --- Nav toggle --- */
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded','false');
      });
    });

    /* --- Active nav on scroll --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link');
    function updateNav(){
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) cur = s.id;
      });
      navLinkEls.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
      });
    }
    window.addEventListener('scroll', updateNav, { passive:true });

    /* --- Back to top --- */
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive:true });

    /* --- Year --- */
    document.getElementById('yr').textContent = new Date().getFullYear();

    /* --- Reveal on scroll --- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: .12 });
    revealEls.forEach(el => revealObs.observe(el));

    /* --- Counter animation --- */
    function animateCount(el, target){
      let start = 0;
      const dur = 2000;
      const step = timestamp => {
        if(!start) start = timestamp;
        const progress = Math.min((timestamp - start)/dur, 1);
        el.textContent = Math.ceil(progress * target);
        if(progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          animateCount(e.target, +e.target.dataset.target);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold:.5 });
    document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObs.observe(el));

    /* --- Skills pills --- */
    const skills = [
      { icon:'view_in_ar',      label:'3D Modeling'     },
      { icon:'image',           label:'3D Rendering'    },
      { icon:'palette',         label:'Texturing'       },
      { icon:'home',            label:'Architectural'   },
      { icon:'architecture',    label:'SketchUp 3D'     },
      { icon:'design_services', label:'Product Design'  },
      { icon:'light_mode',      label:'Lighting'        },
      { icon:'view_quilt',      label:'3ds Max & V-Ray' },
      { icon:'drafts',          label:'AutoCAD'         },
      { icon:'photo_camera',    label:'Photoshop'       },
      { icon:'code',            label:'Programming'     },
      { icon:'weekend',         label:'Interior Design' },
      { icon:'celebration',     label:'Event & Theming' },
      { icon:'movie',           label:'Video Editing'   },
    ];
    const pillsContainer = document.getElementById('skillsPills');
    skills.forEach(({ icon, label }) => {
      const el = document.createElement('div');
      el.className = 'skill-pill';
      el.innerHTML = `<span class="material-icons">${icon}</span>${label}`;
      pillsContainer.appendChild(el);
    });

    /* --- Gallery --- */
    const galleryGrid = document.getElementById('galleryGrid');
    const totalImages = 50;
    const imagePaths = [];

    for(let i=1; i<=totalImages; i++){
      imagePaths.push(`./assets/${i}.webp`);
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.index = i - 1;
      item.innerHTML = `
        <img src="./assets/${i}.webp" alt="3D Render ${i}" loading="lazy"/>
        <div class="gi-overlay"><span class="gi-num">0${i<10?'0':''}${i}</span></div>
      `;
      galleryGrid.appendChild(item);
    }

    /* --- Lightbox --- */
    let lbIndex = 0;
    const lightbox = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lbImg');
    const lbClose  = document.getElementById('lbClose');
    const lbPrev   = document.getElementById('lbPrev');
    const lbNext   = document.getElementById('lbNext');

    function openLb(idx){
      lbIndex = ((idx % totalImages) + totalImages) % totalImages;
      lbImg.src = imagePaths[lbIndex];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb(){
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryGrid.addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if(item) openLb(+item.dataset.index);
    });
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click',  () => openLb(lbIndex - 1));
    lbNext.addEventListener('click',  () => openLb(lbIndex + 1));
    lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', e => {
      if(!lightbox.classList.contains('open')) return;
      if(e.key==='Escape') closeLb();
      if(e.key==='ArrowLeft')  openLb(lbIndex - 1);
      if(e.key==='ArrowRight') openLb(lbIndex + 1);
    });

  })();
 
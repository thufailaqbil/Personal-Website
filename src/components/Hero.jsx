import { useEffect, useRef, useState } from 'react';
import myFaceImg from '../assets/images/my-face.PNG';
import iconBrain from '../assets/images/workflow/icon-langkah1.webp';
import iconGear from '../assets/images/workflow/icon-langkah2.webp';
import iconLightning from '../assets/images/workflow/icon-langkah3.webp';
import iconCursor from '../assets/images/workflow/icon-langkah4.webp';
import icondiscord from '../assets/images/contact/discord.png';
import iconinstagram from '../assets/images/contact/instagram.png';
import icongithub from '../assets/images/contact/github.png';
import dariMataImage from '../assets/images/projects/darimata/landing.webp';
import dariMataImage1 from '../assets/images/projects/darimata/shop.webp';
import dariMataImage2 from '../assets/images/projects/darimata/shop-details.webp';
import dariMataImage3 from '../assets/images/projects/darimata/checkout.webp';
import dariMataImage4 from '../assets/images/projects/darimata/user-profile.webp';
import kingKerangImage from '../assets/images/projects/kingkerang/kasir.webp';
import kingKerangImage1 from '../assets/images/projects/kingkerang/menu.webp';
import kingKerangImage2 from '../assets/images/projects/kingkerang/roulette.webp';
import kingKerangImage3 from '../assets/images/projects/kingkerang/pembayaran.webp';
import kingKerangImage4 from '../assets/images/projects/kingkerang/struk.webp';
import ruangTenangImage from '../assets/images/projects/ruangtenang/gameplay1.webp';
import ruangTenangImage1 from '../assets/images/projects/ruangtenang/main-menu.webp';
import ruangTenangImage2 from '../assets/images/projects/ruangtenang/gameplay2.webp';
import ruangTenangImage3 from '../assets/images/projects/ruangtenang/gameplay3.webp';
import ruangTenangImage4 from '../assets/images/projects/ruangtenang/gameplay4.webp';

// --- DATA PROYEK ---
const projectsData = [
  { 
    id: 'kingkerang',
    name: 'King Kerang', 
    heroImage: kingKerangImage, 
    heroPos: 'left',
    role: 'Fullstack Developer',
    date: 'Jul, 2026',
    link: '', // Kosong agar link tidak muncul
    description: 'Born out of the need for an efficient restaurant ordering system, my team and I built this Self-Ordering and POS application. It features real-time table order management, barcode menu scanning, and gamification elements (Lucky Wheel) to enhance the overall customer experience.',
    gallery: [kingKerangImage, kingKerangImage1, kingKerangImage2, kingKerangImage3, kingKerangImage4],
    decorations: [
      { icon: '🍽️', top: '-10px', left: '-60px', rotate: '-15deg' },
      { icon: '🍺', bottom: '-40px', right: '-45px', rotate: '25deg' },
      { icon: '🦀', top: '-35px', left: '45%', rotate: '10deg' } // Di tengah atas
    ]
  },
  { 
    id: 'darimata',
    name: 'DariMata Studio', 
    heroImage: dariMataImage, 
    heroPos: 'center',
    role: 'UI/UX Design & Frontend Dev',
    date: 'Mei, 2025',
    link: '', // Kosong agar link tidak muncul
    description: 'DariMata Studio is my teams exploration into designing a clean and functional fashion e-commerce interface. The primary focus is on streamlining the user journey—from browsing the catalog and selecting product variants to the final checkout—while maintaining a bold visual identity.',
    gallery: [dariMataImage, dariMataImage1, dariMataImage2, dariMataImage3, dariMataImage4],
    decorations: [
      { icon: '📷', top: '-35px', left: '-40px', rotate: '-20deg' },
      { icon: '🛍️', bottom: '-40px', right: '-35px', rotate: '15deg' },
      { icon: '👕', top: '-45px', left: '50%', rotate: '5deg' }
    ]
  },
  { 
    id: 'ruangtenang',
    name: 'Ruang Tenang', 
    heroImage: ruangTenangImage, 
    heroPos: 'right',
    role: 'Game Developer & Interaction Designer',
    date: 'Jan, 2026',
    link: 'https://thufailaqbil.itch.io/ruang-tenang',
    description: 'Developed using Construct 2, my team and I created this game to motivate university students working on their final thesis. Inspired by Harvest Moon, the project blends pixel art with a dynamic lighting system to deliver a calming visual experience.',
    gallery: [ruangTenangImage, ruangTenangImage1, ruangTenangImage2, ruangTenangImage3, ruangTenangImage4],
    decorations: [
      { icon: '🎮', top: '-35px', left: '-40px', rotate: '-25deg' },
      { icon: '💻', bottom: '45px', right: '-5px', rotate: '15deg' },
      { icon: '📼', top: '25px', left: '45%', rotate: '10deg' }
    ]
  },
];

const ProjectCard = ({ project, isFirst }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // STATE LIGHTBOX: Menyimpan gambar mana yang sedang diperbesar
  const [selectedImage, setSelectedImage] = useState(null); 

  // --- BUG FIX 2: MENGUNCI LAYAR & NAVBAR SAAT LIGHTBOX DIBUKA ---
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'; 
      document.body.classList.add('is-lightbox-open'); // Ganti nama class
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('is-lightbox-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('is-lightbox-open');
    };
  }, [selectedImage]);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % project.gallery.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) nextSlide(); 
    else if (diff < -50) prevSlide();
  };

  const handleImageClick = (e, index, img) => {
    e.stopPropagation(); 
    
    if (index !== activeIndex) {
      setActiveIndex(index); 
    } else {
      setSelectedImage(img); 
    }
  };

  return (
    <>
      <div className="project-card" id={`project-${project.id}`}>
        
        {isFirst && <div className="work-badge-new">Work</div>}

        <div className="project-info">
          <h3 className="project-title">
            {project.name}
            {project.decorations.map((deco, idx) => (
              <span 
                key={idx} 
                className="project-deco-wrapper" 
                style={{ 
                  top: deco.top, 
                  bottom: deco.bottom, 
                  left: deco.left, 
                  right: deco.right, 
                  transform: `rotate(${deco.rotate})` 
                }}
              >
                <span className="project-deco-icon">{deco.icon}</span>
              </span>
            ))}
          </h3>

          <ul className="project-meta">
            <li><span>Role</span> {project.role}</li>
            <li><span>Date</span> {project.date}</li>
            {project.link && (
              <li><span>Link</span> <a href={project.link} target="_blank" rel="noopener noreferrer">Visit Project ↗</a></li>
            )}
          </ul>
          <p className="project-desc">{project.description}</p>
        </div>

        <div className="project-slider-container">
          <div className="carousel-3d" onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchEnd={handleDragEnd}>
            {project.gallery.map((img, index) => {
              let positionClass = '';
              if (index === activeIndex) positionClass = 'center'; 
              else if (index === (activeIndex - 1 + project.gallery.length) % project.gallery.length) positionClass = 'left';   
              else if (index === (activeIndex + 1) % project.gallery.length) positionClass = 'right';  
              // --- BUG FIX 1: Ganti nama kelas 'hidden' menjadi 'carousel-hidden' ---
              else positionClass = 'carousel-hidden'; 
              return (
                <div key={index} className={`carousel-item ${positionClass}`} onClick={(e) => handleImageClick(e, index, img)} title={index === activeIndex ? "Klik untuk memperbesar" : ""}>
                  <img src={img} alt={`${project.name} screenshot ${index + 1}`} draggable="false" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>Tutup</button>
            <img src={selectedImage} alt="Enlarged project view" className="lightbox-image" />
          </div>
        </div>
      )}
    </>
  );
};

const SkillsSection = () => {
  // Data keahlian berdasarkan pengalaman
  const skills = [
    { name: "Yes, I build all this! ✨", style: "shape-quote-white" },
    { name: "Frontend (React & Vite)", style: "shape-pill-blue" },
    { name: "Web App (Laravel)", style: "shape-blob-pink" },
    { name: "UI/UX & Product Design", style: "shape-cloud-purple" },
    { name: "AI-Powered Coder", style: "shape-diamond-green" },
    { name: "Game Dev", style: "shape-peanut-yellow" },
    { name: "Video & Audio Post-Pro", style: "shape-pill-orange" }
  ];

  return (
    <section className="skills-section" aria-label="My Skills">
      <div className="skills-container">
        {skills.map((skill, index) => {
          // --- RENDER UNTUK SKILL BIASA LAINNYA ---
          return (
            <div key={index} className={`skill-badge ${skill.style}`}>
              {skill.name}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- WORKFLOW ---
const workflowSteps = [
  {
    label: '01',
    title: 'Define the direction',
    description: 'I clarify the goal, audience, and constraints first. A clear direction helps me make better decisions throughout the project.',
    icon: iconBrain,
    iconAlt: 'Brain icon',
  },
  {
    label: '02',
    title: 'Plan the approach',
    description: 'I use AI to explore ideas, organize requirements, and compare possible solutions, then choose the approach that fits the project.',
    icon: iconGear,
    iconAlt: 'Gear icon',
  },
  {
    label: '03',
    title: 'Build and iterate',
    description: 'I turn the chosen direction into an interface or working feature, using AI as a coding partner while I guide and refine the result.',
    icon: iconLightning,
    iconAlt: 'Lightning icon',
  },
  {
    label: '04',
    title: 'Verify and refine',
    description: 'I test the result, check edge cases, and polish the details. AI can help spot issues, but I verify the final experience myself.',
    icon: iconCursor,
    iconAlt: 'Cursor icon',
  },
];

const AIWorkflowSection = () => {
  const [isFaceOpen, setIsFaceOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const sectionRef = useRef(null); // Ref untuk auto-scroll ke section ini
  const touchStart = useRef(null);
  const ignoreClickUntil = useRef(0);

  // EFEK AUTO-SCROLL, SCROLL LOCK, & HIDE NAVBAR
  useEffect(() => {
    if (isDetailOpen) {
      // 1. Kunci Scroll
      document.body.style.overflow = 'hidden';
      // 2. Tambah class untuk sembunyikan Navbar via CSS
      document.body.classList.add('is-workflow-open');

      // 3. Paksa layar auto-scroll tepat ke tengah section ini!
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('is-workflow-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('is-workflow-open');
    };
  }, [isDetailOpen]);

  useEffect(() => {
    if (isDetailOpen) {
      document.body.classList.add('is-workflow-open');
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.classList.remove('is-workflow-open');
      document.body.style.overflow = '';
    }

    // Cleanup saat komponen dibongkar
    return () => {
      document.body.classList.remove('is-workflow-open');
      document.body.style.overflow = '';
    };
  }, [isDetailOpen]);

  const selectStep = (index) => {
    setActiveStep(index);
  };

  const moveStep = (direction) => {
    setActiveStep((current) => {
      const nextStep = current + direction;
      if (nextStep < 0 || nextStep >= workflowSteps.length) return current;
      return nextStep;
    });
  };

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const touch = event.changedTouches[0];
    const swipeDistance = touch.clientX - touchStart.current.x;
    const verticalDistance = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(swipeDistance) < 40 || Math.abs(swipeDistance) <= Math.abs(verticalDistance)) return;
    ignoreClickUntil.current = Date.now() + 500;
    moveStep(swipeDistance < 0 ? 1 : -1);
  };

  const handleStageClickCapture = (event) => {
    if (Date.now() >= ignoreClickUntil.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const handleStepKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveStep(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveStep(-1);
    }
  };

  const toggleFace = () => {
    setIsFaceOpen((prev) => {
      const newState = !prev;
      if (!newState) setIsDetailOpen(false);
      return newState;
    });
  };

  const handleIconClick = (index) => {
    if (index === activeStep) {
      setIsDetailOpen(!isDetailOpen);
    } else {
      selectStep(index);
    }
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <section 
      ref={sectionRef} /* Dipasang di sini agar bisa di-scroll otomatis */
      className="ai-process-section" 
      aria-labelledby="ai-process-title"
    >
      <div className="ai-process-content">
        
        <div className="ai-process-header">
          <p className="ai-process-eyebrow">A little behind the scenes</p>
          <h2 id="ai-process-title">AI-Augmented Creative Workflow</h2>
          <p className="ai-process-intro">
            See how I combine thoughtful planning, hands-on making, and AI at every step.
          </p>
        </div>

        <div className={`ai-process-layout ${isDetailOpen ? 'is-detail-open' : ''}`}>
          
          {/* OVERLAY GELAP & BLUR */}
          <div className="ai-process-overlay" onClick={closeDetail} aria-hidden="true"></div>
          
          <div
            className={`ai-process-stage ${isFaceOpen ? 'is-face-open' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => { touchStart.current = null; }}
            onClickCapture={handleStageClickCapture}
          >
            <div className="ai-process-steps" aria-hidden={!isFaceOpen}>
              {workflowSteps.map((step, index) => {
                let statusClass = 'is-hidden';
                if (index === activeStep) statusClass = 'is-active';
                else if (index === activeStep + 1) statusClass = 'is-next'; 
                else if (index === activeStep - 1) statusClass = 'is-prev'; 

                return (
                  <button
                    className={`ai-process-step ${statusClass}`}
                    key={step.label}
                    type="button"
                    onClick={() => handleIconClick(index)}
                    onKeyDown={handleStepKeyDown}
                    aria-label={`${step.label}: ${step.title}`}
                    aria-pressed={statusClass === 'is-active'}
                    tabIndex={isFaceOpen ? 0 : -1}
                  >
                    <img src={step.icon} alt={step.iconAlt} />
                  </button>
                );
              })}
            </div>

            <button
              className="ai-process-face"
              type="button"
              onClick={toggleFace}
              aria-expanded={isFaceOpen}
            >
              <span className="ai-process-face-art" aria-hidden="true">
                <img className="ai-process-face-sizing" src={myFaceImg} alt="" />
                <img className="ai-process-face-top" src={myFaceImg} alt="" />
                <span className="ai-process-face-hole-top"></span>
                <img className="ai-process-face-bottom" src={myFaceImg} alt="" />
                <span className="ai-process-face-hole"></span>
              </span>
            </button>
          </div>

          {/* PANEL TEKS DETAIL */}
          <div className="ai-process-detail-wrapper">
            <article className="ai-process-detail">
              
              {/* BAGIAN ATAS: Tombol X, Label, dan Judul disejajarkan */}
              <div className="detail-top-bar">
                <div className="detail-header-text">
                  <span className="detail-label">{workflowSteps[activeStep].label}</span>
                  <h3 className="detail-title">{workflowSteps[activeStep].title}</h3>
                </div>
              </div>

              {/* BAGIAN TENGAH: Deskripsi Utama (Caveat) & Teks Panjang */}
              <div className="detail-content-inner">
                <div className="detail-desc-container">
                  {/* Teks ini yang akan menggunakan font tulisan tangan Caveat */}
                  <p className="detail-desc">{workflowSteps[activeStep].description}</p>
                </div>
              </div>

            </article>
          </div>

        </div>
        <p className={`ai-process-hint ${isFaceOpen ? 'is-hidden' : ''}`} aria-hidden={isFaceOpen}>
          Click my face to reveal the process
        </p>
      </div>
    </section>
  );
};

// --- KOMPONEN BARU: INFINITE GALLERY ---
const InfiniteGallery = () => {
  // Ganti dengan path/variabel gambarmu yang sebenarnya
  const galleryRow1 = [
    '/assets/row-left/purplepass-login.webp', '/assets/row-left/darimata1.webp', '/assets/row-left/majalah.webp', 
    '/assets/row-left/payment.webp', '/assets/row-left/metode-pembayaran.webp', '/assets/row-left/plume.webp', 
    '/assets/row-left/amikompass-figma.webp', '/assets/row-left/purplepass.webp', '/assets/row-left/userbl.webp' 
  ];
  
  const galleryRow2 = [
    '/assets/row-right/cart-kk.webp', '/assets/row-right/cart-darimata.webp', '/assets/row-right/homebl.webp', 
    '/assets/row-right/darimata2.webp', '/assets/row-right/kk-figma.webp', '/assets/row-right/contact.webp',
    '/assets/row-right/koma.webp', '/assets/row-right/linera.webp', '/assets/row-right/loginbl.webp'
  ];

  return (
    <section className="infinite-gallery-section">
      <div className="gallery-header">
        <h2>PLAYGROUND <span>/ CREATIVE WORK</span></h2>
      </div>

      {/* Baris Pertama: Bergerak ke Kiri */}
      <div className="marquee-wrapper">
        <div className="marquee-track track-left">
          {/* Set 1 (Asli) */}
          <div className="marquee-content">
            {galleryRow1.map((img, index) => (
              <div className="gallery-item" key={`row1-a-${index}`}>
                <img src={img} alt={`Gallery ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
          {/* Set 2 (Duplikat Persis) */}
          <div className="marquee-content" aria-hidden="true">
            {galleryRow1.map((img, index) => (
              <div className="gallery-item" key={`row1-b-${index}`}>
                <img src={img} alt={`Gallery dup ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Baris Kedua: Bergerak ke Kanan */}
      <div className="marquee-wrapper">
        <div className="marquee-track track-right">
          {/* Set 1 (Asli) */}
          <div className="marquee-content">
            {galleryRow2.map((img, index) => (
              <div className="gallery-item" key={`row2-a-${index}`}>
                <img src={img} alt={`Gallery ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
          {/* Set 2 (Duplikat Persis) */}
          <div className="marquee-content" aria-hidden="true">
            {galleryRow2.map((img, index) => (
              <div className="gallery-item" key={`row2-b-${index}`}>
                <img src={img} alt={`Gallery dup ${index}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  // --- STATE POS 4: Melacak kartu kontak yang sedang pop-up ---
  const [activeContact, setActiveContact] = useState(null);

  // --- FITUR BATAL: Klik di luar kartu kontak mengembalikan ke idle ---
  useEffect(() => {
    const handleOutsideContactClick = (e) => {
      // Jika yang di-tap adalah area kartu kontak, biarkan fungsinya bekerja
      if (e.target.closest('.contact-card')) return;
      
      // Jika tap di luar kartu, tutup pop-up kontak
      if (activeContact) {
        setActiveContact(null);
      }
    };

    document.addEventListener('touchstart', handleOutsideContactClick);
    document.addEventListener('mousedown', handleOutsideContactClick);
    
    return () => {
      document.removeEventListener('touchstart', handleOutsideContactClick);
      document.removeEventListener('mousedown', handleOutsideContactClick);
    };
  }, [activeContact]);

  // --- LOGIKA KLIK KARTU KONTAK (Tap 1 Pop-up, Tap 2 Link) ---
  const handleContactTap = (e, platformId) => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice) {
      if (activeContact !== platformId) {
        // TAP 1: Cegah browser membuka link, munculkan Pop-up
        e.preventDefault(); 
        setActiveContact(platformId);
      } else {
        // TAP 2: Biarkan browser membuka link di tab baru.
        // Reset state dengan delay sedikit agar animasi menutup berjalan halus
        setTimeout(() => setActiveContact(null), 300); 
      }
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Bagian Teks (Kiri/Atas) */}
        <div className="contact-text-content">
          <p className="contact-eyebrow">Ready for the next step?</p>
          <h2 className="contact-title">LET'S BUILD<br/>SOMETHING EPIC.</h2>
          <p className="contact-desc">
            Whether you have a wild idea, a project in mind, or just want to chat about what i do, my inbox is always open.
          </p>
        </div>

        {/* Bagian Kartu Menumpuk (Kanan/Bawah ala Referensi) */}
        <div className="contact-cards-wrapper">
          
          {/* Kartu 1: Discord (Kiri) */}
          <a 
            href="https://discord.com/users/714857705088483398" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`contact-card card-discord ${activeContact === 'discord' ? 'active-popup' : ''}`} 
            aria-label="Connect on Discord"
            onClick={(e) => handleContactTap(e, 'discord')}
          >
            <div className="card-icon">
              <img src={icondiscord} alt="Discord Icon" className="contact-icon-img" /> 
            </div>
            <div className="card-info">
              <h4>Discord</h4>
              <p>Ping me for quick chats.</p>
            </div>
          </a>

          {/* Kartu 2: Instagram (Tengah) */}
          <a 
            href="https://www.instagram.com/thufailaqbill/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`contact-card card-insta ${activeContact === 'instagram' ? 'active-popup' : ''}`} 
            aria-label="Connect on Instagram"
            onClick={(e) => handleContactTap(e, 'instagram')}
          >
            <div className="card-icon">
              <img src={iconinstagram} alt="Instagram Icon" className="contact-icon-img" />
            </div>
            <div className="card-info">
              <h4>Instagram</h4>
              <p>If you want to see my life outside of coding.</p>
            </div>
          </a>

          {/* Kartu 3: GitHub/LinkedIn (Kanan) */}
          <a 
            href="https://github.com/thufailaqbil" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`contact-card card-github ${activeContact === 'github' ? 'active-popup' : ''}`} 
            aria-label="Connect on GitHub"
            onClick={(e) => handleContactTap(e, 'github')}
          >
            <div className="card-icon">
              <img src={icongithub} alt="GitHub Icon" className="contact-icon-img" />
            </div>
            <div className="card-info">
              <h4>GitHub</h4>
              <p>Actually just college stuff.</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

                                                          // --- KOMPONEN UTAMA (HALAMAN PORTFOLIO) ---
export default function Portfolio() {
  const myName = "Thufail Aqbil Abbad Marzuki";
  const glowRef = useRef(null);
  const [emailText, setEmailText] = useState("thufailaqbil02@gmail.com");
  const [activeHeroProject, setActiveHeroProject] = useState(null);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("thufailaqbil02@gmail.com");
    setEmailText("Email tersalin ke clipboard! ✨");
    setTimeout(() => {
      setEmailText("thufailaqbil02@gmail.com");
    }, 2000);
  };

  // Kursor Glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        glowRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- FITUR BARU: Batal Pop-up jika tap di luar gambar ---
  useEffect(() => {
    // Tambahkan parameter 'e' (event) ke dalam fungsi ini
    const handleOutsideClick = (e) => {
      // KUNCI PERBAIKAN: 
      // Jika yang di-tap adalah elemen proyek, hentikan fungsi pembatalan ini!
      // Biarkan Tap 1 atau Tap 2 dari fungsi handleScrollToProject yang mengambil alih.
      if (e.target.closest('.hero-project')) {
        return; 
      }
      
      // Jika tap benar-benar di area luar gambar, baru kembalikan ke idle
      if (activeHeroProject) {
        setActiveHeroProject(null);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [activeHeroProject]);

  const splitTextToSpans = (text) => {
    return text.split('').map((char, index) => {
      if (char === ' ') return <span key={index} className="space-char">&nbsp;</span>;
      return <span key={index} className="hover-char">{char}</span>;
    });
  };

  // Fungsi baru untuk mengambil alih scroll
  // Fungsi yang diperbarui: Menangani logika Tap 1 (Pop-up) dan Tap 2 (Scroll)
  const handleScrollToProject = (e, targetId, projectId) => {
    e.preventDefault(); 
    
    // KUNCI PENTING: Tahan event klik agar tidak tembus ke 'document' (yang akan memicu batal)
    e.stopPropagation(); 
    
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice) {
      if (activeHeroProject !== projectId) {
        setActiveHeroProject(projectId); // Tap 1: Pop-up
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        setActiveHeroProject(null); // Reset setelah scroll
      }
    } else {
      // ... (Logika PC tetap sama)
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  return (
    <>
      <div className="cursor-glow" ref={glowRef}></div>

      {/* NAVBAR */}
      <nav className="navbar">
        {/* Logo TA. dihapus sesuai desain Kapsul */}
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-frame" id="home">
        <div className="hero-canvas">
          <header className="hero-meta">
            <a href="https://www.google.com/maps/place/Yogyakarta" target="_blank" rel="noopener noreferrer">
              Yogyakarta, Indonesia
            </a>
            <a href="mailto:thufailaqbil02@gmail.com" onClick={handleCopyEmail}>
              {emailText}
            </a>
          </header>

          <main className="hero-content">
            <h1 className="hero-title">{splitTextToSpans(myName)}</h1>

            <div className="hero-projects">
              {projectsData.map((project) => (
                <a
                  // Tambahkan class 'active-popup' jika ID proyek ini sama dengan state aktif
                  className={`hero-project hero-project--${project.heroPos} ${activeHeroProject === project.id ? 'active-popup' : ''}`}
                  href={`#project-${project.id}`}
                  key={project.id}
                  // Kirim juga project.id ke fungsi
                  onClick={(e) => handleScrollToProject(e, `project-${project.id}`, project.id)}
                >
                  <img src={project.heroImage} alt={project.name} />
                </a>
              ))}
            </div>

            <h2 className="hero-role">Product developer,<br />designer &amp; creator</h2>
          </main>

          <footer className="hero-specialties">
            <p>Selected work &amp; specialties</p>
            <p>Web apps · Frontend development · Product design</p>
          </footer>
        </div>
      </section>

      <SkillsSection/>
      <AIWorkflowSection />

      {/* WORK SECTION */}
      <section className="work-section" id="work">
        <div className="projects-list">
          <div className="vertical-watermark">
            <span> MY SIGNATURE PROJECTS • MY SIGNATURE PROJECTS • </span>
            <span> MY SIGNATURE PROJECTS • MY SIGNATURE PROJECTS • </span>
          </div>
          {projectsData.map((project, index) => (
            // Lempar prop isFirst={index === 0} agar lencana hanya muncul di King Kerang
            <ProjectCard key={project.id} project={project} isFirst={index === 0} />
          ))}
        </div>
      </section>

      {/*INFINITE GALLERY*/}
      <InfiniteGallery />

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
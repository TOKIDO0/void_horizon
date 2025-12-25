
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  MessageCircle, 
  X, 
  Send,
  Star,
  Zap,
  Activity
} from 'lucide-react';

// --- Parallax Hook ---
const useParallax = (speed: number = 0.1) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return offset;
};

// --- Scroll Reveal Hook ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blurAmount, setBlurAmount] = useState(10);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const elementBottom = rect.bottom;

      // 元素进入视口时立即设置为可见
      if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
        setIsVisible(true);
        
        // 优化模糊计算：元素进入视口后快速清晰
        if (elementTop < windowHeight * 0.7) {
          // 当元素进入视口70%位置时，快速减少模糊
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight * 0.7 - elementTop) / (windowHeight * 0.3)));
          const blur = Math.max(0, 10 * (1 - scrollProgress * 1.5));
          setBlurAmount(blur);
        } else {
          // 元素刚进入视口时保持轻微模糊
          const initialProgress = (windowHeight * 0.85 - elementTop) / (windowHeight * 0.15);
          const blur = Math.max(0, 10 - initialProgress * 5);
          setBlurAmount(blur);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { elementRef, isVisible, blurAmount };
};

// --- Scroll Reveal Section Component ---
const ScrollRevealSection = ({ children }: { children: React.ReactNode }) => {
  const { elementRef, isVisible, blurAmount } = useScrollReveal();
  
  return (
    <div
      ref={elementRef}
      className="transition-all duration-1000"
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 30}px)`
      }}
    >
      {children}
    </div>
  );
};

// --- Sound Manager ---
class SoundManager {
  private ctx: AudioContext | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.startDrone();
    } catch (e) {
      console.warn("Audio context failed to initialize", e);
    }
  }

  private startDrone() {
    if (!this.ctx) return;
    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(40, this.ctx.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(60, this.ctx.currentTime);
    this.droneGain.gain.setValueAtTime(0.005, this.ctx.currentTime);

    this.droneOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
    this.droneOsc.start();
  }

  playFeedback(type: 'hover' | 'click') {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    if (type === 'hover') {
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    } else {
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + (type === 'hover' ? 0.08 : 0.12));
  }
}

const sounds = new SoundManager();

// --- Glitch Text ---
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [glitchedIndices, setGlitchedIndices] = useState<Record<number, string>>({});
  const [isColorGlitching, setIsColorGlitching] = useState(false);
  const isAnimatingRef = useRef(false);
  const [randomGlitchIndex, setRandomGlitchIndex] = useState<number>(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const idx = Math.floor(Math.random() * text.length);
        setRandomGlitchIndex(idx);
        setTimeout(() => setRandomGlitchIndex(-1), 150 + Math.random() * 200);
      }
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [text]);

  const triggerGlitchEffect = () => {
    // 2% chance to trigger
    if (isAnimatingRef.current || Math.random() > 0.02) return;
    
    isAnimatingRef.current = true;
    setIsColorGlitching(true);
    sounds.playFeedback('hover');

    const duration = 800;
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const newGlitched: Record<number, string> = {};
        const count = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < count; j++) {
          const idx = Math.floor(Math.random() * text.length);
          newGlitched[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
        setGlitchedIndices(newGlitched);
        requestAnimationFrame(frame);
      } else {
        setIsColorGlitching(false);
        setGlitchedIndices({});
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <span 
      onMouseEnter={triggerGlitchEffect}
      className={`relative inline-block transition-all duration-700 ${isColorGlitching ? 'animate-glitch-soft' : ''} ${className}`}
    >
      {text.split("").map((char, i) => {
        const isGlitched = glitchedIndices[i] !== undefined;
        const isRandomGlitch = i === randomGlitchIndex;
        const displayChar = isGlitched ? glitchedIndices[i] : (isRandomGlitch ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char);
        return (
          <span key={i} className={`transition-colors duration-75 ${isGlitched || isRandomGlitch ? 'text-[#bfff00]' : ''}`}>
            {displayChar}
          </span>
        );
      })}
      
      {isColorGlitching && (
        <>
          <span className="absolute top-0 left-0 -z-10 text-[#ff0080] opacity-30 translate-x-[2px] pointer-events-none">
            {text}
          </span>
          <span className="absolute top-0 left-0 -z-10 text-[#00ffff] opacity-30 -translate-x-[2px] pointer-events-none">
            {text}
          </span>
        </>
      )}

      <style>{`
        @keyframes glitch-soft-shake {
          0%, 100% { transform: translate(0); }
          50% { transform: translate(-1px, 1px); }
        }
        .animate-glitch-soft {
          animation: glitch-soft-shake 0.3s infinite;
          text-shadow: 2px 0 #ff00801a, -2px 0 #00ffff1a;
        }
      `}</style>
    </span>
  );
};

// --- History Components ---
interface HistoryCardProps {
  year: string;
  title: string;
  summary?: string;
  desc: string;
  media?: string;
  index: number;
  progress: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ year, title, summary, desc, media, index, progress }) => {
  const enterThreshold = index * 0.18; 
  const isActive = progress > enterThreshold;
  
  return (
    <div 
      onMouseEnter={() => sounds.playFeedback('hover')}
      style={{ willChange: isActive ? 'auto' : 'transform, opacity' }}
      className={`group min-w-[440px] h-[550px] flex flex-col justify-end p-12 border border-white/5 bg-black/30 backdrop-blur-2xl rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform relative overflow-hidden ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-95'} hover:bg-black/20 hover:border-[#bfff00]/20`}
    >
      {media && (
        <>
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover opacity-90 group-hover:opacity-95 transition-opacity duration-500"
            style={{ minHeight: '100%', minWidth: '100%' }}
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={media} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/30 to-black/60 pointer-events-none"></div>
        </>
      )}
      <div className="absolute top-12 left-12 transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
        <span className="font-syne text-[#bfff00] text-9xl opacity-20 select-none transition-opacity group-hover:opacity-40">{year}</span>
      </div>

      <div className="relative z-10">
        <h4 className="font-syne text-3xl text-white mb-6 uppercase tracking-tighter leading-none transition-transform duration-500 group-hover:-translate-y-2">
          {title}
        </h4>
        {summary && (
          <p className="text-white/70 text-base mb-4 font-medium tracking-tight">
            {summary}
          </p>
        )}
        
        <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100 group-hover:mb-4">
          <p className="text-white/60 leading-relaxed text-base font-medium border-l-2 border-[#bfff00]/30 pl-4 py-1">
            {desc}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold text-[#bfff00]/40 group-hover:text-[#bfff00] transition-colors">
          <Activity size={12} /> FULL LOG ACCESSIBLE
        </div>
      </div>

      <div className={`absolute -top-8 -right-8 w-40 h-40 bg-[#bfff00] text-black rounded-full flex items-center justify-center font-bold text-[11px] shadow-[0_20px_50px_rgba(191,255,0,0.3)] transition-all duration-700 delay-150 transform ${isActive ? 'scale-100 opacity-100 rotate-12' : 'scale-0 opacity-0 rotate-0'} group-hover:rotate-[32deg] group-hover:scale-110`}>
        <span className="px-6 text-center leading-tight uppercase tracking-[0.2em]">VH-PROTO-{(index + 1).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const HorizontalHistory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const historyData = [
    { 
      year: "2024", 
      title: "Aesthetic Foundation", 
      summary: "Graduated and began an intensive observation of digital media and modern design.", 
      desc: "After graduating in 2024, I entered a period of self-refinement. Immersing myself in avant-garde game visuals and digital media helped me build a distinct aesthetic framework that now powers my pursuit of high-end web experiences.",
      media: "/assets/videos/card1.mp4"
    },
    { 
      year: "2025", 
      title: "AI-Assisted Development Shift", 
      summary: "Explored AI programming tools and efficient web development solutions.", 
      desc: "In November 2025, I began formally learning how to leverage AI tools for web development. Through deep application of AI-assisted programming, I achieved a breakthrough from zero to one, mastering the core skills for rapidly building modern responsive websites.",
      media: "/assets/videos/card2.mp4"
    },
    { 
      year: "2025", 
      title: "First Full-Stack Project", 
      summary: "Independently completed a website with front-end and back-end management system.", 
      desc: "Just last week, I successfully delivered my first complete website project. It features not only a high-visual-standard front-end display but also a back-end management system for user information management. This practice proved my ability to handle complex business requirements independently.",
      media: "/assets/videos/card3.mp4"
    },
    { 
      year: "2025", 
      title: "Void Horizon Founded", 
      summary: "Integrated personal skills and aesthetics to launch professional web design services.", 
      desc: "After completing my first project, I officially named my service system Void Horizon. I decided to operate as an independent studio, providing web development, back-end management, and AI solution customization for clients seeking unique aesthetics and high-performance experiences.",
      media: "/assets/videos/card4.mp4"
    },
    { 
      year: "2025", 
      title: "Visual System R&D", 
      summary: "Developed this project with surrealist visuals to enhance brand value.", 
      desc: "This is my second core project. Here I applied more impactful visual effects and fluid interaction design. I am committed to transforming complex technical logic into smooth user experiences, ensuring the website possesses top-tier brand quality while remaining fully functional.",
      media: "/assets/videos/card5.mp4"
    },
    { 
      year: "2026", 
      title: "Empowering AI Future", 
      summary: "Providing AI-driven web and management solutions for young entrepreneurs.", 
      desc: "Entering 2026, Void Horizon will continue exploring the deep integration of AI and web design. We will continuously optimize our service process, providing clients with digital tools that are not only beautiful but also easy to maintain, helping individuals and businesses build their professional presence in the internet age.",
      media: "/assets/videos/card6.mp4"
    }
  ];

  return (
    <section ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-x-hidden bg-black z-[30] border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">

        <div className="px-12 max-w-[1600px] mx-auto w-full mb-16 relative z-10 pt-8 md:pt-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-syne text-6xl md:text-9xl tracking-tighter bracket">
              COMPANY <span className="text-[#bfff00]">JOURNEY</span>
            </h2>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.6em] text-white/30 mb-4">
              <div className="w-1.5 h-1.5 bg-[#bfff00] rounded-full animate-pulse"></div>
              OPERATIONAL LOG // V 3.0
            </div>
          </div>
          <div className="h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
            <div 
              className="h-full bg-[#bfff00] shadow-[0_0_25px_#bfff00] transition-all duration-300 ease-out" 
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
        
        <div 
          className="flex gap-20 pl-[100vw] pr-[50vw] py-20"
          style={{ 
            transform: `translate3d(${-scrollProgress * 380}vw, 0, 0)`,
            willChange: 'transform',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {historyData.map((item, i) => (
            <HistoryCard 
              key={i} 
              index={i} 
              progress={scrollProgress} 
              year={item.year}
              title={item.title}
              summary={item.summary}
              desc={item.desc}
              media={item.media}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Utilities ---
const Highlight = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number }) => {
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsActive(true), delay);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.6 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={elementRef} className={`highlighter-text ${isActive ? 'is-active' : ''}`}>
      {children}
    </span>
  );
};

const FloatingParticles = () => {
  const parallaxOffset = useParallax(0.05);
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 15 + 10}s`,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{ transform: `translateY(${parallaxOffset}px)` }}>
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute rounded-full bg-[#bfff00] blur-[1px]"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            opacity: p.opacity, animation: `floatUp ${p.duration} linear infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(110vh) translateX(0); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-20vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Navbar = () => (
  <nav 
    onClick={() => sounds.init()}
    className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center mix-blend-difference text-white"
  >
    <div className="flex items-center gap-4 group cursor-pointer" onMouseEnter={() => sounds.playFeedback('hover')}>
      <img src="/assets/logo/Void Horizon.svg" alt="Void Horizon" className="h-8 group-hover:scale-110 transition-transform" />
    </div>
    <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
      <a href="#works" className="hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Solutions</a>
      <a href="#about" className="hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Manifesto</a>
      <a href="#contact" className="hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Contact</a>
    </div>
  </nav>
);

const Ticker = () => {
  const brands = [
    { type: 'img', src: '/assets/logo/Void Horizon.svg', alt: 'Void Horizon', size: 'h-8' },
    { type: 'icon', name: 'simple-icons:windsurf', size: 32 },
    { type: 'icon', name: 'skill-icons:github-light', size: 32 },
    { type: 'icon', name: 'skill-icons:supabase-light', size: 32 },
    { type: 'icon', name: 'skill-icons:vscode-light', size: 32 },
    { type: 'icon', name: 'skill-icons:linkedin', size: 32 },
    { type: 'icon', name: 'devicon:huggingface', size: 32 },
    { type: 'icon', name: 'devicon:nextjs', size: 32 },
  ];

  return (
    <div className="w-full overflow-hidden border-y border-white/5 py-6 bg-[#bfff00] relative z-20">
      <div className="flex whitespace-nowrap animate-ticker">
        {[...Array(3)].map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex items-center gap-16 px-8">
            {brands.map((brand, i) => (
              <div key={`${repeatIndex}-${i}`} className="flex items-center justify-center">
                {brand.type === 'img' ? (
                  <img src={brand.src} alt={brand.alt} className={brand.size} />
                ) : (
                  <span className="iconify" data-icon={brand.name} data-width={brand.size}></span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedProjectTitle = ({ title, category, href = "#" }: { title: string, category: string, href?: string }) => (
  <a 
    href={href} 
    onMouseEnter={() => sounds.playFeedback('hover')}
    onClick={() => sounds.playFeedback('click')}
    className="title-container relative flex items-stretch h-32 border-t border-white/5 group cursor-pointer overflow-hidden"
  >
    <div className="title-fill-bg"></div>
    <div className="relative z-10 flex-1 flex items-center px-8 transition-all duration-500 group-hover:translate-x-12">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 group-hover:text-black/60 mb-2">{category}</span>
        <h3 className="font-syne text-3xl md:text-6xl leading-none">
          <GlitchText text={title} />
        </h3>
      </div>
    </div>
    <div className="icon-mask relative z-10">
      <div className="sliding-icon icon-top text-[#bfff00]">
        <span className="iconify" data-icon="iconoir:arrow-up-right-square" data-width="24"></span>
      </div>
      <div className="sliding-icon icon-center text-[#bfff00]">
        <span className="iconify" data-icon="svg-spinners:bouncing-ball" data-width="20"></span>
      </div>
      <div className="sliding-icon icon-bottom text-[#bfff00]">
        <span className="iconify" data-icon="iconoir:arrow-up-right-square" data-width="24"></span>
      </div>
    </div>
  </a>
);

const Hero = () => {
  const textParallax = useParallax(-0.15);
  const { elementRef, isVisible, blurAmount } = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 确保视频立即开始播放
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
    }
  }, []);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      <div 
        ref={elementRef}
        className="max-w-7xl mx-auto w-full transition-all duration-1000 relative z-10" 
        style={{ 
          transform: `translateY(${isVisible ? textParallax : 50}px)`,
          filter: `blur(${blurAmount}px)`,
          opacity: isVisible ? 1 : 0
        }}
      >
        <div className="mb-20">
          <span className="bracket font-syne text-[#bfff00] text-sm uppercase tracking-widest block mb-6">
            CORPORATE VISION // CORE SYSTEMS
          </span>
          <h1 className="font-syne text-6xl md:text-[12rem] leading-[0.8] text-white tracking-tighter mb-10">
            <GlitchText text="VOID" /><br /><GlitchText text="HORIZON" />
          </h1>
          <p className="text-xl md:text-3xl text-white/40 max-w-2xl font-medium leading-tight">
            We engineer <Highlight>fluid intelligence systems</Highlight> driven by technical precision and architectural agility to deliver business value.
          </p>
        </div>
      </div>
    </section>
  );
};

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-10 left-10 z-[200]">
      <button
        onClick={toggleMusic}
        onMouseEnter={() => sounds.playFeedback('hover')}
        className="group relative w-16 h-16 bg-[#bfff00]/10 backdrop-blur-xl border-2 border-[#bfff00]/30 rounded-full flex items-center justify-center hover:bg-[#bfff00]/20 hover:border-[#bfff00] transition-all duration-300 hover:scale-110 hover:rotate-12"
      >
        {isPlaying ? (
          <>
            <div className="absolute inset-0 rounded-full bg-[#bfff00]/20 animate-ping"></div>
            <Activity size={24} className="text-[#bfff00] relative z-10 animate-pulse" />
          </>
        ) : (
          <div className="relative z-10 flex flex-col gap-1">
            <div className="w-1 h-3 bg-[#bfff00]/40 rounded-full"></div>
            <div className="w-1 h-2 bg-[#bfff00]/40 rounded-full"></div>
            <div className="w-1 h-1 bg-[#bfff00]/40 rounded-full"></div>
          </div>
        )}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-[#bfff00]/0 group-hover:text-[#bfff00] transition-all whitespace-nowrap">
          {isPlaying ? 'Vibing' : 'Vibe?'}
        </span>
      </button>
      <audio ref={audioRef} loop>
        <source src="/assets/music/Void Horizon.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Hello, this is Void Horizon AI Support. How can I assist you today?'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const processCommand = async (userMessage: string, history: {role: 'user' | 'bot', text: string}[]): Promise<string> => {
    try {
      const apiMessages = history.slice(-10).map(m => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));
      apiMessages.push({ role: 'user', content: userMessage });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Chat error:', error);
      return "I'm having trouble connecting right now. Please try again later or contact us at hello@voidhorizon.com";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    sounds.playFeedback('click');
    const msg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: msg }];
    setMessages(newMessages);
    setLoading(true);

    const responseText = await processCommand(msg, newMessages);
    setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end">
      <div className={`
        w-80 md:w-96 h-[450px] bg-[#040504] border border-[#bfff00]/30 rounded-2xl flex flex-col 
        shadow-[0_0_80px_rgba(0,0,0,0.8)] 
        origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
      `}>
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#bfff00]/5 rounded-t-2xl relative">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#bfff00] animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">Chat with AI Support</span>
              <span className="text-[8px] text-white/30 tracking-widest uppercase">Consulting Active</span>
            </div>
          </div>
          <button onClick={() => { sounds.playFeedback('click'); setIsOpen(false); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} message-enter`}>
              <div className={`text-xs p-4 rounded-xl leading-relaxed max-w-[85%] ${m.role === 'user' ? 'bg-[#bfff00]/10 text-[#bfff00] border border-[#bfff00]/20 rounded-br-none' : 'text-white/70 bg-white/5 rounded-bl-none border border-white/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-[#bfff00]/40">
              <div className="w-1 h-1 bg-current animate-bounce"></div>
              <div className="w-1 h-1 bg-current animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1 h-1 bg-current animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
        <div className="p-4 bg-white/5 rounded-b-2xl border-t border-white/5">
          <div className="relative flex items-center bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#bfff00]/50 transition-colors">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter your query..."
              className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-white/20 tracking-wider"
            />
            <button onClick={handleSend} className={`ml-2 transition-all ${input.trim() ? 'text-[#bfff00] scale-110' : 'text-white/20'}`}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={() => { sounds.init(); sounds.playFeedback('click'); setIsOpen(true); }}
        onMouseEnter={() => sounds.playFeedback('hover')}
        className={`mt-4 w-16 h-16 bg-[#bfff00] text-black flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(191,255,0,0.5)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}`}
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

const DottedOrbit = () => {
  const rotation = useParallax(0.02);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] pointer-events-none z-0 opacity-20" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}>
      <div className="absolute inset-0 border border-[#bfff00]/10 rounded-full animate-[orbit-spin_120s_linear_infinite]"></div>
      <div className="absolute inset-[20%] border border-white/5 rounded-full animate-[orbit-spin-rev_180s_linear_infinite]"></div>
      <div className="absolute inset-[40%] border border-[#bfff00]/5 rounded-full animate-[orbit-spin_60s_linear_infinite]"></div>
      <style>{`
        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
    </div>
  );
};

const App = () => {
  const auraOffset = useParallax(0.08);

  return (
    <div className="relative selection:bg-[#bfff00] selection:text-black" onMouseMove={() => sounds.init()}>
      <Navbar />
      <FloatingParticles />
      <Hero />
      <Ticker />
      
      <section id="works" className="py-40 relative bg-black">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/core.png" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        </div>
        <ScrollRevealSection>
          <div className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
            <h2 className="font-syne text-5xl md:text-7xl mb-4 bracket">Core Business Domains</h2>
          </div>
        </ScrollRevealSection>
        <div className="border-b border-white/5 relative z-10">
          <AnimatedProjectTitle title="WEB ARCHITECTURE" category="Digital Asset Hub // Core" />
          <AnimatedProjectTitle title="INTELLIGENT AGENTS" category="Autonomous Systems // Neural" />
          <AnimatedProjectTitle title="AI STRATEGY" category="Management Advisory // Future" />
        </div>
      </section>
      
      <section id="about" className="py-40 px-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/ethos.png" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        </div>
        <ScrollRevealSection>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 relative z-10">
            <div className="md:w-1/3">
              <h2 className="font-syne text-5xl md:text-7xl leading-none bracket text-[#bfff00] animate-fade-in-blur">Ethos</h2>
            </div>
            <div className="md:w-2/3 space-y-12">
              <p className="font-syne text-3xl md:text-5xl text-white/60 leading-tight animate-fade-in-blur" style={{ animationDelay: '0.2s' }}>
                Static systems are a relic of the past. We build intelligence that <Highlight>flows like liquid</Highlight>, adapting to unseen challenges.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-white/40 leading-relaxed animate-fade-in-blur animate-text-bounce" style={{ animationDelay: '0.4s' }}>
                  Void Horizon merges <Highlight delay={300}>organic motion</Highlight> with rigorous engineering. Our systems aren't just solving problems; they are creating the next standard of digital experience.
                </p>
                <div className="aspect-video bg-[#bfff00]/5 rounded-2xl border border-[#bfff00]/10 flex items-center justify-center group overflow-hidden cursor-pointer" onMouseEnter={() => sounds.playFeedback('hover')}>
                   <Zap className="text-[#bfff00]/20 group-hover:text-[#bfff00] group-hover:scale-110 transition-all duration-700" size={60} />
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </section>

      <HorizontalHistory />

      <section id="contact" className="py-40 px-6 border-t border-white/5 relative bg-black">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16" onMouseEnter={() => sounds.playFeedback('hover')}>
            <h2 className="font-syne text-5xl md:text-8xl leading-none tracking-tighter mb-6 transition-colors duration-700">
              <span className="inline-block whitespace-nowrap">
                <Highlight delay={200}><GlitchText text="CONN" /></Highlight><GlitchText text="ECT" />
              </span>
            </h2>
            <p className="text-white/40 text-lg">Tell us about your project</p>
          </div>
          
          <form className="space-y-8 max-w-2xl mx-auto" onSubmit={(e) => { e.preventDefault(); sounds.playFeedback('click'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#bfff00]/50 transition-colors"
                  onFocus={() => sounds.playFeedback('hover')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#bfff00]/50 transition-colors"
                  onFocus={() => sounds.playFeedback('hover')}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Requirement</label>
              <textarea 
                placeholder="Describe your project requirements..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#bfff00]/50 transition-colors resize-none"
                onFocus={() => sounds.playFeedback('hover')}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#bfff00] text-black font-bold uppercase tracking-[0.3em] py-5 rounded-xl hover:bg-[#d4ff4d] transition-all duration-300 hover:shadow-[0_0_40px_rgba(191,255,0,0.4)] text-sm"
              onMouseEnter={() => sounds.playFeedback('hover')}
            >
              Send Message
            </button>
          </form>
          
          <div className="text-center mt-12">
            <a href="mailto:hello@voidhorizon.com" className="inline-block text-sm font-bold uppercase tracking-[0.4em] text-white/30 hover:text-[#bfff00] transition-all">
              hello@voidhorizon.com
            </a>
          </div>
        </div>
      </section>

      <footer className="py-24 px-6 border-t border-white/5 bg-black/60 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="font-syne text-4xl mb-8">VOID HORIZON</h2>
            <p className="text-white/20 text-sm max-w-sm mb-12 leading-relaxed">
              Exploring the boundaries of digital creation. Constructing the foundations of the next intelligence era through neuromorphic motion.
            </p>
            <div className="flex items-center gap-4 text-[#bfff00] text-[10px] font-bold tracking-[0.3em] uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-[#bfff00] animate-pulse"></div> Status: Operational
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <div className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">Links</div>
              <a href="#" className="text-sm hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Manifesto</a>
              <a href="#" className="text-sm hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Careers</a>
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">Social</div>
              <a href="#" className="text-sm hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>LinkedIn</a>
              <a href="#" className="text-sm hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Twitter / X</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
          <span>© 2024 VOID HORIZON</span>
          <span className="text-[#bfff00]/30 tracking-widest">FLUID SYSTEMS</span>
        </div>
      </footer>
      
      <AIConcierge />
      <BackgroundMusic />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

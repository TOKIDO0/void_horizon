import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowUpRight, 
  MessageCircle, 
  X, 
  Send,
  Star,
  Zap,
  Activity,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Quote,
  Hand,
  Mail,
  MapPin,
  AlertTriangle,
  Linkedin,
  Github,
  Check
} from 'lucide-react';
import WebArchitecturePage from './public/assets/elements/WebArchitecture.tsx';
import IntelligentAgentsPage from './public/assets/elements/IntelligentAgents.tsx';
import AIStrategyPage from './public/assets/elements/AIStrategy.tsx';
import CaseStudyDetail from './public/assets/elements/CaseStudyDetail.tsx';

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

// 自定义 Threads 图标
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.63 18.57C9.9 18.57 7.8 16.94 7.8 14.14C7.8 11.53 9.76 9.62 12.52 9.62C13.89 9.62 14.89 10.09 15.35 10.45C15.41 8.76 14.38 7.95 12.68 7.95C11.34 7.95 10.37 8.47 9.93 9.39L7.77 8.61C8.61 6.7 10.55 5.7 12.93 5.7C15.02 5.7 16.62 6.54 17.31 8.08C17.47 8.42 17.53 8.8 17.53 9.17V15.26H15.34V14.2C14.7 15.11 13.73 15.71 12.63 15.71ZM12.84 16.59C14.15 16.59 15.25 15.81 15.25 14.37C15.25 14.21 15.25 14.03 15.22 13.87C14.91 13.59 14.25 13.31 13.41 13.31C11.97 13.31 10.97 14.22 10.97 15.53C10.97 16.22 11.84 16.59 12.84 16.59ZM17.97 22.53H15.72C15.75 22.22 15.75 21.87 15.75 21.5C15.75 17.16 12.5 13.44 8.03 13.44C3.81 13.44 0.44 16.75 0.44 20.97C0.44 25.19 3.82 28.5 8.03 28.5C10.75 28.5 13.12 27.12 14.44 25.03L12.5 23.91C11.56 25.35 9.91 26.25 8.03 26.25C5.06 26.25 2.69 23.91 2.69 20.97C2.69 18.03 5.07 15.69 8.03 15.69C11.28 15.69 13.62 18.44 13.62 21.72C13.62 23.27 12.78 24.58 11.38 24.58C10.5 24.58 10.05 24.16 9.87 23.59C9.84 23.56 9.84 23.56 9.84 23.53C9.84 23.5 9.81 23.44 9.81 23.41C9.53 24.19 8.78 24.78 7.84 24.78C6.31 24.78 5.25 23.62 5.25 21.94C5.25 20.25 6.47 18.84 8.16 18.84C9.28 18.84 10.12 19.41 10.5 20.19C10.59 18.81 11.75 17.75 13.25 17.75C15.53 17.75 17.97 19.53 17.97 22.53Z" transform="translate(2 -3) scale(0.9)"/>
  </svg>
);

// 全局固定视差背景 (来自 public/assets/elements/Home.tsx)
const GlobalParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 100]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,80,40,0.08),transparent_80%)]" />

      <motion.div
        style={{ y: y1 }}
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 rounded-full blur-[150px]"
      />

      <motion.div
        style={{ y: y2 }}
        animate={{ x: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] left-0 w-[800px] h-[600px] bg-emerald-700/20 rounded-full blur-[120px]"
      />

      <motion.div
        style={{ y: y3 }}
        animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-[100px]"
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
};

// RevealBlock (来自 public/assets/elements/Home.tsx)
const RevealBlock = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// MarkerHighlight (来自 public/assets/elements/Home.tsx)
const MarkerHighlight = ({
  children,
  delay = 0,
  color = '#92D95F',
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
}) => (
  <span className="relative inline-block px-2">
    <motion.span
      initial={{ width: '0%' }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: 'easeInOut' }}
      className="absolute top-1/2 left-0 h-[0.8em] -z-10 -translate-y-1/2 -rotate-1 rounded-sm mix-blend-screen opacity-80"
      style={{ marginTop: '0.1em', backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
    />
    <span className="relative z-10">{children}</span>
  </span>
);

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


const Navbar = () => (
  <nav 
    onClick={() => sounds.init()}
    className="fixed top-0 left-0 w-full z-[100] px-4 sm:px-6 py-5 sm:py-8 flex justify-between items-center"
  >
    <button
      type="button"
      className="flex items-center gap-4 group cursor-pointer mix-blend-difference"
      onMouseEnter={() => sounds.playFeedback('hover')}
      onClick={() => {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <img src="/assets/logo/void_horizon.svg" alt="Void Horizon" className="h-8 sm:h-10 group-hover:scale-110 transition-transform brightness-0 invert" />
    </button>
    <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
      <a href="#works" className="mix-blend-difference hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Solutions</a>
      <a href="#portfolio" className="mix-blend-difference hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Portfolio</a>
      <a href="#contact" className="mix-blend-difference hover:text-[#bfff00] transition-colors" onMouseEnter={() => sounds.playFeedback('hover')}>Contact</a>
    </div>
  </nav>
);

const Ticker = () => {
  const brands = [
    { type: 'img', src: '/assets/logo/void_horizon.svg', alt: 'Void Horizon', size: 'h-8' },
    { type: 'icon', name: 'simple-icons:windsurf', size: 32 },
    { type: 'icon', name: 'skill-icons:github-light', size: 32 },
    { type: 'icon', name: 'skill-icons:supabase-light', size: 32 },
    { type: 'icon', name: 'skill-icons:vscode-light', size: 32 },
    { type: 'icon', name: 'skill-icons:linkedin', size: 32 },
    { type: 'icon', name: 'devicon:huggingface', size: 32 },
    { type: 'icon', name: 'devicon:nextjs', size: 32 },
  ];

  return (
    <div className="w-full overflow-hidden border-y border-white/5 py-4 sm:py-6 bg-[#bfff00] relative z-20">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-10 sm:gap-14 px-6 sm:px-8">
            {brands.map((brand, i) => (
              <div key={`${copyIndex}-${i}`} className="w-10 h-10 flex items-center justify-center shrink-0">
                {brand.type === 'img' ? (
                  <img src={brand.src} alt={brand.alt} className="h-7 sm:h-8" />
                ) : (
                  <span className="iconify" data-icon={brand.name} data-width={brand.size}></span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-marquee 24s linear infinite;
          will-change: transform;
        }
        @keyframes ticker-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
};

const AnimatedProjectTitle = ({
  title,
  category,
  onClick,
}: {
  title: string;
  category: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onMouseEnter={() => sounds.playFeedback('hover')}
    onClick={() => {
      sounds.playFeedback('click');
      onClick();
    }}
    className="title-container relative flex items-stretch h-24 sm:h-28 md:h-32 border-t border-white/5 group cursor-pointer overflow-hidden text-left w-full"
  >
    <div className="title-fill-bg"></div>
    <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 md:px-8 transition-all duration-500 group-hover:translate-x-6 sm:group-hover:translate-x-12">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 group-hover:text-black/60 mb-2">{category}</span>
        <h3 className="font-molgan text-2xl sm:text-3xl md:text-6xl leading-none">
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
  </button>
);

type RouteKey = 'home' | 'web-architecture' | 'intelligent-agents' | 'ai-strategy' | 'case-study';

const getRouteFromHash = (): RouteKey => {
  const raw = window.location.hash.replace('#', '').trim();
  if (raw === 'web-architecture') return 'web-architecture';
  if (raw === 'intelligent-agents') return 'intelligent-agents';
  if (raw === 'ai-strategy') return 'ai-strategy';
  if (raw === 'case-study') return 'case-study';
  return 'home';
};

const useHashRoute = () => {
  const [route, setRoute] = useState<RouteKey>(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace('#', '').trim();
      const nextRoute = getRouteFromHash();
      setRoute(nextRoute);

      requestAnimationFrame(() => {
        if (nextRoute !== 'home') {
          window.scrollTo({ top: 0, behavior: 'auto' });
          return;
        }

        if (!raw) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const anchor = document.getElementById(raw);
        if (!anchor) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((next: RouteKey) => {
    if (next === 'home') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
};

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
    <section className="relative min-h-[100svh] md:min-h-screen flex flex-col justify-center px-4 sm:px-6 overflow-hidden pt-24 sm:pt-28">
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
          <span className="bracket font-syne text-[#bfff00] text-xs sm:text-sm uppercase tracking-widest block mb-5 sm:mb-6">
            CORPORATE VISION // CORE SYSTEMS
          </span>
          <h1 className="font-hero text-5xl sm:text-6xl md:text-[12rem] leading-[0.82] md:leading-[0.8] text-white tracking-tighter mb-8 sm:mb-10">
            <GlitchText text="VOID" /><br /><GlitchText text="HORIZON" />
          </h1>
          <p className="font-hero2 text-base sm:text-xl md:text-3xl text-white/40 max-w-2xl font-medium leading-tight">
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
    <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end pointer-events-none">
      <div className={`
        w-80 md:w-96 h-[450px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col 
        shadow-[0_0_80px_rgba(255,255,255,0.1)] 
        origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none'}
      `}>
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl relative">
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
              <div className={`text-xs p-4 rounded-xl leading-relaxed max-w-[85%] whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#bfff00]/10 text-[#bfff00] border border-[#bfff00]/20 rounded-br-none' : 'text-white/70 bg-white/5 rounded-bl-none border border-white/5'}`}>
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
        <div className="p-4 bg-white/5 rounded-b-2xl border-t border-white/10">
          <div className="relative flex items-center bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus-within:border-white/40 transition-colors">
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
        className={`pointer-events-auto loader transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}`}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <mask id="clipping">
              <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
              <polygon points="25,25 75,25 50,75" fill="white"></polygon>
              <polygon points="50,25 75,75 25,75" fill="white"></polygon>
              <polygon points="35,35 65,35 50,65" fill="white"></polygon>
              <polygon points="35,35 65,35 50,65" fill="white"></polygon>
              <polygon points="35,35 65,35 50,65" fill="white"></polygon>
              <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            </mask>
          </defs>
        </svg>
        <div className="box"></div>
      </button>
    </div>
  );
};

// ==========================================
// 迁移：public/assets/elements/Home.tsx 的板块
// ==========================================
const PROJECTS = [
  {
    title: 'Lumina Studio',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    description: 'Creating digital showrooms with spatial depth through minimalist whitespace and sans-serif typography.',
    tags: ['Minimalist', 'Architecture', 'GSAP'],
  },
  {
    title: 'Nexus Dashboard',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: 'A data visualization system for fintech, transforming complex data streams into intuitive user insights.',
    tags: ['Figma', 'React', 'SaaS'],
  },
  {
    title: 'Aura Finance',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    description: 'Redefining financial management interactions with a fully immersive dark mode environment.',
    tags: ['Dark Mode', 'Vue 3', 'Finance'],
  },
];

const GalleryCard = ({ data }: { data: (typeof PROJECTS)[0] }) => (
  <motion.div
    className="w-[85vw] md:w-[380px] h-[480px] bg-white/5 backdrop-blur-sm p-3 rounded-3xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors duration-500 relative overflow-hidden"
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    <motion.div
      className="absolute top-3 left-3 right-3 rounded-2xl overflow-hidden bg-gray-900 z-0"
      variants={{ rest: { bottom: '3rem' }, hover: { bottom: '10rem' } }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        variants={{ rest: { scale: 1.0 }, hover: { scale: 1.1 } }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center"
        variants={{ rest: { opacity: 0, scale: 0.8, rotate: 45 }, hover: { opacity: 1, scale: 1, rotate: 0 } }}
      >
        <ArrowUpRight size={18} className="text-white" />
      </motion.div>
    </motion.div>

    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent">
      <div className="flex justify-between items-end mb-2 h-12 pb-1">
        <div>
          <h3 className="text-xl font-bold text-white font-artistic">{data.title}</h3>
          <span className="text-xs text-green-400 font-medium uppercase tracking-wider font-sans">{data.category}</span>
        </div>
      </div>

      <motion.div
        className="overflow-hidden"
        variants={{ rest: { height: 0, opacity: 0 }, hover: { height: 'auto', opacity: 1 } }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-gray-400 text-sm leading-relaxed pb-4 font-sans border-t border-white/10 pt-3">{data.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/10 font-sans">
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const ProjectSection = () => (
  <section className="w-full py-32 relative z-10 px-6 overflow-hidden">
    <div className="container mx-auto">
      <RevealBlock className="mb-20 text-center">
        <span className="text-green-400 text-xs tracking-[0.2em] uppercase font-sans">Selected Works</span>
        <h2 className="text-4xl md:text-5xl font-artistic text-white mt-4">
          Curating <span className="italic text-white/80">Digital Experiences</span>
        </h2>
      </RevealBlock>

      <div className="flex flex-wrap justify-center gap-8">
        {PROJECTS.map((project, index) => (
          <React.Fragment key={index}>
            <RevealBlock delay={index * 0.1}>
              <GalleryCard data={project} />
            </RevealBlock>
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

const REVIEWS = [
  {
    id: 1,
    name: 'Elara Vance',
    role: 'Senior Product Designer',
    avatar: 'EV',
    rating: 5,
    date: 'Oct 24, 2023',
    content:
      'The attention to detail is simply breathtaking. Beneath the minimalist interface lies a robust logic that makes interaction incredibly fluid.',
    tags: ['UI Design', 'UX', 'Minimalism'],
    verified: true,
  },
  {
    id: 2,
    name: 'Mark Jenkins',
    role: 'Full Stack Developer',
    avatar: 'MJ',
    rating: 5,
    date: 'Nov 02, 2023',
    content: 'Impeccable code quality. The components are encapsulated with flexibility in mind. Performance optimization is top-notch.',
    tags: ['Clean Code', 'React'],
    verified: true,
  },
  {
    id: 3,
    name: 'Sarah Chen',
    role: 'Creative Director',
    avatar: 'SC',
    rating: 4,
    date: 'Nov 15, 2023',
    content:
      'A completely new visual language. It breaks the traditional card layout, redefining information display with fluidity and micro-interactions.',
    tags: ['Visuals', 'Creative'],
    verified: true,
  },
  {
    id: 4,
    name: 'David Wu',
    role: 'SaaS Founder',
    avatar: 'DW',
    rating: 5,
    date: 'Dec 01, 2023',
    content: "The design exudes a premium feel that elevated our brand image instantly. It's not just a card; it's a conversion booster.",
    tags: ['Branding', 'Premium'],
    verified: true,
  },
];

const ReviewText = ({ text }: { text: string }) => (
  <p className="text-gray-800/90 text-center leading-loose font-artistic text-lg tracking-wide select-none">{text}</p>
);

const ReviewCard = ({ data, index, activeIndex, total, onNext, onPrev }: any) => {
  let offset = (index - activeIndex + total) % total;
  if (offset === total - 1) offset = -1;

  const isVisible = offset >= -1 && offset <= 2;
  const isActive = offset === 0;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-5, 5]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) onNext();
    else if (info.offset.x > 100) onPrev();
  };

  const targetX = offset === -1 ? -500 : 0;

  if (!isVisible) return null;

  return (
    <motion.div
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{
        x,
        rotate: isActive ? rotate : 0,
        zIndex: offset === -1 ? 0 : 30 - offset,
        transformOrigin: 'top center',
        cursor: isActive ? 'grab' : 'pointer',
        willChange: 'transform, opacity',
      }}
      initial={false}
      animate={{
        x: isActive ? 0 : targetX,
        top: offset <= 0 ? 0 : offset * 35,
        scale: offset === -1 ? 0.9 : 1 - offset * 0.06,
        opacity: offset === -1 ? 0 : 1 - offset * 0.15,
        rotateX: offset <= 0 ? 0 : -10,
        y: offset === -1 ? 50 : 0,
        filter: isActive ? 'blur(0px)' : `blur(${Math.min(offset * 2, 4)}px) brightness(0.8)`,
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 25, mass: 1 }}
      onClick={() => {
        if (!isActive) {
          if (offset > 0) onNext();
          else if (offset < 0) onPrev();
        }
      }}
      className="absolute top-0 w-full max-w-[340px] perspective-1000"
    >
      <div
        className={`relative overflow-hidden rounded-[2rem] border p-8 flex flex-col items-center text-center h-auto min-h-[480px] transition-colors duration-500 ${
          isActive
            ? 'bg-white/95 border-white/40 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]'
            : 'bg-white/40 border-white/10 shadow-none'
        }`}
      >
        <div className={`absolute inset-0 z-[-1] transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-green-100 rounded-full blur-[80px] mix-blend-overlay opacity-60" />
        </div>

        <div className="absolute top-0 w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent opacity-30" />

        <div className={`relative mb-6 z-10 transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-90'}`}>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-[#e2e2e5] flex items-center justify-center text-gray-700 font-artistic text-xl italic font-bold shadow-[inset_0_1px_2px_rgba(255,255,255,1)] border border-white">
            {data.avatar}
          </div>
          {data.verified && (
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-100">
              <CheckCircle2 size={16} className="text-gray-900" fill="#fff" />
            </div>
          )}
        </div>

        <div className="flex gap-1 mb-6 z-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={`${i < data.rating ? 'fill-gray-900 text-gray-900' : 'fill-gray-300 text-gray-300'}`} />
          ))}
        </div>

        <div className="relative mb-8 flex-grow flex items-center w-full z-10 px-1">
          <Quote className="absolute -top-4 -left-1 text-gray-300 w-8 h-8 opacity-60 transform -scale-x-100" />
          <div className="min-h-[140px] flex items-center w-full justify-center">
            <ReviewText text={data.content} />
          </div>
          <Quote className="absolute -bottom-4 -right-1 text-gray-300 w-8 h-8 opacity-60" />
        </div>

        <div className="w-full pt-6 border-t border-gray-200/50 flex flex-col items-center gap-4 z-10">
          <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'}`}>
            <h3 className="font-bold text-gray-900 text-lg font-sans">{data.name}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium font-sans">{data.role}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {data.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100/50 border border-gray-200/50 rounded-full text-[10px] text-gray-600 font-medium font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 text-[10px] text-gray-300 font-mono z-10">{data.date}</div>
      </div>
    </motion.div>
  );
};

const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextReview = useCallback(() => setActiveIndex((p: number) => (p + 1) % REVIEWS.length), []);
  const prevReview = useCallback(() => setActiveIndex((p: number) => (p - 1 + REVIEWS.length) % REVIEWS.length), []);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [nextReview, isHovering]);

  return (
    <section className="w-full py-32 relative z-10">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <RevealBlock className="mb-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-green-500/50" />
            <span className="text-green-400 text-xs tracking-[0.2em] uppercase font-sans">Testimonials</span>
            <span className="w-8 h-[1px] bg-green-500/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-artistic text-white mb-6">
            Voices from our <br />
            <span className="italic text-white/80">valued partners.</span>
          </h2>
          <p className="text-gray-400 font-sans leading-relaxed">Discover how our design philosophy impacts businesses and users alike.</p>
        </RevealBlock>

        <div
          className="relative flex items-center justify-center w-full max-w-6xl gap-4 md:gap-20"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button
            onClick={prevReview}
            className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white transition-colors z-40 hover:bg-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full max-w-[340px] h-[580px] flex justify-center perspective-1000">
            {REVIEWS.map((review, index) => (
              <ReviewCard
                key={review.id}
                data={review}
                index={index}
                activeIndex={activeIndex}
                total={REVIEWS.length}
                onNext={nextReview}
                onPrev={prevReview}
              />
            ))}
            <div className="absolute -bottom-10 flex items-center gap-2 text-white/30 text-xs font-medium md:hidden">
              <Hand size={14} className="animate-pulse" />
              <span className="font-sans tracking-widest uppercase">Swipe</span>
            </div>
          </div>

          <button
            onClick={nextReview}
            className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white transition-colors z-40 hover:bg-white/10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex gap-3 mt-6 z-40">
          {REVIEWS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative h-[2px] transition-all duration-500 overflow-hidden bg-white/20"
              style={{ width: activeIndex === index ? '32px' : '12px' }}
            >
              {activeIndex === index && <motion.div layoutId="progress-bar" className="absolute inset-0 bg-white" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const InputField = ({ label, type = 'text', placeholder, isTextArea = false, value, onChange, name }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group mb-8">
      <label className={`block text-xs uppercase tracking-widest mb-2 transition-colors duration-300 ${isFocused ? 'text-green-400' : 'text-gray-500'}`}>
        {label}
      </label>

      {isTextArea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-400 transition-colors duration-500 font-sans text-lg tracking-wide resize-none leading-relaxed"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-white/20 py-2 text-white placeholder-white/20 focus:outline-none focus:border-green-400 transition-colors duration-500 font-sans text-lg tracking-wide"
        />
      )}

      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: isFocused ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 h-[1px] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
      />
    </div>
  );
};

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'failed' | 'exception'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formStatus === 'error' || formStatus === 'failed') setFormStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 2000);
      return;
    }

    setFormStatus('submitting');

    try {
      const message = `New contact form submission:\nName: ${formData.name}\nEmail: ${formData.email}\nRequirement: ${formData.message}`;

      const response = await fetch('https://ntfy.sh/weidu-studio-alerts', {
        method: 'POST',
        headers: {
          Title: 'Void Horizon - New Contact Form',
          Priority: 'high',
          Tags: 'email',
        },
        body: message,
      });

      if (!response.ok) {
        setFormStatus('failed');
        setTimeout(() => setFormStatus('idle'), 3000);
        return;
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('exception');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const getButtonBgColor = () => {
    switch (formStatus) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'failed':
        return 'bg-yellow-500 text-black';
      case 'exception':
        return 'bg-red-600 text-white';
      default:
        return 'bg-white text-black';
    }
  };

  const socialLinks = [
    { name: 'Threads', icon: <ThreadsIcon className="w-4 h-4" />, url: '#' },
    { name: 'LinkedIn', icon: <Linkedin size={14} />, url: '#' },
    { name: 'Github', icon: <Github size={14} />, url: '#' },
  ];

  return (
    <section className="w-full py-32 relative z-10 overflow-hidden" id="contact">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          <div className="lg:w-5/12 pt-10">
            <RevealBlock delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-green-500/50"></span>
                <span className="text-green-400 text-xs tracking-[0.2em] uppercase font-sans">Contact Us</span>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.3}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-artistic text-white leading-[1.1] mb-12">
                Let's start a <br />
                <span className="italic text-white">
                  <MarkerHighlight delay={0.8} color="#92D95F">
                    conversation.
                  </MarkerHighlight>
                </span>
              </h2>
            </RevealBlock>

            <RevealBlock delay={0.5} className="space-y-10">
              <div className="group cursor-pointer">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-sans">General Enquiries</p>
                <div className="flex items-center gap-4">
                  <Mail className="text-green-400 w-5 h-5" />
                  <span className="text-2xl font-artistic text-white group-hover:text-green-300 transition-colors">Noah@voidhorizon.online</span>
                </div>
              </div>

              <div className="group cursor-pointer">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-sans">Visit Our Studio</p>
                <div className="flex items-start gap-4">
                  <MapPin className="text-green-400 w-5 h-5 mt-1 min-w-[20px]" />
                  <span className="text-xl font-artistic text-white/80 leading-relaxed group-hover:text-white transition-colors">
                    Juntai Building, Tianshan District,
                    <br />
                    Urumqi, Xinjiang
                  </span>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.7} className="mt-20 flex gap-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group font-sans"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:border-green-400/50 group-hover:bg-green-400/10 transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
                </a>
              ))}
            </RevealBlock>
          </div>

          <div className="lg:w-7/12">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                <InputField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                <InputField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="john@example.com"
                />
              </div>

              <InputField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                isTextArea
                placeholder="Tell us about your vision..."
              />

              <div className="mt-12 flex justify-end">
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  animate={formStatus === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
                  transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                  whileHover={formStatus === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
                  className={`group relative z-10 isolate h-14 min-w-[180px] rounded-full overflow-hidden flex items-center justify-center gap-3 font-medium text-xs tracking-wide transition-all duration-500 cursor-pointer select-none ${getButtonBgColor()}`}
                >
                  <motion.div
                    className="flex items-center justify-center gap-3 relative z-10 pointer-events-none"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formStatus === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : formStatus === 'error' ? (
                      <>
                        <span className="text-xs">Missing Fields</span>
                        <X size={18} />
                      </>
                    ) : formStatus === 'failed' ? (
                      <>
                        <span className="text-xs">Sending Failed</span>
                        <AlertTriangle size={18} />
                      </>
                    ) : formStatus === 'exception' ? (
                      <>
                        <span className="text-xs">Sending Error</span>
                        <X size={18} />
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <span className="text-xs">We'll be in touch soon.</span>
                        <Check size={18} />
                      </>
                    ) : (
                      <>
                        <span className="text-xs">Send Message</span>
                        <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </motion.div>

                  {formStatus === 'idle' && (
                    <motion.div
                      className="absolute inset-0 bg-green-400"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const { route, navigate } = useHashRoute();

  if (route === 'web-architecture') return <WebArchitecturePage />;
  if (route === 'intelligent-agents') return <IntelligentAgentsPage />;
  if (route === 'ai-strategy') return <AIStrategyPage />;
  if (route === 'case-study') return <CaseStudyDetail />;

  return (
    <div className="relative selection:bg-[#bfff00] selection:text-black" onMouseMove={() => sounds.init()}>
      <GlobalParallaxBackground />
      <Navbar />
      <Hero />
      <Ticker />

      <section id="works" className="py-24 sm:py-32 md:py-40 relative bg-black">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/core.png" alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <ScrollRevealSection>
          <div className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
            <h2 className="font-molgan text-3xl sm:text-5xl md:text-7xl mb-3 sm:mb-4 bracket">Core Business Domains</h2>
          </div>
        </ScrollRevealSection>
        <div className="border-b border-white/5 relative z-10">
          <AnimatedProjectTitle
            title="WEB ARCHITECTURE"
            category="Digital Asset Hub // Core"
            onClick={() => navigate('web-architecture')}
          />
          <AnimatedProjectTitle
            title="INTELLIGENT AGENTS"
            category="Autonomous Systems // Neural"
            onClick={() => navigate('intelligent-agents')}
          />
          <AnimatedProjectTitle
            title="AI STRATEGY"
            category="Management Advisory // Future"
            onClick={() => navigate('ai-strategy')}
          />
        </div>
      </section>

      <main className="relative z-10">
        <ProjectSection />
        <ReviewSection />
        <ContactSection />
      </main>

      <AIConcierge />
      <BackgroundMusic />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

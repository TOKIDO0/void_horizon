import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, Map, Wrench, ShieldCheck, GraduationCap, 
  TrendingUp, ArrowRight, BarChart3, PieChart, Users, 
  Clock, Download, FileText, Video, BookOpen, Check
} from 'lucide-react';

const FontLoader = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap');
      .font-artistic { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #020602; }
      ::-webkit-scrollbar-thumb { background: #15803d; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #22c55e; }
      ::selection { background: #22c55e; color: black; }
    `}
  </style>
);

const BlurReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
);

const StaggerText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: delay } } }} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } } }} className="mr-[0.25em] inline-block">{word}</motion.span>)}
    </motion.div>
  );
};

const StrategyBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 100]);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020402]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a05] via-[#020402] to-black" />
      <motion.div style={{ y: y1 }} animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vh] bg-green-600/15 rounded-full blur-[120px] mix-blend-screen" />
      <motion.div style={{ y: y2 }} animate={{ scale: [1, 1.1, 1], x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] -right-[10%] w-[60vw] h-[70vh] bg-emerald-700/15 rounded-full blur-[100px] mix-blend-screen" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vh] bg-lime-500/10 rounded-full blur-[150px] mix-blend-screen" />
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay"><svg className='w-full h-full'><filter id='noiseFilterStrategy'><feTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilterStrategy)'/></svg></div>
    </div>
  );
};

const WaveLines = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
    <div className="w-full h-[300px] max-w-full overflow-visible relative">
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22c55e" stopOpacity="0" /><stop offset="50%" stopColor="#4ade80" stopOpacity="0.5" /><stop offset="100%" stopColor="#22c55e" stopOpacity="0" /></linearGradient>
          <path id="wavePath1" d="M0,100 C200,150 400,50 600,100 C800,150 1000,100 1000,100" />
          <path id="wavePath2" d="M0,100 C250,60 500,140 750,100 C900,80 1000,100 1000,100" />
          <path id="wavePath3" d="M0,100 C150,110 300,90 450,100 C600,110 750,90 1000,100" />
          <filter id="beam-glow"><feGaussianBlur stdDeviation="2" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <use href="#wavePath1" fill="none" stroke="url(#wave-gradient)" strokeWidth="1.5" />
        <use href="#wavePath2" fill="none" stroke="url(#wave-gradient)" strokeWidth="1" opacity="0.7" />
        <use href="#wavePath3" fill="none" stroke="url(#wave-gradient)" strokeWidth="0.5" opacity="0.5" />
        <circle r="3" fill="#ffffff" filter="url(#beam-glow)"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#wavePath1" /></animateMotion></circle>
        <circle r="2" fill="#4ade80" filter="url(#beam-glow)"><animateMotion dur="4s" repeatCount="indefinite" begin="1s"><mpath href="#wavePath2" /></animateMotion></circle>
        <circle r="1.5" fill="#86efac" filter="url(#beam-glow)"><animateMotion dur="5s" repeatCount="indefinite" begin="2s"><mpath href="#wavePath3" /></animateMotion></circle>
      </svg>
    </div>
  </div>
);

const PrimaryButton = ({ text }: { text: string }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm tracking-wide overflow-hidden">
    <span className="relative z-10 group-hover:text-green-900 transition-colors">{text}</span>
    <motion.div className="absolute inset-0 bg-green-400" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }} />
  </motion.button>
);
const SecondaryButton = ({ text }: { text: string }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-sans font-medium text-sm tracking-wide hover:bg-white/5 hover:border-green-400/50 transition-all">{text}</motion.button>
);
const Counter = ({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    let startTime: number; const duration = 2000;
    const step = (timestamp: number) => { if (!startTime) startTime = timestamp; const progress = Math.min((timestamp - startTime) / duration, 1); const ease = 1 - Math.pow(1 - progress, 4); const current = Math.floor(from + (to - from) * ease); if (nodeRef.current) { nodeRef.current.textContent = current + suffix; } if (progress < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [isInView, from, to, suffix]);
  return <span ref={nodeRef} className="font-artistic text-4xl md:text-5xl text-white">{from}{suffix}</span>;
};

const HeroSection = () => (
  <section className="relative z-10 min-h-[85vh] flex flex-col justify-center px-6 pt-20">
    <div className="container mx-auto max-w-6xl">
      <BlurReveal><div className="flex items-center gap-3 mb-8"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-green-400 text-xs tracking-[0.2em] uppercase font-sans font-medium">Strategic Transformation</span></div></BlurReveal>
      <BlurReveal delay={0.2}><h1 className="text-6xl md:text-8xl lg:text-9xl font-artistic text-white mb-8 tracking-tight leading-[0.9]">AI <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-white to-green-200">Strategy</span></h1></BlurReveal>
      <div className="flex flex-col md:flex-row gap-12 items-start justify-between mt-12">
        <BlurReveal delay={0.4} className="max-w-xl">
          <div className="text-gray-400 font-sans text-lg leading-relaxed font-light border-l border-white/10 pl-6">
            <StaggerText text="We guide organizations through AI transformation with comprehensive strategy consulting. From roadmap planning to implementation oversight, we ensure AI delivers measurable business value." delay={0.6} />
          </div>
        </BlurReveal>
        <BlurReveal delay={0.6}>
           <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                  <defs>
                      <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor="#ffffff" stopOpacity="0.2" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
                      <filter id="beam-glow-hero" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  <motion.circle cx="128" cy="128" r="127.5" stroke="url(#beam-gradient)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} style={{ originX: "128px", originY: "128px", filter: "url(#beam-glow-hero)" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 {[...Array(12)].map((_, i) => <motion.div key={i} className="absolute h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent origin-left" style={{ width: '50%', left: '50%', rotate: i * 30 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0], x: ['0%', '10%'] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} />)}
              </div>
              <div className="absolute z-10 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
              <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }} className="absolute inset-1/4 bg-green-500/10 rounded-full blur-xl" />
           </div>
        </BlurReveal>
      </div>
    </div>
  </section>
);

const SERVICES = [{ icon: <ClipboardCheck />, title: "Maturity Assessment", desc: "Evaluate your organization's AI readiness and identify key opportunities.", items: ["Readiness Scorecard", "Gap Analysis"] }, { icon: <Map />, title: "Strategy Roadmap", desc: "Develop comprehensive AI adoption roadmap aligned with business goals.", items: ["3-5 Year Plan", "Resource Planning"] }, { icon: <Wrench />, title: "Technology Selection", desc: "Choose the right AI tools, platforms, and vendors for your specific needs.", items: ["Vendor Evaluation", "Build vs. Buy"] }, { icon: <ShieldCheck />, title: "Governance Framework", desc: "Establish ethical AI practices and robust compliance frameworks.", items: ["Ethics Guidelines", "Risk Management"] }, { icon: <GraduationCap />, title: "Team Enablement", desc: "Upskill your team with AI literacy and implementation training.", items: ["Custom Workshops", "Knowledge Base"] }, { icon: <TrendingUp />, title: "ROI Optimization", desc: "Track AI performance and optimize for maximum business impact.", items: ["KPI Dashboard", "Performance Metrics"] }];
const ServicesSection = () => (
  <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-6xl"><BlurReveal className="mb-20"><h2 className="text-3xl md:text-4xl font-artistic text-white">Consulting <span className="italic text-green-400">Services</span></h2></BlurReveal><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{SERVICES.map((item, i) => <React.Fragment key={i}><BlurReveal delay={i * 0.1}><motion.div className="group h-full p-8 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 rounded-3xl cursor-default relative overflow-hidden" whileHover={{ y: -5 }}><div className="absolute inset-0 pointer-events-none rounded-3xl"><div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors duration-500" /><svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"><defs><linearGradient id={`border-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#4ade80" stopOpacity="0" /><stop offset="50%" stopColor="#4ade80" stopOpacity="1" /><stop offset="100%" stopColor="#4ade80" stopOpacity="0" /></linearGradient></defs><rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="23" ry="23" fill="none" stroke={`url(#border-grad-${i})`} strokeWidth="1.5" strokeDasharray="100 1000" strokeLinecap="round" className="animate-border-beam" /></svg><style>{`.animate-border-beam { animation: borderBeam 3s linear infinite; } @keyframes borderBeam { to { stroke-dashoffset: -1100; } }`}</style></div><div className="relative z-10"><div className="mb-6 text-green-400 group-hover:text-white transition-colors">{React.cloneElement(item.icon, { size: 32, strokeWidth: 1.5 })}</div><h3 className="text-xl font-sans font-medium text-white mb-4">{item.title}</h3><p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">{item.desc}</p><ul className="space-y-2 border-t border-white/5 pt-4">{item.items.map((sub, idx) => <li key={idx} className="flex items-center text-xs text-gray-500 font-mono"><div className="w-1 h-1 bg-green-500/50 rounded-full mr-2" />{sub}</li>)}</ul></div></motion.div></BlurReveal></React.Fragment>)}</div></div></section>
);

const PROCESS = [{ phase: "Phase 01", title: "Discovery", duration: "2-4 Weeks", desc: "Business alignment & opportunity identification." }, { phase: "Phase 02", title: "Strategy Design", duration: "4-6 Weeks", desc: "Use case development & architecture planning." }, { phase: "Phase 03", title: "Pilot Implementation", duration: "8-12 Weeks", desc: "MVP development, PoC & user testing." }, { phase: "Phase 04", title: "Scale & Deploy", duration: "Ongoing", desc: "Full rollout, change management & optimization." }];
const ProcessSection = () => (
  <section className="py-32 px-6 relative z-10 bg-white/[0.01]"><div className="container mx-auto max-w-6xl"><BlurReveal className="mb-20 text-center"><h2 className="text-3xl md:text-4xl font-artistic text-white mb-4">Implementation <span className="text-green-400">Process</span></h2><p className="text-gray-500 font-sans text-sm">A structured approach to ensure success.</p></BlurReveal><div className="relative grid grid-cols-1 md:grid-cols-4 gap-4"><div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 -z-10"><WaveLines /></div>{PROCESS.map((step, i) => <React.Fragment key={i}><BlurReveal delay={i * 0.15}><div className="relative p-6 border-l border-white/10 hover:border-green-500/50 transition-colors duration-500 h-full group bg-black/40 backdrop-blur-md rounded-r-xl"><div className="text-xs font-mono text-green-500/60 mb-2">{step.phase}</div><h3 className="text-xl font-artistic text-white mb-2">{step.title}</h3><div className="text-xs font-sans text-white/40 mb-4 border border-white/10 rounded-full px-2 py-1 inline-block">{step.duration}</div><p className="text-sm text-gray-400 font-sans leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{step.desc}</p></div></BlurReveal></React.Fragment>)}</div></div></section>
);

const INDUSTRIES = [{ id: "finance", title: "Financial Services", content: "Risk management automation, fraud detection systems, robo-advisory." }, { id: "health", title: "Healthcare", content: "Diagnostic assistance, patient data analysis, drug discovery acceleration." }, { id: "retail", title: "Retail & E-commerce", content: "Personalized recommendations, inventory optimization, dynamic pricing." }, { id: "manufacturing", title: "Manufacturing", content: "Predictive maintenance, quality control, supply chain optimization." }, { id: "edtech", title: "Education", content: "Personalized learning paths, automated grading, learning analytics." }];
const IndustrySection = () => {
  const [activeId, setActiveId] = useState<string | null>("finance");
  return (
    <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-16"><div className="md:w-1/3"><BlurReveal><h2 className="text-3xl md:text-4xl font-artistic text-white mb-6">Industry <br/>Solutions</h2><p className="text-gray-400 font-sans text-sm leading-loose">We tailor our strategies to the unique challenges and opportunities of your specific sector.</p></BlurReveal></div><div className="md:w-2/3">{INDUSTRIES.map((item, i) => <React.Fragment key={item.id}><BlurReveal delay={i * 0.1}><motion.div className="border-b border-white/10 group cursor-pointer" onClick={() => setActiveId(activeId === item.id ? null : item.id)}><div className="py-6 flex justify-between items-center"><h3 className={`text-xl font-sans transition-colors duration-300 ${activeId === item.id ? 'text-green-400' : 'text-gray-400 group-hover:text-white'}`}>{item.title}</h3><motion.div animate={{ rotate: activeId === item.id ? 90 : 0 }} className="text-white/20 group-hover:text-white transition-colors"><ArrowRight size={20} /></motion.div></div><AnimatePresence>{activeId === item.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="pb-8 text-gray-500 font-sans font-light leading-relaxed pl-4 border-l border-green-500/30 ml-1">{item.content}</p></motion.div>}</AnimatePresence></motion.div></BlurReveal></React.Fragment>)}</div></div></section>
  );
};

const CaseStudySection = () => (
  <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-5xl"><BlurReveal><div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row"><div className="md:w-1/2 h-[300px] md:h-auto relative overflow-hidden group"><div className="absolute inset-0 bg-green-900/20 mix-blend-multiply z-10" /><motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" alt="Retail Case Study" className="w-full h-full object-cover" /><div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider border border-white/10">Featured Case</div></div><div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center"><h3 className="text-2xl md:text-3xl font-artistic text-white mb-6">Global Retail Transformation</h3><p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">Faced with inefficient inventory management, a global retailer partnered with us to implement AI-driven demand forecasting.</p><div className="space-y-4 mb-10"><div className="flex items-center gap-3"><Check size={16} className="text-green-400" /><span className="text-gray-300 font-mono text-xs">Inventory costs reduced by 35%</span></div><div className="flex items-center gap-3"><Check size={16} className="text-green-400" /><span className="text-gray-300 font-mono text-xs">Sales increased by 28%</span></div></div><motion.button whileHover={{ x: 5 }} className="text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2" onClick={() => { window.location.hash = 'case-study'; window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Read Full Case Study <ArrowRight size={16} /></motion.button></div></div></BlurReveal></div></section>
);

const ResourcesSection = () => {
  const resources = [{ type: "Whitepaper", title: "AI Strategy Implementation Guide", icon: <FileText /> }, { type: "Report", title: "2024 AI Trends & Insights", icon: <BarChart3 /> }, { type: "Webinar", title: "Calculating AI ROI", icon: <Video /> }, { type: "Case Study", title: "Success Stories Collection", icon: <BookOpen /> }];
  return (
    <section className="py-24 px-6 relative z-10 border-t border-white/5"><div className="container mx-auto max-w-6xl"><BlurReveal className="mb-12"><h3 className="text-2xl font-artistic text-white">Strategic <span className="text-gray-500">Resources</span></h3></BlurReveal><div className="grid grid-cols-1 md:grid-cols-4 gap-6">{resources.map((item, i) => <React.Fragment key={i}><BlurReveal delay={i * 0.1}><motion.div className="group p-6 bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-colors rounded-xl cursor-pointer" whileHover={{ y: -5 }}><div className="flex justify-between items-start mb-8"><div className="text-gray-500 group-hover:text-green-400 transition-colors">{item.icon}</div><button type="button" className="vh-download-btn" aria-label="Download"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="vh-download-svgIcon"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg><span className="vh-download-icon2"></span></button></div><div className="text-[10px] text-green-500/60 uppercase tracking-widest mb-2">{item.type}</div><h4 className="text-white font-sans font-medium text-sm leading-snug">{item.title}</h4></motion.div></BlurReveal></React.Fragment>)}</div></div><style>{`
      .vh-download-btn{width:40px;height:40px;border:2px solid rgb(214,214,214);border-radius:12px;background-color:rgb(255,255,255);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;position:relative;transition-duration:.3s;box-shadow:2px 2px 10px rgba(0,0,0,.11)}
      .vh-download-svgIcon{fill:rgb(70,70,70)}
      .vh-download-icon2{width:14px;height:4px;border-bottom:2px solid rgb(70,70,70);border-left:2px solid rgb(70,70,70);border-right:2px solid rgb(70,70,70)}
      .vh-download-btn:hover{background-color:rgb(51,51,51);transition-duration:.3s}
      .vh-download-btn:hover .vh-download-icon2{border-bottom:2px solid rgb(235,235,235);border-left:2px solid rgb(235,235,235);border-right:2px solid rgb(235,235,235)}
      @keyframes vh-slide-in-top{0%{transform:translateY(-10px);opacity:0}100%{transform:translateY(0);opacity:1}}
    `}</style></section>
  );
};

const MetricsSection = () => (
  <section className="py-32 px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <BlurReveal className="mb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-artistic text-white mb-4">
          Key <span className="text-green-400">Metrics</span>
        </h2>
        <p className="text-gray-500 font-sans text-sm">
          Track your progress with our customizable dashboard.
        </p>
      </BlurReveal>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <Counter from={0} to={100} suffix="%" />
          <h4 className="text-white font-sans font-medium text-sm leading-snug">
            AI Adoption Rate
          </h4>
        </div>
        <div className="flex flex-col items-center">
          <Counter from={0} to={50} suffix="%" />
          <h4 className="text-white font-sans font-medium text-sm leading-snug">
            Cost Savings
          </h4>
        </div>
        <div className="flex flex-col items-center">
          <Counter from={0} to={200} suffix="%" />
          <h4 className="text-white font-sans font-medium text-sm leading-snug">
            Revenue Growth
          </h4>
        </div>
        <div className="flex flex-col items-center">
          <Counter from={0} to={500} suffix="%" />
          <h4 className="text-white font-sans font-medium text-sm leading-snug">
            Customer Satisfaction
          </h4>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <BlurReveal className="mb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-artistic text-white mb-4">
          Get <span className="text-green-400">Started</span>
        </h2>
        <p className="text-gray-500 font-sans text-sm">
          Transform your business with our AI strategy consulting services.
        </p>
      </BlurReveal>
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm tracking-wide overflow-hidden"
          onClick={() => {
            window.location.hash = 'contact';
          }}
        >
          <span className="relative z-10 group-hover:text-green-900 transition-colors">Contact Us</span>
          <motion.div className="absolute inset-0 bg-green-400" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }} />
        </motion.button>
      </div>
    </div>
  </section>
);

const App = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="w-full bg-[#020402] min-h-screen text-white font-sans overflow-x-hidden selection:bg-green-900 selection:text-white">
      <FontLoader />
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#020402]/60 backdrop-blur-[2px] border-b border-white/5">
        <a
          href="#"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/assets/logo/void_horizon.svg"
            alt="Void Horizon"
            className="h-8 brightness-0 invert"
          />
        </a>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-400 font-sans">
          <a
            href="#"
            className="hover:text-green-400 transition-colors"
          >
            Services
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
          >
            Process
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
          >
            Cases
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
      <StrategyBackground />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/10 to-transparent my-10 opacity-30" />
        <ProcessSection />
        <IndustrySection />
        <MetricsSection />
        <CaseStudySection />
        <ResourcesSection />
        <CTASection />
      </main>
      <footer className="w-full py-12 border-t border-white/5 text-center text-gray-600 text-xs font-sans tracking-widest uppercase relative z-10">
        2024 Void Horizon. Strategy Division.
      </footer>
    </div>
  );
};

export default App;
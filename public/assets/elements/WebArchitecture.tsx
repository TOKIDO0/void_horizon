import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Server, Cloud, Zap, ShoppingCart, Code, 
  Database, Globe, ArrowRight, CheckCircle2, Layers, 
  Cpu, Shield, GitBranch, BarChart
} from 'lucide-react';

const Header = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#000510]/60 backdrop-blur-[2px] border-b border-white/5">
    <a
      href="#"
      className="flex items-center"
      onClick={(e) => {
        e.preventDefault();
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <img src="/assets/logo/void_horizon.svg" alt="Void Horizon" className="h-8 brightness-0 invert" />
    </a>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-400 font-sans">
      <a href="#" className="hover:text-green-400 transition-colors">Services</a>
      <a href="#" className="hover:text-white transition-colors">Stack</a>
      <a href="#" className="hover:text-white transition-colors">Process</a>
      <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
    </div>
  </nav>
);

const FontLoader = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
      .font-artistic { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #020617; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #334155; }
    `}
  </style>
);

const ForestRayBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000510]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#05100a] via-[#020604] to-[#000000]" />
    <div className="absolute inset-0 flex justify-center overflow-hidden">
      <motion.div animate={{ rotate: [-15, -10, -15], opacity: [0.4, 0.7, 0.4], scaleX: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] left-[20%] w-[150px] h-[140vh] bg-gradient-to-b from-green-400/20 via-green-600/5 to-transparent blur-[30px] origin-top" style={{ transformOrigin: '50% 0%' }} />
      <motion.div animate={{ rotate: [15, 10, 15], opacity: [0.3, 0.6, 0.3], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -top-[10%] right-[25%] w-[200px] h-[140vh] bg-gradient-to-b from-emerald-400/20 via-emerald-600/5 to-transparent blur-[40px] origin-top" style={{ transformOrigin: '50% 0%' }} />
      <motion.div animate={{ scaleX: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[150vh] bg-gradient-to-b from-lime-500/10 via-green-900/5 to-transparent blur-[60px]" />
      <motion.div animate={{ rotate: [-5, 5, -5], opacity: [0, 0.3, 0], x: [-50, 50, -50] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] left-1/3 w-[2px] h-[120vh] bg-green-100/10 blur-[2px] origin-top" />
    </div>
    <motion.div animate={{ y: [-20, 20, -20], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-green-500/10 to-transparent blur-[80px]" />
    {[...Array(15)].map((_, i) => (
      <motion.div key={i} className="absolute bg-green-100/30 rounded-full" style={{ width: Math.random() * 3 + 1 + "px", height: Math.random() * 3 + 1 + "px", left: Math.random() * 100 + "%", top: Math.random() * 100 + "%" }} animate={{ y: [0, -100, 0], x: [0, Math.random() * 50 - 25, 0], opacity: [0, 0.8, 0] }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }} />
    ))}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
       <svg className='w-full h-full'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.7' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>
    </div>
  </div>
);

const RevealBlock = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
);

const MarkerHighlight = ({ children, delay = 0, color = "#92D95F" }: { children: React.ReactNode; delay?: number; color?: string }) => (
  <span className="relative inline-block px-2">
    <motion.span initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ delay, duration: 0.8, ease: "easeInOut" }} className="absolute top-1/2 left-0 h-[0.6em] -z-10 -translate-y-1/2 -rotate-1 rounded-sm mix-blend-screen opacity-70" style={{ marginTop: '0.1em', backgroundColor: color, boxShadow: `0 0 15px ${color}40` }} />
    <span className="relative z-10">{children}</span>
  </span>
);

const HeroSection = () => (
  <section className="relative z-10 min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-20">
    <RevealBlock><div className="flex items-center justify-center gap-3 mb-6"><span className="w-12 h-[1px] bg-green-500/50" /><span className="text-green-400 text-xs tracking-[0.3em] uppercase font-sans font-medium">Core Expertise</span><span className="w-12 h-[1px] bg-green-500/50" /></div></RevealBlock>
    <RevealBlock delay={0.2}><h1 className="text-5xl md:text-7xl lg:text-8xl font-artistic text-white mb-8 tracking-tight">Web <span className="italic text-white/90">Architecture</span></h1></RevealBlock>
    <RevealBlock delay={0.4} className="max-w-2xl"><p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed font-light">Building <span className="text-white font-normal">digital foundations</span> that scale. We combine cutting-edge technology with elegant design to craft high-performance systems that grow with your business.</p></RevealBlock>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 1, duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"><ArrowRight className="rotate-90 w-6 h-6" /></motion.div>
  </section>
);

const SERVICES = [{ icon: <Monitor size={24} />, title: "Responsive Design", desc: "Mobile-first approach ensuring seamless experiences across all devices and screen sizes.", tags: ["HTML5", "TailwindCSS", "Fluid UI"] }, { icon: <Code size={24} />, title: "Frontend Development", desc: "Modern JavaScript frameworks for dynamic, high-performance interactive applications.", tags: ["React", "Next.js", "TypeScript"] }, { icon: <Server size={24} />, title: "Backend Architecture", desc: "Scalable server-side solutions with robust API design and secure data handling.", tags: ["Node.js", "PostgreSQL", "GraphQL"] }, { icon: <Cloud size={24} />, title: "Cloud & DevOps", desc: "Automated deployment pipelines and resilient cloud infrastructure management.", tags: ["AWS", "Docker", "CI/CD"] }, { icon: <Zap size={24} />, title: "Performance Optimization", desc: "Advanced techniques for lightning-fast load times and optimal Core Web Vitals.", tags: ["Lighthouse", "CDN", "Caching"] }, { icon: <ShoppingCart size={24} />, title: "E-Commerce Solutions", desc: "Complete online store systems with secure payment integration and inventory management.", tags: ["Shopify", "Stripe", "Headless"] }];
const ServiceCard = ({ item, index }: any) => (
  <motion.div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500" whileHover={{ y: -5 }}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-green-400/20 transition-colors duration-500" />
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 group-hover:border-green-500/30 transition-all duration-500">{item.icon}</div>
      <h3 className="text-xl font-artistic text-white mb-3 group-hover:text-green-300 transition-colors">{item.title}</h3>
      <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">{item.desc}</p>
      <div className="flex flex-wrap gap-2">{item.tags.map((tag: string) => <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 font-sans bg-white/5 px-2 py-1 rounded border border-white/5">{tag}</span>)}</div>
    </div>
  </motion.div>
);
const ServicesSection = () => (
  <section className="py-20 px-6 relative z-10"><div className="container mx-auto max-w-6xl"><RevealBlock className="mb-16"><h2 className="text-3xl md:text-4xl font-artistic text-white mb-4">Our <span className="italic text-gray-400">Capabilities</span></h2></RevealBlock><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{SERVICES.map((service, index) => (<React.Fragment key={index}><RevealBlock delay={index * 0.1}><ServiceCard item={service} index={index} /></RevealBlock></React.Fragment>))}</div></div></section>
);

const TECH_STACK = [{ name: "React", type: "Frontend" }, { name: "Next.js", type: "Frontend" }, { name: "Vue", type: "Frontend" }, { name: "Node.js", type: "Backend" }, { name: "Python", type: "Backend" }, { name: "Go", type: "Backend" }, { name: "PostgreSQL", type: "Data" }, { name: "Redis", type: "Data" }, { name: "Mongo", type: "Data" }, { name: "AWS", type: "Cloud" }, { name: "Vercel", type: "Cloud" }, { name: "Docker", type: "Cloud" }];

// 新增：蜿蜒连接线与流动光束组件
const TechSnakeBeam = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        <defs>
          <filter id="beam-glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
          {/* 定义路径：S型连接所有网格中心 (4列3行) */}
          <path id="snakePath" d="
            M 50 50 
            H 350 
            C 400 50, 400 150, 350 150 
            H 50 
            C 0 150, 0 250, 50 250 
            H 350" 
          />
        </defs>
        
        {/* 背景线条 */}
        <path d="M 50 50 H 350 C 400 50, 400 150, 350 150 H 50 C 0 150, 0 250, 50 250 H 350" fill="none" stroke="url(#line-gradient)" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4" />
        
        {/* 流动的光束 Beam */}
        <circle r="2" fill="#fff" filter="url(#beam-glow)">
          <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#snakePath" />
          </animateMotion>
        </circle>
        <circle r="4" fill="#4ade80" opacity="0.4" filter="url(#beam-glow)">
          <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#snakePath" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
};

const TechStackSection = () => (
  <section className="py-32 px-6 relative z-10 border-y border-white/5 bg-white/[0.01]">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-16">
      <div className="md:w-1/3">
        <RevealBlock><h2 className="text-3xl md:text-4xl font-artistic text-white mb-6">The <span className="text-green-400">Technology</span><br/>Behind the Magic</h2><p className="text-gray-400 font-sans text-sm leading-loose">We carefully select our tools to ensure scalability, security, and performance. Our stack is modern, battle-tested, and ready for enterprise scale.</p></RevealBlock>
      </div>
      {/* Modified Layout:
         1. Use 'grid' to align items perfectly for the connecting line.
         2. Added 'relative' to container for absolute positioning of SVG.
         3. Inserted TechSnakeBeam component.
      */}
      <div className="md:w-2/3 relative p-4">
        <TechSnakeBeam />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 relative z-10">
          {TECH_STACK.map((tech, i) => (
            <React.Fragment key={i}>
              <RevealBlock delay={i * 0.05}>
                <motion.div 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#4ade80" }} 
                  className="mx-auto px-6 py-3 rounded-full border border-white/10 bg-[#050505] text-gray-300 font-sans text-sm cursor-default transition-colors duration-300 backdrop-blur-md flex items-center justify-center w-max shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
                  {tech.name}
                </motion.div>
              </RevealBlock>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PROCESS_STEPS = [{ step: "01", title: "Discovery", desc: "Understanding your vision and requirements." }, { step: "02", title: "Design", desc: "Crafting intuitive UI/UX and visual systems." }, { step: "03", title: "Development", desc: "Writing clean, scalable code." }, { step: "04", title: "Testing", desc: "Rigorous QA to ensure perfection." }, { step: "05", title: "Deployment", desc: "Launching to the world securely." }, { step: "06", title: "Evolution", desc: "Continuous improvement and support." }];
const ProcessSection = () => (
  <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-4xl"><RevealBlock className="text-center mb-20"><h2 className="text-3xl md:text-4xl font-artistic text-white">How We <span className="italic text-gray-500">Build</span></h2></RevealBlock><div className="relative"><div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />{PROCESS_STEPS.map((item, index) => { const isEven = index % 2 === 0; return (<React.Fragment key={index}><RevealBlock className={`flex items-center mb-12 md:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}><div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}><div className="text-green-400 font-sans text-xs font-bold tracking-widest mb-1 opacity-80">{item.step}</div><h3 className="text-xl font-artistic text-white mb-2">{item.title}</h3><p className="text-gray-500 font-sans text-sm">{item.desc}</p></div><div className="absolute left-0 md:left-1/2 w-8 h-8 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center"><div className="w-3 h-3 bg-[#050505] border border-green-500 rounded-full z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]" /></div><div className="hidden md:block md:w-1/2" /></RevealBlock></React.Fragment>); })}</div></div></section>
);

const CTASection = () => (
  <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-4xl text-center"><RevealBlock><div className="inline-block p-1 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"><div className="px-6 py-2 bg-[#0a0a0a] rounded-full border border-white/5 text-xs text-green-400 font-sans tracking-widest uppercase">Ready to scale?</div></div><h2 className="text-5xl md:text-7xl font-artistic text-white mb-8 leading-tight">Let's build something <br/><span className="italic text-gray-500"><MarkerHighlight delay={0.5} color="#4ade80">extraordinary.</MarkerHighlight></span></h2><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-10 py-5 bg-white text-black rounded-full overflow-hidden inline-flex items-center gap-3 font-sans font-medium text-sm tracking-wide mt-8"><span className="relative z-10 group-hover:text-green-900 transition-colors">Start Your Project</span><ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-green-900" /><div className="absolute inset-0 bg-green-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" /></motion.button></RevealBlock></div></section>
);

export default function WebArchitecturePage() {
  return (
    <div className="w-full bg-[#000510] min-h-screen text-white font-sans overflow-x-hidden selection:bg-green-900 selection:text-white">
      <FontLoader />
      <Header />
      <ForestRayBackground />
      <main>
        <HeroSection />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 opacity-30" />
        <ServicesSection />
        <TechStackSection />
        <ProcessSection />
        <CTASection />
      </main>
      <footer className="w-full py-12 border-t border-white/5 text-center text-gray-600 text-xs font-sans tracking-widest uppercase relative z-10"> 2024 Void Horizon. All Rights Reserved.</footer>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Bot, TrendingUp, Eye, Star, Layers, 
  Brain, Zap, Network, Send, ArrowDown, Terminal,
  Cpu, Code2, Sparkles, Command, ChevronDown, ArrowRight,
  Database, FileText, Workflow, Mail
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
      ::-webkit-scrollbar-track { background: #050505; }
      ::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #16a34a; }
      ::selection { background: #4ade80; color: black; }
    `}
  </style>
);

const BlurReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
);

// 修复：光束与网格严格对齐
const NeuralBackground = () => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 2000], [0, 150]);
  
  // 网格大小为 80px，我们基于此生成光束位置
  const gridSize = 80;
  
  // 生成固定在网格线上的水平光束
  const horizontalBeams = [...Array(6)].map((_, i) => ({
    // 随机选择第几条网格线 (例如第 2, 5, 8 条线)
    top: Math.floor(Math.random() * 12) * gridSize, 
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 5
  }));

  // 生成固定在网格线上的垂直光束
  const verticalBeams = [...Array(8)].map((_, i) => ({
    left: Math.floor(Math.random() * 20) * gridSize,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020402]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#051008] via-[#020402] to-black" />
      <motion.div style={{ y: y2 }} animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[30%] left-0 right-0 h-[80vh] bg-gradient-to-b from-green-900/20 via-emerald-900/10 to-transparent blur-[120px]" />
      
      {/* 网格层 */}
      <div className="absolute inset-0 opacity-[0.2]">
        {/* 基础网格 */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.15 }} />
        
        {/* 水平流动光束 (严格对齐) */}
        {horizontalBeams.map((beam, i) => (
          <motion.div 
            key={`h-${i}`} 
            className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-green-400 to-transparent" 
            style={{ top: beam.top, left: '-150px' }} 
            animate={{ left: ['-150px', '100vw'] }} 
            transition={{ duration: beam.duration, repeat: Infinity, ease: "linear", delay: beam.delay, repeatDelay: Math.random() * 5 }} 
          />
        ))}
        
        {/* 垂直流动光束 (严格对齐) */}
        {verticalBeams.map((beam, i) => (
          <motion.div 
            key={`v-${i}`} 
            className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-green-400 to-transparent" 
            style={{ left: beam.left, top: '-150px' }} 
            animate={{ top: ['-150px', '100vh'] }} 
            transition={{ duration: beam.duration, repeat: Infinity, ease: "linear", delay: beam.delay, repeatDelay: Math.random() * 5 }} 
          />
        ))}
      </div>
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"><svg className='w-full h-full'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg></div>
    </div>
  );
};

const ShimmerButton = ({ text }: { text: string }) => (
  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm tracking-wide overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] transition-shadow duration-500">
    <span className="relative z-10 group-hover:text-green-900 transition-colors duration-300">{text}</span>
    <motion.div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-green-200/50 to-transparent -translate-x-[100%]" transition={{ duration: 1, ease: "easeInOut" }} style={{ transform: 'skewX(-20deg) translateX(-150%)' }} />
    <style>{`.group:hover .shimmer { animation: shimmer 1.5s infinite; } @keyframes shimmer { 0% { transform: skewX(-20deg) translateX(-150%); } 100% { transform: skewX(-20deg) translateX(150%); } }`}</style>
    <div className="shimmer absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent z-0 opacity-50" style={{ transform: 'skewX(-20deg) translateX(-150%)' }}></div>
  </motion.button>
);

const ScrambleButton = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => text.split("").map((letter, index) => { if (index < iteration) { return text[index]; } return chars[Math.floor(Math.random() * chars.length)]; }).join(""));
      if (iteration >= text.length) { clearInterval(interval); }
      iteration += 1 / 2; 
    }, 30);
  };
  return (
    <motion.button onMouseEnter={scramble} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-mono text-sm tracking-wide hover:bg-white/5 hover:border-green-400/50 hover:text-green-300 transition-colors duration-300">{displayText}</motion.button>
  );
};

const Header = () => (
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
      <img src="/assets/logo/void_horizon.svg" alt="Void Horizon" className="h-8 brightness-0 invert" />
    </a>
    <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-400 font-sans"><a href="#" className="hover:text-green-400 transition-colors">Agents</a><a href="#" className="hover:text-white transition-colors">Solutions</a><a href="#" className="hover:text-white transition-colors">Pricing</a><a href="#" className="hover:text-green-400 transition-colors">Contact</a></div>
  </nav>
);

const HeroSection = () => (
  <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
    <BlurReveal><div className="flex items-center justify-center gap-3 mb-8"><span className="w-12 h-[1px] bg-green-500/50" /><span className="text-green-400 text-xs tracking-[0.3em] uppercase font-sans font-semibold">Autonomous Systems</span><span className="w-12 h-[1px] bg-green-500/50" /></div></BlurReveal>
    <BlurReveal delay={0.2}><h1 className="text-6xl md:text-8xl font-artistic text-white mb-8 tracking-tight leading-none">Intelligent <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-white to-green-200">Agents</span></h1></BlurReveal>
    <BlurReveal delay={0.4}><p className="max-w-2xl mx-auto text-slate-400 font-sans text-lg md:text-xl leading-relaxed font-light mb-16">We engineer AI agents that don't just chat, but <span className="text-white font-medium">act</span>. Bridging the gap between cognitive models and real-world execution.</p></BlurReveal>
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}><div className="w-[30px] h-[48px] rounded-full border-2 border-green-500/50 flex justify-center p-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]"><motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-2 bg-green-400 rounded-full" /></div><div className="flex flex-col items-center gap-1"><span className="text-[10px] text-green-400/80 uppercase tracking-widest font-sans">Scroll</span><ChevronDown size={14} className="text-green-500/50 animate-bounce" /></div></motion.div>
  </section>
);

const CAPABILITIES = [{ icon: <MessageSquare />, title: "Conversational AI", desc: "Natural language processing for human-like interactions.", tags: ["GPT-4", "RAG"] }, { icon: <Bot />, title: "Intelligent Automation", desc: "Automate repetitive tasks with AI-driven workflows.", tags: ["RPA", "Python"] }, { icon: <TrendingUp />, title: "Predictive Analytics", desc: "Machine learning models for forecasting and insights.", tags: ["PyTorch", "ML"] }, { icon: <Eye />, title: "Computer Vision", desc: "Image and video analysis for automated recognition.", tags: ["OpenCV", "YOLO"] }, { icon: <Star />, title: "Recommendation Systems", desc: "Personalized content and product recommendations.", tags: ["Collaborative Filtering"] }, { icon: <Layers />, title: "Multimodal AI", desc: "Combine text, image, and audio processing.", tags: ["DALL-E", "Whisper"] }];
const AICard = ({ item, index }: any) => (
  <motion.div className="relative group p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-green-500/30 transition-all duration-500 overflow-hidden cursor-default" whileHover={{ y: -5 }}>
    <div className="relative z-10"><div className="w-12 h-12 rounded-xl bg-green-900/20 border border-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">{React.cloneElement(item.icon, { size: 24 })}</div><h3 className="text-xl font-artistic text-white mb-3">{item.title}</h3><p className="text-slate-400 font-sans text-xs leading-relaxed mb-6 min-h-[40px]">{item.desc}</p><div className="flex gap-2">{item.tags.map((tag: string) => <span key={tag} className="text-[10px] font-mono text-green-200/60 bg-green-500/5 px-2 py-1 rounded border border-green-500/10">{tag}</span>)}</div></div>
  </motion.div>
);
const CapabilitiesSection = () => (
  <section className="py-24 px-6 relative z-10"><div className="container mx-auto max-w-6xl"><BlurReveal><h2 className="text-3xl md:text-4xl font-artistic text-white mb-16 text-center">Core <span className="italic text-green-400">Capabilities</span></h2></BlurReveal><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{CAPABILITIES.map((item, i) => (<React.Fragment key={i}><BlurReveal delay={i * 0.1}><AICard item={item} /></BlurReveal></React.Fragment>))}</div></div></section>
);

const DemoSection = () => (
  <section className="py-32 px-6 relative z-10"><div className="container mx-auto max-w-6xl"><BlurReveal><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"><div className="space-y-10"><div><h2 className="text-3xl md:text-4xl font-artistic text-white mb-6">Neural <span className="text-green-400">Architecture</span></h2><p className="text-slate-400 font-sans leading-relaxed">Our agents are built on a recursive feedback loop architecture. They don't just execute; they observe, plan, act, and reflect.</p></div><div className="space-y-6">{[{ title: "Input Processing", desc: "Multimodal ingestion (Text, Voice, Image)" }, { title: "Cognitive Engine", desc: "LLM-driven reasoning & planning" }, { title: "Tool Execution", desc: "API calls & database interactions" }, { title: "Self-Correction", desc: "Output validation & iterative refinement" }].map((step, i) => <div key={i} className="flex gap-4 items-start group"><div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-green-400 group-hover:bg-green-500 group-hover:text-black transition-colors duration-300 shrink-0">0{i + 1}</div><div><h4 className="text-white font-sans font-medium text-sm">{step.title}</h4><p className="text-slate-500 text-xs">{step.desc}</p></div></div>)}</div></div><div className="relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-500/20 to-emerald-600/20 rounded-full blur-[80px] -z-10 opacity-60" /><div className="relative bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"><div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" /><div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" /><div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-white/[0.02]"><div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" /><div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" /><div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" /></div><div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Agent Online</div></div><div className="p-6 h-[320px] flex flex-col justify-end space-y-4 relative"><div className="self-start bg-white/10 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-none py-3 px-4 max-w-[85%]"><p className="text-sm text-slate-200 font-sans">Data analysis complete. I've detected a 24% increase in user engagement. Should I generate the report?</p></div><div className="self-end bg-green-600/20 backdrop-blur-md border border-green-500/30 rounded-2xl rounded-tr-none py-3 px-4 max-w-[85%]"><p className="text-sm text-green-100 font-sans">Yes, generate it and email it to the team.</p></div><div className="self-start flex gap-2 items-center"><div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Bot size={14} className="text-green-400" /></div><span className="text-xs text-slate-500 font-mono">Processing request...</span></div></div><div className="p-4 border-t border-white/10 bg-white/[0.02]"><div className="flex items-center gap-3 bg-black/20 rounded-xl px-4 py-3 border border-white/5"><Command size={16} className="text-slate-500" /><input type="text" placeholder="Ask your agent..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-600 font-sans" disabled /><div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><Send size={12} className="text-white/50" /></div></div></div></div></div></div></BlurReveal></div></section>
);

// 修改：更真实、谦虚的实验性项目 (Water Glass Style)
const MY_PROJECTS = [
  { 
    title: "Research Assistant", 
    icon: <Database className="text-green-400" />,
    desc: "A personal RAG tool that indexes my PDF library for quick semantic search.", 
    stat: "Personal Use" 
  },
  { 
    title: "Email Automator", 
    icon: <Mail className="text-green-400" />, 
    desc: "Simple script that categorizes incoming emails and drafts replies.", 
    stat: "Beta" 
  },
  { 
    title: "Daily Briefing Bot", 
    icon: <Sparkles className="text-green-400" />,
    desc: "Aggregates tech news from RSS feeds and summarizes them every morning.", 
    stat: "Active" 
  }
];

// 水玻璃卡片组件 (Water Glass Card)
const WaterGlassCard = ({ item }: { item: typeof MY_PROJECTS[0] }) => (
  <motion.div 
    // 修改：添加 h-full 和 flex flex-col 确保卡片高度撑满并保持弹性布局
    className="relative group p-8 rounded-[30px] overflow-hidden cursor-default transition-all duration-500 h-full flex flex-col"
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}
    whileHover={{ y: -5 }}
  >
    {/* 液体流动的高光层 */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-3 rounded-2xl bg-green-500/10 text-white group-hover:bg-green-500 group-hover:text-black transition-colors duration-300">
        {React.cloneElement(item.icon, { size: 24 })}
      </div>
      <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">{item.stat}</span>
    </div>
    
    <h4 className="text-xl font-artistic text-white mb-3 relative z-10">{item.title}</h4>
    {/* 修改：flex-grow 让描述区域自动填充剩余空间，保证布局整齐 */}
    <p className="text-sm text-slate-400 font-sans leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors flex-grow">
      {item.desc}
    </p>
    
    {/* 底部装饰 */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/30 via-emerald-400/30 to-green-500/30 blur-[4px]" />
  </motion.div>
);

const UseCaseSection = () => (
  <section className="py-24 px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <BlurReveal>
        <h3 className="text-3xl font-artistic text-white mb-12 text-center">My <span className="italic text-green-400">Experiments</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MY_PROJECTS.map((c, i) => (
            <React.Fragment key={i}>
              <BlurReveal delay={i * 0.1} className="h-full">
                <WaterGlassCard item={c} />
              </BlurReveal>
            </React.Fragment>
          ))}
        </div>
      </BlurReveal>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 px-6 relative z-10 text-center"><div className="container mx-auto max-w-4xl"><BlurReveal><h2 className="text-5xl md:text-6xl font-artistic text-white mb-8 leading-tight">Scale your workforce with <br/><span className="italic text-white relative inline-block px-2">Digital Intelligence<svg className="absolute top-1/2 left-0 w-full h-[0.8em] -z-10 -translate-y-1/3 overflow-visible pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none"><motion.path d="M0,5 Q50,10 100,5" fill="none" stroke="#4ade80" strokeWidth="12" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.6 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} style={{ mixBlendMode: 'screen' }} /></svg></span></h2><div className="flex flex-col md:flex-row justify-center gap-4 mt-12"><ShimmerButton text="Deploy Agents" /><ScrambleButton text="View Documentation" /></div></BlurReveal></div></section>
);

export default function IntelligentAgentsPage() {
  return (
    <div className="w-full bg-[#050508] min-h-screen text-white font-sans overflow-x-hidden selection:bg-green-900 selection:text-white">
      <FontLoader />
      <Header />
      <NeuralBackground />
      <main><HeroSection /><div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 opacity-30" /><CapabilitiesSection /><DemoSection /><UseCaseSection /><CTASection /></main>
      <footer className="w-full py-12 border-t border-white/5 text-center text-slate-600 text-xs font-sans tracking-widest uppercase relative z-10">© 2024 Void Horizon. Intelligent Agents Division.</footer>
    </div>
  );
}
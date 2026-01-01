import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, BarChart3, Clock, 
  Users, TrendingUp, Quote, Share2, Download, AlertTriangle, ArrowRight, MousePointer2
} from 'lucide-react';

const HashLink = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => (
  <a
    href={to}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      window.location.hash = to.replace('#', '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  >
    {children}
  </a>
);

// ==========================================
// 0. 样式与工具
// ==========================================
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
      ::-webkit-scrollbar-thumb { background: #15803d; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #22c55e; }
      
      ::selection { background: #22c55e; color: black; }
      
      html { scroll-behavior: smooth; }
    `}
  </style>
);

// 新增：光标跟随聚光灯 (Spotlight Effect)
const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.06), transparent 40%)`
      }}
    />
  );
};

// 核心背景：动态等高线 (Dynamic Contours)
const ContourBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* 深邃底色 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050505] to-[#0a0a0a]" />
      <MouseSpotlight />
      <div className="absolute inset-0 opacity-[0.15]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="contour-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <motion.path
            d="M-100,500 Q250,300 500,500 T1100,500"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              d: [
                "M-100,500 Q250,300 500,500 T1100,500",
                "M-100,500 Q250,700 500,500 T1100,500",
                "M-100,500 Q250,300 500,500 T1100,500"
              ],
              pathLength: 1, 
              opacity: 0.5 
            }}
            transition={{ 
              d: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              pathLength: { duration: 2, ease: "easeOut" },
              opacity: { duration: 1 }
            }}
          />
          <motion.path
            d="M-100,600 Q250,400 500,600 T1100,600"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.5"
            opacity="0.3"
            animate={{ 
              d: [
                "M-100,600 Q250,400 500,600 T1100,600",
                "M-100,600 Q250,800 500,600 T1100,600",
                "M-100,600 Q250,400 500,600 T1100,600"
              ]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
           <motion.path
            d="M-100,800 Q250,600 500,800 T1100,800"
            fill="none"
            stroke="url(#contour-grad)"
            strokeWidth="0.5"
            opacity="0.2"
            animate={{ 
              d: [
                "M-100,800 Q250,600 500,800 T1100,800",
                "M-100,800 Q250,900 500,800 T1100,800",
                "M-100,800 Q250,600 500,800 T1100,800"
              ]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-green-900/10 to-transparent blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
         <svg className='w-full h-full'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#noiseFilter)'/></svg>
      </div>
    </div>
  );
};

// 顶部阅读进度条
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50 shadow-[0_0_10px_#22c55e]"
      style={{ scaleX }}
    />
  );
};

// ==========================================
// 2. 组件库
// ==========================================

// PrimaryButton 组件定义 (修复 ReferenceError)
const PrimaryButton = ({ text }: { text: string }) => (
  <motion.button 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group relative px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-sm tracking-wide overflow-hidden"
  >
    <span className="relative z-10 group-hover:text-green-900 transition-colors">{text}</span>
    <motion.div 
      className="absolute inset-0 bg-green-400"
      initial={{ x: "-100%" }}
      whileHover={{ x: "0%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    />
  </motion.button>
);

const StatBox = ({ label, value, suffix, delay = 0, trend = "up" }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-green-500/30 transition-colors"
    >
      <div className="flex justify-between items-end mb-2">
        <div className="text-4xl font-artistic text-white flex items-baseline">
          {value}<span className="text-green-400 text-2xl ml-1">{suffix}</span>
        </div>
        
        <svg width="60" height="30" viewBox="0 0 60 30" className="opacity-50 group-hover:opacity-100 transition-opacity duration-500">
          <motion.path
            d={trend === "up" ? "M0,30 Q15,25 30,15 T60,5" : "M0,5 Q15,10 30,20 T60,25"}
            fill="none"
            stroke={trend === "up" ? "#4ade80" : "#ef4444"} 
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          />
          <motion.path
            d={trend === "up" ? "M0,30 Q15,25 30,15 T60,5 V30 H0" : "M0,5 Q15,10 30,20 T60,25 V30 H0"}
            fill={trend === "up" ? "rgba(74, 222, 128, 0.1)" : "rgba(239, 68, 68, 0.1)"}
            stroke="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: delay + 0.5 }}
          />
        </svg>
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-widest font-sans group-hover:text-gray-300 transition-colors">{label}</div>
    </motion.div>
  );
};

const SectionHeading = ({ children, number }: { children: React.ReactNode, number: string }) => (
  <div className="flex items-baseline gap-4 mb-8 border-b border-white/10 pb-4">
    <span className="text-green-500 font-mono text-sm">{number}</span>
    <h2 className="text-2xl md:text-3xl font-artistic text-white">{children}</h2>
  </div>
);

const DNALine = ({ label, delay = 0 }: { label: string, delay?: number }) => {
  return (
    <div className="flex-1 mx-6 relative flex items-center justify-center h-16">
      <div className="absolute top-2 text-[10px] text-green-400 font-mono tracking-wider whitespace-nowrap z-20 bg-[#080808]/80 px-2 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
        {label}
      </div>
      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div
           animate={{ left: ["-20%", "120%"] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: delay }}
           className="absolute top-0 w-[20%] h-full bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_5px_#4ade80]"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 15 0 30 10 T 60 10' stroke='rgba(74, 222, 128, 0.6)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat-x',
             backgroundPosition: 'center'
          }}
          animate={{ backgroundPositionX: ["0px", "60px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 15 20 30 10 T 60 10' stroke='rgba(74, 222, 128, 0.6)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat-x',
             backgroundPosition: 'center'
          }}
          animate={{ backgroundPositionX: ["0px", "60px"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

const ScrollRevealParagraph = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.2, 0.4, 1, 0.4, 0.2]);

  return (
    <motion.p ref={ref} style={{ opacity }} className={`transition-opacity duration-300 ${className}`}>
      {children}
    </motion.p>
  );
};

// 架构图组件
const SolutionArchitecture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataLakeRef = useRef<HTMLDivElement>(null);
  const aiCoreRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  
  const [positions, setPositions] = useState<{x: number, y: number}[]>([]);

  const calculatePositions = () => {
    if (!containerRef.current || !dataLakeRef.current || !aiCoreRef.current || !dashboardRef.current) return;
    
    const parentRect = containerRef.current.getBoundingClientRect();
    const targets = [dataLakeRef.current, aiCoreRef.current, dashboardRef.current];
    
    const newPositions = targets.map(target => {
      const rect = target.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top + rect.height / 2 - parentRect.top
      };
    });
    
    setPositions(newPositions);
  };

  useEffect(() => {
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    const timer = setTimeout(calculatePositions, 500);
    return () => {
      window.removeEventListener('resize', calculatePositions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-pointer bg-[#080808]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1 } } }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1),transparent_70%)]" />
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
         <div className="flex items-center justify-between w-[85%] max-w-[700px]">
            
            <div ref={dataLakeRef} className="relative z-10">
              <motion.div
                 variants={{ hidden: { opacity: 0, x: -20, scale: 0.9 }, visible: { opacity: 1, x: 0, scale: 1 } }}
                 className="w-24 h-24 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center flex-col gap-2 shadow-lg shadow-black/50"
              >
                 <Share2 className="text-gray-400" />
                 <span className="text-[10px] text-gray-500">Data Lake</span>
              </motion.div>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} className="flex-1 origin-left z-0">
               <DNALine label="ETL Pipeline" delay={0} />
            </motion.div>

            <div ref={aiCoreRef} className="relative z-10">
              <motion.div
                 variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                 className="relative w-32 h-32 flex items-center justify-center"
              >
                 <div className="absolute inset-0 rounded-full">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                       <defs>
                          <linearGradient id="circle-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                             <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                             <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
                             <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                          </linearGradient>
                       </defs>
                       <motion.circle cx="50" cy="50" r="49" fill="none" stroke="url(#circle-beam)" strokeWidth="0.5" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }} />
                    </svg>
                 </div>
                 <motion.div animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                 <div className="w-32 h-32 rounded-full border border-green-500/30 bg-green-900/10 flex items-center justify-center flex-col gap-2 shadow-[0_0_30px_rgba(34,197,94,0.1)] relative z-10 backdrop-blur-sm">
                    <TrendingUp className="text-green-400" />
                    <span className="text-xs text-green-300 font-bold">AI Core</span>
                 </div>
              </motion.div>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} className="flex-1 origin-left z-0">
               <DNALine label="API" delay={1} />
            </motion.div>

            <div ref={dashboardRef} className="relative z-10">
              <motion.div
                 variants={{ hidden: { opacity: 0, x: 20, scale: 0.9 }, visible: { opacity: 1, x: 0, scale: 1 } }}
                 className="w-24 h-24 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center flex-col gap-2 shadow-lg shadow-black/50"
              >
                 <BarChart3 className="text-gray-400" />
                 <span className="text-[10px] text-gray-500">Dashboard</span>
              </motion.div>
            </div>

         </div>
      </div>
      
      {positions.length === 3 && (
        <motion.div
          className="absolute top-0 left-0 z-50 pointer-events-none"
          initial={{ x: positions[0].x, y: positions[0].y, opacity: 0 }}
          animate={{ 
              opacity: [0, 1, 1, 1, 1, 1, 0],
              x: [positions[0].x, positions[0].x, positions[1].x, positions[1].x, positions[2].x, positions[2].x, positions[0].x],
              y: [positions[0].y, positions[0].y, positions[1].y, positions[1].y, positions[2].y, positions[2].y, positions[0].y],
              scale: [1, 0.8, 1, 0.8, 1, 0.8, 1]
          }}
          transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              times: [0, 0.1, 0.33, 0.43, 0.66, 0.76, 1] 
          }}
          style={{ translateX: "-20%", translateY: "-20%" }} 
        >
          <MousePointer2 className="text-white drop-shadow-lg fill-black/50" size={28} strokeWidth={1.5} />
          
          <motion.div
             className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-green-400 opacity-0"
             animate={{ scale: [0.5, 1.5], opacity: [1, 0], borderWidth: ["2px", "0px"] }}
             transition={{ duration: 1, repeat: Infinity, repeatDelay: 7, delay: 0.8 }} 
          />
        </motion.div>
      )}
      
      <motion.div 
         variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
         className="absolute bottom-6 left-6 flex items-center gap-2 text-xs text-gray-400 font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-md"
      >
         <CheckCircle2 size={12} className="text-green-500" /> System Live
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 3. 页面内容
// ==========================================

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-green-400 text-xs font-sans tracking-widest uppercase mb-8"
      >
        <HashLink to="#ai-strategy" className="hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Strategy
        </HashLink>
        <span className="text-gray-600">/</span>
        <span>Retail Case Study</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-artistic text-white mb-8 leading-tight"
      >
        Global Retail <br/>
        <span className="italic text-gray-500">Transformation</span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-8 md:items-end justify-between border-t border-white/10 pt-8"
      >
        <p className="text-xl text-gray-300 font-sans font-light max-w-xl leading-relaxed">
          How we helped a Fortune 500 retailer reduce inventory costs by 35% and increase sales through AI-driven demand forecasting.
        </p>
        <div className="flex gap-8 text-sm font-mono text-gray-500">
          <div>
            <span className="block text-white/40 text-xs uppercase mb-1">Industry</span>
            Retail
          </div>
          <div>
            <span className="block text-white/40 text-xs uppercase mb-1">Duration</span>
            18 Months
          </div>
          <div>
            <span className="block text-white/40 text-xs uppercase mb-1">Services</span>
            AI Strategy
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Content = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-0', 'section-1', 'section-2', 'section-3'];
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
            setActiveSection(i);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative px-6 pb-32">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <h4 className="text-xs font-sans font-bold text-white uppercase tracking-widest mb-6 opacity-50">Contents</h4>
              {['The Challenge', 'Our Approach', 'Solution Architecture', 'Key Results'].map((item, i) => (
                <a 
                  key={i} 
                  href={`#section-${i}`} 
                  className={`block text-sm transition-all duration-300 font-sans py-1 border-l-2 pl-4 ${
                    activeSection === i 
                      ? 'text-green-400 border-green-500 font-medium' 
                      : 'text-gray-500 border-transparent hover:text-white hover:border-white/20'
                  }`}
                >
                  {item}
                </a>
              ))}
              <div className="pt-8 border-t border-white/5 mt-8"><button className="flex items-center gap-2 text-xs text-white hover:text-green-400 transition-colors"><Download size={14} /> Download PDF</button></div>
            </div>
          </aside>

          <article className="lg:w-3/4 space-y-24">
            <div id="section-0"><SectionHeading number="01">The Challenge</SectionHeading><div className="grid md:grid-cols-2 gap-12"><div className="prose prose-invert prose-lg font-sans font-light"><ScrollRevealParagraph className="text-gray-400">Our client, a leading global fashion retailer with over 2,000 stores, was facing a critical issue: <strong className="text-white">inventory mismanagement</strong>.</ScrollRevealParagraph><div className="h-4" /><ScrollRevealParagraph className="text-gray-400">Overstocking in some regions led to massive clearance sales and margin erosion, while popular items were consistently out of stock in high-demand areas. Traditional forecasting methods based on historical spreadsheets were no longer sufficient in a fast-moving market.</ScrollRevealParagraph></div><div className="bg-[#0a0a0a] p-8 rounded-xl border border-white/5 flex flex-col justify-center"><div className="mb-6 flex items-center gap-3 text-red-400"><AlertTriangle size={20} /><span className="text-sm font-mono uppercase">Key Pain Points</span></div><ul className="space-y-4"><li className="flex items-start gap-3 text-sm text-gray-300"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />35% excess inventory at end of season</li><li className="flex items-start gap-3 text-sm text-gray-300"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />$200M annual revenue loss due to stockouts</li><li className="flex items-start gap-3 text-sm text-gray-300"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />Siloed data across 5 regional HQs</li></ul></div></div></div>
            <div id="section-1"><SectionHeading number="02">Strategic Approach</SectionHeading><ScrollRevealParagraph className="text-gray-400 font-sans text-lg mb-12 max-w-2xl">We didn't just build a model; we reshaped their entire supply chain decision-making process. Our strategy focused on a three-phased transformation.</ScrollRevealParagraph><div className="space-y-4">{[{ phase: "Phase 1: Data Unification", desc: "Consolidated 50TB of sales, inventory, and trend data into a centralized Data Lakehouse." }, { phase: "Phase 2: Predictive Modeling", desc: "Developed custom Transformer-based models to predict SKU-level demand 12 weeks in advance." }, { phase: "Phase 3: Automated Procurement", desc: "Integrated AI outputs directly with ERP systems to automate reordering for 60% of stock." }].map((item, i) => (<motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="flex gap-6 p-6 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"><div className="text-green-500 font-mono text-sm pt-1 shrink-0">0{i+1}</div><div><h4 className="text-white font-artistic text-xl mb-2">{item.phase}</h4><p className="text-gray-500 text-sm font-sans">{item.desc}</p></div></motion.div>))}</div></div>
            <div id="section-2"><SectionHeading number="03">The Solution</SectionHeading><SolutionArchitecture /><p className="mt-4 text-xs text-gray-600 font-mono text-center">Fig 1. High-level architecture of the predictive supply chain system.</p></div>
            <div id="section-3"><SectionHeading number="04">Impact & Results</SectionHeading><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><StatBox label="Reduction in Inventory Costs" value="35" suffix="%" delay={0} trend="up" /><StatBox label="Increase in Sales Revenue" value="28" suffix="%" delay={0.2} trend="up" /><StatBox label="Improvement in Forecast Accuracy" value="94" suffix="%" delay={0.4} trend="up" /></div><motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-green-900/10 border border-green-500/20 p-10 rounded-2xl relative overflow-hidden"><Quote className="absolute top-8 left-8 text-green-500/20 w-16 h-16 transform -scale-x-100" /><blockquote className="relative z-10 text-center"><p className="text-2xl md:text-3xl font-artistic text-white mb-6 leading-relaxed">"Void Horizon didn't just give us a tool; they gave us <span className="text-green-400">foresight</span>. We can now anticipate market shifts weeks before they happen."</p><footer className="text-sm font-sans"><div className="text-white font-bold">Sarah Jenkins</div><div className="text-gray-500">CTO, Global Retail Corp</div></footer></blockquote></motion.div></div>
          </article>
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => (
  <section className="border-t border-white/10 bg-[#020202] py-24 px-6 text-center relative z-10">
    <div className="container mx-auto max-w-2xl">
      <h2 className="text-3xl font-artistic text-white mb-8">Ready to transform your business?</h2>
      <div className="flex justify-center gap-6"><PrimaryButton text="Start Your Strategy" /><button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm font-sans">Next Case Study <ArrowRight size={16} /></button></div>
    </div>
  </section>
);

export default function CaseStudyDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="w-full bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-green-900 selection:text-white">
      <FontLoader />
      <ProgressBar />
      <ContourBackground />
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <HashLink to="#" className="text-xl font-bold font-artistic tracking-wide text-white hover:text-green-400 transition-colors">VOID HORIZON</HashLink>
        <HashLink to="#ai-strategy" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"><span className="sr-only">Close</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L13 13M1 13L13 1" /></svg></HashLink>
      </nav>
      <main><Hero /><Content /><FooterCTA /></main>
      <footer className="w-full py-8 text-center text-gray-800 text-[10px] font-mono uppercase tracking-widest relative z-10">Confidential Case Study - 2024 Void Horizon</footer>
    </div>
  );
}
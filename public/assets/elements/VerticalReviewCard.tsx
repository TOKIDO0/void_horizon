import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

// 0. 引入艺术字体 (Playfair Display)
const FontLoader = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
      .font-artistic { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
    `}
  </style>
);

// 1. 数据源 (英文版)
const RAW_REVIEWS = [
  {
    id: 1,
    name: "Elara Vance",
    role: "Senior Product Designer",
    avatar: "EV",
    rating: 5,
    date: "Oct 24, 2023",
    content: "The attention to detail is simply breathtaking. Beneath the minimalist interface lies a robust logic that makes interaction incredibly fluid. The typography choices are textbook perfection.",
    tags: ["UI Design", "UX", "Minimalism"],
    verified: true
  },
  {
    id: 2,
    name: "Mark Jenkins",
    role: "Full Stack Developer",
    avatar: "MJ",
    rating: 5,
    date: "Nov 02, 2023",
    content: "Impeccable code quality. The components are encapsulated with flexibility in mind. Performance optimization for animations is top-notch, maintaining 60fps even on mobile devices.",
    tags: ["Clean Code", "Performance", "React"],
    verified: true
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Creative Director",
    avatar: "SC",
    rating: 4,
    date: "Nov 15, 2023",
    content: "A completely new visual language. It breaks the traditional card layout, redefining information display with fluidity and micro-interactions. This innovation is exactly what we needed.",
    tags: ["Visuals", "Interaction", "Creative"],
    verified: true
  },
  {
    id: 4,
    name: "David Wu",
    role: "SaaS Founder",
    avatar: "DW",
    rating: 5,
    date: "Dec 01, 2023",
    content: "The design exudes a premium feel that elevated our brand image instantly. User session duration increased significantly. It's not just a card; it's a conversion booster.",
    tags: ["Branding", "Conversion", "Premium"],
    verified: true
  }
];

// 2. 文本组件
const FluidText = ({ text, active }: { text: string, active: boolean }) => {
  if (!active) return <span className="opacity-30 blur-[2px] transition-all duration-500 font-artistic italic">{text}</span>;

  const words = text.split(" "); 
  
  return (
    <motion.div className="inline-block text-center leading-loose font-artistic text-lg tracking-wide">
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: i * 0.05 + 0.1, 
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {/* 添加空格 */}
          <span>&nbsp;</span>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

// 3. 卡片组件
const Card = ({ data, index, activeIndex, total, onNext, onPrev }: any) => {
  let offset = (index - activeIndex + total) % total;
  if (offset === total - 1) offset = -1;

  const isVisible = offset >= -1 && offset <= 2;
  const isActive = offset === 0;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-5, 5]); 

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -100) onNext();
    else if (info.offset.x > 100) onPrev();
  };

  const targetX = offset === -1 ? -500 : 0;

  if (!isVisible) return null;

  return (
    <motion.div
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{ 
        x, 
        rotate: isActive ? rotate : 0,
        zIndex: offset === -1 ? 0 : 30 - offset,
        transformOrigin: "top center", 
        cursor: isActive ? "grab" : "pointer" 
      }}
      layout
      initial={false}
      animate={{
        x: isActive ? 0 : targetX, 
        top: offset <= 0 ? 0 : offset * 35,
        scale: offset === -1 ? 0.9 : 1 - offset * 0.06,
        opacity: offset === -1 ? 0 : 1 - offset * 0.15,
        rotateX: offset <= 0 ? 0 : -10,
        y: offset === -1 ? 50 : 0,
        filter: isActive ? "blur(0px)" : `blur(${offset * 2}px) brightness(0.8)`,
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 20,
        mass: 1
      }}
      onClick={() => {
        if (!isActive) {
           if (offset > 0) onNext();
           else if (offset < 0) onPrev();
        }
      }}
      className="absolute top-0 w-full max-w-[340px] perspective-1000"
    >
        <motion.div 
          className={`
            relative overflow-hidden
            rounded-[2rem] border 
            p-8 flex flex-col items-center text-center h-auto min-h-[480px]
            transition-colors duration-500
            /* 卡片样式：纯净白，但在暗色背景下更加柔和 */
            ${isActive ? 'bg-white/95 border-white/40 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]' : 'bg-white/40 border-white/10 shadow-none'}
          `}
        >
          {/* 卡片内部高光 - 微调为淡淡的青绿色，呼应背景 */}
          <div 
             className={`absolute inset-0 z-[-1] overflow-hidden pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-30' : 'opacity-0'}`}
          >
            <motion.div 
              className="absolute w-64 h-64 bg-green-100 rounded-full blur-[80px] mix-blend-overlay"
              animate={{
                x: [-30, 80, -30],
                y: [-30, 30, -30],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: index * 2 }}
              style={{ top: -80, left: -50 }}
            />
          </div>

          <div className="absolute top-0 w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent opacity-30" />

          {/* 头像 */}
          <motion.div 
            layout
            className="relative mb-6 z-10"
            animate={{ scale: isActive ? [1, 1.03, 1] : 0.9 }}
            transition={{ scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-[#e2e2e5] flex items-center justify-center text-gray-700 font-artistic text-xl italic font-bold shadow-[inset_0_1px_2px_rgba(255,255,255,1)] border border-white">
              {data.avatar}
            </div>
            {data.verified && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-100"
              >
                <CheckCircle2 size={16} className="text-gray-900" fill="#fff" />
              </motion.div>
            )}
          </motion.div>

          {/* 星级 */}
          <div className="flex gap-1 mb-6 z-10">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                size={14} 
                className={`${i < data.rating ? "fill-gray-900 text-gray-900" : "fill-gray-300 text-gray-300"}`} 
              />
            ))}
          </div>

          {/* 评价内容 */}
          <div className="relative mb-8 flex-grow flex items-center w-full z-10 px-1">
            <motion.div
               animate={{ y: isActive ? [0, -3, 0] : 0 }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-4 -left-1"
            >
              <Quote className="text-gray-300 w-8 h-8 opacity-60 transform -scale-x-100" />
            </motion.div>
            
            <div className="text-gray-800/90 min-h-[140px] flex items-center w-full justify-center select-none">
              <FluidText text={data.content} active={isActive} />
            </div>
            
            <motion.div
               animate={{ y: isActive ? [0, 3, 0] : 0 }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-4 -right-1"
            >
              <Quote className="text-gray-300 w-8 h-8 opacity-60" />
            </motion.div>
          </div>

          {/* 用户信息 */}
          <div className="w-full pt-6 border-t border-gray-200/50 flex flex-col items-center gap-4 z-10">
            <motion.div animate={{ y: isActive ? 0 : 5, opacity: isActive ? 1 : 0.8 }}>
              <h3 className="font-bold text-gray-900 text-lg font-sans">{data.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-medium font-sans">{data.role}</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100/50 border border-gray-200/50 rounded-full text-[10px] text-gray-600 font-medium backdrop-blur-sm font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-4 text-[10px] text-gray-300 font-mono z-10">
            {data.date}
          </div>
        </motion.div>
    </motion.div>
  );
};

// 4. 主组件
export default function ReviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextReview = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % RAW_REVIEWS.length);
  }, []);

  const prevReview = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + RAW_REVIEWS.length) % RAW_REVIEWS.length);
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(nextReview, 5000); 
    return () => clearInterval(timer);
  }, [nextReview, isHovering]);

  return (
    <div className="w-full bg-[#050505] flex flex-col items-center justify-center py-32 font-sans overflow-hidden relative selection:bg-green-100 selection:text-green-900">
      <FontLoader />

      {/* 增强版背景：亮绿色极光主题 (Bright Green Aurora) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* 基础环境光 - 淡淡的深绿 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,80,40,0.15),transparent_70%)]" />

        {/* 主光 - 顶部投下的亮绿光 (Lime/Green) */}
        <motion.div 
           animate={{ 
             opacity: [0.4, 0.6, 0.4], 
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/30 rounded-full blur-[120px]"
        />

        {/* 辅光 - 底部流动的翠绿光 (Emerald) */}
        <motion.div 
           animate={{ 
             x: [0, -30, 0],
             opacity: [0.3, 0.5, 0.3], 
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-emerald-600/30 rounded-full blur-[100px]"
        />

        {/* 辅光 - 右侧的荧光绿反光 (Lime) */}
        <motion.div 
           animate={{ 
             y: [0, 50, 0],
             opacity: [0.2, 0.4, 0.2],
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 right-0 w-[500px] h-[600px] bg-lime-400/20 rounded-full blur-[120px]"
        />

        {/* 新增光球 1 - 左上角游动的亮光 */}
        <motion.div 
           animate={{ 
             x: [0, 100, 0],
             y: [0, 50, 0],
             opacity: [0.3, 0.6, 0.3],
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-green-400/25 rounded-full blur-[80px]"
        />

        {/* 新增光球 2 - 右下角互动的光斑 */}
        <motion.div 
           animate={{ 
             x: [0, -80, 0],
             scale: [1, 1.2, 1],
             opacity: [0.3, 0.5, 0.3],
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-emerald-400/20 rounded-full blur-[90px]"
        />
      </div>

      <div 
        className="relative flex items-center justify-center w-full max-w-6xl gap-4 md:gap-20"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* 导航按钮 */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={prevReview}
          className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white transition-colors z-40 group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        {/* 核心堆叠容器 */}
        <div className="relative w-full max-w-[340px] h-[580px] flex justify-center perspective-1000">
            {RAW_REVIEWS.map((review, index) => (
              <Card 
                key={review.id}
                data={review}
                index={index}
                activeIndex={activeIndex}
                total={RAW_REVIEWS.length}
                onNext={nextReview}
                onPrev={prevReview}
              />
            ))}

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 0.8 }}
               className="absolute -bottom-10 flex items-center gap-2 text-white/30 text-xs font-medium md:hidden"
            >
               <Hand size={14} className="animate-pulse" />
               <span className="font-sans tracking-widest uppercase text-[10px]">Swipe</span>
            </motion.div>
        </div>

        {/* 导航按钮 */}
        <motion.button
          whileHover={{ scale: 1.1, x: 5, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={nextReview}
          className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center text-white/60 hover:text-white transition-colors z-40 group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.button>

      </div>

      {/* 底部进度条 */}
      <div className="flex gap-3 mt-6 z-40">
        {RAW_REVIEWS.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative h-[2px] transition-all duration-500 overflow-hidden bg-white/20"
            style={{ 
              width: activeIndex === index ? "32px" : "12px",
            }}
          >
            {activeIndex === index && (
                <motion.div 
                    layoutId="progress-bar"
                    className="absolute inset-0 bg-white" 
                />
            )}
          </button>
        ))}
      </div>

    </div>
  );
}
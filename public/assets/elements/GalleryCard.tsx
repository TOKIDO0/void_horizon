import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECT_DATA = {
  title: "Lumina 建筑工作室",
  category: "Web Design",
  // 选用了一张构图干净的网页设计图
  image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  description: "通过极简的留白与非衬线字体的搭配，构建出具有空间感的数字展厅。我们专注于光影在网页浏览过程中的流动感。",
  tags: ["Minimalist", "Architecture", "GSAP"]
};

// 复用你喜欢的：模糊渐显文字组件
const BlurRevealText = ({ text }: { text: string }) => {
  const characters = Array.from(text);
  return (
    <motion.div 
      className="text-gray-500 text-sm leading-relaxed"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.015, delayChildren: 0.1 } }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 5, filter: "blur(4px)" },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              transition: { duration: 0.4 } 
            }
          }}
          className="inline-block relative"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function GalleryCard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
      
      <motion.div 
        // 修改了 shadow 类：默认阴影更清晰，Hover 时阴影更深邃且扩散范围更大
        className="w-full max-w-[380px] bg-white p-3 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] transition-shadow duration-500 cursor-pointer border border-gray-100 group"
        initial="rest"
        whileHover="hover"
        animate="rest"
        layout // 开启布局动画，让高度变化丝般顺滑
      >
        
        {/* 1. 图片容器 - 核心动画区 */}
        <motion.div 
          layout // 参与布局变化
          className="relative w-full rounded-2xl overflow-hidden bg-gray-100"
          variants={{
            rest: { height: 420 }, // 默认高度较高，展示更多图片
            hover: { height: 320 } // Hover时高度收缩，给文字腾出空间
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} // 类似 Apple 的平滑曲线
        >
           <motion.img 
             layoutId="main-image"
             src={PROJECT_DATA.image} 
             alt="Project"
             className="w-full h-full object-cover"
             variants={{
               rest: { scale: 1.0 },
               hover: { scale: 1.1 } // 图片微放大，抵消容器缩小的视觉落差
             }}
             transition={{ duration: 0.6 }}
           />
           
           {/* 右上角箭头 - 仅在Hover时出现 */}
           <motion.div
             className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10"
             variants={{
                rest: { opacity: 0, scale: 0.8, rotate: 45 },
                hover: { opacity: 1, scale: 1, rotate: 0 }
             }}
             transition={{ duration: 0.3 }}
           >
              <ArrowUpRight size={18} className="text-gray-900" />
           </motion.div>
        </motion.div>

        {/* 2. 文字内容区 */}
        <div className="px-2 pt-5 pb-2">
            
            {/* 标题行 - 始终显示 */}
            <motion.div layout className="flex justify-between items-start mb-2">
                <div>
                   <h3 className="text-xl font-bold text-gray-900">{PROJECT_DATA.title}</h3>
                   <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{PROJECT_DATA.category}</span>
                </div>
            </motion.div>

            {/* 描述与标签 - 仅在 Hover 时通过高度变化展开 */}
            <motion.div 
              layout 
              className="overflow-hidden"
              variants={{
                rest: { height: 0, opacity: 0 },
                hover: { height: "auto", opacity: 1 }
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
               <div className="pt-2 pb-4">
                  {/* 这里使用了 key 来强制每次 hover 都重新触发文字动画 */}
                  <motion.div key="description-text">
                     <BlurRevealText text={PROJECT_DATA.description} />
                  </motion.div>
               </div>

               {/* 底部标签 */}
               <div className="flex gap-2 pt-2 border-t border-gray-50">
                  {PROJECT_DATA.tags.map((tag, i) => (
                    <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                       #{tag}
                    </span>
                  ))}
               </div>
            </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
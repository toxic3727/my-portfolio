"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Palette } from 'lucide-react';

// --- 0. 폰트 설정 ---
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }
    h1, h2, h3, .display-font {
      font-family: 'Oswald', sans-serif;
    }
  `}</style>
);

// --- 1. 스마트 이미지 컴포넌트 ---
// 와이어프레임/투명 이미지를 위해 하얀색 배경(bg-white)을 적용했습니다.
const SmartImage = ({ src }: { src: string }) => {
  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        relative rounded-2xl overflow-hidden shadow-2xl border border-white/10
        bg-white 
        ${isLandscape ? 'md:col-span-2' : 'md:col-span-1'} 
      `}
    >
      <img
        src={src}
        alt="Detail"
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
        onLoad={(e) => {
          const img = e.currentTarget;
          setIsLandscape(img.naturalWidth >= img.naturalHeight);
        }}
      />
    </motion.div>
  );
};

// --- 2. 프로젝트 타입 정의 ---
interface Project {
  id: number;
  title: string;
  category: string;
  date: string;
  tools: string[];
  image: string;
  detailImages: string[];
  bgColor: string;
  description: string;
}

// --- 3. 프로젝트 데이터 (업데이트된 설명 반영) ---
const projects: Project[] = [
  {
    id: 1,
    title: "Sign Design",
    category: "Wayfinding & Branding",
    date: "2025", 
    tools: ["Ai", "Ps"], 
    image: "/si02.png", 
    detailImages: ["/si02.png", "/si03.png", "/si01.png", "/si04.png"], 
    bgColor: "bg-[#FFD700]", 
    description: "'책보냥'은 고양이의 유연한 곡선미와 책이 주는 지적인 안식을 결합한 브랜드입니다. 의성어 '냐'를 시각적 모티브로 삼아 로고타입을 설계했으며, 사용자가 공간에 진입하는 순간부터 직관적인 편안함을 느끼도록 사인 시스템을 구축했습니다."
  },
  {
    id: 2,
    title: "Fancy & Product",
    category: "Stationery Design",
    date: "2025",
    tools: ["Ai", "Ps"],
    image: "/com01.png", 
    detailImages: ["/com01.png", "/com02.png", "/com03.png"],
    bgColor: "bg-[#FFB7B7]", 
    description: "시나모롤 IP의 고유한 무드를 제품에 녹여낸 팬시 디자인 컬렉션입니다. 캐릭터의 사랑스러운 스토리텔링을 유지하면서도, 실용성을 고려한 레이아웃과 제품화에 최적화된 컬러 팔레트를 구성하여 상품성을 극대화했습니다."
  },
  {
    id: 3,
    title: "Character Design",
    category: "Brand Mascot & IP",
    date: "2025",
    tools: ["Generative AI", "Ps"], 
    image: "/ch01.jpg", 
    detailImages: ["/ch01.jpg", "/ch02.png", "/ch03.png", "/ch04.png", "/ch05.png", "/ch06.png", "/ch07.png", "/ch08.png"], 
    bgColor: "bg-[#4ECDC4]", 
    description: "'Divine Healing Persona'를 컨셉으로, 신의 축복을 시각화한 캐릭터 '아우라리아(Auraria)'입니다. 고전적인 성녀의 이미지를 현대적으로 재해석하여 황금빛 치유 에너지를 표현했으며, SD 캐릭터와 굿즈 확장을 고려한 견고한 유니버스를 설계했습니다."
  },
  {
    id: 4,
    title: "Illustration",
    category: "Digital Artwork",
    date: "2026", 
    tools: ["Procreate", "Ps"], 
    image: "/ill01.png", 
    detailImages: ["/ill01.png", "/ill02.png", "/ill03.png", "/ill04.jpg"], 
    bgColor: "bg-[#95E1D3]", 
    description: "빛과 공기의 흐름을 담아내는 테크니컬 일러스트레이션입니다. 유사 색상의 중첩 기법(Layering)으로 공간의 깊이감을 부여하고, 역광 연출과 원근감을 활용해 계절 특유의 온도와 서사를 시각적으로 구현했습니다."
  },
  {
    id: 5,
    title: "3D Modeling",
    category: "Character & Texture",
    date: "2025",
    tools: ["Blender", "Ae"], 
    image: "/3d01.png", 
    detailImages: ["/3d01.png", "/3d08.png", "/3d09.png", "/3d10.png", "/3d02.png", "/3d03.png", "/3d06.png", "/3d07.png", "/3d04.png", "/3d05.png", "/3d18.png", "/3d15.png", "/3d16.png", "/3d17.png", "/3d14.png", "/3d13.png", "/3d12.png", "/3d11.png"],
    bgColor: "bg-[#A8DADC]", 
    description: "저사양 환경 최적화를 위한 효율적인 로우폴리(Low-poly) 구조 설계와 세계관 확장을 동시에 고려한 3D 프로젝트입니다. 배경 요소와 캐릭터 간의 시각적 통일감을 유지하며 아기자기한 세계관을 입체적으로 구현했습니다."
  },
  {
    id: 6,
    title: "Poster Design",
    category: "Graphic Design",
    date: "2025",
    tools: ["InDesign", "Ps"], 
    image: "/po01.png", 
    detailImages: ["/po01.png", "/po02.png", "/po03.png", "/po04.png", "/po05.png"], 
    bgColor: "bg-[#F7D794]", 
    description: "전통과 미래, 힐링을 아우르는 그래픽 포스터 시리즈입니다. 드론의 궤적을 빛의 곡선으로 표현해 속도감을 시각화하거나, 서정적인 오브젝트 배치와 볼드한 타이포그래피의 대비를 통해 메시지 전달력을 높였습니다."
  },
  {
    id: 7,
    title: "Commerce & SNS",
    category: "Digital Marketing",
    date: "2025",
    tools: ["Ps", "Generative AI"], 
    image: "/com04.png", 
    detailImages: ["/com04.png", "/com05.png", "/com06.png"],
    bgColor: "bg-[#FF6B6B]", 
    description: "게임 '젠레스 존 제로'의 고채도 비주얼 전략과 모바일 UX를 결합한 커머스 디자인입니다. '혜택 각인-탐색-리워드'로 이어지는 구매 여정을 설계하고, 정보의 요약화와 시각적 앵커를 활용해 이탈률을 최소화했습니다."
  }
];

// --- 4. 테마 설정 ---
const themes = [
  { name: 'Purple', bg: '#2E0249', text: '#ffffff', accent: '#F72585' },
  { name: 'Blue',   bg: '#0045FF', text: '#ffffff', accent: '#FFD700' },
  { name: 'Green',  bg: '#00CC66', text: '#000000', accent: '#2E0249' },
  { name: 'White',  bg: '#FFFFFF', text: '#000000', accent: '#F72585' },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = themes[themeIndex];
  
  // 패럴랙스 스크롤 효과
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const toggleTheme = () => setThemeIndex((prev) => (prev + 1) % themes.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) nextSlide();
    else if (info.offset.x > 50) prevSlide();
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ease-in-out" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
      <FontStyles />

      <header className="fixed top-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <h1 className="text-2xl font-bold tracking-tighter uppercase italic">KIM JAE WON</h1>
        <nav className="hidden md:flex space-x-8 font-bold uppercase text-sm tracking-widest">
          <a href="#featured" className="hover:opacity-70 transition-opacity">Featured</a>
          <a href="#more-work" className="hover:opacity-70 transition-opacity">Gallery</a>
        </nav>
      </header>

      <main>
        {/* Hero Section (패럴랙스 적용) */}
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden pt-10">
          <motion.div style={{ y: y1 }} className="text-center z-20 relative -mb-12 md:-mb-20 pointer-events-none">
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-bold tracking-[0.3em] uppercase mb-2 text-sm md:text-base" style={{ color: currentTheme.accent }}>
              Seoul, South Korea
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[13vw] md:text-[10rem] font-bold uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">
              Kim Jae Won
            </motion.h1>
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="relative w-full flex items-center justify-center z-10">
             <motion.div animate={{ x: -300, rotate: -15, opacity: 1 }} className="absolute w-[22rem] h-[55vh] bg-[#4ECDC4] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20">
                <img src="/3d01.png" alt="" className="w-full h-full object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div animate={{ x: 300, rotate: 15, opacity: 1 }} className="absolute w-[22rem] h-[55vh] bg-[#FFD700] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20">
                <img src="/si02.png" alt="" className="w-full h-full object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-30 w-[80vw] md:w-[32rem] h-[50vh] md:h-[60vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
               <img src="/ch01.jpg" alt="" className="w-full h-full object-cover" />
             </motion.div>
          </motion.div>
          
          <motion.div style={{ y: y1 }} className="text-center z-20 relative -mt-10 md:-mt-16 pointer-events-none">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-[10vw] md:text-[6rem] font-bold uppercase leading-[0.85] tracking-tighter transition-colors duration-500" style={{ color: currentTheme.accent }}>
              Smart Tech,<br/>Fine Visual
            </motion.h2>
          </motion.div>
        </section>

        {/* Featured Section */}
        <section id="featured" className="py-20 overflow-hidden relative min-h-[900px] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16 px-6"
          >
            <h3 className="text-4xl md:text-6xl font-bold uppercase italic mb-2">Featured Work</h3>
            <p className="font-bold tracking-widest uppercase text-sm" style={{ color: currentTheme.accent }}>Drag to Rotate</p>
          </motion.div>
          
          <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              <AnimatePresence initial={false} mode='popLayout'>
                {[-1, 0, 1].map((offset) => {
                  const projectIndex = (currentIndex + offset + projects.length) % projects.length;
                  const project = projects[projectIndex];
                  const isCenter = offset === 0;
                  const isLeft = offset === -1;
                  return (
                    <motion.div
                      key={`${project.id}-${offset}`}
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      animate={{ scale: isCenter ? 1 : 0.85, x: isCenter ? 0 : (isLeft ? -400 : 400), rotateY: isCenter ? 0 : (isLeft ? 30 : -30), opacity: isCenter ? 1 : 0.5, zIndex: isCenter ? 10 : 5 }}
                      className={`absolute w-[65vw] md:w-[30vw] md:max-w-[400px] aspect-[4/5] rounded-[2.5rem] shadow-2xl ${project.bgColor} border-4 border-white/10 cursor-grab active:cursor-grabbing`}
                    >
                      <img src={project.image} alt="" className="w-full h-full object-cover rounded-[2.3rem] pointer-events-none" />
                      {isCenter && (
                        <div className="absolute -bottom-24 left-0 right-0 flex justify-center">
                           <button onClick={() => setSelectedProject(project)} className="px-8 py-3 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg" style={{ backgroundColor: currentTheme.accent }}>{project.title}</button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="more-work" className="px-6 py-20 max-w-7xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
             className="mb-12 border-b border-white/20 pb-4"
          >
            <h3 className="text-3xl md:text-5xl font-bold uppercase">All Projects</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)} 
                whileHover={{ scale: 1.05 }} 
                className="cursor-pointer group"
              >
                <div className={`aspect-square rounded-[2.5rem] overflow-hidden ${project.bgColor} relative shadow-xl`}>
                  <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.date}
                  </div>
                </div>
                <div className="mt-4 px-2">
                   <h4 className="text-xl font-bold uppercase">{project.title}</h4>
                   <span className="text-sm opacity-60">{project.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 text-center opacity-50 border-t" style={{ borderColor: currentTheme.text }}>
        <p className="font-bold uppercase tracking-widest text-sm">© 2026 Kim Jae Won. All Rights Reserved.</p>
      </footer>

      <button onClick={toggleTheme} className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl" style={{ backgroundColor: currentTheme.text, color: currentTheme.bg }}><Palette size={24} /></button>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4 text-white">
            <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div layoutId={`card-${selectedProject.id}`} className="relative w-full max-w-5xl bg-[#1a052a] rounded-[2rem] overflow-hidden max-h-[90vh] overflow-y-auto border border-white/10">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"><X size={24} /></button>
              
              <div className="p-8 md:p-12">
                {/* 상단 정보 */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <span className="font-bold tracking-widest uppercase text-sm" style={{ color: currentTheme.accent }}>
                    {selectedProject.category}
                  </span>
                  <span className="text-white/40">|</span>
                  <span className="text-sm font-medium opacity-70">
                    {selectedProject.date}
                  </span>
                </div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold uppercase italic mb-6 leading-none">
                  {selectedProject.title}
                </motion.h2>

                {/* 사용 툴 태그 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>

                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-xl mb-12 border-l-4 pl-6 leading-relaxed text-gray-200" style={{ borderColor: currentTheme.accent }}>
                  {selectedProject.description}
                </motion.p>
                
                {/* 스마트 이미지 갤러리 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
                  {selectedProject.detailImages?.map((img, index) => (
                    <SmartImage key={index} src={img} />
                  ))}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
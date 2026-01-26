"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette } from 'lucide-react';

// --- 프로젝트 데이터 ---
const projects = [
  {
    id: 1,
    title: "Sign Design",
    category: "Wayfinding & Branding",
    image: "/si02.png", 
    detailImages: ["/si02.png", "/si03.png", "/si01.png", "/si04.png"], 
    bgColor: "bg-[#FFD700]", 
    description: "'책보냥'이라는 브랜드의 간판 디자인 프로젝트입니다. 브랜드의 아이덴티티를 시각화한 메인 간판 디자인과 이를 뒷받침하는 컨셉 설명, 그리고 실제 현장에 적용된 모습을 가정한 목업(Mockup) 시뮬레이션입니다."
  },
  {
    id: 2,
    title: "Commerce Design",
    category: "Product & Detail Page",
    image: "/com01.png", 
    detailImages: [
      "/com01.png", "/com02.png", "/com03.png", 
      "/com04.png", "/com05.png", 
      "/com06.png"
    ],
    bgColor: "bg-[#FF6B6B]", 
    description: "다양한 커머스 디자인 컬렉션입니다. '시나모롤' 캐릭터를 활용한 팬시/노트 디자인부터, 게임 '젠레스 존 제로'의 몰입감 있는 상세페이지 디자인, 그리고 정보를 효과적으로 전달하는 카드뉴스 디자인을 포함합니다."
  },
  {
    id: 3,
    title: "Character Design",
    category: "Brand Mascot & IP",
    image: "/ch01.jpg", 
    detailImages: [
      "/ch01.jpg", 
      "/ch02.png", "/ch03.png", 
      "/ch04.png", "/ch05.png", "/ch06.png", "/ch07.png", "/ch08.png"
    ], 
    bgColor: "bg-[#4ECDC4]", 
    description: "아우라리아(Auraria)는 '황금빛 기운'과 '성스러운 선율'의 합성어로, 치유를 전하는 '성스러운 수호자'입니다. 신의 축복을 황금빛 에너지로 시각화하여 'Divine Healing Persona'를 구축했으며, 메인 디자인에서 파생된 SD 캐릭터와 다양한 굿즈 목업을 통해 확장성을 검증했습니다."
  },
  {
    id: 4,
    title: "Illustration",
    category: "Digital Artwork",
    image: "/ill01.png", 
    detailImages: ["/ill01.png", "/ill02.png", "/ill03.png", "/ill04.jpg"], 
    bgColor: "bg-[#95E1D3]", 
    description: "독창적인 스타일과 감성을 담은 디지털 일러스트레이션 시리즈입니다. 각 작품마다 고유의 스토리텔링과 색채를 통해 시각적 즐거움을 전달합니다."
  },
  {
    id: 5,
    title: "3D Modeling",
    category: "Character & Texture",
    image: "/3d01.png", 
    detailImages: [
        "/3d01.png", 
        "/3d08.png", "/3d09.png", "/3d10.png", 
        "/3d02.png", "/3d03.png", 
        "/3d06.png", "/3d07.png", 
        "/3d04.png", "/3d05.png", 
        "/3d18.png", 
        "/3d15.png", "/3d16.png", "/3d17.png", 
        "/3d14.png", "/3d13.png", "/3d12.png", "/3d11.png"
    ],
    bgColor: "bg-[#A8DADC]", 
    description: "Blender를 활용한 광범위한 3D 모델링 포트폴리오입니다. SD 캐릭터와 동물(닭) 모델링을 통해 Bone 리깅과 애니메이션 구조를 설계하였고, 사과/풀 등의 오브젝트로 렌더링 파이프라인을 마스터했습니다. 또한 고품질 인물 모델링과 유리/금속 재질(컵) 연구를 통해 사실적인 텍스처링과 라이팅 역량을 갖추었습니다."
  },
  {
    id: 6,
    title: "Poster Design",
    category: "Graphic Design",
    image: "/po01.png", 
    detailImages: ["/po01.png", "/po02.png", "/po03.png", "/po04.png", "/po05.png"], 
    bgColor: "bg-[#F7D794]", 
    description: "시선을 사로잡는 그래픽 포스터 디자인 컬렉션입니다. 타이포그래피와 이미지를 조화롭게 배치하여, 전달하고자 하는 메시지를 명확하고 강렬하게 표현했습니다."
  }
];

// --- 테마 설정 ---
const themes = [
  { name: 'Purple', bg: '#2E0249', text: '#ffffff', accent: '#F72585' },
  { name: 'Blue',   bg: '#0045FF', text: '#ffffff', accent: '#FFD700' },
  { name: 'Green',  bg: '#00CC66', text: '#000000', accent: '#2E0249' },
  { name: 'White',  bg: '#FFFFFF', text: '#000000', accent: '#F72585' },
];

export default function SpencerGaborFinal() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);
  const currentTheme = themes[themeIndex];

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) nextSlide();
    else if (info.offset.x > 50) prevSlide();
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
  }, [selectedProject]);

  return (
    <div 
      className="min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      <header className="fixed top-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">KIM JAE WON</h1>
        <nav className="hidden md:flex space-x-8 font-bold uppercase text-sm tracking-widest">
          <a href="#featured" className="hover:opacity-70 transition-opacity">Featured</a>
          <a href="#more-work" className="hover:opacity-70 transition-opacity">Gallery</a>
        </nav>
      </header>

      <main>
        {/* --- Hero Section (메인 화면) --- */}
        <section className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-10 overflow-hidden">
          <div className="text-center z-20 mb-8 md:mb-12 relative">
            <p className="font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base animate-pulse" style={{ color: currentTheme.accent }}>
              Seoul, South Korea
            </p>
            <h1 className="text-6xl md:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter drop-shadow-2xl relative z-20">
              Kim Jae Won
            </h1>
          </div>
          
          {/* 중앙 카드 스택 영역 */}
          <div className="relative w-full max-w-4xl h-[400px] md:h-[500px] flex items-center justify-center my-4 z-10">
             
             {/* 왼쪽 장식 카드 (파란색) - 이미지 추가됨 */}
             <motion.div 
               initial={{ x: 0, rotate: 0, opacity: 0 }} 
               animate={{ x: -250, rotate: -15, opacity: 1 }} 
               transition={{ duration: 1, type: "spring", delay: 0.2 }} 
               className="absolute w-56 h-72 md:w-80 md:h-[28rem] bg-[#4ECDC4] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20"
             >
                <img src="/3d01.png" alt="Left Deco" className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
             </motion.div>
             
             {/* 오른쪽 장식 카드 (노란색) - 이미지 추가됨 */}
             <motion.div 
               initial={{ x: 0, rotate: 0, opacity: 0 }} 
               animate={{ x: 250, rotate: 15, opacity: 1 }} 
               transition={{ duration: 1, type: "spring", delay: 0.2 }} 
               className="absolute w-56 h-72 md:w-80 md:h-[28rem] bg-[#FFD700] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20"
             >
                <img src="/si02.png" alt="Right Deco" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
             </motion.div>
             
             {/* 중앙 메인 카드 (흰색) */}
             <motion.div 
               initial={{ scale: 0.8, opacity: 0, y: 50 }} 
               animate={{ scale: 1, opacity: 1, y: 0 }} 
               transition={{ duration: 0.8, type: "spring" }} 
               className="relative z-30 w-64 h-80 md:w-[26rem] md:h-[34rem] bg-white rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-white"
             >
               <img src="/ch01.jpg" alt="Hero Main" className="w-full h-full object-cover" />
             </motion.div>
          </div>

          <div className="text-center z-20 mt-8 relative">
            <h2 className="text-5xl md:text-[7rem] font-black uppercase leading-[0.9] tracking-tighter transition-colors duration-500" style={{ color: currentTheme.accent }}>
              Smart Tech,<br/>Fine Visual
            </h2>
          </div>
        </section>

        {/* --- Featured Work (3D Carousel) --- */}
        <section id="featured" className="py-20 md:py-32 overflow-hidden relative min-h-[900px] flex flex-col justify-center">
          <div className="text-center mb-16 px-6">
            <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-2">Featured Work</h3>
            <p className="font-bold tracking-widest uppercase text-sm" style={{ color: currentTheme.accent }}>Drag to Rotate</p>
          </div>

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
                      layout
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      initial={{ scale: 0.8, x: offset * 100 + '%', rotateY: offset * -45, opacity: 0, zIndex: 0 }}
                      animate={{ 
                        scale: isCenter ? 1 : 0.85, 
                        x: isCenter ? 0 : (isLeft ? -400 : 400), 
                        y: 0,
                        rotateY: isCenter ? 0 : (isLeft ? 30 : -30),
                        opacity: isCenter ? 1 : 0.5,
                        zIndex: isCenter ? 10 : 5,
                        filter: isCenter ? "blur(0px)" : "blur(2px)"
                      }}
                      exit={{ scale: 0.8, opacity: 0, zIndex: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.5 }}
                      className={`
                        absolute w-[65vw] md:w-[30vw] md:max-w-[400px] aspect-[4/5] 
                        rounded-[2.5rem] shadow-2xl ${project.bgColor} border-4 border-white/10 
                        cursor-grab active:cursor-grabbing
                      `}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="w-full h-full relative overflow-hidden rounded-[2.3rem]">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover pointer-events-none" />
                        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest">
                          {String(project.id).padStart(2, '0')}
                        </div>
                      </div>
                      {isCenter && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 40 }}
                          className="absolute -bottom-24 left-0 right-0 flex justify-center w-full"
                        >
                           <button
                              onClick={() => setSelectedProject(project)}
                              className="px-8 py-3 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
                              style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg === '#FFFFFF' ? 'white' : 'white' }}
                            >
                              {project.title}
                            </button>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- More Work (Grid) --- */}
        <section id="more-work" className="px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">More Work</h3>
            <p className="text-xl md:text-2xl font-bold opacity-60">Take a scroll, stay a while.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -3 : 3 }}
                className="cursor-pointer group"
              >
                <div className={`aspect-square rounded-[2.5rem] overflow-hidden ${project.bgColor} relative shadow-xl`}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-2xl font-black uppercase italic mb-2 text-white">{project.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full">View Project</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 text-center opacity-50 border-t" style={{ borderColor: currentTheme.text }}>
        <p className="font-bold uppercase tracking-widest text-sm">© 2026 Kim Jae Won. All Rights Reserved.</p>
      </footer>

      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        style={{ backgroundColor: currentTheme.text, color: currentTheme.bg }}
      >
        <Palette size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4 text-white">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div layoutId={`card-${selectedProject.id}`} className="relative w-full max-w-5xl bg-[#1a052a] rounded-[2rem] overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 p-2 bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="p-8 md:p-12">
                <div className="mb-12">
                   <span className="font-bold tracking-widest uppercase text-sm mb-2 block" style={{ color: '#F72585' }}>{selectedProject.category}</span>
                   <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6 leading-none">{selectedProject.title}</h2>
                   <p className="text-xl font-medium leading-relaxed text-purple-200 border-l-4 border-[#F72585] pl-6">{selectedProject.description}</p>
                </div>
                <div className="space-y-8">
                  {selectedProject.detailImages && selectedProject.detailImages.map((img, index) => (
                    <div key={index} className="rounded-3xl overflow-hidden shadow-lg border border-white/10">
                      <img src={img} alt="Detail" className="w-full h-auto" />
                    </div>
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
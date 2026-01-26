"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette } from 'lucide-react';

// 프로젝트 타입 정의 (Vercel 에러 방지용)
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  detailImages: string[];
  bgColor: string;
  description: string;
}

const projects: Project[] = [
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
    detailImages: ["/com01.png", "/com02.png", "/com03.png", "/com04.png", "/com05.png", "/com06.png"],
    bgColor: "bg-[#FF6B6B]", 
    description: "다양한 커머스 디자인 컬렉션입니다. '시나모롤' 캐릭터를 활용한 팬시/노트 디자인부터, 게임 '젠레스 존 제로'의 몰입감 있는 상세페이지 디자인, 홍보 카드뉴스 디자인을 포함합니다."
  },
  {
    id: 3,
    title: "Character Design",
    category: "Brand Mascot & IP",
    image: "/ch01.jpg", 
    detailImages: ["/ch01.jpg", "/ch02.png", "/ch03.png", "/ch04.png", "/ch05.png", "/ch06.png", "/ch07.png", "/ch08.png"], 
    bgColor: "bg-[#4ECDC4]", 
    description: "아우라리아(Auraria)는 주변을 치유하는 '성스러운 수호자'입니다. 메인 디자인에서 파생된 SD 캐릭터와 다양한 굿즈 목업을 통해 캐릭터의 확장성을 검증했습니다."
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
    detailImages: ["/3d01.png", "/3d08.png", "/3d09.png", "/3d10.png", "/3d02.png", "/3d03.png", "/3d06.png", "/3d07.png", "/3d04.png", "/3d05.png", "/3d18.png", "/3d15.png", "/3d16.png", "/3d17.png", "/3d14.png", "/3d13.png", "/3d12.png", "/3d11.png"],
    bgColor: "bg-[#A8DADC]", 
    description: "Blender를 활용한 3D 모델링 컬렉션입니다. 로우폴리 캐릭터 리깅부터 고품질 인물 모델링, 재질 연구(Material Study)까지의 파이프라인을 경험했습니다."
  },
  {
    id: 6,
    title: "Poster Design",
    category: "Graphic Design",
    image: "/po01.png", 
    detailImages: ["/po01.png", "/po02.png", "/po03.png", "/po04.png", "/po05.png"], 
    bgColor: "bg-[#F7D794]", 
    description: "강렬한 타이포그래피와 레이아웃으로 메시지를 전달하는 포스터 디자인 컬렉션입니다."
  }
];

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
      <header className="fixed top-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">KIM JAE WON</h1>
        <nav className="hidden md:flex space-x-8 font-bold uppercase text-sm tracking-widest">
          <a href="#featured" className="hover:opacity-70 transition-opacity">Featured</a>
          <a href="#more-work" className="hover:opacity-70 transition-opacity">Gallery</a>
        </nav>
      </header>

      <main>
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden pt-10">
          <div className="text-center z-20 relative -mb-12 md:-mb-20 pointer-events-none">
            <p className="font-bold tracking-[0.3em] uppercase mb-2 text-sm md:text-base animate-pulse" style={{ color: currentTheme.accent }}>Seoul, South Korea</p>
            <h1 className="text-[13vw] md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl">Kim Jae Won</h1>
          </div>
          <div className="relative w-full flex items-center justify-center z-10">
             <motion.div animate={{ x: -300, rotate: -15, opacity: 1 }} className="absolute w-[22rem] h-[55vh] bg-[#4ECDC4] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20">
                <img src="/3d01.png" alt="" className="w-full h-full object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div animate={{ x: 300, rotate: 15, opacity: 1 }} className="absolute w-[22rem] h-[55vh] bg-[#FFD700] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20">
                <img src="/si02.png" alt="" className="w-full h-full object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative z-30 w-[80vw] md:w-[32rem] h-[50vh] md:h-[60vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
               <img src="/ch01.jpg" alt="" className="w-full h-full object-cover" />
             </motion.div>
          </div>
          <div className="text-center z-20 relative -mt-10 md:-mt-16 pointer-events-none">
            <h2 className="text-[10vw] md:text-[6rem] font-black uppercase leading-[0.85] tracking-tighter transition-colors duration-500" style={{ color: currentTheme.accent }}>Smart Tech,<br/>Fine Visual</h2>
          </div>
        </section>

        <section id="featured" className="py-20 overflow-hidden relative min-h-[900px] flex flex-col justify-center">
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
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      animate={{ scale: isCenter ? 1 : 0.85, x: isCenter ? 0 : (isLeft ? -400 : 400), rotateY: isCenter ? 0 : (isLeft ? 30 : -30), opacity: isCenter ? 1 : 0.5, zIndex: isCenter ? 10 : 5 }}
                      className={`absolute w-[65vw] md:w-[30vw] md:max-w-[400px] aspect-[4/5] rounded-[2.5rem] shadow-2xl ${project.bgColor} border-4 border-white/10 cursor-grab active:cursor-grabbing`}
                    >
                      <img src={project.image} alt="" className="w-full h-full object-cover rounded-[2.3rem] pointer-events-none" />
                      {isCenter && (
                        <div className="absolute -bottom-24 left-0 right-0 flex justify-center">
                           <button onClick={() => setSelectedProject(project)} className="px-8 py-3 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg" style={{ backgroundColor: currentTheme.accent }}>{project.title}</button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="more-work" className="px-6 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.map((project) => (
              <motion.div key={project.id} onClick={() => setSelectedProject(project)} whileHover={{ scale: 1.05 }} className="cursor-pointer group">
                <div className={`aspect-square rounded-[2.5rem] overflow-hidden ${project.bgColor} relative shadow-xl`}>
                  <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4 text-white">
            <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div layoutId={`card-${selectedProject.id}`} className="relative w-full max-w-5xl bg-[#1a052a] rounded-[2rem] overflow-hidden max-h-[90vh] overflow-y-auto border border-white/10">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-50 p-2 bg-white text-black rounded-full"><X size={24} /></button>
              <div className="p-8 md:p-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-6">{selectedProject.title}</h2>
                <p className="text-xl mb-12 border-l-4 border-pink-500 pl-6">{selectedProject.description}</p>
                <div className="space-y-8">
                  {selectedProject.detailImages?.map((img, index) => (
                    <img key={index} src={img} alt="" className="w-full h-auto rounded-3xl border border-white/10 shadow-lg" />
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
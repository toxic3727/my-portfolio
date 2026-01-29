"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Palette } from 'lucide-react';
// ▼ WebP 변환 및 최적화를 위해 Next.js Image 컴포넌트 추가
import Image from 'next/image';

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

// --- 1. 스마트 이미지 컴포넌트 (Next.js Image 적용 + 조건부 스타일 수정) ---
const SmartImage = ({ src, fitCover = false }: { src: string, fitCover?: boolean }) => {
  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        relative rounded-2xl overflow-hidden shadow-2xl border border-white/10
        ${isLandscape ? 'md:col-span-2' : 'md:col-span-1'} 
        ${fitCover ? 'bg-transparent' : 'bg-white'} 
      `}
    >
      {/* 상세 이미지는 높이가 가변적이므로 fill 대신 
         width=0, height=0, sizes=100vw 방식을 사용하여 
         CSS의 w-full h-auto가 먹히도록 설정 (WebP 자동변환 됨)
      */}
      <Image
        src={src}
        alt="Detail"
        width={0}
        height={0}
        sizes="100vw"
        // fitCover가 true면 h-full(꽉채우기), false면 h-auto(원본비율 유지)
        className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${fitCover ? 'h-full' : 'h-auto'}`}
        onLoad={(e) => {
          const img = e.currentTarget;
          setIsLandscape(img.naturalWidth >= img.naturalHeight);
        }}
      />
    </motion.div>
  );
};

// --- 2. 프로젝트 타입 정의 (필드 추가) ---
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
  // ▼ 모든 프로젝트에 공통으로 들어갈 상자 내용 필드 추가
  focus: string;
  technical: string;
}

// --- 3. 프로젝트 데이터 (업데이트됨: 설계 의도 및 기술 전략 중심) ---
const projects: Project[] = [
  {
    id: 1,
    title: "Sign Design",
    category: "Wayfinding & Branding",
    date: "2025", 
    tools: ["Illustrator", "Photoshop"], 
    image: "/si02.png", 
    detailImages: ["/si02.png", "/si03.png", "/si01.png", "/si04.png"], 
    bgColor: "bg-[#FFD700]", 
    description: "'책보냥'은 고양이의 유연한 곡선미와 책이 주는 지적인 안식을 결합한 브랜드입니다. 의성어 '냐'를 시각적 모티브로 삼아 로고타입을 설계했으며, 사용자가 공간에 진입하는 순간부터 직관적인 편안함을 느끼도록 사인 시스템을 구축했습니다.",
    focus: "사용자의 공간 내 동선 흐름을 분석하여, 브랜드의 곡선미가 녹아든 직관적인 웨이파인딩(Wayfinding) 시스템을 설계합니다.",
    technical: "실제 설치 환경의 스케일을 고려한 벡터 로고타입 정교화 및 공간 적용 시뮬레이션을 통해 시공 오차를 최소화합니다."
  },
  {
    id: 2,
    title: "Fancy & Product",
    category: "Stationery Design",
    date: "2025",
    tools: ["Illustrator", "Photoshop"],
    image: "/com01.png", 
    detailImages: ["/com01.png", "/com02.png", "/com03.png"],
    bgColor: "bg-[#FFB7B7]", 
    description: "시나모롤 IP의 고유한 무드를 제품에 녹여낸 팬시 디자인 컬렉션입니다. 캐릭터의 사랑스러운 스토리텔링을 유지하면서도, 실용성을 고려한 레이아웃과 제품화에 최적화된 컬러 팔레트를 구성하여 상품성을 극대화했습니다.",
    focus: "캐릭터 IP의 스토리텔링을 실물 제품의 레이아웃으로 변환하여, 팬덤의 소유 욕구를 자극하는 상업적 굿즈 라인업을 기획합니다.",
    technical: "인쇄 공정(도련, 오버프린트 등)의 물리적 제약을 선제적으로 반영한 레이아웃 설계와 제작 단가를 고려한 컬러 매니지먼트를 수행합니다."
  },
  {
    id: 3,
    title: "Character Design",
    category: "Brand Mascot & IP",
    date: "2025",
    tools: ["Illustrator", "Photoshop"], 
    image: "/ch01.jpg", 
    detailImages: ["/ch01.jpg", "/ch02.png", "/ch03.png", "/ch04.png", "/ch05.png", "/ch06.png", "/ch07.png", "/ch08.png"], 
    bgColor: "bg-[#4ECDC4]", 
    description: "신비로운 신성과 치유의 에너지를 황금빛 광채로 시각화하여 캐릭터의 생명력을 담았습니다. 현대적인 디테일과 블루-금색의 대비를 통해 아우라리아만의 강인한 주체성과 독보적인 아우라를 완성했습니다.",
    focus: "캐릭터의 세계관과 고유한 컨셉트가 시각적으로 즉각 인지될 수 있도록 상징적인 컬러 팔레트와 형태적 정체성을 구축합니다.",
    technical: "향후 애니메이션 및 게임 등 다양한 매체 확장을 고려하여 감정 표현 및 포즈별 리소스 라이브러리를 체계적으로 구조화합니다."
  },
  {
    id: 4,
    title: "Illustration",
    category: "Digital Artwork",
    date: "2024/2025", 
    tools: ["Procreate"], 
    image: "/ill01.png", 
    detailImages: ["/ill01.png", "/ill02.png", "/ill03.png", "/ill04.jpg"], 
    bgColor: "bg-[#95E1D3]", 
    description: "빛과 색의 조화로운 변주를 통해 대상의 서사를 시각적으로 요약하고, 일러스트레이션 특유의 감성적인 무드를 정교하게 구현합니다. 대상의 본질을 꿰뚫는 디테일과 감각적인 표현으로 깊은 시각적 몰입감을 선사합니다.",
    focus: "빛의 굴절과 공기의 흐름 등 시각적 요소를 정밀하게 제어하여, 한 장의 그림 안에 함축적인 서사와 공간적 깊이감을 구현합니다.",
    technical: "디지털 페인팅의 레이어링 시스템을 논리적으로 관리하여, 고해상도 출력 환경에서도 디테일이 유지되는 고품질 시각 자산을 제작합니다."
  },
  {
    id: 5,
    title: "3D Modeling",
    category: "Character & Texture",
    date: "2025",
    tools: ["Blender"], 
    image: "/3d01.png", 
    detailImages: ["/3d01.png", "/3d08.png", "/3d09.png", "/3d10.png", "/3d02.png", "/3d03.png", "/3d06.png", "/3d07.png", "/3d04.png", "/3d05.png", "/3d18.png", "/3d15.png", "/3d16.png", "/3d17.png", "/3d14.png", "/3d13.png", "/3d12.png", "/3d11.png"],
    bgColor: "bg-[#A8DADC]", 
    description: "효율적인 로우폴리(Low-poly) 구조 설계와 정교한 텍스처링을 통해 저사양 환경에서도 최상의 퍼포먼스를 구현하는 데 집중합니다. 배경 요소와 캐릭터 간의 시각적 통일감을 유지하며 아기자기한 세계관을 입체적으로 구현했습니다.",
    focus: "모바일 및 웹 환경의 하드웨어 제약 내에서 최상의 비주얼 퍼포먼스를 낼 수 있도록 효율적인 월드빌딩과 캐릭터 자산을 설계합니다.",
    technical: "리소스 효율화(Resource Efficiency)를 극대화하기 위해 토폴로지 최적화(Low-poly) 및 텍스처 베이킹 기술을 적용하여 렌더링 부하를 관리합니다."
  },
  {
    id: 6,
    title: "Poster Design",
    category: "Graphic Design",
    date: "2025",
    tools: ["InDesign", "Photoshop", "Illustrator"], 
    image: "/po01.png", 
    detailImages: ["/po01.png", "/po02.png", "/po03.png", "/po04.png", "/po05.png"], 
    bgColor: "bg-[#F7D794]", 
    description: "포스터는 브랜드의 목소리를 시각적으로 요약하는 가장 강력한 매체입니다. 각 도메인의 고유한 무드를 분석하여 색채와 형태, 타이포그래피의 변주를 통해 '말하지 않아도 느껴지는' 직관적인 서사를 구축하는 것을 목표로 합니다.",
    focus: "그리드 시스템을 기반으로 정보의 우선순위를 재구성하여, 짧은 찰나에도 메시지가 전달되는 타이포그래피 메타포를 구축합니다.",
    technical: "온·오프라인 매체 환경에 따른 해상도 및 색상 최적화 가이드를 수립하여, 어떤 환경에서도 브랜드의 목소리가 왜곡되지 않도록 설계합니다."
  },
  {
    id: 7,
    title: "Commerce & SNS",
    category: "Digital Marketing",
    date: "2025",
    tools: ["Photoshop", "Illustrator"], 
    image: "/com04.png", 
    detailImages: ["/com04.png", "/com05.png", "/com06.png"],
    bgColor: "bg-[#FF6B6B]", 
    description: "정보의 우선순위를 고려한 타이포그래피 설계로 가독성을 높이고, 브랜드의 톤앤매너를 반영한 비주얼로 사용자의 시선과 클릭을 유도했습니다. 매체 환경에 최적화된 레이아웃을 통해 상업적 결과물을 제안합니다.",
    focus: "사용자 경험(UX) 관점에서 시선의 흐름을 유도하고, 브랜드 신뢰도를 높이는 시각적 앵커 배치를 통해 클릭과 전환을 유도합니다.",
    technical: "모바일 퍼스트(Mobile-first) 환경에 최적화된 가변적 레이아웃 설계와 고채도 비주얼 전략으로 콘텐츠의 도달률과 가독성을 높입니다."
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
        {/* Hero Section */}
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
                <Image src="/3d01.png" alt="" fill className="object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div animate={{ x: 300, rotate: 15, opacity: 1 }} className="absolute w-[22rem] h-[55vh] bg-[#FFD700] rounded-[3rem] shadow-2xl hidden md:block overflow-hidden border-4 border-white/20">
                <Image src="/si02.png" alt="" fill className="object-cover grayscale opacity-60 mix-blend-soft-light" />
             </motion.div>
             <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-30 w-[80vw] md:w-[32rem] h-[50vh] md:h-[60vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
               {/* 메인 히로 이미지는 우선순위를 높여 LCP 최적화 */}
               <Image src="/ch01.jpg" alt="" fill priority className="object-cover" />
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
                      {/* 카드 이미지는 부모 컨테이너에 꽉 차게 fill 사용 */}
                      <Image src={project.image} alt="" fill className="object-cover rounded-[2.3rem] pointer-events-none" />
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
                  {/* 갤러리 썸네일도 fill로 처리 */}
                  <Image src={project.image} alt="" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
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

      {/* --- About Me Section (유지됨) --- */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          {/* 왼쪽: 자기소개 글 (입력된 코드 내용 유지) */}
          <div>
            <h3 className="text-4xl md:text-6xl font-bold uppercase italic mb-8" style={{ color: currentTheme.accent }}>
              About Me
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 font-light">
              캐릭터 디자인, 3D 모델링, 폭넓은 기술을 통해 몰입감 있는 경험을 제공하는 디자이너 김재원입니다.
            </p>
            <p className="mt-6 text-lg opacity-70 leading-relaxed">
            AI와 최신 기술을 디자인 워크플로우에 적극적으로 활용하여, 상상력의 경계를 넓히는 동시에 실무적으로 즉시 기능할 수 있는 '살아있는 디자인'을 제안하는 것이 저의 강점입니다.
            </p>
          </div>

          {/* 오른쪽: 스킬 및 연락처 (유지) */}
          <div className="space-y-6">
            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
              <h5 className="font-bold mb-4 text-white flex items-center gap-2 uppercase tracking-widest text-sm">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                Technical Mastery
              </h5>
              <div className="space-y-4">
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-tighter mb-2">Visual Artistry</p>
                  <div className="flex flex-wrap gap-2">
                    {["Identity Design", "3D Asset Design", "Adobe CC", "Character IP", "Digital Painting"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/5">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs opacity-50 uppercase tracking-tighter mb-2">Smart Engineering</p>
                  <div className="flex flex-wrap gap-2">
                    {["Digital Prototyping", "Interaction Architecture", "Resource Efficiency", "AI-Augmented Workflow", "Technical Branding"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/5" style={{ color: currentTheme.accent }}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm">
              <h5 className="font-bold mb-4 text-white flex items-center gap-2 uppercase tracking-widest text-sm">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                Contact & Location
              </h5>
              <div className="space-y-2 text-lg opacity-80">
                <p>📧 kimjw0225@gmail.com</p>
                <p>📍  JinJu, South Korea</p>
                <p>🔗 github.com/toxic3727</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

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

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>

                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-xl mb-12 border-l-4 pl-6 leading-relaxed text-gray-200 whitespace-pre-wrap" style={{ borderColor: currentTheme.accent }}>
                  {selectedProject.description}
                </motion.p>

                {/* ▼ 모든 프로젝트에 자동으로 나타나는 상세 정보 박스 ▼ */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-80"
                >
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h5 className="font-bold mb-3 text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                      Design Focus
                    </h5>
                    <p className="leading-relaxed">{selectedProject.focus}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h5 className="font-bold mb-3 text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
                      Technical Skills
                    </h5>
                    <p className="leading-relaxed">{selectedProject.technical}</p>
                  </div>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
                  {/* ▼ 여기서 조건부로 fitCover 옵션을 넘겨줍니다 ▼ */}
                  {selectedProject.detailImages?.map((img, index) => (
                    <SmartImage 
                      key={index} 
                      src={img} 
                      fitCover={selectedProject.category === "Digital Artwork"} 
                    />
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
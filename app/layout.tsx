import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx

export const metadata: Metadata = {
  // ▼▼▼ 이 한 줄을 추가하면 터미널의 노란색 경고가 사라집니다 ▼▼▼
  metadataBase: new URL("https://my-portfolio-flax-nine-75.vercel.app"), 
  
  title: "디자이너 김재원 | Smart Tech, Fine Visual",
  description: "스마트한 기술 활용과 정교한 시각화로 결과의 차이를 만드는 디자이너 김재원입니다.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "디자이너 김재원 | Smart Tech, Fine Visual",
    description: "스마트한 기술 활용과 정교한 시각화로 결과의 차이를 만드는 디자이너 김재원입니다.",
    // ▼▼▼ 실제 주소로 업데이트했습니다 ▼▼▼
    url: "https://my-portfolio-flax-nine-75.vercel.app", 
    siteName: "Kim Jae Won Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kim Jae Won Portfolio Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 한국어 사이트이므로 lang을 "ko"로 변경했습니다.
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
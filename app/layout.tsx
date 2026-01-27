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

// ▼▼▼ 이 부분이 수정되었습니다 ▼▼▼
export const metadata: Metadata = {
  title: "디자이너 김재원 | Smart Tech, Fine Visual",
  description: "스마트한 기술 활용과 정교한 시각화로 결과의 차이를 만드는 디자이너 김재원입니다.",
  icons: {
    icon: "/icon.svg",
  },
  // ▼▼▼ 여기부터 추가된 부분입니다 ▼▼▼
  openGraph: {
    title: "디자이너 김재원 | Smart Tech, Fine Visual",
    description: "스마트한 기술 활용과 정교한 시각화로 결과의 차이를 만드는 디자이너 김재원입니다.",
    url: "https://jaewon-kim.vercel.app", // (나중에 실제 배포 주소로 바꿔야 함)
    siteName: "Kim Jae Won Portfolio",
    images: [
      {
        url: "/og-image.png", // public 폴더에 넣을 이미지 이름
        width: 1200,
        height: 630,
        alt: "Kim Jae Won Portfolio Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
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
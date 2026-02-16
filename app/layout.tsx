import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI 스타일 변환 | Gemini Image Style Transfer",
  description:
    "Gemini AI를 활용해 사진을 다양한 아트 스타일로 변환해보세요. 수채화, 유화, 애니메, 지브리, 팝아트 등 20가지 스타일을 지원합니다.",
  keywords: ["AI", "이미지 변환", "스타일 변환", "Gemini", "아트 스타일"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased text-gray-100 bg-grid-pattern`}
      >
        {children}
      </body>
    </html>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import { StyleOption, UploadedImage, TransformResult } from "@/types";
import ImageUploader from "@/components/ImageUploader";
import StyleGrid from "@/components/StyleGrid";
import TransformButton from "@/components/TransformButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import ResultView from "@/components/ResultView";

export default function Home() {
  // 앱 상태 관리
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TransformResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 섹션 ref (자동 스크롤용)
  const styleGridRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = useCallback((image: UploadedImage) => {
    setUploadedImage(image);
    setResult(null);
    setError(null);
    // 스타일 선택 섹션으로 자동 스크롤
    setTimeout(() => {
      styleGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }, []);

  // 스타일 선택 핸들러
  const handleStyleSelect = useCallback((style: StyleOption) => {
    setSelectedStyle(style);
    setError(null);
  }, []);

  // 변환 실행 핸들러
  const handleTransform = useCallback(async () => {
    if (!uploadedImage || !selectedStyle) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: uploadedImage.base64,
          mimeType: uploadedImage.mimeType,
          stylePrompt: selectedStyle.prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "변환에 실패했습니다.");
      }

      if (!data.image) {
        throw new Error("변환된 이미지를 받지 못했습니다. 다시 시도해주세요.");
      }

      // 결과 설정
      const transformedSrc = `data:${data.mimeType};base64,${data.image}`;
      setResult({
        originalSrc: uploadedImage.preview,
        transformedSrc,
        style: selectedStyle,
      });

      // 결과 섹션으로 스크롤
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err) {
      const message = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, selectedStyle]);

  // "다른 스타일로 변환" 핸들러
  const handleRetryWithNewStyle = useCallback(() => {
    setResult(null);
    setSelectedStyle(null);
    setError(null);
    setTimeout(() => {
      styleGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // "새 이미지로 시작" 핸들러
  const handleStartOver = useCallback(() => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 이미지 리셋 핸들러
  const handleImageReset = useCallback(() => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setResult(null);
    setError(null);
  }, []);

  // 변환 버튼 활성화 조건
  const canTransform = !!uploadedImage && !!selectedStyle && !isLoading;

  return (
    <main className="min-h-screen">
      {/* ===== 헤더 ===== */}
      <header className="relative pt-12 pb-8 px-4 text-center overflow-hidden">
        {/* 배경 글로우 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-violet-600/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            AI 스타일 변환
          </h1>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            사진을 업로드하고 원하는 아트 스타일을 선택하면,
            <br className="hidden sm:block" />
            AI가 원본의 구도를 유지하면서 스타일을 변환해줍니다.
          </p>
        </div>
      </header>

      {/* ===== 메인 콘텐츠 ===== */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-10">
        {/* 1. 이미지 업로드 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <h2 className="text-lg font-semibold text-gray-100">이미지 업로드</h2>
          </div>
          <ImageUploader
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            onReset={handleImageReset}
            disabled={isLoading}
          />
        </section>

        {/* 2. 스타일 선택 (이미지 업로드 후 표시) */}
        {uploadedImage && (
          <section ref={styleGridRef} className="animate-fade-in">
            <StyleGrid
              selectedStyle={selectedStyle}
              onSelectStyle={handleStyleSelect}
              disabled={isLoading}
            />
          </section>
        )}

        {/* 3. 변환 버튼 */}
        {uploadedImage && selectedStyle && !result && (
          <section className="animate-fade-in relative">
            <TransformButton
              onClick={handleTransform}
              disabled={!canTransform}
              isLoading={isLoading}
            />
          </section>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="animate-fade-in mx-auto max-w-xl p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            <p className="font-medium mb-1">⚠ 변환 실패</p>
            <p>{error}</p>
            <button
              onClick={handleTransform}
              className="mt-3 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 4. 로딩 오버레이 */}
        {isLoading && (
          <section className="animate-fade-in">
            <LoadingOverlay isLoading={isLoading} style={selectedStyle} />
          </section>
        )}

        {/* 5. 결과 표시 */}
        {result && (
          <section ref={resultRef} className="animate-fade-in">
            <ResultView
              result={result}
              onRetryWithNewStyle={handleRetryWithNewStyle}
              onStartOver={handleStartOver}
            />
          </section>
        )}
      </div>

      {/* ===== 푸터 ===== */}
      <footer className="border-t border-gray-800/50 py-6 px-4 text-center">
        <p className="text-xs text-gray-500">
          Built with Next.js & Gemini AI · 원본 이미지의 구도를 유지하며 스타일만 변환합니다
        </p>
      </footer>
    </main>
  );
}

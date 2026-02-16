"use client";

import { useState } from "react";
import { TransformResult } from "@/types";
import { downloadAsJpg } from "@/lib/utils";

interface ResultViewProps {
    result: TransformResult;
    onRetryWithNewStyle: () => void;
    onStartOver: () => void;
}

export default function ResultView({
    result,
    onRetryWithNewStyle,
    onStartOver,
}: ResultViewProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    // JPG 다운로드 핸들러
    const handleDownload = async () => {
        setIsDownloading(true);
        setDownloadError(null);
        try {
            await downloadAsJpg(result.transformedSrc, result.style.nameEn);
        } catch (error) {
            console.error("다운로드 실패:", error);
            setDownloadError("다운로드에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="w-full space-y-6" id="result-section">
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                    ✓
                </div>
                <h2 className="text-lg font-semibold text-gray-100">변환 완료!</h2>
                <span className="ml-auto text-sm text-violet-400 font-medium">
                    {result.style.emoji} {result.style.name}
                </span>
            </div>

            {/* Before / After 비교 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 원본 이미지 */}
                <div className="rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-800/40">
                    <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/60">
                        <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            원본 (Before)
                        </h3>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-black/20 min-h-[300px]">
                        <img
                            src={result.originalSrc}
                            alt="원본 이미지"
                            className="max-w-full max-h-[500px] object-contain rounded-lg"
                        />
                    </div>
                </div>

                {/* 변환된 이미지 */}
                <div className="rounded-2xl overflow-hidden border border-violet-500/30 bg-gray-800/40 shadow-lg shadow-violet-500/5">
                    <div className="px-4 py-3 border-b border-violet-500/30 bg-violet-500/5">
                        <h3 className="text-sm font-medium text-violet-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                            {result.style.name} (After)
                        </h3>
                    </div>
                    <div className="p-4 flex items-center justify-center bg-black/20 min-h-[300px]">
                        <img
                            src={result.transformedSrc}
                            alt={`${result.style.name} 스타일로 변환된 이미지`}
                            className="max-w-full max-h-[500px] object-contain rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* 액션 버튼 영역 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {/* JPG 다운로드 버튼 */}
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="JPG로 다운로드"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    )}
                    <span>JPG로 다운로드</span>
                </button>

                {/* 다른 스타일로 변환 */}
                <button
                    onClick={onRetryWithNewStyle}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700/50 text-gray-200 font-medium hover:bg-gray-600/50 transition-all duration-300"
                    aria-label="다른 스타일로 다시 변환"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>다른 스타일로 변환</span>
                </button>

                {/* 새 이미지로 시작 */}
                <button
                    onClick={onStartOver}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700/50 text-gray-200 font-medium hover:bg-gray-600/50 transition-all duration-300"
                    aria-label="새 이미지로 시작"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>새 이미지로 시작</span>
                </button>
            </div>

            {/* 다운로드 에러 메시지 */}
            {downloadError && (
                <div className="text-center text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    {downloadError}
                </div>
            )}
        </div>
    );
}

"use client";

import { StyleOption } from "@/types";

interface LoadingOverlayProps {
    isLoading: boolean;
    style: StyleOption | null;
}

export default function LoadingOverlay({ isLoading, style }: LoadingOverlayProps) {
    if (!isLoading) return null;

    return (
        <div
            className="w-full rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm overflow-hidden"
            role="alert"
            aria-live="polite"
            id="loading-overlay"
        >
            {/* 상단 그래디언트 바 애니메이션 */}
            <div className="h-1 w-full bg-gray-700 overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 animate-loading-bar" />
            </div>

            <div className="flex flex-col items-center justify-center py-16 px-8">
                {/* 로딩 아이콘 */}
                <div className="relative mb-8">
                    {/* 외부 링 */}
                    <div className="w-24 h-24 rounded-full border-4 border-gray-700 animate-pulse" />
                    {/* 회전 링 */}
                    <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500 animate-spin" />
                    {/* 중앙 이모지 */}
                    <div className="absolute inset-0 flex items-center justify-center text-3xl">
                        {style?.emoji || "🎨"}
                    </div>
                </div>

                {/* 텍스트 */}
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    AI가 이미지를 변환하고 있습니다...
                </h3>
                {style && (
                    <p className="text-violet-400 font-medium mb-3">
                        {style.emoji} {style.name} 스타일 적용 중
                    </p>
                )}
                <p className="text-sm text-gray-400">
                    약 10~30초 소요됩니다. 잠시만 기다려주세요.
                </p>

                {/* 스켈레톤 미리보기 */}
                <div className="mt-8 w-full max-w-lg grid grid-cols-2 gap-4">
                    <div className="aspect-video rounded-lg bg-gray-700/50 animate-pulse flex items-center justify-center">
                        <span className="text-xs text-gray-500">원본</span>
                    </div>
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-700/50 to-violet-900/20 animate-pulse flex items-center justify-center">
                        <span className="text-xs text-gray-500">변환 중...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

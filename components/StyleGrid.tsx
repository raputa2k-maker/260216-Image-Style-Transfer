"use client";

import { StyleOption } from "@/types";
import { STYLES } from "@/lib/styles";
import StyleCard from "./StyleCard";

interface StyleGridProps {
    selectedStyle: StyleOption | null;
    onSelectStyle: (style: StyleOption) => void;
    disabled?: boolean;
}

export default function StyleGrid({
    selectedStyle,
    onSelectStyle,
    disabled = false,
}: StyleGridProps) {
    return (
        <div className="w-full" id="style-grid-section">
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    2
                </div>
                <h2 className="text-lg font-semibold text-gray-100">아트 스타일 선택</h2>
                {selectedStyle && (
                    <span className="ml-auto text-sm text-violet-400 font-medium">
                        ✨ {selectedStyle.name}
                    </span>
                )}
            </div>

            {/* 스타일 카드 그리드 */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                role="radiogroup"
                aria-label="아트 스타일 목록"
            >
                {STYLES.map((style) => (
                    <StyleCard
                        key={style.id}
                        style={style}
                        isSelected={selectedStyle?.id === style.id}
                        onSelect={onSelectStyle}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}

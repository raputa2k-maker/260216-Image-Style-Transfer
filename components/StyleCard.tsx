"use client";

import { StyleOption } from "@/types";

interface StyleCardProps {
    style: StyleOption;
    isSelected: boolean;
    onSelect: (style: StyleOption) => void;
    disabled?: boolean;
}

export default function StyleCard({
    style,
    isSelected,
    onSelect,
    disabled = false,
}: StyleCardProps) {
    return (
        <button
            id={`style-card-${style.id}`}
            onClick={() => !disabled && onSelect(style)}
            disabled={disabled}
            aria-label={`${style.name} 스타일 선택`}
            aria-pressed={isSelected}
            className={`
        relative group w-full rounded-xl p-4 text-left transition-all duration-300 ease-out
        border-2 cursor-pointer
        ${isSelected
                    ? "border-violet-500 bg-violet-500/15 shadow-lg shadow-violet-500/20 scale-[1.02]"
                    : "border-gray-700/50 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20"
                }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            {/* 선택 체크 아이콘 */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center animate-in fade-in zoom-in duration-200">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}

            {/* 이모지 */}
            <div className={`
        text-3xl mb-2 transition-transform duration-300
        ${isSelected ? "scale-110" : "group-hover:scale-110"}
      `}>
                {style.emoji}
            </div>

            {/* 스타일 이름 */}
            <h3 className={`
        text-sm font-semibold transition-colors duration-200
        ${isSelected ? "text-violet-300" : "text-gray-200 group-hover:text-white"}
      `}>
                {style.name}
            </h3>

            {/* 영문 슬러그 (부제) */}
            <p className="text-xs text-gray-500 mt-0.5 capitalize">
                {style.nameEn.replace(/-/g, " ")}
            </p>

            {/* 호버 시 프롬프트 툴팁 */}
            <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-gray-900 border border-gray-700 shadow-xl text-xs text-gray-300 leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                {style.prompt.substring(0, 120)}...
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-gray-700 rotate-45 -mt-1" />
            </div>
        </button>
    );
}

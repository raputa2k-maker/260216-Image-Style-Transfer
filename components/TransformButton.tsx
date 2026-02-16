"use client";

interface TransformButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export default function TransformButton({
    onClick,
    disabled,
    isLoading,
}: TransformButtonProps) {
    return (
        <div className="w-full flex justify-center" id="transform-button-section">
            <button
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`
          relative px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300
          flex items-center gap-3 overflow-hidden
          ${disabled || isLoading
                        ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98]"
                    }
        `}
                aria-label="스타일 변환 실행"
            >
                {/* 배경 빛 효과 */}
                {!disabled && !isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                )}

                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
                        <span>변환 중...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span>스타일 변환하기</span>
                    </>
                )}
            </button>

            {/* 비활성 시 안내 메시지 */}
            {disabled && !isLoading && (
                <p className="absolute mt-16 text-xs text-gray-500">
                    이미지를 업로드하고 스타일을 선택해주세요
                </p>
            )}
        </div>
    );
}

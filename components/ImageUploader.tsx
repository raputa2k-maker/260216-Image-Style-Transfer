"use client";

import React, { useCallback, useRef, useState } from "react";
import { validateFile, resizeAndConvertToBase64 } from "@/lib/utils";
import { UploadedImage } from "@/types";

interface ImageUploaderProps {
    onImageUpload: (image: UploadedImage) => void;
    uploadedImage: UploadedImage | null;
    onReset: () => void;
    disabled?: boolean;
}

export default function ImageUploader({
    onImageUpload,
    uploadedImage,
    onReset,
    disabled = false,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 파일 처리 함수
    const processFile = useCallback(
        async (file: File) => {
            setError(null);
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            setIsProcessing(true);
            try {
                const { base64, mimeType, preview } = await resizeAndConvertToBase64(file);
                onImageUpload({
                    file,
                    preview,
                    base64,
                    mimeType,
                });
            } catch {
                setError("이미지 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
            } finally {
                setIsProcessing(false);
            }
        },
        [onImageUpload]
    );

    // 드래그 앤 드롭 핸들러
    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (disabled) return;

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                processFile(files[0]);
            }
        },
        [processFile, disabled]
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                processFile(files[0]);
            }
            // input 초기화 (같은 파일 재선택 가능)
            e.target.value = "";
        },
        [processFile]
    );

    const handleClick = useCallback(() => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    }, [disabled]);

    // 업로드된 이미지가 있는 경우 미리보기 표시
    if (uploadedImage) {
        return (
            <div className="w-full" id="image-preview-section">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                    <div className="relative aspect-video max-h-[400px] flex items-center justify-center bg-black/20">
                        <img
                            src={uploadedImage.preview}
                            alt="업로드된 이미지 미리보기"
                            className="max-w-full max-h-[400px] object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]">
                                    {uploadedImage.file.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {(uploadedImage.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onReset}
                            disabled={disabled}
                            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="다른 이미지 선택"
                        >
                            다시 선택
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 업로드 영역
    return (
        <div className="w-full" id="image-upload-section">
            <div
                role="button"
                tabIndex={0}
                aria-label="이미지 업로드 영역"
                onClick={handleClick}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
          relative w-full min-h-[280px] rounded-2xl border-2 border-dashed cursor-pointer
          transition-all duration-300 ease-out
          flex flex-col items-center justify-center gap-4 p-8
          ${isDragging
                        ? "border-violet-400 bg-violet-500/10 scale-[1.01]"
                        : "border-gray-600 hover:border-violet-500/50 hover:bg-gray-800/30"
                    }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                {isProcessing ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        <p className="text-gray-400">이미지를 처리하고 있습니다...</p>
                    </div>
                ) : (
                    <>
                        {/* 아이콘 */}
                        <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging
                                ? "bg-violet-500/20 scale-110"
                                : "bg-gradient-to-br from-gray-800 to-gray-700"
                            }
            `}>
                            <svg className={`w-10 h-10 transition-colors ${isDragging ? "text-violet-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>

                        {/* 텍스트 */}
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-200">
                                {isDragging ? "여기에 놓으세요!" : "이미지를 드래그하거나 클릭하여 업로드"}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                JPG, PNG, WEBP · 최대 10MB
                            </p>
                        </div>
                    </>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-hidden="true"
                />
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="mt-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
}

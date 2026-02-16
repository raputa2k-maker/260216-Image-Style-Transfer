import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Gemini API 클라이언트 생성
const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.");
    }
    return new GoogleGenAI({ apiKey });
};

// 기본 지시문 - 원본 구도 보존
const BASE_INSTRUCTION =
    "IMPORTANT: Preserve the original photo's composition, subject positions, facial features, and overall layout exactly. Only change the artistic style and visual rendering technique.";

export async function POST(req: NextRequest) {
    try {
        const ai = getAI();
        const { imageBase64, mimeType, stylePrompt } = await req.json();

        // 입력 유효성 검사
        if (!imageBase64 || !mimeType || !stylePrompt) {
            return NextResponse.json(
                { error: "필수 파라미터가 누락되었습니다." },
                { status: 400 }
            );
        }

        // 스타일 변환 프롬프트 조합
        const fullPrompt = `${BASE_INSTRUCTION}\n\n${stylePrompt}`;

        // Gemini API 호출 (타임아웃 설정)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 120초 타임아웃

        try {
            const response = await ai.models.generateContent({
                model: "nano-banana-pro-preview",
                contents: [
                    { text: fullPrompt },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: imageBase64,
                        },
                    },
                ],
                config: {
                    responseModalities: ["TEXT", "IMAGE"],
                },
            });

            clearTimeout(timeoutId);

            // 응답에서 이미지 파트 추출
            const parts = response?.candidates?.[0]?.content?.parts;
            if (!parts) {
                return NextResponse.json(
                    { error: "AI 응답에서 콘텐츠를 찾을 수 없습니다." },
                    { status: 500 }
                );
            }

            for (const part of parts) {
                if (part.inlineData) {
                    return NextResponse.json({
                        image: part.inlineData.data,
                        mimeType: part.inlineData.mimeType,
                    });
                }
            }

            // 이미지 없이 텍스트만 반환된 경우
            const textPart = parts.find((p) => p.text);
            return NextResponse.json(
                {
                    error: `이미지 생성에 실패했습니다. AI 응답: ${textPart?.text || "응답 없음"}`,
                },
                { status: 500 }
            );
        } catch (apiError) {
            clearTimeout(timeoutId);
            if (apiError instanceof Error && apiError.name === "AbortError") {
                return NextResponse.json(
                    { error: "요청 시간이 초과되었습니다. 다시 시도해주세요." },
                    { status: 504 }
                );
            }
            throw apiError;
        }
    } catch (error) {
        console.error("Transform API Error:", error);
        const message =
            error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

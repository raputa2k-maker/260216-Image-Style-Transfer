import { GoogleGenAI } from "@google/genai";

// Gemini API 클라이언트 (서버사이드 전용)
// 환경변수에서 API 키를 읽어와 인스턴스 생성
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// 기본 지시문 - 모든 스타일 변환 프롬프트 앞에 추가
export const BASE_INSTRUCTION =
    "IMPORTANT: Preserve the original photo's composition, subject positions, facial features, and overall layout exactly. Only change the artistic style and visual rendering technique.";

export default ai;

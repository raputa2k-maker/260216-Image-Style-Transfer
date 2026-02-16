// 스타일 옵션 타입 정의
export interface StyleOption {
  id: number;
  name: string;        // 한글 이름 (UI 표시)
  nameEn: string;      // 영문 슬러그 (JPG 파일명에 사용)
  emoji: string;
  prompt: string;      // Gemini API 전달용 영문 프롬프트
}

// 변환 결과 타입
export interface TransformResult {
  originalSrc: string;    // 원본 이미지 data URL
  transformedSrc: string; // 변환된 이미지 data URL
  style: StyleOption;     // 사용된 스타일 (다운로드 파일명에 활용)
}

// API 요청 타입
export interface TransformRequest {
  imageBase64: string;    // base64 인코딩된 이미지 데이터
  mimeType: string;       // 이미지 MIME 타입
  stylePrompt: string;    // 스타일 변환 프롬프트
}

// API 응답 타입
export interface TransformResponse {
  image?: string;         // base64 인코딩된 변환 이미지
  mimeType?: string;      // 변환 이미지 MIME 타입
  error?: string;         // 에러 메시지
}

// 업로드된 이미지 정보
export interface UploadedImage {
  file: File;
  preview: string;        // 미리보기용 data URL
  base64: string;         // API 전송용 base64 데이터
  mimeType: string;       // MIME 타입
}
